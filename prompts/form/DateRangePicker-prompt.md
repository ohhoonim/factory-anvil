# DateRangePicker Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/DateRangePicker/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - DateRangePicker.ts (코어 Lit 템플릿)
   - DateRangePicker.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - DateRangePicker.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - DateRangePicker.react.ts (@lit/react 기반 React 래퍼)
   - DateRangePicker.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-date-range-picker`
   - Lit 엘리먼트 클래스명: `BizDateRangePicker`
   - CSS Design Token / Custom Properties: `--biz-date-range-picker-*`
   - 루트 CSS 클래스명: `biz-date-range-picker`
   - Lit 코어 템플릿 export 명칭: `DateRangePickerTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`DateRangePickerHost` 
   - Lit 스타일 export 변수명: `export const dateRangePickerStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizDateRangePicker
- 커스텀 엘리먼트 태그명 (kebab-case): biz-date-range-picker
- Lit 스타일 변수명 (camelCase): dateRangePickerStyles

[요구사항 정의서]
---
# DateRangePicker 요구사항 정의서 

하나의 필드 또는 연결된 두 개의 필드를 통해 시작일과 종료일을 지정하고, 날짜 범위(Range)를 달력상에서 시각적으로 강조 표시하는 컨테이너를 제공.

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Range Input Control`: 시작일(Start Date)과 종료일(End Date)을 직접 입력받는 필드 및 팝오버를 토글하는 트리거 영역
- `Range Separator`: 시작일과 종료일 입력 필드 사이에 위치하는 구분자 (예: `-`, `~`, `→`)
- `Calendar Icon`: 클릭 시 날짜 범위 선택 팝오버를 토글하는 아이콘 영역
- `Date Range Popover`: 2개월(Dual) 또는 1개월(Single) 달력 그리드와 범위 시각화 레이어로 구성된 부유 레이어
- `Day Grid & Range Highlight`: 선택된 시작일, 종료일 및 그 사이의 범위(Range Interval)를 시각적으로 연결하여 강조하는 일자 그리드
- `Presets Sidebar`: '오늘', '최근 7일', '이번 달', '지난 달' 등 자주 사용하는 기간을 빠르게 선택하는 프릿셋 구획
- `Clear Button`: 입력된 기간을 일괄 삭제하는 초기화 버튼
- `Action Footer`: '확인(Apply)', '취소' 버튼 등으로 구성된 팝오버 하단 액션 구획

### 1.2. Input 형태 옵션 (Input Variants)

- `Single Input`: 하나의 Input 필드 내에 시작일과 종료일을 함께 표출/입력하는 형태 (예: `2026-08-01 ~ 2026-08-07`)
- `Double Input`: 시작일 Input과 종료일 Input이 독립된 두 개의 필드로 연결된 형태

### 1.3. 팝오버 달력 배치 모드 (Calendar Layout Modes)

- `Dual Calendar`: 연속된 2개의 달력(지난달/이번달 또는 이번달/다음달)이 나란히 배치되어 넓은 범위 선택을 지원하는 형태
- `Single Calendar`: 단일 달력 내에서 시작일과 종료일을 순차 클릭하여 선택하는 compact 형태

### 1.4. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.5. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `format`: 날짜 표시/입력 포맷 지정 (예: `YYYY-MM-DD`)

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

|**슬롯명 (Slot Name)**|**설명 (Description)**|**비고 (Remarks)**|
|---|---|---|
|`label-slot`|상단/좌측 레이블 영역||
|`prefix-slot`|Range Input Control 내부 좌측 주입 영역||
|`separator-slot`|시작일과 종료일 필드 사이 구분자 커스텀 영역|기본값: `~`|
|`suffix-slot`|Range Input Control 내부 우측 주입 영역 (달력 아이콘 등)||
|`presets-slot`|팝오버 좌측/상단 사전 정의 기간 선택 버튼 영역||
|`header-slot`|Popover Panel 최상단 커스텀 헤더 영역||
|`footer-slot`|Popover Panel 최하단 커스텀 버튼 영역 (적용/취소 등)||
|`date-cell-slot`|일자 그리드 내 개별 날짜 커스텀 렌더링 영역||
|`helper-text-slot`|하단 안내/에러 메시지 영역||

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

|**속성명**|**타입**|**기본값**|**설명**|
|---|---|---|---|
|`value`|`Array<string \| Date>`|`[null, null]`|선택된 날짜 범위 `[startDate, endDate]`|
|`format`|`string`|`'YYYY-MM-DD'`|날짜 표출 및 입력 포맷|
|`calendar-mode`|`string`|`'dual'`|팝오버 달력 개수 (`dual`, `single`)|
|`input-mode`|`string`|`'double'`|입력 필드 구성 형태 (`single`, `double`)|
|`min-date`|`string \| Date`|`null`|선택 가능한 최소 날짜|
|`max-date`|`string \| Date`|`null`|선택 가능한 최대 날짜|
|`min-range`|`number`|`null`|선택 가능한 최소 일수 (예: 최소 2일 이상)|
|`max-range`|`number`|`null`|선택 가능한 최대 일수 (예: 최대 30일 이내)|
|`disabled-dates`|`Array \| Function`|`[]`|비활성화할 특정 날짜 목록 또는 판별 함수|
|`presets`|`Array<PresetObject>`|`[]`|빠른 기간 선택 옵션 목록|
|`placeholder`|`Array<string> \| string`|`['시작일', '종료일']`|플레이스홀더 텍스트|
|`clearable`|`boolean`|`false`|선택 범위 초기화 버튼 노출 여부|
|`readonly`|`boolean`|`false`|읽기 전용 여부 (입력 및 팝오버 차단)|
|`disabled`|`boolean`|`false`|비활성화 여부|
|`error`|`boolean`|`false`|유효성 에러 상태 여부 (범위 역전, 제한 초과 등)|

### 3.2. 상태 (States)

- **Closed (Default)**: 날짜 범위 팝오버가 닫혀 있는 기본 상태
- **Open**: 클릭 또는 키보드 조작으로 팝오버가 펼쳐진 상태
- **Selecting Start Date**: 시작일을 선택하기 위해 기다리는 상태
- **Selecting End Date**: 시작일 선택 완료 후 종료일을 선택하기 위해 기다리는 상태
- **Range Hover**: 시작일 선택 후 종료일 지점으로 마우스 이동 시 선택될 범위가 미리보기 강조되는 상태
- **Range Selected**: 시작일과 종료일이 모두 선택되어 범위 영역(In-range)이 연결 배경색으로 표시되는 상태
- **Disabled Cell**: min/max/disabled-dates 조건에 의해 선택 불가능한 날짜 상태 (Dim 처리)
- **Disabled / Readonly**: 전체 컴포넌트 비활성화 및 읽기 전용 상태
- **Error**: 시작일이 종료일보다 늦거나, min/max-range 제한을 위반한 경우의 에러 상태

### 3.3. 이벤트 (Events)

|**이벤트명**|**상세 (Detail)**|**발생 시점**|
|---|---|---|
|`change`|`{ value: [Date, Date], formattedValue: [string, string] }`|범위 선택 확정 시 방출|
|`input`|`{ rawValue: string \| [string, string] }`|Input 필드 직접 타이핑 시 방출|
|`range-start-select`|`{ startDate: Date }`|시작일 선택 시 방출|
|`range-end-select`|`{ endDate: Date }`|종료일 선택 시 방출|
|`open`|`void`|팝오버 패널이 열릴 때 방출|
|`close`|`void`|팝오버 패널이 닫힐 때 방출|
|`clear`|`void`|초기화 버튼 클릭으로 선택 범위 삭제 시 방출|

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-daterangepicker-height-sm: 32px;
  --ui-daterangepicker-height-md: 40px;
  --ui-daterangepicker-height-lg: 48px;
  --ui-daterangepicker-padding-x: 12px;
  --ui-daterangepicker-border-radius: 4px;
  --ui-daterangepicker-popover-width: 620px; /* Dual Calendar 기준 */
  --ui-daterangepicker-cell-size: 36px;

  /* Colors - Base */
  --ui-daterangepicker-bg: #ffffff;
  --ui-daterangepicker-border-color: #d1d5db;
  --ui-daterangepicker-text-color: #111827;
  --ui-daterangepicker-placeholder-color: #9ca3af;

  /* Colors - Selection & Range Highlight */
  --ui-daterangepicker-popover-bg: #ffffff;
  --ui-daterangepicker-popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --ui-daterangepicker-cell-hover-bg: #f3f4f6;
  --ui-daterangepicker-range-start-bg: #2563eb;
  --ui-daterangepicker-range-start-text: #ffffff;
  --ui-daterangepicker-range-end-bg: #2563eb;
  --ui-daterangepicker-range-end-text: #ffffff;
  --ui-daterangepicker-in-range-bg: #eff6ff; /* 범위 구간 연결 배경색 */
  --ui-daterangepicker-in-range-text: #1d4ed8;
  --ui-daterangepicker-cell-disabled-text: #d1d5db;

  /* Colors - Interactive States */
  --ui-daterangepicker-hover-border-color: #9ca3af;
  --ui-daterangepicker-focus-border-color: #2563eb;
  --ui-daterangepicker-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-daterangepicker-error-color: #dc2626;
  --ui-daterangepicker-disabled-bg: #f3f4f6;
  --ui-daterangepicker-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="combobox"`**: DateRange Input Control 영역에 바인딩
- **`aria-expanded`**: 팝오버 열림 여부에 따라 `'true'`, `'false'` 동적 변경
- **`aria-haspopup="dialog"`**: 범위 선택 팝오버의 레이어 형태 전달
- **`role="grid"`**: 달력 일자 그리드 영역에 바인딩 (Dual Calendar일 경우 각각의 그리드 명시)
- **`role="gridcell"`**: 개별 날짜 셀에 바인딩
- **`aria-selected="true"`**: 시작일 및 종료일 셀에 지정
- **`aria-disabled="true"`**: 선택 불가능한 날짜 셀에 바인딩

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`ArrowDown` / `ArrowUp` / `ArrowLeft` / `ArrowRight`**: 달력 그리드 내에서 일 단위(좌/우) 및 주 단위(상/하)로 포커스 이동 (Dual Calendar 간 연속 포커스 이동 지원)
- **`PageUp` / `PageDown`**: 이전 달 / 다음 달로 이동
- **`Enter` / `Space`**: 포커스된 날짜를 시작일 또는 종료일로 선택
- **`Escape`**: 열려 있는 범위 선택 팝오버를 닫고 현재 포커스된 Input Control로 복귀

### 5.3. 스크린 리더 대응

- 날짜 이동 시 현재 포커스된 날짜와 선택 상태(예: "2026년 8월 1일 시작일로 선택됨", "2026년 8월 7일 종료일로 선택됨", "범위 포함 구간")를 스크린 리더가 명확하게 음성 출력하도록 `aria-label`을 동적으로 구성하고, 기간 선택 완료 시 전체 기간 정보를 `aria-live="polite"` 영역을 통해 실시간 전달합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`DateRangePicker.ts`)과 전용 Lit 스타일시트(`DateRangePicker.css.ts`) 코드를 작성해 주세요.

[작성 조건 - DateRangePicker.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `DateRangePickerTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `DateRangePickerHost` 명칭으로 export 하세요.

[작성 조건 - DateRangePicker.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const dateRangePickerStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-date-range-picker-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-date-range-picker`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/DateRangePicker/DateRangePicker.ts`, `src/components/DateRangePicker/DateRangePicker.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`DateRangePicker.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - DateRangePicker.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `DateRangePickerHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-date-range-picker')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `DateRangePickerTemplate` 및 `DateRangePicker.css.ts`의 `dateRangePickerStyles`를 임포트하세요. `DateRangePickerHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = dateRangePickerStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `DateRangePickerTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/DateRangePicker/DateRangePicker.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`DateRangePicker.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - DateRangePicker.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `DateRangePickerWc` 클래스와 커스텀 엘리먼트 태그명(`biz-date-range-picker`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/DateRangePicker/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`DateRangePickerTemplate`), 스타일(`dateRangePickerStyles`), 웹 컴포넌트 클래스(`DateRangePickerWc`), React 래퍼 컴포넌트(`DateRangePicker`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/DateRangePicker/DateRangePicker.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/DateRangePicker/DateRangePicker.react.ts`, `src/components/DateRangePicker/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`DateRangePicker.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - DateRangePicker.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `DateRangePickerHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 DateRangePicker.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요.

[출력 형식]
- 파일 경로(`src/components/DateRangePicker/DateRangePicker.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
