"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { APiResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function deleteCourse(courseId: string): Promise<APiResponse> {
  await requireAdmin();
  try {
    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    revalidatePath(`/admin/courses`)
    return {
      status: "success",
      message: "Course deleted successfully",
    };
  } catch (e){
    console.log(e)
    return {
      status: "error",
      message: "Failed to delete courses",
    };
  }
}
