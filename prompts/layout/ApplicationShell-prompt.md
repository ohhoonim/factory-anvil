# ApplicationShell Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/ApplicationShell/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - ApplicationShell.ts (코어 Lit 템플릿)
   - ApplicationShell.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - ApplicationShell.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - ApplicationShell.react.ts (@lit/react 기반 React 래퍼)
   - ApplicationShell.stories.ts (Storybook 문서 및 a11y 검증)
   - ApplicationShell.test.ts (Vitest 및 Playwright 테스트)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-application-shell`
   - CSS Design Token / Custom Properties: `--biz-application-shell-*`
   - 루트 CSS 클래스명: `biz-application-shell`
   - Lit 코어 템플릿 export 명칭: `ApplicationShellTemplate`
   - Lit 스타일 export 변수명: `export const applicationShellStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): ApplicationShell
- 커스텀 엘리먼트 태그명 (kebab-case): biz-application-shell
- Lit 스타일 변수명 (camelCase): applicationShellStyles

[요구사항 정의서]
---
# ApplicationShell 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- 웹 애플리케이션의 최상위 구획인 Header, Sidebar, Content, Footer 영역을 관리하는 레이아웃 컴포넌트를 제공한다.

### 1.2. 형태 옵션 (Variants)

- `default`: Header, Sidebar, Content, Footer가 모두 노출되는 기본 애플리케이션 레이아웃
- `full-width`: Sidebar 없이 Header, Content, Footer만 넓게 배치되는 단일 컬럼 레이아웃
- `minimal`: Header/Footer 없이 Main Content 영역 중심의 단순화 레이아웃 (로그인/에러 페이지 등)

### 1.3. 크기 및 규격 옵션 (Sizes)

- `sidebar-width`: Sidebar 영역의 가로 너비 설정 (`collapsed` / `expanded`)
- `header-height`: Header 영역의 고정 높이 설정

### 1.4. 레이아웃 제어 (Layout Properties)

- `sticky-header`: Header 영역 상단 고정 여부 (boolean)
- `fixed-sidebar`: Sidebar 영역 좌측 고정 여부 및 내부 스크롤 적용 여부 (boolean)
- `collapsible-sidebar`: Sidebar 영역 축소/확장 가능 여부 (boolean)

---

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- Shadow DOM 내부 각 구획으로 HTML 엘리먼트를 주입받는 영역(`<slot>`)을 정의한다.

|   |   |   |
|---|---|---|
|**슬롯명 (Slot Name)**|**설명 (Description)**|**비고 (Remarks)**|
|`header-slot`|상단 네비게이션 및 헤더 영역 주입|`<header>` 태그 연동|
|`sidebar-slot`|좌측 네비게이션 메뉴 영역 주입|`<aside>` 태그 연동|
|`content-slot`|메인 콘텐츠 영역 주입 (필수)|`<main>` 태그 연동|
|`footer-slot`|하단 푸터 영역 주입|`<footer>` 태그 연동|

---

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

|   |   |   |   |
|---|---|---|---|
|**속성명**|**타입**|**기본값**|**설명**|
|`variant`|`string`|`'default'`|레이아웃 형태 (`default`, `full-width`, `minimal`)|
|`sidebar-collapsed`|`boolean`|`false`|사이드바 축소 상태 여부|
|`sticky-header`|`boolean`|`true`|헤더 상단 고정 여부|
|`fixed-sidebar`|`boolean`|`true`|사이드바 고정 여부|

### 3.2. 상태 (States)

- **Sidebar Expanded**: 사이드바 펼침 상태 (기본 가로 너비 유지)
- **Sidebar Collapsed**: 사이드바 접힘 상태 (아이콘 전용 너비로 축소)
- **Mobile Drawer Open / Closed**: 모바일/소형 화면에서의 오버레이 사이드바 열림/닫힘 상태

### 3.3. 이벤트 (Events)

|   |   |   |
|---|---|---|
|**이벤트명**|**상세 (Detail)**|**발생 시점**|
|`sidebar-toggle`|`{ collapsed: boolean }`|사이드바 토글 버튼 클릭 또는 속성 변경 시 방출|
|`breakpoint-change`|`{ breakpoint: string }`|화면 크기 변경으로 인한 반응형 임계점 도달 시 방출|

---

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 애플리케이션의 최상위 구획 및 테마를 제어하기 위한 CSS Custom Properties를 정의한다.

```css
:host {
  /* Layout Dimensions */
  --ui-app-shell-header-height: 64px;
  --ui-app-shell-footer-height: 48px;
  --ui-app-shell-sidebar-width: 256px;
  --ui-app-shell-sidebar-collapsed-width: 64px;

  /* Colors */
  --ui-app-shell-bg-color: #f9fafb;
  --ui-app-shell-header-bg: #ffffff;
  --ui-app-shell-sidebar-bg: #1f2937;
  --ui-app-shell-footer-bg: #ffffff;
  --ui-app-shell-border-color: #e5e7eb;

  /* Z-Index Structure */
  --ui-app-shell-header-z-index: 100;
  --ui-app-shell-sidebar-z-index: 90;
  --ui-app-shell-overlay-z-index: 200;
}
```

---

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="banner"`**: `header-slot` 구획에 연동
- **`role="navigation"`**: `sidebar-slot` 구획에 연동
- **`role="main"`**: `content-slot` 구획에 연동
- **`role="contentinfo"`**: `footer-slot` 구획에 연동
- **`aria-expanded`**: `sidebar-collapsed` 속성 상태에 맞춰 토글 버튼 및 사이드바에 연동

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Skip Link` 지원**: 키보드 접근 사용자가 네비게이션을 건너뛰고 메인 콘텐츠 (`role="main"`)로 바로 이동할 수 있는 건너뛰기 링크 인터랙션 제공
- **`Escape`**: 모바일 오버레이 사이드바 모드에서 사이드바 닫기

### 5.3. 스크린 리더 대응

- 각 시맨틱 구획 태그 (`<header>`, `<aside>`, `<main>`, `<footer>`)를 Shadow DOM 내부 고유 구획으로 명확히 할당하여 스크린 리더 탐색성을 확보한다.
---

위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`ApplicationShell.ts`)과 전용 Lit 스타일시트(`ApplicationShell.css.ts`) 코드를 작성해 주세요.

[작성 조건 - ApplicationShell.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `ApplicationShellTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.

[작성 조건 - ApplicationShell.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const applicationShellStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-application-shell-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-application-shell`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/ApplicationShell/ApplicationShell.ts`, `src/components/ApplicationShell/ApplicationShell.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`ApplicationShell.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - ApplicationShell.wc.ts]
1. `LitElement`를 상속받아 클래스를 구현하고, `@customElement('biz-application-shell')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `ApplicationShellTemplate` 및 `ApplicationShell.css.ts`의 `applicationShellStyles`를 임포트하세요.
3. 정적 클래스 속성으로 `static styles = applicationShellStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `ApplicationShellTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/ApplicationShell/ApplicationShell.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`ApplicationShell.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - ApplicationShell.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `ApplicationShellWc` 클래스와 커스텀 엘리먼트 태그명(`biz-application-shell`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/ApplicationShell/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`ApplicationShellTemplate`), 스타일(`applicationShellStyles`), 웹 컴포넌트 클래스(`ApplicationShellWc`), React 래퍼 컴포넌트(`ApplicationShell`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/ApplicationShell/ApplicationShell.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/ApplicationShell/ApplicationShell.react.ts`, `src/components/ApplicationShell/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 및 테스트 코드 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 및 테스트 코드 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`ApplicationShell.stories.ts`)과 단위/통합 테스트 파일(`ApplicationShell.test.ts`) 코드를 작성해 주세요.

[작성 조건 - ApplicationShell.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
3. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
4. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.

[작성 조건 - ApplicationShell.test.ts]
1. Vitest 및 Playwright 환경에서 실행 가능한 테스트 스위트를 구현하세요.
2. [단위 테스트]: Properties 변경에 따른 DOM 반영, 3.3절 커스텀 이벤트(`input`, `change`, `clear` 등) 방출 여부 및 `detail` 데이터 검증을 수행하세요.
3. [통합 및 접근성 테스트]: 5.1절 ARIA 속성(`aria-invalid`, `aria-describedby` 등) 바인딩 및 5.2절 키보드 네비게이션(`Tab`, `Escape`, `Enter` 등) 동작을 브라우저 상에서 검증하는 시나리오를 구현하세요.

[출력 형식]
- 각 파일별 경로(`src/components/ApplicationShell/ApplicationShell.stories.ts`, `src/components/ApplicationShell/ApplicationShell.test.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
