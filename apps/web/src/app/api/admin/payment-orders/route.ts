import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  try {
    const res = await fetch(`${request.headers.get('origin') || 'http://localhost:3000'}/api/payments/checkout`);
    if (res.ok) {
      let orders = await res.json();
      if (status && status !== 'ALL') {
        orders = orders.filter((o: any) => o.status === status);
      }
      return NextResponse.json(orders);
    }
  } catch {
    // Fallback
  }

  return NextResponse.json([]);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, action, reason } = body;

    // Process payment approval/rejection
    return NextResponse.json({
      success: true,
      message: action === 'APPROVE' ? 'পেমেন্ট সফলভাবে অনুমোদিত হয়েছে।' : 'পেমেন্ট বাতিল করা হয়েছে।',
      orderId,
      status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'পেমেন্ট প্রসেস করা সম্ভব হয়নি।' },
      { status: 500 }
    );
  }
}

