import { NextResponse } from 'next/server';
import { User, initDB } from './_db';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    await initDB();

    const user = await User.findOne({ where: { username } });
    if (!user || user.get('password') !== password) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    return NextResponse.json({ success: true, userId: user.get('id') });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
