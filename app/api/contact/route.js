import { NextResponse } from 'next/server';
import { addContactMessage, getContactMessages } from '@/lib/dataStore';

export async function GET() {
  try {
    const messages = getContactMessages();
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const savedMessage = addContactMessage({ name, email, subject: subject || '', message });

    if (savedMessage) {
      return NextResponse.json({ success: true, message: 'Message sent successfully!', data: savedMessage });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to record message' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
