export function generateOTPCode(): string {
    const code = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    return code;
}
