# NumberInput Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/NumberInput/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - NumberInput.ts (코어 Lit 템플릿)
   - NumberInput.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - NumberInput.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - NumberInput.react.ts (@lit/react 기반 React 래퍼)
   - NumberInput.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-number-input`
   - Lit 엘리먼트 클래스명: `BizNumberInput`
   - CSS Design Token / Custom Properties: `--biz-number-input-*`
   - 루트 CSS 클래스명: `biz-number-input`
   - Lit 코어 템플릿 export 명칭: `NumberInputTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`NumberInputHost` 
   - Lit 스타일 export 변수명: `export const numberInputStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizNumberInput
- 커스텀 엘리먼트 태그명 (kebab-case): biz-number-input
- Lit 스타일 변수명 (camelCase): numberInputStyles

[요구사항 정의서]
---
# NumberInput 요구사항 정의서

수치(Number) 데이터 전용 입력 및 증감(Stepper) 버튼 컨트롤 제공
### 1.1. 기본 구성 요소 (Core Elements)

- `Label`: 상단 또는 좌측에 위치하는 입력 필드 명칭 영역
- `Input Control`: 숫자 데이터 입력을 수신하고 정렬(우측/좌측)을 처리하는 필드
- `Decrement Button (-)`: 수치를 지정된 `step` 단위만큼 감소시키는 버튼
- `Increment Button (+)`: 수치를 지정된 `step` 단위만큼 증가시키는 버튼
- `Helper Text / Error Message`: 하단 안내 문구 및 유효성 검사 에러 메시지 영역

### 1.2. 형태 옵션 (Variants)

- `Outlined`: 테두리 중심 스타일
- `Filled`: 배경색 중심 스타일
- `Standard`: 하단 경계선 스타일

### 1.3. 증감 버튼 배치 옵션 (Controls Placement)

- `End`: 입력 필드 우측에 증감 버튼이 나란히 배치되는 형태
- `Stacked`: 입력 필드 우측 내부에 상/하 버튼으로 중첩 배치되는 형태
- `Split`: 입력 필드 좌측에 감소(-), 우측에 증가(+) 버튼이 양끝으로 분할 배치되는 형태

### 1.4. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`
### 1.5. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)**   | **설명 (Description)**                 | **비고 (Remarks)**      |
| --------------------- | ------------------------------------ | --------------------- |
| `label-slot`          | 상단/좌측 레이블 영역                         | 표준 `<label>` 태그 충돌 방지 |
| `prefix-slot`         | 입력 필드 내부 좌측 영역 (통화 기호 `$`, `₩` 등)    |                       |
| `suffix-slot`         | 입력 필드 내부 우측 영역 (단위 `%`, `개`, `kg` 등) |                       |
| `decrement-icon-slot` | 감소(-) 버튼 커스텀 아이콘 영역                  |                       |
| `increment-icon-slot` | 증가(+) 버튼 커스텀 아이콘 영역                  |                       |
| `helper-text-slot`    | 하단 안내/에러 메시지 영역                      |                       |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**             | **타입**           | **기본값**     | **설명**                               |
| ------------------- | ---------------- | ----------- | ------------------------------------ |
| `value`             | `number \| null` | `null`      | 현재 수치 값                              |
| `min`               | `number`         | `-Infinity` | 입력/증감 가능한 최솟값                        |
| `max`               | `number`         | `Infinity`  | 입력/증감 가능한 최댓값                        |
| `step`              | `number`         | `1`         | 증감 버튼 클릭 시 변경될 수치 단위                 |
| `precision`         | `number`         | `undefined` | 소수점 표출 및 제한 자릿수                      |
| `controls`          | `boolean`        | `true`      | 증감 버튼 (+/-) 노출 여부                    |
| `controls-position` | `string`         | `'end'`     | 증감 버튼 위치 (`end`, `stacked`, `split`) |
| `use-grouping`      | `boolean`        | `false`     | 천 단위 콤마(,) 표출 여부                     |
| `required`          | `boolean`        | `false`     | 필수 입력 여부                             |
| `readonly`          | `boolean`        | `false`     | 읽기 전용 여부                             |
| `disabled`          | `boolean`        | `false`     | 비활성화 여부                              |
| `error`             | `boolean`        | `false`     | 유효성 에러 상태 여부                         |

### 3.2. 상태 (States)

- **Hover**: 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 포커스 진입 및 키보드 포커스 링 표시
- **Min / Max Reached**: 최솟값 또는 최댓값 도달 시 해당 증감 버튼 비활성화 상태
- **Disabled**: 비활성화 (인터랙션 및 값 변경 불가, 시각적 Dim 처리)
- **Readonly**: 읽기 전용 (값 수정 및 증감 버튼 클릭 불가, 복사 가능)
- **Error**: 최솟값/최댓값 범위 초과 또는 비숫자 입력 등 유효성 실패 상태

### 3.3. 이벤트 (Events)

| **이벤트명**    | **상세 (Detail)**             | **발생 시점**                  |
| ----------- | --------------------------- | -------------------------- |
| `input`     | `{ value: number \| null }` | 값 변경 시 실시간 방출              |
| `change`    | `{ value: number \| null }` | 값 변경 후 포커스 해제 시 방출         |
| `step-up`   | `{ value: number }`         | 증가(+) 버튼 클릭 또는 키보드 조작 시 방출 |
| `step-down` | `{ value: number }`         | 감소(-) 버튼 클릭 또는 키보드 조작 시 방출 |
| `focus`     | `FocusEvent`                | 포커스 진입 시 방출                |
| `blur`      | `FocusEvent`                | 포커스 해제 시 방출                |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-number-input-height-sm: 32px;
  --ui-number-input-height-md: 40px;
  --ui-number-input-height-lg: 48px;
  --ui-number-input-padding-x: 12px;
  --ui-number-input-padding-y: 8px;
  --ui-number-input-border-radius: 4px;

  /* Colors - Base */
  --ui-number-input-bg-color: #ffffff;
  --ui-number-input-border-color: #d1d5db;
  --ui-number-input-text-color: #111827;
  --ui-number-input-placeholder-color: #9ca3af;
  --ui-number-input-control-bg: #f9fafb;
  --ui-number-input-control-icon-color: #4b5563;

  /* Colors - Interactive States */
  --ui-number-input-hover-border-color: #9ca3af;
  --ui-number-input-focus-border-color: #2563eb;
  --ui-number-input-focus-ring-color: rgba(37, 99, 235, 0.2);
  --ui-number-input-control-hover-bg: #f3f4f6;

  /* Colors - Error & Disabled */
  --ui-number-input-error-color: #dc2626;
  --ui-number-input-disabled-bg-color: #f3f4f6;
  --ui-number-input-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="spinbutton"`**: 수치 조정 전용 컴포넌트임을 명시
- **`aria-valuenow`**: 현재 설정된 수치 값을 바인딩
- **`aria-valuemin`**: `min` 속성에 지정된 최솟값 바인딩
- **`aria-valuemax`**: `max` 속성에 지정된 최댓값 바인딩
- **`aria-invalid`**: `error` 속성 활성화 시 `'true'`로 연동
- **`aria-required`**: `required` 속성 활성화 시 `'true'`로 연동
- **`aria-describedby`**: `helper-text-slot` 영역의 ID와 입력 필드를 연결하여 스크린 리더 안내
- **`aria-label`** (증감 버튼): 감소 버튼에 "값 감소", 증가 버튼에 "값 증가" 접근성 레이블 부여

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`ArrowUp`**: 수치를 `step` 단위만큼 증가 (`max` 범위 초과 불가)
- **`ArrowDown`**: 수치를 `step` 단위만큼 감소 (`min` 범위 초과 불가)
- **`Home`**: `min` 값이 존재할 경우 최솟값으로 즉시 변경
- **`End`**: `max` 값이 존재할 경우 최댓값으로 즉시 변경
- **`PageUp`**: 수치를 `step * 10` 단위만큼 대폭 증가
- **`PageDown`**: 수치를 `step * 10` 단위만큼 대폭 감소

### 5.3. 스크린 리더 대응

- 증감 버튼 클릭 또는 키보드 방향키 조작으로 수치가 변경될 때, `aria-valuenow` 값 변화를 통해 변경된 실시간 수치가 스크린 리더에 즉시 음성으로 전달되도록 제어합니다. 또한 최솟값/최댓값 도달 시 "최솟값에 도달했습니다" 또는 "최댓값에 도달했습니다" 안내를 지원합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`NumberInput.ts`)과 전용 Lit 스타일시트(`NumberInput.css.ts`) 코드를 작성해 주세요.

[작성 조건 - NumberInput.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `NumberInputTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `NumberInputHost` 명칭으로 export 하세요.

[작성 조건 - NumberInput.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const numberInputStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-number-input-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-number-input`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/NumberInput/NumberInput.ts`, `src/components/NumberInput/NumberInput.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`NumberInput.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - NumberInput.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `NumberInputHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-number-input')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `NumberInputTemplate` 및 `NumberInput.css.ts`의 `numberInputStyles`를 임포트하세요. `NumberInputHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = numberInputStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `NumberInputTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/NumberInput/NumberInput.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`NumberInput.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - NumberInput.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `NumberInputWc` 클래스와 커스텀 엘리먼트 태그명(`biz-number-input`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/NumberInput/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`NumberInputTemplate`), 스타일(`numberInputStyles`), 웹 컴포넌트 클래스(`NumberInputWc`), React 래퍼 컴포넌트(`NumberInput`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/NumberInput/NumberInput.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/NumberInput/NumberInput.react.ts`, `src/components/NumberInput/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`NumberInput.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - NumberInput.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `NumberInputHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 NumberInput.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요.

[출력 형식]
- 파일 경로(`src/components/NumberInput/NumberInput.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
