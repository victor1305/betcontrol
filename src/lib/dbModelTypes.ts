import { ObjectId } from 'mongodb';

export interface Tipster {
  _id?: ObjectId;
  name: string;
  userID: ObjectId;
  createdAt: Date;
}

export interface User {
  _id?: ObjectId;
  email: string;
  role: string;
  password: string;
  createdAt: Date;
  isVerified: boolean;
}