import bcrypt from 'bcryptjs';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { env } from '$env/dynamic/private';

import { connectToDatabase } from '$lib/db';

import type { User } from '$lib/dbModelTypes';

import { sendConfirmationEmail, sendVerificationEmail } from './email';

const db = await connectToDatabase();
const usersCollection = db.collection<User>('users');

export const login = async (email: string, password: string) => {
  const user = await usersCollection.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, isVerified: user.isVerified },
    env.JWT_SECRET as string,
    {
      expiresIn: env.JWT_EXPIRES_IN as string
    }
  );

  return { success: true, token, userId: user._id, isVerified: user.isVerified };
};

export const signup = async (email: string, password: string) => {
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    email,
    password: hashedPassword,
    role: 'user',
    createdAt: new Date(),
    isVerified: false
  };

  const result = await usersCollection.insertOne(newUser);
  if (!result.insertedId) {
    throw new Error('Failed to create user');
  }

  const verificationToken = jwt.sign(
    { userId: result.insertedId, email },
    env.JWT_SECRET as string,
    { expiresIn: '24h' }
  );

  await sendVerificationEmail(email, verificationToken);
  return { success: true, userId: result.insertedId };
};

export const verifyEmail = async (token: string) => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as string) as JwtPayload;
    if (typeof decoded === 'object' && decoded.userId && decoded.email) {
      const result = await usersCollection.updateOne(
        { _id: new ObjectId(decoded.userId as ObjectId) },
        { $set: { isVerified: true } }
      );

      if (result.modifiedCount === 0) {
        throw new Error('Failed to verify email');
      }

      const newToken = jwt.sign(
        { userId: decoded.userId, email: decoded.email, isVerified: true },
        env.JWT_SECRET as string,
        {
          expiresIn: env.JWT_EXPIRES_IN as string
        }
      );

      await sendConfirmationEmail(decoded.email);
      return { success: true, token: newToken };
    } else {
      throw new Error('Invalid token payload');
    }
  } catch (error) {
    throw new Error('Token verification failed: ' + (error as Error).message);
  }
};

export const resendEmail = async (email: string, userId: string) => {
  const verificationToken = jwt.sign({ userId, email }, env.JWT_SECRET as string, {
    expiresIn: '24h'
  });

  await sendVerificationEmail(email, verificationToken);
  return { success: true };
};
