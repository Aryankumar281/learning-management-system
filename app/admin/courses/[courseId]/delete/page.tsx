"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useTransition } from "react";
import { deleteCourse } from "./actions";
import { useParams, useRouter } from "next/navigation";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

export default function DeleteCourseRoute() {
  const [isPending, startTransiton] = useTransition();
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();
  function onSubmit() {
    startTransiton(async () => {
      const { data: result, error } = await tryCatch(deleteCourse(courseId));

      if (error) {
        toast.error("An unexpected error occurred.Please try again!");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        router.push("/admin/courses");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }
  return (
    <div className="max-w-xl mx-auto w-full">
      <Card className="mt-32">
        <CardHeader>
          <CardTitle>Are you Sure to delete this course?</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Link
            href={`/admin/courses`}
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <Button variant="destructive" onClick={onSubmit} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-1" /> Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Delete Course
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
