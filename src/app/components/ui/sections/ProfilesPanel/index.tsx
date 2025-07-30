'use client';
import { useState } from "react";
import {
  FiShare2, FiMenu, FiPlus, FiTrash2, FiLink, FiGithub, FiLinkedin, FiTwitter,
  FiGlobe, FiFacebook, FiInstagram, FiDribbble, FiYoutube, FiMail, FiEdit3, FiCheck, FiX
} from "react-icons/fi";
import { FaGripLinesVertical } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { z } from "zod";
import { useResume } from "@/context/ResumeContext";

type Profile = {
  platform: string;
  username: string;
  url: string;
  iconSlug?: string;
};

const platformIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  x: FaXTwitter,
  facebook: FiFacebook,
  instagram: FiInstagram,
  dribbble: FiDribbble,
  youtube: FiYoutube,
  website: FiGlobe,
  email: FiMail,
};


// const initialProfiles: Profile[] = [
//   { platform: "LinkedIn", username: "johndoe", website: "https://linkedin.com/in/johndoe", iconSlug: "linkedin" },
//   { platform: "GitHub", username: "johndoe", website: "https://github.com/johndoe", iconSlug: "github" },
// ];

function getPlatformFromUrl(url: string) {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    if (domain.includes("github")) return "github";
    if (domain.includes("linkedin")) return "linkedin";
    if (domain.includes("twitter")) return "twitter";
    if (domain.includes("x")) return "x";
    if (domain.includes("facebook")) return "facebook";
    if (domain.includes("instagram")) return "instagram";
    if (domain.includes("dribbble")) return "dribbble";
    if (domain.includes("youtube")) return "youtube";
    if (domain.includes("mailto:")) return "email";
    return "website";
  } catch {
    return "website";
  }
}

function ProfileIcon({ slug }: { slug?: string }) {
  const Icon = slug && platformIconMap[slug.toLowerCase()] ? platformIconMap[slug.toLowerCase()] : FiLink;
  return <Icon className="w-7 h-7" />;
}

export default function ProfilesPanel() {
  const { resume, setResume } = useResume();
  const profiles = resume.profiles || [];
  const [showDialog, setShowDialog] = useState(false);
  const [newProfile, setNewProfile] = useState<Profile>({
    platform: "",
    username: "",
    url: "",
    iconSlug: "",
  });
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editProfile, setEditProfile] = useState<Profile | null>(null);
  const websiteSchema = z.string().url({ message: "Enter a valid URL (e.g. https://github.com/johndoe)" });
  const [websiteError, setWebsiteError] = useState<string | null>(null);
  const [editWebsiteError, setEditWebsiteError] = useState<string | null>(null);
  // Auto-detect icon when website changes
const handleUrlChange = (url: string, isEdit = false) => {
  const slug = getPlatformFromUrl(url);

  // Validate with Zod
  const result = websiteSchema.safeParse(url);

  if (isEdit && editProfile) {
    setEditProfile({ ...editProfile, url, iconSlug: slug });
    setEditWebsiteError(
      !result.success && url.length > 0 ? result.error.issues[0].message : null
    );
  } else {
    setNewProfile((p) => ({
      ...p,
      url,
      iconSlug: slug || p.iconSlug,
    }));
    setWebsiteError(
      !result.success && url.length > 0 ? result.error.issues[0].message : null
    );
  }
};

const handleCreate = () => {
  setResume(prev => ({
    ...prev,
    profiles: [
      ...(prev.profiles || []),
      {
        ...newProfile,
        url: newProfile.url, // map website to url
      },
    ],
  }));
  setShowDialog(false);
  setNewProfile({ platform: "", username: "", url: "", iconSlug: "" });
};

  // When deleting:
  const handleDelete = (idx: number) => {
    setResume(prev => ({
      ...prev,
      profiles: (prev.profiles || []).filter((_, i) => i !== idx),
    }));
  };

  // When editing:

  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setEditProfile({ ...profiles[idx] });
  };

  const handleEditSave = () => {
    if (editProfile !== null && editIdx !== null) {
      setResume(prev => ({
        ...prev,
        profiles: (prev.profiles || []).map((p, i) => (i === editIdx ? editProfile : p)),
      }));
      setEditIdx(null);
      setEditProfile(null);
    }
  };

  const handleEditCancel = () => {
    setEditIdx(null);
    setEditProfile(null);
  };

  return (
    <section className="w-82 mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-[#232323] rounded-full p-2">
          <FiShare2 size={25} className="text-white" />
        </span>
        <h2 className="text-2xl font-bold">Profiles</h2>
        <div className="ml-auto">
          <FiMenu size={22} className="text-gray-400" />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {profiles.map((profile, idx) =>
          editIdx === idx && editProfile ? (
            <div
            key={idx}
            className="flex items-start bg-[#19191a] border border-[#232323] rounded-lg p-4 mb-2 shadow-sm"
          >
            <div className="flex flex-col items-center mr-4">
              <FaGripLinesVertical className="text-gray-500 mb-2" />
              <ProfileIcon slug={editProfile.iconSlug || getPlatformFromUrl(editProfile.url)} />
            </div>
            <div className="flex-1 ml-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-2">
                <input
                  className="bg-[#232323] text-white font-bold text-base w-full rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600 transition"
                  placeholder="Platform (e.g. LinkedIn)"
                  value={editProfile.platform}
                  onChange={e => setEditProfile({ ...editProfile, platform: e.target.value })}
                />
                <input
                  className="bg-[#232323] text-gray-300 text-sm w-full rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600 transition"
                  placeholder="Username"
                  value={editProfile.username}
                  onChange={e => setEditProfile({ ...editProfile, username: e.target.value })}
                />
              </div>
              <input
                className={`bg-[#232323] text-gray-300 text-sm w-full rounded px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600 transition mb-2 ${editWebsiteError ? "border-red-500" : "border-[#333]"}`}
                placeholder="Website"
                value={newProfile.url}
                onChange={e => handleUrlChange(e.target.value)}
              />
              {editWebsiteError && (
                <div className="text-red-500 text-xs mt-1">{editWebsiteError}</div>
              )}
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <button
                className="text-green-400 hover:text-white bg-green-900/30 hover:bg-green-600/80 rounded p-2 transition"
                onClick={handleEditSave}
                type="button"
                title="Save"
              >
                <FiCheck size={18} />
              </button>
              <button
                className="text-gray-400 hover:text-white bg-red-900/30 hover:bg-red-600/80 rounded p-2 transition"
                onClick={handleEditCancel}
                type="button"
                title="Cancel"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>
          ) : (
            <div
              key={idx}
              className="flex items-center bg-[#181818] border border-[#222] rounded p-4 mb-2"
            >
              <FaGripLinesVertical className="text-gray-500 mr-3" />
              <ProfileIcon slug={profile.iconSlug || getPlatformFromUrl(profile.url)} />
              <div className="flex-1 ml-3">
                <div className="font-bold text-white">{profile.platform}</div>
                <div className="text-gray-400 text-sm">{profile.username}</div>
                {profile.url && (
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline"
                  >
                    {profile.url}
                  </a>
                )}
              </div>
              <button
                className="ml-2 text-indigo-400 hover:text-indigo-600"
                onClick={() => handleEdit(idx)}
                type="button"
                title="Edit"
              >
                <FiEdit3 />
              </button>
              <button
                className="ml-2 text-red-400 hover:text-red-600"
                onClick={() => handleDelete(idx)}
                type="button"
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
          )
        )}
      </div>

      {/* Inline Dialog */}
      {showDialog ? (
        <div className="bg-[#181818] border border-[#222] rounded p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Create a new item</h3>
            <button onClick={() => setShowDialog(false)} className="text-gray-400 hover:text-white text-xl">&times;</button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">Network</label>
              <input
                className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
                value={newProfile.platform}
                onChange={e => setNewProfile(p => ({ ...p, platform: e.target.value }))}
                placeholder="GitHub"
              />
            </div>
            <div>
              <label className="block mb-1">Username</label>
              <input
                className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
                value={newProfile.username}
                onChange={e => setNewProfile(p => ({ ...p, username: e.target.value }))}
                placeholder="john.doe"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Website</label>
            <input
              className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
              value={newProfile.url}
              onChange={e => handleUrlChange(e.target.value)}
              placeholder="https://github.com/johndoe"
            />
            {websiteError && (
              <div className="text-red-500 text-xs mt-1">{websiteError}</div>
            )}
          </div>
          <div className="mb-4 ">
            <label className="block mb-1">Icon</label>
            <div className="flex items-center gap-2">
              <ProfileIcon slug={newProfile.iconSlug || getPlatformFromUrl(newProfile.url)} />
              <input
                className="w-full p-2 rounded bg-[#181818] border border-[#333] text-white"
                value={newProfile.iconSlug}
                onChange={e => setNewProfile(p => ({ ...p, iconSlug: e.target.value }))}
                placeholder="github"
              />
              {/* <span className="text-xs text-gray-500 ml-2">Powered by <b>React Icons</b></span> */}
            </div>
          </div>
          <button
            className="mt-4 bg-white text-black px-4 py-2 rounded"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      ) : (
        <button
          className="flex items-center gap-2 border border-[#222] text-white px-4 py-2 rounded hover:bg-[#181818] transition"
          onClick={() => setShowDialog(true)}
          type="button"
        >
          <FiPlus />
          Add a new item
        </button>
      )}
    </section>
  );
}