export interface FormTypes {
    username?: string | undefined
    email: string;
    password: string;
}

export interface CardProps {
      title: string;
      description: string;
      iconName: string;
      bgColor: string;
      iconColor: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  profilePic: string;
}



type FormType = "sign-in" | "sign-up";


type Post = {
    id: number;
    userId: number;
    title: string;
    body: string;
}

interface Comment {
    id: number;
    name: string;
    body: string;
  }
  
  interface CommentsPageProps {
    params: {
      id: string;
    };
  }

  interface PostParams {
    params: {
      id: number;
    };
  }

  
  interface TaskTypes {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  project: string;
  userId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  dueDate: string;   // ISO date string
};