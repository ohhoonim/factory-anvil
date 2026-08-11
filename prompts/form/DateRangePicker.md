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