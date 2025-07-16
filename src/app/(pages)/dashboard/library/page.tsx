'use client'
import ModernTemplate from "@/app/components/templates/ModernTemplate";
import { Resume } from "@/types/resume";
import sampleData from "@/data/sample-resume.json";
import React, { useState } from 'react'
// import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/app/components/Preview";
import { TwoColumnTemplate } from "@/app/components/templates/TwoColumnTemplate";
import { ModernResume } from "@/app/components/templates/TemplateWithBg";
import CompactResume from "@/app/components/templates/CompactTemplate";

const Page = () => {
  const resumeData: Resume = sampleData as Resume;
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handleCardClick = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };
  return (
    <div className="pl-12 w-full">
        <div className="pt-16">
            <h1 className="text-2xl font-semibold">Choose a Template</h1>
            <p className='mt text-[#a2a2ab]'>Pick a template, polish your story—land the dream role!</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 bg-[#171717] rounded-sm py-6 px-6">
            <TemplateCard  isActive={activeIndex === 0} onClick={() => handleCardClick(0)}>
                <ModernTemplate resume={resumeData} />
            </TemplateCard>
            <TemplateCard  isActive={activeIndex === 1} onClick={() => handleCardClick(1)}>
                <TwoColumnTemplate resume={resumeData} />
            </TemplateCard>
            <TemplateCard  isActive={activeIndex === 2} onClick={() => handleCardClick(2)}>
                <ModernResume resume={resumeData} />
            </TemplateCard>
            <TemplateCard  isActive={activeIndex === 3} onClick={() => handleCardClick(3)}>
                <CompactResume resume={resumeData} />
            </TemplateCard>
        {/* Add more templates */}
      </div>


    </div>
  )
}

export default Page