import { adminGetLesson } from "@/app/data/admin/admin-get-lesson";
import { LessonForm } from "./_components/LessonForm";

type Params = Promise<{
    courseId:string;
    chapterId:string;
    lessonId:string;
}>

export default async function LessonIdPage({params}:{params:Params}){
    const {chapterId,lessonId,courseId}= await params;
    const lesson = await adminGetLesson(lessonId);


    return(
        
        <LessonForm courseId={courseId} chapterId={chapterId} data={lesson}/>
        
 
    )

}