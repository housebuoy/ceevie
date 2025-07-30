import React from "react";
import { useResume } from "@/context/ResumeContext";
import {
  FiMapPin, FiPhone, FiMail, FiLink, FiGithub, FiLinkedin, FiAward, FiGlobe,
  FiTwitter, FiFacebook, FiInstagram, FiDribbble, FiCamera, FiYoutube, FiEdit3
} from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaLink } from "react-icons/fa6";
import { format } from "date-fns";
import { useEditorContext } from "@/context/EditorContext";

export function ModernResume() {
  const { resume } = useResume();
  const { font } = useEditorContext();
  const fontMap: Record<string, string> = {
    Inter: "var(--font-inter), sans-serif",
    Merriweather: "var(--font-merriweather), serif",
    Roboto: "var(--font-roboto), sans-serif",
    Montserrat: "var(--font-montserrat), sans-serif",
    Lato: "var(--font-lato), sans-serif",
    "Open Sans": "var(--font-open-sans), sans-serif",
  };

  // Helper for custom contact icons
  const getContactIcon = (label: string) => {
    label = label.toLowerCase();
    if (label.includes("github")) return <FiGithub />;
    if (label.includes("linkedin")) return <FiLinkedin />;
    if (label.includes("twitter")) return <FiTwitter />;
    if (label.includes("facebook")) return <FiFacebook />;
    if (label.includes("instagram")) return <FiInstagram />;
    if (label.includes("dribbble")) return <FiDribbble />;
    if (label.includes("behance")) return <FiCamera />;
    if (label.includes("youtube")) return <FiYoutube />;
    if (label.includes("medium")) return <FiEdit3 />;
    if (label.includes("website") || label.includes("portfolio")) return <FiLink />;
    if (label.includes("phone") || label.includes("mobile")) return <FiPhone />;
    if (label.includes("email")) return <FiMail />;
    if (label.includes("location") || label.includes("address")) return <FiMapPin />;
    return <FiLink />;
  };

  return (
    <div className="w-[794px] h-[1123px] bg-white text-black font-sans text-sm flex"
        style={{ fontFamily: fontMap[font] || fontMap["Inter"] }}>
      {/* Left Sidebar */}
      <aside className="w-1/3 bg-green-600 text-white p-6 flex flex-col">
        {/* Profile */}
        <div>
          <Avatar className="w-28 h-28 mb-4">
            <AvatarImage src={resume.avatar} />
            <AvatarFallback>RN</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">{resume.name}</h2>
          <p className="text-xs">{resume.title}</p>
        </div>

        {/* Contact */}
        <div className="mt-6 space-y-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiMapPin /></span>
            <span>{resume.contact.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiPhone /></span>
            <span>{resume.contact.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiMail /></span>
            <span>{resume.contact.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiLink /></span>
            <span>{resume.contact.website}</span>
          </div>
          {/* Custom contact fields */}
          {resume.contact?.customFields?.length > 0 && resume.contact.customFields?.map((field, i) => (
            <div key={field.key || i} className="flex flex-wrap items-center gap-2">
              <span className="p-1 rounded-full bg-white/10 inline-flex items-center">
                {getContactIcon(field.label)}
              </span>
              <span className="font-semibold">{field.label}:</span>
              <span className="break-all">{field.value}</span>
            </div>
          ))}
        </div>

        {/* Profiles */}
        {resume.profiles?.length > 0 && (
          <div className="mt-6 text-xs">
            <h3 className="font-bold text-white mb-1">Profiles</h3>
            {resume.profiles.map((profile, i) => (
              <p key={i} className="flex items-center gap-2">
                <span className="p-1 rounded-full bg-white/10 inline-flex items-center">
                  {profile.platform === "GitHub" && <FiGithub />}
                  {profile.platform === "LinkedIn" && <FiLinkedin />}
                  {profile.platform === "Website" && <FiLink />}
                  {profile.platform !== "Website" && profile.platform !== "GitHub" && profile.platform !== "LinkedIn" && <FiLink />}
                </span>
                <a href={profile.url} className="underline">{profile.username}</a>
              </p>
            ))}
          </div>
        )}

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <div className="mt-6 text-xs">
            <h3 className="font-bold text-white mb-1">Skills</h3>
            {resume.skills.map((skillGroup, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{skillGroup.category} <span className="font-normal">({skillGroup.level})</span></p>
                <p>{Array.isArray(skillGroup.items) ? skillGroup.items.join(", ") : skillGroup.items}</p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {resume.languages?.length > 0 && (
          <div className="mt-6 text-xs">
            <h3 className="font-bold text-white mb-1">Languages</h3>
            {resume.languages?.map((lang, i) => (
              <p key={i} className="flex gap-2 items-center">
                <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiGlobe /></span>
                {lang.name} ({lang.proficiency})
              </p>
            ))}
          </div>
        )}

        {/* Awards */}
        {resume.awards?.length > 0 && (
          <div className="mt-6 text-xs">
            <h3 className="font-bold text-white mb-1">Awards</h3>
            {resume.awards?.map((award, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{award.title}</p>
                {award.issuer && <p className="text-xs">{award.issuer}</p>}
                {award.date && <p className="text-xs">{format(new Date(award.date), "yyyy")}</p>}
                {award.description && <p className="text-xs">{award.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {resume.certifications?.length > 0 && (
          <div className="mt-6 text-xs">
            <h3 className="font-bold text-white mb-1">Certifications</h3>
            {resume.certifications?.map((cert, i) =>
              typeof cert === "string" ? (
                <p key={i} className="flex gap-2 items-center">
                  <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiAward /></span>
                  <span>{cert}</span>
                </p>
              ) : (
                <p key={i} className="flex gap-2 items-center">
                  <span className="p-1 rounded-full bg-white/10 inline-flex items-center"><FiAward /></span>
                  <span>
                    <span>{cert.name} - </span>
                    {cert.date && (
                      <span className="text-gray-200">({format(new Date(cert.date), "yyyy")})</span>
                    )}
                  </span>
                </p>
              )
            )}
          </div>
        )}

        {/* Interests */}
        {resume.hobbies?.length > 0 && (
          <div className="mt-6 text-xs">
            <h3 className="font-bold text-white mb-2">Hobbies & Interests</h3>
            <ul className="flex flex-wrap gap-2">
              {resume.hobbies?.map((hobby, i) => (
                <li key={i} className="bg-white/10 rounded-full px-3 py-1 inline-flex items-center">
                  {hobby}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* References */}
        {resume.references?.length > 0 && (
          <div className="mt-6 text-xs">
            <h3 className="font-bold text-white mb-1">References</h3>
            {resume.references?.map((ref, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{ref.name}</p>
                <p className="text-xs">{ref.position}</p>
                <p className="text-xs">{ref.contact}</p>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-6 flex flex-col gap-6">
        {/* Summary */}
        <section>
          <h3 className="text-lg font-bold border-b border-gray-300 pb-1">Summary</h3>
          <div
            className="mt-2 text-sm prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: resume.summary || "" }}
          />
        </section>

        {/* Experience */}
        {resume.experience?.length > 0 && (
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
                {exp.description && (
                  <div
                    className="text-xs mt-2 ml-3"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {resume.education?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold border-b border-gray-300 pb-1">Education</h3>
            {resume.education.map((edu, i) => (
              <div key={i} className="mt-2">
                <div className="font-semibold flex items-center gap-2">
                  <span>{edu.school}</span>
                  {edu.url && (
                    <a
                      href={edu.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline ml-2"
                      title={edu.url}
                    >
                      <FiLink className="inline" />
                    </a>
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-600">{edu.degree}</p>
                  <span className="font-medium text-gray-600 text-xs">
                    {edu.startDate ? format(edu.startDate, "yyyy") : ""}
                    {edu.endDate ? ` to ${format(edu.endDate, "yyyy")}` : ""}
                  </span>
                </div>
                {edu.location && (
                  <p className="text-xs text-gray-500">{edu.location}</p>
                )}
                {edu.summary && (
                  <div
                    className="text-xs text-gray-700 mt-1 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: edu.summary }}
                  />
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold border-b border-gray-300 pb-1">Projects</h3>
            {resume.projects?.map((project, i) => (
              <div key={i} className="mt-2">
                <p className="font-semibold">{project.title}</p>
                <p className="font-medium text-gray-600 text-sm">{project.role}</p>
                <p className="text-sm">{project.description}</p>
                {project.url && (
                  <a
                    href={project.url}
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiLink /> {project.url}
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Publications */}
        {resume.publications?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold border-b border-gray-300 pb-1">Publications</h3>
            {resume.publications?.map((pub, i) => (
              <div key={i} className="mt-2">
                <p className="font-semibold">{pub.title}</p>
                {pub.publisher && <p className="text-xs">{pub.publisher}</p>}
                {pub.date && <p className="text-xs">{format(new Date(pub.date), "yyyy")}</p>}
                {pub.description && <p className="text-xs">{pub.description}</p>}
                {pub.url && (
                  <a
                    href={pub.url}
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiLink /> {pub.url}
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Volunteering */}
        {resume.volunteering?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold border-b border-gray-300 pb-1">Volunteering</h3>
            {resume.volunteering?.map((vol, i) => (
              <div key={i} className="mt-2">
                <p className="font-semibold">{vol.organization}</p>
                <p className="text-sm font-medium text-gray-600">{vol.role}</p>
                <span className="font-medium text-gray-600 text-xs">
                  {vol.startDate ? format(vol.startDate, "yyyy") : ""}
                  {vol.endDate ? ` to ${format(vol.endDate, "yyyy")}` : ""}
                </span>
                {vol.description && <p className="text-xs">{vol.description}</p>}
                {vol.url && (
                  <a
                    href={vol.url}
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiLink /> {vol.url}
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* References */}
        {resume.references?.length > 0 && (
          <section>
            <h3 className="text-lg font-bold border-b border-gray-300 pb-1">References</h3>
            {resume.references?.map((ref, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{ref.name}</p>
                <p className="text-xs">{ref.position}</p>
                <p className="text-xs">{ref.contact}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}