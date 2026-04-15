import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

export const runtime = 'edge';

const ADMIN_PASSWORD = 'metabiz2026!';

// POST: 관리자 답변 작성
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = getDB();
    if (!db) return NextResponse.json({ error: 'DB not available' }, { status: 500 });

    const { content, adminPassword } = await request.json();

    if (adminPassword !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: '관리자 인증 실패' }, { status: 403 });
    }
    if (!content) {
      return NextResponse.json({ error: '답변 내용을 입력해주세요' }, { status: 400 });
    }

    await db.prepare(
      'INSERT INTO replies (post_id, content) VALUES (?, ?)'
    ).bind(id, content).run();

    await db.prepare(
      'UPDATE posts SET is_answered = 1 WHERE id = ?'
    ).bind(id).run();

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
