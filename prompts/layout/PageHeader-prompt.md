# PageHeader Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/PageHeader/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - PageHeader.ts (코어 Lit 템플릿)
   - PageHeader.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - PageHeader.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - PageHeader.react.ts (@lit/react 기반 React 래퍼)
   - PageHeader.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-page-header`
   - CSS Design Token / Custom Properties: `--biz-page-header-*`
   - 루트 CSS 클래스명: `biz-page-header`
   - Lit 코어 템플릿 export 명칭: `PageHeaderTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`PageHeaderHost` 
   - Lit 스타일 export 변수명: `export const pageHeaderStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): PageHeader
- 커스텀 엘리먼트 태그명 (kebab-case): biz-page-header
- Lit 스타일 변수명 (camelCase): pageHeaderStyles

[요구사항 정의서]
---
# PageHeader 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Breadcrumb`: 페이지 상위 이동 경로 표시 영역
- `Title & Subtitle`: 페이지 주 제목 및 부제목 영역
- `Meta Status`: 상태 태그/배지 등 상단 부가 정보 영역
- `Extra Actions`: 우측 상단 주요 작업 버튼 영역

### 1.2. 형태 옵션 (Variants)

- `Standard`: 기본 투명 배경 스타일
- `Filled`: 배경색 지정 카드 형태 스타일
- `Ghost`: 테두리 및 배경이 최소화된 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `compact`: 여백 축소 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)**  | **설명 (Description)** | **비고 (Remarks)** |
| -------------------- | -------------------- | ---------------- |
| `breadcrumb-slot`    | 상단 브레드크럼 위치          |                  |
| `title-slot`         | 메인 타이틀 영역            | 기본 텍스트 속성 대체 가능  |
| `subtitle-slot`      | 서브 타이틀 영역            |                  |
| `meta-status-slot`   | 타이틀 우측 메타 상태 표시 영역   | 배지, 태그 등         |
| `extra-actions-slot` | 우측 상단 액션 버튼 영역       | 버튼, 드롭다운 등       |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**      | **타입**    | **기본값**      | **설명**                                |
| ------------ | --------- | ------------ | ------------------------------------- |
| `title`      | `string`  | `''`         | 페이지 메인 타이틀                            |
| `subtitle`   | `string`  | `''`         | 페이지 서브 타이틀                            |
| `variant`    | `string`  | `'standard'` | 형태 옵션 (`standard`, `filled`, `ghost`) |
| `size`       | `string`  | `'medium'`   | 크기 옵션 (`small`, `medium`, `large`)    |
| `full-width` | `boolean` | `false`      | 너비 100% 확장 여부                         |
| `compact`    | `boolean` | `false`      | 컴팩트 레이아웃 여부                           |

### 3.2. 상태 (States)

- **Hover**: 액션 요소 오버 시 피드백
- **Focus / Focus-visible**: 키보드 접근 시 포커스 링 표시
- **Loading**: 스켈레톤 로딩 상태 표시

### 3.3. 이벤트 (Events)

| **이벤트명**       | **상세 (Detail)**        | **발생 시점**             |
| -------------- | ---------------------- | --------------------- |
| `action-click` | `{ actionId: string }` | Extra Actions 클릭 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-page-header-padding-x: 24px;
  --ui-page-header-padding-y: 16px;
  --ui-page-header-title-size-sm: 18px;
  --ui-page-header-title-size-md: 24px;
  --ui-page-header-title-size-lg: 30px;
  
  /* Colors */
  --ui-page-header-bg-color: #ffffff;
  --ui-page-header-border-color: #e5e7eb;
  --ui-page-header-title-color: #111827;
  --ui-page-header-subtitle-color: #6b7280;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="region"`**: 독립된 시각적 영역으로 식별되도록 설정
- **`aria-label`**: 컴포넌트 구분을 위해 "Page Header" 기본 바인딩

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: internal Breadcrumb 및 Extra Actions 슬롯 내부 포커스 가능 요소 순차 이동

### 5.3. 스크린 리더 대응

- 메인 타이틀은 `<h1>` 레벨 구조를 기본 유지하여 스크린 리더에서 가누기를 신속히 수행할 수 있도록 설정
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`PageHeader.ts`)과 전용 Lit 스타일시트(`PageHeader.css.ts`) 코드를 작성해 주세요.

[작성 조건 - PageHeader.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `PageHeaderTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `PageHeaderHost` 명칭으로 export 하세요.

[작성 조건 - PageHeader.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const pageHeaderStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-page-header-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-page-header`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/PageHeader/PageHeader.ts`, `src/components/PageHeader/PageHeader.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`PageHeader.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - PageHeader.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `PageHeaderHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-page-header')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `PageHeaderTemplate` 및 `PageHeader.css.ts`의 `pageHeaderStyles`를 임포트하세요. `PageHeaderHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = pageHeaderStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `PageHeaderTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/PageHeader/PageHeader.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`PageHeader.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - PageHeader.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `PageHeaderWc` 클래스와 커스텀 엘리먼트 태그명(`biz-page-header`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/PageHeader/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`PageHeaderTemplate`), 스타일(`pageHeaderStyles`), 웹 컴포넌트 클래스(`PageHeaderWc`), React 래퍼 컴포넌트(`PageHeader`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/PageHeader/PageHeader.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/PageHeader/PageHeader.react.ts`, `src/components/PageHeader/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 및 테스트 코드 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 코드 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`PageHeader.stories.ts`)과 단위/통합 테스트 파일(`PageHeader.test.ts`) 코드를 작성해 주세요.

[작성 조건 - PageHeader.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `PageHeaderHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.

[출력 형식]
- 파일 경로(`src/components/PageHeader/PageHeader.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
