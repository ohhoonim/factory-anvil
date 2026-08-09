# Biz-UI 컴포넌트 개발 가이드 (Skill)

Biz-UI 라이브러리 내 신규 컴포넌트 제작 및 프레임워크 래퍼 구성을 위한 표준 절차와 컨벤션을 정의합니다.


## 1. 컴포넌트 디렉터리 및 파일 구조 규칙

모든 UI 컴포넌트는 `src/components/ComponentName/` 경로에 배치되며 아래 구조를 엄격히 준수합니다.

```text
src/components/ComponentName/
├── ComponentName.ts         # 코어 템플릿 (Lit 기반 순수 함수 템플릿)
├── ComponentName.css        # 컴포넌트 전용 스타일시트
├── ComponentName.wc.ts      # LitElement 기반 커스텀 엘리먼트 등록
├── ComponentName.react.ts   # React 전용 래퍼 (@lit/react 사용)
├── ComponentName.stories.ts # Storybook 스토리 및 문서화
├── ComponentName.test.ts    # Vitest / Playwright 단위 및 통합 테스트
└── index.ts                 # 개별 컴포넌트 통합 내보내기

```

## 2. 컴포넌트 구현 단계별 가이드라인

### 1단계: 코어 템플릿 구현 (`ComponentName.ts`)

* UI 구조와 로직을 포함하는 순수 Lit 템플릿을 구현합니다.
* 파일 외부 제공 시 `ComponentNameTemplate` 명칭으로 내보냅니다.

### 2단계: 웹 컴포넌트 등록 (`ComponentName.wc.ts`)

* `LitElement`를 상속하여 웹 컴포넌트 클래스를 정의합니다.
* 커스텀 엘리먼트 태그명은 `biz-component-name` 패턴을 따릅니다.
* 코어 템플릿에 Props 및 이벤트를 전달하도록 바인딩합니다.

### 3단계: React 래퍼 제작 (`ComponentName.react.ts`)

* `@lit/react` 패키지의 `createComponent`를 활용합니다.
* 웹 컴포넌트를 React 컴포넌트로 래핑하고 적절한 Prop 타입 및 이벤트를 매핑합니다.

### 4단계: 모듈 내보내기 설정 (`index.ts` 및 통합 진입점)

* `src/components/ComponentName/index.ts`에 컴포넌트 및 관련 타입을 정의합니다.
* `src/react.ts`에 새로 생성한 React 래퍼를 내보내도록 추가합니다.

---

## 3. 스타일링 컨벤션

* CSS 파일은 컴포넌트와 동일 디렉터리에 위치시킵니다.
* 루트 클래스 및 주요 스타일 명명 시 `biz-component-name` 또는 `component-name` 패턴을 적용합니다.

---

## 4. 검증 및 품질 관리

* **Storybook 문서화**: `ComponentName.stories.ts`를 작성하여 다양한 상태(State)와 시연 환경을 제공하고 `@storybook/addon-a11y` 기반 접근성을 검증합니다.
* **Vitest & Playwright**: 단위 테스트 및 브라우저 통합 테스트를 수행합니다.

```

```