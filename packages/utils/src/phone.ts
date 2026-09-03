/**
 * Bangladeshi Phone Number Normalization and Validation
 *
 * Supported user inputs:
 *  - 017XXXXXXXX
 *  - 88017XXXXXXXX
 *  - +88017XXXXXXXX
 *  - 017XX-XXXXXX
 *  - +88 017 XX-XXXXXX
 */

export interface PhoneValidationResult {
  isValid: boolean;
  canonical: string; // +8801XXXXXXXXX
  local: string;     // 01XXXXXXXXX
  error?: string;
}

export function normalizeBangladeshiPhone(input: string): PhoneValidationResult {
  if (!input || typeof input !== 'string') {
    return {
      isValid: false,
      canonical: '',
      local: '',
      error: 'ফোন নম্বর প্রদান করুন',
    };
  }

  // Remove spaces, dashes, parentheses, dots
  let cleaned = input.replace(/[\s\-().]/g, '');

  // Handle leading +880 or 880 or +88 or 0
  if (cleaned.startsWith('+880')) {
    cleaned = cleaned.substring(3); // e.g. 017XXXXXXXX
  } else if (cleaned.startsWith('880')) {
    cleaned = cleaned.substring(2); // e.g. 017XXXXXXXX
  } else if (cleaned.startsWith('+88')) {
    cleaned = cleaned.substring(3);
  }

  // Ensure starts with 0
  if (!cleaned.startsWith('0')) {
    cleaned = '0' + cleaned;
  }

  // Standard BD mobile regex: 013, 014, 015, 016, 017, 018, 019 followed by 8 digits (11 digits total)
  const bdMobileRegex = /^01[3-9]\d{8}$/;

  if (!bdMobileRegex.test(cleaned)) {
    return {
      isValid: false,
      canonical: '',
      local: cleaned,
      error: 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)',
    };
  }

  return {
    isValid: true,
    local: cleaned,
    canonical: `+88${cleaned}`,
  };
}

