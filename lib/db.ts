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

// 환경변수에서 마스터/복구 비밀번호 조회
function getMasterPassword(): string | null {
  try {
    const ctx = getRequestContext();
    const env = ctx.env as any;
    return env?.ADMIN_PASSWORD || null;
  } catch {
    return null;
  }
}

// 관리자 비밀번호 검증
// - 환경변수 ADMIN_PASSWORD (Cloudflare Secret) = 마스터/복구용, 항상 유효
// - DB에 저장된 비밀번호 (사용자가 UI에서 변경) = 사용자 설정값
// - 둘 중 하나라도 일치하면 로그인 허용 → 사용자 비밀번호 분실 시 환경변수로 복구 가능
export async function verifyAdminPassword(password: string): Promise<boolean> {
  // 1. 마스터 비밀번호 (환경변수) 검증
  const master = getMasterPassword();
  if (master && password === master) return true;

  // 2. DB에 저장된 사용자 비밀번호 검증
  const db = getDB();
  if (db) {
    try {
      const row = await db.prepare("SELECT value FROM admin_settings WHERE key = 'admin_password'").first();
      if (row) {
        return await verifyPassword(password, row.value as string);
      }
    } catch {}
  }

  return false;
}

export async function changeAdminPassword(newPassword: string): Promise<boolean> {
  const db = getDB();
  if (!db) return false;
  const hashed = await hashPassword(newPassword);
  await db.prepare(
    "CREATE TABLE IF NOT EXISTS admin_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)"
  ).run();
  await db.prepare(
    "INSERT INTO admin_settings (key, value) VALUES ('admin_password', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
  ).bind(hashed).run();
  return true;
}

// 이름 마스킹: 김철수 → 김*수
export function maskName(name: string): string {
  if (name.length <= 1) return name;
  if (name.length === 2) return name[0] + '*';
  return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
}
