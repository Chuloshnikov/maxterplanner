"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  DropdownMenuLabel,
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
  Bell,
  Settings,
  User,
  LogOut,
  BarChart3,
  Target,
  TrendingUp,
  Users,
  Link,
} from "lucide-react"
import PlatformNavigation from "@/components/dashboard/platform-navigation"

export default function DashboardPage() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Подготовить презентацию для клиента",
      description: "Создать слайды и подготовить демонстрацию продукта",
      priority: "high",
      status: "in-progress",
      dueDate: "2024-01-15",
      project: "Проект Alpha",
    },
    {
      id: 2,
      title: "Код-ревью новых функций",
      description: "Проверить pull request от команды разработки",
      priority: "medium",
      status: "pending",
      dueDate: "2024-01-12",
      project: "Разработка",
    },
    {
      id: 3,
      title: "Встреча с командой маркетинга",
      description: "Обсудить стратегию продвижения на Q1",
      priority: "low",
      status: "completed",
      dueDate: "2024-01-10",
      project: "Маркетинг",
    },
    {
      id: 4,
      title: "Обновить документацию API",
      description: "Добавить описание новых эндпоинтов",
      priority: "medium",
      status: "pending",
      dueDate: "2024-01-18",
      project: "Документация",
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
  const completionRate = Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-500 mb-2">Welcome, Max!👋</h1>
          <p className="text-slate-600">Here&apos;s what&apos;s happening with your projects today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего задач</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTasks}</div>
              <p className="text-xs text-muted-foreground">+2 с прошлой недели</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Выполнено</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <p className="text-xs text-muted-foreground">+1 сегодня</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Прогресс</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate}%</div>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активные проекты</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">2 завершаются скоро</p>
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
                    <CardTitle>Мои задачи</CardTitle>
                    <CardDescription>Управляйте своими задачами и проектами</CardDescription>
                  </div>
                  <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Новая задача
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Создать новую задачу</DialogTitle>
                        <DialogDescription>Добавьте детали для вашей новой задачи</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <label htmlFor="title" className="text-sm font-medium">
                            Название
                          </label>
                          <Input id="title" placeholder="Введите название задачи" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="description" className="text-sm font-medium">
                            Описание
                          </label>
                          <Textarea id="description" placeholder="Опишите задачу подробнее" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Приоритет</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите приоритет" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">Высокий</SelectItem>
                                <SelectItem value="medium">Средний</SelectItem>
                                <SelectItem value="low">Низкий</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Дедлайн</label>
                            <Input type="date" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Проект</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите проект" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="alpha">Проект Alpha</SelectItem>
                              <SelectItem value="development">Разработка</SelectItem>
                              <SelectItem value="marketing">Маркетинг</SelectItem>
                              <SelectItem value="docs">Документация</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsCreateTaskOpen(false)}>
                          Отмена
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsCreateTaskOpen(false)}>
                          Создать задачу
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
                    Фильтр
                  </Button>
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">Все</TabsTrigger>
                    <TabsTrigger value="pending">В ожидании</TabsTrigger>
                    <TabsTrigger value="in-progress">В работе</TabsTrigger>
                    <TabsTrigger value="completed">Выполнено</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4 mt-6">
                    {tasks.map((task) => (
                      <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {getStatusIcon(task.status)}
                              <h3 className="font-semibold text-slate-900">{task.title}</h3>
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority === "high" && "Высокий"}
                                {task.priority === "medium" && "Средний"}
                                {task.priority === "low" && "Низкий"}
                              </Badge>
                            </div>
                            <p className="text-slate-600 text-sm mb-3">{task.description}</p>
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
                              <DropdownMenuItem>Редактировать</DropdownMenuItem>
                              <DropdownMenuItem>Дублировать</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
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
                        <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                {getStatusIcon(task.status)}
                                <h3 className="font-semibold text-slate-900">{task.title}</h3>
                                <Badge className={getPriorityColor(task.priority)}>
                                  {task.priority === "high" && "Высокий"}
                                  {task.priority === "medium" && "Средний"}
                                  {task.priority === "low" && "Низкий"}
                                </Badge>
                              </div>
                              <p className="text-slate-600 text-sm mb-3">{task.description}</p>
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
                                <DropdownMenuItem>Редактировать</DropdownMenuItem>
                                <DropdownMenuItem>Дублировать</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
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
                        <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                {getStatusIcon(task.status)}
                                <h3 className="font-semibold text-slate-900">{task.title}</h3>
                                <Badge className={getPriorityColor(task.priority)}>
                                  {task.priority === "high" && "Высокий"}
                                  {task.priority === "medium" && "Средний"}
                                  {task.priority === "low" && "Низкий"}
                                </Badge>
                              </div>
                              <p className="text-slate-600 text-sm mb-3">{task.description}</p>
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
                                <DropdownMenuItem>Редактировать</DropdownMenuItem>
                                <DropdownMenuItem>Дублировать</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
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
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white opacity-75"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                {getStatusIcon(task.status)}
                                <h3 className="font-semibold text-slate-900 line-through">{task.title}</h3>
                                <Badge className={getPriorityColor(task.priority)}>
                                  {task.priority === "high" && "Высокий"}
                                  {task.priority === "medium" && "Средний"}
                                  {task.priority === "low" && "Низкий"}
                                </Badge>
                              </div>
                              <p className="text-slate-600 text-sm mb-3">{task.description}</p>
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
                                <DropdownMenuItem>Редактировать</DropdownMenuItem>
                                <DropdownMenuItem>Дублировать</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
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
                <CardTitle className="text-lg">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Создать задачу
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Запланировать встречу
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Пригласить в команду
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Недавняя активность</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900">Задача &quot;Встреча с командой&quot; выполнена</p>
                      <p className="text-xs text-slate-500">2 часа назад</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900">Новая задача добавлена в проект Alpha</p>
                      <p className="text-xs text-slate-500">4 часа назад</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900">Дедлайн задачи приближается</p>
                      <p className="text-xs text-slate-500">6 часов назад</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ближайшие дедлайны</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Код-ревью</p>
                      <p className="text-xs text-slate-500">Завтра</p>
                    </div>
                    <Badge className="bg-red-100 text-red-700 border-red-200">Срочно</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Презентация</p>
                      <p className="text-xs text-slate-500">15 января</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Скоро</Badge>
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