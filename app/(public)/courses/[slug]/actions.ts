"use server";

import { requireUser } from "@/app/data/user/require-user";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { stripe } from "@/lib/stripe";
import { APiResponse } from "@/lib/types";
import { request } from "@arcjet/next";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const aj = arcjet.withRule(
  fixedWindow({
    mode:'LIVE',
    window:'1m',
    max:5,
  })
)

export async function enrollInCourseAction(
  courseId: string
): Promise<APiResponse | never> {
  const user = await requireUser();
  let checkoutUrl: string;
  try {
    const req = await request();
    const decision = await aj.protect(req,{
      fingerprint:user.user.id
    })
    if(decision.isDenied()){
      return {
        status:"error",
        message:"You have been Blocked"
      }
    }
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
        title: true,
        price: true,
        slug: true,
      },
    });
    if (!course) {
      return {
        status: "error",
        message: "Course Not Found",
      };
    }
    let stripeCustomerId: string;
    const userWithStripeCustomerId = await prisma.user.findUnique({
      where: {
        id: user.user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });
    if (userWithStripeCustomerId?.stripeCustomerId) {
      stripeCustomerId = userWithStripeCustomerId.stripeCustomerId;
    } else {
      const customer = await stripe.customers.create({
        email: user.user.email,
        name: user.user.name,
        metadata: {
          userId: user.user.id,
        },
      });

      stripeCustomerId = customer.id;
      await prisma.user.update({
        where: {
          id: user.user.id,
        },
        data: {
          stripeCustomerId: stripeCustomerId,
        },
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingEnrollment = await tx.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.user.id,
            courseId: courseId,
          },
        },
        select: {
          status: true,
          id: true,
        },
      });
      if (existingEnrollment?.status === "Active") {
        return {
          status: "success",
          message: "You are already enrolled in this couse",
        };
      }
      let enrollment;
      if (existingEnrollment) {
        enrollment = await tx.enrollment.update({
          where: {
            id: existingEnrollment.id,
          },
          data: {
            amount: course.price,
            status: "Pending",
            updatedAt: new Date(),
          },
        });
      } else {
        enrollment = await tx.enrollment.create({
          data: {
            userId: user.user.id,
            courseId: course.id,
            amount: course.price,
            status: "Pending",
          },
        });
      }
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        line_items: [
          {
            price: "price_1SdQOxBjdiwNRpp0grO3ND7A",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${env.BETTER_AUTH_URL}/payment/success`,
        cancel_url: `${env.BETTER_AUTH_URL}/payment/cancel`,
        metadata: {
          userId: user.user.id,
          courseId: course.id,
          enrollmentId: enrollment.id,
        },
      });

      return {
        enrollment: enrollment,
        checkoutUrl: checkoutSession.url,
      };
    });
    checkoutUrl = result.checkoutUrl as string;

    
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      return {
        status: "error",
        message: "Payment Error",
      };
    }
    return {
      status: "error",
      message: "Failed to Enroll in Course",
    };
  }
  redirect(checkoutUrl)
}
