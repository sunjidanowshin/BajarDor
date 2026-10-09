/** Turn BetterAuth error codes into friendly Bangla messages. */
const MESSAGES: Record<string, string> = {
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগেই একটি অ্যাকাউন্ট খোলা হয়েছে।",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "এই ইমেইল দিয়ে আগেই একটি অ্যাকাউন্ট খোলা হয়েছে।",
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।",
  INVALID_EMAIL: "সঠিক ইমেইল ঠিকানা লিখুন।",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
  PASSWORD_TOO_LONG: "পাসওয়ার্ড অনেক বড় হয়ে গেছে।",
};

export function authErrorMessage(error: { code?: string; message?: string } | null | undefined): string {
  if (!error) return "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।";
  return (error.code && MESSAGES[error.code]) || error.message || "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।";
}

/** Only allow redirects to paths on this site (prevents open-redirects via ?redirect=). */
export function safeRedirect(path: string | null | undefined, fallback = "/"): string {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return fallback;
  return path;
}
