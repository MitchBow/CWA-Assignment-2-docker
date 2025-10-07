import { NextResponse } from 'next/server';
import { User } from '../../lib/sequelize';

// Save stages
export async function POST(req: Request) {
  const { username, stages } = await req.json();
  if (!username) return NextResponse.json({ error: 'Missing username' }, { status: 400 });

  const user = await User.findOne({ where: { username } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  await user.update({ stageProgress: JSON.stringify(stages) });

  return NextResponse.json({ message: 'Stages saved successfully' });
}

// Load stages
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) return NextResponse.json({ error: 'Missing username' }, { status: 400 });

  const user = await User.findOne({ where: { username } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ stages: user.stageProgress ? JSON.parse(user.stageProgress) : null });
}
