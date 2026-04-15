import { NextRequest, NextResponse } from 'next/server';
import { getDB, hashPassword, maskName } from '@/lib/db';

export const runtime = 'edge';

// GET: 게시글 목록 (공개 정보만)
export async function GET() {
  try {
    const db = getDB();
    if (!db) return NextResponse.json({ posts: [] });

    const { results } = await db.prepare(
      'SELECT id, name, category, created_at, is_answered FROM posts ORDER BY id DESC'
    ).all();

    const posts = (results || []).map((p: any) => ({
      id: p.id,
      name: maskName(p.name),
      category: p.category,
      createdAt: p.created_at,
      isAnswered: p.is_answered === 1,
    }));

    return NextResponse.json({ posts });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST: 게시글 작성
export async function POST(request: NextRequest) {
  try {
    const db = getDB();
    if (!db) return NextResponse.json({ error: 'DB not available' }, { status: 500 });

    const { name, phone, category, content, password } = await request.json();

    if (!name || !content || !password) {
      return NextResponse.json({ error: '필수 항목을 입력해주세요' }, { status: 400 });
    }

    const hashedPw = await hashPassword(password);

    await db.prepare(
      'INSERT INTO posts (name, phone, category, content, password) VALUES (?, ?, ?, ?, ?)'
    ).bind(name, phone || '', category || '', content, hashedPw).run();

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
