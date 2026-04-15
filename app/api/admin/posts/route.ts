import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

export const runtime = 'edge';

const ADMIN_PASSWORD = 'metabiz2026!';

// POST: 관리자용 전체 글 조회 (비밀번호 인증)
export async function POST(request: NextRequest) {
  try {
    const { adminPassword } = await request.json();
    if (adminPassword !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: '관리자 인증 실패' }, { status: 403 });
    }

    const db = getDB();
    if (!db) return NextResponse.json({ posts: [] });

    const { results } = await db.prepare(
      'SELECT * FROM posts ORDER BY id DESC'
    ).all();

    const posts = [];
    for (const p of (results || []) as any[]) {
      const { results: replies } = await db.prepare(
        'SELECT id, content, created_at FROM replies WHERE post_id = ? ORDER BY id ASC'
      ).bind(p.id).all();

      posts.push({
        id: p.id,
        name: p.name,
        phone: p.phone,
        category: p.category,
        content: p.content,
        createdAt: p.created_at,
        isAnswered: p.is_answered === 1,
        replies: (replies || []).map((r: any) => ({
          id: r.id,
          content: r.content,
          createdAt: r.created_at,
        })),
      });
    }

    return NextResponse.json({ posts });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
