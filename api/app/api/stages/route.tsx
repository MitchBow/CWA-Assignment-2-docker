// app/api/stages/route.ts
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

// ✅ Save stages
export async function POST(req: Request) {
  const headers = setCorsHeaders();

  try {
    const { username, stages } = await req.json();
    if (!username)
      return new Response(
        JSON.stringify({ error: 'Missing username' }),
        { status: 400, headers }
      );

    const user = await User.findOne({ where: { username } });
    if (!user)
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers }
      );

    await user.update({ stageProgress: JSON.stringify(stages) });

    return new Response(
      JSON.stringify({ message: 'Stages saved successfully' }),
      { status: 200, headers }
    );
  } catch (err: any) {
    console.error('Save stages error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to save stages', details: err.message }),
      { status: 500, headers }
    );
  }
}

// ✅ Load stages
export async function GET(req: Request) {
  const headers = setCorsHeaders();

  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username)
      return new Response(
        JSON.stringify({ error: 'Missing username' }),
        { status: 400, headers }
      );

    const user = await User.findOne({ where: { username } });
    if (!user)
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers }
      );

    return new Response(
      JSON.stringify({
        stages: user.stageProgress ? JSON.parse(user.stageProgress) : null,
      }),
      { status: 200, headers }
    );
  } catch (err: any) {
    console.error('Load stages error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to load stages', details: err.message }),
      { status: 500, headers }
    );
  }
}
