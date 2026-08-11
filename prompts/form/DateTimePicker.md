# DateTimePicker 요구사항 정의서

날짜와 시간을 하나의 컴포넌트에서 연속적으로 또는 동시에 선택하여 단일 일시(DateTime) 데이터를 생성하는 필드 구조를 제공

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `DateTime Input Control`: 날짜 및 시간 텍스트를 직접 입력받거나 팝오버 패널을 토글하는 트리거 영역
- `Calendar & Clock Icon`: 클릭 시 DateTime 팝오버 패널을 토글하는 아이콘 영역
- `DateTime Popover Panel`: DatePicker(달력) 영역과 TimePicker(시간 선택 리스트) 영역이 통합된 부유 레이어
- `Calendar View`: 연/월 이동, 요일 표시줄, 일자 그리드로 구성된 날짜 선택 구획
- `Time View`: 시, 분, 초, AM/PM 스크롤/클릭 선택 리스트로 구성된 시간 선택 구획
- `Clear Button`: 입력된 일시 데이터를 일괄 삭제하는 초기화 버튼
- `Action Footer`: '오늘/현재 시간(Now)', '확인(OK)', '취소' 버튼 등으로 구성된 팝오버 하단 액션 구획

### 1.2. 레이아웃 모드 (Layout Modes)

- `Split / Side-by-Side`: 달력(좌)과 시간 선택 패널(우)이 동시에 나란히 배치된 형태
- `Sequential / Tabbed`: 탭(Tab) 또는 단계 전환을 통해 날짜 선택 후 시간 선택으로 이어지는 연속 선택 형태

### 1.3. 형태 및 크기 옵션 (Variants & Sizes)

- **Variants**: `Outlined`, `Filled`, `Standard`
- **Sizes**: `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `format`: 날짜 및 시간 표시/입력 포맷 지정 (예: `YYYY-MM-DD HH:mm:ss`, `YYYY.MM.DD A hh:mm`)

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

|**슬롯명 (Slot Name)**|**설명 (Description)**|**비고 (Remarks)**|
|---|---|---|
|`label-slot`|상단/좌측 레이블 영역||
|`prefix-slot`|Input Control 내부 좌측 주입 영역||
|`suffix-slot`|Input Control 내부 우측 주입 영역 (달력/시계 아이콘 등)||
|`header-slot`|Popover Panel 최상단 커스텀 영역||
|`footer-slot`|Popover Panel 최하단 커스텀 영역 ('지금 선택' 버튼 등)||
|`date-cell-slot`|일자 그리드 내 개별 날짜 커스텀 렌더링 영역||
|`time-option-slot`|시간 선택 컬럼 내 개별 항목 커스텀 렌더링 영역||
|`helper-text-slot`|하단 안내/에러 메시지 영역||

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

|**속성명**|**타입**|**기본값**|**설명**|
|---|---|---|---|
|`value`|`string \| Date`|`null`|선택된 일시 데이터 (예: `'2026-08-07T16:47:00'`)|
|`format`|`string`|`'YYYY-MM-DD HH:mm'`|날짜 및 시간 표출/입력 포맷|
|`layout-mode`|`string`|`'side-by-side'`|패널 구성 형태 (`side-by-side`, `tabbed`)|
|`use12-hours`|`boolean`|`false`|12시간제(AM/PM) 사용 여부|
|`show-seconds`|`boolean`|`false`|초 선택 컬럼 노출 여부|
|`min-datetime`|`string \| Date`|`null`|선택 가능한 최소 일시|
|`max-datetime`|`string \| Date`|`null`|선택 가능한 최대 일시|
|`disabled-dates`|`Array \| Function`|`[]`|비활성화할 특정 날짜 목록 또는 판별 함수|
|`disabled-hours`|`Function`|`null`|비활성화할 시(Hour) 반환 함수|
|`disabled-minutes`|`Function`|`null`|비활성화할 분(Minute) 반환 함수|
|`placeholder`|`string`|`'YYYY-MM-DD HH:mm'`|플레이스홀더 텍스트|
|`clearable`|`boolean`|`false`|초기화 버튼 노출 여부|
|`readonly`|`boolean`|`false`|읽기 전용 여부 (입력 및 팝오버 차단)|
|`disabled`|`boolean`|`false`|비활성화 여부|
|`error`|`boolean`|`false`|유효성 에러 상태 여부|

### 3.2. 상태 (States)

- **Closed (Default)**: DateTime 팝오버 패널이 닫혀 있는 기본 상태
- **Open**: 클릭 또는 키보드 조작으로 팝오버 패널이 펼쳐진 상태
- **Hover**: 날짜 셀 또는 시간 항목 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 키보드 탐색 중 Input 필드, 날짜 셀, 시간 항목 강조 상태
- **Selected**: 날짜 및 시간 항목이 각각 선택 완료된 상태
- **Disabled Cell / Option**: 허용 범위를 벗어난 비활성화 날짜/시간 상태 (Dim 처리 및 클릭 불가)
- **Disabled / Readonly**: 전체 컴포넌트 비활성화 및 읽기 전용 상태
- **Error**: 포맷 불일치, min/max 범위 초과 등 유효성 검사 실패 상태

### 3.3. 이벤트 (Events)

|**이벤트명**|**상세 (Detail)**|**발생 시점**|
|---|---|---|
|`change`|`{ value: string, date: Date }`|일시 선택 또는 직접 입력 확정 시 방출|
|`input`|`{ rawValue: string }`|Input 필드 직접 타이핑 시 방출|
|`open`|`void`|DateTime 팝오버 패널이 열릴 때 방출|
|`close`|`void`|DateTime 팝오버 패널이 닫힐 때 방출|
|`date-change`|`{ date: Date }`|날짜 영역 선택 변경 시 방출|
|`time-change`|`{ time: string }`|시간 영역 선택 변경 시 방출|
|`clear`|`void`|초기화 버튼 클릭으로 값 삭제 시 방출|

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-datetimepicker-height-sm: 32px;
  --ui-datetimepicker-height-md: 40px;
  --ui-datetimepicker-height-lg: 48px;
  --ui-datetimepicker-padding-x: 12px;
  --ui-datetimepicker-border-radius: 4px;
  --ui-datetimepicker-popover-width: 480px; /* Side-by-Side 기준 */
  --ui-datetimepicker-calendar-width: 280px;
  --ui-datetimepicker-time-width: 200px;
  --ui-datetimepicker-cell-size: 36px;

  /* Colors - Base */
  --ui-datetimepicker-bg: #ffffff;
  --ui-datetimepicker-border-color: #d1d5db;
  --ui-datetimepicker-text-color: #111827;
  --ui-datetimepicker-placeholder-color: #9ca3af;

  /* Colors - Popover & Selection */
  --ui-datetimepicker-popover-bg: #ffffff;
  --ui-datetimepicker-popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --ui-datetimepicker-item-hover-bg: #f3f4f6;
  --ui-datetimepicker-item-selected-bg: #2563eb;
  --ui-datetimepicker-item-selected-text: #ffffff;
  --ui-datetimepicker-item-disabled-text: #d1d5db;

  /* Colors - Interactive States */
  --ui-datetimepicker-hover-border-color: #9ca3af;
  --ui-datetimepicker-focus-border-color: #2563eb;
  --ui-datetimepicker-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-datetimepicker-error-color: #dc2626;
  --ui-datetimepicker-disabled-bg: #f3f4f6;
  --ui-datetimepicker-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="combobox"`**: DateTime Input Control 영역에 바인딩
- **`aria-expanded`**: 팝오버 열림 여부에 따라 `'true'`, `'false'` 동적 연동
- **`aria-haspopup="dialog"`**: 통합 선택 패널 레이어 형태 전달
- **`role="grid"`**: 달력 일자 표 영역에 바인딩
- **`role="listbox"`**: 시간 선택 컬럼 영역에 바인딩
- **`role="gridcell"` / `role="option"`**: 개별 날짜 및 시간 선택 항목에 바인딩하며 선택 항목에 `aria-selected="true"` 지정
- **`aria-disabled="true"`**: 선택 불가능한 날짜 및 시간 항목에 바인딩

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab` / `Shift + Tab`**: Input Control, 달력 영역, 시간 선택 컬럼, 하단 액션 버튼 간 순차 포커스 이동
- **`ArrowDown` / `ArrowUp` / `ArrowLeft` / `ArrowRight`**:
    - 달력 내: 일 단위(좌/우) 및 주 단위(상/하) 포커스 이동
    - 시간 컬럼 내: 시/분/초 컬럼 간 이동 및 항목 간 상/하 탐색
- **`Enter` / `Space`**: 포커스된 날짜/시간 선택 확정 또는 액션 버튼 실행
- **`Escape`**: 열려 있는 DateTime 팝오버 패널을 닫고 Input Control로 포커스 복귀

### 5.3. 스크린 리더 대응

- 날짜 및 시간 탐색 시 포커스된 위치의 전체 정보(예: "2026년 8월 7일 금요일", "오후 4시 47분")를 스크린 리더가 명확하게 안내하도록 `aria-label`을 동적으로 생성하고, 최종 일시 선택 완료 시 `aria-live="polite"` 영역을 통해 조합된 전체 일시 텍스트를 음성 출력합니다.