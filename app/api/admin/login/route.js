import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (email === 'admin@gmail.com' && password === '123456') {
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: { email: 'admin@gmail.com', role: 'admin' },
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
