import React from "react";
import { Resume } from "@/types/resume";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiLink,
  FiGithub,
  FiLinkedin,
  FiAward,
  FiGlobe
} from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaLink } from "react-icons/fa6";


export function ModernResume({ resume }: { resume: Resume }) {
  return (
    <div className="w-[794px] h-[1123px] bg-white text-black font-sans text-sm flex">
      {/* Left Sidebar */}
      <aside className="w-1/3 bg-green-600 text-white p-6 flex flex-col">
        {/* Profile */}
        <div className="">
            <Avatar className="w-28 h-28 mb-4">
                <AvatarImage src={resume.avatar} />
                <AvatarFallback>RN</AvatarFallback>
            </Avatar>
          <h2 className="text-lg font-semibold">{resume.name}</h2>
          <p className="text-xs">{resume.title}</p>
        </div>

        {/* Contact */}
        <div className="mt-6 space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiMapPin /></span> <span>{resume.contact.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiPhone /></span> <span>{resume.contact.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiMail /></span> <span>{resume.contact.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiLink /></span> <span>{resume.contact.website}</span>
          </div>
        </div>

        {/* Profiles */}
        <div className="mt-6 text-xs">
          <h3 className="font-bold text-white mb-1">Profiles</h3>
          {resume.profiles.map((profile, i) => (
            <p key={i} className="flex items-center gap-2">
              {profile.platform === "GitHub" && <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiGithub/> </span>}
              {profile.platform === "LinkedIn" && <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiLinkedin /></span>}
              {profile.platform === "Website" && <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiLink/></span> }
              {profile.platform !== "Website" && profile.platform !== "GitHub" && profile.platform !== "LinkedIn" && <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiLink /> </span>}
              <a href={profile.url} className="underline">
                {profile.username}
              </a>
            </p>
          ))}
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

        <div className="mt-6 text-xs">
        <h3 className="font-bold text-white mb-2">Hobbies & Interests</h3>
        <ul className="flex flex-wrap gap-2">
            {(resume.hobbies ?? []).map((hobby, i) => (
            <li 
                key={i} 
                className="bg-white/10 rounded-full px-3 py-1 inline-flex items-center"
            >
                {hobby}
            </li>
            ))}
        </ul>
        </div>

        {/* Certifications */}
        <div className="mt-6 text-xs">
          <h3 className="font-bold text-white mb-1">Certifications</h3>
          {resume.certifications?.map((cert, i) => (
            <p key={i} className="flex gap-2 items-center">
              <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiAward /></span> {cert}
            </p>
          ))}
        </div>

        {/* Languages */}
        <div className="mt-6 text-xs">
          <h3 className="font-bold text-white mb-1">Languages</h3>
          {(resume.languages ?? []).map((lang, i) => (
            <p key={i} className="flex gap-2 items-center">
              <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiGlobe /></span> {lang.name} ({lang.proficiency})
            </p>
          ))}
        </div>

        {/* References */}
        <div className="mt-6 text-xs">
          <h3 className="font-bold text-white mb-1">References</h3>
          {Array.isArray(resume.references) && resume.references.length > 0 ? (
            resume.references.map((ref, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{ref.name}</p>
                <p className="text-xs">{ref.position}</p>
                <p className="text-xs">{ref.contact}</p>
              </div>
            ))
          ) : (
            <p>Available upon request</p>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-6 flex flex-col gap-6">
        {/* Summary */}
        <section>
          <h3 className="text-lg font-bold border-b border-gray-300 pb-1">Summary</h3>
          <p className="mt-2 text-sm">{resume.summary}</p>
        </section>

        {/* Experience */}
        <section>
          <h3 className="text-lg font-bold border-b border-gray-300 pb-1">Experience</h3>
          {resume.experience.map((exp, i) => (
            <div key={i} className="mt-3">
              <div className="flex justify-between font-semibold">
                <span>{exp.company}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <p className="font-medium text-gray-600 text-sm">{exp.role}</p>
                <span className="text-xs text-gray-600 font-medium">{exp.startDate} to {exp.endDate}</span>
              </div>
              
              {exp.url && (  
                <a 
                    href={exp.url} 
                    className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaLink className="inline" size={12} />
                    <span>{exp.url}</span>
                </a>
              )}
              <p className="text-xs text-gray-500">{exp.location}</p>
              <ul className="list-disc ml-5 text-sm mt-1 space-y-1">
                {exp.highlights.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h3 className="text-lg font-bold border-b border-gray-300 pb-1">Education</h3>
          {resume.education.map((edu, i) => (
            <div key={i} className="mt-2">
              <div className=" font-semibold">
                <span>{edu.school}</span>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-600">{edu.degree}</p>
                <span className="font-medium text-gray-600 text-xs">{edu.startDate} to {edu.endDate}</span>
              </div>              
              <p className="text-xs text-gray-500">{edu.location}</p>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section>
          <h3 className="text-lg font-bold border-b border-gray-300 pb-1">Projects</h3>
          {Array.isArray(resume.projects) && resume.projects.length > 0 ? (
            resume.projects.map((project, i) => (
              <div key={i} className="mt-2">
                <p className="font-semibold">{project.title}</p>
                <p className="font-medium text-gray-600 text-sm">{project.role}</p>
                <p className="text-sm">{project.description}</p>
              </div>
            ))
          ) : (
            <p>No projects provided.</p>
          )}
        </section>
      </main>
    </div>
  );
}
