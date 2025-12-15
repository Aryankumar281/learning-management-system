import "server-only";
import { requireUser } from "./require-user";
import { prisma } from "@/lib/db";
export async function getEnrolledCourses() {
    const user = await requireUser();

    const data = await prisma.enrollment.findMany({
        where:{
            userId:user.user.id,
            status:"Active",
        },
        select:{
            Course:{
                select:{
                    id:true,
                    smallDescription:true,
                    title:true,
                    fileKey:true,
                    slug:true,
                    level:true,
                    duration:true,
                    chapter:{
                        select:{
                            id:true,
                            lesson:{
                                select:{
                                    id:true,
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    return data
}