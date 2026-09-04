import { NextResponse } from 'next/server';

export interface ManualCheckoutSubmission {
  id: string;
  orderReference: string;
  userId?: string;
  userEmail: string;
  amountBdt: number;
  amountUsd: number;
  channelId: string;
  channelName: string;
  senderAccount: string;
  transactionId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes?: string;
  createdAt: string;
}

const memoryOrders: ManualCheckoutSubmission[] = [
  {
    id: 'ord-1001',
    orderReference: 'BK-2026-88419',
    userEmail: 'customer1@kajlagbe.com',
    amountBdt: 1200,
    amountUsd: 10.0,
    channelId: 'bkash-personal',
    channelName: 'bKash Personal',
    senderAccount: '01711223344',
    transactionId: 'TRX9A8B7C6D',
    status: 'PENDING',
    notes: 'এসি ওয়াশ সার্ভিস অগ্রিম পেমেন্ট',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'ord-1002',
    orderReference: 'WO-2026-99214',
    userEmail: 'provider.tech@gmail.com',
    amountBdt: 2400,
    amountUsd: 20.0,
    channelId: 'usdt-trc20',
    channelName: 'USDT (TRC20)',
    senderAccount: 'TKh19vW8xR4kL8zP2mN9qS7vB5xC3zY1aD',
    transactionId: '0x3f8a9b2c1d4e5f6a7b8c9d0e1f2a3b4c',
    status: 'APPROVED',
    notes: 'প্রোভাইডার মান্থলি সাবস্ক্রিপশন ফি',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(memoryOrders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      amountBdt,
      amountUsd,
      channelId,
      channelName,
      senderAccount,
      transactionId,
      notes,
      userEmail,
    } = body;

    if (!amountBdt || !channelId || !senderAccount || !transactionId) {
      return NextResponse.json(
        { success: false, error: 'অনুগ্রহ করে সকল আবশ্যকীয় পেমেন্ট তথ্য প্রদান করুন।' },
        { status: 400 }
      );
    }

    const orderRef = `PAY-${Date.now().toString().slice(-6)}`;
    const newSubmission: ManualCheckoutSubmission = {
      id: `ord-${Date.now()}`,
      orderReference: orderRef,
      userEmail: userEmail || 'user@kajlagbe.com',
      amountBdt: Number(amountBdt),
      amountUsd: Number(amountUsd || (Number(amountBdt) / 120).toFixed(2)),
      channelId,
      channelName: channelName || 'Manual Transfer',
      senderAccount,
      transactionId,
      status: 'PENDING',
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };

    memoryOrders.unshift(newSubmission);

    return NextResponse.json({
      success: true,
      message: 'পেমেন্ট তথ্য সফলভাবে জমা হয়েছে। অ্যাডমিন ভেরিফিকেশনের পর পেমেন্ট নিশ্চিত করা হবে।',
      order: newSubmission,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'পেমেন্ট সাবমিট করা সম্ভব হয়নি।' },
      { status: 500 }
    );
  }
}
