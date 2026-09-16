import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/dataStore';

export async function GET() {
  try {
    const data = getPortfolioData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid payload' },
        { status: 400 }
      );
    }

    const success = savePortfolioData(body);
    if (success) {
      return NextResponse.json({ success: true, data: body });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to save data' },
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
