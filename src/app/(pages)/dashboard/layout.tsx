// app/(dashboard)/layout.tsx
'use client';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { HomeSidebar } from "@/app/components/AppSidebar";
import { ReactNode } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex justify-between gap-0 min-h-screen w-full text-white">
          {/* Sidebar */}
          <div className="z-40">
            <HomeSidebar />
          </div>
          

          {/* Main Content */}
          <div className="flex flex-col relative w-full overflow-x-hidden">
            <div className="py-4 pl-4 fixed top-0 w-full bg-[#0d0d0d] border-b  z-100 flex items-center ">
              <div className="lg:hidden mr-4 bg-[#0d0d0d] ">
                <SidebarTrigger />
              </div>
              <h1 className="text-2xl font-bold">Resumés</h1>
              {/* <p className='mt-4'>Lets get your dream job a start with some few simple steps!</p> */}
            </div>
            {/* Sidebar Trigger on mobile (e.g. hamburger) */}
            <main className="p-4 w-full">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
