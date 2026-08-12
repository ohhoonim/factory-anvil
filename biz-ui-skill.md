## Biz-UI 웹 컴포넌트 개발 공정

### Phase 1. 요구사항 정의 및 표준 검토

- 1-1. 태그 명명 규칙 명시: 커스텀 엘리먼트 태그명을 `biz-component-name` 규격으로 확정합니다.
- 1-2. 디자인 토큰 네임스페이스 정의: CSS Custom Properties 네임스페이스를 `-biz-component-name-*` (예: `-biz-input-height-md`) 규칙으로 정의합니다.
- 1-3. React 이벤트 매핑 명세 정의: 커스텀 이벤트와 React 전용 Prop 명칭(예: `clear` -> `onClear`)을 사전 정의합니다.

### Phase 2. 사전 환경 및 구조 정의

- `src/components/ComponentName/` 경로에 디렉터리를 생성하고 아래 표준 7종 파일을 구성합니다:
    - `ComponentName.ts` (코어 템플릿)
    - `ComponentName.css.ts` (전용 스타일)
    - `ComponentName.wc.ts` (웹 컴포넌트 등록)
    - `ComponentName.react.ts` (React 래퍼)
    - `ComponentName.stories.ts` (Storybook 및 접근성)
    - `ComponentName.test.ts` (단위/통합 테스트)
    - `index.ts` (모듈 내보내기)

### Phase 3. 컴포넌트 코어 및 로직 개발

- 1단계: 코어 템플릿 구현 (`ComponentName.ts`)
    - Lit 기반 순수 함수 템플릿을 구현하고 외부 노출명은 `ComponentNameTemplate`으로 지정합니다.
    - 정의서의 슬롯(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등) 구조를 구현합니다.
- 2단계: 웹 컴포넌트 등록 (`ComponentName.wc.ts`)
    - `LitElement`를 상속하여 클래스를 정의하고 `biz-component-name` 태그명으로 커스텀 엘리먼트를 등록합니다.
    - Props, State, ARIA 속성(`aria-invalid`, `aria-describedby` 등) 및 커스텀 이벤트를 바인딩합니다.
- 스타일링 적용 (`ComponentName.css`)
    - 루트 클래스명 `biz-component-name` 적용 및 `-biz-component-name-*` 스타일 토큰을 바인딩합니다.

### Phase 4. 프레임워크 바인딩 및 모듈 노출

- 3단계: React 래퍼 제작 (`ComponentName.react.ts`)
    - `@lit/react`의 `createComponent`를 활용해 React 컴포넌트를 구성합니다.
    - 사전 정의된 React 이벤트 Prop 명칭(예: `onInput`, `onChange`, `onClear`)과 웹 컴포넌트 이벤트를 1:1 매핑합니다.
- 4단계: 모듈 내보내기 설정 (`index.ts` & `src/react.ts`)
    - `src/components/ComponentName/index.ts`에서 컴포넌트, 래퍼, 관련 타입을 내보냅니다.
    - `src/react.ts` 통합 진입점에 신규 생성된 React 래퍼를 내보내도록 추가합니다.

### Phase 5. 검증 및 품질 관리 (QA)

- Storybook 문서화 및 접근성 검증 (`ComponentName.stories.ts`)
    - Variants(`Outlined`, `Filled`, `Standard`), Sizes, States별 시연 환경을 구축합니다.
    - `@storybook/addon-a11y`를 실행하여 ARIA 및 키보드 네비게이션 접근성을 검증합니다.
- 단위 및 통합 테스트 (`ComponentName.test.ts`)
    - Vitest를 사용하여 비즈니스 로직 및 이벤트 방출을 검증합니다.
    - Playwright를 사용하여 브라우저 환경 통합 테스트 및 키보드 인터랙션을 검증합니다.
