'use client'
import { LuPlus } from "react-icons/lu";
import React from 'react'
import { useRouter } from 'next/navigation';
import ImportResumeChooserModal from "@/app/components/Modals/ImportResumeChooser";

const Home = () => {
  const router = useRouter();
  return (
      <div className="pl-12 w-full">
          <div className="pt-16">
              <h1 className="text-2xl font-semibold">Get Started</h1>
              <p className='mt text-[#a2a2ab]'>Lets get your dream job a start with some few simple steps!</p>
          </div>
          <div className="mt-6 flex items-center gap-4">
              <button
                className="w-36  h-44 bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] cursor-pointer flex flex-col items-center justify-center gap-3"
              onClick={() => router.push('/dashboard/library')}>
                <LuPlus className="w-10 h-10 text-4xl" />
                <p className="text-sm font-medium text-white text-center">
                  Create New
                </p>
              </button>
              {/* <ImportResumeModal />      */}
              <ImportResumeChooserModal triggerClassName="w-36 h-44 bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] cursor-pointer flex flex-col items-center justify-center gap-3" />
          </div>
          <div className="mt-6 w-full">
            <h1 className="text-2xl font-semibold">Recents</h1>
            <div className="w-full h-96 bg-[#1a1a1a] mt-4 rounded-lg flex items-center justify-center">
              <p className="text-sm font-medium text-white text-center">

                No recent resumés found. Start creating your first resumé!
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        </div>
      </div>
  )
}

export default Home