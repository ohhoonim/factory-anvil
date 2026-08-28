# Toast Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/Toast/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - Toast.ts (코어 Lit 템플릿)
   - Toast.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - Toast.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - Toast.react.ts (@lit/react 기반 React 래퍼)
   - Toast.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-toast`
   - Lit 엘리먼트 클래스명: `BizToast`
   - CSS Design Token / Custom Properties: `--biz-toast-*`
   - 루트 CSS 클래스명: `biz-toast`
   - Lit 코어 템플릿 export 명칭: `ToastTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`ToastHost` 
   - Lit 스타일 export 변수명: `export const toastStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizToast
- 커스텀 엘리먼트 태그명 (kebab-case): biz-toast
- Lit 스타일 변수명 (camelCase): toastStyles

[요구사항 정의서]
---
# [Toast] 요구사항 정의서

토스트(Toast)는 사용자의 현재 과업을 방해하지 않으면서 시스템 상태 변경, 작업 결과, 또는 일시적 경고 메시지를 화면 구석에 짧게 띄웠다 지정된 시간 후 자동으로 사라지게 만드는 비침습적(Non-disruptive) 피드백 알림입니다.

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

* 상태 아이콘, 메시지 텍스트, 사용자 액션(버튼), 수동 닫기 버튼, 컨테이너로 구획을 구성합니다.

### 1.2. 형태 옵션 (Variants)

* `Success`: 성공 결과 피드백 (초록색 계열)
* `Info`: 일반 정보 및 상태 안내 (파란색 계열)
* `Warning`: 주의 요구 메시지 (주황색 계열)
* `Error`: 시스템 에러 및 실행 실패 알림 (빨간색 계열)

### 1.3. 크기 옵션 (Sizes)

* `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

* `stacked`: 복수 토스트 발생 시 상위 컨테이너 또는 스택 규칙에 따른 적재(Queue) 방식 적용

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)** | **비고 (Remarks)** |
| --- | --- | --- |
| `start-slot` | 최좌측 내부 주입 영역 (커스텀 상태 아이콘 등) | 기본 아이콘 대체 |
| `default` (Main Slot) | 메시지 본문 영역 | 단순 텍스트 또는 리치 텍스트 |
| `action-slot` | 메인 메시지 우측 액션 영역 (실행 취소 버튼 등) |  |
| `close-button-slot` | 수동 닫기 버튼 영역 |  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `message` | `string` | `''` | 토스트 표기 메시지 |
| `type` | `string` | `'info'` | 피드백 심버리티 타입 (`success`, `info`, `warning`, `error`) |
| `duration` | `number` | `4000` | 자동 종료 대기 시간 (ms 단위, `0` 지정 시 자동 중지 안 함) |
| `auto-dismiss` | `boolean` | `true` | 지정 시간 후 자동 사라짐 여부 |
| `dismissible` | `boolean` | `true` | 사용자의 수동 닫기 버튼 노출 여부 |

### 3.2. 상태 (States)

* **Entering**: 화면 외곽에서 슬라이드/페이드로 나타나는 상태
* **Showing**: 화면에 고정 노출된 상태
* **Hover / Paused**: 마우스 오버 시 타이머가 일시 정지된 상태
* **Exiting**: 지정 시간 만료 또는 수동 닫기로 사라지는 상태

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `toast-show` | `void` | 토스트가 화면에 노출을 시작할 때 방출 |
| `toast-close` | `{ reason: 'timeout' | 'user' | 'programmatic' }` | 토스트가 사라질 때 방출 |
| `action-click` | `{ originalEvent: Event }` | `action-slot` 내부 실행 버튼 클릭 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```css
:host {
  /* Layout & Sizing */
  --ui-toast-min-width: 300px;
  --ui-toast-max-width: 480px;
  --ui-toast-padding-x: 16px;
  --ui-toast-padding-y: 12px;
  --ui-toast-border-radius: 6px;

  /* Typography */
  --ui-toast-font-size: 14px;
  --ui-toast-line-height: 1.5;

  /* Elevation & Transition */
  --ui-toast-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --ui-toast-transition-duration: 300ms;

  /* Type Palette - Success */
  --ui-toast-success-bg: #f0fdf4;
  --ui-toast-success-border: #bbf7d0;
  --ui-toast-success-text: #166534;

  /* Type Palette - Error */
  --ui-toast-error-bg: #fef2f2;
  --ui-toast-error-border: #fecaca;
  --ui-toast-error-text: #991b1b;
}

```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

* **`role="status"`**: 일반 안내(`info`, `success`) 메시지에 바인딩하여 사용자의 현재 작업을 방해하지 않고 알림
* **`role="alert"`**: 즉각적 확인이 필요한 `error`, `warning` 메시지에 바인딩하여 즉시 음성 출력
* **`aria-live`**: `info`/`success`는 `'polite'`, `error`/`warning`은 `'assertive'`로 동적 연동
* **`aria-atomic="true"`**: 토스트 전체 구조를 한 번에 인지하도록 지정

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

* **`Focus Bypass`**: 토스트 자체는 기본 포커스 진입 흐름을 방해하지 않음
* **`Escape` / `Shortcut**`: 액션 버튼이 존재하는 토스트의 경우 단축키 진입 또는 `Escape` 키로 수동 닫기 제공

### 5.3. 스크린 리더 대응

* 스크린 리더 사용자가 메시지를 다 읽기 전에 자동 닫기(`duration`)가 작동하여 정보를 놓치지 않도록, 마우스 포커스나 스크린 리더 감지 시 일시 정지(Pause Timer) 메커니즘을 지원합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`Toast.ts`)과 전용 Lit 스타일시트(`Toast.css.ts`) 코드를 작성해 주세요.

[작성 조건 - Toast.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `ToastTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `ToastHost` 명칭으로 export 하세요.

[작성 조건 - Toast.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const toastStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-toast-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-toast`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/Toast/Toast.ts`, `src/components/Toast/Toast.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`Toast.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - Toast.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `ToastHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-toast')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `ToastTemplate` 및 `Toast.css.ts`의 `toastStyles`를 임포트하세요. `ToastHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = toastStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `ToastTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/Toast/Toast.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`Toast.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - Toast.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `ToastWc` 클래스와 커스텀 엘리먼트 태그명(`biz-toast`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/Toast/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`ToastTemplate`), 스타일(`toastStyles`), 웹 컴포넌트 클래스(`ToastWc`), React 래퍼 컴포넌트(`Toast`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/Toast/Toast.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/Toast/Toast.react.ts`, `src/components/Toast/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`Toast.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - Toast.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `ToastHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 Toast.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/Toast/Toast.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
