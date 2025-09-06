import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    error: false,
    message: "Data Projects successfully fetched",
    projects: [
      {
        id: 1,
        name: "Contact Zainzo",
        type: "Frontend",
        position: "Frontend Developer Intern",
        tech: ["React", "TypeScript", "Tailwind", "Restful API"],
        description: "",
        url: "https://contact.zainzo.com",
      },
      {
        id: 2,
        name: "Bayibunda",
        type: "Frontend",
        position: "Web Developer Intern",
        tech: ["Next", "Javascript", "Tailwind", "Restful API"],
        description: "",
        url: "https://bayibunda.id",
      },
      {
        id: 3,
        name: "Chatour Travel",
        type: "Fullstack",
        position: "Web Developer Intern",
        tech: ["Laravel", "MySQL"],
        description: "",
        url: "https://chatourtravel.id",
      },
      {
        id: 4,
        name: "POS Bayibunda",
        type: "Frontend",
        position: "Web Developer Intern",
        tech: ["React", "TypeScript"],
        description: "",
        url: "https://pos.bayibunda.id",
      },
    ],
  });
}
