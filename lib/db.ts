export function getDB(env: any) {
  if (env?.DB) return env.DB;
  return null;
}

export function getEnv() {
  try {
    return (require('@cloudflare/next-on-pages') as any).getRequestContext().env;
  } catch {
    return {};
  }
}

// 비밀번호 해싱 (edge runtime용 - crypto.subtle)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  const hash = await hashPassword(password);
  return hash === hashed;
}

// 이름 마스킹: 김철수 → 김*수
export function maskName(name: string): string {
  if (name.length <= 1) return name;
  if (name.length === 2) return name[0] + '*';
  return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
}
