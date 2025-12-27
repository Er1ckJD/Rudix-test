export const AUTH_CONSTANTS = {
    CODE_LENGTH: 6,
    CODE_EXPIRATION_TIME: 300, // 5 minutos en segundos
    MIN_PASSWORD_LENGTH: 8,
    PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

export const AUTH_MESSAGES = {
    INVALID_EMAIL: 'El correo electrónico no es válido',
    INVALID_PHONE: 'El número de teléfono no es válido',
    PASSWORD_TOO_SHORT: `La contraseña debe tener al menos ${AUTH_CONSTANTS.MIN_PASSWORD_LENGTH} caracteres`,
    PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
    CODE_EXPIRED: 'El código ha expirado',
    INVALID_CODE: 'Código inválido',
    REQUIRED_FIELD: 'Este campo es obligatorio'
};