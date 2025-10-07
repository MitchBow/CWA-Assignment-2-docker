import { NextResponse } from 'next/server';
import { User, initDB } from './_db';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
    }

    await initDB();

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const newUser = await User.create({ username, password });
    return NextResponse.json({ success: true, user: newUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
