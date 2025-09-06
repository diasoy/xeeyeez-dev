import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    error: false,
    message: "Data Experiences successfully fetched",
    experiences: [
      {
        id: 1,
        position: "Software Developer",
        company: "Self-Employed",
        type: "Freelance",
        startDate: "2024-01-01",
        endDate: "present",
        tech: ["Website Development", "Mobile Development"],
        description:
          "Providing freelance services in website and mobile application development, delivering tailored solutions to clients based on their specific needs and requirements.",
      },
      {
        id: 2,
        position: "Mobile Development Study Independent",
        company: "Bangkit Academy",
        type: "Study Independent",
        startDate: "2024-09-01",
        endDate: "2025-01-01",
        tech: ["Kotlin", "Jetpack Compose", "Firebase", "MVVM", "Restful API"],
        description:
          "Participated in the Bangkit Academy program, focusing on mobile development using Kotlin and Jetpack Compose. Developed a capstone project that involved building a functional mobile application with modern architecture and best practices.",
      },
      {
        id: 3,
        position: "Frontend Developer Intern",
        company: "Involuntir",
        type: "Internship",
        startDate: "2024-12-01",
        endDate: "2025-04-01",
        tech: ["React", "TypeScript", "Tailwind", "Restful API"],
        description:
          "Worked on developing and maintaining the frontend of the Involuntir platform, ensuring a responsive and user-friendly interface.",
      },
      {
        id: 4,
        position: "Web Developer Intern",
        company: "PT Xeno Persada Teknologi",
        type: "Internship",
        startDate: "2025-06-01",
        endDate: "2025-09-01",
        tech: ["Next.js", "Tailwind", "Laravel", "MySQL"],
        description:
          "Contributed to the development of the Bayibunda website, focusing on enhancing user experience and implementing new features.",
      },
    ],
  });
}
