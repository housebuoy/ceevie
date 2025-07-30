'use client'
import { Resume } from "@/types/resume";
import sampleData from "@/data/sample-resume.json";
import React, { useState } from 'react'
import {templates} from "@/app/components/template-resume";
import { useRouter } from "next/navigation";
import { TemplateCard } from "@/app/components/Preview";


const Page = () => {
  const router = useRouter();
  const resumeData: Resume = sampleData as Resume;
    const [activeIndex, setActiveIndex] = useState<string | null>(null);
    const handleCardHover = (id: string) => setActiveIndex(id);
    const handleCardLeave = () => setActiveIndex(null);
    const handleCardClick = (id: string) => setActiveIndex(id);
  return (
    <div className="pl-12 w-full">
        <div className="pt-16">
            <h1 className="text-2xl font-semibold">Choose a Template</h1>
            <p className='mt text-[#a2a2ab]'>Pick a template, polish your story—land the dream role!</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 bg-[#171717] rounded-sm py-6 px-6">
            {templates?.map((tpl) => (
              <TemplateCard
                key={tpl.id}
                isActive={activeIndex === tpl.id}
                onHover={() => handleCardHover(tpl.id)}
                onLeave={handleCardLeave}
                onClick={() => handleCardClick(tpl.id)}
                onCLickRouter={() => router.push(`/editor/${tpl.id}`)}
              >                
                <tpl.component resume={resumeData} />
              </TemplateCard>
            ))}
      </div>


    </div>
  )
}

export default Page