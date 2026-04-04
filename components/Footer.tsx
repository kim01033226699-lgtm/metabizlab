'use client';

import { useState } from 'react';

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer style={{
        backgroundColor: '#0a1628',
        color: '#ffffff',
        padding: '50px 20px 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1fr',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {/* Company Info */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <span style={{ fontSize: '16px', color: '#d4af37' }}>◆</span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  letterSpacing: '0.5px'
                }}>
                  META BIZLAB
                </span>
              </div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.5)',
                lineHeight: '1.7',
                fontSize: '13px'
              }}>
                당신의 비즈니스에<br />
                전략을 더하다
              </p>
            </div>

            {/* Menu Links */}
            <div>
              <h4 style={{
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '16px',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}>
                Menu
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <FooterAnchor href="#about">회사이념</FooterAnchor>
                <FooterAnchor href="#business-services">사업영역</FooterAnchor>
                <FooterAnchor href="#services">핵심서비스</FooterAnchor>
                <FooterAnchor href="#partners">협력사</FooterAnchor>
                <FooterAnchor href="#careers">채용문의</FooterAnchor>
                <FooterAnchor href="#location">오시는길</FooterAnchor>
              </ul>
            </div>

            {/* Contact */}
            <div>
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
                <li style={{ marginBottom: '10px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  서울특별시 마포구 마포대로 144
                </li>
                <li style={{ marginBottom: '10px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  1600-3797
                </li>
                <li style={{ marginBottom: '10px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  meta@meta-bizab.co.kr
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

            {/* Get in Touch */}
            <div>
              <h4 style={{
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '16px',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}>
                Get in Touch
              </h4>
              <form style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <input
                  type="text"
                  placeholder="Name"
                  style={{
                    padding: '9px 12px',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '3px',
                    color: '#ffffff',
                    fontSize: '12px',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(212,175,55,0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <input
                  type="text"
                  placeholder="Message"
                  style={{
                    padding: '9px 12px',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '3px',
                    color: '#ffffff',
                    fontSize: '12px',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(212,175,55,0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button
                  type="button"
                  style={{
                    padding: '9px 16px',
                    backgroundColor: '#d4af37',
                    color: '#0f3278',
                    border: 'none',
                    borderRadius: '3px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c9a631'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#d4af37'}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Bottom bar - centered copyright only */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '18px',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.35)',
            fontSize: '12px'
          }}>
            <p style={{ margin: 0 }}>&copy; 2026 META BIZLAB. All rights reserved.</p>
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
              width: '100%',
              maxHeight: '80vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Popup Header */}
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

            {/* Popup Body */}
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
                회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
                  <li>회원 가입 및 관리: 회원 가입의사 확인, 본인 식별·인증, 회원자격 유지·관리</li>
                  <li>마케팅 및 광고에 활용: 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공</li>
                  <li>고충처리: 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보</li>
                </ul>
              </PrivacySection>

              <PrivacySection title="제2조 (개인정보의 처리 및 보유기간)">
                회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>서비스 이용 기록: 3년 (통신비밀보호법)</li>
                  <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
                  <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</li>
                  <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</li>
                </ul>
              </PrivacySection>

              <PrivacySection title="제3조 (처리하는 개인정보의 항목)">
                회사는 다음의 개인정보 항목을 처리하고 있습니다.
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>필수항목: 성명, 연락처(전화번호, 이메일), 상담 내용</li>
                  <li>선택항목: 회사명, 직위</li>
                  <li>인터넷 서비스 이용과정에서 자동으로 생성되어 수집되는 항목: IP주소, 쿠키, 서비스 이용기록, 방문기록</li>
                </ul>
              </PrivacySection>

              <PrivacySection title="제4조 (개인정보의 제3자 제공)">
                회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>이용자가 사전에 동의한 경우</li>
                  <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                </ul>
              </PrivacySection>

              <PrivacySection title="제5조 (개인정보처리의 위탁)">
                회사는 원활한 개인정보 업무처리를 위하여 개인정보 처리업무를 위탁할 수 있으며, 위탁 계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.
              </PrivacySection>

              <PrivacySection title="제6조 (개인정보의 파기)">
                회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>전자적 파일 형태: 복구 및 재생이 되지 않도록 안전하게 삭제</li>
                  <li>기록물, 인쇄물, 서면 등: 분쇄기로 분쇄하거나 소각하여 파기</li>
                </ul>
              </PrivacySection>

              <PrivacySection title="제7조 (정보주체의 권리·의무 및 행사방법)">
                이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>개인정보 열람 요구</li>
                  <li>오류 등이 있을 경우 정정 요구</li>
                  <li>삭제 요구</li>
                  <li>처리정지 요구</li>
                </ul>
              </PrivacySection>

              <PrivacySection title="제8조 (개인정보의 안전성 확보조치)">
                회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육</li>
                  <li>기술적 조치: 개인정보처리시스템 접근권한 관리, 보안프로그램 설치, 개인정보 암호화</li>
                  <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
                </ul>
              </PrivacySection>

              <PrivacySection title="제9조 (개인정보 보호책임자)">
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <li>개인정보 보호책임자: 메타비즈랩 대표</li>
                  <li>연락처: 1600-3797</li>
                  <li>이메일: meta@meta-bizab.co.kr</li>
                </ul>
              </PrivacySection>

              <PrivacySection title="제10조 (개인정보 처리방침 변경)">
                이 개인정보처리방침은 2026년 1월 1일부터 적용됩니다. 이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다. 변경사항이 있을 경우 웹사이트를 통해 공지할 예정입니다.
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

function FooterAnchor({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li style={{ marginBottom: '8px' }}>
      <a
        href={href}
        style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '13px',
          textDecoration: 'none',
          transition: 'color 0.3s'
        }}
        onMouseOver={(e) => e.currentTarget.style.color = '#d4af37'}
        onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
      >
        {children}
      </a>
    </li>
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
