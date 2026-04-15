import { NextRequest, NextResponse } from 'next/server';
import { getDB, verifyPassword } from '@/lib/db';

export const runtime = 'edge';

const ADMIN_PASSWORD = 'metabiz2026!';

// DELETE: 관리자 글 삭제
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { adminPassword } = await request.json();
    if (adminPassword !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: '관리자 인증 실패' }, { status: 403 });
    }
    const db = getDB();
    if (!db) return NextResponse.json({ error: 'DB not available' }, { status: 500 });

    await db.prepare('DELETE FROM replies WHERE post_id = ?').bind(id).run();
    await db.prepare('DELETE FROM posts WHERE id = ?').bind(id).run();

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST: 비밀번호 확인 → 글 상세 + 답변 조회
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = getDB();
    if (!db) return NextResponse.json({ error: 'DB not available' }, { status: 500 });

    const { password } = await request.json();
    if (!password) return NextResponse.json({ error: '비밀번호를 입력해주세요' }, { status: 400 });

    const post = await db.prepare('SELECT * FROM posts WHERE id = ?').bind(id).first();
    if (!post) return NextResponse.json({ error: '글을 찾을 수 없습니다' }, { status: 404 });

    const valid = await verifyPassword(password, post.password as string);
    if (!valid) return NextResponse.json({ error: '비밀번호가 올바르지 않습니다' }, { status: 403 });

    const { results: replies } = await db.prepare(
      'SELECT id, content, created_at FROM replies WHERE post_id = ? ORDER BY id ASC'
    ).bind(id).all();

    return NextResponse.json({
      post: {
        id: post.id,
        name: post.name,
        phone: post.phone,
        category: post.category,
        content: post.content,
        createdAt: post.created_at,
        isAnswered: post.is_answered === 1,
      },
      replies: (replies || []).map((r: any) => ({
        id: r.id,
        content: r.content,
        createdAt: r.created_at,
      })),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
