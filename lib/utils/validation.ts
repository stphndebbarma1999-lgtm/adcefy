export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidIndianPhone(value: string): boolean {
  return /^[6-9]\d{9}$/.test(value.replace(/\D/g, "").slice(-10));
}

export function isValidPincode(value: string): boolean {
  return /^\d{6}$/.test(value.trim());
}
