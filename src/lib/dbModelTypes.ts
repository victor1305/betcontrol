export interface Tipster {
  _id?: string;
  name: string;
  userID: string;
  createdAt?: Date;
}

export interface User {
  _id?: string;
  email: string;
  role: string;
  password: string;
}