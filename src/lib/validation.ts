/**
 * Phone validation utility — Single source of truth for phone formatting and validation
 * Supports international and UK formats with flexible user input
 */

export function validatePhone(phone: string): { valid: boolean; error?: string } {
  const cleaned = phone.replace(/[\s\-()\.]/g, '');

  if (!cleaned) {
    return { valid: false, error: 'Phone number is required' };
  }

  // Accept international + UK formats (10+ digits)
  if (!/^\+?\d{10,}$/.test(cleaned)) {
    return {
      valid: false,
      error: 'Invalid format. Try: +44 7482 112110 or 07482 112110',
    };
  }

  return { valid: true };
}

/**
 * Auto-format phone number for display
 * Converts: 07482112110 -> +44 7482 112110
 */
export function formatPhoneDisplay(phone: string): string {
  const cleaned = phone.replace(/[\s\-()\.]/g, '');
  if (cleaned.startsWith('0')) {
    return '+44 ' + cleaned.slice(1);
  }
  return cleaned;
}
