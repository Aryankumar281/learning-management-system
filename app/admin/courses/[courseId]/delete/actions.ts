"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { fixedWindow } from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { APiResponse } from "@/lib/types";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

const aj = arcjet.withRule(
  fixedWindow({
    mode: "LIVE",
    window: "1m",
    max: 5,
  })
);
export async function deleteCourse(courseId: string): Promise<APiResponse> {
  const session = await requireAdmin();
  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "blocked due to rate limiting",
        };
      } else {
        return {
          status: "error",
          message: "Your are a bot user",
        };
      }
    }
    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    revalidatePath(`/admin/courses`);
    return {
      status: "success",
      message: "Course deleted successfully",
    };
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "Failed to delete courses",
    };
  }
}
