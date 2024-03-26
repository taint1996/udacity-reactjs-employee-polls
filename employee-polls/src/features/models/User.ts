export interface Answer {
  [questionId: string]: string;
}

export interface User {
  id: string;
  password: string;
  name: string;
  avatarURL: string | null;
  answers: Record<string, string>;
  questions: string[];
}

export interface Users {
  [key: string]: User;
}


