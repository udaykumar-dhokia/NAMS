import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  Search,
  Settings,
  User2,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import { Link, useRouterState } from '@tanstack/react-router'

const items = [
  {
    title: 'Home',
    url: '/admin/dashboard',
    icon: Home,
  },
  {
    title: 'Degrees',
    url: '/admin/degrees',
    icon: Inbox,
  },
  {
    title: 'Departments',
    url: '/admin/departments',
    icon: Calendar,
  },
  {
    title: 'Courses',
    url: '/admin/courses',
    icon: Search,
  },
  {
    title: 'Timetables',
    url: '#',
    icon: Settings,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
]

export function AppSidebar() {
  const { admin } = useSelector((state: RootState) => state.adminReducer)
  const { colleges } = useSelector((state: RootState) => state.collegeReducer)
  const { location } = useRouterState()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-col items-start my-8">
            <h1 className="text-xl text-primary">{colleges?.name}</h1>
            <p>{colleges?.contact?.website}</p>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url}>
                        <item.icon
                          className={`${isActive ? 'text-primary' : ''}`}
                        />
                        <span className={`${isActive ? 'text-primary' : ''}`}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {admin?.name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
