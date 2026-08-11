# Slider 요구사항 정의서

트랙(Track)을 따라 핸들(Thumb)을 드래그하거나 클릭하여 연속되거나 이산적인 수치 범위 내에서 단일 값 또는 범위 값(시작~끝)을 선택하는 인터페이스를 제공
## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Track`: 슬라이더의 전체 이동 수치 범위를 나타내는 배경 선
- `Range Track (Fill)`: 시작점부터 현재 값까지, 또는 범위 슬라이더의 시작 핸들부터 끝 핸들까지의 활성화된 구간을 시각적으로 연결하는 선
- `Thumb`: 사용자가 드래그하거나 클릭하여 값을 조정하는 원형/사각형 형태의 제어 핸들
- `Tick Marks & Labels`: 이산적(Discrete) 수치 단위 위치를 표시하는 눈금 및 보조 수치 레이블 영역
- `Value Tooltip`: Thumb에 포커스되거나 드래그 중일 때 현재 선택된 값을 실시간으로 보여주는 팝오버 툴팁

### 1.2. 형태 및 작동 모드 (Variants & Operating Modes)

- `Single Value`: 하나의 Thumb을 통해 단일 수치 값을 선택하는 모드
- `Range (Dual Thumb)`: 두 개의 Thumb(시작, 끝)을 통해 특정 수치 범위를 선택하는 모드
- `Continuous`: 지정된 min~max 범위 내에서 연속적인 소수점/정수 값을 자유롭게 선택하는 형태
- `Discrete`: `step` 간격 단위로만 Thumb이 스냅(Snap)되어 움직이는 이산적 선택 형태
- `Orientation`: 슬라이더 배치 방향 (`horizontal`: 가로, `vertical`: 세로)

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 상위 폼 연동 (Form Integration)

- Native HTML Input(`type="range"`) 지원 및 `name`, `form` 속성 바인딩을 통한 폼 제출 동기화

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**                        | **비고 (Remarks)** |
| ------------------- | ------------------------------------------- | ---------------- |
| `label-slot`        | 상단/좌측 컴포넌트 타이틀 레이블 영역                       |                  |
| `prefix-icon-slot`  | 슬라이더 좌측/최소값 위치에 배치되는 아이콘 영역 (예: 음량 줄이기 아이콘) |                  |
| `suffix-icon-slot`  | 슬라이더 우측/최대값 위치에 배치되는 아이콘 영역 (예: 음량 키우기 아이콘) |                  |
| `tooltip-slot`      | Thumb 상단 Value Tooltip 내부 커스텀 렌더링 영역        | 단위 표기, 포맷팅 등     |
| `tick-label-slot`   | 눈금(Tick Mark) 하단/측면 단위 레이블 커스텀 영역           |                  |
| `helper-text-slot`  | 하단 안내/에러 메시지 영역                             |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**          | **타입**                    | **기본값**        | **설명**                                        |
| ---------------- | ------------------------- | -------------- | --------------------------------------------- |
| `value`          | `number \| Array<number>` | `0`            | 선택된 값 (Single: 단일 숫자, Range: `[start, end]`)  |
| `min`            | `number`                  | `0`            | 선택 가능한 최소 수치                                  |
| `max`            | `number`                  | `100`          | 선택 가능한 최대 수치                                  |
| `step`           | `number`                  | `1`            | 이동 수치 간격 (이산적 스냅 단위)                          |
| `mode`           | `string`                  | `'single'`     | 동작 모드 (`single`, `range`)                     |
| `orientation`    | `string`                  | `'horizontal'` | 배치 방향 (`horizontal`, `vertical`)              |
| `show-ticks`     | `boolean`                 | `false`        | `step` 단위 눈금 표시 여부                            |
| `show-tooltip`   | `string`                  | `'hover'`      | 툴팁 노출 조건 (`always`, `hover`, `drag`, `never`) |
| `format-tooltip` | `Function`                | `null`         | 툴팁에 표시될 수치 포맷팅 함수                             |
| `readonly`       | `boolean`                 | `false`        | 읽기 전용 여부                                      |
| `disabled`       | `boolean`                 | `false`        | 비활성화 여부                                       |
| `error`          | `boolean`                 | `false`        | 유효성 에러 상태 여부                                  |

### 3.2. 상태 (States)

- **Default**: 값이 설정되어 있는 기본 상태
- **Hover**: Track 또는 Thumb 마우스 오버 시 시각적 강조
- **Active / Dragging**: Thumb을 클릭하여 드래그 중인 상태 (Thumb 확대 및 툴팁 표출)
- **Focus / Focus-visible**: 키보드 조작을 위해 Thumb에 포커스가 진입한 상태 (포커스 링 표시)
- **Disabled**: 비활성화 (인터랙션 및 값 변경 불가, Dim 처리)
- **Readonly**: 읽기 전용 (현재 값 표시 유지, 드래그/클릭 변경 불가)
- **Error**: 허용되지 않은 수치 범위 입력 등의 에러 강조 상태

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)**                 | **발생 시점**                           |
| -------- | ------------------------------- | ----------------------------------- |
| `input`  | `{ value: number \| number[] }` | Thumb 드래그 중 수치가 변경될 때마다 연속 방출       |
| `change` | `{ value: number \| number[] }` | 드래그 종료(마우스 뗌) 또는 키보드 조작으로 값 확정 시 방출 |
| `focus`  | `FocusEvent`                    | Thumb에 포커스 진입 시 방출                  |
| `blur`   | `FocusEvent`                    | Thumb에서 포커스 해제 시 방출                 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-slider-track-height: 6px;
  --ui-slider-thumb-size-sm: 14px;
  --ui-slider-thumb-size-md: 18px;
  --ui-slider-thumb-size-lg: 22px;
  --ui-slider-tick-size: 4px;

  /* Colors - Base Track & Fill */
  --ui-slider-track-bg: #e5e7eb;
  --ui-slider-range-fill-bg: #2563eb;

  /* Colors - Thumb & Tooltip */
  --ui-slider-thumb-bg: #ffffff;
  --ui-slider-thumb-border-color: #2563eb;
  --ui-slider-thumb-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  --ui-slider-tooltip-bg: #1f2937;
  --ui-slider-tooltip-text-color: #ffffff;

  /* Colors - Interactive States */
  --ui-slider-thumb-hover-bg: #eff6ff;
  --ui-slider-focus-ring-color: rgba(37, 99, 235, 0.3);

  /* Colors - Error & Disabled */
  --ui-slider-error-color: #dc2626;
  --ui-slider-disabled-track-bg: #f3f4f6;
  --ui-slider-disabled-fill-bg: #9ca3af;
  --ui-slider-disabled-thumb-border: #d1d5db;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="slider"`**: 각 Thumb 요소에 바인딩
- **`aria-valuenow`**: 현재 바인딩된 수치 값 동적 연동
- **`aria-valuemin`**: `min` 속성 값 지정
- **`aria-valuemax`**: `max` 속성 값 지정
- **`aria-orientation`**: 배치 방향에 따라 `'horizontal'` 또는 `'vertical'` 지정
- **`aria-valuetext`**: 단순 숫자가 아닌 포맷팅된 값(예: "20,000원", "50%")을 전달할 때 제공
- **`aria-labelledby`** 또는 **`aria-label`**: 슬라이더의 용도를 설명하는 레이블 연결

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`ArrowRight` / `ArrowUp`**: 수치를 `step` 단위만큼 증가
- **`ArrowLeft` / `ArrowDown`**: 수치를 `step` 단위만큼 감소
- **`PageUp`**: 수치를 큰 단위(기본 `step * 10` 또는 지정값)만큼 증가
- **`PageDown`**: 수치를 큰 단위만큼 감소
- **`Home`**: 수치를 `min` 값으로 즉시 변경
- **`End`**: 수치를 `max` 값으로 즉시 변경

### 5.3. 스크린 리더 대응

- 키보드 이동으로 수치 변경 시 변경된 `aria-valuenow` 및 `aria-valuetext`를 스크린 리더가 즉시 음성 출력하도록 구현하며, Range 모드인 경우 각각의 Thumb이 시작(Start) 및 끝(End) 제어 요소임을 명확히 구분하여 음성 전달합니다.