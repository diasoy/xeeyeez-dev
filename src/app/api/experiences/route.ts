import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    error: false,
    message: "Data Experiences successfully fetched",
    experiences: [
         {
            id: 1,
            position: "Mobile Development Study Independent",
            company: "Bangkit Academy",
            type: "Study Independent",
            startDate: "2023-06-01",
            endDate: "2023-08-31",
            tech: ["Kotlin", "Jetpack Compose","Firebase", "MVVM", "Restful API"],
            description: "Participated in the Bangkit Academy program, focusing on mobile development using Kotlin and Jetpack Compose. Developed a capstone project that involved building a functional mobile application with modern architecture and best practices."
        },
        {
            id: 2,
            position: "Frontend Developer Intern",
            company: "Involuntir",
            type: "Internship",
            startDate: "2023-06-01",
            endDate: "2023-08-31",
            tech: ["React", "TypeScript", "Tailwind", "Restful API"],
            description: "Worked on developing and maintaining the frontend of the Involuntir platform, ensuring a responsive and user-friendly interface."
        },
        {
            id:3,
            position: "Web Developer Intern",
            company: "PT Xeno Persada Teknologi",
            type: "Internship",
            startDate: "2023-09-01",
            endDate: "2024-02-29",
            tech: ["Next.js", "Tailwind", "Laravel", "MySQL"],
            description: "Contributed to the development of the Bayibunda website, focusing on enhancing user experience and implementing new features."
        },
    ],
  });
}
    