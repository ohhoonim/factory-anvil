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