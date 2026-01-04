// src/utils/validation.ts

/**
 * Validaciones comunes para la app
 */

// ============================================
// PHONE
// ============================================
export function isValidPhone(phone: string): boolean {
  // Formato: +52 55 1234 5678 o 5551234567 (10 dígitos)
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || (cleaned.length === 12 && cleaned.startsWith('52'));
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    // 5551234567 -> (555) 123-4567
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  if (cleaned.length === 12 && cleaned.startsWith('52')) {
    // 525551234567 -> +52 55 1234 5678
    return `+52 ${cleaned.slice(2, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8)}`;
  }
  
  return phone;
}

// ============================================
// EMAIL
// ============================================
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============================================
// PASSWORD
// ============================================
export interface PasswordStrength {
  score: number; // 0-4
  label: 'Muy débil' | 'Débil' | 'Media' | 'Fuerte' | 'Muy fuerte';
  suggestions: string[];
}

export function checkPasswordStrength(password: string): PasswordStrength {
  let score = 0;
  const suggestions: string[] = [];
  
  // Longitud
  if (password.length >= 8) score++;
  else suggestions.push('Usa al menos 8 caracteres');
  
  // Mayúsculas
  if (/[A-Z]/.test(password)) score++;
  else suggestions.push('Incluye una mayúscula');
  
  // Minúsculas
  if (/[a-z]/.test(password)) score++;
  else suggestions.push('Incluye una minúscula');
  
  // Números
  if (/\d/.test(password)) score++;
  else suggestions.push('Incluye un número');
  
  // Caracteres especiales
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  else suggestions.push('Incluye un carácter especial');
  
  const labels: PasswordStrength['label'][] = [
    'Muy débil',
    'Débil',
    'Media',
    'Fuerte',
    'Muy fuerte',
  ];
  
  return {
    score: Math.min(score, 4),
    label: labels[Math.min(score, 4)],
    suggestions,
  };
}

// ============================================
// NAMES
// ============================================
export function isValidName(name: string): boolean {
  // Al menos 2 caracteres, solo letras y espacios
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/.test(name);
}

export function capitalizeName(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// ============================================
// CREDIT CARD
// ============================================
export function isValidCardNumber(cardNumber: string): boolean {
  // Algoritmo de Luhn
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

export function formatCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, '');
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(' ');
}

export function getCardType(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (/^4/.test(cleaned)) return 'Visa';
  if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
  if (/^3[47]/.test(cleaned)) return 'American Express';
  
  return 'Desconocida';
}

// ============================================
// CVV
// ============================================
export function isValidCVV(cvv: string, cardType?: string): boolean {
  const cleaned = cvv.replace(/\D/g, '');
  
  if (cardType === 'American Express') {
    return cleaned.length === 4;
  }
  
  return cleaned.length === 3;
}

// ============================================
// LICENSE PLATE
// ============================================
export function isValidLicensePlate(plate: string): boolean {
  // Formato México: ABC-123-D o ABC-12-34
  const mexicoRegex = /^[A-Z]{3}-\d{2,3}-[A-Z\d]$/;
  return mexicoRegex.test(plate.toUpperCase());
}

export function formatLicensePlate(plate: string): string {
  return plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

// ============================================
// EXPORTS
// ============================================
export default {
  isValidPhone,
  formatPhone,
  isValidEmail,
  checkPasswordStrength,
  isValidName,
  capitalizeName,
  isValidCardNumber,
  formatCardNumber,
  getCardType,
  isValidCVV,
  isValidLicensePlate,
  formatLicensePlate,
};