'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function Home2() {
  const [showRecruit, setShowRecruit] = useState(false);
  const servicesReveal = useScrollReveal();
  const concernsReveal = useScrollReveal();
  const partnersReveal = useScrollReveal();
  const careersReveal = useScrollReveal();
  const locationReveal = useScrollReveal();

  return (
    <div>
      <style>{`
        .h2-services-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .h2-concerns-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .h2-partners-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .h2-location-grid { grid-template-columns: 1fr 1fr; gap: 20px; }
        .loc-main { order: 1; }
        .loc-branch { order: 2; }
        .loc-phone { order: 3; }
        .loc-email { order: 4; }
        .h2-hero-layout { display: flex; align-items: center; min-height: 100vh; }
        .h2-hero-left { flex: 1; padding: 120px 60px 80px 60px; }
        .h2-hero-right { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 0; min-height: 100vh; position: relative; }

        @media (max-width: 1024px) {
          .h2-services-grid { grid-template-columns: repeat(2, 1fr); }
          .h2-concerns-grid { grid-template-columns: repeat(2, 1fr); }
          .h2-partners-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
          .h2-location-grid { grid-template-columns: 1fr 1fr; }
          .h2-hero-layout { flex-direction: column; }
          .h2-hero-left { padding: 120px 30px 40px; text-align: center; }
          .h2-hero-right { min-height: 50vh; width: 100%; }
        }

        @media (max-width: 640px) {
          .h2-services-grid { grid-template-columns: 1fr; }
          .h2-concerns-grid { grid-template-columns: 1fr; }
          .h2-partners-grid { grid-template-columns: repeat(2, 1fr); }
          .h2-location-grid { grid-template-columns: 1fr; }
          .loc-main { order: 1; }
          .loc-branch { order: 2; }
          .loc-phone { order: 3; }
          .loc-email { order: 4; }
          .h2-hero-right { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(3, 1fr); min-height: 40vh; }
        }
      `}</style>

      <Navbar />

      {/* ═══ 슬라이드1: Hero - 당신의 비즈니스에 전략을 더하다 ═══ */}
      <section id="about" style={{ backgroundColor: '#ffffff', overflow: 'hidden' }}>
        <div className="h2-hero-layout">
          {/* 왼쪽: 텍스트 */}
          <div className="h2-hero-left">
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: '900',
              color: '#0f3278',
              lineHeight: '1.3',
              marginBottom: '28px',
              letterSpacing: '-0.5px'
            }}>
              당신의 비즈니스에
            </h1>
            <p style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: '#333',
              marginBottom: '6px',
              fontWeight: '500'
            }}>
              소상공인의 파트너
            </p>
            <p style={{
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              color: '#888',
              marginBottom: '0'
            }}>
              창업, 플랫폼, 마케팅 등
            </p>
          </div>

          {/* 오른쪽: 빌딩 이미지 그리드 + 오버레이 텍스트 */}
          <div className="h2-hero-right">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} style={{
                backgroundImage: 'url(/metabizlab/images/hero.png)',
                backgroundSize: 'cover',
                backgroundPosition: `${(i % 3) * 33}% ${i <= 3 ? '30%' : '70%'}`,
              }} />
            ))}
            {/* 오버레이 텍스트 */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(10, 30, 80, 0.35)',
              zIndex: 2
            }}>
              <h2 style={{
                fontSize: 'clamp(32px, 5vw, 60px)',
                fontWeight: '900',
                color: '#ffffff',
                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                letterSpacing: '2px',
                lineHeight: '1.3',
                textAlign: 'center'
              }}>
                전략을 더하다
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 슬라이드2: 회사소개 제목 (흰 배경) ═══ */}
      <section
        id="business-services"
        ref={servicesReveal.ref}
        style={{
          padding: 'clamp(60px, 8vw, 100px) 20px clamp(40px, 5vw, 60px)',
          backgroundColor: '#ffffff',
          transform: servicesReveal.visible ? 'translateY(0)' : 'translateY(60px)',
          opacity: servicesReveal.visible ? 1 : 0,
          transition: 'transform 0.8s ease-out, opacity 0.8s ease-out'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(20px, 3vw, 30px)',
              fontWeight: '700',
              color: '#1a1a2e',
              lineHeight: '1.6'
            }}>
              <span style={{ color: '#0f3278', fontWeight: '800' }}>메타비즈랩</span>은 기업의 성장과 안정적인 경영을 돕는
              <br />
              비즈니스 컨설팅 <span style={{ color: '#0f3278', fontWeight: '800' }}>파트너</span>입니다.
            </h2>
          </div>
        </div>
      </section>

      {/* ═══ 슬라이드2: 4대 서비스 카드 (배경 이미지) ═══ */}
      <section style={{
        position: 'relative',
        padding: 'clamp(60px, 8vw, 100px) 20px',
        overflow: 'hidden'
      }}>
        {/* 배경 이미지 (비즈니스 악수) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url(/metabizlab/images/business-handshake.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(80,90,110,0.6)'
          }} />
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="h2-services-grid" style={{ display: 'grid' }}>
            <ServiceCard icon={<FinanceIcon />} title="기업 재무 컨설팅" />
            <ServiceCard icon={<RiskIcon />} title="경영 리스크 관리" />
            <ServiceCard icon={<TaxIcon />} title="절세 및 비용 절감" />
            <ServiceCard icon={<ConsultingIcon />} title="소상공인 경영 컨설팅" />
          </div>
        </div>
      </section>

      {/* ═══ 슬라이드3: 이런 고민 ═══ */}
      {/* 제목: 흰 배경 */}
      <section
        id="services"
        ref={concernsReveal.ref}
        style={{
          padding: 'clamp(60px, 8vw, 100px) 20px clamp(40px, 5vw, 60px)',
          backgroundColor: '#ffffff',
          transform: concernsReveal.visible ? 'translateY(0)' : 'translateY(60px)',
          opacity: concernsReveal.visible ? 1 : 0,
          transition: 'transform 0.8s ease-out, opacity 0.8s ease-out'
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: '700',
            color: '#1a1a2e',
            lineHeight: '1.5'
          }}>
            이런 <span style={{ color: '#0f3278' }}>고민</span>, 한 번쯤 해보신 적 <span style={{ color: '#0f3278' }}>있으신가요</span>?
          </h2>
        </div>
      </section>

      {/* 카드: 파란 배경 */}
      <section style={{
        padding: 'clamp(50px, 6vw, 80px) 20px',
        backgroundColor: '#4a6cf7'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="h2-concerns-grid" style={{ display: 'grid', gap: '20px' }}>
            <ConcernCardBlue text="매출은 꾸준한데 왜 남는 돈이 적은지&#10;고민해보신 적 있으신가요?" />
            <ConcernCardBlue text="세금이나 고정비를 줄일 수 있는&#10;방법이 궁금하신가요?" />
            <ConcernCardBlue text="사업 운영 중 발생할 수 있는 위험에&#10;대비가 되어 있으신가요?" />
            <ConcernCardBlue text="창업, 마케팅, 플랫폼을 어떻게&#10;시작해야 할지 궁금하신가요?" />
          </div>
        </div>
      </section>

      {/* ═══ 슬라이드4: 협력사 제목 (흰 배경) ═══ */}
      <section
        id="partners"
        ref={partnersReveal.ref}
        style={{
          padding: 'clamp(60px, 8vw, 100px) 20px clamp(40px, 5vw, 60px)',
          backgroundColor: '#ffffff',
          transform: partnersReveal.visible ? 'translateY(0)' : 'translateY(60px)',
          opacity: partnersReveal.visible ? 1 : 0,
          transition: 'transform 0.8s ease-out, opacity 0.8s ease-out'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: '700',
            color: '#1a1a2e',
            lineHeight: '1.5'
          }}>
            <span style={{ color: '#0f3278', fontWeight: '800' }}>메타비즈랩</span>은 다양한 분야의 <span style={{ color: '#0f3278', fontWeight: '800' }}>파트너</span>와 함께합니다.
          </h2>
        </div>
      </section>

      {/* ═══ 슬라이드4: 협력사 카드 (파란 배경) ═══ */}
      <section style={{
        padding: 'clamp(50px, 6vw, 80px) 20px',
        backgroundColor: '#4a6cf7'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }}>
            {[
              { line1: '경영지도 컨설팅', line2: '드림플러스 김내영 대표', link: '' },
              { line1: '캠핑삼춘[CampingUncle]', line2: '유튜브', link: 'https://www.youtube.com/@CampingUncle' },
              { line1: '법무법인 우리', line2: '정상수 변호사', link: '' },
              { line1: '세무법인 가감', line2: '유원상 세무사', link: '' },
              { line1: '영필름대표 이영재 감독', line2: '', link: '' },
              { line1: '지산튜브(부동산유튜브)', line2: '', link: 'https://www.youtube.com/@jisantube' },
              { line1: '인 다이렉트 카보험', line2: '신인철 대표', link: '' },
              { line1: '하람 손해사정', line2: '정원호 대표', link: '' },
              { line1: '(주)국민M&A', line2: '곽대영 대표', link: '' },
              { line1: '건강한 다이아', line2: '박미선 대표', link: '' },
              { line1: '제로디자인', line2: '이준상 대표', link: '' },
              { line1: '에이치&에드', line2: '광고기획사', link: '' },
            ].map((p, i) => (
              <div key={i} style={{
                backgroundColor: '#ffffff',
                border: '2px dashed #90b0ff',
                borderRadius: '10px',
                padding: 'clamp(18px, 2.5vw, 28px) clamp(12px, 2vw, 20px)',
                textAlign: 'center',
                transition: 'all 0.3s',
                cursor: 'pointer',
                minHeight: '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => p.link && window.open(p.link, '_blank')}>
                <p style={{
                  fontSize: 'clamp(13px, 1.3vw, 15px)',
                  fontWeight: '600',
                  color: '#333',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {p.line1}
                </p>
                {p.line2 && (
                  <p style={{
                    fontSize: '13px',
                    color: '#666',
                    margin: '2px 0 0',
                    lineHeight: '1.5'
                  }}>
                    {p.line2}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 슬라이드5: 채용문의 ═══ */}
      <section
        id="careers"
        ref={careersReveal.ref}
        style={{
          padding: 'clamp(100px, 10vw, 160px) 20px',
          backgroundColor: '#f8f9fc',
          transform: careersReveal.visible ? 'translateY(0)' : 'translateY(60px)',
          opacity: careersReveal.visible ? 1 : 0,
          transition: 'transform 0.8s ease-out, opacity 0.8s ease-out'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: '700',
              color: '#1a1a2e',
              lineHeight: '1.5'
            }}>
              <span style={{ color: '#0f3278', fontWeight: '800' }}>메타비즈랩</span>과 함께 미래를 만들어갈{' '}
              <span style={{ color: '#4a7aff', fontWeight: '800' }}>인재</span>를 기다립니다.
            </h2>
          </div>

          {/* 파란색 영역 */}
          <div style={{
            backgroundColor: '#4a6cf7',
            borderRadius: '20px',
            minHeight: '360px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 40px',
            textAlign: 'center'
          }}>
            <div>
              <p style={{
                fontSize: 'clamp(16px, 2vw, 22px)',
                color: '#ffffff',
                lineHeight: '1.8',
                marginBottom: '40px',
                fontWeight: '500'
              }}>
                고객서비스를 통한 가치창출로<br />
                금융을 선도하는 메타비즈랩인을 찾습니다.
              </p>
              <button
                onClick={() => setShowRecruit(true)}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#0f3278',
                  padding: '16px 56px',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  letterSpacing: '1px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                채용문의
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 슬라이드6: 오시는길 ═══ */}
      <section
        id="location"
        ref={locationReveal.ref}
        style={{
          padding: 'clamp(100px, 10vw, 160px) 20px',
          backgroundColor: '#ffffff',
          transform: locationReveal.visible ? 'translateY(0)' : 'translateY(60px)',
          opacity: locationReveal.visible ? 1 : 0,
          transition: 'transform 0.8s ease-out, opacity 0.8s ease-out'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="h2-location-grid" style={{ display: 'grid' }}>
            <div className="loc-main" style={{ order: 1 }}>
              <LocationCard
                title="메타비즈랩 (본사)"
                subtitle="Main Office"
                address="서울특별시 마포구 마포대로 144 마포T타운(04212)"
                mapHtml={`<div id="daumRoughmapContainer1775275004997" class="root_daum_roughmap root_daum_roughmap_landing"></div><script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script><script charset="UTF-8">new daum.roughmap.Lander({"timestamp":"1775275004997","key":"29oemj76o9xw","mapWidth":"640","mapHeight":"360"}).render();</script>`}
              />
            </div>
            <div className="loc-branch" style={{ order: 2 }}>
              <LocationCard
                title="메타비즈랩 (지사)"
                subtitle="Branch Office"
                address="경기도 고양시 덕양구 황동로 218, 1층 A0145호(Gate 5)"
                mapHtml={`<div id="daumRoughmapContainer1775275072404" class="root_daum_roughmap root_daum_roughmap_landing"></div><script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script><script charset="UTF-8">new daum.roughmap.Lander({"timestamp":"1775275072404","key":"29oeo5dk324o","mapWidth":"640","mapHeight":"360"}).render();</script>`}
              />
            </div>
            <div className="loc-phone" style={{ order: 3 }}>
              <InfoBox label="대표번호" value="1600-3797" sub="평일 09:00-18:00" />
            </div>
            <div className="loc-email" style={{ order: 4 }}>
              <InfoBox label="이메일 문의" value="meta@meta-bizlab.co.kr" sub="24시간 접수 가능" />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* 채용문의 팝업 */}
      {showRecruit && <RecruitPopup onClose={() => setShowRecruit(false)} />}
    </div>
  );
}

/* ─── SVG Icons ─── */

function FinanceIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="16" r="10" stroke="#555" strokeWidth="1.3" />
      <path d="M20 16h8M24 12v8" stroke="#555" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M19 30c0-2 2-4 5-4s5 2 5 4" stroke="#555" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M18 34h12" stroke="#555" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M20 38h8" stroke="#555" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function RiskIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
      <rect x="12" y="6" width="24" height="36" rx="3" stroke="#555" strokeWidth="1.3" />
      <circle cx="24" cy="24" r="7" stroke="#555" strokeWidth="1.3" />
      <rect x="22" y="20" width="4" height="10" rx="2" stroke="#555" strokeWidth="1.2" fill="none" />
      <line x1="24" y1="33" x2="24" y2="36" stroke="#555" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="20" y1="36" x2="28" y2="36" stroke="#555" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function TaxIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" stroke="#555" strokeWidth="1.3" />
      <text x="24" y="30" textAnchor="middle" fill="#555" fontSize="18" fontWeight="700">&#8361;</text>
    </svg>
  );
}

function ConsultingIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="10" width="36" height="26" rx="2" stroke="#555" strokeWidth="1.3" />
      <line x1="6" y1="16" x2="42" y2="16" stroke="#555" strokeWidth="1" opacity="0.4" />
      <polyline points="14,30 20,22 26,28 34,18" stroke="#555" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="30" r="1.5" fill="#555" />
      <circle cx="20" cy="22" r="1.5" fill="#555" />
      <circle cx="26" cy="28" r="1.5" fill="#555" />
      <circle cx="34" cy="18" r="1.5" fill="#555" />
    </svg>
  );
}

/* ─── Concern Icons ─── */

function ConcernIcon1() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="16" r="10" stroke="#4a7aff" strokeWidth="1.5" />
      <path d="M16 16h8M20 12v8" stroke="#4a7aff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 30h12" stroke="#4a7aff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 26c0-2 2-4 5-4s5 2 5 4" stroke="#4a7aff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ConcernIcon2() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect x="6" y="8" width="28" height="22" rx="2" stroke="#4a7aff" strokeWidth="1.5" />
      <path d="M6 14h28" stroke="#4a7aff" strokeWidth="1.5" />
      <path d="M13 21l4 4 8-8" stroke="#4a7aff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ConcernIcon3() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <path d="M20 4L4 16v18h12V26h8v8h12V16L20 4Z" stroke="#4a7aff" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 18h8M20 14v8" stroke="#4a7aff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ConcernIcon4() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="14" stroke="#4a7aff" strokeWidth="1.5" />
      <path d="M20 6v4M20 30v4M6 20h4M30 20h4" stroke="#4a7aff" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="20" r="4" stroke="#4a7aff" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="1.5" fill="#4a7aff" />
    </svg>
  );
}

/* ─── Components ─── */

function ServiceCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.6)',
      padding: 'clamp(36px, 5vw, 56px) clamp(16px, 2vw, 24px)',
      borderRadius: '12px',
      textAlign: 'center',
      transition: 'all 0.3s',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(15,50,120,0.15)';
      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.95)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)';
    }}>
      <div style={{ marginBottom: '18px' }}>{icon}</div>
      <h3 style={{
        fontSize: 'clamp(13px, 1.3vw, 16px)',
        fontWeight: '700',
        color: '#0f3278',
        margin: 0,
        lineHeight: '1.4'
      }}>{title}</h3>
    </div>
  );
}

function ConcernCardBlue({ text }: { text: string }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid rgba(255,255,255,0.3)',
      padding: 'clamp(28px, 4vw, 40px) clamp(20px, 3vw, 32px)',
      borderRadius: '12px',
      textAlign: 'center',
      transition: 'all 0.3s',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '120px'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <p style={{
        fontSize: 'clamp(14px, 1.4vw, 16px)',
        fontWeight: '500',
        color: '#333',
        lineHeight: '1.8',
        margin: 0,
        whiteSpace: 'pre-line'
      }}>
        {text}
      </p>
    </div>
  );
}

function ConcernCard({ icon, title, text, color }: { icon: React.ReactNode; title: string; text: string; color: string }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderLeft: `4px solid ${color}`,
      padding: 'clamp(24px, 3vw, 32px) clamp(20px, 2.5vw, 28px)',
      borderRadius: '12px',
      transition: 'all 0.3s',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(74,122,255,0.12)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
    }}>
      <div style={{ flexShrink: 0, marginTop: '2px' }}>{icon}</div>
      <div>
        <p style={{
          fontSize: 'clamp(14px, 1.3vw, 16px)',
          fontWeight: '600',
          color: '#1a1a2e',
          marginBottom: '4px',
          lineHeight: '1.6'
        }}>
          {title}
        </p>
        <p style={{
          fontSize: 'clamp(13px, 1.2vw, 15px)',
          color: '#666',
          lineHeight: '1.6',
          margin: 0
        }}>
          {text}
        </p>
      </div>
    </div>
  );
}

function PartnerCard({ name, role, person }: { name: string; role: string; person: string }) {
  return (
    <div
      style={{
        backgroundColor: '#f4f7fc',
        border: '1px solid #e0e6f0',
        borderRadius: '12px',
        padding: 'clamp(16px, 2vw, 24px)',
        textAlign: 'center',
        transition: 'all 0.3s',
        cursor: 'pointer',
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#0f3278';
        e.currentTarget.style.borderColor = '#0f3278';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,50,120,0.2)';
        const texts = e.currentTarget.querySelectorAll('h4, p');
        texts.forEach((el) => (el as HTMLElement).style.color = '#ffffff');
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#f4f7fc';
        e.currentTarget.style.borderColor = '#e0e6f0';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        const h4s = e.currentTarget.querySelectorAll('h4');
        h4s.forEach((el) => (el as HTMLElement).style.color = '#0f3278');
        const ps = e.currentTarget.querySelectorAll('p');
        ps.forEach((el) => (el as HTMLElement).style.color = '#666');
      }}
    >
      <h4 style={{
        fontSize: 'clamp(13px, 1.3vw, 15px)',
        fontWeight: '700',
        color: '#0f3278',
        marginBottom: '4px',
        lineHeight: '1.3'
      }}>
        {name}
      </h4>
      {role && (
        <p style={{ fontSize: '12px', color: '#666', margin: '0 0 2px' }}>{role}</p>
      )}
      {person && (
        <p style={{ fontSize: '12px', color: '#666', margin: 0, fontWeight: '500' }}>{person}</p>
      )}
    </div>
  );
}

function InfoBox({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{
      backgroundColor: '#f4f7fc',
      border: '1px solid #e8edf5',
      borderRadius: '12px',
      padding: '24px 20px',
      textAlign: 'center',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <p style={{ fontSize: '11px', color: '#999', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '8px', textTransform: 'uppercase' }}>
        {label}
      </p>
      <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: '#0f3278', fontWeight: '800', marginBottom: '6px' }}>
        {value}
      </p>
      {sub && <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>{sub}</p>}
    </div>
  );
}

function LocationCard({ title, subtitle, address, mapHtml }: {
  title: string; subtitle?: string; address: string; mapHtml?: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current || !mapHtml) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) return;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html><head><meta charset="UTF-8">
      <style>
        * { margin: 0; padding: 0; }
        body { width: 100%; height: 100vh; overflow: hidden; }
        .root_daum_roughmap { width: 100% !important; height: 100% !important; }
        .root_daum_roughmap .wrap_map { width: 100% !important; height: 100% !important; }
      </style>
      </head><body>${mapHtml}</body></html>
    `);
    doc.close();
  }, [mapHtml]);

  return (
    <div>
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e8edf5',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s',
        marginBottom: '16px'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(15,50,120,0.1)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}>
        {/* 헤더 */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e8edf5',
        }}>
          {subtitle && (
            <span style={{ fontSize: '11px', color: '#0f3278', fontWeight: '700', letterSpacing: '1px' }}>
              {subtitle}
            </span>
          )}
          <h3 style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', fontWeight: '700', color: '#0f3278', marginTop: '4px' }}>{title}</h3>
        </div>

        {/* 카카오맵 */}
        <iframe
          ref={iframeRef}
          style={{ width: '100%', height: '240px', border: 'none', display: 'block' }}
          title={`${title} 지도`}
        />

        {/* 주소 */}
        <div style={{ padding: 'clamp(18px, 2.5vw, 24px)' }}>
          <p style={{ fontSize: '13px', color: '#777', margin: 0, lineHeight: '1.6' }}>{address}</p>
        </div>
      </div>

    </div>
  );
}

/* ─── Recruit Popup ─── */

function RecruitPopup({ onClose }: { onClose: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', border: '1px solid #ddd',
    borderRadius: '4px', fontSize: '14px', outline: 'none',
    transition: 'border-color 0.3s', boxSizing: 'border-box' as const, fontFamily: 'inherit'
  };
  const labelStyle: React.CSSProperties = {
    fontSize: '14px', fontWeight: '700', color: '#333', minWidth: '80px', flexShrink: 0
  };
  const rowStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '16px',
    padding: '16px 0', borderBottom: '1px solid #eee'
  };

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff', borderRadius: '12px', maxWidth: '640px',
          width: '100%', maxHeight: '90vh', overflow: 'hidden',
          display: 'flex', flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          padding: '20px 28px', borderBottom: '1px solid #eee',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f3278', margin: 0 }}>채용문의</h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: '28px',
            cursor: 'pointer', color: '#ccc', lineHeight: 1, padding: '4px'
          }}>&times;</button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          <form
            style={{ padding: '0 28px 28px' }}
            onSubmit={(e) => {
              e.preventDefault();
              if (!agreed) { alert('개인정보 수집 및 이용에 동의해 주세요.'); return; }
              alert('채용문의가 접수되었습니다. 감사합니다.');
              onClose();
            }}
          >
            <div style={rowStyle}>
              <label style={labelStyle}>지원자명</label>
              <input type="text" required placeholder="지원자명을 입력해주세요" style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'} />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>생년월일</label>
              <input type="text" required placeholder="생년월일을 입력해주세요" style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'} />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>전화번호</label>
              <div style={{ display: 'flex', gap: '8px', flex: 1, alignItems: 'center' }}>
                <input type="text" required placeholder="010" maxLength={3}
                  style={{ ...inputStyle, textAlign: 'center' as const }}
                  onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'} />
                <span style={{ color: '#ccc' }}>-</span>
                <input type="text" required placeholder="0000" maxLength={4}
                  style={{ ...inputStyle, textAlign: 'center' as const }}
                  onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'} />
                <span style={{ color: '#ccc' }}>-</span>
                <input type="text" required placeholder="0000" maxLength={4}
                  style={{ ...inputStyle, textAlign: 'center' as const }}
                  onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'} />
              </div>
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>지역</label>
              <input type="text" placeholder="희망근무지를 입력해주세요" style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'} />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>경력여부</label>
              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#333', cursor: 'pointer' }}>
                  <input type="radio" name="career" value="신입" defaultChecked style={{ accentColor: '#0f3278' }} /> 신입
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#333', cursor: 'pointer' }}>
                  <input type="radio" name="career" value="경력" style={{ accentColor: '#0f3278' }} /> 경력
                </label>
              </div>
            </div>
            <div style={{ ...rowStyle, alignItems: 'flex-start' }}>
              <label style={{ ...labelStyle, paddingTop: '4px' }}>문의내용</label>
              <textarea placeholder="문의 내용을 입력해 주세요" rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'} />
            </div>

            <div style={{ height: '12px', backgroundColor: '#f0f0f0', margin: '24px -28px 24px' }} />

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '16px' }}>
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#0f3278' }} />
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#2ecc71' }}>
                  개인정보 수집 및 이용에 관한 동의 (필수)
                </span>
              </label>
              <div style={{
                border: '1px solid #ddd', borderRadius: '6px', padding: '16px',
                maxHeight: '160px', overflowY: 'auto', fontSize: '13px',
                color: '#555', lineHeight: '1.8', backgroundColor: '#fafafa'
              }}>
                <p style={{ marginBottom: '12px' }}>채용문의를 위해 아래와 같이 개인정보를 수집 · 이용합니다.</p>
                <p style={{ marginBottom: '8px' }}><strong>1. 개인정보의 수집 및 이용 목적</strong><br />- 채용문의에 원활한 답변을 위한 정보 획득</p>
                <p style={{ marginBottom: '8px' }}><strong>2. 수집하는 개인정보의 항목</strong><br />- 필수정보 : 성명, 생년월일, 휴대전화번호</p>
                <p style={{ marginBottom: '8px' }}><strong>3. 개인정보의 보유 및 이용기간</strong><br />- 문의자의 개인정보는 문의일로부터 1년간 보유합니다.</p>
                <p><strong>4. 동의를 거부할 권리 및 동의 거부에 따른 불이익</strong><br />- 본인은 개인정보의 수집, 이용 등과 관련한 위 사항에 대하여 원하지 않는 경우 동의를 거부할 수 있습니다.<br />- 다만, 필수정보에 대한 수집 및 이용에 동의하지 않는 경우는 답변에 제한이 있을 수 있습니다.</p>
              </div>
            </div>

            <button type="submit" style={{
              width: '100%', backgroundColor: '#0f3278', color: '#ffffff',
              padding: '14px', borderRadius: '8px', fontSize: '15px', fontWeight: '700',
              border: 'none', cursor: 'pointer', transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0a2560'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0f3278'}>
              보내기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
