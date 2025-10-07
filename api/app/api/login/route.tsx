import { NextResponse } from 'next/server';
import { User } from '../../lib/sequelize';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
  }

  let user = await User.findOne({ where: { username } });

  if (!user) {
    user = await User.create({ username, password });
  } else if (user.password !== password) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
  }

  return NextResponse.json({ user });
}
