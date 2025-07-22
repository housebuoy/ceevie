// app/api/users/[authId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/Users';

export async function GET(
  req: NextRequest,
  contextPromise: Promise<{ params: { authId: string } }>
) {
  const { params } = await contextPromise;
  const { authId } = params;

  try {
    await dbConnect();

    const user = await User.findOne({ authId });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
