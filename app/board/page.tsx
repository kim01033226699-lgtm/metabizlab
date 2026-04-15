'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Post {
  id: number;
  name: string;
  category: string;
  createdAt: string;
  isAnswered: boolean;
}

interface PostDetail {
  id: number;
  name: string;
  phone: string;
  category: string;
  content: string;
  createdAt: string;
  isAnswered: boolean;
}

interface Reply {
  id: number;
  content: string;
  createdAt: string;
}

export default function BoardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [password, setPassword] = useState('');
  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [error, setError] = useState('');
  const [showWriteForm, setShowWriteForm] = useState(false);

  // 폼 상태
  const [formName, setFormName] = useState('');
  const [formPhone1] = useState('010');
  const [formPhone2, setFormPhone2] = useState('');
  const [formPhone3, setFormPhone3] = useState('');
  const [formCategory, setFormCategory] = useState('창업');
  const [formContent, setFormContent] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formAgreed, setFormAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch {}
  };

  const handleViewPost = async () => {
    if (!selectedPostId || !password) return;
    setError('');
    try {
      const res = await fetch(`/api/posts/${selectedPostId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json();
        setPostDetail(data.post);
        setReplies(data.replies || []);
        setPassword('');
      } else {
        const data = await res.json();
        setError(data.error || '비밀번호가 올바르지 않습니다');
      }
    } catch {
      setError('오류가 발생했습니다');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formContent || !formPassword) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          phone: `${formPhone1}-${formPhone2}-${formPhone3}`,
          category: formCategory,
          content: formContent,
          password: formPassword,
        }),
      });
      if (res.ok) {
        alert('문의가 접수되었습니다.');
        setShowWriteForm(false);
        setFormName(''); setFormPhone2(''); setFormPhone3('');
        setFormContent(''); setFormPassword(''); setFormAgreed(false);
        loadPosts();
      }
    } catch {} finally { setSubmitting(false); }
  };

  const categoryMap: Record<string, string> = {
    '창업': '#3b82f6', '절세': '#10b981', '법인컨설팅': '#8b5cf6', '기타': '#6b7280',
  };

  const primaryColor = '#0f3278';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      {/* 헤더 */}
      <div style={{ backgroundColor: primaryColor, padding: '40px 24px', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#d4af37', textDecoration: 'none', fontSize: '14px' }}>META BIZLAB</Link>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 800, margin: '8px 0 0' }}>문의 게시판</h1>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 16px' }}>

        {/* 상세 보기 */}
        {postDetail && (
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #e0e7f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111' }}>{postDetail.category} 문의</h2>
              <button onClick={() => { setPostDetail(null); setReplies([]); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#9ca3af' }}>X</button>
            </div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
              {postDetail.name} | {postDetail.createdAt?.slice(0, 10)}
            </div>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: '20px' }}>{postDetail.content}</p>

            {replies.length > 0 && (
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: primaryColor, marginBottom: '12px' }}>답변</h3>
                {replies.map(r => (
                  <div key={r.id} style={{ backgroundColor: '#f0f4ff', borderRadius: '8px', padding: '12px 16px', marginBottom: '8px' }}>
                    <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{r.content}</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>{r.createdAt?.slice(0, 10)}</p>
                  </div>
                ))}
              </div>
            )}
            {!postDetail.isAnswered && (
              <p style={{ fontSize: '14px', color: '#9ca3af', textAlign: 'center', padding: '16px 0' }}>아직 답변이 등록되지 않았습니다</p>
            )}
          </div>
        )}

        {/* 글쓰기 버튼 */}
        {!showWriteForm && !postDetail && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <button onClick={() => setShowWriteForm(true)} style={{
              padding: '10px 20px', backgroundColor: primaryColor, color: '#fff',
              border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            }}>
              문의하기
            </button>
          </div>
        )}

        {/* 글쓰기 폼 */}
        {showWriteForm && (
          <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #e0e7f0' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#111' }}>문의하기</h2>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>이름 *</label>
              <input value={formName} onChange={e => setFormName(e.target.value)} required placeholder="이름을 입력해주세요"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>연락처</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input value={formPhone1} disabled style={{ width: '60px', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', textAlign: 'center', backgroundColor: '#f3f4f6' }} />
                <span>-</span>
                <input value={formPhone2} onChange={e => setFormPhone2(e.target.value)} maxLength={4} placeholder="0000"
                  style={{ width: '80px', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }} />
                <span>-</span>
                <input value={formPhone3} onChange={e => setFormPhone3(e.target.value)} maxLength={4} placeholder="0000"
                  style={{ width: '80px', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }} />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>문의유형</label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['창업', '절세', '법인컨설팅', '기타'].map(cat => (
                  <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', cursor: 'pointer' }}>
                    <input type="radio" name="category" value={cat} checked={formCategory === cat} onChange={() => setFormCategory(cat)} />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>문의내용 *</label>
              <textarea value={formContent} onChange={e => setFormContent(e.target.value)} required rows={4} placeholder="문의 내용을 입력해 주세요"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>글 비밀번호 * (답변 확인 시 필요)</label>
              <input type="password" value={formPassword} onChange={e => setFormPassword(e.target.value)} required placeholder="비밀번호 설정"
                style={{ width: '200px', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                <input type="checkbox" checked={formAgreed} onChange={e => setFormAgreed(e.target.checked)} />
                개인정보 수집 및 이용에 동의합니다
              </label>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" disabled={!formAgreed || submitting} style={{
                padding: '12px 24px', backgroundColor: formAgreed ? primaryColor : '#d1d5db', color: '#fff',
                border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: formAgreed ? 'pointer' : 'not-allowed',
              }}>
                {submitting ? '접수중...' : '문의 접수'}
              </button>
              <button type="button" onClick={() => setShowWriteForm(false)} style={{
                padding: '12px 24px', backgroundColor: '#f3f4f6', color: '#374151',
                border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', cursor: 'pointer',
              }}>
                취소
              </button>
            </div>
          </form>
        )}

        {/* 게시글 목록 */}
        {!postDetail && (
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e0e7f0', overflow: 'hidden' }}>
            {/* 테이블 헤더 */}
            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 80px 100px 80px', padding: '12px 16px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb', fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>
              <span>번호</span><span>문의유형</span><span>작성자</span><span>날짜</span><span>상태</span>
            </div>

            {posts.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>등록된 문의가 없습니다</div>
            ) : (
              posts.map(post => (
                <div key={post.id}
                  onClick={() => { setSelectedPostId(post.id); setError(''); }}
                  style={{
                    display: 'grid', gridTemplateColumns: '60px 1fr 80px 100px 80px', padding: '14px 16px',
                    borderBottom: '1px solid #f0f0f0', cursor: 'pointer', transition: 'background 0.1s',
                    backgroundColor: selectedPostId === post.id ? '#f0f4ff' : 'transparent',
                  }}
                >
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>{post.id}</span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#111' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, color: '#fff', backgroundColor: categoryMap[post.category] || '#6b7280', marginRight: '8px' }}>{post.category}</span>
                    문의
                  </span>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>{post.name}</span>
                  <span style={{ fontSize: '13px', color: '#9ca3af' }}>{post.createdAt?.slice(0, 10)}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: post.isAnswered ? '#10b981' : '#f59e0b' }}>
                    {post.isAnswered ? '답변완료' : '대기중'}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* 비밀번호 입력 모달 */}
        {selectedPostId && !postDetail && (
          <div style={{ marginTop: '16px', backgroundColor: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e0e7f0' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>글 확인을 위해 비밀번호를 입력해주세요</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호"
                onKeyDown={e => e.key === 'Enter' && handleViewPost()}
                style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', width: '200px' }} />
              <button onClick={handleViewPost} style={{
                padding: '10px 20px', backgroundColor: primaryColor, color: '#fff',
                border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              }}>확인</button>
              <button onClick={() => { setSelectedPostId(null); setPassword(''); setError(''); }} style={{
                padding: '10px 16px', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db',
                borderRadius: '8px', fontSize: '14px', cursor: 'pointer',
              }}>취소</button>
            </div>
            {error && <p style={{ fontSize: '13px', color: '#ef4444', marginTop: '8px' }}>{error}</p>}
          </div>
        )}

        {/* 홈으로 */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link href="/" style={{ color: primaryColor, fontSize: '14px', textDecoration: 'none' }}>홈으로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
}
