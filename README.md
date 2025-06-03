# Web front-end Junior Software engineer

## 실행 환경

- **Node.js**: v18.20.7
- **Package Manager**: Yarn

이 프로젝트는 PDF 문서와 관련된 JSON 데이터를 나란히 표시하여 사용자가 두 데이터 간의 연관성을 쉽게 파악할 수 있도록 도와주는 인터랙티브 뷰어입니다. PDF의 텍스트 요소와 JSON 데이터 간의 매핑을 통해 문서 분석 및 데이터 검증 작업을 효율적으로 수행할 수 있습니다.

## 주요 기능

- **PDF 뷰어**: PDF 문서를 웹에서 직접 렌더링 및 표시
- **JSON 뷰어**: 구조화된 JSON 데이터의 시각적 표현
- **인터랙티브 연동**: PDF와 JSON 데이터 간의 실시간 상호작용
- **텍스트 파싱**: PDF에서 추출된 텍스트 요소의 지능적 그룹화
- **반응형 UI**: 다양한 화면 크기에 최적화된 사용자 인터페이스

##기술 스택

### 프론트엔드 프레임워크

### 주요 라이브러리

#### PDF 처리

- **pdfjs-dist (v3.10.111)**: Mozilla의 PDF.js 라이브러리
  - **선택 이유**:
    - 브라우저에서 PDF를 네이티브로 렌더링할 수 있는 가장 안정적인 솔루션
    - 텍스트 추출, 페이지 렌더링, 메타데이터 접근 등 풍부한 API 제공
    - 크로스 브라우저 호환성이 뛰어남
    - Adobe PDF 표준을 완벽하게 지원

#### 스타일링

- **styled-components (v6.1.18)**: CSS-in-JS 스타일링 솔루션
  - **선택 이유**:
    - 컴포넌트 기반 스타일링으로 재사용성과 유지보수성 향상
    - TypeScript와의 완벽한 통합
    - 스타일 격리를 통한 CSS 충돌 방지

### 개발 도구

#### 코드 품질

- **ESLint**: 코드 품질 및 일관성 검사
- **Prettier**: 코드 포맷팅 자동화
- **TypeScript**: 정적 타입 검사

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   └── features/       # 기능별 컴포넌트
│       ├── pdf-viewer/ # PDF 뷰어 관련 컴포넌트
│       └── json-viewer/# JSON 뷰어 관련 컴포넌트
├── pages/              # 페이지 컴포넌트
├── hooks/              # 커스텀 React 훅
├── contexts/           # React Context API
├── utils/              # 유틸리티 함수
├── types/              # TypeScript 타입 정의
├── commons/            # 공통 상수 및 설정
└── assets/             # 정적 자산
```
