// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { User } from '../../lib/sequelize';

// ✅ Helper for consistent CORS headers
function setCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*', // ⚠️ replace '*' with your frontend domain in production
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// ✅ Handle preflight (OPTIONS) request
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: setCorsHeaders(),
  });
}

export async function POST(req: Request) {
  const headers = setCorsHeaders();

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'Missing username or password' }),
        { status: 400, headers }
      );
    }

    let user = await User.findOne({ where: { username } });

    if (!user) {
      user = await User.create({ username, password });
    } else if (user.password !== password) {
      return new Response(
        JSON.stringify({ error: 'Incorrect password' }),
        { status: 403, headers }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Login successful', user }),
      { status: 200, headers }
    );
  } catch (err: any) {
    console.error('Login error:', err);
    return new Response(
      JSON.stringify({ error: 'Login failed', details: err.message }),
      { status: 500, headers }
    );
  }
}
