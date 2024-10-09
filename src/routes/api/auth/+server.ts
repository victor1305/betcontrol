import { type RequestHandler } from '@sveltejs/kit';

import { login, signup } from '@/services/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const data = await request.json();
    const action = data.action;
    const email = data.email;
    const password = data.password;

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
    } else {
      return new Response('Invalid action', { status: 400 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
};
