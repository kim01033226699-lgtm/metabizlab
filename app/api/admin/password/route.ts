import { NextRequest, NextResponse } from 'next/server';
import { getDB, verifyAdminPassword, hashPassword } from '@/lib/db';

export const runtime = 'edge';

// PUT: 관리자 비밀번호 변경
export async function PUT(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: '현재 비밀번호와 새 비밀번호를 입력해주세요' }, { status: 400 });
    }
    if (newPassword.length < 4) {
      return NextResponse.json({ error: '새 비밀번호는 4자 이상이어야 합니다' }, { status: 400 });
    }

    const valid = await verifyAdminPassword(currentPassword);
    if (!valid) {
      return NextResponse.json({ error: '현재 비밀번호가 올바르지 않습니다' }, { status: 403 });
    }

    const db = getDB();
    if (!db) {
      return NextResponse.json({ error: 'DB 연결 실패 - Cloudflare D1 바인딩을 확인해주세요' }, { status: 500 });
    }

    const hashed = await hashPassword(newPassword);

    // 테이블 없으면 생성
    await db.prepare(
      "CREATE TABLE IF NOT EXISTS admin_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)"
    ).run();

    await db.prepare(
      "INSERT INTO admin_settings (key, value) VALUES ('admin_password', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
    ).bind(hashed).run();

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || '알 수 없는 오류' }, { status: 500 });
  }
}
