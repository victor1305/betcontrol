import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

import { connectToDatabase } from '$lib/db';

import type { User } from '@/lib/dbModelTypes';

export const login = async (email: string, password: string) => {
  const db = await connectToDatabase();
  const user = await db.collection<User>('users').findOne({ email });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, env.JWT_SECRET as string, {
    expiresIn: env.JWT_EXPIRES_IN as string
  });

  return { success: true, token };
};

export const signup = async (email: string, password: string) => {
  const db = await connectToDatabase();
  const usersCollection = db.collection<User>('users');

  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    email,
    password: hashedPassword,
    role: 'user'
  };

  const result = await usersCollection.insertOne(newUser);

  if (result.insertedId) {
    const token = jwt.sign({ userId: result.insertedId, email: email }, env.JWT_SECRET as string, {
      expiresIn: env.JWT_EXPIRES_IN as string
    });
    return { success: true, token };
  } else {
    throw new Error('Failed to create user');
  }
};
