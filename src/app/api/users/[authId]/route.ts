import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/Users';

export async function GET(
  req: NextRequest,
  context: { params: { authId: string } }
) {
  const { authId } = await context.params;

  try {
    await dbConnect();
    const user = await User.findOne({ authId });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Server error:', error.message);
    } else {
      console.error('❌ Server error:', error);
    }
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}