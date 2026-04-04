# 메가인포자산관리 (Mega Info Asset Management)

전문적이고 도전적이며 합리적인 자산관리 솔루션을 제공하는 기업 웹사이트

## 프로젝트 개요

메가인포자산관리 공식 웹사이트는 고객에게 전문적인 자산관리 서비스를 소개하고, 회사의 핵심 가치와 비전을 전달하기 위해 개발되었습니다.

## 주요 기능

### 1. Hero Section
- "Manage all the Information in the asset" 메인 슬로건
- 파란색 그라디언트 배경 디자인
- 명확한 CTA(Call-to-Action) 버튼

### 2. 인재 중심의 경영
- 회사의 핵심 철학 및 비전 소개
- 전문적이고 합리적인 인재 경영 강조

### 3. 핵심 가치 카드
- **전문적**: 풍부한 경험과 전문 지식 기반의 서비스
- **도전적**: 끊임없는 혁신과 도전으로 새로운 가치 창출
- **합리적**: 객관적이고 합리적인 판단으로 고객 이익 최우선

### 4. 회사 개요
- 재무건전성: AAA 등급
- 지역본부: 전국 12개
- 전문가: 200명 이상
- 준법감시: 24시간 체계

### 5. Navigation
회사이념, 회사소개, 미션, 미디어, 오시는 길, 공지사항, 인재채용, 신문고

## 기술 스택

- **Framework**: Next.js 16.2.1 (App Router)
- **Language**: TypeScript 6.0.2
- **UI Library**: React 19.2.4
- **Styling**: Inline CSS (반응형 디자인)
- **Runtime**: Node.js

## 시작하기

### 필수 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 모드로 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 프로젝트 구조

```
metarich/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 전역 스타일
├── components/
│   ├── Navbar.tsx          # 네비게이션 바
│   └── Footer.tsx          # 푸터
├── public/
│   └── images/             # 이미지 리소스
├── next.config.ts          # Next.js 설정
├── tsconfig.json           # TypeScript 설정
└── package.json            # 프로젝트 의존성
```

## 주요 컴포넌트

### Navbar
- 반응형 네비게이션 메뉴
- 모바일 햄버거 메뉴
- 8개 주요 메뉴 항목

### Footer
- 4단 그리드 레이아웃
- 회사 정보, 바로가기, 고객지원, 연락처
- 다크 테마 디자인

### ValueCard
- 핵심 가치 표시 카드
- 호버 효과 (transform, shadow)
- 아이콘, 제목, 설명 포함

### OverviewCard
- 회사 개요 정보 카드
- 아이콘, 제목, 수치, 설명 포함
- 깔끔한 정보 전달

## 스타일 가이드

### 색상 팔레트

- **Primary Blue**: #0066cc
- **Dark Blue**: #004999
- **White**: #ffffff
- **Light Gray**: #f8f9fa
- **Dark Gray**: #1a1a1a
- **Text**: #333333

### 타이포그래피

- 헤딩: 700 font-weight, clamp() 반응형 크기
- 본문: 400-500 font-weight, 15-20px
- 시스템 폰트 스택 사용

### 반응형 디자인

- 모바일 퍼스트 접근
- CSS Grid와 Flexbox 활용
- clamp() 함수로 유동적 타이포그래피

## 스크립트

```json
{
  "dev": "next dev",           // 개발 서버
  "build": "next build",       // 프로덕션 빌드
  "start": "next start",       // 프로덕션 서버
  "lint": "next lint"          // 코드 린팅
}
```

## 브라우저 지원

- Chrome (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- Edge (최신 2개 버전)

## 라이센스

ISC

## 연락처

- **전화**: 02-1234-5678
- **이메일**: info@megainfoasset.com
- **주소**: 서울시 강남구 테헤란로
- **운영시간**: 평일 09:00 - 18:00

---

© 2026 메가인포자산관리. All rights reserved.
