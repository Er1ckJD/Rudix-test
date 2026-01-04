// src/utils/format.ts

/**
 * Funciones de formateo para la app
 */

// ============================================
// CURRENCY
// ============================================
export function formatCurrency(amount: number, currency: string = 'MXN'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatCurrencyCompact(amount: number, currency: string = 'MXN'): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return formatCurrency(amount, currency);
}

// ============================================
// DISTANCE
// ============================================
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  
  const km = meters / 1000;
  return `${km.toFixed(1)} km`;
}

// ============================================
// DURATION
// ============================================
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  
  return `${minutes} min`;
}

export function formatDurationShort(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  return `${minutes}m`;
}

// ============================================
// DATE & TIME
// ============================================
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

// Formato relativo: "hace 5 minutos", "ayer", etc.
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Hace un momento';
  }
  
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `Hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  }
  
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  }
  
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    
    if (days === 1) return 'Ayer';
    return `Hace ${days} días`;
  }
  
  return formatDateShort(d);
}

// ============================================
// NUMBERS
// ============================================
export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// ============================================
// RATING
// ============================================
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getRatingLabel(rating: number): string {
  if (rating >= 4.8) return 'Excelente';
  if (rating >= 4.5) return 'Muy bueno';
  if (rating >= 4.0) return 'Bueno';
  if (rating >= 3.5) return 'Regular';
  return 'Mejorable';
}

// ============================================
// INITIALS
// ============================================
export function getInitials(name: string): string {
  const names = name.trim().split(' ');
  
  if (names.length === 1) {
    return names[0].substring(0, 2).toUpperCase();
  }
  
  return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
}

// ============================================
// TRUNCATE
// ============================================
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return `${text.substring(0, maxLength)}...`;
}

// ============================================
// CAPITALIZE
// ============================================
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function capitalizeWords(text: string): string {
  return text
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

// ============================================
// MASK
// ============================================
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  
  if (username.length <= 3) {
    return `${username[0]}***@${domain}`;
  }
  
  const masked = username.substring(0, 3) + '***';
  return `${masked}@${domain}`;
}

export function maskPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ***-${cleaned.slice(-4)}`;
  }
  
  return phone;
}

export function maskCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (cleaned.length < 4) {
    return cardNumber;
  }
  
  return `**** **** **** ${cleaned.slice(-4)}`;
}

// ============================================
// EXPORTS
// ============================================
export default {
  formatCurrency,
  formatCurrencyCompact,
  formatDistance,
  formatDuration,
  formatDurationShort,
  formatDate,
  formatDateShort,
  formatTime,
  formatDateTime,
  formatRelativeTime,
  formatNumber,
  formatPercentage,
  formatRating,
  getRatingLabel,
  getInitials,
  truncate,
  capitalize,
  capitalizeWords,
  maskEmail,
  maskPhone,
  maskCardNumber,
};