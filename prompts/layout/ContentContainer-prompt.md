# ContentContainer Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/ContentContainer/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - ContentContainer.ts (코어 Lit 템플릿)
   - ContentContainer.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - ContentContainer.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - ContentContainer.react.ts (@lit/react 기반 React 래퍼)
   - ContentContainer.stories.ts (Storybook 문서 및 a11y 검증)
   - ContentContainer.test.ts (Vitest 및 Playwright 테스트)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-content-container`
   - CSS Design Token / Custom Properties: `--biz-content-container-*`
   - 루트 CSS 클래스명: `biz-content-container`
   - Lit 코어 템플릿 export 명칭: `ContentContainerTemplate`
   - Lit 스타일 export 변수명: `export const contentContainerStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): ContentContainer
- 커스텀 엘리먼트 태그명 (kebab-case): biz-content-container
- Lit 스타일 변수명 (camelCase): contentContainerStyles

[요구사항 정의서]
---
# ContentContainer 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- Application Shell 내에서 실제 업무 화면(페이지) 콘텐츠를 감싸는 메인 영역을 정의합니다.
- 콘텐츠 스크롤 및 중앙 정렬, 최대 너비(Max-width) 제한 등의 레이아웃을 제어합니다.

### 1.2. 형태 옵션 (Variants)

- `Standard`: 여백 및 최대 너비가 제한된 표준 업무 화면 스타일
- `Fluid`: 최대 너비 제한 없이 부모 영역을 전체 사용하는 스타일
- `Card`: 독립된 배경 영역 및 그림자 효과가 적용된 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large` / `Full`

### 1.4. 레이아웃 제어 (Layout Properties)

- `centered`: 콘텐츠 중앙 정렬 여부
- `scrollable`: 컨테이너 내부 자체 스크롤 적용 여부
- `padding`: 내부 패딩 활성화 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**         | **비고 (Remarks)** |
| ------------------- | ---------------------------- | ---------------- |
| `default`           | 실제 업무 화면 콘텐츠 주입 영역           |                  |
| `header-slot`       | 컨테이너 상단 고정 영역 (PageHeader 등) |                  |
| `footer-slot`       | 컨테이너 하단 고정 영역                |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**      | **타입**    | **기본값**      | **설명**                                        |
| ------------ | --------- | ------------ | --------------------------------------------- |
| `variant`    | `string`  | `'standard'` | 형태 옵션 (`standard`, `fluid`, `card`)           |
| `size`       | `string`  | `'medium'`   | 최대 너비 옵션 (`small`, `medium`, `large`, `full`) |
| `centered`   | `boolean` | `false`      | 중앙 정렬 여부                                      |
| `scrollable` | `boolean` | `false`      | 자체 스크롤 영역 사용 여부                               |
| `padding`    | `boolean` | `true`       | 기본 패딩 적용 여부                                   |

### 3.2. 상태 (States)

- **Normal**: 기본 콘텐츠 표시 상태
- **Loading**: 비동기 페이지 로딩 중 스피너 또는 스켈레톤 UI 표시
- **Empty**: 콘텐츠가 없을 경우 안내 영역 표시

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)**         | **발생 시점**                       |
| -------- | ----------------------- | ------------------------------- |
| `scroll` | `{ scrollTop: number }` | `scrollable` 속성 활성화 시 스크롤 발생 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-content-container-max-width-sm: 800px;
  --ui-content-container-max-width-md: 1200px;
  --ui-content-container-max-width-lg: 1600px;
  --ui-content-container-padding-x: 24px;
  --ui-content-container-padding-y: 24px;

  /* Colors */
  --ui-content-container-bg-color: #f9fafb;
  --ui-content-container-card-bg-color: #ffffff;
  --ui-content-container-border-color: #e5e7eb;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="main"`**: Application Shell 내 핵심 본문 컨테이너임을 명시
- **`aria-busy`**: `loading` 상태 활성화 시 `'true'` 연동

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 컨테이너 내부 첫 번째 포커스 가능 요소로 진입
- **`PageUp / PageDown / Arrows`**: `scrollable` 속성 사용 시 키보드를 통한 스크롤 제어 지원

### 5.3. 스크린 리더 대응

- landmark 역할을 수행하도록 `<main>` 키워드 기반 구조를 구성하여 페이지 탐색 시 본문 영역으로 바로 이동 가능하도록 지원
---

위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`ContentContainer.ts`)과 전용 Lit 스타일시트(`ContentContainer.css.ts`) 코드를 작성해 주세요.

[작성 조건 - ContentContainer.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `ContentContainerTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.

[작성 조건 - ContentContainer.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const contentContainerStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-content-container-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-content-container`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/ContentContainer/ContentContainer.ts`, `src/components/ContentContainer/ContentContainer.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`ContentContainer.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - ContentContainer.wc.ts]
1. `LitElement`를 상속받아 클래스를 구현하고, `@customElement('biz-content-container')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `ContentContainerTemplate` 및 `ContentContainer.css.ts`의 `contentContainerStyles`를 임포트하세요.
3. 정적 클래스 속성으로 `static styles = contentContainerStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `ContentContainerTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/ContentContainer/ContentContainer.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`ContentContainer.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - ContentContainer.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `ContentContainerWc` 클래스와 커스텀 엘리먼트 태그명(`biz-content-container`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/ContentContainer/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`ContentContainerTemplate`), 스타일(`contentContainerStyles`), 웹 컴포넌트 클래스(`ContentContainerWc`), React 래퍼 컴포넌트(`ContentContainer`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/ContentContainer/ContentContainer.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/ContentContainer/ContentContainer.react.ts`, `src/components/ContentContainer/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 및 테스트 코드 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 및 테스트 코드 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`ContentContainer.stories.ts`)과 단위/통합 테스트 파일(`ContentContainer.test.ts`) 코드를 작성해 주세요.

[작성 조건 - ContentContainer.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
3. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
4. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.

[작성 조건 - ContentContainer.test.ts]
1. Vitest 및 Playwright 환경에서 실행 가능한 테스트 스위트를 구현하세요.
2. [단위 테스트]: Properties 변경에 따른 DOM 반영, 3.3절 커스텀 이벤트(`input`, `change`, `clear` 등) 방출 여부 및 `detail` 데이터 검증을 수행하세요.
3. [통합 및 접근성 테스트]: 5.1절 ARIA 속성(`aria-invalid`, `aria-describedby` 등) 바인딩 및 5.2절 키보드 네비게이션(`Tab`, `Escape`, `Enter` 등) 동작을 브라우저 상에서 검증하는 시나리오를 구현하세요.

[출력 형식]
- 각 파일별 경로(`src/components/ContentContainer/ContentContainer.stories.ts`, `src/components/ContentContainer/ContentContainer.test.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
