'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Reply { id: number; content: string; createdAt: string; }
interface Post {
  id: number; name: string; phone: string; category: string;
  content: string; createdAt: string; isAnswered: boolean; replies: Reply[];
}

const primaryColor = '#0f3278';

export default function AdminPage() {
  const [adminPw, setAdminPw] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword: adminPw }),
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
        setIsAuthed(true);
      } else {
        setError('비밀번호가 올바르지 않습니다');
      }
    } catch { setError('오류가 발생했습니다'); }
  };

  const handleReply = async () => {
    if (!selectedPost || !replyContent) return;
    try {
      const res = await fetch(`/api/posts/${selectedPost.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent, adminPassword: adminPw }),
      });
      if (res.ok) {
        alert('답변이 등록되었습니다');
        setReplyContent('');
        // 목록 새로고침
        const res2 = await fetch('/api/admin/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminPassword: adminPw }),
        });
        if (res2.ok) {
          const data = await res2.json();
          setPosts(data.posts || []);
          const updated = (data.posts || []).find((p: Post) => p.id === selectedPost.id);
          if (updated) setSelectedPost(updated);
        }
      }
    } catch {}
  };

  if (!isAuthed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f7fa' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '40px', width: '360px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: primaryColor, marginBottom: '24px' }}>관리자 로그인</h1>
          <input type="password" value={adminPw} onChange={e => setAdminPw(e.target.value)} placeholder="관리자 비밀번호"
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', marginBottom: '12px', boxSizing: 'border-box' }} />
          <button onClick={handleLogin} style={{
            width: '100%', padding: '12px', backgroundColor: primaryColor, color: '#fff',
            border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          }}>로그인</button>
          {error && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
          <Link href="/" style={{ display: 'block', marginTop: '16px', color: '#9ca3af', fontSize: '13px' }}>홈으로</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <div style={{ backgroundColor: primaryColor, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, margin: 0 }}>관리자 - 문의 관리</h1>
        <Link href="/" style={{ color: '#d4af37', fontSize: '13px', textDecoration: 'none' }}>홈으로</Link>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 16px', display: 'grid', gridTemplateColumns: selectedPost ? '1fr 1fr' : '1fr', gap: '20px' }}>
        {/* 목록 */}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e0e7f0', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111', margin: 0 }}>전체 문의 ({posts.length}건)</h2>
          </div>
          {posts.map(post => (
            <div key={post.id} onClick={() => { setSelectedPost(post); setReplyContent(''); }}
              style={{
                padding: '14px 16px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer',
                backgroundColor: selectedPost?.id === post.id ? '#f0f4ff' : 'transparent',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>[{post.category}] {post.name}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: post.isAnswered ? '#10b981' : '#f59e0b' }}>
                  {post.isAnswered ? '답변완료' : '대기중'}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{post.createdAt?.slice(0, 10)} | {post.phone}</p>
            </div>
          ))}
        </div>

        {/* 상세 + 답변 */}
        {selectedPost && (
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e0e7f0', padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>[{selectedPost.category}] {selectedPost.name}</h3>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
              {selectedPost.phone} | {selectedPost.createdAt?.slice(0, 10)}
            </div>
            <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-wrap', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '16px' }}>
              {selectedPost.content}
            </p>

            {/* 기존 답변 */}
            {selectedPost.replies.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: primaryColor, marginBottom: '8px' }}>등록된 답변</h4>
                {selectedPost.replies.map(r => (
                  <div key={r.id} style={{ backgroundColor: '#f0f4ff', borderRadius: '8px', padding: '12px', marginBottom: '8px' }}>
                    <p style={{ fontSize: '14px', color: '#374151', whiteSpace: 'pre-wrap' }}>{r.content}</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '6px' }}>{r.createdAt?.slice(0, 10)}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 답변 작성 */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>답변 작성</h4>
              <textarea value={replyContent} onChange={e => setReplyContent(e.target.value)} rows={4} placeholder="답변 내용을 입력하세요"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box', marginBottom: '8px' }} />
              <button onClick={handleReply} disabled={!replyContent} style={{
                padding: '10px 20px', backgroundColor: replyContent ? primaryColor : '#d1d5db', color: '#fff',
                border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: replyContent ? 'pointer' : 'not-allowed',
              }}>답변 등록</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
