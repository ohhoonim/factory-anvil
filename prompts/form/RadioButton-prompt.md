# RadioButton Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/RadioButton/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - RadioButton.ts (코어 Lit 템플릿)
   - RadioButton.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - RadioButton.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - RadioButton.react.ts (@lit/react 기반 React 래퍼)
   - RadioButton.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-radio-button`
   - Lit 엘리먼트 클래스명: `BizRadioButton`
   - CSS Design Token / Custom Properties: `--biz-radio-button-*`
   - 루트 CSS 클래스명: `biz-radio-button`
   - Lit 코어 템플릿 export 명칭: `RadioButtonTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`RadioButtonHost` 
   - Lit 스타일 export 변수명: `export const radioButtonStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizRadioButton
- 커스텀 엘리먼트 태그명 (kebab-case): biz-radio-button
- Lit 스타일 변수명 (camelCase): radioButtonStyles

[요구사항 정의서]
---
# RadioButton 요구사항 정의서 

상호 배타적인 옵션 리스트 중 오직 하나의 항목만 선택할 수 있는 배타적 컨트롤을 제공하고, RadioButtonGroup내에서 사용가능한 RadioButton

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Radio Control`: 단일 선택 상태를 표시하는 원형 박스 (선택 시 내부 원형 점 표시)
- `Label`: 라디오 버튼 우측 또는 좌측에 위치하여 선택 항목의 의미를 나타내는 텍스트 영역
- `RadioButtonGroup Context`: 상위 RadioButtonGroup과의 선택 상태, name, disabled 등 상태 및 이벤트를 동기화하는 컨텍스트 연동 구획
- `Helper Text / Description Area`: 단일 라디오 버튼 하단 보조 설명 영역

### 1.2. 형태 및 배치 옵션 (Variants & Placement)

- `Standard`: 원형 라디오 컨트롤 + 레이블 기본 형태
- `Button / Card`: 라디오 컨트롤을 버튼 또는 카드 컨테이너 스타일로 감싼 형태
- `Label Position`: 레이블 위치 제어 (`right`: 컨트롤 우측, `left`: 컨트롤 좌측)

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 상위 그룹 연동 (Group Integration)

- `RadioButtonGroup` 하위 요소로 배치 시 동일한 `name` 및 컨텍스트를 공유하여 배타적 단일 선택 구현
- 상위 그룹의 `value`, `name`, `disabled`, `readonly` 상태를 상속받아 동기화

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**              | **비고 (Remarks)**      |
| ------------------- | --------------------------------- | --------------------- |
| `default`           | 라디오 버튼 우측/좌측 레이블 영역               | 텍스트 및 서브 타이틀 등 커스텀 노출 |
| `icon-slot`         | 선택(`checked`) 상태 내부 표시 아이콘 커스텀 영역 | 기본 원형 점 대체 가능         |
| `description-slot`  | 라디오 버튼 하단 보조 설명 텍스트 영역            |                       |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**          | **타입**                        | **기본값**   | **설명**                           |
| ---------------- | ----------------------------- | --------- | -------------------------------- |
| `checked`        | `boolean`                     | `false`   | 단일 라디오 버튼 선택 여부                  |
| `value`          | `string \| number \| boolean` | `''`      | RadioButtonGroup 내에서 식별자로 사용되는 값 |
| `name`           | `string`                      | `''`      | 폼 식별용 이름 (그룹 제어 시 상속)            |
| `label-position` | `string`                      | `'right'` | 레이블 위치 (`right`, `left`)         |
| `readonly`       | `boolean`                     | `false`   | 읽기 전용 여부                         |
| `disabled`       | `boolean`                     | `false`   | 비활성화 여부 (그룹 제어 시 상속)             |
| `error`          | `boolean`                     | `false`   | 유효성 에러 상태 여부                     |

### 3.2. 상태 (States)

- **Unchecked**: 선택되지 않은 기본 상태
- **Checked**: 단일 선택 완료 상태 (내부 점 표출)
- **Hover**: 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 키보드 포커스 진입 및 포커스 링 표시
- **Disabled**: 비활성화 (인터랙션 및 선택 변경 불가, Dim 처리)
- **Readonly**: 읽기 전용 (선택 상태 유지, 인터랙션 불가)
- **Error**: 필수 선택 미충족 시 시각적 에러 강조

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)**                    | **발생 시점**                   |
| -------- | ---------------------------------- | --------------------------- |
| `change` | `{ checked: boolean, value: any }` | 선택 상태 변경 시 방출 (Group으로도 전달) |
| `focus`  | `FocusEvent`                       | 포커스 진입 시 방출                 |
| `blur`   | `FocusEvent`                       | 포커스 해제 시 방출                 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-radio-size-sm: 16px;
  --ui-radio-size-md: 20px;
  --ui-radio-size-lg: 24px;
  --ui-radio-label-gap: 8px;

  /* Colors - Base */
  --ui-radio-bg: #ffffff;
  --ui-radio-border-color: #d1d5db;
  --ui-radio-text-color: #111827;

  /* Colors - Checked */
  --ui-radio-checked-border-color: #2563eb;
  --ui-radio-checked-icon-color: #2563eb;

  /* Colors - Interactive States */
  --ui-radio-hover-border-color: #9ca3af;
  --ui-radio-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-radio-error-color: #dc2626;
  --ui-radio-disabled-bg: #f3f4f6;
  --ui-radio-disabled-border-color: #e5e7eb;
  --ui-radio-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="radio"`**: 단일 선택 요소임을 명시 (표준 `<input type="radio">` 사용 시 자동 대응)
- **`aria-checked`**: 선택 상태에 따라 `'true'` 또는 `'false'` 동적 연동
- **`aria-invalid`**: `error` 속성 활성화 시 `'true'`로 연동
- **`aria-describedby`**: `description-slot` 영역의 ID와 연결하여 스크린 리더 안내

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 라디오 그룹 전체로 진입 (선택된 라디오 버튼으로 포커스 진입)
- **`ArrowDown` / `ArrowRight`**: 그룹 내 다음 라디오 버튼으로 포커스를 이동하고 해당 항목을 자동 선택
- **`ArrowUp` / `ArrowLeft`**: 그룹 내 이전 라디오 버튼으로 포커스를 이동하고 해당 항목을 자동 선택
- **`Space`**: 포커스된 라디오 버튼을 선택 확정

### 5.3. 스크린 리더 대응

- `RadioButtonGroup` 내에서 동작 시 상위 그룹의 `aria-labelledby` 또는 `aria-label`을 통해 그룹의 전체 범주 정보를 함께 전달하며, 방향키 이동 시 선택 상태가 실시간 반영되어 스크린 리더가 레이블과 "선택됨" 상태를 즉시 음성 출력하도록 구현합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`RadioButton.ts`)과 전용 Lit 스타일시트(`RadioButton.css.ts`) 코드를 작성해 주세요.

[작성 조건 - RadioButton.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `RadioButtonTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `RadioButtonHost` 명칭으로 export 하세요.

[작성 조건 - RadioButton.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const radioButtonStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-radio-button-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-radio-button`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/RadioButton/RadioButton.ts`, `src/components/RadioButton/RadioButton.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`RadioButton.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - RadioButton.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `RadioButtonHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-radio-button')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `RadioButtonTemplate` 및 `RadioButton.css.ts`의 `radioButtonStyles`를 임포트하세요. `RadioButtonHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = radioButtonStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `RadioButtonTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/RadioButton/RadioButton.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`RadioButton.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - RadioButton.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `RadioButtonWc` 클래스와 커스텀 엘리먼트 태그명(`biz-radio-button`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/RadioButton/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`RadioButtonTemplate`), 스타일(`radioButtonStyles`), 웹 컴포넌트 클래스(`RadioButtonWc`), React 래퍼 컴포넌트(`RadioButton`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/RadioButton/RadioButton.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/RadioButton/RadioButton.react.ts`, `src/components/RadioButton/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`RadioButton.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - RadioButton.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `RadioButtonHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 RadioButton.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요.

[출력 형식]
- 파일 경로(`src/components/RadioButton/RadioButton.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
