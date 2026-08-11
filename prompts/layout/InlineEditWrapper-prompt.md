# InlineEditWrapper Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/InlineEditWrapper/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - InlineEditWrapper.ts (코어 Lit 템플릿)
   - InlineEditWrapper.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - InlineEditWrapper.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - InlineEditWrapper.react.ts (@lit/react 기반 React 래퍼)
   - InlineEditWrapper.stories.ts (Storybook 문서 및 a11y 검증)
   - InlineEditWrapper.test.ts (Vitest 및 Playwright 테스트)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-inline-edit-wrapper`
   - CSS Design Token / Custom Properties: `--biz-inline-edit-wrapper-*`
   - 루트 CSS 클래스명: `biz-inline-edit-wrapper`
   - Lit 코어 템플릿 export 명칭: `InlineEditWrapperTemplate`
   - Lit 스타일 export 변수명: `export const inlineEditWrapperStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): InlineEditWrapper
- 커스텀 엘리먼트 태그명 (kebab-case): biz-inline-edit-wrapper
- Lit 스타일 변수명 (camelCase): inlineEditWrapperStyles

[요구사항 정의서]
---
# InlineEditWrapper 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `View Area`: 편집 전 텍스트 또는 렌더링된 데이터 값을 노출하는 읽기 전용 영역
- `Edit Control Area`: 클릭/포커스 전환 시 노출되는 인라인 편집 컨트롤(Input, Select 등) 주입 영역
- `Action Buttons (Optional)`: 편집 모드 진입 시 우측 또는 하단에 노출되는 저장/취소 버튼 구획

### 1.2. 형태 옵션 (Variants)

- `Standard`: 별도 경계선 없이 호버 시에만 텍스트 하이라이트가 표시되는 기본 스타일
- `Outlined`: View Mode에서도 편집 가능 영역임을 나타내는 경계선/패딩 스타일
- `Ghost`: 텍스트 형태를 유지하며 최소한의 편집 피드백만 제공하는 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `show-actions`: 저장/취소 버튼 영역 노출 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**         | **비고 (Remarks)** |
| ------------------- | ---------------------------- | ---------------- |
| `default`           | Edit Mode 시 노출될 편집 컨트롤 주입 영역 | Input, Select 등  |
| `view-slot`         | View Mode 시 노출될 텍스트/표시 영역    | 미지정 시 기본 텍스트 표시  |
| `actions-slot`      | 편집 모드 우측/하단 저장/취소 커스텀 버튼 영역  |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**        | **타입**    | **기본값**   | **설명**                                          |
| -------------- | --------- | --------- | ----------------------------------------------- |
| `value`        | `string`  | `''`      | 편집 대상 데이터 값                                     |
| `mode`         | `string`  | `'view'`  | 현재 표시 모드 (`view`, `edit`)                       |
| `trigger`      | `string`  | `'click'` | Edit Mode 전환 트리가 (`click`, `dblclick`, `focus`) |
| `show-actions` | `boolean` | `false`   | 저장/취소 액션 버튼 노출 여부                               |
| `auto-save`    | `boolean` | `true`    | Blur 시 자동 저장 처리 여부                              |
| `disabled`     | `boolean` | `false`   | 편집 모드 전환 비활성화 여부                                |
| `error`        | `boolean` | `false`   | 편집 값 유효성 에러 상태 여부                               |

### 3.2. 상태 (States)

- **View**: 일반 텍스트 노출 상태
- **Hover**: View Mode 상태에서 마우스 오버 시 편집 가능 영역 피드백 (연한 배경/아이콘 노출)
- **Edit**: 편집 필드 진입 및 키보드/마우스 입력 수신 상태
- **Disabled**: 비활성화 상태 (인터랙션 불가, Dim 처리)
- **Loading / Saving**: 편집 완료 후 데이터 비동기 저장 중 스피너 표시

### 3.3. 이벤트 (Events)

| **이벤트명**      | **상세 (Detail)**                       | **발생 시점**                       |
| ------------- | ------------------------------------- | ------------------------------- |
| `mode-change` | `{ mode: 'view' \| 'edit' }`          | View Mode <-> Edit Mode 전환 시 방출 |
| `save`        | `{ value: string, oldValue: string }` | 편집 저장 확정 시 방출                   |
| `cancel`      | `{ value: string }`                   | 편집 취소 및 이전 값 복원 시 방출            |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-inline-edit-min-height-sm: 32px;
  --ui-inline-edit-min-height-md: 40px;
  --ui-inline-edit-min-height-lg: 48px;
  --ui-inline-edit-padding-x: 8px;
  --ui-inline-edit-padding-y: 4px;
  --ui-inline-edit-border-radius: 4px;

  /* Colors - Base */
  --ui-inline-edit-view-text-color: #111827;
  --ui-inline-edit-view-hover-bg: #f3f4f6;
  --ui-inline-edit-edit-bg: #ffffff;
  --ui-inline-edit-border-color: #d1d5db;

  /* Colors - Interactive States */
  --ui-inline-edit-focus-border-color: #2563eb;
  --ui-inline-edit-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-inline-edit-error-color: #dc2626;
  --ui-inline-edit-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="button"`** (View Mode): View Mode의 표시 영역에 버튼 역할을 부여하여 클릭 및 포커스 가능 영역임을 전달
- **`aria-label`**: "편집하려면 선택하세요: [현재 값]" 형태의 명확한 상태 안내 적용
- **`aria-expanded`**: `mode="edit"` 시 `'true'`, `mode="view"` 시 `'false'` 설정

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Enter / Space`**: View Mode 포커스 시 Edit Mode로 전환
- **`Enter`**: Edit Mode에서 입력 내용 저장 및 View Mode로 복귀 (`auto-save` 또는 폼 내 스코프 연동)
- **`Escape`**: Edit Mode에서 입력 내용을 취소하고 기존 값 복원 후 View Mode로 복귀
- **`Tab`**: Edit Mode 진입 시 내부 입력 컴포넌트로 포커스 자동 이동

### 5.3. 스크린 리더 대응

- View Mode에서 Edit Mode로 전환되는 즉시 내부 입력 컨트롤에 자동 포커스(`focus()`)를 적용하여 스크린 리더가 수정 가능한 입력 필드로 전환되었음을 즉시 음성 안내하도록 제어합니다.
---

위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`InlineEditWrapper.ts`)과 전용 Lit 스타일시트(`InlineEditWrapper.css.ts`) 코드를 작성해 주세요.

[작성 조건 - InlineEditWrapper.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `InlineEditWrapperTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.

[작성 조건 - InlineEditWrapper.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const inlineEditWrapperStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-inline-edit-wrapper-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-inline-edit-wrapper`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/InlineEditWrapper/InlineEditWrapper.ts`, `src/components/InlineEditWrapper/InlineEditWrapper.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`InlineEditWrapper.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - InlineEditWrapper.wc.ts]
1. `LitElement`를 상속받아 클래스를 구현하고, `@customElement('biz-inline-edit-wrapper')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `InlineEditWrapperTemplate` 및 `InlineEditWrapper.css.ts`의 `inlineEditWrapperStyles`를 임포트하세요.
3. 정적 클래스 속성으로 `static styles = inlineEditWrapperStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `InlineEditWrapperTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/InlineEditWrapper/InlineEditWrapper.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`InlineEditWrapper.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - InlineEditWrapper.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `InlineEditWrapperWc` 클래스와 커스텀 엘리먼트 태그명(`biz-inline-edit-wrapper`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/InlineEditWrapper/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`InlineEditWrapperTemplate`), 스타일(`inlineEditWrapperStyles`), 웹 컴포넌트 클래스(`InlineEditWrapperWc`), React 래퍼 컴포넌트(`InlineEditWrapper`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/InlineEditWrapper/InlineEditWrapper.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/InlineEditWrapper/InlineEditWrapper.react.ts`, `src/components/InlineEditWrapper/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 및 테스트 코드 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 및 테스트 코드 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`InlineEditWrapper.stories.ts`)과 단위/통합 테스트 파일(`InlineEditWrapper.test.ts`) 코드를 작성해 주세요.

[작성 조건 - InlineEditWrapper.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
3. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
4. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.

[작성 조건 - InlineEditWrapper.test.ts]
1. Vitest 및 Playwright 환경에서 실행 가능한 테스트 스위트를 구현하세요.
2. [단위 테스트]: Properties 변경에 따른 DOM 반영, 3.3절 커스텀 이벤트(`input`, `change`, `clear` 등) 방출 여부 및 `detail` 데이터 검증을 수행하세요.
3. [통합 및 접근성 테스트]: 5.1절 ARIA 속성(`aria-invalid`, `aria-describedby` 등) 바인딩 및 5.2절 키보드 네비게이션(`Tab`, `Escape`, `Enter` 등) 동작을 브라우저 상에서 검증하는 시나리오를 구현하세요.

[출력 형식]
- 각 파일별 경로(`src/components/InlineEditWrapper/InlineEditWrapper.stories.ts`, `src/components/InlineEditWrapper/InlineEditWrapper.test.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
