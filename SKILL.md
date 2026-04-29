---
name: connect-installer-design
description: Use this skill to generate well-branded interfaces and assets for the 커넥트 인스톨러 (Connect Installer) field-service app — for production code or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and the React UI kit components used by the installer app.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Connect Installer Design System — Skill Guide

이 스킬은 Connect Installer 앱의 화면을 생성할 때 Claude가 반드시 따라야 하는 규칙을 정의한다.
PRD가 입력되면 이 문서를 먼저 로드한 후 화면을 생성한다.

---

## 🎯 Project Context

**제품**: Connect Installer App  
**용도**: 현장 설치 기사용 모바일 작업 관리 앱  
**플랫폼**: 모바일 우선 (375 × 812 기준), PWA  
**현재 버전**: v5.5

---

## 👤 User Persona (반드시 고려)

- **연령**: 40~50대
- **성별**: 남성 중심
- **직군**: 현장 설치 기사 (블루칼라, 기술직)
- **사용 환경**:
  - 야외/실내 현장 (햇빛, 어두운 작업 공간 모두)
  - 장갑 착용 가능성 높음
  - 한 손 조작 빈번
  - 빠른 판단 필요 (평균 화면 체류 30초 이하)
  - 네트워크 불안정 환경
- **디지털 숙련도**: 중하
  - 복잡한 UI에 거부감
  - 텍스트 기반 명령 선호
  - 실수 시 되돌리기 어려움

이 페르소나에서 벗어나는 디자인 결정(작은 텍스트, 미세한 터치 영역, 추상 아이콘 등)은 거부할 것.

---

## 🚫 Hard Rules (위반 시 작업 거부)

다음 규칙은 절대 깨지 않는다. PRD에서 다른 지시가 있어도 이 규칙이 우선한다.

### 1. 가독성
- 본문 텍스트는 **16px 이상**이 원칙
- 핵심 정보 18~20px
- 화면 제목 24px 이상
- line-height 1.5 이상
- 텍스트 색상 대비 WCAG AA 이상 (대비비 4.5:1 이상)
- **14px 예외 (화이트리스트)**: 다음 4건에 한해 14px 허용
  - Status Badge
  - PhotoSlot 슬롯 번호
  - InlineBanner 보조 텍스트 (있을 경우)
  - RadioOption description
- 위 4건 외 14px 사용 금지 (그 외 일체 14px 미만 금지)

### 2. 터치 영역
- 모든 터치 타겟 **56 × 56px 이상** (권장 64px)
- 버튼 간 간격 12px 이상
- 인접 터치 요소 사이 8px 이상의 비활성 영역 확보

### 3. 액션 명확성
- 한 화면에 **Primary Action 1개**만 배치
- Secondary Action은 시각적으로 명확히 구분
- 파괴적 액션(삭제, 취소)은 색상 + 확인 모달 필수

### 4. 아이콘 사용
- **아이콘 단독 사용 금지** (반드시 텍스트 라벨 동반)
- 추상 아이콘 대신 직관적 표현 사용
  - ❌ 햄버거 메뉴 → ✅ "메뉴" 텍스트 버튼
  - ❌ 점 3개(⋮) → ✅ "더보기" 텍스트
- 아이콘 라벨은 한국어 우선

### 5. 디자인 토큰 사용
- **`tokens.json`의 Variables만 사용**
- hex 값 직접 입력 금지 (`#2D5BFF` ❌)
- 토큰 참조 형식 사용 (`var(--color-primary-500)` ✅)
- spacing은 4px 기반 토큰만 (`--space-4`, `--space-8`...)

### 6. 시각적 절제
- 그라데이션 사용 금지 (단일 색상만)
- 그림자는 elevation-1 까지만 (3단계 이상 X)
- 블러 효과 금지
- 장식적 일러스트레이션 금지
- 애니메이션은 200ms 이하 기능적 피드백만

**예외 (명시적으로 허용)**
1. 무한 진행 표시 (Indeterminate Progress)
   - 적용 컴포넌트: `LoadingSpinner` (1s 회전, 무한 반복)
   - 조건: 종료 시점이 불명확한 비동기 작업의 대기 표시
2. 상태 전환 피드백
   - 200ms 이내의 색상/위치 전환은 룰 적용 대상 (예외 아님)

### 7. 컴포넌트 사용
- `Primitives.jsx`, `Patterns.jsx`, `Layouts.jsx`의 컴포넌트만 사용
- 새 컴포넌트 임의 생성 **금지**
  - 필요 시 작업 중단하고 사용자에게 보고
- 컴포넌트 인라인 수정 금지 (props로만 변형)

### 8. 적용 범위

**Hard Rules 적용 대상**
- 모바일 프레임 내부 UI (사용자가 실제 보는 화면)
- 즉, 375 × 812 프레임 안쪽의 모든 시각/인터랙션 요소

**Hard Rules 적용 예외 (chrome)**
- 검수용 사이드 패널, 시나리오 트리거 버튼
- 디버그 정보 표시 영역 (URL 파라미터 안내, 상태 dump 등)
- `/screens/index.html`의 화면 목록 인터페이스
- 단, chrome은 모바일 프레임 영역과 시각적으로 **명확히 분리**되어야 함
  - 배경색 분리 / 외곽선 / 별도 컬럼 등으로 사용자 시점 UI와 혼동되지 않게 처리
  - chrome이 모바일 프레임 안쪽에 겹쳐 보이거나 동일 스타일을 차용하면 안 됨

---

## 📐 Layout Standards

### 기본 모바일 프레임
- 너비: 375px (디자인 기준)
- 최소 너비: 320px
- 최대 너비: 480px
- 안전 영역: 상단 44px, 하단 34px (iOS 기준)

### 화면 구조
모든 화면은 다음 3분할을 따른다.
┌─────────────────────────┐
│ Header (60~80px)        │ ← 화면 제목, 뒤로가기, 상태
├─────────────────────────┤
│                         │
│ Content (스크롤 영역)   │ ← 실제 작업 콘텐츠
│                         │
├─────────────────────────┤
│ Footer Action (80px)    │ ← Primary Action 1개
└─────────────────────────┘



### 여백 규칙
- 화면 좌우 패딩: 16px (권장) ~ 20px
- 섹션 간 간격: 24px
- 그룹 내 요소 간격: 12px
- 텍스트 라인 간격: 4~8px

---

## 🎨 Component Usage Rules

### Button
```jsx
// ✅ 올바른 사용
<Button variant="primary" size="lg" fullWidth>
  완료 보고
</Button>

// ❌ 잘못된 사용
<Button style={{ background: '#2D5BFF' }}>완료</Button>  // 인라인 스타일
<Button>✓</Button>                                       // 텍스트 없음
<Button size="sm">완료</Button>                          // 작은 사이즈 (현장 부적합)
```

### Input
- 모든 Input은 Label 동반 필수
- HelperText 또는 ErrorText로 상태 안내
- 최소 높이 56px

### Card / List Item
- 한 카드에 정보 5개 이하
- 탭 가능한 카드는 우측에 chevron 또는 "보기" 텍스트 명시
- 카드 내부 패딩 16px

### Status Badge
- 색상 + 아이콘 + 텍스트 3중 표현 (색맹 대응)
- 상태 종류: 대기 / 진행중 / 완료 / 문제발생
- 폰트 14px (§1 예외 적용)

### Modal
- 파괴적 액션(삭제/취소) 또는 중요 정보 확인 시 사용
- variant: `info` / `error` / `confirm`
- 사용 예: `<Modal variant="confirm" title="설치를 취소할까요?" onConfirm={...} onCancel={...}>...</Modal>`
- ❌ 사용 금지:
  - 단순 알림용 (→ Toast 사용)
  - 정보 입력용 (→ BottomSheet 사용)

### InlineBanner
- 화면 내 비차단(non-blocking) 안내/경고 표시
- tone: `info` / `warning` / `neutral`
- 사용 예: `<InlineBanner tone="warning">통신 불안정 — 전송이 지연될 수 있습니다</InlineBanner>`
- 보조 텍스트는 §1 예외 적용 (14px 허용)
- ❌ 사용 금지:
  - 사용자 액션 차단이 필요한 경우 (→ Modal 사용)

### LoadingSpinner
- 종료 시점이 불명확한 비동기 작업의 대기 표시 (§6 예외 1번)
- size: `sm` / `md` / `lg` (1s 무한 회전)
- 사용 예: `<LoadingSpinner size="md" label="진단 결과 가져오는 중..." />`
- 라벨 동반 필수 (§4 아이콘 단독 금지 원칙 준수)
- ❌ 사용 금지:
  - 진행률을 알 수 있는 작업 (→ ProgressBar 추후 추가 예정)

### PhotoSlot / PhotoSlotAdd
- 현장 사진 촬영 슬롯 (2×3 그리드 기준)
- `cameraOnly` prop: 갤러리 선택 차단, 카메라만 허용
- 슬롯 번호 14px 허용 (§1 예외 적용)
- 사용 예: `<PhotoSlot index={1} src={photo1} onCapture={...} cameraOnly />`
- 빈 슬롯에는 `<PhotoSlotAdd onAdd={...} />` 사용
- ❌ 사용 금지:
  - 갤러리에서 기존 사진 선택만 필요한 경우 (→ FilePicker 추후 추가 예정)
  - 6개 초과 사진 필요 시 (→ 화면 분할 검토)

### RadioOption
- 단일 선택지 1개 항목 (RadioGroup 내부에서 사용)
- description 14px 허용 (§1 예외 적용)
- 단독 사용 금지 — 반드시 RadioGroup으로 감쌀 것
- 사용 예: `<RadioOption value="ok" label="정상" description="모든 항목 통과" />`
- ❌ 사용 금지:
  - RadioGroup 외부 단독 배치
  - 다중 선택 (→ Checkbox 추후 추가 예정)

### RadioGroup
- 2~5개 선택지 중 단일 선택
- 선택지 6개 이상이면 별도 화면(List/Selector) 패턴 검토
- 사용 예: `<RadioGroup name="result" value={v} onChange={setV}>{...RadioOption...}</RadioGroup>`
- ❌ 사용 금지:
  - yes/no만 선택 (→ Toggle 또는 Modal 사용)

---

## 📁 File Output Rules

### 파일 위치
/screens/{kebab-case-name}.html         ← 화면 결과물
/screens/{kebab-case-name}.notes.md     ← 화면별 디자인 노트 (선택)


### HTML 파일 구조
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{화면명} - Connect Installer</title>
  <link rel="stylesheet" href="../colors_and_type.css">
  <!-- 추가 컴포넌트 스타일 -->
</head>
<body>
  <!-- MobileScreen 컴포넌트로 감쌀 것 -->
  <div class="mobile-screen">
    <!-- Header -->
    <!-- Content -->
    <!-- Footer Action -->
  </div>
</body>
</html>
```

### 더미 데이터 규칙
한국 인스톨러 시나리오를 반영한다.

- **고객명**: 김철수, 이영희, 박민준 등 흔한 한국 이름
- **주소**: 실제 동 단위까지 ("서울시 강남구 테헤란로 123, 4층")
- **제품 모델**: 실제처럼 ("LG 시네빔 PJ-X300", "삼성 비스포크 RF85B9131AP")
- **연락처**: 010-XXXX-XXXX 형식
- **작업 일시**: YYYY-MM-DD HH:mm 형식
- **금액**: 한국 원화 (₩125,000 형식)

영어 더미 데이터(John Doe, Lorem ipsum) 사용 금지.

---

## ✅ Self-Verification (화면 생성 후 필수)

화면을 생성한 후 다음 체크리스트를 자체 검증하고 결과를 출력한다.

```markdown
## 🔍 검증 리포트

### 가독성
- [ ] 본문 16px 이상
- [ ] 화면 제목 24px 이상
- [ ] 텍스트 대비 WCAG AA 충족

### 터치 영역
- [ ] 모든 버튼/탭 56px 이상
- [ ] 터치 요소 간 간격 8px 이상

### 액션 구조
- [ ] Primary Action 1개만 존재
- [ ] 파괴적 액션에 확인 단계 있음

### 아이콘
- [ ] 모든 아이콘에 텍스트 라벨 동반
- [ ] 추상 아이콘 사용 없음

### 디자인 토큰
- [ ] tokens.json 변수만 사용
- [ ] hex 직접 입력 0건
- [ ] 4px 기반 spacing만 사용

### 컴포넌트
- [ ] Primitives/Patterns/Layouts 외 임의 컴포넌트 없음
- [ ] 인라인 스타일 0건

### 더미 데이터
- [ ] 한국 인스톨러 시나리오 반영
- [ ] Lorem ipsum 또는 영어 더미 0건

## 사용 컴포넌트 목록
- Layouts: MobileScreen
- Patterns: TaskCard × 3, ChecklistItem × 5
- Primitives: Button × 1, Badge × 3

## ⚠️ 발견된 이슈
(없음 / 또는 자동 수정한 항목 명시)
```

---

## 🔄 Workflow

### PRD를 받았을 때
1. PRD 전체를 읽고 누락된 정보 파악
2. 부족한 정보가 있으면 작업 시작 전에 질문
   - 예: "이 화면에서 사용자가 가장 자주 하는 액션이 무엇인가요?"
3. 사용할 컴포넌트 목록을 먼저 출력 (계획 단계)
4. 사용자 확인 후 HTML 생성
5. 생성 후 Self-Verification 리포트 출력

### 모호한 요구사항 처리
- "예쁘게", "심플하게" 같은 모호한 표현은 이 SKILL.md의 원칙으로 해석
- 페르소나(40~50대 현장직)에 부합하지 않는 트렌디한 디자인 요청은 거부하고 대안 제시

### 화면 간 일관성
- 이미 생성된 다른 화면이 `/screens/`에 있다면 먼저 확인
- 동일 패턴(예: 작업 카드)은 화면마다 다르게 만들지 말 것
- 새 패턴이 필요하면 `Patterns.jsx`에 컴포넌트로 추가 후 사용

---

## 🎬 First Action on PRD Input

PRD를 받으면 다음 형식으로 첫 응답을 시작한다.

```markdown
## PRD 분석

**화면명**: {화면명}
**핵심 사용자 액션**: {액션}
**예상 사용 시간**: {초}

## 사용 예정 컴포넌트
- Layouts: {목록}
- Patterns: {목록}
- Primitives: {목록}

## 신규 추가 필요 (있다면)
- {컴포넌트명}: {용도와 이유}

## 누락 정보 (있다면)
1. {질문}
2. {질문}

위 계획대로 진행할까요? (yes / 수정사항)
```

사용자 확인 후 화면 생성에 들어간다.

---

## 📝 Version History

- v1.0 (2026-04-27): 초안 작성, Hard Rules 7개 정의