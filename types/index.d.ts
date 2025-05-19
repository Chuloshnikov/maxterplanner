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