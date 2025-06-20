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

  
  