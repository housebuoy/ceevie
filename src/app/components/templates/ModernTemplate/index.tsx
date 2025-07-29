// templates/ModernTemplate.tsx
import { useResume } from "@/context/ResumeContext";

export default function ModernTemplate() {
  const { resume } = useResume();
  return (
    <div className="px-8 py-8 font-sans bg-white text-black w-[794px] h-[1123px] mx-auto ">
      <h1 className="text-3xl font-bold">{resume.name}</h1>
      <p className="text-gray-600">{resume.title}</p>
      <p className="mt-2">{resume.summary}</p>

      <h2 className="mt-6 text-xl font-semibold">Experience</h2>
      <ul className="space-y-4">
        {resume.experience.map((job, i) => (
          <li key={i}>
            <p className="font-bold">{job.role} at {job.company}</p>
            <p className="text-sm text-gray-600">{job.startDate} - {job.endDate}</p>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-xs">
        <h3 className="font-bold text-white mb-1">Skills</h3>
        {Array.isArray(resume.skills) && resume.skills.length > 0 && typeof resume.skills[0] === "object"
            ? (resume.skills as unknown as { category: string; level: string; items: string[] | string }[]).map((skillGroup, i) => (
                <div key={i} className="mb-2">
                <p className="font-semibold">{skillGroup.category} <span className="font-normal">({skillGroup.level})</span></p>
                <p>{Array.isArray(skillGroup.items) ? skillGroup.items.join(", ") : skillGroup.items}</p>
                </div>
            ))
            : Array.isArray(resume.skills)
                ? ((resume.skills as unknown) as string[]).map((skill, i) => (
                    <div key={i} className="mb-2">
                    <p>{skill}</p>
                    </div>
                ))
                : null
        }
        </div>

      {/* Education, Skills, etc... */}
    </div>
  );
}
