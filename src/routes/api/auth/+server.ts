import { type RequestHandler } from '@sveltejs/kit';

import { login, signup, verifyEmail, resendEmail } from '@/services/auth';

export const GET: RequestHandler = async ({ url }) => {
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response('Invalid token', { status: 400 });
  }

  try {
    const result = await verifyEmail(token);
    if (result.modifiedCount === 0) {
      return new Response('User not found or already verified', { status: 400 });
    }

    return new Response('Email successfully verified!', { status: 200 });
  } catch (error) {
    return new Response(error as string, { status: 400 });
  }
};

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const data = await request.json();
    const action = data.action;
    const email = data.email;
    const password = data.password;
    const userId = data.userId;

    if (action === 'login') {
      const result = await login(email, password);
      return new Response(JSON.stringify(result), { status: 200 });
    } else if (action === 'signup') {
      const result = await signup(email, password);
      return new Response(JSON.stringify(result), { status: 201 });
    } else if (action === 'logout') {
      cookies.delete('sessionToken', { path: '/' });
      return new Response(JSON.stringify({ success: true, message: 'Logged out successfully' }), {
        status: 200
      });
    } else if (action === 'resend-email') {
      await resendEmail(email, userId);
      return new Response(JSON.stringify({ success: true, message: 'Email resent correctly' }), {
        status: 200
      });
    } else {
      return new Response('Invalid action', { status: 400 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
