'use client';

import { useState, useEffect } from 'react';

const menuItems = [
  { label: '회사이념', href: '#about' },
  { label: '사업영역', href: '#business-services' },
  { label: '핵심서비스', href: '#services' },
  { label: '협력사', href: '#partners' },
  { label: '채용문의', href: '#careers' },
  { label: '오시는길', href: '#location' },
  { label: '게시판', href: '/board' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <style>{`
        .nav-desktop { display: flex; }
        .nav-hamburger { display: none; }
        .nav-inner { height: 128px; }
        @media (max-width: 1024px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        @media (max-width: 640px) {
          .nav-inner { height: 73px !important; }
          .nav-logo { height: 36px !important; }
        }
      `}</style>
      <nav style={{
        backgroundColor: scrolled ? 'rgba(10, 22, 40, 0.97)' : 'rgba(10, 22, 40, 0.85)',
        backdropFilter: 'blur(12px)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background-color 0.3s'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div className="nav-inner" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            {/* Logo */}
            <a href="#about" style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}>
              <img
                src="/images/metabizlab-logo.png"
                alt="META BIZLAB"
                className="nav-logo"
                style={{ height: '43px', width: 'auto' }}
              />
            </a>

            {/* Desktop Menu */}
            <div className="nav-desktop" style={{
              gap: '28px',
              alignItems: 'center'
            }}>
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '14px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    letterSpacing: '0.3px',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#d4af37'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Hamburger Button */}
            <button
              className="nav-hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#ffffff',
                padding: '8px',
                zIndex: 1002
              }}
              aria-label="메뉴"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {isMenuOpen ? (
                  <>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Menu Overlay */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(10, 22, 40, 0.97)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0'
        }}>
          {/* X 닫기 버튼 */}
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#ffffff',
              padding: '8px',
              zIndex: 1003,
            }}
            aria-label="닫기"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: '#ffffff',
                fontSize: '20px',
                fontWeight: '600',
                textDecoration: 'none',
                padding: '18px 40px',
                letterSpacing: '1px',
                transition: 'color 0.3s',
                textAlign: 'center'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#d4af37'}
              onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
