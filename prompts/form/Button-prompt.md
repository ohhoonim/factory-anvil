# Button Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/Button/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - Button.ts (코어 Lit 템플릿)
   - Button.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - Button.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - Button.react.ts (@lit/react 기반 React 래퍼)
   - Button.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-button`
   - CSS Design Token / Custom Properties: `--biz-button-*`
   - 루트 CSS 클래스명: `biz-button`
   - Lit 코어 템플릿 export 명칭: `ButtonTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`ButtonHost` 
   - Lit 스타일 export 변수명: `export const buttonStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): Button
- 커스텀 엘리먼트 태그명 (kebab-case): biz-button
- Lit 스타일 변수명 (camelCase): buttonStyles

[요구사항 정의서]
---
# Button 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

* 버튼 아이콘 및 텍스트 레이블을 담는 영역과 배경, 테두리로 구성됩니다.

### 1.2. 형태 옵션 (Variants)

* `Filled` (Primary): 배경색 중심의 기본/강조 스타일
* `Outlined`: 테두리 중심의 스타일
* `Text`: 배경과 테두리가 없는 텍스트 중심 스타일

### 1.3. 크기 옵션 (Sizes)

* `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

* `full-width`: 부모 요소 너비 100% 확장 여부

---

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| 슬롯명 (Slot Name) | 설명 (Description) | 비고 (Remarks) |
| --- | --- | --- |
| `default` | 버튼 내부 기본 콘텐츠 (텍스트/레이블) |  |
| `start-slot` | 버튼 내부 좌측 주입 영역 (Prefix 아이콘 등) | RTL 대응 고려 명명 |
| `end-slot` | 버튼 내부 우측 주입 영역 (Suffix 아이콘 등) |  |

---

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| 속성명 | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `variant` | `'filled' | 'outlined' | 'text'` | `'filled'` | 버튼 시각적 형태 옵션 |
| `size` | `'small' | 'medium' | 'large'` | `'medium'` | 버튼 크기 옵션 |
| `type` | `'button' | 'submit' | 'reset'` | `'button'` | 버튼의 기능적 동작 타입 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `loading` | `boolean` | `false` | 로딩 상태 여부 (스피너 노출 및 인터랙션 차단) |
| `full-width` | `boolean` | `false` | 너비 100% 확장 여부 |

### 3.2. 상태 (States)

* **Hover**: 마우스 오버 시 시각적 피드백
* **Focus / Focus-visible**: 포커스 진입 및 키보드 포커스 링 표시
* **Active / Pressed**: 클릭/터치 시 눌림 상태 반응
* **Disabled**: 비활성화 (인터랙션 불가, 시각적 Dim 처리 및 `cursor: not-allowed`)
* **Loading**: 비동기 처리 중 스피너 표시 및 클릭 이벤트 차단

### 3.3. 이벤트 (Events)

| 이벤트명 | 상세 (Detail) | 발생 시점 |
| --- | --- | --- |
| `click` | `MouseEvent` | 버튼 클릭 시 방출 (`disabled` 또는 `loading` 시 차단) |
| `focus` | `FocusEvent` | 포커스 진입 시 방출 |
| `blur` | `FocusEvent` | 포커스 해제 시 방출 |

---

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```css
:host {
  /* Layout & Sizing */
  --ui-button-height-sm: 32px;
  --ui-button-height-md: 40px;
  --ui-button-height-lg: 48px;
  --ui-button-padding-x-sm: 12px;
  --ui-button-padding-x-md: 16px;
  --ui-button-padding-x-lg: 20px;
  --ui-button-border-radius: 4px;
  --ui-button-font-size-sm: 12px;
  --ui-button-font-size-md: 14px;
  --ui-button-font-size-lg: 16px;

  /* Colors - Base (Filled Variant) */
  --ui-button-bg-color: #2563eb;
  --ui-button-text-color: #ffffff;
  --ui-button-border-color: transparent;

  /* Colors - Interactive States */
  --ui-button-hover-bg-color: #1d4ed8;
  --ui-button-active-bg-color: #1e40af;
  --ui-button-focus-ring-color: rgba(37, 99, 235, 0.4);

  /* Colors - Disabled & Loading */
  --ui-button-disabled-bg-color: #e5e7eb;
  --ui-button-disabled-text-color: #9ca3af;
  --ui-button-disabled-border-color: transparent;
}

```

---

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

* **`role="button"`**: 표준 `<button>` 요소 또는 Custom Element의 롤 명시
* **`aria-disabled`**: `disabled` 또는 `loading` 상태 시 `'true'`로 연동
* **`aria-busy`**: `loading` 속성 활성화 시 `'true'`로 연동하여 진행 중 상태 전달

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

* **`Tab`**: 포커스 이동 순서 준수 (키보드 포커스 진입 가능)
* **`Enter` / `Space**`: 버튼 클릭 동작 트리거 (`preventDefault`로 스크롤 방지 및 `click` 이벤트 발생)

### 5.3. 스크린 리더 대응

* 아이콘 전용 버튼(Icon-only Button)의 경우 `aria-label` 속성을 통해 목적을 명확히 전달하도록 구성을 권장합니다.
* `loading` 상태 시 내부에 로딩 상태임을 알리는 대치 텍스트를 제공하여 스크린 리더가 인지할 수 있도록 합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`Button.ts`)과 전용 Lit 스타일시트(`Button.css.ts`) 코드를 작성해 주세요.

[작성 조건 - Button.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `ButtonTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `ButtonHost` 명칭으로 export 하세요.

[작성 조건 - Button.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const buttonStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-button-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-button`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/Button/Button.ts`, `src/components/Button/Button.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`Button.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - Button.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `ButtonHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-button')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `ButtonTemplate` 및 `Button.css.ts`의 `buttonStyles`를 임포트하세요. `ButtonHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = buttonStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `ButtonTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/Button/Button.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`Button.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - Button.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `ButtonWc` 클래스와 커스텀 엘리먼트 태그명(`biz-button`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/Button/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`ButtonTemplate`), 스타일(`buttonStyles`), 웹 컴포넌트 클래스(`ButtonWc`), React 래퍼 컴포넌트(`Button`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/Button/Button.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/Button/Button.react.ts`, `src/components/Button/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 및 테스트 코드 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 및 테스트 코드 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`Button.stories.ts`)과 단위/통합 테스트 파일(`Button.test.ts`) 코드를 작성해 주세요.

[작성 조건 - Button.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
3. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
4. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.

[출력 형식]
- 파일 경로(`src/components/Button/Button.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
