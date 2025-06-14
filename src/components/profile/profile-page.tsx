"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Bell,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  BarChart3,
  Award,
  Target,
  TrendingUp,
  Edit,
  Save,
  X,
} from "lucide-react"

// Типы данных
type UserProfile = {
  id: number
  name: string
  email: string
  phone: string
  role: string
  department: string
  location: string
  bio: string
  avatar: string
  joinedDate: string
  lastActive: string
  timezone: string
  language: string
  skills: string[]
  completedTasks: number
  totalTasks: number
  projectsCount: number
  achievements: string[]
}

type NotificationSettings = {
  emailNotifications: boolean
  pushNotifications: boolean
  taskReminders: boolean
  projectUpdates: boolean
  teamMessages: boolean
  weeklyReports: boolean
}

type SecuritySettings = {
  twoFactorEnabled: boolean
  lastPasswordChange: string
  activeSessions: number
}

const  ProfilePage = () => {
  // Состояние профиля пользователя
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 1,
    name: "Max Ch",
    email: "max@example.com",
    phone: "+38 (067) 123-12-12",
    role: "Project Manager",
    department: "Management",
    location: "Kyiv, Ukraine",
    bio: "Experienced project manager with over 5 years of experience in the IT field. I specialize in Agile methodologies and managing development teams.",
    avatar: "/placeholder.svg?height=200&width=200",
    joinedDate: "2022-01-15",
    lastActive: "2024-01-10",
    timezone: "Europe/Moscow",
    language: "ru",
    skills: ["Project Management", "Agile", "Scrum", "Strategic Planning", "Team leadership"],
    completedTasks: 48,
    totalTasks: 52,
    projectsCount: 6,
    achievements: ["Best PM of the year", "Completed 50+ tasks", "Manager of 5+ projects", "Team mentor"],
  });

  const timezonesUTC = [
  { offset: "UTC−12:00", zones: "Etc/GMT+12" },
  { offset: "UTC−11:00", zones: "Pacific/Pago_Pago, Pacific/Niue, Pacific/Midway" },
  { offset: "UTC−10:00", zones: "Pacific/Honolulu, Pacific/Tahiti, Pacific/Rarotonga"},
  { offset: "UTC−09:00", zones: "America/Anchorage, Pacific/Gambier" },
  { offset: "UTC−08:00", zones: "America/Los_Angeles, America/Vancouver, Pacific/Pitcairn" },
  { offset: "UTC−07:00", zones: "America/Denver, America/Phoenix, America/Edmonton" },
  { offset: "UTC−06:00", zones: "America/Chicago, America/Mexico_City, America/Guatemala" },
  { offset: "UTC−05:00", zones: "America/New_York, America/Toronto, America/Havana, America/Lima"},
  { offset: "UTC−04:00", zones: "America/Santiago, America/La_Paz, America/Caracas" },
  { offset: "UTC−03:00", zones: "America/Argentina/Buenos_Aires, America/Sao_Paulo, America/Montevideo" },
  { offset: "UTC−02:00", zones: "America/Noronha, Atlantic/South_Georgia" },
  { offset: "UTC−01:00", zones: "Atlantic/Azores, Atlantic/Cape_Verde" },
  { offset: "UTC±00:00", zones: "Europe/London, UTC, Africa/Abidjan, Atlantic/Reykjavik" },
  { offset: "UTC+01:00", zones: "Europe/Berlin, Europe/Paris, Africa/Lagos, Europe/Warsaw" },
  { offset: "UTC+02:00", zones: "Europe/Kyiv, Europe/Bucharest, Africa/Cairo, Europe/Helsinki" },
  { offset: "UTC+03:00", zones: "Europe/Moscow, Africa/Nairobi, Asia/Riyadh, Europe/Minsk" },
  { offset: "UTC+04:00", zones: "Asia/Dubai, Europe/Samara, Asia/Baku, Indian/Mauritius" },
  { offset: "UTC+05:00", zones: "Asia/Karachi, Asia/Yekaterinburg, Asia/Tashkent"},
  { offset: "UTC+06:00", zones: "Asia/Dhaka, Asia/Almaty, Asia/Bishkek" },
  { offset: "UTC+07:00", zones: "Asia/Bangkok, Asia/Novosibirsk, Asia/Jakarta" },
  { offset: "UTC+08:00", zones: "Asia/Shanghai, Asia/Singapore, Asia/Ulaanbaatar, Australia/Perth" },
  { offset: "UTC+09:00", zones: "Asia/Tokyo, Asia/Seoul, Asia/Yakutsk" },
  { offset: "UTC+10:00", zones: "Australia/Sydney, Pacific/Port_Moresby, Asia/Vladivostok" },
  { offset: "UTC+11:00", zones: "Pacific/Noumea, Pacific/Guadalcanal" },
  { offset: "UTC+12:00", zones: "Pacific/Auckland, Pacific/Fiji, Asia/Anadyr" },
  { offset: "UTC+13:00", zones: "Pacific/Tongatapu, Pacific/Apia, Pacific/Kanton" },
  { offset: "UTC+14:00", zones: "Pacific/Kiritimati" }
];

  // Настройки уведомлений
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    projectUpdates: true,
    teamMessages: false,
    weeklyReports: true,
  })

  // Настройки безопасности
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    lastPasswordChange: "2023-12-01",
    activeSessions: 3,
  })

  // Состояние для редактирования
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(userProfile)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Функция для сохранения изменений профиля
  const handleSaveProfile = () => {
    setUserProfile(editedProfile)
    setIsEditing(false)
  }

  // Функция для отмены изменений
  const handleCancelEdit = () => {
    setEditedProfile(userProfile)
    setIsEditing(false)
  }

  // Функция для обновления настроек уведомлений
  const updateNotificationSetting = (key: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Функция для форматирования даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-500 mb-2">My Profile</h1>
            <p className="text-slate-500">Manage your personal information and settings</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center pb-2">
                <div className="relative mx-auto mb-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                    <AvatarFallback className="text-2xl">{userProfile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 h-10 w-10 rounded-full maxter-bg"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
                <CardDescription className="text-lg">{userProfile.role}</CardDescription>
                <Badge variant="outline" className="mt-2">
                  {userProfile.department}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-500">{userProfile.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-500">{userProfile.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-500">{userProfile.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-500">In a team with {formatDate(userProfile.joinedDate)}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold maxter-text mb-1">{userProfile.completedTasks}</div>
                      <div className="text-xs text-slate-500">Tasks completed</div>
                    </div>
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold maxter-text mb-1">{userProfile.projectsCount}</div>
                      <div className="text-xs text-slate-500">Projects</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500">Task progress</span>
                    <span className="font-medium">
                      {Math.round((userProfile.completedTasks / userProfile.totalTasks) * 100)}%
                    </span>
                  </div>
                  <Progress value={(userProfile.completedTasks / userProfile.totalTasks) * 100} className="h-2" />
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Achievements</h4>
                  <div className="space-y-2">
                    {userProfile.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-slate-500">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Settings */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal information and contact details</CardDescription>
                      </div>
                      {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)} variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Button onClick={handleSaveProfile} size="sm" className="maxter-bg">
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                          <Button onClick={handleCancelEdit} variant="outline" size="sm">
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">First and last name</Label>
                        <Input
                          id="name"
                          value={isEditing ? editedProfile.name : userProfile.name}
                          onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={isEditing ? editedProfile.email : userProfile.email}
                          onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={isEditing ? editedProfile.phone : userProfile.phone}
                          onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={isEditing ? editedProfile.location : userProfile.location}
                          onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">About me</Label>
                      <Textarea
                        id="bio"
                        value={isEditing ? editedProfile.bio : userProfile.bio}
                        onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          value={isEditing ? editedProfile.timezone : userProfile.timezone}
                          onValueChange={(value) => setEditedProfile({ ...editedProfile, timezone: value })}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timezonesUTC.map((tz, index) => (
                                 <SelectItem key={index} value={tz.zones}>({tz.offset}) {tz.zones.slice(0, 50)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select
                          value={isEditing ? editedProfile.language : userProfile.language}
                          onValueChange={(value) => setEditedProfile({ ...editedProfile, language: value })}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ru">Russian</SelectItem> 
                            <SelectItem value="en">English</SelectItem> 
                            <SelectItem value="uk">Ukrainian</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>Please list your professional skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                          {skill}
                          {isEditing && (
                            <button
                              className="ml-2 text-blue-500 hover:text-blue-700"
                              onClick={() => {
                                const newSkills = editedProfile.skills.filter((_, i) => i !== index)
                                setEditedProfile({ ...editedProfile, skills: newSkills })
                              }}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                      {isEditing && (
                        <Button variant="outline" size="sm" className="h-6">
                          + Add skill
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-blue-600" />
                        Account Security
                        </CardTitle>
                        <CardDescription>Manage your account security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">Change password</h4>
                        <p className="text-sm text-slate-600">
                          Last modified: {formatDate(securitySettings.lastPasswordChange)}
                        </p>
                      </div>
                      <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Key className="w-4 h-4 mr-2" />
                            Change password
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>Enter Current Password and New Password</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="current-password">Current Password</Label>
                              <div className="relative">
                                <Input
                                  id="current-password"
                                  type={showCurrentPassword ? "text" : "password"}
                                  placeholder="Enter your current password"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-0 top-0 h-full px-3"
                                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-password">New Password</Label>
                              <div className="relative">
                                <Input
                                  id="new-password"
                                  type={showNewPassword ? "text" : "password"}
                                  placeholder="Enter new password"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-0 top-0 h-full px-3"
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirm-password">Confirm new password</Label>
                              <Input id="confirm-password" type="password" placeholder="Подтвердите новый пароль" />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2 mt-6">
                            <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
                              Cancel
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700">Change password</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">Two-factor authentication</h4>
                        <p className="text-sm text-slate-600">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={securitySettings.twoFactorEnabled}
                          onCheckedChange={(checked) =>
                            setSecuritySettings({ ...securitySettings, twoFactorEnabled: checked })
                          }
                        />
                        <span className="text-sm">{securitySettings.twoFactorEnabled ? "Включено" : "Отключено"}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-medium">Active sessions</h4>
                      <p className="text-sm text-slate-600">
                        Do you have {securitySettings.activeSessions} active sessions on different devices
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div>
                              <p className="font-medium">Current session</p>
                              <p className="text-sm text-slate-600">Chrome on Windows • Kyiv, Ukraine</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                            <div>
                              <p className="font-medium">Mobile application</p>
                              <p className="text-sm text-slate-600">iPhone • 2 days ago</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Finish
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Complete all other sessions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Settings */}
              <TabsContent value="notifications" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="mr-2 h-5 w-5 text-blue-600" />
                      Notification settings
                    </CardTitle>
                    <CardDescription>Choose which notifications you want to receive</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Email notifications</h4>
                          <p className="text-sm text-slate-500">Receive email notifications</p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) => updateNotificationSetting("emailNotifications", checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Push notifications</h4>
                          <p className="text-sm text-slate-500">Receive notifications in browser</p>
                        </div>
                        <Switch
                          checked={notificationSettings.pushNotifications}
                          onCheckedChange={(checked) => updateNotificationSetting("pushNotifications", checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Task Reminders</h4>
                          <p className="text-sm text-slate-500">Notifications about upcoming deadlines</p>
                        </div>
                        <Switch
                          checked={notificationSettings.taskReminders}
                          onCheckedChange={(checked) => updateNotificationSetting("taskReminders", checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Project Updates</h4>
                          <p className="text-sm text-slate-500">Project Change Notifications</p>
                        </div>
                        <Switch
                          checked={notificationSettings.projectUpdates}
                          onCheckedChange={(checked) => updateNotificationSetting("projectUpdates", checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Team Messages</h4>
                          <p className="text-sm text-slate-500">Notifications about new messages from colleagues</p>
                        </div>
                        <Switch
                          checked={notificationSettings.teamMessages}
                          onCheckedChange={(checked) => updateNotificationSetting("teamMessages", checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Weekly Reports</h4>
                          <p className="text-sm text-slate-500">Weekly Activity Summary</p>
                        </div>
                        <Switch
                          checked={notificationSettings.weeklyReports}
                          onCheckedChange={(checked) => updateNotificationSetting("weeklyReports", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
                        Activity statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold maxter-text mb-1">{userProfile.completedTasks}</div>
                            <div className="text-sm text-slate-500">Tasks completed</div>
                          </div>
                          <div className="border rounded-lg p-4 text-center">
                            <div className="text-3xl font-bold maxter-text mb-1">{userProfile.projectsCount}</div>
                            <div className="text-sm text-slate-500">Projects</div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-sm font-medium">Efficiency</div>
                            <div className="text-sm text-slate-500">
                              {Math.round((userProfile.completedTasks / userProfile.totalTasks) * 100)}%
                            </div>
                          </div>
                          <Progress
                            value={(userProfile.completedTasks / userProfile.totalTasks) * 100}
                            className="h-3"
                          />
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-medium">Activity by month</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">January</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-slate-100 rounded-full h-2">
                                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "80%" }}></div>
                                </div>
                                <span className="text-sm text-slate-500">16 tasks</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">December</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-slate-100 rounded-full h-2">
                                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                                </div>
                                <span className="text-sm text-slate-500">13 tasks</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">November</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-slate-100 rounded-full h-2">
                                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                                </div>
                                <span className="text-sm text-slate-500">19 tasks</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-blue-600" />
                        Recent activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-500">Completed the task &quot;Update API documentation&quot;</p>
                            <p className="text-xs text-slate-500">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-500">Added a comment to the task &quot;API Integration&quot;</p>
                            <p className="text-xs text-slate-500">4 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-900">
                              Created a new task in the project &quot;Mobile application&quot;
                            </p>
                            <p className="text-xs text-slate-500">6 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-500">Updated the status of the project &quot;Website Redesign&quot;</p>
                            <p className="text-xs text-slate-500">1 day ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-slate-500">Joined the project &quot;Analytical Report&quot;</p>
                            <p className="text-xs text-slate-500">2 days ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                      Progress on goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">Complete 50 tasks this month</span>
                          </div>
                          <span className="text-sm text-slate-600">48/50</span>
                        </div>
                        <Progress value={96} className="h-2" />
                        <p className="text-xs text-slate-500 mt-1">There are 2 tasks left to reach the goal</p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-green-600" />
                            <span className="font-medium">Participate in 5 projects</span>
                          </div>
                          <span className="text-sm text-slate-600">6/5</span>
                        </div>
                        <Progress value={100} className="h-2" />
                        <p className="text-xs text-green-600 mt-1 flex items-center">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          The goal has been achieved!
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-orange-600" />
                            <span className="font-medium">Learn a new skill</span>
                          </div>
                          <span className="text-sm text-slate-600">3/4</span>
                        </div>
                        <Progress value={75} className="h-2" />
                        <p className="text-xs text-slate-500 mt-1">Complete the Project Management Course</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;