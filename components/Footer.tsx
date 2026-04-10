'use client';

import { useState } from 'react';

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer style={{
        backgroundColor: '#0a1628',
        color: '#ffffff',
        padding: '50px 20px 24px',
        overflowX: 'hidden',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {/* Company Info */}
            <div style={{ flex: '1 1 200px', minWidth: '200px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <img
                  src="/images/metabizlab-logo.png"
                  alt="META BIZLAB"
                  style={{ height: '34px', width: 'auto' }}
                />
              </div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.5)',
                lineHeight: '1.7',
                fontSize: '13px'
              }}>
                당신의 비즈니스에<br />
                전략을 더하다
              </p>
              <p style={{
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '12px',
                marginTop: '12px',
                lineHeight: '1.6',
              }}>
                메타비즈랩<br />
                대표자 유경희 | 등록번호 340-19-01025
              </p>
            </div>

            {/* Contact */}
            <div style={{ flex: '1 1 250px', minWidth: '250px' }}>
              <h4 style={{
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '16px',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}>
                Contact
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '10px', color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                  경기도 고양시 덕양구 향동로 218
                </li>
                <li style={{ marginBottom: '6px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  T. 1600-3797
                </li>
                <li style={{ marginBottom: '10px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  M. meta@meta-bizlab.co.kr
                </li>
                <li style={{ marginTop: '16px' }}>
                  <button
                    onClick={() => setShowPrivacy(true)}
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      background: 'none',
                      border: 'none',
                      fontSize: '13px',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                      transition: 'color 0.3s',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#d4af37'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    개인정보처리방침
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '18px',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.35)',
            fontSize: '12px'
          }}>
            <p style={{ margin: 0 }}>&copy; 2019 META BIZLAB. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Popup */}
      {showPrivacy && (
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
          onClick={() => setShowPrivacy(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              maxWidth: '800px',
              width: 'calc(100% - 32px)',
              maxHeight: 'calc(100vh - 40px)',
              boxSizing: 'border-box' as const,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e8edf5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f3278', margin: 0 }}>
                개인정보처리방침
              </h2>
              <button
                onClick={() => setShowPrivacy(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#999',
                  lineHeight: 1,
                  padding: '4px'
                }}
              >
                &times;
              </button>
            </div>

            <div style={{
              padding: '24px',
              overflowY: 'auto',
              fontSize: '13px',
              color: '#444',
              lineHeight: '1.9'
            }}>
              <p style={{ marginBottom: '20px', color: '#666' }}>
                메타비즈랩(이하 &quot;회사&quot;)은 개인정보보호법에 따라 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다.
              </p>

              <PrivacySection title="제1조 (개인정보의 처리 목적)">
                회사는 다음의 목적을 위하여 개인정보를 처리합니다.
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
                  <li>회원 가입 및 관리</li>
                  <li>마케팅 및 광고에 활용</li>
                  <li>고충처리</li>
                </ul>
              </PrivacySection>

              <PrivacySection title="제2조 (개인정보의 처리 및 보유기간)">
                회사는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </PrivacySection>

              <PrivacySection title="제3조 (처리하는 개인정보의 항목)">
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>필수항목: 성명, 연락처, 상담 내용</li>
                  <li>선택항목: 회사명, 직위</li>
                </ul>
              </PrivacySection>

              <PrivacySection title="제4조 (개인정보 보호책임자)">
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>개인정보 보호책임자: 메타비즈랩 대표</li>
                  <li>연락처: 1600-3797</li>
                  <li>이메일: meta@meta-bizlab.co.kr</li>
                </ul>
              </PrivacySection>

              <p style={{ marginTop: '24px', color: '#999', fontSize: '12px' }}>
                시행일자: 2026년 01월 01일
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PrivacySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{
        fontSize: '14px',
        fontWeight: '700',
        color: '#0f3278',
        marginBottom: '8px'
      }}>
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}
