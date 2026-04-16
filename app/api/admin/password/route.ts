import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, changeAdminPassword } from '@/lib/db';

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

    const success = await changeAdminPassword(newPassword);
    if (!success) {
      return NextResponse.json({ error: 'DB를 사용할 수 없습니다' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
