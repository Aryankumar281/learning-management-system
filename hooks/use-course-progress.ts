"use client"
import { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar-data";
import { useMemo } from "react";

interface iAppProps {
  courseData: CourseSidebarDataType["course"];
}
interface CourseProgressResult{
    totalLesson:number;
    completedLesson:number;
    progressPercentage :number
}
export function useCourseProgress({ courseData }: iAppProps): CourseProgressResult {
  return useMemo(() => {
    let totalLesson = 0;
    let completedLesson = 0;

    courseData.chapter.forEach((chapter) => {
      chapter.lesson.forEach((lesson) => {
        totalLesson++;
        const isCompleted = lesson.lessonProgress.some(
          (progress) => progress.lessonId === lesson.id && progress.completed
        );
        if (isCompleted) {
          completedLesson++;
        }
      });
    });

    const progressPercentage =
      totalLesson > 0 ? Math.round((completedLesson / totalLesson) * 100) : 0;

      return {
        totalLesson,
        completedLesson,
        progressPercentage
      }
  },[courseData]);
}
