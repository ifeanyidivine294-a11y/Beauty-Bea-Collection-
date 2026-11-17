/**
 * Formats numbers into Nigerian Naira currency format (e.g. ₦32,500)
 */
export function formatNaira(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₦0';
  }
  return `₦${Math.round(amount).toLocaleString('en-NG')}`;
}
