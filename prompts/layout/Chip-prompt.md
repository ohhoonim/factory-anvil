# Chip Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/Chip/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - Chip.ts (코어 Lit 템플릿)
   - Chip.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - Chip.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - Chip.react.ts (@lit/react 기반 React 래퍼)
   - Chip.stories.ts (Storybook 문서 및 a11y 검증)
   - Chip.test.ts (Vitest 및 Playwright 테스트)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-chip`
   - CSS Design Token / Custom Properties: `--biz-chip-*`
   - 루트 CSS 클래스명: `biz-chip`
   - Lit 코어 템플릿 export 명칭: `ChipTemplate`
   - Lit 스타일 export 변수명: `export const chipStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): Chip
- 커스텀 엘리먼트 태그명 (kebab-case): biz-chip
- Lit 스타일 변수명 (camelCase): chipStyles

[요구사항 정의서]
---
# Chip 요구사항 정의서

키워드, 이메일, 태그 형태의 다중 데이터 입력을 위한 Chip/Tag 형태의 UI 레이아웃

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Label`: 상단 또는 좌측에 위치하는 필드 명칭 영역
- `Chip Container`: 입력된 키워드 칩(Chip/Tag)들과 텍스트 입력 필드가 인라인으로 배치되는 컨테이너 영역
- `Chip Item`: 삭제 버튼(`x` 아이콘) 및 텍스트를 포함하는 개별 칩 엘리먼트
- `Input Field`: 새로운 키워드를 입력받는 인라인 텍스트 입력 영역
- `Helper Text / Error Message`: 하단 안내 문구 및 유효성 검사 에러 메시지 영역

### 1.2. 형태 옵션 (Variants)

- `Outlined`: 테두리 중심 스타일
- `Filled`: 배경색 중심 스타일
- `Standard`: 하단 경계선 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**        | **비고 (Remarks)**      |
| ------------------- | --------------------------- | --------------------- |
| `label-slot`        | 상단/좌측 레이블 영역                | 표준 `<label>` 태그 충돌 방지 |
| `start-slot`        | 최좌측 내부 주입 영역 (Prefix 아이콘 등) | RTL 대응 고려 명명          |
| `end-slot`          | 최우측 내부 주입 영역 (Suffix 아이콘 등) |                       |
| `chip-item-slot`    | 개별 칩 아이템 커스텀 주입 영역          | 기본 칩 스타일 대체 가능        |
| `helper-text-slot`  | 하단 안내/에러 메시지 영역             |                       |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**            | **타입**               | **기본값**          | **설명**              |
| ------------------ | -------------------- | ---------------- | ------------------- |
| `value`            | `string[]`           | `[]`             | 입력된 키워드 칩들의 문자열 배열  |
| `placeholder`      | `string`             | `''`             | 플레이스홀더 텍스트          |
| `delimiter`        | `string \| string[]` | `['Enter', ',']` | 칩 생성 구분을 위한 키/문자 목록 |
| `max-chips`        | `number`             | `Infinity`       | 최대 허용 칩 개수          |
| `allow-duplicates` | `boolean`            | `false`          | 중복 키워드 입력 허용 여부     |
| `required`         | `boolean`            | `false`          | 필수 입력 여부            |
| `readonly`         | `boolean`            | `false`          | 읽기 전용 여부            |
| `disabled`         | `boolean`            | `false`          | 비활성화 여부             |
| `error`            | `boolean`            | `false`          | 유효성 에러 상태 여부        |
| `deletable`        | `boolean`            | `true`           | 개별 칩 삭제 버튼 노출 여부    |

### 3.2. 상태 (States)

- **Hover**: 컨테이너 및 개별 칩/삭제 버튼 마우스 오버 시 피드백
- **Focus / Focus-visible**: 인라인 입력 필드 및 개별 칩 선택 시 키보드 포커스 링 표시
- **Disabled**: 비활성화 (인터랙션 불가, 시각적 Dim 처리)
- **Readonly**: 읽기 전용 (칩 추가/삭제 불가, 텍스트 복사 가능)
- **Error**: 유효성 검사 실패 (중복 입력, 최대 개수 초과 등 시각적 에러 강조)
- **Focused-Chip**: 키보드 탐색으로 특정 칩이 선택된 상태

### 3.3. 이벤트 (Events)

| **이벤트명**      | **상세 (Detail)**                                            | **발생 시점**                  |
| ------------- | ---------------------------------------------------------- | -------------------------- |
| `change`      | `{ value: string[] }`                                      | 칩 추가 또는 삭제로 데이터 배열 변경 시 방출 |
| `chip-add`    | `{ addedValue: string, value: string[] }`                  | 새로운 칩 추가 시 방출              |
| `chip-remove` | `{ removedValue: string, index: number, value: string[] }` | 특정 칩 삭제 시 방출               |
| `focus`       | `FocusEvent`                                               | 포커스 진입 시 방출                |
| `blur`        | `FocusEvent`                                               | 포커스 해제 시 방출                |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-chip-container-min-height-sm: 32px;
  --ui-chip-container-min-height-md: 40px;
  --ui-chip-container-min-height-lg: 48px;
  --ui-chip-container-padding-x: 8px;
  --ui-chip-container-padding-y: 4px;
  --ui-chip-gap: 6px;
  --ui-chip-border-radius: 4px;

  /* Individual Chip Styling */
  --ui-chip-item-bg-color: #e5e7eb;
  --ui-chip-item-text-color: #111827;
  --ui-chip-item-height: 24px;
  --ui-chip-item-border-radius: 12px;

  /* Colors - Base */
  --ui-chip-bg-color: #ffffff;
  --ui-chip-border-color: #d1d5db;
  --ui-chip-text-color: #111827;
  --ui-chip-placeholder-color: #9ca3af;

  /* Colors - Interactive States */
  --ui-chip-hover-border-color: #9ca3af;
  --ui-chip-focus-border-color: #2563eb;
  --ui-chip-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-chip-error-color: #dc2626;
  --ui-chip-disabled-bg-color: #f3f4f6;
  --ui-chip-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="grid"`** 또는 **`role="list"`**: 생성된 칩 목록 구조에 맞춰 알맞은 목록역할 부여 (개별 칩은 `role="row"`/`gridcell` 또는 `role="listitem"`)
- **`aria-invalid`**: `error` 속성 활성화 시 `'true'`로 연동
- **`aria-required`**: `required` 속성 활성화 시 `'true'`로 연동
- **`aria-describedby`**: `helper-text-slot` 영역의 ID와 입력 필드를 연결하여 스크린 리더 안내
- **`aria-label`**: 삭제 버튼에 "삭제: [칩 텍스트]" 형태의 접근성 명칭 적용

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Enter / Delimiter`**: 입력 필드에 입력된 문자열을 칩으로 변환 생성
- **`Backspace`**: 입력 필드가 비어있을 때 누르면 가장 마지막 칩 선택 및 연속 입력 시 해당 칩 삭제
- **`ArrowLeft / ArrowRight`**: 인라인 입력 필드와 생성된 개별 칩 간 포커스 이동
- **`Delete`**: 키보드로 포커스된 칩 삭제

### 5.3. 스크린 리더 대응

- 칩이 동적으로 추가되거나 삭제될 때 `aria-live="polite"` 영역을 통해 스크린 리더에 "000 칩이 추가되었습니다" 또는 "000 칩이 삭제되었습니다" 메시지를 음성으로 안내합니다.
---

위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`Chip.ts`)과 전용 Lit 스타일시트(`Chip.css.ts`) 코드를 작성해 주세요.

[작성 조건 - Chip.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `ChipTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.

[작성 조건 - Chip.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const chipStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-chip-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-chip`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/Chip/Chip.ts`, `src/components/Chip/Chip.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`Chip.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - Chip.wc.ts]
1. `LitElement`를 상속받아 클래스를 구현하고, `@customElement('biz-chip')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `ChipTemplate` 및 `Chip.css.ts`의 `chipStyles`를 임포트하세요.
3. 정적 클래스 속성으로 `static styles = chipStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `ChipTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/Chip/Chip.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`Chip.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - Chip.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `ChipWc` 클래스와 커스텀 엘리먼트 태그명(`biz-chip`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/Chip/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`ChipTemplate`), 스타일(`chipStyles`), 웹 컴포넌트 클래스(`ChipWc`), React 래퍼 컴포넌트(`Chip`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/Chip/Chip.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/Chip/Chip.react.ts`, `src/components/Chip/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 및 테스트 코드 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 및 테스트 코드 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`Chip.stories.ts`)과 단위/통합 테스트 파일(`Chip.test.ts`) 코드를 작성해 주세요.

[작성 조건 - Chip.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
3. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
4. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.

[작성 조건 - Chip.test.ts]
1. Vitest 및 Playwright 환경에서 실행 가능한 테스트 스위트를 구현하세요.
2. [단위 테스트]: Properties 변경에 따른 DOM 반영, 3.3절 커스텀 이벤트(`input`, `change`, `clear` 등) 방출 여부 및 `detail` 데이터 검증을 수행하세요.
3. [통합 및 접근성 테스트]: 5.1절 ARIA 속성(`aria-invalid`, `aria-describedby` 등) 바인딩 및 5.2절 키보드 네비게이션(`Tab`, `Escape`, `Enter` 등) 동작을 브라우저 상에서 검증하는 시나리오를 구현하세요.

[출력 형식]
- 각 파일별 경로(`src/components/Chip/Chip.stories.ts`, `src/components/Chip/Chip.test.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
