import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const DEFAULT_CHANNELS = [
  {
    id: 'bkash-personal',
    type: 'BKASH',
    name: 'bKash Personal (বিকাশ পার্সোনাল)',
    accountNumber: '01700000000',
    accountType: 'Personal',
    networkName: 'bKash Mobile Menu (*247# / App)',
    instructions: 'bKash App অথবা *247# থেকে সেন্ড মানি করুন। এরপর ট্রানজেকশন আইডি (TrxID) দিন।',
    feePercentage: 0,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'nagad-personal',
    type: 'NAGAD',
    name: 'Nagad Personal (নগদ পার্সোনাল)',
    accountNumber: '01800000000',
    accountType: 'Personal',
    networkName: 'Nagad Mobile Menu (*167# / App)',
    instructions: 'Nagad App অথবা *167# থেকে সেন্ড মানি করুন। ট্রানজেকশন আইডি (TrxID) সাবমিট করুন।',
    feePercentage: 0,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'rocket-personal',
    type: 'ROCKET',
    name: 'Rocket Personal (রকেট পার্সোনাল)',
    accountNumber: '01900000000-7',
    accountType: 'Personal',
    networkName: 'Rocket App / DBBL Dial (*322#)',
    instructions: 'রকেট অ্যাপ অথবা dial *322# থেকে সেন্ড মানি সম্পন্ন করে TrxID প্রদান করুন।',
    feePercentage: 0,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'usdt-trc20',
    type: 'CRYPTO',
    name: 'USDT (Tether - TRC20)',
    accountNumber: 'TKh19vW8xR4kL8zP2mN9qS7vB5xC3zY1aD',
    accountType: 'Crypto Wallet Address',
    networkName: 'TRC20 (Tron Network)',
    instructions: 'Tron (TRC20) নেটওয়ার্কে USDT সেন্ড করুন এবং TxHash/Transaction Hash প্রদান করুন।',
    feePercentage: 0,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'usdt-bep20',
    type: 'CRYPTO',
    name: 'USDT (Tether - BEP20 / BNB Chain)',
    accountNumber: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    accountType: 'Crypto Wallet Address',
    networkName: 'BEP20 (BNB Smart Chain)',
    instructions: 'BNB Smart Chain (BEP20) নেটওয়ার্কে USDT ট্রান্সফার সম্পন্ন করুন এবং TxHash প্রদান করুন।',
    feePercentage: 0,
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
];

// Memory store fallback when API is detached
let globalChannels = [...DEFAULT_CHANNELS];

export async function GET() {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://epmbzwcvhophzhzetoio.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwbWJ6d2N2aG9waHpoemV0b2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MjUwMjUsImV4cCI6MjEwNDAwMTAyNX0.chCb9rM3BPlvzaRQYGZ0pCU7OW_TJnaaJG5sKGlsQFM';

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    });

    const { data: setting } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', 'MANUAL_PAYMENT_CHANNELS')
      .maybeSingle();

    if (setting && setting.value) {
      return NextResponse.json(JSON.parse(setting.value));
    }
  } catch {
    // Fallback
  }

  return NextResponse.json(globalChannels);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.channels && Array.isArray(body.channels)) {
      globalChannels = body.channels;
    }

    const cookieStore = cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://epmbzwcvhophzhzetoio.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwbWJ6d2N2aG9waHpoemV0b2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MjUwMjUsImV4cCI6MjEwNDAwMTAyNX0.chCb9rM3BPlvzaRQYGZ0pCU7OW_TJnaaJG5sKGlsQFM';

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    });

    await supabase.from('system_settings').upsert({
      key: 'MANUAL_PAYMENT_CHANNELS',
      value: JSON.stringify(globalChannels),
      description: 'Manual bKash, Nagad, Rocket and Crypto wallet payment settings',
    });

    return NextResponse.json({ success: true, channels: globalChannels });
  } catch (err: any) {
    return NextResponse.json({ success: true, channels: globalChannels });
  }
}

