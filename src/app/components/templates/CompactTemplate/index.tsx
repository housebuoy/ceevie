// components/templates/CompactResume.tsx
import React from "react";
import { Resume } from "@/types/resume";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CompactResume({ resume }: { resume: Resume }) {
  return (
    <div className="w-[794px] h-[1123px] bg-white font-sans text-sm text-black pt-32 px-10 relative">
      <div className="bg-blue-800 w-screen min-w-[794px] h-24 fixed top-0 left-0"></div>
      <div className="flex gap-6">
        {/* Left Column */}
        <div className="w-2/3 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold uppercase">{resume.name}</h1>
            <div className="w-full border-b border-black mt-1" />
          </div>

          {/* Education */}
          <div>
            <h2 className="font-bold uppercase text-sm mb-1 flex items-center gap-2">
                <span>Education and Training</span>
                <div className="h-3 bg-gray-400 flex-1"></div>
            </h2>
            {resume.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <p className="font-medium">{edu.degree}, {edu.startDate}</p>
                <p className="text-xs">{edu.school} – {edu.location}</p>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div>
            <h2 className="font-bold uppercase text-sm mb-1 flex items-center gap-2">
                <span>Experience</span>
                <div className="h-3 bg-gray-400 flex-1"></div>
            </h2>
            {resume.experience.map((exp, index) => (
              <div key={index} className="mb-2">
                <p className="font-medium">{exp.role}, {exp.startDate} – {exp.endDate}</p>
                <p className="text-xs">{exp.company} – {exp.location}</p>
                <ul className="list-disc list-inside mt-1 text-sm">
                  {exp.highlights.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div>
            <h2 className="font-bold uppercase text-sm mb-1 flex items-center gap-2">
                <span>Languages</span>
                <div className="h-3 bg-gray-400 flex-1"></div>
            </h2>
            {resume.languages?.map((lang, index) => (
              <p key={index}>
                <span className="font-semibold">{lang.name}:</span> {lang.proficiency}
              </p>
            ))}
          </div>

          {/* Summary */}
          <div>
            <h2 className="font-bold uppercase text-sm mb-1 flex items-center gap-2">
                <span>Summary</span>
                <div className="h-3 bg-gray-400 flex-1"></div>
            </h2>
            <p className="text-sm">{resume.summary}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/3 space-y-6">
          {/* Avatar */}
          <div className="">
            <Avatar className="w-36 h-36 mb-4 rounded-sm">
                <AvatarImage src={resume.avatar} />
                <AvatarFallback className="w-36 h-36 mb-4 rounded-sm">RN</AvatarFallback>
            </Avatar>
          <h2 className="text-lg font-semibold">{resume.name}</h2>
          <p className="text-xs">{resume.title}</p>
        </div>

          {/* Contact */}
          <div>
            <h2 className="font-bold uppercase text-sm mb-1 flex items-center gap-2">
                <span>Contact</span>
                <div className="h-3 bg-gray-400 flex-1"></div>
            </h2>
            <p className="flex items-center gap-2"><FiMapPin className="text-gray-600" />{resume.contact.location}</p>
            <p className="flex items-center gap-2"><FiPhone className="text-gray-600" />{resume.contact.phone}</p>
            <p className="flex items-center gap-2"><FiMail className="text-gray-600" />{resume.contact.email}</p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="font-bold uppercase text-sm mb-1 flex items-center gap-2">
                <span>Skills</span>
                <div className="h-3 bg-gray-400 flex-1"></div>
            </h2>
            <ul className="list-disc list-inside text-sm">
              {resume.skills.flatMap(skill =>
                skill.items.map((item, i) => (
                  <li key={`${skill.category}-${i}`}>{item}</li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
