import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/Users';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { authId, name, email, avatar } = body;

    if (!authId || !email) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    const existing = await User.findOne({ authId });

    if (existing) {
      return NextResponse.json({ message: 'User already exists', user: existing }, { status: 200 });
    }

    const user = await User.create({ authId, name, email, avatar });

    return NextResponse.json({ message: 'User created', user }, { status: 201 });
  } catch (error) {
    console.error('Signup API error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
