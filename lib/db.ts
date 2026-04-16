import { getRequestContext } from '@cloudflare/next-on-pages';

export function getDB() {
  try {
    const ctx = getRequestContext();
    const env = ctx.env as any;
    if (env?.DB) return env.DB;
    // D1 바인딩이 없는 경우 - 로컬 dev 또는 바인딩 미설정
    return null;
  } catch (e) {
    // getRequestContext 실패 - Cloudflare 환경 외
    return null;
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

// 관리자 비밀번호 검증 (DB 우선, 없으면 기본값 폴백)
const DEFAULT_ADMIN_HASH = null; // 최초 설정 전까지 기본 비밀번호 사용
const DEFAULT_ADMIN_PASSWORD = 'metabiz2026!';

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const db = getDB();
  if (db) {
    try {
      const row = await db.prepare("SELECT value FROM admin_settings WHERE key = 'admin_password'").first();
      if (row) {
        return await verifyPassword(password, row.value as string);
      }
    } catch {}
  }
  // DB에 설정이 없으면 기본 비밀번호와 비교
  return password === DEFAULT_ADMIN_PASSWORD;
}

export async function changeAdminPassword(newPassword: string): Promise<boolean> {
  const db = getDB();
  if (!db) return false;
  const hashed = await hashPassword(newPassword);
  await db.prepare(
    "INSERT INTO admin_settings (key, value) VALUES ('admin_password', ?) ON CONFLICT(key) DO UPDATE SET value = ?"
  ).bind(hashed, hashed).run();
  return true;
}

// 이름 마스킹: 김철수 → 김*수
export function maskName(name: string): string {
  if (name.length <= 1) return name;
  if (name.length === 2) return name[0] + '*';
  return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
}
