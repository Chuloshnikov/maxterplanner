"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Clock,
  CheckCircle2,
  Star,
  StarOff,
  Briefcase,
  BarChart3,
  ArrowUpRight,
  Layers,
} from "lucide-react"

// Типы данных
type Project = {
  id: number
  name: string
  description: string
  status: "active" | "completed" | "on-hold"
  progress: number
  tasks: {
    total: number
    completed: number
  }
  deadline: string
  team: {
    id: number
    name: string
    avatar?: string
  }[]
  isFavorite: boolean
  createdAt: string
  category: string
}

export default function ProjectsPage() {
  // Состояние для проектов
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Website redesign",
      description: "Updating the design and functionality of the corporate website",
      status: "active",
      progress: 65,
      tasks: {
        total: 24,
        completed: 16,
      },
      deadline: "2024-02-15",
      team: [
        { id: 1, name: "Alex F.", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 2, name: "Маria S.", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 3, name: "Itan К.", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      isFavorite: true,
      createdAt: "2023-12-01",
      category: "Design",
    },
    {
      id: 2,
      name: "Mobile application",
      description: "Development of a native mobile application for iOS and Android",
      status: "active",
      progress: 40,
      tasks: {
        total: 36,
        completed: 14,
      },
      deadline: "2024-03-20",
      team: [
        { id: 1, name: "Alex P.", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 4, name: "Оlya В.", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 5, name: "Dred L.", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      isFavorite: false,
      createdAt: "2023-12-15",
      category: "Development",
    },
    {
      id: 3,
      name: "Marketing campaign",
      description: "Launching an advertising campaign for a new product",
      status: "on-hold",
      progress: 25,
      tasks: {
        total: 18,
        completed: 4,
      },
      deadline: "2024-02-28",
      team: [
        { id: 2, name: "Маria С.", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 6, name: "Serhi Н.", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      isFavorite: false,
      createdAt: "2024-01-05",
      category: "Marketing",
    },
    {
      id: 4,
      name: "Updating the CRM system",
      description: "Integration and setup of a new CRM system",
      status: "completed",
      progress: 100,
      tasks: {
        total: 12,
        completed: 12,
      },
      deadline: "2024-01-10",
      team: [
        { id: 1, name: "Аlex P.", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 5, name: "Demetr L.", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      isFavorite: true,
      createdAt: "2023-11-20",
      category: "IT",
    },
    {
      id: 5,
      name: "Analytical report",
      description: "Preparation of quarterly analytical report",
      status: "active",
      progress: 80,
      tasks: {
        total: 8,
        completed: 6,
      },
      deadline: "2024-01-25",
      team: [
        { id: 3, name: "Ivan К.", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 6, name: "Serhy Н.", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      isFavorite: false,
      createdAt: "2024-01-02",
      category: "Analytics",
    },
    {
      id: 6,
      name: "Staff training",
      description: "Training program for new employees",
      status: "active",
      progress: 50,
      tasks: {
        total: 10,
        completed: 5,
      },
      deadline: "2024-02-10",
      team: [
        { id: 2, name: "Маria S.", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 4, name: "Оlga В.", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      isFavorite: false,
      createdAt: "2023-12-20",
      category: "HR",
    },
  ])

  // Состояние для фильтров и поиска
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)

  // Функция для фильтрации проектов
  const filteredProjects = projects.filter((project) => {
    // Фильтр по поисковому запросу
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Фильтр по статусу
    const matchesStatus = statusFilter === "all" || project.status === statusFilter

    // Фильтр по категории
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Функция для получения цвета статуса
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200"
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "on-hold":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  // Функция для получения текста статуса
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "completed":
        return "Completed"
      case "on-hold":
        return "On Hold"
      default:
        return status
    }
  }

  // Функция для переключения избранного статуса
  const toggleFavorite = (id: number) => {
    setProjects(
      projects.map((project) => {
        if (project.id === id) {
          return { ...project, isFavorite: !project.isFavorite }
        }
        return project
      }),
    )
  }

  // Получаем уникальные категории для фильтра
  const categories = Array.from(new Set(projects.map((project) => project.category)))

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-500 mb-2">Projects</h1>
            <p className="text-slate-500">Manage all your projects in one place</p>
          </div>
          <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
            <DialogTrigger asChild>
              <Button className="maxter-bg text-white">
                <Plus className="w-4 h-4 mr-2" />
                New project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create a new project</DialogTitle>
                <DialogDescription>Fill in the information about your new project</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Project name
                  </label>
                  <Input id="name" placeholder="Enter the project name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea id="description" placeholder="Describe the project in more detail" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Deadline</label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project participants</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите участников" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alex">Alexey P.</SelectItem>
                      <SelectItem value="maria">Maria S.</SelectItem>
                      <SelectItem value="ivan">Ivan K.</SelectItem>
                      <SelectItem value="olga">Olga V.</SelectItem>
                      <SelectItem value="dmitry">Dmitry L.</SelectItem>
                      <SelectItem value="sergey">Sergey N.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateProjectOpen(false)}>
                    Cancel
                </Button>
                <Button className="maxter-bg" onClick={() => setIsCreateProjectOpen(false)}>
                    Create project
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects Filters */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Поиск проектов..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On pause</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Projects Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All projects</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          {/* All Projects Tab */}
          <TabsContent value="all" className="mt-6">
            {filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-xl">{project.name}</CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleFavorite(project.id)}
                          >
                            {project.isFavorite ? (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="h-4 w-4 text-slate-400" />
                            )}
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Archive</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {project.category}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>
                              {project.tasks.completed}/{project.tasks.total} tasks
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span>{project.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.team.map((member) => (
                          <Avatar key={member.id} className="border-2 border-white h-8 w-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {project.team.length > 3 && (
                          <div className="h-8 w-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-medium">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${project.id}`}>
                          <span className="flex items-center">
                            Open
                            <ArrowUpRight className="ml-1 h-3 w-3" />
                          </span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-slate-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Briefcase className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">No projects found</h3>
                <p className="text-slate-600 mb-6">
                    No projects found matching your search criteria or filters
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                    setCategoryFilter("all")
                  }}
                >
                    Reset filters
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects
                .filter((project) => project.isFavorite)
                .map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-xl">{project.name}</CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleFavorite(project.id)}
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Archive</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {project.category}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>
                              {project.tasks.completed}/{project.tasks.total} tasks
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span>{project.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.team.map((member) => (
                          <Avatar key={member.id} className="border-2 border-white h-8 w-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${project.id}`}>
                          <span className="flex items-center">
                            Open
                            <ArrowUpRight className="ml-1 h-3 w-3" />
                          </span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Recent Tab */}
          <TabsContent value="recent" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 6)
                .map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-xl">{project.name}</CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleFavorite(project.id)}
                          >
                            {project.isFavorite ? (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="h-4 w-4 text-slate-400" />
                            )}
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem>Archive</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {project.category}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>
                              {project.tasks.completed}/{project.tasks.total} tasks
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span>{project.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.team.map((member) => (
                          <Avatar key={member.id} className="border-2 border-white h-8 w-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${project.id}`}>
                          <span className="flex items-center">
                            Оpen
                            <ArrowUpRight className="ml-1 h-3 w-3" />
                          </span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Project Statistics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
                Project statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">Active projects</div>
                    <div className="text-sm text-slate-500">
                      {projects.filter((p) => p.status === "active").length} of {projects.length}
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div
                      className="maxter-bg h-2.5 rounded-full"
                      style={{
                        width: `${(projects.filter((p) => p.status === "active").length / projects.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">Completed projects</div>
                    <div className="text-sm text-slate-500">
                      {projects.filter((p) => p.status === "completed").length} of {projects.length}
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{
                        width: `${(projects.filter((p) => p.status === "completed").length / projects.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">Projects on pause</div>
                    <div className="text-sm text-slate-500">
                      {projects.filter((p) => p.status === "on-hold").length} of {projects.length}
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div
                      className="bg-yellow-500 h-2.5 rounded-full"
                      style={{
                        width: `${(projects.filter((p) => p.status === "on-hold").length / projects.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layers className="mr-2 h-5 w-5 text-blue-600" />
                Project categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categories.map((category) => {
                  const count = projects.filter((p) => p.category === category).length
                  const percentage = (count / projects.length) * 100
                  return (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium">{category}</div>
                        <div className="text-sm text-slate-500">
                          {count} project{count > 1 && count < 5 ? "а" : count >= 5 ? "s" : ""}
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div
                          className={`${
                            category === "Design"
                              ? "bg-purple-600"
                              : category === "Development"
                                ? "bg-blue-600"
                                : category === "Marketing"
                                  ? "bg-green-600"
                                  : category === "IT"
                                    ? "bg-cyan-600"
                                    : category === "Analytics"
                                      ? "bg-orange-600"
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
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-blue-600" />
              Recent activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="min-w-10 pt-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Мaria S." />
                    <AvatarFallback>МS</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">
                      <span className="font-semibold">Maria S.</span> added a new task to the project{" "}
                      <span className="font-semibold">Website redesign</span>
                    </p>
                    <span className="text-xs text-slate-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    Task: `&quot;Develop a prototype of the main page`&quot; was added
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="min-w-10 pt-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alexey P." />
                    <AvatarFallback>АP</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">
                      <span className="font-semibold">Alexey P.</span> completed a task in the project{" "}
                      <span className="font-semibold">Mobile application</span>
                    </p>
                    <span className="text-xs text-slate-500">5 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    ЗTask: `&quot;Configure authorization via social networks&quot; has been completed
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="min-w-10 pt-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Иван К." />
                    <AvatarFallback>ИК</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">
                      <span className="font-semibold">Ivan K.</span> created a new project{" "}
                      <span className="font-semibold">Analytical report</span>
                    </p>
                    <span className="text-xs text-slate-500">1 day ago</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">The project has been created and the first tasks have been added.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="min-w-10 pt-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Ольга В." />
                    <AvatarFallback>ОВ</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">
                      <span className="font-semibold">Olga V.</span> updated project status{" "}
                      <span className="font-semibold">Marketing campaign</span>
                    </p>
                    <span className="text-xs text-slate-500">22 days ago</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">Status changed from &quot;Active&quot; to &quot;Pause&quot;</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
