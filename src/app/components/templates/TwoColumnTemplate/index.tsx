import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiLink,
  FiGithub,
  FiLinkedin,
//   FiCheckCircle,
  FiAward,
  FiGlobe
} from "react-icons/fi";
import { useResume } from "@/context/ResumeContext";


export function TwoColumnTemplate() {
  const { resume } = useResume();

  
  return (
    <div className="w-[794px] h-[1123px] bg-white text-black font-sans text-sm px-6 py-8">
      <div className="flex h-full gap-6">
        {/* Left Sidebar */}
        <aside className="w-[30%] flex flex-col gap-4 border-r-2 border-gray-300 pr-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-28 h-28 mb-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold mt-2">{resume.name}</h2>
            <p className="text-xs">{resume.title}</p>
          </div>

          <div className="text-xs space-y-4 mt-6">
            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-gray-700">Contact</h3>
              <p className="flex items-center gap-1 mt-1"><FiMapPin /> {resume.contact.location}</p>
              <p className="flex items-center gap-1"><FiPhone /> {resume.contact.phone}</p>
              <p className="flex items-center gap-1"><FiMail /> {resume.contact.email}</p>
            </div>

            {/* Profiles */}
            <div>
              <h3 className="font-bold text-gray-700">Profiles</h3>
              <p className="flex items-center gap-1"><FiLinkedin /> LinkedIn: {resume.contact.linkedin ?? "n/a"}</p>
              <p className="flex items-center gap-1"><FiGithub /> GitHub: {resume.contact.github ?? "n/a"}</p>
              <p className="flex items-center gap-1"><FiLink /> Portfolio: {resume.contact.website ?? "n/a"}</p>
            </div>

            {/* Skills */}
            <div className="mt-6 text-xs">
          <h3 className="font-bold text-white mb-1">Skills</h3>
          {Array.isArray(resume.skills) && resume.skills.length > 0 && typeof resume.skills[0] === "object" && "category" in (resume.skills[0] as Record<string, unknown>)
            ? ((resume.skills as unknown) as { category: string; level: string; items: string[] | string }[]).map((skillGroup, i) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold">{skillGroup.category} <span className="font-normal">({skillGroup.level})</span></p>
                  <p>{Array.isArray(skillGroup.items) ? skillGroup.items.join(", ") : skillGroup.items}</p>
                </div>
              ))
            : Array.isArray(resume.skills) && (resume.skills.length === 0 || resume.skills.every(skill => typeof skill === "string"))
              ? ((resume.skills as unknown) as string[]).map((skill, i) => (
                  <div key={i} className="mb-2">
                    <p>{skill}</p>
                  </div>
                ))
              : null
          }
        </div>

            {/* Certifications */}
            <div>
              <h3 className="font-bold text-gray-700">Certifications</h3>
              <ul className="list-disc list-inside">
                {resume.certifications?.map((cert: string, i: number) => (
                  <li key={i}><FiAward className="inline mr-1" />{cert}</li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div className="mt-6 text-xs">
            <h3 className="font-bold text-gray-700 mb-1">Languages</h3>
            {(resume.languages ?? []).map((lang, i) => (
                <p key={i} className="flex gap-2 items-center">
                <FiGlobe /> {lang.name} ({lang.proficiency})
                </p>
            ))}
            </div>

            {/* Hobbies */}
            {resume.hobbies && (
              <div>
                <h3 className="font-bold text-gray-700">Hobbies</h3>
                <ul className="list-disc list-inside">
                  {resume.hobbies.map((hobby: string, i: number) => (
                    <li key={i}>{hobby}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>

        {/* Right Main */}
        <section className="w-[70%] flex flex-col gap-6">
          {/* Summary */}
          <div>
            <h3 className="text-xl font-bold border-b border-gray-300 pb-1">Summary</h3>
            <p className="mt-2 text-sm">{resume.summary}</p>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xl font-bold border-b border-gray-300 pb-1">Experience</h3>
            <div className="mt-2 space-y-3">
              {resume.experience.map((exp: { company: string; role: string; startDate: string; endDate: string; description: string }, i: number) => (
                <div key={i}>
                  <h4 className="font-semibold">{exp.company}</h4>
                  <p className="text-xs italic">{exp.role} — {exp.startDate} to {exp.endDate}</p>
                  <p className="mt-1 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xl font-bold border-b border-gray-300 pb-1">Education</h3>
            {resume.education.map((edu: { school: string; degree: string; startDate: string; endDate: string }, i: number) => (
              <div key={i} className="mt-2">
                <p className="font-semibold">{edu.school}</p>
                <p className="text-sm">{edu.degree}, {edu.startDate} – {edu.endDate}</p>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-xl font-bold border-b border-gray-300 pb-1">Projects</h3>
            {resume.projects && resume.projects.map((proj: { title: string; description: string; url?: string }, i: number) => (
              <div key={i} className="mt-2">
                <p className="font-semibold">{proj.title}</p>
                <p className="text-sm">{proj.description}</p>
                {proj.url && (
                  <a
                    href={proj.url}
                    className="text-blue-600 text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {proj.url}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* References */}
          {resume.references && (
            <div>
              <h3 className="text-xl font-bold border-b border-gray-300 pb-1">References</h3>
              {resume.references.map((ref: { name: string; position: string; contact: string }, i: number) => (
                <div key={i} className="mt-2 text-sm">
                  <p className="font-semibold">{ref.name}</p>
                  <p>{ref.position}</p>
                  <p>{ref.contact}</p>
                </div>
              ))}
            </div>
          )}
          {resume.contact?.customFields && resume.contact.customFields.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-700">Custom Fields</h3>
              <ul className="list-disc list-inside">
                {resume.contact.customFields.map((field, i) => (
                  <li key={field.key || i} className="flex items-center gap-2">
                    {field.label.toLowerCase().includes("github") && <FiGithub />}
                    {field.label.toLowerCase().includes("linkedin") && <FiLinkedin />}
                    {/* ...add more icons as needed */}
                    <span className="font-semibold">{field.label}:</span> {field.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
