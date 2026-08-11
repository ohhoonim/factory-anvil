# DatePicker 요구사항 정의서

Input 필드와 달력 팝오버(Calendar Popover)가 결합된 형태 형태로, 날짜를 직접 입력하거나 달력에서 시각적으로 선택할 수 있는 컨테이너를 제공
## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Date Input Control`: 날짜 텍스트를 직접 입력받는 필드 및 달력 팝오버를 호출하는 트리거 영역
- `Calendar Icon`: 클릭 시 달력 팝오버를 토글하는 아이콘 영역
- `Calendar Popover`: 년/월 이동, 연도/월 선택 헤더, 요일 표시줄, 일자 그리드로 구성된 부유 레이어
- `Header Controls`: 이전/다음 달 이동 버튼, 년/월 빠른 선택 드롭다운 또는 클릭 영역
- `Day Grid`: 7열(일~토) 구조의 일자 선택 그리드
- `Clear Button`: 입력된 날짜를 일괄 삭제하는 초기화 버튼
- `Action Footer`: 오늘(Today) 선택, 확인/취소 버튼 등이 위치하는 팝오버 하단 영역

### 1.2. 동작 모드 (Operating Modes)

- `Single Date`: 단일 날짜 선택 모드
- `Range Date`: 시작일과 종료일을 하나의 컨테이너 또는 연동된 입력 필드에서 지정하는 기간 선택 모드

### 1.3. 형태 옵션 (Variants)

- `Outlined`: 테두리 중심 스타일
- `Filled`: 배경색 중심 스타일
- `Standard`: 하단 경계선 스타일

### 1.4. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.5. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `format`: 날짜 표시 및 입력 포맷 지정 (예: `YYYY-MM-DD`, `YYYY.MM.DD`)

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**                     | **비고 (Remarks)** |
| ------------------- | ---------------------------------------- | ---------------- |
| `label-slot`        | 상단/좌측 레이블 영역                             |                  |
| `prefix-slot`       | Input Control 내부 좌측 주입 영역                |                  |
| `suffix-slot`       | Input Control 내부 우측 주입 영역 (달력 아이콘 등)     |                  |
| `header-slot`       | Calendar Popover 최상단 커스텀 헤더 영역           |                  |
| `footer-slot`       | Calendar Popover 최하단 커스텀 버튼 영역 (오늘 선택 등) |                  |
| `date-cell-slot`    | 일자 그리드 내 개별 날짜 커스텀 렌더링 영역 (일정 표시 등)      |                  |
| `helper-text-slot`  | 하단 안내/에러 메시지 영역                          |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**          | **타입**                    | **기본값**        | **설명**                                     |
| ---------------- | ------------------------- | -------------- | ------------------------------------------ |
| `value`          | `string \| Date \| Array` | `null`         | 선택된 날짜 값 (Single: 단일 값, Range: [시작일, 종료일]) |
| `format`         | `string`                  | `'YYYY-MM-DD'` | 날짜 입력 및 표출 포맷                              |
| `mode`           | `string`                  | `'single'`     | 선택 모드 (`single`, `range`)                  |
| `min-date`       | `string \| Date`          | `null`         | 선택 가능한 최소 날짜                               |
| `max-date`       | `string \| Date`          | `null`         | 선택 가능한 최대 날짜                               |
| `disabled-dates` | `Array \| Function`       | `[]`           | 비활성화할 특정 날짜 목록 또는 판별 함수                    |
| `placeholder`    | `string`                  | `'YYYY-MM-DD'` | 플레이스홀더 텍스트                                 |
| `clearable`      | `boolean`                 | `false`        | 선택된 날짜 초기화 버튼 노출 여부                        |
| `readonly`       | `boolean`                 | `false`        | 읽기 전용 여부 (텍스트 입력 및 팝오버 차단)                 |
| `disabled`       | `boolean`                 | `false`        | 비활성화 여부                                    |
| `error`          | `boolean`                 | `false`        | 유효성 에러 상태 여부                               |

### 3.2. 상태 (States)

- **Closed (Default)**: 달력 팝오버가 닫혀 있는 기본 상태
- **Open**: 클릭 또는 키보드 조작으로 달력 팝오버가 펼쳐진 상태
- **Hover**: 날짜 셀 마우스 오버 시 시각적 피드백 (Range 모드 시 선택 범위 미리보기)
- **Focus / Focus-visible**: 키보드 탐색 중 입력 필드 또는 달력 날짜 셀 강조 상태
- **Selected**: 날짜가 선택된 상태
- **Disabled Date**: 선택 불가능한 날짜 상태 (Dim 처리 및 클릭 불가)
- **Disabled / Readonly**: 전체 컴포넌트 비활성화 및 읽기 전용 상태
- **Error**: 유효성 검사 실패 상태 (포맷 불일치, 범위 벗어남 등)

### 3.3. 이벤트 (Events)

| **이벤트명**       | **상세 (Detail)**                   | **발생 시점**             |
| -------------- | --------------------------------- | --------------------- |
| `change`       | `{ value: any, date: Date }`      | 날짜 선택 또는 입력 확정 시 방출   |
| `input`        | `{ rawValue: string }`            | Input 필드 직접 타이핑 시 방출  |
| `open`         | `void`                            | 달력 팝오버가 열릴 때 방출       |
| `close`        | `void`                            | 달력 팝오버가 닫힐 때 방출       |
| `month-change` | `{ year: number, month: number }` | 달력의 연/월이 변경될 때 방출     |
| `clear`        | `void`                            | 초기화 버튼 클릭으로 값 삭제 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-datepicker-height-sm: 32px;
  --ui-datepicker-height-md: 40px;
  --ui-datepicker-height-lg: 48px;
  --ui-datepicker-padding-x: 12px;
  --ui-datepicker-border-radius: 4px;
  --ui-datepicker-popover-width: 280px;
  --ui-datepicker-cell-size: 36px;

  /* Colors - Base */
  --ui-datepicker-bg: #ffffff;
  --ui-datepicker-border-color: #d1d5db;
  --ui-datepicker-text-color: #111827;
  --ui-datepicker-placeholder-color: #9ca3af;

  /* Colors - Popover & Calendar Cell */
  --ui-datepicker-popover-bg: #ffffff;
  --ui-datepicker-popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --ui-datepicker-cell-hover-bg: #f3f4f6;
  --ui-datepicker-cell-selected-bg: #2563eb;
  --ui-datepicker-cell-selected-text: #ffffff;
  --ui-datepicker-cell-range-bg: #eff6ff;
  --ui-datepicker-cell-disabled-text: #d1d5db;

  /* Colors - Interactive States */
  --ui-datepicker-hover-border-color: #9ca3af;
  --ui-datepicker-focus-border-color: #2563eb;
  --ui-datepicker-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-datepicker-error-color: #dc2626;
  --ui-datepicker-disabled-bg: #f3f4f6;
  --ui-datepicker-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="combobox"`**: Date Input Control 영역에 바인딩
- **`aria-expanded`**: 팝오버 열림 여부에 따라 `'true'`, `'false'` 동적 변경
- **`aria-haspopup="dialog"`** 또는 **`aria-haspopup="grid"`**: 달력 팝오버 레이어의 형태 전달
- **`role="grid"`**: 일자 그리드 테이블 영역에 바인딩
- **`role="gridcell"`**: 개별 날짜 셀에 바인딩하며 선택된 날짜에 `aria-selected="true"` 지정
- **`aria-disabled="true"`**: 선택 불가능한 날짜 셀에 바인딩

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`ArrowDown` / `ArrowUp` / `ArrowLeft` / `ArrowRight`**: 달력 그리드 내에서 일 단위(좌/우) 및 주 단위(상/하)로 포커스 이동
- **`PageUp` / `PageDown`**: 이전 달 / 다음 달로 이동
- **`Shift + PageUp` / `Shift + PageDown`**: 이전 연도 / 다음 연도로 이동
- **`Enter` / `Space`**: 포커스된 날짜 선택 확정
- **`Escape`**: 열려 있는 달력 팝오버를 닫고 Input Control로 포커스 복귀

### 5.3. 스크린 리더 대응

- 그리드 이동 시 현재 포커스된 날짜의 전체 명칭(예: "2026년 8월 7일 금요일")을 스크린 리더가 명확히 읽어주도록 `aria-label`을 동적으로 바인딩하고, 월 변경 시 변경된 연/월 정보를 `aria-live="polite"` 영역을 통해 실시간 안내합니다.