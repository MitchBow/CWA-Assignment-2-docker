// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { User } from '../../lib/sequelize';

export async function POST(req: Request) {
  try {
    // Parse JSON body
    const { username, password } = await req.json();

    // Basic validation
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Missing username or password' },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = await User.create({ username, password });

    // Return success message (omit password in response)
    const { password: _, ...userSafe } = newUser.get({ plain: true });

    return NextResponse.json({
      message: 'Registration successful',
      user: userSafe,
    });
  } catch (err: any) {
    console.error('Register error:', err);
    return NextResponse.json(
      { error: 'Registration failed', details: err.message },
      { status: 500 }
    );
  }
}
