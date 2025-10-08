import { NextRequest, NextResponse } from 'next/server';
import { User } from './lib/sequelize';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// GET all users or by id
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (id) {
      const user = await User.findByPk(parseInt(id));
      if (!user) return new NextResponse('User not found', { status: 404, headers: corsHeaders });
      return NextResponse.json(user, { headers: corsHeaders });
    }
    const users = await User.findAll();
    return NextResponse.json(users, { headers: corsHeaders });
  } catch (err) {
    console.error(err);
    return new NextResponse('Server error', { status: 500, headers: corsHeaders });
  }
}

// POST create user
export async function POST(req: NextRequest) {
  try {
    const bodyText = await req.text();
    const body = JSON.parse(bodyText); // ✅ manually parse JSON
    const { name, stage } = body;

    if (!name || !stage) return new NextResponse('Missing name or stage', { status: 400, headers: corsHeaders });

    const user = await User.create({ name, stage });
    return NextResponse.json(user, { status: 201, headers: corsHeaders });
  } catch (err) {
    console.error(err);
    return new NextResponse('Invalid request body', { status: 400, headers: corsHeaders });
  }
}

// PATCH update
export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return new NextResponse('Missing id', { status: 400, headers: corsHeaders });

    const user = await User.findByPk(parseInt(id));
    if (!user) return new NextResponse('User not found', { status: 404, headers: corsHeaders });

    const bodyText = await req.text();
    const body = JSON.parse(bodyText);
    const { name, stage } = body;

    if (name !== undefined) user.name = name;
    if (stage !== undefined) user.stage = stage;

    await user.save();
    return NextResponse.json(user, { headers: corsHeaders });
  } catch (err) {
    console.error(err);
    return new NextResponse('Invalid request', { status: 400, headers: corsHeaders });
  }
}

// DELETE
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return new NextResponse('Missing id', { status: 400, headers: corsHeaders });

    const user = await User.findByPk(parseInt(id));
    if (!user) return new NextResponse('User not found', { status: 404, headers: corsHeaders });

    await user.destroy();
    return new NextResponse(null, { status: 204, headers: corsHeaders });
  } catch (err) {
    console.error(err);
    return new NextResponse('Invalid request', { status: 400, headers: corsHeaders });
  }
}
