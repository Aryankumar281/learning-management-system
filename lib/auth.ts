import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { prisma } from "./db";
import { env } from "./env";
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        //
        await resend.emails.send({
          from: "L-M-S <onboarding@resend.dev>",
          to: [email],
          subject: "LMS - Verify your email",
        //   react: EmailTemplate({ firstName: "John" }),
        html:`<p>Your OTP is <strong>${otp}</strong></p>`
        });
      },
    }),
  ],
});

// 1:05 mn
