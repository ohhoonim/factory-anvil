# DblToggleButton Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/DblToggleButton/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - DblToggleButton.ts (코어 Lit 템플릿)
   - DblToggleButton.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - DblToggleButton.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - DblToggleButton.react.ts (@lit/react 기반 React 래퍼)
   - DblToggleButton.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-dbl-toggle-button`
   - Lit 엘리먼트 클래스명: `BizDblToggleButton`
   - CSS Design Token / Custom Properties: `--biz-dbl-toggle-button-*`
   - 루트 CSS 클래스명: `biz-dbl-toggle-button`
   - Lit 코어 템플릿 export 명칭: `DblToggleButtonTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`DblToggleButtonHost` 
   - Lit 스타일 export 변수명: `export const dblToggleButtonStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizDblToggleButton
- 커스텀 엘리먼트 태그명 (kebab-case): biz-dbl-toggle-button
- Lit 스타일 변수명 (camelCase): dblToggleButtonStyles

[요구사항 정의서]
---
# [DblToggleButton] 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

* 사용자의 클릭/터치 상호작용을 통해 단일 토글을 넘어 두 가지 이상의 상호 배타적이거나 독립적인 2중(Dual) 상태 세그먼트 간의 전환을 수행하는 버튼의 기본 레이아웃 및 시각적 구획을 정의합니다.

### 1.2. 형태 옵션 (Variants)

* 컴포넌트의 시각적 형태 스타일 옵션을 정의합니다.
* `Contained`: 양쪽 세그먼트 영역이 채워진 배경색 중심의 스타일
* `Outlined`: 전체 테두리 중심 및 내부 세그먼트 구분선 스타일
* `Standard`: 하단 경계선 및 탭 형태 결합 스타일



### 1.3. 크기 옵션 (Sizes)

* 컴포넌트의 높이, 내부 패딩, 폰트 크기 등을 제어하는 규격 옵션을 정의합니다.
* `Small` / `Medium` / `Large`



### 1.4. 레이아웃 제어 (Layout Properties)

* `full-width`: 부모 요소 너비 100% 확장 여부

---

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

* Shadow DOM 내부로 HTML 엘리먼트를 주입받는 영역(`<slot>`)을 정의합니다.

| 슬롯명 (Slot Name) | 설명 (Description) | 비고 (Remarks) |
| --- | --- | --- |
| `left-icon-slot` | 좌측 세그먼트 아이콘 주입 영역 |  |
| `left-label-slot` | 좌측 세그먼트 텍스트 레이블 영역 |  |
| `right-icon-slot` | 우측 세그먼트 아이콘 주입 영역 |  |
| `right-label-slot` | 우측 세그먼트 텍스트 레이블 영역 |  |

---

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| 속성명 | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `value` | `string` | `''` | 현재 선택된 듀얼 토글 값 (좌/우 세그먼트 중 매핑된 값) |
| `left-value` | `string` | `'left'` | 좌측 세그먼트 고유 값 |
| `right-value` | `string` | `'right'` | 우측 세그먼트 고유 값 |
| `disabled` | `boolean` | `false` | 전체 컴포넌트 비활성화 여부 |
| `readonly` | `boolean` | `false` | 읽기 전용 여부 |

### 3.2. 상태 (States)

* **Hover**: 각 세그먼트 마우스 오버 시 시각적 피드백
* **Focus / Focus-visible**: 포커스 진입 및 키보드 포커스 링 표시
* **Active / Pressed**: 클릭/터치 시 반응 상태
* **Selected (Left/Right)**: 좌측 또는 우측 세그먼트가 선택된 활성 상태
* **Disabled**: 비활성화 (인터랙션 불가, 시각적 Dim)

### 3.3. 이벤트 (Events)

| 이벤트명 | 상세 (Detail) | 발생 시점 |
| --- | --- | --- |
| `change` | `{ value: string, side: 'left' | 'right' }` |
| `focus` | `FocusEvent` | 컴포넌트 포커스 진입 시 방출 |
| `blur` | `FocusEvent` | 컴포넌트 포커스 해제 시 방출 |

---

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

* 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`--ui-comp-*`)를 준수합니다.

```css
:host {
  /* Layout & Sizing */
  --ui-dbl-toggle-height-sm: 32px;
  --ui-dbl-toggle-height-md: 40px;
  --ui-dbl-toggle-height-lg: 48px;
  --ui-dbl-toggle-padding-x: 16px;
  --ui-dbl-toggle-border-radius: 6px;

  /* Colors - Base (Container & Inactive Segments) */
  --ui-dbl-toggle-bg-color: #f3f4f6;
  --ui-dbl-toggle-border-color: #d1d5db;
  --ui-dbl-toggle-text-color: #4b5563;

  /* Colors - Active Segment State */
  --ui-dbl-toggle-active-bg-color: #ffffff;
  --ui-dbl-toggle-active-text-color: #111827;
  --ui-dbl-toggle-active-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  /* Colors - Interactive & Disabled */
  --ui-dbl-toggle-hover-text-color: #111827;
  --ui-dbl-toggle-focus-ring-color: rgba(37, 99, 235, 0.2);
  --ui-dbl-toggle-disabled-bg-color: #f9fafb;
  --ui-dbl-toggle-disabled-text-color: #9ca3af;
}

```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

* **`role`**: `radiogroup` 또는 동등한 토글 그룹 역할을 부여하여 상호 배타적 선택 구조 명시
* **`aria-pressed` / `aria-checked**`: 각 세그먼트별 현재 선택 상태(`true` / `false`)를 스크린 리더에 전달
* **`aria-disabled`**: `disabled` 상태 시 연동

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

* **`Tab`**: 컴포넌트 전체 영역으로 포커스 진입 순서 준수
* **`Arrow Left` / `Arrow Right**`: 좌/우 세그먼트 간 포커스 이동 및 선택 상태 즉시 전환
* **`Space` / `Enter**`: 현재 포커스된 세그먼트 선택 활성화

### 5.3. 스크린 리더 대응

* Shadow DOM 내부에서 사용자가 현재 어느 세그먼트(좌/우)를 선택했는지 상태 변화(`aria-checked` 또는 `aria-pressed`)를 실시간으로 음성 안내하도록 동기화합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`DblToggleButton.ts`)과 전용 Lit 스타일시트(`DblToggleButton.css.ts`) 코드를 작성해 주세요.

[작성 조건 - DblToggleButton.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `DblToggleButtonTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `DblToggleButtonHost` 명칭으로 export 하세요.

[작성 조건 - DblToggleButton.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const dblToggleButtonStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-dbl-toggle-button-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-dbl-toggle-button`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/DblToggleButton/DblToggleButton.ts`, `src/components/DblToggleButton/DblToggleButton.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`DblToggleButton.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - DblToggleButton.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `DblToggleButtonHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-dbl-toggle-button')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `DblToggleButtonTemplate` 및 `DblToggleButton.css.ts`의 `dblToggleButtonStyles`를 임포트하세요. `DblToggleButtonHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = dblToggleButtonStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `DblToggleButtonTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/DblToggleButton/DblToggleButton.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`DblToggleButton.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - DblToggleButton.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `DblToggleButtonWc` 클래스와 커스텀 엘리먼트 태그명(`biz-dbl-toggle-button`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/DblToggleButton/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`DblToggleButtonTemplate`), 스타일(`dblToggleButtonStyles`), 웹 컴포넌트 클래스(`DblToggleButtonWc`), React 래퍼 컴포넌트(`DblToggleButton`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/DblToggleButton/DblToggleButton.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/DblToggleButton/DblToggleButton.react.ts`, `src/components/DblToggleButton/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`DblToggleButton.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - DblToggleButton.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `DblToggleButtonHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 DblToggleButton.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/DblToggleButton/DblToggleButton.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
