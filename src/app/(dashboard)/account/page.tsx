"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal,
  BarChart3,
  Target,
  TrendingUp,
  Users,

} from "lucide-react"
import { useAuthUser } from "@/hooks/useAuth"
import { Skeleton } from "@/components/ui/skeleton"

export default function AccountPage() {
  const { data: authUser, isLoading, isError } = useAuthUser();
  console.log("Auth User:", authUser);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Prepare a presentation for the client",
      description: "Create slides and prepare a product demonstration",
      priority: "high",
      status: "in-progress",
      dueDate: "2024-01-15",
      project: "Project Alpha",
    },
    {
      id: 2,
      title: "Code review of new features",
      description: "Check the pull request from the development team",
      priority: "medium",
      status: "pending",
      dueDate: "2024-01-12",
      project: "Development",
    },
    {
      id: 3,
      title: "Meeting with the Marketing Team",
      description: "Discuss Q1 promotion strategy",
      priority: "low",
      status: "completed",
      dueDate: "2024-01-10",
      project: "Marketing",
    },
    {
      id: 4,
      title: "Update API documentation",
      description: "Add description of new endpoints",
      priority: "medium",
      status: "pending",
      dueDate: "2024-01-18",
      project: "Documentation",
    },
  ])

  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const completedTasks = tasks.filter((task) => task.status === "completed").length
  const totalTasks = tasks.length
  const completionRate = Math.round((completedTasks / totalTasks) * 100);


  function handleCreateTask() {

     setIsCreateTaskOpen(false);
  }


   if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-80" />
          </div>
          {/* Skeleton for statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-6 w-16 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
          {/* skeleton */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-12 w-full" />
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-700 mb-2">Ошибка загрузки данных</h2>
            <p className="text-slate-600 mb-6">
              Не удалось загрузить информацию о вашем аккаунте. Пожалуйста, попробуйте позже.
            </p>
            <Button onClick={() => window.location.reload()} className="maxter-bg">
              Попробовать снова
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-500 mb-2">
            Welcome, {authUser?.name || authUser?.username || 'Пользователь'}!👋
          </h1>
          <p className="text-slate-600">Here&apos;s what&apos;s happening with your projects today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total tasks</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTasks}</div>
              <p className="text-xs text-muted-foreground">+2 since last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Done</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <p className="text-xs text-muted-foreground">+1 today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate}%</div>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active projects</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">2 ending soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tasks Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My tasks</CardTitle>
                    <CardDescription>Manage your tasks and projects</CardDescription>
                  </div>
                  <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
                    <DialogTrigger asChild>
                      <Button className="maxter-bg">
                        <Plus className="w-4 h-4 mr-2" />
                          New task
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create a new task</DialogTitle>
                        <DialogDescription>Add details for your new task</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <label htmlFor="title" className="text-sm font-medium">
                            Name
                          </label>
                          <Input id="title" placeholder="Введите название задачи" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="description" className="text-sm font-medium">
                            Description
                          </label>
                          <Textarea id="description" placeholder="Опишите задачу подробнее" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Priority</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите приоритет" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">High</SelectItem> 
                                <SelectItem value="medium">Medium</SelectItem> 
                                <SelectItem value="low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Deadline</label>
                            <Input type="date" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Project</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите проект" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="alpha">Project Alpha</SelectItem> 
                              <SelectItem value="development">Development</SelectItem> 
                              <SelectItem value="marketing">Marketing</SelectItem> 
                              <SelectItem value="docs">Documentation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsCreateTaskOpen(false)}>
                          Cancel
                        </Button>
                        <Button 
                        className="maxter-bg" 
                        onClick={handleCreateTask}>
                          Create task1
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Поиск задач..." className="pl-10" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="in-progress">In progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4 mt-6">
                    {tasks.map((task) => (
                      <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {getStatusIcon(task.status)}
                              <h3 className="font-semibold text-slate-500">{task.title}</h3>
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority === "high" && "High"}
                                {task.priority === "medium" && "Medium"}
                                {task.priority === "low" && "Low"}
                              </Badge>
                            </div>
                            <p className="text-slate-500 text-sm mb-3">{task.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-slate-500">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{task.dueDate}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{task.project}</span>
                              </div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="pending" className="space-y-4 mt-6">
                    {tasks
                      .filter((task) => task.status === "pending")
                      .map((task) => (
                        <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                {getStatusIcon(task.status)}
                                <h3 className="font-semibold text-slate-500">{task.title}</h3>
                                <Badge className={getPriorityColor(task.priority)}>
                                  {task.priority === "high" && "High"}
                                  {task.priority === "medium" && "Medium"}
                                  {task.priority === "low" && "Low"}
                                </Badge>
                              </div>
                              <p className="text-slate-500 text-sm mb-3">{task.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-slate-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{task.dueDate}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>{task.project}</span>
                                </div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                  </TabsContent>

                  <TabsContent value="in-progress" className="space-y-4 mt-6">
                    {tasks
                      .filter((task) => task.status === "in-progress")
                      .map((task) => (
                        <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                {getStatusIcon(task.status)}
                                <h3 className="font-semibold text-slate-500">{task.title}</h3>
                                <Badge className={getPriorityColor(task.priority)}>
                                  {task.priority === "high" && "High"}
                                  {task.priority === "medium" && "Medium"}
                                  {task.priority === "low" && "Low"}
                                </Badge>
                              </div>
                              <p className="text-slate-500 text-sm mb-3">{task.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-slate-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{task.dueDate}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>{task.project}</span>
                                </div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                  </TabsContent>

                  <TabsContent value="completed" className="space-y-4 mt-6">
                    {tasks
                      .filter((task) => task.status === "completed")
                      .map((task) => (
                        <div
                          key={task.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow opacity-75"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                {getStatusIcon(task.status)}
                                <h3 className="font-semibold text-slate-500 line-through">{task.title}</h3>
                                <Badge className={getPriorityColor(task.priority)}>
                                  {task.priority === "high" && "High"}
                                  {task.priority === "medium" && "Medium"}
                                  {task.priority === "low" && "Low"}
                                </Badge>
                              </div>
                              <p className="text-slate-500 text-sm mb-3">{task.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-slate-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{task.dueDate}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>{task.project}</span>
                                </div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start maxter-bg">
                  <Plus className="w-4 h-4 mr-2" />
                  Create a task
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule a meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Invite to the team
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">The task &quot;Meet the team&quot; is completed</p>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">New task added to Alpha project</p>
                      <p className="text-xs text-slate-500">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">The task deadline is approaching</p>
                      <p className="text-xs text-slate-500">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-red-100">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Code review</p>
                      <p className="text-xs text-slate-500">Tomorrow</p>
                    </div>
                    <Badge className="bg-red-100 text-red-700 border-red-200">Urgently</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-yellow-100">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Presentation</p>
                      <p className="text-xs text-slate-500">January 15</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Soon</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}