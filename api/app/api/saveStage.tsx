import { NextResponse } from 'next/server';
import { Stage, initDB } from './_db';

export async function POST(request: Request) {
  try {
    const { userId, stageData } = await request.json();

    if (!userId || !stageData) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    await initDB();

    const newStage = await Stage.create({ userId, stageData });
    return NextResponse.json({ success: true, stage: newStage });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to save stage' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  await initDB();
  const stages = await Stage.findAll({ where: { userId } });

  return NextResponse.json(stages);
}
