# CheckboxGroup Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/CheckboxGroup/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - CheckboxGroup.ts (코어 Lit 템플릿)
   - CheckboxGroup.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - CheckboxGroup.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - CheckboxGroup.react.ts (@lit/react 기반 React 래퍼)
   - CheckboxGroup.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-checkbox-group`
   - Lit 엘리먼트 클래스명: `BizCheckboxGroup`
   - CSS Design Token / Custom Properties: `--biz-checkbox-group-*`
   - 루트 CSS 클래스명: `biz-checkbox-group`
   - Lit 코어 템플릿 export 명칭: `CheckboxGroupTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`CheckboxGroupHost` 
   - Lit 스타일 export 변수명: `export const checkboxGroupStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizCheckboxGroup
- 커스텀 엘리먼트 태그명 (kebab-case): biz-checkbox-group
- Lit 스타일 변수명 (camelCase): checkboxGroupStyles

[요구사항 정의서]
---
# CheckboxGroup 요구사항 정의서
복수 선택 항목 관리를 위한 상위 Checkbox Group 컨테이너 구조

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Group Label`: 그룹 전체의 명칭 및 목적을 나타내는 레이블 영역
- `Checkbox Items Container`: 여러 개의 개별 Checkbox 컴포넌트들을 수직/수평으로 배치하고 관리하는 컨테이너 영역
- `Helper Text / Error Message`: 그룹 전체에 적용되는 안내 문구 및 유효성 검사 에러 메시지 영역

### 1.2. 형태 옵션 (Variants)

- `Standard`: 기본 텍스트 및 체크박스 형태의 스택 스타일
- `Card`: 개별 체크박스 항목이 카드 형태로 확장된 인라인/그리드 스타일
- `Button`: 버튼 형태(Segmented Button) 스타일의 그룹 옵션

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `orientation`: 개별 체크박스 배치 방향 제어 (`vertical`, `horizontal`)
- `full-width`: 부모 요소 너비 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

|**슬롯명 (Slot Name)**|**설명 (Description)**|**비고 (Remarks)**|
|---|---|---|
|`label-slot`|그룹 전체 상단/좌측 레이블 영역||
|`default`|하위 Checkbox 컴포넌트 주입 영역||
|`helper-text-slot`|하단 안내/에러 메시지 영역||

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

|**속성명**|**타입**|**기본값**|**설명**|
|---|---|---|---|
|`value`|`string[]`|`[]`|선택된 체크박스 항목들의 값 배열|
|`name`|`string`|`''`|폼 제출 시 사용할 그룹 명칭|
|`orientation`|`string`|`'vertical'`|항목 배치 방향 (`vertical`, `horizontal`)|
|`required`|`boolean`|`false`|필수 선택 여부|
|`disabled`|`boolean`|`false`|그룹 내 모든 체크박스 비활성화 여부|
|`readonly`|`boolean`|`false`|읽기 전용 여부|
|`error`|`boolean`|`false`|유효성 에러 상태 여부|
|`min`|`number`|`0`|최소 선택 필요 개수|
|`max`|`number`|`Infinity`|최대 선택 가능 개수|

### 3.2. 상태 (States)

- **Hover**: 하위 체크박스 항목 마우스 오버 시 피드백
- **Focus / Focus-visible**: 키보드 탐색 시 해당 체크박스 항목 포커스 링 표시
- **Disabled**: 그룹 전체 비활성화 (모든 하위 항목 인터랙션 불가, Dim 처리)
- **Readonly**: 읽기 전용 (선택 상태 변경 불가)
- **Error**: 유효성 검사 실패 (최소/최대 선택 수 미달 등 시각적 에러 강조)
- **Indeterminate**: 전체 선택 체크박스와 연동 시 일부만 선택된 상태

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)**       | **발생 시점**                       |
| -------- | --------------------- | ------------------------------- |
| `change` | `{ value: string[] }` | 하위 체크박스 선택/해제로 선택 항목 배열 변경 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-checkbox-group-gap-sm: 8px;
  --ui-checkbox-group-gap-md: 12px;
  --ui-checkbox-group-gap-lg: 16px;
  --ui-checkbox-group-label-margin-bottom: 8px;

  /* Colors - Base */
  --ui-checkbox-group-label-color: #111827;
  --ui-checkbox-group-helper-text-color: #6b7280;

  /* Colors - Error & Disabled */
  --ui-checkbox-group-error-color: #dc2626;
  --ui-checkbox-group-disabled-opacity: 0.5;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="group"`**: 체크박스 요소들을 하나로 묶는 그룹 역할 부여
- **`aria-labelledby`**: `label-slot` 영역의 ID와 연결하여 그룹 명칭 제공
- **`aria-describedby`**: `helper-text-slot` 영역의 ID와 연결하여 스크린 리더 안내
- **`aria-invalid`**: `error` 속성 활성화 시 `'true'`로 연동
- **`aria-required`**: `required` 속성 활성화 시 `'true'`로 연동

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 체크박스 그룹 내부의 각 체크박스 항목으로 순차 포커스 이동
- **`Space`**: 현재 포커스된 체크박스 항목의 선택 상태 토글

### 5.3. 스크린 리더 대응

- 그룹 롤(`role="group"`)과 `aria-labelledby`를 통해 스크린 리더 사용자가 개별 체크박스 진입 시 속한 그룹의 목적과 전체 선택 상태를 명확히 인지할 수 있도록 구성합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`CheckboxGroup.ts`)과 전용 Lit 스타일시트(`CheckboxGroup.css.ts`) 코드를 작성해 주세요.

[작성 조건 - CheckboxGroup.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `CheckboxGroupTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `CheckboxGroupHost` 명칭으로 export 하세요.

[작성 조건 - CheckboxGroup.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const checkboxGroupStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-checkbox-group-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-checkbox-group`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/CheckboxGroup/CheckboxGroup.ts`, `src/components/CheckboxGroup/CheckboxGroup.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`CheckboxGroup.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - CheckboxGroup.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `CheckboxGroupHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-checkbox-group')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `CheckboxGroupTemplate` 및 `CheckboxGroup.css.ts`의 `checkboxGroupStyles`를 임포트하세요. `CheckboxGroupHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = checkboxGroupStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `CheckboxGroupTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/CheckboxGroup/CheckboxGroup.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`CheckboxGroup.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - CheckboxGroup.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `CheckboxGroupWc` 클래스와 커스텀 엘리먼트 태그명(`biz-checkbox-group`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/CheckboxGroup/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`CheckboxGroupTemplate`), 스타일(`checkboxGroupStyles`), 웹 컴포넌트 클래스(`CheckboxGroupWc`), React 래퍼 컴포넌트(`CheckboxGroup`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/CheckboxGroup/CheckboxGroup.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/CheckboxGroup/CheckboxGroup.react.ts`, `src/components/CheckboxGroup/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`CheckboxGroup.stories.ts`)과 단위/통합 테스트 파일(`CheckboxGroup.test.ts`) 코드를 작성해 주세요.

[작성 조건 - CheckboxGroup.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `CheckboxGroupHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 CheckboxGroup.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요.

[출력 형식]
- 파일 경로(`src/components/CheckboxGroup/CheckboxGroup.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
