// app/api/register/route.ts
import { User } from '../../lib/sequelize';

function setCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: setCorsHeaders() });
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

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Username already exists' }),
        { status: 409, headers }
      );
    }

    const newUser = await User.create({ username, password });
    const { password: _, ...userSafe } = newUser.get({ plain: true });

    return new Response(
      JSON.stringify({ message: 'Registration successful', user: userSafe }),
      { status: 201, headers }
    );
  } catch (err: any) {
    console.error('Register error:', err);
    return new Response(
      JSON.stringify({ error: 'Registration failed', details: err.message }),
      { status: 500, headers }
    );
  }
}
