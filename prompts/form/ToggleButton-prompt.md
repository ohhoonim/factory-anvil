# ToggleButton Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/ToggleButton/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - ToggleButton.ts (코어 Lit 템플릿)
   - ToggleButton.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - ToggleButton.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - ToggleButton.react.ts (@lit/react 기반 React 래퍼)
   - ToggleButton.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-toggle-button`
   - Lit 엘리먼트 클래스명: `BizToggleButton`
   - CSS Design Token / Custom Properties: `--biz-toggle-button-*`
   - 루트 CSS 클래스명: `biz-toggle-button`
   - Lit 코어 템플릿 export 명칭: `ToggleButtonTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`ToggleButtonHost` 
   - Lit 스타일 export 변수명: `export const toggleButtonStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizToggleButton
- 커스텀 엘리먼트 태그명 (kebab-case): biz-toggle-button
- Lit 스타일 변수명 (camelCase): toggleButtonStyles

[요구사항 정의서]
---
# [ToggleButton] 요구사항 정의서

토글 버튼(ToggleButton)은 클릭할 때마다 단일 옵션의 ON/OFF 상태를 전환(체크박스 특성)하거나, 상호 배타적인 옵션 그룹 내에서 하나를 선택(라디오버튼 특성)하는 시각적 눌림/활성화 상태를 즉각적으로 피드백하는 스위치형 인터랙션 엘리먼트입니다.

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- 버튼 컨테이너, 내부 라벨/아이콘 영역, 선택된 시각적 활성화(Pressed) 인디케이터로 구획을 구성합니다. 그룹 단위 구성 시 버튼 그룹 컨테이너를 함께 포함합니다.

### 1.2. 형태 옵션 (Variants)

- `Standard`: 배경이 투명하며, 선택 시 배경색이 채워지는 기본 스타일
- `Outlined`: 테두리가 존재하며, 선택 시 테두리 및 배경 강조 스타일
- `Contained`: 상시 배경색이 있으며, 선택 시 강조 색상으로 전환되는 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `orientation`: 그룹 모드일 때 버튼 배치 방향 (`horizontal` | `vertical`)

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)** | **비고 (Remarks)** |
| --- | --- | --- |
| `start-slot` | 버튼 내부 좌측 주입 영역 (Prefix 아이콘 등) |  |
| `default` (Main Slot) | 버튼 표기 텍스트 또는 콘텐츠 영역 |  |
| `end-slot` | 버튼 내부 우측 주입 영역 (Suffix 아이콘 등) |  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `value` | `string` | `''` | 버튼의 고유 식별 값 (그룹 모드 시 사용) |
| `pressed` | `boolean` | `false` | 단일 버튼의 선택/활성화 여부 (ON/OFF) |
| `multiple` | `boolean` | `false` | 그룹 모드 시 다중 선택 허용 여부 |
| `enforce-selection` | `boolean` | `false` | 그룹 모드 시 최소 1개 이상 선택 유지 여부 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |

### 3.2. 상태 (States)

- **Hover**: 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 키보드 포커스 진입 시 포커스 링 표시
- **Active / Pressed**: 선택/활성화 상태 (시각적 Pressed 스타일 적용)
- **Unpressed**: 미선택/비활성화 상태
- **Disabled**: 비활성화 (인터랙션 불가, 시각적 Dim)

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `change` | `{ pressed: boolean, value: string }` | 토글 상태 변경 시 방출 |
| `toggle-group-change` | `{ value: string | string[] }` | 그룹 모드에서 선택된 값 목록이 변경될 때 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```css
:host {
  /* Layout & Sizing */
  --ui-toggle-btn-height-sm: 28px;
  --ui-toggle-btn-height-md: 36px;
  --ui-toggle-btn-height-lg: 44px;
  --ui-toggle-btn-padding-x: 12px;
  --ui-toggle-btn-padding-y: 6px;
  --ui-toggle-btn-border-radius: 4px;

  /* Colors - Unpressed */
  --ui-toggle-btn-bg-color: #ffffff;
  --ui-toggle-btn-border-color: #d1d5db;
  --ui-toggle-btn-text-color: #374151;

  /* Colors - Pressed (Active) */
  --ui-toggle-btn-pressed-bg-color: #eff6ff;
  --ui-toggle-btn-pressed-border-color: #2563eb;
  --ui-toggle-btn-pressed-text-color: #2563eb;

  /* Colors - Interactive States */
  --ui-toggle-btn-hover-bg-color: #f3f4f6;
  --ui-toggle-btn-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Disabled */
  --ui-toggle-btn-disabled-bg-color: #f3f4f6;
  --ui-toggle-btn-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`aria-pressed`**: 단일 토글 버튼의 ON/OFF 상태를 `'true'` / `'false'`로 동적 바인딩
- **`role="group"`**: 토글 버튼 그룹 컨테이너에 연동
- **`aria-label`**: 아이콘 전용 토글 버튼의 경우 용도를 설명하는 명일성 라벨 추가

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 토글 버튼 간 순차적 포커스 이동
- **`Enter` / `Space`**: 포커스된 토글 버튼의 선택 상태 전환 (Toggle execution)
- **`Arrow Keys`**: 단일 선택(Radio 형태) 그룹 내에서 방위키를 통한 순환 포커스 및 즉시 선택 이동 지원

### 5.3. 스크린 리더 대응

- 스크린 리더가 요소에 진입할 때 `button` 역할과 함께 현재 눌림 상태(`pressed`)를 즉시 음성으로 전달할 수 있도록 WAI-ARIA 단일/그룹 표준 속성을 준수합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`ToggleButton.ts`)과 전용 Lit 스타일시트(`ToggleButton.css.ts`) 코드를 작성해 주세요.

[작성 조건 - ToggleButton.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `ToggleButtonTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `ToggleButtonHost` 명칭으로 export 하세요.

[작성 조건 - ToggleButton.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const toggleButtonStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-toggle-button-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-toggle-button`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/ToggleButton/ToggleButton.ts`, `src/components/ToggleButton/ToggleButton.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`ToggleButton.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - ToggleButton.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `ToggleButtonHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-toggle-button')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `ToggleButtonTemplate` 및 `ToggleButton.css.ts`의 `toggleButtonStyles`를 임포트하세요. `ToggleButtonHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = toggleButtonStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `ToggleButtonTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/ToggleButton/ToggleButton.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`ToggleButton.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - ToggleButton.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `ToggleButtonWc` 클래스와 커스텀 엘리먼트 태그명(`biz-toggle-button`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/ToggleButton/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`ToggleButtonTemplate`), 스타일(`toggleButtonStyles`), 웹 컴포넌트 클래스(`ToggleButtonWc`), React 래퍼 컴포넌트(`ToggleButton`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/ToggleButton/ToggleButton.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/ToggleButton/ToggleButton.react.ts`, `src/components/ToggleButton/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`ToggleButton.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - ToggleButton.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `ToggleButtonHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 ToggleButton.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/ToggleButton/ToggleButton.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
