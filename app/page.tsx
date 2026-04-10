'use client';

import React, { useEffect, useRef, useState } from 'react';
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

export default function Home() {
  const [showRecruit, setShowRecruit] = useState(false);
  const [showConsult, setShowConsult] = useState(false);
  const [showConcernDetail, setShowConcernDetail] = useState<number | null>(null);
  const servicesReveal = useScrollReveal();

  return (
    <div>
      <style>{`
        .hero-cards-grid { grid-template-columns: repeat(4, 1fr); gap: 0; }
        .services-grid { grid-template-columns: repeat(4, 1fr); }
        .concerns-grid { grid-template-columns: repeat(4, 1fr); }
        .partners-grid { grid-template-columns: repeat(4, 1fr); }
        .careers-grid { grid-template-columns: 1fr 1fr; gap: 60px; }
        .location-grid { grid-template-columns: 1fr 1fr; }
        .loc-main { order: 1; }
        .loc-branch { order: 2; }
        .loc-phone { order: 3; }
        .loc-email { order: 4; }

        @media (max-width: 1024px) {
          .hero-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 0; }
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .concerns-grid { grid-template-columns: repeat(2, 1fr); }
          .partners-grid { grid-template-columns: repeat(3, 1fr); }
          .careers-grid { grid-template-columns: 1fr; gap: 40px; }
          .location-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 768px) {
          .hero-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 0; }
        }

        @media (max-width: 640px) {
          .hero-cards-grid { grid-template-columns: 1fr; gap: 0; }
          .services-grid { grid-template-columns: 1fr; }
          .concerns-grid { grid-template-columns: 1fr; }
          .partners-grid { grid-template-columns: repeat(2, 1fr); }
          .careers-grid { grid-template-columns: 1fr; gap: 32px; }
          .location-grid { grid-template-columns: 1fr; }
          .loc-main { order: 1; }
          .loc-branch { order: 2; }
          .loc-phone { order: 3; }
          .loc-email { order: 4; }
          .partner-slide { width: 144px !important; }
          .partner-card-inner { min-height: 90px !important; }
        }
      `}</style>

      <Navbar />

      {/* ═══ Hero / 회사이념 ═══ */}
      <section id="about" style={{
        position: 'relative',
        color: '#ffffff',
        overflow: 'hidden'
      }}>
        {/* Full hero background image (covers hero text + services) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0,
          backgroundImage: 'url(/images/hero.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to bottom, rgba(10,18,30,0.4) 0%, rgba(10,18,30,0.3) 40%, rgba(10,18,30,0.6) 70%, rgba(10,18,30,0.85) 100%)'
          }} />
        </div>

        {/* Hero Text Area */}
        <div style={{
          position: 'relative',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 20px 60px',
          zIndex: 2
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              fontWeight: '800',
              marginBottom: '24px',
              lineHeight: '1.25',
              letterSpacing: '-0.5px',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)'
            }}>
              당신의 비즈니스에<br />전략을 더하다
            </h1>
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 17px)',
              opacity: 0.8,
              lineHeight: '1.6',
              textShadow: '0 1px 8px rgba(0,0,0,0.4)'
            }}>
              창업, 플랫폼, 마케팅 토탈 서비스
            </p>
          </div>
        </div>

      </section>

      {/* ═══ Services Banner Boxes (히어로 하단 걸침) ═══ */}
      <div
        id="business-services"
        ref={servicesReveal.ref}
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: '-30px',
          transform: servicesReveal.visible ? 'translateY(0)' : 'translateY(40px)',
          opacity: servicesReveal.visible ? 1 : 0,
          transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
          scrollMarginTop: '200px',
        }}
      >
        <div className="hero-cards-grid" style={{ display: 'grid' }}>
          <HeroServiceCard icon={<FinanceIcon />} title="기업 재무 컨설팅" desc="재무 분석, 자금 조달, 투자 전략 수립을 통한 기업 성장 지원" bgColor="#d4af37" />
          <HeroServiceCard icon={<RiskIcon />} title="경영 리스크 관리" desc="경영 환경 분석과 리스크 대응 체계 구축으로 안정적 운영 지원" bgColor="#1a2a4a" />
          <HeroServiceCard icon={<TaxIcon />} title="절세 및 비용 절감" desc="세무 전략 수립과 비용 구조 개선을 통한 수익성 극대화" bgColor="#2a3a5a" />
          <HeroServiceCard icon={<ConsultingIcon />} title="소상공인 경영 컨설팅" desc="창업, 마케팅, 플랫폼 구축 등 소상공인 맞춤 토탈 솔루션" bgColor="#0f3278" />
        </div>
      </div>

      {/* ═══ 핵심서비스 (이런 고민) ═══ */}
      <section id="services" style={{
        padding: 'clamp(160px, 12vw, 200px) 20px',
        backgroundColor: '#f8f9fc'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: '700',
            color: '#1a1a2e',
            marginBottom: '16px',
            lineHeight: '1.4'
          }}>
            이런 고민,<br />한 번쯤 해보신 적 있으신가요?
          </h2>
          <div className="concerns-grid" style={{
            display: 'grid',
            gap: '16px',
            marginTop: '40px'
          }}>
            <ConcernCard icon={<ConcernIcon1 />} text="매출은 꾸준한데 왜 남는 돈이 적은지 고민해보신 적 있으신가요?" onClick={() => setShowConcernDetail(1)} />
            <ConcernCard icon={<ConcernIcon2 />} text="세금이나 고정비를 줄일 수 있는 방법이 궁금하신가요?" onClick={() => setShowConcernDetail(2)} />
            <ConcernCard icon={<ConcernIcon3 />} text="사업 운영 중 발생할 수 있는 위험에 대비가 되어 있으신가요?" onClick={() => setShowConcernDetail(3)} />
            <ConcernCard icon={<ConcernIcon4 />} text="창업, 마케팅, 플랫폼을 어떻게 시작해야 할지 궁금하신가요?" onClick={() => setShowConcernDetail(4)} />
          </div>
        </div>
      </section>

      {/* ═══ 협력사 ═══ */}
      <section id="partners" style={{
        padding: 'clamp(160px, 12vw, 200px) 20px',
        backgroundColor: '#ffffff'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{
              fontSize: 'clamp(24px, 4vw, 38px)',
              fontWeight: '700',
              color: '#0f3278',
              marginBottom: '16px'
            }}>
              협력사
            </h2>
            <div style={{ width: '60px', height: '3px', backgroundColor: '#d4af37', margin: '0 auto 20px' }} />
          </div>
          <p style={{
            textAlign: 'center',
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: '#666',
            lineHeight: '1.8',
            marginBottom: '50px'
          }}>
            메타비즈랩은 다양한 분야의 파트너와 함께합니다.
          </p>
          <PartnersSlider />
        </div>
      </section>

      {/* ═══ 채용문의 ═══ */}
      <section id="careers" style={{
        padding: 'clamp(130px, 8vw, 150px) 20px clamp(160px, 12vw, 200px)',
        backgroundColor: '#f8f9fc'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Title */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{
              fontSize: 'clamp(24px, 4vw, 38px)',
              fontWeight: '700',
              color: '#0f3278',
              marginBottom: '16px'
            }}>
              채용문의
            </h2>
            <div style={{ width: '60px', height: '3px', backgroundColor: '#d4af37', margin: '0 auto 20px' }} />
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              color: '#666',
              lineHeight: '1.8'
            }}>
              메타비즈랩과 함께 미래를 만들어 갈 인재를 기다립니다.
            </p>
          </div>

          {/* 2-column: Image + Text/Button */}
          <div className="careers-grid" style={{
            display: 'grid',
            alignItems: 'center'
          }}>
            {/* 1열: Career Image */}
            <div style={{
              borderRadius: '16px',
              minHeight: '380px',
              position: 'relative',
              overflow: 'hidden',
              backgroundImage: 'url(/images/career.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />

            {/* 2열: Text + Button */}
            <div style={{ padding: 'clamp(20px, 3vw, 40px)' }}>
              <h3 style={{
                fontSize: 'clamp(24px, 3.5vw, 40px)',
                fontWeight: '700',
                color: '#0f3278',
                marginBottom: '8px',
                lineHeight: '1.3'
              }}>
                Your Next Big Move<br />Starts Here
              </h3>
              <p style={{ fontSize: '15px', color: '#666', marginBottom: '40px', lineHeight: '1.9' }}>
                고객서비스를 통한 가치창출로<br />
                금융을 선도하는 메타비즈랩인을 찾습니다.
              </p>
              <button
                onClick={() => setShowRecruit(true)}
                style={{
                  backgroundColor: '#d4af37',
                  color: '#0f3278',
                  padding: '16px 48px',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  letterSpacing: '1px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#c9a631';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(212,175,55,0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#d4af37';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                Join Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 오시는길 ═══ */}
      <section id="location" style={{
        padding: 'clamp(160px, 12vw, 200px) 20px',
        backgroundColor: '#ffffff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: 'clamp(24px, 4vw, 38px)',
              fontWeight: '700',
              color: '#0f3278',
              marginBottom: '16px'
            }}>
              오시는 길
            </h2>
            <div style={{ width: '60px', height: '3px', backgroundColor: '#d4af37', margin: '0 auto' }} />
          </div>
          <div className="location-grid" style={{ display: 'grid', gap: '40px' }}>
            {/* 본사 지도 */}
            <div className="loc-main" style={{ order: 1 }}>
              <LocationCard
                title="메타비즈랩 (본사)"
                subtitle="Main Office"
                address="서울특별시 마포구 마포대로 144 마포T타운(04212)"
                mapHtml={`<div id="daumRoughmapContainer1775275004997" class="root_daum_roughmap root_daum_roughmap_landing"></div><script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script><script charset="UTF-8">new daum.roughmap.Lander({"timestamp":"1775275004997","key":"29oemj76o9xw","mapWidth":"640","mapHeight":"360"}).render();</script>`}
              />
            </div>
            {/* 지사 지도 */}
            <div className="loc-branch" style={{ order: 2 }}>
              <LocationCard
                title="메타비즈랩 (지사)"
                subtitle="Branch Office"
                address="경기도 고양시 덕양구 황동로 218, 1층 A0145호(Gate 5)"
                mapHtml={`<div id="daumRoughmapContainer1775275072404" class="root_daum_roughmap root_daum_roughmap_landing"></div><script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script><script charset="UTF-8">new daum.roughmap.Lander({"timestamp":"1775275072404","key":"29oeo5dk324o","mapWidth":"640","mapHeight":"360"}).render();</script>`}
              />
            </div>
            {/* 대표번호 박스 */}
            <div className="loc-phone" style={{ order: 3 }}>
              <InfoBox label="대표번호" value="1600-3797" sub="평일 09:00-18:00" />
            </div>
            {/* 이메일 박스 */}
            <div className="loc-email" style={{ order: 4 }}>
              <InfoBox label="이메일 문의" value="meta@meta-bizlab.co.kr" sub="24시간 접수 가능" />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* 채용문의 팝업 */}
      {showRecruit && <RecruitPopup onClose={() => setShowRecruit(false)} />}

      {/* 고민 상세 팝업 */}
      {showConcernDetail !== null && (
        <ConcernDetailPopup
          type={showConcernDetail}
          onClose={() => setShowConcernDetail(null)}
          onConsult={() => { setShowConcernDetail(null); setShowConsult(true); }}
        />
      )}

      {/* 문의하기 팝업 */}
      {showConsult && <ConsultPopup onClose={() => setShowConsult(false)} />}
    </div>
  );
}

/* ─── SVG Icons ─── */

function FinanceIcon({ color = '#fff', size = 32 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="5" y="10" width="30" height="24" rx="2" stroke={color} strokeWidth="1.5" />
      <line x1="5" y1="16" x2="35" y2="16" stroke={color} strokeWidth="1.5" />
      <line x1="14" y1="10" x2="14" y2="34" stroke={color} strokeWidth="1" opacity="0.4" />
      <polyline points="18,30 22,22 26,26 32,18" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="30" r="1.5" fill={color} /><circle cx="22" cy="22" r="1.5" fill={color} />
      <circle cx="26" cy="26" r="1.5" fill={color} /><circle cx="32" cy="18" r="1.5" fill={color} />
    </svg>
  );
}

function RiskIcon({ color = '#fff', size = 32 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 4L36 34H4L20 4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="20" y1="16" x2="20" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="28" r="1.5" fill={color} />
    </svg>
  );
}

function TaxIcon({ color = '#fff', size = 32 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="8" y="4" width="24" height="32" rx="2" stroke={color} strokeWidth="1.5" />
      <line x1="13" y1="12" x2="27" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="18" x2="27" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="24" x2="22" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ConsultingIcon({ color = '#fff', size = 32 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="4" y="12" width="32" height="22" rx="2" stroke={color} strokeWidth="1.5" />
      <line x1="4" y1="18" x2="36" y2="18" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="15" cy="26" r="4" stroke={color} strokeWidth="1.5" />
      <circle cx="25" cy="26" r="4" stroke={color} strokeWidth="1.5" />
      <line x1="15" y1="6" x2="15" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="25" y1="6" x2="25" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Components ─── */

function HeroServiceCard({ icon, title, desc, bgColor }: { icon: React.ReactNode; title: string; desc: string; bgColor: string }) {
  return (
    <div style={{
      backgroundColor: bgColor,
      padding: 'clamp(28px, 3vw, 40px) clamp(20px, 2vw, 30px)',
      transition: 'all 0.3s',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '18px'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.filter = 'brightness(1.15)';
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.filter = 'brightness(1)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <div style={{
        width: '50px', height: '50px', borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}>
        {icon}
      </div>
      <div>
        <h3 style={{
          fontSize: 'clamp(13px, 1.3vw, 15px)',
          fontWeight: '800',
          color: '#fff',
          margin: '0 0 6px',
          lineHeight: '1.4',
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}>{title}</h3>
        <p style={{
          fontSize: 'clamp(11px, 1vw, 13px)',
          color: 'rgba(255,255,255,0.7)',
          margin: 0,
          lineHeight: '1.6',
          fontStyle: 'italic'
        }}>{desc}</p>
      </div>
    </div>
  );
}

function ConcernCard({ icon, text, onClick }: { icon: React.ReactNode; text: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{
      border: '1.5px solid #0f3278',
      color: '#0f3278',
      padding: 'clamp(28px, 3vw, 36px) clamp(16px, 2vw, 24px)',
      borderRadius: '12px',
      fontSize: 'clamp(12px, 1.2vw, 14px)',
      lineHeight: '1.7',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s',
      backgroundColor: 'transparent',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = '#0f3278';
      e.currentTarget.style.color = '#ffffff';
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,50,120,0.2)';
      const svgs = e.currentTarget.querySelectorAll('svg *[stroke="#0f3278"]');
      svgs.forEach((el) => el.setAttribute('stroke', '#ffffff'));
      const fills = e.currentTarget.querySelectorAll('svg *[fill="#0f3278"]');
      fills.forEach((el) => el.setAttribute('fill', '#ffffff'));
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = '#0f3278';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      const svgs = e.currentTarget.querySelectorAll('svg *[stroke="#ffffff"]');
      svgs.forEach((el) => el.setAttribute('stroke', '#0f3278'));
      const fills = e.currentTarget.querySelectorAll('svg *[fill="#ffffff"]');
      fills.forEach((el) => el.setAttribute('fill', '#0f3278'));
    }}>
      <div style={{ marginBottom: '16px', opacity: 0.9 }}>
        {icon}
      </div>
      <div>{text}</div>
      <span style={{
        display: 'inline-block',
        marginTop: '14px',
        fontSize: '12px',
        fontWeight: '700',
        letterSpacing: '0.5px',
        opacity: 0.7,
      }}>
        더보기 →
      </span>
    </div>
  );
}

/* Concern Icons */
function ConcernIcon1() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="16" r="10" stroke="#0f3278" strokeWidth="1.5" />
      <path d="M16 16h8M20 12v8" stroke="#0f3278" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 30h12" stroke="#0f3278" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 34h8" stroke="#0f3278" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 26c0-2 2-4 5-4s5 2 5 4" stroke="#0f3278" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ConcernIcon2() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="6" y="8" width="28" height="22" rx="2" stroke="#0f3278" strokeWidth="1.5" />
      <path d="M6 14h28" stroke="#0f3278" strokeWidth="1.5" />
      <path d="M14 30v4M26 30v4M10 34h20" stroke="#0f3278" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 21l4 4 8-8" stroke="#0f3278" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ConcernIcon3() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 4L4 16v18h12V26h8v8h12V16L20 4Z" stroke="#0f3278" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 18h8M20 14v8" stroke="#0f3278" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ConcernIcon4() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="14" stroke="#0f3278" strokeWidth="1.5" />
      <path d="M20 6v4M20 30v4M6 20h4M30 20h4" stroke="#0f3278" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 14l2 2M24 24l2 2M26 14l-2 2M14 24l-2 2" stroke="#0f3278" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="20" r="4" stroke="#0f3278" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="1.5" fill="#0f3278" />
    </svg>
  );
}

function ServiceDetailCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e8edf5',
      padding: 'clamp(28px, 3vw, 36px) clamp(18px, 2vw, 24px)',
      borderRadius: '12px',
      textAlign: 'center',
      transition: 'all 0.3s',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = '0 12px 40px rgba(15,50,120,0.1)';
      e.currentTarget.style.borderColor = '#c0cce0';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = '#e8edf5';
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>{icon}</div>
      <h3 style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', fontWeight: '700', color: '#0f3278', marginBottom: '16px' }}>{title}</h3>
      <div style={{ width: '24px', height: '2px', backgroundColor: '#d4af37', margin: '0 auto 16px' }} />
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 'clamp(12px, 1.2vw, 13px)', color: '#777', lineHeight: '2.2' }}>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

/* ─── Recruit Popup ─── */

/* ─── 고민 상세 팝업 ─── */

const CONCERN_DETAILS = [
  {
    title: '매출은 꾸준한데 왜 남도 적은지,\n한 번쯤 해보신 적 있으신가요?',
    body: '매출 대비 낮은 순이익은 대개 비용 구조의 고착화나 불필요한 세무 리스크 때문입니다. 특히 대표님의 급여 체계, 퇴직금 재원 마련 방식, 그리고 법인카드의 비효율적 사용 등을 점검하여 새어나가는 현금 흐름을 먼저 차단해야 합니다.',
    extra: '현재 법인 내부 정관에 대표님과 임원의 보수 및 퇴직금 규정이 최신 세법에 맞게 정비되어 있나요?',
    icon: '💰',
  },
  {
    title: '세금이나 고정비를 줄일 수 있는 방법\n이 궁금하신가요?',
    body: '세금이나 고정비를 줄이기 위해 정부 지원 정책(고용 지원금 등)을 먼저 활용하고, 비용 처리를 최적화해야 합니다. 특히, 합법적인 미처분 이익잉여금 회수 전략(자기주식 취득, 배당 전략 등)을 병행하여 불필요한 세금 부담을 사전에 차단하는 것이 핵심입니다.',
    extra: '지난 3년간 정부에서 제공하는 \'고용증대 세액공제\'나 \'연구소 설립 혜택\'을 놓치지 않고 모두 적용받으셨나요?',
    icon: '🖥️',
  },
  {
    title: '사업 운영 중 발생할 수 있는 위험에\n한 번쯤 해보신 적 있으신가요?',
    body: '법인 운영 리스크는 크게 대표님의 유고 시 유동성 위기와 노무/법적 분쟁입니다. 단체 보험을 통한 비용 처리와 동시에 경영인 정기보험 등을 활용하여 긴급 자금 확보 및 유족의 상속세 재원을 마련하는 입체적인 설계가 필수입니다.',
    extra: '갑작스러운 경영 공백 발생 시, 사업권을 방어하고 상속세를 납부할 만한 현금성 자산이 법인 내에 준비되어 있나요?',
    icon: '🏠',
  },
  {
    title: '창업, 마케팅, 플랫폼을 어떻게 시작\n해야 할지 궁금하신가요?',
    body: '초기 기업일수록 자본금 설정과 지분 구조가 향후 투자 유치나 기업 승계의 성패를 결정합니다. 마케팅과 플랫폼 확장에 앞서 정책 자금을 원활히 조달할 수 있는 기업 등급 관리가 선행되어야 마케팅 비용을 효율적으로 집행할 수 있습니다.',
    extra: '현재 기업의 신용등급이나 벤처기업 인증 등 정부 자금 조달을 위한 필수 요건들을 갖추고 계신가요?',
    icon: '⚙️',
  },
];

function ConcernDetailPopup({ type, onClose, onConsult }: { type: number; onClose: () => void; onConsult: () => void }) {
  const data = CONCERN_DETAILS[type - 1];
  const [showMore, setShowMore] = useState(false);

  React.useEffect(() => {
    document.body.classList.add('popup-open');
    return () => document.body.classList.remove('popup-open');
  }, []);

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9998,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#1a2a4a', borderRadius: '16px', maxWidth: '580px',
          width: 'calc(100% - 32px)', maxHeight: 'calc(100vh - 40px)', overflow: 'auto',
          padding: 'clamp(24px, 4vw, 44px) clamp(16px, 3vw, 36px)',
          textAlign: 'center', position: 'relative',
          boxSizing: 'border-box'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '12px', right: '12px',
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
          fontSize: '28px', cursor: 'pointer', lineHeight: 1, padding: '4px',
          transition: 'color 0.3s'
        }}
        onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
        onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        >&times;</button>

        {!showMore ? (
          /* 1단계: 아이콘 + 제목 + 본문 + 다음 버튼 */
          <>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>{data.icon}</div>
            <h2 style={{
              fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: '700', color: '#ffffff',
              lineHeight: '1.6', marginBottom: '24px', whiteSpace: 'pre-line'
            }}>
              {data.title}
            </h2>
            <p style={{
              fontSize: 'clamp(12px, 1.3vw, 14px)', color: 'rgba(255,255,255,0.7)',
              lineHeight: '1.9', marginBottom: '28px', textAlign: 'left',
              whiteSpace: 'pre-line'
            }}>
              {data.body}
            </p>
            <button
              onClick={() => setShowMore(true)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px',
                padding: '14px 32px', fontSize: '15px', fontWeight: '600',
                cursor: 'pointer', transition: 'all 0.3s', width: '100%',
                maxWidth: '320px'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            >
              다음
            </button>
          </>
        ) : (
          /* 2단계: 추가 질문 내용 + 1:1 문의하기 */
          <>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>{data.icon}</div>

            <div style={{
              backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '10px',
              padding: '16px 20px', marginBottom: '28px', textAlign: 'left'
            }}>
              <p style={{
                fontSize: 'clamp(12px, 1.2vw, 13px)', color: 'rgba(255,255,255,0.8)',
                lineHeight: '1.7'
              }}>
                {data.extra}
              </p>
            </div>

            <button
              onClick={onConsult}
              style={{
                backgroundColor: '#3b6abf', color: '#ffffff',
                border: 'none', borderRadius: '8px',
                padding: '14px 32px', fontSize: '15px', fontWeight: '700',
                cursor: 'pointer', transition: 'all 0.3s', width: '100%',
                maxWidth: '320px'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2d5aa0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b6abf'}
            >
              문의하기
            </button>

            <p style={{
              fontSize: '11px', color: 'rgba(255,255,255,0.35)',
              marginTop: '12px'
            }}>
              *전문가 답변은 평일 기준 1~2일 소요될 수 있습니다.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── 문의하기 팝업 ─── */

function ConsultPopup({ onClose }: { onClose: () => void }) {
  const [consultType, setConsultType] = useState('창업');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [showPrivacyDetail, setShowPrivacyDetail] = useState(false);

  React.useEffect(() => {
    document.body.classList.add('popup-open');
    return () => document.body.classList.remove('popup-open');
  }, []);

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 10px', border: '1px solid #ddd',
    borderRadius: '4px', fontSize: '12px', outline: 'none',
    transition: 'border-color 0.3s', boxSizing: 'border-box' as const, fontFamily: 'inherit',
    minWidth: 0,
  };
  const labelStyle: React.CSSProperties = {
    fontSize: '13px', fontWeight: '700', color: '#333', minWidth: '55px', flexShrink: 0
  };
  const rowStyle: React.CSSProperties = {
    display: 'flex', flexDirection: 'column' as const, gap: '6px',
    padding: '12px 0', borderBottom: '1px solid #eee', overflow: 'hidden',
  };

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff', borderRadius: '12px', maxWidth: '560px',
          width: '100%', maxHeight: 'calc(100vh - 20px)', overflow: 'hidden',
          boxSizing: 'border-box' as const,
          display: 'flex', flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px 28px', borderBottom: '1px solid #eee',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f3278', margin: 0 }}>문의하기</h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: '28px',
            cursor: 'pointer', color: '#ccc', lineHeight: 1, padding: '4px'
          }}>&times;</button>
        </div>

        {/* Form */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <form
            style={{ padding: '0 clamp(16px, 4vw, 28px) clamp(16px, 4vw, 28px)' }}
            onSubmit={(e) => {
              e.preventDefault();
              alert('문의하기이 접수되었습니다. 감사합니다.');
              onClose();
            }}
          >
            {/* 이름 */}
            <div style={rowStyle}>
              <label style={labelStyle}>이름</label>
              <input type="text" required placeholder="이름을 입력해주세요" style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'} />
            </div>

            {/* 연락처 */}
            <div style={rowStyle}>
              <label style={labelStyle}>연락처</label>
              <div style={{ display: 'flex', gap: '4px', flex: 1, alignItems: 'center', minWidth: 0 }}>
                <input type="text" required placeholder="010" maxLength={3}
                  style={{ ...inputStyle, textAlign: 'center' as const, flex: 1 }}
                  onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'} />
                <span style={{ color: '#ccc', flexShrink: 0 }}>-</span>
                <input type="text" required placeholder="0000" maxLength={4}
                  style={{ ...inputStyle, textAlign: 'center' as const, flex: 1 }}
                  onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'} />
                <span style={{ color: '#ccc', flexShrink: 0 }}>-</span>
                <input type="text" required placeholder="0000" maxLength={4}
                  style={{ ...inputStyle, textAlign: 'center' as const, flex: 1 }}
                  onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'} />
              </div>
            </div>

            {/* 문의내용 선택 */}
            <div style={rowStyle}>
              <label style={labelStyle}>문의내용</label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['창업', '절세', '법인컨설팅', '기타'].map((type) => (
                  <label key={type} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '14px', color: '#333', cursor: 'pointer'
                  }}>
                    <input
                      type="radio" name="consultType" value={type}
                      checked={consultType === type}
                      onChange={(e) => setConsultType(e.target.value)}
                      style={{ accentColor: '#0f3278' }}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* 문의내용 상세 */}
            <div style={{ ...rowStyle, alignItems: 'flex-start', borderBottom: 'none' }}>
              <label style={{ ...labelStyle, paddingTop: '4px' }}>상세내용</label>
              <textarea
                placeholder="문의 내용을 입력해 주세요"
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            {/* 개인정보 동의 */}
            <div style={{ marginTop: '16px', padding: '14px 0', borderTop: '1px solid #eee' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="privacyAgree"
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  style={{ accentColor: '#0f3278', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="privacyAgree" style={{ fontSize: '13px', color: '#333', cursor: 'pointer', flex: 1 }}>
                  개인정보 수집 및 이용에 동의합니다. <span style={{ color: '#999', fontSize: '12px' }}>(필수)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPrivacyDetail(true)}
                  style={{
                    background: 'none', border: '1px solid #ddd', borderRadius: '4px',
                    padding: '4px 10px', fontSize: '12px', color: '#666',
                    cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = '#0f3278'; e.currentTarget.style.color = '#0f3278'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#666'; }}
                >
                  내용보기
                </button>
              </div>
            </div>

            {/* 보내기 */}
            <button type="submit" disabled={!privacyAgreed} style={{
              width: '100%', backgroundColor: privacyAgreed ? '#0f3278' : '#ccc', color: '#ffffff',
              padding: '14px', borderRadius: '8px', fontSize: '15px', fontWeight: '700',
              border: 'none', cursor: privacyAgreed ? 'pointer' : 'not-allowed', transition: 'all 0.3s', marginTop: '12px'
            }}
            onMouseOver={(e) => { if (privacyAgreed) e.currentTarget.style.backgroundColor = '#0a2560'; }}
            onMouseOut={(e) => { if (privacyAgreed) e.currentTarget.style.backgroundColor = '#0f3278'; }}>
              보내기
            </button>
          </form>
        </div>
      </div>

      {/* 개인정보처리방침 상세 팝업 */}
      {showPrivacyDetail && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10001,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
          }}
          onClick={() => setShowPrivacyDetail(false)}
        >
          <div
            style={{
              backgroundColor: '#fff', borderRadius: '12px', maxWidth: '560px',
              width: 'calc(100% - 32px)', maxHeight: 'calc(100vh - 40px)',
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
              boxSizing: 'border-box' as const
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: '16px 20px', borderBottom: '1px solid #eee',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f3278', margin: 0 }}>개인정보 수집 및 이용 동의</h3>
              <button onClick={() => setShowPrivacyDetail(false)} style={{
                background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#ccc', lineHeight: 1
              }}>&times;</button>
            </div>
            <div style={{ padding: '20px', overflowY: 'auto', fontSize: '13px', color: '#444', lineHeight: '1.9' }}>
              <p style={{ marginBottom: '16px' }}>
                메타비즈랩(이하 &quot;회사&quot;)에서는 고객의 개인 정보를 매우 소중하게 생각하며 정보주체의 권익을 보호하기 위하여 적법하고 적정하게 취급할 것입니다. 전기통신기본법, 전기통신사업법, 개인 정보 보호법 및 동법 시행령 등 관련 법이 정하는 대로 준수하고 있습니다.
              </p>

              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f3278', marginBottom: '8px' }}>■ 수집하는 개인 정보 항목</h4>
              <p style={{ marginBottom: '4px' }}>&quot;회사&quot;는 원활한 고객상담, 각종 서비스의 제공을 위해 아래와 같은 개인 정보를 수집하고 있습니다.</p>
              <p style={{ marginBottom: '4px', fontWeight: '600' }}>[상담 신청 시 수집항목]</p>
              <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                <li>수집항목: 이름, 연락처, 이메일</li>
                <li>기타 정보: 상담 요청 정보</li>
                <li>자동 수집: IP Address, 쿠키, 방문 일시, 서비스 이용 기록</li>
              </ul>

              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f3278', marginBottom: '8px' }}>■ 개인정보의 수집 및 이용목적</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                <li>상담정보: 전화나 문자, 카카오톡을 이용한 고객 상담 및 안내</li>
                <li>기타: 문자 및 SNS를 통한 상담 소식, 정보 등의 안내, 설문조사, 불만 처리 등</li>
              </ul>

              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f3278', marginBottom: '8px' }}>■ 개인 정보의 처리 및 보유기간</h4>
              <p style={{ marginBottom: '4px' }}>이용자의 개인 정보는 원칙적으로 수집 및 이용목적이 달성되거나 이용자가 직접 삭제, 수정한 경우 파기합니다.</p>
              <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                <li>문의하기정보: 수집일로부터 5년 혹은 상담 목적 달성 시까지</li>
                <li>소비자 불만/분쟁처리 기록: 3년</li>
                <li>신용정보 수집/처리 기록: 3년</li>
                <li>방문 기록: 3개월</li>
                <li>본인확인 기록: 6개월</li>
              </ul>

              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f3278', marginBottom: '8px' }}>■ 동의 거부 권리 및 불이익</h4>
              <p>
                개인정보 수집에 대해 동의를 거부할 권리가 있으며, 동의 거부 시에는 상담 신청 등의 서비스가 제한됩니다.
                위 개인정보는 서비스를 이용하기 위해 필요한 최소한의 정보이므로 동의를 해주셔야만 서비스를 이용하실 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── 협력사 슬라이더 ─── */

function PartnersSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const partners = [
    { name: '드림플러스', role: '경영지도 컨설팅', person: '김내영 대표', link: 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EA%B9%80%EB%82%B4%EC%98%81&ackey=n884foqs' },
    { name: '캠핑삼춘[CampingUncle]', role: '유튜브', person: '', link: 'https://www.youtube.com/@CampingUncle' },
    { name: '법무법인 우리', role: '법률 자문', person: '정상수 변호사', link: 'http://www.wooreelaw.co.kr/' },
    { name: '세무법인 가감', role: '세무 자문', person: '유원상 세무사', link: 'https://www.gagamtax.co.kr/' },
    { name: '영필름', role: '영상 제작', person: '이영재 감독', link: '' },
    { name: '지산튜브', role: '부동산 유튜브', person: '', link: 'https://www.youtube.com/@jisantube' },
    { name: '인 다이렉트 카', role: '보험', person: '신인철 대표', link: '' },
    { name: '하람 손해사정', role: '손해사정', person: '정원호 대표', link: '' },
    { name: '(주)국민M&A', role: 'M&A', person: '곽대영 대표', link: '' },
    { name: '건강한 다이아', role: '건강', person: '박미선 대표', link: '' },
    { name: '제로디자인', role: '디자인', person: '이준상 대표', link: 'https://zerodesign.co.kr/' },
    { name: '에이치&애드', role: '광고기획사', person: '', link: '' },
  ];

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll);
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  // 자동 슬라이드 (6초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 260, behavior: 'smooth' });
      }
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  return (
    <div>

      {/* 스크롤 컨테이너 */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '10px 0',
          WebkitOverflowScrolling: 'touch'
        }}
      >
{/* scrollbar hidden via inline scrollbarWidth + msOverflowStyle */}
        {partners.map((p, i) => (
          <div key={i} className="partner-slide" style={{
            scrollSnapAlign: 'start',
            flexShrink: 0,
            width: '240px'
          }}
          onClick={() => p.link && window.open(p.link, '_blank')}
          >
            <PartnerCard name={p.name} role={p.role} person={p.person} />
          </div>
        ))}
      </div>

      {/* 좌우 버튼 - 하단 중앙 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
        <button
          onClick={() => scroll('left')}
          style={{
            width: '40px', height: '40px', borderRadius: '50%',
            backgroundColor: canScrollLeft ? '#ffffff' : '#f0f0f0',
            border: '1px solid #e0e6f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            cursor: canScrollLeft ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', color: canScrollLeft ? '#0f3278' : '#ccc', fontWeight: '700',
            transition: 'all 0.2s',
            opacity: canScrollLeft ? 1 : 0.5,
          }}
        >
          &#8249;
        </button>
        <button
          onClick={() => scroll('right')}
          style={{
            width: '40px', height: '40px', borderRadius: '50%',
            backgroundColor: canScrollRight ? '#ffffff' : '#f0f0f0',
            border: '1px solid #e0e6f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            cursor: canScrollRight ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', color: canScrollRight ? '#0f3278' : '#ccc', fontWeight: '700',
            transition: 'all 0.2s',
            opacity: canScrollRight ? 1 : 0.5,
          }}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}

/* ─── 협력사 그리드 (3열) ─── */

function PartnersGrid() {
  const partners = [
    { name: '드림플러스', role: '경영지도 컨설팅', person: '김내영 대표', link: 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EA%B9%80%EB%82%B4%EC%98%81&ackey=n884foqs' },
    { name: '캠핑삼춘[CampingUncle]', role: '유튜브', person: '', link: 'https://www.youtube.com/@CampingUncle' },
    { name: '법무법인 우리', role: '법률 자문', person: '정상수 변호사', link: 'http://www.wooreelaw.co.kr/' },
    { name: '세무법인 가감', role: '세무 자문', person: '유원상 세무사', link: 'https://www.gagamtax.co.kr/' },
    { name: '영필름', role: '영상 제작', person: '이영재 감독', link: '' },
    { name: '지산튜브', role: '부동산 유튜브', person: '', link: 'https://www.youtube.com/@jisantube' },
    { name: '인 다이렉트 카', role: '보험', person: '신인철 대표', link: '' },
    { name: '하람 손해사정', role: '손해사정', person: '정원호 대표', link: '' },
    { name: '(주)국민M&A', role: 'M&A', person: '곽대영 대표', link: '' },
    { name: '건강한 다이아', role: '건강', person: '박미선 대표', link: '' },
    { name: '제로디자인', role: '디자인', person: '이준상 대표', link: 'https://zerodesign.co.kr/' },
    { name: '에이치&애드', role: '광고기획사', person: '', link: '' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
    }}>
      {partners.map((p, i) => (
        <div
          key={i}
          onClick={() => p.link && window.open(p.link, '_blank')}
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            cursor: p.link ? 'pointer' : 'default',
            height: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
            background: 'linear-gradient(135deg, #0a1628 0%, #0f2847 50%, #0d1f3a 100%)',
            position: 'relative',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,50,120,0.25)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ textAlign: 'center', padding: '16px', position: 'relative', zIndex: 2 }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#fff', marginBottom: '4px', lineHeight: '1.3' }}>
              {p.name}
            </h4>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: p.person ? '4px' : '0', fontWeight: '500' }}>
              {p.role}
            </p>
            {p.person && (
              <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: '700' }}>{p.person}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function RecruitPopup({ onClose }: { onClose: () => void }) {
  const [agreed, setAgreed] = useState(false);

  React.useEffect(() => {
    document.body.classList.add('popup-open');
    return () => document.body.classList.remove('popup-open');
  }, []);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
    minWidth: 0,
  };
  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '700',
    color: '#333',
    minWidth: '70px',
    flexShrink: 0
  };
  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 0',
    borderBottom: '1px solid #eee',
    overflow: 'hidden',
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          maxWidth: '640px',
          width: 'calc(100% - 32px)',
          maxHeight: 'calc(100vh - 40px)',
          boxSizing: 'border-box' as const,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f3278', margin: 0 }}>
            채용문의
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', fontSize: '28px',
              cursor: 'pointer', color: '#ccc', lineHeight: 1, padding: '4px'
            }}
          >
            &times;
          </button>
        </div>

        {/* Scrollable Form */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <form
            style={{ padding: '0 clamp(16px, 4vw, 28px) clamp(16px, 4vw, 28px)' }}
            onSubmit={(e) => {
              e.preventDefault();
              if (!agreed) { alert('개인정보 수집 및 이용에 동의해 주세요.'); return; }
              alert('채용문의가 접수되었습니다. 감사합니다.');
              onClose();
            }}
          >
            {/* 지원자명 */}
            <div style={rowStyle}>
              <label style={labelStyle}>지원자명</label>
              <input
                type="text" required placeholder="지원자명을 입력해주세요"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            {/* 생년월일 */}
            <div style={rowStyle}>
              <label style={labelStyle}>생년월일</label>
              <input
                type="text" required placeholder="생년월일을 입력해주세요"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            {/* 전화번호 */}
            <div style={rowStyle}>
              <label style={labelStyle}>전화번호</label>
              <div style={{ display: 'flex', gap: '8px', flex: 1, alignItems: 'center' }}>
                <input
                  type="text" required placeholder="010" maxLength={3}
                  style={{ ...inputStyle, textAlign: 'center' as const }}
                  onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                <span style={{ color: '#ccc' }}>-</span>
                <input
                  type="text" required placeholder="0000" maxLength={4}
                  style={{ ...inputStyle, textAlign: 'center' as const }}
                  onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
                <span style={{ color: '#ccc' }}>-</span>
                <input
                  type="text" required placeholder="0000" maxLength={4}
                  style={{ ...inputStyle, textAlign: 'center' as const }}
                  onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
              </div>
            </div>

            {/* 지역 */}
            <div style={rowStyle}>
              <label style={labelStyle}>지역</label>
              <input
                type="text" placeholder="희망근무지를 입력해주세요"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            {/* 경력여부 */}
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

            {/* 문의내용 */}
            <div style={{ ...rowStyle, alignItems: 'flex-start' }}>
              <label style={{ ...labelStyle, paddingTop: '4px' }}>문의내용</label>
              <textarea
                placeholder="문의 내용을 입력해 주세요"
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={(e) => e.target.style.borderColor = '#0f3278'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            {/* Separator */}
            <div style={{ height: '12px', backgroundColor: '#f0f0f0', margin: '24px -28px 24px' }} />

            {/* 개인정보 수집 동의 */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                marginBottom: '16px'
              }}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#0f3278' }}
                />
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#2ecc71' }}>
                  개인정보 수집 및 이용에 관한 동의 (필수)
                </span>
              </label>

              {/* 세부내용 스크롤 */}
              <div style={{
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '16px',
                maxHeight: '160px',
                overflowY: 'auto',
                fontSize: '13px',
                color: '#555',
                lineHeight: '1.8',
                backgroundColor: '#fafafa'
              }}>
                <p style={{ marginBottom: '12px' }}>
                  채용문의를 위해 아래와 같이 개인정보를 수집 · 이용합니다.
                </p>
                <p style={{ marginBottom: '8px' }}>
                  <strong>1. 개인정보의 수집 및 이용 목적</strong><br />
                  - 채용문의에 원활한 답변을 위한 정보 획득
                </p>
                <p style={{ marginBottom: '8px' }}>
                  <strong>2. 수집하는 개인정보의 항목</strong><br />
                  - 필수정보 : 성명, 생년월일, 휴대전화번호
                </p>
                <p style={{ marginBottom: '8px' }}>
                  <strong>3. 개인정보의 보유 및 이용기간</strong><br />
                  - 문의자의 개인정보는 문의일로부터 1년간 보유합니다.
                </p>
                <p>
                  <strong>4. 동의를 거부할 권리 및 동의 거부에 따른 불이익</strong><br />
                  - 문의자 본인은 개인정보의 수집, 이용 등과 관련한 위 사항에 대하여 원하지 않는 경우 동의를 거부할 수 있습니다.<br />
                  - 다만, 수집하는 개인정보의 항목에서 필수정보에 대한 수집 및 이용에 대하여 동의하지 않는 경우는 답변에 제한이 있을 수 있습니다.
                </p>
              </div>
            </div>

            {/* 제출 */}
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#0f3278',
                color: '#ffffff',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0a2560'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0f3278'}
            >
              보내기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function PartnerCard({ name, role, person }: { name: string; role: string; person: string }) {
  return (
    <div
      className="partner-card-inner"
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        height: '180px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s',
        background: 'linear-gradient(135deg, #0a1628 0%, #0f2847 50%, #0d1f3a 100%)'
      }}
      onMouseOver={(e) => {
        const overlay = e.currentTarget.querySelector('.partner-overlay') as HTMLElement;
        if (overlay) overlay.style.backgroundColor = 'rgba(15,50,120,0.75)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(15,50,120,0.3)';
      }}
      onMouseOut={(e) => {
        const overlay = e.currentTarget.querySelector('.partner-overlay') as HTMLElement;
        if (overlay) overlay.style.backgroundColor = 'rgba(15,50,120,0.25)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Overlay */}
      <div
        className="partner-overlay"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15,50,120,0.25)',
          transition: 'background-color 0.4s',
          zIndex: 1
        }}
      />

      {/* Text - centered */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: 'clamp(16px, 2vw, 20px)'
      }}>
        <h4 style={{
          fontSize: 'clamp(15px, 1.5vw, 17px)',
          fontWeight: '800',
          color: '#ffffff',
          marginBottom: '6px',
          lineHeight: '1.3',
          textShadow: '0 1px 4px rgba(0,0,0,0.3)'
        }}>
          {name}
        </h4>
        <p style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: person ? '6px' : '0',
          fontWeight: '500'
        }}>
          {role}
        </p>
        {person && (
          <p style={{
            fontSize: '13px',
            color: '#d4af37',
            fontWeight: '700'
          }}>
            {person}
          </p>
        )}
      </div>
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
      {sub && (
        <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>{sub}</p>
      )}
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
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; }
          body { width: 100%; height: 100vh; overflow: hidden; }
          .root_daum_roughmap { width: 100% !important; height: 100% !important; }
          .root_daum_roughmap .wrap_map { width: 100% !important; height: 100% !important; }
        </style>
      </head>
      <body>
        ${mapHtml}
      </body>
      </html>
    `);
    doc.close();
  }, [mapHtml]);

  return (
    <div>
      {/* 지도 + 제목/주소 카드 */}
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
        <iframe
          ref={iframeRef}
          style={{ width: '100%', height: '280px', border: 'none', display: 'block' }}
          title={`${title} 지도`}
        />
        <div style={{ padding: 'clamp(18px, 2.5vw, 24px)' }}>
          {subtitle && (
            <span style={{ fontSize: '11px', color: '#d4af37', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
              {subtitle}
            </span>
          )}
          <h3 style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', fontWeight: '700', color: '#0f3278', marginBottom: '10px' }}>{title}</h3>
          <p style={{ fontSize: '13px', color: '#777', margin: 0, lineHeight: '1.6' }}>{address}</p>
        </div>
      </div>

    </div>
  );
}
