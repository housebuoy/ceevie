'use client'
import { useAuth } from '@/context/AuthContext';
import {
  Settings,
  LibraryBig,
  ChevronUp,
} from 'lucide-react'
import {IoCloudUploadOutline } from 'react-icons/io5'
import { IoDocumentsOutline } from 'react-icons/io5'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar'
import Image from 'next/image'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const items = [
  { title: 'Resume', url: '/dashboard/home', icon: IoDocumentsOutline },
  { title: 'Template Library', url: '/dashboard/library', icon: LibraryBig },
  { title: 'Uploads', url: '/dashboard/uploads', icon: IoCloudUploadOutline  },
  { title: 'Settings', url: '#', icon: Settings },
]

export function HomeSidebar() {
  const { user, loading } = useAuth();
  return (
    <>
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex flex-col h-screen border-r bg-[#0d0d0d]  text-white w-[14rem] overflow-hidden">
        <SidebarHeader className="border-b py-4 px-4 mb-2">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo/Ceevie.png"
              alt="Ceevie Logo"
              width={32}
              height={32}
            />
            <span className="font-semibold text-lg">Ceevie</span>
          </div>
        </SidebarHeader>

        <SidebarContent className="flex-1 px-2">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size="lg">
                      <a
                        href={item.url}
                        className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-[#1a1a1a] transition"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t px-1 py-3 mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-full cursor-pointer flex items-center gap-3 hover:bg-[#1a1a1a] px-2 py-2 rounded-md">
                {/* Avatar */}
                <Avatar className="h-8 w-8">
                  {loading ? (
                    <div className="h-8 w-8 rounded-full bg-[#1a1a1a] animate-pulse" />
                  ) : (
                    <>
                      <AvatarImage
                        src={user?.photoURL || ''}
                        alt={user?.displayName || ''}
                      />
                      <AvatarFallback>
                        {user?.displayName?.slice(0, 2) || 'U'}
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>

                {/* Text */}
                <div className="flex flex-col text-xs text-left overflow-hidden">
                  {loading ? (
                    <>
                      <div className="h-3 w-24 bg-[#1a1a1a] rounded animate-pulse mb-1" />
                      <div className="h-3 w-40 bg-[#1a1a1a] rounded animate-pulse" />
                    </>
                  ) : (
                    <>
                      <span className="font-semibold" title={user?.displayName ?? undefined}>
                        {user?.displayName}
                      </span>
                      <span className="text-gray-400" title={user?.email ?? undefined}>
                        {user?.email}
                      </span>
                    </>
                  )}
                </div>

                {/* Chevron */}
                {loading ? (
                  <div className="ml-auto h-4 w-4 bg-[#1a1a1a] rounded animate-pulse" />
                ) : (
                  <ChevronUp className="ml-auto h-4 w-4" />
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] bg-[#1a1a1a] text-white rounded-md shadow-md mt-1 p-2">
              <DropdownMenuItem>Account</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <p className="text-[10px] text-gray-500 mt-2 pl-1">
            © {new Date().getFullYear()} Ceevie. All rights reserved.
          </p>
        </SidebarFooter>
      </Sidebar>

      {/* Mobile Sidebar */}
      {/* Mobile/Tablet Sidebar (Toggle with SidebarTrigger) */}
      <div className="lg:hidden">
        <Sidebar>
          <SidebarHeader className="border-b py-2 px-4 mb-2">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo/Ceevie.png"
                alt="Ceevie Logo"
                width={32}
                height={32}
              />
              <span className="font-semibold text-lg">Ceevie</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className="flex items-center gap-2 px-3 py-2"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t px-4 py-3 mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-full cursor-pointer flex items-center gap-3 hover:bg-[#1a1a1a] px-2 py-2 rounded-md">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || ''} />
                  <AvatarFallback>
                    {user?.displayName
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-xs text-left overflow-hidden">
                  <span className="font-semibold truncate">{user?.displayName}</span>
                  <span className="text-gray-400 truncate"></span>
                </div>
                <ChevronUp className="ml-auto h-4 w-4" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[200px] bg-[#1a1a1a] text-white rounded-md shadow-md mt-1 p-2">
              <DropdownMenuItem className="cursor-pointer px-2 py-2 rounded hover:bg-[#2a2a2a]">
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer px-2 py-2 rounded hover:bg-[#2a2a2a]">
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer px-2 py-2 rounded hover:bg-[#2a2a2a]">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <p className="text-[10px] text-gray-500 mt-2 pl-1">
            © {new Date().getFullYear()} Ceevie. All rights reserved.
          </p>
        </SidebarFooter>
        </Sidebar>
      </div>
    </>
  )
}
