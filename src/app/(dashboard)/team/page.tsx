"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Briefcase,
  BarChart3,
  CheckCircle2,
  Clock,
  UserPlus,
  Star,
  Calendar,
  MessageSquare,
  Shield,
} from "lucide-react"

// Типы данных
type TeamMember = {
  id: number
  name: string
  role: string
  department: string
  email: string
  phone: string
  avatar?: string
  status: "online" | "offline" | "away" | "busy"
  projects: number[]
  skills: string[]
  completedTasks: number
  totalTasks: number
  joinedDate: string
  lastActive: string
  isAdmin: boolean
}

type Project = {
  id: number
  name: string
  progress: number
}

export default function TeamPage() {
  // Состояние для участников команды
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Alexey Petrov",
      role: "Project Manager",
      department: "Management",
      email: "alex@example.com",
      phone: "+7 (999) 123-45-67",
      avatar: "/placeholder.svg?height=200&width=200",
      status: "online",
      projects: [1, 2, 4],
      skills: ["Project Management", "Agile", "Scrum", "Strategic Planning"],
      completedTasks: 48,
      totalTasks: 52,
      joinedDate: "2022-01-15",
      lastActive: "2024-01-10",
      isAdmin: true,
    },
    {
      id: 2,
      name: "Maria Smirnova",
      role: "Designer",
      department: "Design",
      email: "maria@example.com",
      phone: "+38 (067) 234-56-78",
      avatar: "/placeholder.svg?height=200&width=200",
      status: "online",
      projects: [1, 3],
      skills: ["UI/UX", "Figma", "Adobe XD", "Illustration"],
      completedTasks: 32,
      totalTasks: 36,
      joinedDate: "2022-03-10",
      lastActive: "2024-01-10",
      isAdmin: false,
    },
    {
      id: 3,
      name: "Ivan Kozlov",
      role: "Developer",
      department: "Development",
      email: "ivan@example.com",
      phone: "+38 (067) 345-67-89",
      avatar: "/placeholder.svg?height=200&width=200",
      status: "away",
      projects: [1, 5],
      skills: ["React", "TypeScript", "Node.js", "Next.js"],
      completedTasks: 64,
      totalTasks: 78,
      joinedDate: "2022-02-05",
      lastActive: "2024-01-09",
      isAdmin: false,
    },
    {
      id: 4,
      name: "Olga Vasilyeva",
      role: "Marketer",
      department: "Marketing",
      email: "olga@example.com",
      phone: "+38 (067) 456-78-90",
      avatar: "/placeholder.svg?height=200&width=200",
      status: "offline",
      projects: [2, 3],
      skills: ["SMM", "Content Marketing", "Email Marketing", "Analytics"],
      completedTasks: 28,
      totalTasks: 34,
      joinedDate: "2022-04-20",
      lastActive: "2024-01-08",
      isAdmin: false,
    },
    {
      id: 5,
      name: "Dmitry Lebedev",
      role: "Developer",
      department: "Development",
      email: "dmitry@example.com",
      phone: "+38 (067) 567-89-01",
      avatar: "/placeholder.svg?height=200&width=200",
      status: "busy",
      projects: [2, 4],
      skills: ["Python", "Django", "SQL", "Docker"],
      completedTasks: 42,
      totalTasks: 50,
      joinedDate: "2022-05-15",
      lastActive: "2024-01-10",
      isAdmin: false,
    },
    {
      id: 6,
      name: "Sergey Novikov",
      role: "Analyst",
      department: "Analytics",
      email: "sergey@example.com",
      phone: "+38 (067) 678-90-12",
      avatar: "/placeholder.svg?height=200&width=200",
      status: "online",
      projects: [3, 5],
      skills: ["Data Analysis", "Power BI", "Excel", "SQL"],
      completedTasks: 36,
      totalTasks: 42,
      joinedDate: "2022-06-10",
      lastActive: "2024-01-09",
      isAdmin: false,
    },
    {
      id: 7,
      name: "Anna Morozova",
      role: "HR manager",
      department: "HR",
      email: "anna@example.com",
      phone: "+38 (067) 789-01-23",
      avatar: "/placeholder.svg?height=200&width=200",
      status: "online",
      projects: [6],
      skills: ["Recruiting", "Adaptation", "Training", "HR administration"],
      completedTasks: 24,
      totalTasks: 28,
      joinedDate: "2022-07-05",
      lastActive: "2024-01-10",
      isAdmin: true,
    },
    {
      id: 8,
      name: "Pavel Sokolov",
      role: "Tester",
      department: "QA",
      email: "pavel@example.com",
      phone: "+38 (067) 890-12-34",
      avatar: "/placeholder.svg?height=200&width=200",
      status: "offline",
      projects: [1, 2],
      skills: ["Manual testing", "Automation", "Selenium", "Postman"],
      completedTasks: 38,
      totalTasks: 44,
      joinedDate: "2022-08-15",
      lastActive: "2024-01-07",
      isAdmin: false,
    },
  ])

  // Проекты
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "Website redesign", progress: 65 },
    { id: 2, name: "Mobile app", progress: 40 },
    { id: 3, name: "Marketing campaign", progress: 25 },
    { id: 4, name: "CRM system update", progress: 100 },
    { id: 5, name: "Analytical report", progress: 80 },
    { id: 6, name: "Staff training", progress: 50 },
  ])

  // Состояние для фильтров и поиска
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)

  // Функция для фильтрации участников команды
  const filteredMembers = teamMembers.filter((member) => {
    // Фильтр по поисковому запросу
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())

    // Фильтр по отделу
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter

    return matchesSearch && matchesDepartment
  })

  // Получаем уникальные отделы для фильтра
  const departments = Array.from(new Set(teamMembers.map((member) => member.department)))

  // Функция для получения цвета статуса
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-slate-400"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      default:
        return "bg-slate-400"
    }
  }

  // Функция для получения текста статуса
  const getStatusText = (status: string) => {
        switch (status) {
            case "online":
            return "Online"
            case "offline":
            return "Offline"
            case "away":
            return "Away"
            case "busy":
            return "Busy"
            default:
            return status
        }
    }

  // Функция для форматирования даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Team Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Team</h1>
            <p className="text-slate-600">Manage team members and their roles</p>
          </div>
          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Add a participant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add a new member</DialogTitle>
                <DialogDescription>Fill in the information about the new team member</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      First and last name
                    </label>
                    <Input id="name" placeholder="Введите имя и фамилию" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите роль" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manager">Project Manager</SelectItem> 
                        <SelectItem value="designer">Designer</SelectItem> 
                        <SelectItem value="developer">Developer</SelectItem> 
                        <SelectItem value="marketer">Marketer</SelectItem> 
                        <SelectItem value="analyst">Analyst</SelectItem> 
                        <SelectItem value="hr">HR manager</SelectItem> 
                        <SelectItem value="qa">Tester</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите отдел" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="management">Management</SelectItem> 
                        <SelectItem value="design">Design</SelectItem> 
                        <SelectItem value="development">Development</SelectItem> 
                        <SelectItem value="marketing">Marketing</SelectItem> 
                        <SelectItem value="analytics">Analytics</SelectItem> 
                        <SelectItem value="hr">HR</SelectItem> 
                        <SelectItem value="qa">QA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Telephone
                  </label>
                  <Input id="phone" placeholder="+7 (999) 123-45-67" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Projects</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign projects" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Administrator rights</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите уровень доступа" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddMemberOpen(false)}>
                  Add a participant
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Team Filters */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Поиск участников..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Отдел" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All departments</SelectItem>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Team Members */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="relative mx-auto mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(
                      member.status,
                    )}`}
                    title={getStatusText(member.status)}
                  ></div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="mt-1">{member.role}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedMember(member)}>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Badge variant="outline" className="mt-2">
                  {member.department}
                </Badge>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{member.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{member.projects.length} projects</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Tasks completed</span>
                    <span className="font-medium">
                      {member.completedTasks}/{member.totalTasks}
                    </span>
                  </div>
                  <Progress value={(member.completedTasks / member.totalTasks) * 100} className="h-2" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Team Statistics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
                    Statistics by departments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {departments.map((department) => {
                  const count = teamMembers.filter((m) => m.department === department).length
                  const percentage = (count / teamMembers.length) * 100
                  return (
                    <div key={department}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium">{department}</div>
                        <div className="text-sm text-slate-500">
                          {count} participant{count > 1 && count < 5 ? "" : count >= 5 ? "s" : ""}
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div
                        className={`${
                        department === "Management"
                        ? "bg-blue-600"
                        : department === "Design"
                        ? "bg-purple-600"
                        : department === "Development"
                        ? "bg-green-600"
                        : department === "Marketing"
                        ? "bg-orange-600"
                        : department === "Analytics"
                        ? "bg-cyan-600"
                        : department === "HR"
                        ? "bg-pink-600"
                        : "bg-slate-600"
                        } h-2.5 rounded-full`}
                        style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-blue-600" />
                Team performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">Overall progress</div>
                    <div className="text-sm text-slate-500">
                      {teamMembers.reduce((acc, member) => acc + member.completedTasks, 0)}/
                      {teamMembers.reduce((acc, member) => acc + member.totalTasks, 0)} tasks
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${
                          (teamMembers.reduce((acc, member) => acc + member.completedTasks, 0) /
                            teamMembers.reduce((acc, member) => acc + member.totalTasks, 0)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {teamMembers.reduce((acc, member) => acc + member.completedTasks, 0)}
                    </div>
                    <div className="text-sm text-slate-600">Completed tasks</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{projects.length}</div>
                    <div className="text-sm text-slate-600">Active projects</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Top participants by completed tasks</h4>
                  <div className="space-y-3">
                    {teamMembers
                      .sort((a, b) => b.completedTasks - a.completedTasks)
                      .slice(0, 3)
                      .map((member, index) => (
                        <div key={member.id} className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-6 text-center">
                            {index === 0 ? (
                              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            ) : (
                              <span className="text-slate-500 font-medium">{index + 1}</span>
                            )}
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{member.name}</div>
                            <div className="text-xs text-slate-500">{member.role}</div>
                          </div>
                          <div className="text-sm font-medium">{member.completedTasks} tasks</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-blue-600" />
              Recent team activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="min-w-10 pt-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Мария С." />
                    <AvatarFallback>МС</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">
                      <span className="font-semibold">Мария С.</span> завершила задачу в проекте{" "}
                      <span className="font-semibold">Редизайн веб-сайта</span>
                    </p>
                    <span className="text-xs text-slate-500">2 часа назад</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    The task: &quot;Develop a prototype of the main page&quot; was completed
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="min-w-10 pt-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Ivan K." />
                    <AvatarFallback>IK</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">
                      <span className="font-semibold">Ivan K.</span> added a comment to the task
                    </p>
                    <span className="text-xs text-slate-500">4 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    &quot;We need to discuss API integration at the next team meeting&quot;
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="min-w-10 pt-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alexy P." />
                    <AvatarFallback>AP</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">
                      <span className="font-semibold">Alexy P П.</span> assigned a task{" "}
                      <span className="font-semibold">Demetry L.</span>
                    </p>
                    <span className="text-xs text-slate-500">6 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    The task: &quot;Configure CI/CD for the project&quot; was assigned with a deadline of January 15th
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="min-w-10 pt-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Аnna М." />
                    <AvatarFallback>АМ</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">
                      <span className="font-semibold">Аnnа М.</span> added a new member to the team
                    </p>
                    <span className="text-xs text-slate-500">1 day ago</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">Pavel Sokolov joined the team as a Tester</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member Profile Dialog */}
      {selectedMember && (
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Member Profile</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 text-center">
                <Avatar className="h-32 w-32 mx-auto mb-4">
                  <AvatarImage src={selectedMember.avatar || "/placeholder.svg"} alt={selectedMember.name} />
                  <AvatarFallback>{selectedMember.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold mb-1">{selectedMember.name}</h3>
                <p className="text-slate-600 mb-2">{selectedMember.role}</p>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(selectedMember.status)}`}
                    title={getStatusText(selectedMember.status)}
                  ></div>
                  <span className="text-sm text-slate-600">{getStatusText(selectedMember.status)}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{selectedMember.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{selectedMember.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">Joined {formatDate(selectedMember.joinedDate)}</span>
                  </div>
                  {selectedMember.isAdmin && (
                    <div className="flex items-center space-x-2 text-blue-600">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">АAdministrator</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <Tabs defaultValue="projects">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                  <TabsContent value="projects" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      {projects
                        .filter((project) => selectedMember.projects.includes(project.id))
                        .map((project) => (
                          <div key={project.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">{project.name}</h4>
                              <Badge
                                variant="outline"
                                className={
                                  project.progress === 100
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-blue-100 text-blue-700 border-blue-200"
                                }
                              >
                                {project.progress === 100 ? "Завершен" : "В процессе"}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Progress</span>
                                <span className="font-medium">{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="skills" className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="activity" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-900">Completed the task &quot;Update API documentation&quot;</p>
                          <p className="text-xs text-slate-500">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-900">
                            Added a comment to the task &quot;Payment system integration&quot;
                          </p>
                          <p className="text-xs text-slate-500">3 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-900">Joined the project &quot;Analytical Report&quot;</p>
                          <p className="text-xs text-slate-500">5 days ago</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">Statistics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{selectedMember.completedTasks}</div>
                      <div className="text-xs text-slate-600">Tasks completed</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{selectedMember.projects.length}</div>
                      <div className="text-xs text-slate-600">Projects</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {Math.round((selectedMember.completedTasks / selectedMember.totalTasks) * 100)}%
                      </div>
                      <div className="text-xs text-slate-600">Efficiency</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Write
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule a meeting
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Assign a task
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
