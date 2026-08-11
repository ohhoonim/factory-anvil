# RadioButtonGroup Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/RadioButtonGroup/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - RadioButtonGroup.ts (코어 Lit 템플릿)
   - RadioButtonGroup.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - RadioButtonGroup.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - RadioButtonGroup.react.ts (@lit/react 기반 React 래퍼)
   - RadioButtonGroup.stories.ts (Storybook 문서 및 a11y 검증)
   - RadioButtonGroup.test.ts (Vitest 및 Playwright 테스트)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-radio-button-group`
   - CSS Design Token / Custom Properties: `--biz-radio-button-group-*`
   - 루트 CSS 클래스명: `biz-radio-button-group`
   - Lit 코어 템플릿 export 명칭: `RadioButtonGroupTemplate`
   - Lit 스타일 export 변수명: `export const radioButtonGroupStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): RadioButtonGroup
- 커스텀 엘리먼트 태그명 (kebab-case): biz-radio-button-group
- Lit 스타일 변수명 (camelCase): radioButtonGroupStyles

[요구사항 정의서]
---
# RadioButtonGroup 요구사항 정의서

단일 옵션 집합 관리를 위한 상위 Radio Button Group 컨테이너 구조

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Group Label`: 그룹 전체의 명칭 및 목적을 나타내는 레이블 영역
- `Radio Items Container`: 여러 개의 개별 Radio Button 컴포넌트들을 수직/수평으로 배치하고 상호 배타적 선택을 관리하는 컨테이너 영역
- `Helper Text / Error Message`: 그룹 전체에 적용되는 안내 문구 및 유효성 검사 에러 메시지 영역

### 1.2. 형태 옵션 (Variants)

- `Standard`: 기본 텍스트 및 라디오 버튼 형태의 스택 스타일
- `Card`: 개별 라디오 항목이 카드 형태로 확장된 인라인/그리드 스타일
- `Button`: 버튼 형태(Segmented Control) 스타일의 그룹 옵션

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `orientation`: 개별 라디오 버튼 배치 방향 제어 (`vertical`, `horizontal`)
- `full-width`: 부모 요소 너비 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**       | **비고 (Remarks)** |
| ------------------- | -------------------------- | ---------------- |
| `label-slot`        | 그룹 전체 상단/좌측 레이블 영역         |                  |
| `default`           | 하위 Radio Button 컴포넌트 주입 영역 |                  |
| `helper-text-slot`  | 하단 안내/에러 메시지 영역            |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**       | **타입**    | **기본값**      | **설명**                              |
| ------------- | --------- | ------------ | ----------------------------------- |
| `value`       | `string`  | `''`         | 현재 선택된 라디오 버튼 항목의 값                 |
| `name`        | `string`  | `''`         | 폼 제출 시 사용할 그룹 명칭 (하위 라디오 버튼에 자동 전파) |
| `orientation` | `string`  | `'vertical'` | 항목 배치 방향 (`vertical`, `horizontal`) |
| `required`    | `boolean` | `false`      | 필수 선택 여부                            |
| `disabled`    | `boolean` | `false`      | 그룹 내 모든 라디오 버튼 비활성화 여부              |
| `readonly`    | `boolean` | `false`      | 읽기 전용 여부                            |
| `error`       | `boolean` | `false`      | 유효성 에러 상태 여부                        |

### 3.2. 상태 (States)

- **Hover**: 하위 라디오 버튼 항목 마우스 오버 시 피드백
- **Focus / Focus-visible**: 키보드 탐색 시 해당 라디오 버튼 항목 포커스 링 표시
- **Disabled**: 그룹 전체 비활성화 (모든 하위 항목 인터랙션 불가, Dim 처리)
- **Readonly**: 읽기 전용 (선택 상태 변경 불가)
- **Error**: 유효성 검사 실패 (필수 선택 미달 등 시각적 에러 강조)

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)**     | **발생 시점**         |
| -------- | ------------------- | ----------------- |
| `change` | `{ value: string }` | 라디오 버튼 선택 변경 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-radio-group-gap-sm: 8px;
  --ui-radio-group-gap-md: 12px;
  --ui-radio-group-gap-lg: 16px;
  --ui-radio-group-label-margin-bottom: 8px;

  /* Colors - Base */
  --ui-radio-group-label-color: #111827;
  --ui-radio-group-helper-text-color: #6b7280;

  /* Colors - Error & Disabled */
  --ui-radio-group-error-color: #dc2626;
  --ui-radio-group-disabled-opacity: 0.5;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="radiogroup"`**: 라디오 버튼 요소들을 상호 배타적 단일 선택 그룹으로 묶는 역할 부여
- **`aria-labelledby`**: `label-slot` 영역의 ID와 연결하여 그룹 명칭 제공
- **`aria-describedby`**: `helper-text-slot` 영역의 ID와 연결하여 스크린 리더 안내
- **`aria-invalid`**: `error` 속성 활성화 시 `'true'`로 연동
- **`aria-required`**: `required` 속성 활성화 시 `'true'`로 연동

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 라디오 그룹 전체로 포커스 이동 (선택된 항목으로 포커스 진입, 선택 항목이 없으면 첫 번째 항목으로 진입)
- **`ArrowKeys (Up/Down/Left/Right)`**: 그룹 내 다음/이전 라디오 버튼으로 포커스 및 선택 상태 이동 (상호 배타적 선택 자동 전환)
- **`Space`**: 포커스된 라디오 버튼 선택

### 5.3. 스크린 리더 대응

- `role="radiogroup"`과 `aria-labelledby`를 결합하여 스크린 리더 사용자가 개별 라디오 버튼 탐색 시 전체 라디오 그룹의 레이블과 현재 항목 위치 정보(예: "1/3")를 함께 인지할 수 있도록 지원합니다.
---

위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`RadioButtonGroup.ts`)과 전용 Lit 스타일시트(`RadioButtonGroup.css.ts`) 코드를 작성해 주세요.

[작성 조건 - RadioButtonGroup.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `RadioButtonGroupTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.

[작성 조건 - RadioButtonGroup.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const radioButtonGroupStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-radio-button-group-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-radio-button-group`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/RadioButtonGroup/RadioButtonGroup.ts`, `src/components/RadioButtonGroup/RadioButtonGroup.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`RadioButtonGroup.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - RadioButtonGroup.wc.ts]
1. `LitElement`를 상속받아 클래스를 구현하고, `@customElement('biz-radio-button-group')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `RadioButtonGroupTemplate` 및 `RadioButtonGroup.css.ts`의 `radioButtonGroupStyles`를 임포트하세요.
3. 정적 클래스 속성으로 `static styles = radioButtonGroupStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `RadioButtonGroupTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/RadioButtonGroup/RadioButtonGroup.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`RadioButtonGroup.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - RadioButtonGroup.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `RadioButtonGroupWc` 클래스와 커스텀 엘리먼트 태그명(`biz-radio-button-group`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/RadioButtonGroup/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`RadioButtonGroupTemplate`), 스타일(`radioButtonGroupStyles`), 웹 컴포넌트 클래스(`RadioButtonGroupWc`), React 래퍼 컴포넌트(`RadioButtonGroup`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/RadioButtonGroup/RadioButtonGroup.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/RadioButtonGroup/RadioButtonGroup.react.ts`, `src/components/RadioButtonGroup/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 및 테스트 코드 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 및 테스트 코드 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`RadioButtonGroup.stories.ts`)과 단위/통합 테스트 파일(`RadioButtonGroup.test.ts`) 코드를 작성해 주세요.

[작성 조건 - RadioButtonGroup.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
3. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
4. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.

[작성 조건 - RadioButtonGroup.test.ts]
1. Vitest 및 Playwright 환경에서 실행 가능한 테스트 스위트를 구현하세요.
2. [단위 테스트]: Properties 변경에 따른 DOM 반영, 3.3절 커스텀 이벤트(`input`, `change`, `clear` 등) 방출 여부 및 `detail` 데이터 검증을 수행하세요.
3. [통합 및 접근성 테스트]: 5.1절 ARIA 속성(`aria-invalid`, `aria-describedby` 등) 바인딩 및 5.2절 키보드 네비게이션(`Tab`, `Escape`, `Enter` 등) 동작을 브라우저 상에서 검증하는 시나리오를 구현하세요.

[출력 형식]
- 각 파일별 경로(`src/components/RadioButtonGroup/RadioButtonGroup.stories.ts`, `src/components/RadioButtonGroup/RadioButtonGroup.test.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
