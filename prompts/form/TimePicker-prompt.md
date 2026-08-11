# TimePicker Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/TimePicker/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - TimePicker.ts (코어 Lit 템플릿)
   - TimePicker.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - TimePicker.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - TimePicker.react.ts (@lit/react 기반 React 래퍼)
   - TimePicker.stories.ts (Storybook 문서 및 a11y 검증)
   - TimePicker.test.ts (Vitest 및 Playwright 테스트)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-time-picker`
   - CSS Design Token / Custom Properties: `--biz-time-picker-*`
   - 루트 CSS 클래스명: `biz-time-picker`
   - Lit 코어 템플릿 export 명칭: `TimePickerTemplate`
   - Lit 스타일 export 변수명: `export const timePickerStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): TimePicker
- 커스텀 엘리먼트 태그명 (kebab-case): biz-time-picker
- Lit 스타일 변수명 (camelCase): timePickerStyles

[요구사항 정의서]
---
# TimePicker 요구사항 정의서

Input 필드와 시간 선택 팝오버 패널(Time Dropdown Panel)이 결합된 형태 형태로, 시간을 직접 입력하거나 스크롤/클릭을 통해 시각적으로 선택할 수 있는 컨테이너를 제공
## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Time Input Control`: 시간 텍스트를 직접 입력받는 필드 및 시간 선택 패널을 토글하는 트리거 영역
- `Time Icon`: 클릭 시 시간 선택 패널을 토글하는 아이콘 영역
- `Time Dropdown Panel`: 시(Hour), 분(Minute), 초(Second), AM/PM 선택 리스트로 구성된 부유 레이어
- `Time Column`: 시, 분, 초, AM/PM 각각을 스크롤/클릭하여 선택할 수 있는 수직 옵션 리스트
- `Clear Button`: 입력된 시간을 일괄 삭제하는 초기화 버튼
- `Action Footer`: 현재 시간(Now) 선택, 확인/취소 버튼 등이 위치하는 패널 하단 영역

### 1.2. 시간 표출 형식 (Time Formats)

- `12-Hour System`: AM/PM 구분을 포함하는 12시간제 형식 (예: `hh:mm A`, `hh:mm:ss A`)
- `24-Hour System`: AM/PM 구분 없는 24시간제 형식 (예: `HH:mm`, `HH:mm:ss`)

### 1.3. 형태 옵션 (Variants)

- `Outlined`: 테두리 중심 스타일
- `Filled`: 배경색 중심 스타일
- `Standard`: 하단 경계선 스타일

### 1.4. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.5. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `step`: 시/분/초 단위 간격 제어 (예: 분 단위 5분/15분 간격 스텝 설정)

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

|**슬롯명 (Slot Name)**|**설명 (Description)**|**비고 (Remarks)**|
|---|---|---|
|`label-slot`|상단/좌측 레이블 영역||
|`prefix-slot`|Input Control 내부 좌측 주입 영역||
|`suffix-slot`|Input Control 내부 우측 주입 영역 (시계 아이콘 등)||
|`header-slot`|Time Dropdown Panel 최상단 커스텀 영역||
|`footer-slot`|Time Dropdown Panel 최하단 커스텀 버튼 영역 (현재 시간 선택 등)||
|`option-item-slot`|시/분/초 각 컬럼 내 개별 항목 커스텀 렌더링 영역||
|`helper-text-slot`|하단 안내/에러 메시지 영역||

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

|**속성명**|**타입**|**기본값**|**설명**|
|---|---|---|---|
|`value`|`string \| Date`|`null`|선택된 시간 값 (예: `'14:30:00'`)|
|`format`|`string`|`'HH:mm'`|시간 입력 및 표출 포맷|
|`use12-hours`|`boolean`|`false`|12시간제(AM/PM) 사용 여부|
|`hour-step`|`number`|`1`|시 선택 목록의 증감 간격|
|`minute-step`|`number`|`1`|분 선택 목록의 증감 간격|
|`second-step`|`number`|`1`|초 선택 목록의 증감 간격|
|`show-seconds`|`boolean`|`false`|초 선택 컬럼 노출 여부|
|`disabled-hours`|`Function`|`null`|비활성화할 시(Hour) 목록 반환 함수|
|`disabled-minutes`|`Function`|`null`|비활성화할 분(Minute) 목록 반환 함수|
|`disabled-seconds`|`Function`|`null`|비활성화할 초(Second) 목록 반환 함수|
|`placeholder`|`string`|`'HH:mm'`|플레이스홀더 텍스트|
|`clearable`|`boolean`|`false`|선택된 시간 초기화 버튼 노출 여부|
|`readonly`|`boolean`|`false`|읽기 전용 여부 (텍스트 입력 및 패널 차단)|
|`disabled`|`boolean`|`false`|비활성화 여부|
|`error`|`boolean`|`false`|유효성 에러 상태 여부|

### 3.2. 상태 (States)

- **Closed (Default)**: 시간 선택 패널이 닫혀 있는 기본 상태
- **Open**: 클릭 또는 키보드 조작으로 시간 선택 패널이 펼쳐진 상태
- **Hover**: 컬럼 항목 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 키보드 탐색 중 입력 필드 또는 컬럼 항목 강조 상태
- **Selected**: 각 컬럼에서 특정 시간 단위가 선택된 상태
- **Disabled Option**: 비활성화된 시간 옵션 상태 (Dim 처리 및 클릭 불가)
- **Disabled / Readonly**: 전체 컴포넌트 비활성화 및 읽기 전용 상태
- **Error**: 유효성 검사 실패 상태 (포맷 불일치, 허용되지 않은 시간 입력 등)

### 3.3. 이벤트 (Events)

|**이벤트명**|**상세 (Detail)**|**발생 시점**|
|---|---|---|
|`change`|`{ value: string, time: Date }`|시간 선택 또는 입력 확정 시 방출|
|`input`|`{ rawValue: string }`|Input 필드 직접 타이핑 시 방출|
|`open`|`void`|시간 선택 패널이 열릴 때 방출|
|`close`|`void`|시간 선택 패널이 닫힐 때 방출|
|`clear`|`void`|초기화 버튼 클릭으로 값 삭제 시 방출|

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-timepicker-height-sm: 32px;
  --ui-timepicker-height-md: 40px;
  --ui-timepicker-height-lg: 48px;
  --ui-timepicker-padding-x: 12px;
  --ui-timepicker-border-radius: 4px;
  --ui-timepicker-panel-width: 200px;
  --ui-timepicker-column-height: 220px;
  --ui-timepicker-item-height: 32px;

  /* Colors - Base */
  --ui-timepicker-bg: #ffffff;
  --ui-timepicker-border-color: #d1d5db;
  --ui-timepicker-text-color: #111827;
  --ui-timepicker-placeholder-color: #9ca3af;

  /* Colors - Panel & Item */
  --ui-timepicker-panel-bg: #ffffff;
  --ui-timepicker-panel-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --ui-timepicker-item-hover-bg: #f3f4f6;
  --ui-timepicker-item-selected-bg: #eff6ff;
  --ui-timepicker-item-selected-text: #2563eb;
  --ui-timepicker-item-disabled-text: #d1d5db;

  /* Colors - Interactive States */
  --ui-timepicker-hover-border-color: #9ca3af;
  --ui-timepicker-focus-border-color: #2563eb;
  --ui-timepicker-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-timepicker-error-color: #dc2626;
  --ui-timepicker-disabled-bg: #f3f4f6;
  --ui-timepicker-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="combobox"`**: Time Input Control 영역에 바인딩
- **`aria-expanded`**: 패널 열림 여부에 따라 `'true'`, `'false'` 동적 변경
- **`aria-haspopup="listbox"`**: 시간 선택 패널의 레이어 형태 전달
- **`role="listbox"`**: 시/분/초/AM-PM 각 선택 컬럼에 바인딩
- **`role="option"`**: 컬럼 내부의 개별 시간 항목에 바인딩하며 선택된 항목에 `aria-selected="true"` 지정
- **`aria-disabled="true"`**: 선택 불가능한 시간 항목에 바인딩

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`ArrowLeft` / `ArrowRight`**: 패널 내 컬럼 간(시, 분, 초, AM/PM) 포커스 이동
- **`ArrowDown` / `ArrowUp`**: 현재 포커스된 컬럼 내에서 이전/다음 시간 옵션 항목으로 이동
- **`Enter` / `Space`**: 포커스된 시간 옵션 항목 선택 확정
- **`Escape`**: 열려 있는 시간 선택 패널을 닫고 Input Control로 포커스 복귀

### 5.3. 스크린 리더 대응

- 컬럼 항목 이동 시 현재 포커스된 컬럼과 값(예: "시, 14시", "분, 30분")을 스크린 리더가 명확히 음성 출력하도록 `aria-label`을 동적으로 제공하며, 전체 시간 선택 완료 시 최종 선택된 전체 시각을 `aria-live="polite"` 영역을 통해 실시간 전달합니다.
---

위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`TimePicker.ts`)과 전용 Lit 스타일시트(`TimePicker.css.ts`) 코드를 작성해 주세요.

[작성 조건 - TimePicker.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `TimePickerTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.

[작성 조건 - TimePicker.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const timePickerStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-time-picker-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-time-picker`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/TimePicker/TimePicker.ts`, `src/components/TimePicker/TimePicker.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`TimePicker.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - TimePicker.wc.ts]
1. `LitElement`를 상속받아 클래스를 구현하고, `@customElement('biz-time-picker')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `TimePickerTemplate` 및 `TimePicker.css.ts`의 `timePickerStyles`를 임포트하세요.
3. 정적 클래스 속성으로 `static styles = timePickerStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `TimePickerTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/TimePicker/TimePicker.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`TimePicker.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - TimePicker.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `TimePickerWc` 클래스와 커스텀 엘리먼트 태그명(`biz-time-picker`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/TimePicker/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`TimePickerTemplate`), 스타일(`timePickerStyles`), 웹 컴포넌트 클래스(`TimePickerWc`), React 래퍼 컴포넌트(`TimePicker`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/TimePicker/TimePicker.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/TimePicker/TimePicker.react.ts`, `src/components/TimePicker/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 및 테스트 코드 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 및 테스트 코드 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`TimePicker.stories.ts`)과 단위/통합 테스트 파일(`TimePicker.test.ts`) 코드를 작성해 주세요.

[작성 조건 - TimePicker.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
3. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
4. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.

[작성 조건 - TimePicker.test.ts]
1. Vitest 및 Playwright 환경에서 실행 가능한 테스트 스위트를 구현하세요.
2. [단위 테스트]: Properties 변경에 따른 DOM 반영, 3.3절 커스텀 이벤트(`input`, `change`, `clear` 등) 방출 여부 및 `detail` 데이터 검증을 수행하세요.
3. [통합 및 접근성 테스트]: 5.1절 ARIA 속성(`aria-invalid`, `aria-describedby` 등) 바인딩 및 5.2절 키보드 네비게이션(`Tab`, `Escape`, `Enter` 등) 동작을 브라우저 상에서 검증하는 시나리오를 구현하세요.

[출력 형식]
- 각 파일별 경로(`src/components/TimePicker/TimePicker.stories.ts`, `src/components/TimePicker/TimePicker.test.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
