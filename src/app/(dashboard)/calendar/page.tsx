"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  ChevronLeft,
  ChevronRight,
  Filter,
  CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

// Типы для задач и событий календаря
type Task = {
  id: number
  title: string
  description: string
  priority: "high" | "medium" | "low"
  status: "completed" | "in-progress" | "pending"
  date: string
  project: string
}

type CalendarDay = {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  tasks: Task[]
}

export default function Calendar() {
  // Состояние для текущей даты и выбранного месяца/года
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)

  // Примеры задач
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Prepare a presentation for a client",
      description: "Create slides and prepare a product demo",
      priority: "high",
      status: "in-progress",
      date: "2024-01-15",
      project: "Project Alpha",
    },
    {
      id: 2,
      title: "Code review of new features",
      description: "Check pull request from the development team",
      priority: "medium",
      status: "pending",
      date: "2024-01-12",
      project: "Development",
    },
    {
      id: 3,
      title: "Meeting with the marketing team",
      description: "Discuss the promotion strategy for Q1",
      priority: "low",
      status: "completed",
      date: "2024-01-10",
      project: "Marketing",
    },
    {
      id: 4,
      title: "Update API documentation",
      description: "Add description of new endpoints",
      priority: "medium",
      status: "pending",
      date: "2024-01-18",
      project: "Documentation",
    },
    {
      id: 5,
      title: "Weekly call with the team",
      description: "Discussing progress and plans for the week",
      priority: "medium",
      status: "pending",
      date: "2024-01-08",
      project: "Team",
    },
    {
      id: 6,
      title: "Preparing the report",
      description: "Financial report for Q4",
      priority: "high",
      status: "pending",
      date: "2024-01-20",
      project: "Finance",
    },
  ])

  // Функция для получения дней календаря
  const getCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // Первый день месяца
    const firstDayOfMonth = new Date(year, month, 1)
    // Последний день месяца
    const lastDayOfMonth = new Date(year, month + 1, 0)

    // День недели первого дня месяца (0 - воскресенье, 6 - суббота)
    const firstDayOfWeek = firstDayOfMonth.getDay()
    // Корректировка для начала недели с понедельника
    const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

    // Создаем массив дней
    const days: CalendarDay[] = []

    // Добавляем дни предыдущего месяца
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startOffset - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i)
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        tasks: getTasksForDate(date),
      })
    }

    // Добавляем дни текущего месяца
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i)
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isSameDay(date, new Date()),
        tasks: getTasksForDate(date),
      })
    }

    // Добавляем дни следующего месяца до заполнения сетки (6 недель * 7 дней = 42)
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i)
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        tasks: getTasksForDate(date),
      })
    }

    return days
  }

  // Функция для проверки, является ли дата сегодняшним днем
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  // Функция для получения задач на определенную дату
  const getTasksForDate = (date: Date): Task[] => {
    const dateString = formatDateToString(date)
    return tasks.filter((task) => task.date === dateString)
  }

  // Функция для форматирования даты в строку YYYY-MM-DD
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Функция для перехода к предыдущему месяцу
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // Функция для перехода к следующему месяцу
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Функция для перехода к текущему месяцу
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Получаем название текущего месяца и год
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const currentMonthName = monthNames[currentDate.getMonth()]
  const currentYear = currentDate.getFullYear()

  // Получаем дни недели
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Получаем дни календаря
  const calendarDays = getCalendarDays()

  // Функция для получения цвета приоритета
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

  // Функция для получения иконки статуса
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

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Calendar Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-500 mb-2">Calendar</h1>
            <p className="text-slate-500">Plan your tasks and events</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={goToToday}>
              Today
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="text-lg font-medium text-slate-500 min-w-[180px] text-center">
                {currentMonthName} {currentYear}
              </div>
              <Button variant="ghost" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
              <DialogTrigger asChild>
                <Button className="maxter-bg">
                  <Plus className="w-4 h-4 mr-2" />
                  New event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create a new event</DialogTitle>
                  <DialogDescription>Add details for your new event</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="title" placeholder="Enter the event name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      ОDescription
                    </label>
                    <Textarea id="description" placeholder="Describe the event in more detail" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date</label>
                      <Input type="date" defaultValue={selectedDate ? formatDateToString(selectedDate) : undefined} />
                    </div>
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
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project" />
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
                  <Button className="maxter-bg" onClick={() => setIsCreateTaskOpen(false)}>
                    Create an event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Calendar Filters */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Поиск событий..." className="pl-10" />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All projects</SelectItem> 
                <SelectItem value="alpha">Project Alpha</SelectItem> 
                <SelectItem value="development">Development</SelectItem> 
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Calendar */}
        <Card className="mb-8 maxter-bg">
          <CardHeader className="pb-0">
            <CardTitle>Events calendar</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 maxter-bg">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px  rounded-lg overflow-hidden">
              {/* Days of week */}
              {weekDays.map((day, index) => (
                <div key={index} className=" p-2 text-center text-sm font-medium text-black">
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`bg-white text-slate-500 min-h-[120px] p-2 ${
                    day.isCurrentMonth ? "" : "text-slate-400"
                  } ${day.isToday ? "bg-blue-50" : ""}`}
                  onClick={() => {
                    setSelectedDate(day.date)
                    setIsCreateTaskOpen(true)
                  }}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={`text-sm font-medium ${
                        day.isToday
                          ? "maxter-bg text-white w-6 h-6 rounded-full flex items-center justify-center"
                          : ""
                      }`}
                    >
                      {day.date.getDate()}
                    </span>
                    {day.tasks.length > 0 && (
                      <Badge className="bg-blue-100 maxter-bg border-blue-200 text-xs">{day.tasks.length}</Badge>
                    )}
                  </div>

                  {/* Tasks for this day */}
                  <div className="mt-2 space-y-1">
                    {day.tasks.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className={`text-xs p-1 rounded truncate ${
                          task.priority === "high"
                            ? "bg-red-50 border-l-2 border-red-500"
                            : task.priority === "medium"
                              ? "bg-yellow-50 border-l-2 border-yellow-500"
                              : "bg-green-50 border-l-2 border-green-500"
                        }`}
                      >
                        {task.title}
                      </div>
                    ))}
                    {day.tasks.length > 3 && (
                      <div className="text-xs text-slate-500 pl-1">+{day.tasks.length - 3} more</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks
                  .filter((task) => new Date(task.date) >= new Date())
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 4)
                  .map((task) => (
                    <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {getStatusIcon(task.status)}
                            <h3 className="font-semibold text-slate-500">{task.title}</h3>
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority === "high" && "Высокий"}
                              {task.priority === "medium" && "Средний"}
                              {task.priority === "low" && "Низкий"}
                            </Badge>
                          </div>
                          <p className="text-slate-500 text-sm mb-3">{task.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{task.date}</span>
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistics by month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">January</div>
                    <div className="text-sm text-slate-500">12 events</div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">February</div>
                    <div className="text-sm text-slate-500">8 events</div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">March</div>
                    <div className="text-sm text-slate-500">16 events</div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">April</div>
                    <div className="text-sm text-slate-500">5 events</div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

