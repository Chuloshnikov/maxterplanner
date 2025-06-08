
export interface CardTypes {
    title: string;
    description: string;
    iconName: string;
    bgColor: string;
    iconColor: string;
}

export const CARTS: CardTypes[] = [
  {
    title: "Smart planning",
    description: "Create tasks with priorities, deadlines and automatic reminders",
    iconName: "CheckCircle",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    title: "Teamwork",
    description: "Share projects with colleagues and track progress in real time",
    iconName: "Users",
    bgColor: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    title: "Analytics",
    description: "Detailed productivity and task completion time reports",
    iconName: "BarChart3",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600"
  },
  {
    title: "Calendar",
    description: "Integrated calendar with Google Calendar and Outlook synchronization",
    iconName: "Calendar",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600"
  },
  {
    title: "Mobile app",
    description: "Work on tasks anywhere with our iOS and Android apps",
    iconName: "Smartphone",
    bgColor: "bg-red-100",
    iconColor: "text-red-600"
  },
  {
    title: "Security",
    description: "Data encryption and backup to protect your projects",
    iconName: "Shield",
    bgColor: "bg-teal-100",
    iconColor: "text-teal-600"
  }
];