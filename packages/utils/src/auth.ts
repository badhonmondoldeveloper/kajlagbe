export interface PasswordStrength {
  score: number; // 0 to 4
  label: 'দুর্বল' | 'মোটামুটি' | 'ভালো' | 'খুব শক্তিশালী';
  color: string;
  feedback: string[];
}

export function validatePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return {
      score: 0,
      label: 'দুর্বল',
      color: 'bg-slate-200',
      feedback: ['পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে'],
    };
  }

  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('কমপক্ষে ৮ অক্ষর প্রয়োজন');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('কমপক্ষে ১টি বড় হাতের অক্ষর (A-Z) যোগ করুন');
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('কমপক্ষে ১টি সংখ্যা (0-9) যোগ করুন');
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('কমপক্ষে ১টি বিশেষ চিহ্ন (@, #, $, !) যোগ করুন');
  }

  const labels: Record<number, 'দুর্বল' | 'মোটামুটি' | 'ভালো' | 'খুব শক্তিশালী'> = {
    0: 'দুর্বল',
    1: 'দুর্বল',
    2: 'মোটামুটি',
    3: 'ভালো',
    4: 'খুব শক্তিশালী',
  };

  const colors: Record<number, string> = {
    0: 'bg-rose-500',
    1: 'bg-rose-500',
    2: 'bg-amber-500',
    3: 'bg-sky-500',
    4: 'bg-emerald-500',
  };

  return {
    score,
    label: labels[score] || 'দুর্বল',
    color: colors[score] || 'bg-rose-500',
    feedback,
  };
}

