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
        .h2-partners-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .h2-location-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        .h2-hero-layout { display: flex; align-items: center; min-height: 100vh; }
        .h2-hero-left { flex: 1; padding: 120px 60px 80px 60px; }
        .h2-hero-right { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 0; min-height: 100vh; position: relative; }

        @media (max-width: 1024px) {
          .h2-services-grid { grid-template-columns: repeat(2, 1fr); }
          .h2-concerns-grid { grid-template-columns: repeat(2, 1fr); }
          .h2-partners-grid { grid-template-columns: repeat(3, 1fr); }
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

      {/* ═══ 슬라이드2: 회사소개 + 4대 서비스 ═══ */}
      <section
        id="business-services"
        ref={servicesReveal.ref}
        style={{
          position: 'relative',
          padding: 'clamp(80px, 10vw, 140px) 20px',
          overflow: 'hidden',
          transform: servicesReveal.visible ? 'translateY(0)' : 'translateY(60px)',
          opacity: servicesReveal.visible ? 1 : 0,
          transition: 'transform 0.8s ease-out, opacity 0.8s ease-out'
        }}
      >
        {/* 배경 이미지 (비즈니스 사람들) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url(/metabizlab/images/career.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(255,255,255,0.88)'
          }} />
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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

          <div className="h2-services-grid" style={{ display: 'grid' }}>
            <ServiceCard icon={<FinanceIcon />} title="기업 재무 컨설팅" />
            <ServiceCard icon={<RiskIcon />} title="경영 리스크 관리" />
            <ServiceCard icon={<TaxIcon />} title="절세 및 비용 절감" />
            <ServiceCard icon={<ConsultingIcon />} title="소상공인 경영 컨설팅" />
          </div>
        </div>
      </section>

      {/* ═══ 슬라이드3: 이런 고민 ═══ */}
      <section
        id="services"
        ref={concernsReveal.ref}
        style={{
          padding: 'clamp(100px, 10vw, 160px) 20px',
          backgroundColor: '#f8f9fc',
          transform: concernsReveal.visible ? 'translateY(0)' : 'translateY(60px)',
          opacity: concernsReveal.visible ? 1 : 0,
          transition: 'transform 0.8s ease-out, opacity 0.8s ease-out'
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: '700',
              color: '#1a1a2e',
              lineHeight: '1.5'
            }}>
              이런 <span style={{ color: '#0f3278' }}>고민</span>, 한 번쯤 해보신 적 있으신가요?
            </h2>
          </div>
          <div className="h2-concerns-grid" style={{ display: 'grid' }}>
            <ConcernCard
              icon={<ConcernIcon1 />}
              title="매출은 꾸준한데 왜 남는 돈이 적은지"
              text="고민해보신 적 있으신가요?"
              color="#4a7aff"
            />
            <ConcernCard
              icon={<ConcernIcon2 />}
              title="세금이나 고정비를 줄일 수 있는"
              text="방법이 궁금하신가요?"
              color="#4a7aff"
            />
            <ConcernCard
              icon={<ConcernIcon3 />}
              title="사업 운영 중 발생할 수 있는 위험에"
              text="대비가 되어 있으신가요?"
              color="#4a7aff"
            />
            <ConcernCard
              icon={<ConcernIcon4 />}
              title="창업, 마케팅, 플랫폼을 어떻게"
              text="시작해야 할지 궁금하신가요?"
              color="#4a7aff"
            />
          </div>
        </div>
      </section>

      {/* ═══ 슬라이드4: 협력사 ═══ */}
      <section
        id="partners"
        ref={partnersReveal.ref}
        style={{
          padding: 'clamp(100px, 10vw, 160px) 20px',
          backgroundColor: '#ffffff',
          transform: partnersReveal.visible ? 'translateY(0)' : 'translateY(60px)',
          opacity: partnersReveal.visible ? 1 : 0,
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
              <span style={{ color: '#0f3278', fontWeight: '800' }}>메타비즈랩</span>은 다양한 분야의 <span style={{ color: '#0f3278', fontWeight: '800' }}>파트너</span>와 함께합니다.
            </h2>
          </div>
          <div className="h2-partners-grid" style={{ display: 'grid' }}>
            <PartnerCard name="경영지도 컨설팅" role="드림플러스" person="김내영 대표" />
            <PartnerCard name="영상촬영" role="캠핑삼촌" person="" />
            <PartnerCard name="법무법인 우리" role="법률 자문" person="정상수 변호사" />
            <PartnerCard name="세무법인 가감" role="세무 자문" person="유원상 세무사" />
            <PartnerCard name="세법인 기업" role="유밀안 세무사" person="" />
            <PartnerCard name="영필름미디어" role="이영재 감독" person="" />
            <PartnerCard name="지산튜브(부동산유튜브)" role="" person="" />
            <PartnerCard name="인 다이렉트 카보험" role="보험" person="신인철 대표" />
            <PartnerCard name="하람 손해사정" role="손해사정" person="정원호 대표" />
            <PartnerCard name="(주)국민M&A" role="M&A" person="곽대영 대표" />
            <PartnerCard name="건강한 다이어" role="건강" person="박미선 대표" />
            <PartnerCard name="에이치앤이드" role="광고기획사" person="" />
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
            <LocationCard
              title="메타비즈랩 (본사)"
              subtitle="Main Office"
              address="서울특별시 마포구 마포대로 144 마포디오"
              phone="1600-3797"
              hours="*사업 가능 시간: 월-금 9:00~18:00(우림, 공휴일 휴무)"
              mapHtml={`<div id="daumRoughmapContainer1775275004997" class="root_daum_roughmap root_daum_roughmap_landing"></div><script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script><script charset="UTF-8">new daum.roughmap.Lander({"timestamp":"1775275004997","key":"29oemj76o9xw","mapWidth":"640","mapHeight":"360"}).render();</script>`}
            />
            <LocationCard
              title="메타비즈랩 (지사)"
              subtitle="Branch Office"
              address="경기도 고양시 덕양구 황동로 218, 1층 A0145호(Gate 5)"
              email="meta@meta-bizab.co.kr"
              hours="*24시간 접수 가능"
              mapHtml={`<div id="daumRoughmapContainer1775275072404" class="root_daum_roughmap root_daum_roughmap_landing"></div><script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script><script charset="UTF-8">new daum.roughmap.Lander({"timestamp":"1775275072404","key":"29oeo5dk324o","mapWidth":"640","mapHeight":"360"}).render();</script>`}
            />
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
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke="#0f3278" strokeWidth="1.5" fill="none" />
      <path d="M16 28l4-6 4 4 6-8" stroke="#0f3278" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="16" cy="28" r="1.5" fill="#0f3278" />
      <circle cx="20" cy="22" r="1.5" fill="#0f3278" />
      <circle cx="24" cy="26" r="1.5" fill="#0f3278" />
      <circle cx="30" cy="18" r="1.5" fill="#0f3278" />
    </svg>
  );
}

function RiskIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="12" y="8" width="24" height="32" rx="3" stroke="#0f3278" strokeWidth="1.5" />
      <circle cx="24" cy="22" r="6" stroke="#0f3278" strokeWidth="1.5" />
      <rect x="22" y="19" width="4" height="8" rx="2" stroke="#0f3278" strokeWidth="1.2" fill="none" />
      <line x1="24" y1="30" x2="24" y2="34" stroke="#0f3278" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="34" x2="28" y2="34" stroke="#0f3278" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TaxIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="14" stroke="#0f3278" strokeWidth="1.5" />
      <text x="24" y="29" textAnchor="middle" fill="#0f3278" fontSize="16" fontWeight="700">&#8361;</text>
    </svg>
  );
}

function ConsultingIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="12" width="32" height="24" rx="2" stroke="#0f3278" strokeWidth="1.5" />
      <line x1="8" y1="18" x2="40" y2="18" stroke="#0f3278" strokeWidth="1" opacity="0.4" />
      <polyline points="16,30 22,22 28,28 34,20" stroke="#0f3278" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="30" r="1.5" fill="#0f3278" />
      <circle cx="34" cy="20" r="1.5" fill="#0f3278" />
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
      backgroundColor: 'rgba(255,255,255,0.95)',
      border: '1px solid #e0e6f0',
      padding: 'clamp(32px, 4vw, 48px) clamp(16px, 2vw, 24px)',
      borderRadius: '16px',
      textAlign: 'center',
      transition: 'all 0.3s',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(15,50,120,0.12)';
      e.currentTarget.style.borderColor = '#0f3278';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
      e.currentTarget.style.borderColor = '#e0e6f0';
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

function LocationCard({ title, subtitle, address, phone, email, hours, mapHtml }: {
  title: string; subtitle?: string; address: string;
  phone?: string; email?: string; hours?: string; mapHtml?: string;
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
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e8edf5',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.3s'
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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          {subtitle && (
            <span style={{ fontSize: '11px', color: '#0f3278', fontWeight: '700', letterSpacing: '1px' }}>
              {subtitle}
            </span>
          )}
          <h3 style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', fontWeight: '700', color: '#0f3278', marginTop: '4px' }}>{title}</h3>
        </div>
      </div>

      {/* 카카오맵 */}
      <iframe
        ref={iframeRef}
        style={{ width: '100%', height: '240px', border: 'none', display: 'block' }}
        title={`${title} 지도`}
      />

      {/* 정보 */}
      <div style={{ padding: 'clamp(18px, 2.5vw, 24px)' }}>
        <p style={{ fontSize: '13px', color: '#777', margin: '0 0 10px', lineHeight: '1.6' }}>{address}</p>
        {phone && <p style={{ fontSize: '18px', color: '#0f3278', fontWeight: '800', marginBottom: '6px' }}>{phone}</p>}
        {email && <p style={{ fontSize: '14px', color: '#0f3278', fontWeight: '600', marginBottom: '6px' }}>{email}</p>}
        {hours && <p style={{ fontSize: '11px', color: '#aaa', marginTop: '10px', fontStyle: 'italic' }}>{hours}</p>}
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
