# Chip 요구사항 정의서

키워드, 이메일, 태그 형태의 다중 데이터 입력을 위한 Chip/Tag 형태의 UI 레이아웃

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Label`: 상단 또는 좌측에 위치하는 필드 명칭 영역
- `Chip Container`: 입력된 키워드 칩(Chip/Tag)들과 텍스트 입력 필드가 인라인으로 배치되는 컨테이너 영역
- `Chip Item`: 삭제 버튼(`x` 아이콘) 및 텍스트를 포함하는 개별 칩 엘리먼트
- `Input Field`: 새로운 키워드를 입력받는 인라인 텍스트 입력 영역
- `Helper Text / Error Message`: 하단 안내 문구 및 유효성 검사 에러 메시지 영역

### 1.2. 형태 옵션 (Variants)

- `Outlined`: 테두리 중심 스타일
- `Filled`: 배경색 중심 스타일
- `Standard`: 하단 경계선 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**        | **비고 (Remarks)**      |
| ------------------- | --------------------------- | --------------------- |
| `label-slot`        | 상단/좌측 레이블 영역                | 표준 `<label>` 태그 충돌 방지 |
| `start-slot`        | 최좌측 내부 주입 영역 (Prefix 아이콘 등) | RTL 대응 고려 명명          |
| `end-slot`          | 최우측 내부 주입 영역 (Suffix 아이콘 등) |                       |
| `chip-item-slot`    | 개별 칩 아이템 커스텀 주입 영역          | 기본 칩 스타일 대체 가능        |
| `helper-text-slot`  | 하단 안내/에러 메시지 영역             |                       |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**            | **타입**               | **기본값**          | **설명**              |
| ------------------ | -------------------- | ---------------- | ------------------- |
| `value`            | `string[]`           | `[]`             | 입력된 키워드 칩들의 문자열 배열  |
| `placeholder`      | `string`             | `''`             | 플레이스홀더 텍스트          |
| `delimiter`        | `string \| string[]` | `['Enter', ',']` | 칩 생성 구분을 위한 키/문자 목록 |
| `max-chips`        | `number`             | `Infinity`       | 최대 허용 칩 개수          |
| `allow-duplicates` | `boolean`            | `false`          | 중복 키워드 입력 허용 여부     |
| `required`         | `boolean`            | `false`          | 필수 입력 여부            |
| `readonly`         | `boolean`            | `false`          | 읽기 전용 여부            |
| `disabled`         | `boolean`            | `false`          | 비활성화 여부             |
| `error`            | `boolean`            | `false`          | 유효성 에러 상태 여부        |
| `deletable`        | `boolean`            | `true`           | 개별 칩 삭제 버튼 노출 여부    |

### 3.2. 상태 (States)

- **Hover**: 컨테이너 및 개별 칩/삭제 버튼 마우스 오버 시 피드백
- **Focus / Focus-visible**: 인라인 입력 필드 및 개별 칩 선택 시 키보드 포커스 링 표시
- **Disabled**: 비활성화 (인터랙션 불가, 시각적 Dim 처리)
- **Readonly**: 읽기 전용 (칩 추가/삭제 불가, 텍스트 복사 가능)
- **Error**: 유효성 검사 실패 (중복 입력, 최대 개수 초과 등 시각적 에러 강조)
- **Focused-Chip**: 키보드 탐색으로 특정 칩이 선택된 상태

### 3.3. 이벤트 (Events)

| **이벤트명**      | **상세 (Detail)**                                            | **발생 시점**                  |
| ------------- | ---------------------------------------------------------- | -------------------------- |
| `change`      | `{ value: string[] }`                                      | 칩 추가 또는 삭제로 데이터 배열 변경 시 방출 |
| `chip-add`    | `{ addedValue: string, value: string[] }`                  | 새로운 칩 추가 시 방출              |
| `chip-remove` | `{ removedValue: string, index: number, value: string[] }` | 특정 칩 삭제 시 방출               |
| `focus`       | `FocusEvent`                                               | 포커스 진입 시 방출                |
| `blur`        | `FocusEvent`                                               | 포커스 해제 시 방출                |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-chip-container-min-height-sm: 32px;
  --ui-chip-container-min-height-md: 40px;
  --ui-chip-container-min-height-lg: 48px;
  --ui-chip-container-padding-x: 8px;
  --ui-chip-container-padding-y: 4px;
  --ui-chip-gap: 6px;
  --ui-chip-border-radius: 4px;

  /* Individual Chip Styling */
  --ui-chip-item-bg-color: #e5e7eb;
  --ui-chip-item-text-color: #111827;
  --ui-chip-item-height: 24px;
  --ui-chip-item-border-radius: 12px;

  /* Colors - Base */
  --ui-chip-bg-color: #ffffff;
  --ui-chip-border-color: #d1d5db;
  --ui-chip-text-color: #111827;
  --ui-chip-placeholder-color: #9ca3af;

  /* Colors - Interactive States */
  --ui-chip-hover-border-color: #9ca3af;
  --ui-chip-focus-border-color: #2563eb;
  --ui-chip-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-chip-error-color: #dc2626;
  --ui-chip-disabled-bg-color: #f3f4f6;
  --ui-chip-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="grid"`** 또는 **`role="list"`**: 생성된 칩 목록 구조에 맞춰 알맞은 목록역할 부여 (개별 칩은 `role="row"`/`gridcell` 또는 `role="listitem"`)
- **`aria-invalid`**: `error` 속성 활성화 시 `'true'`로 연동
- **`aria-required`**: `required` 속성 활성화 시 `'true'`로 연동
- **`aria-describedby`**: `helper-text-slot` 영역의 ID와 입력 필드를 연결하여 스크린 리더 안내
- **`aria-label`**: 삭제 버튼에 "삭제: [칩 텍스트]" 형태의 접근성 명칭 적용

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Enter / Delimiter`**: 입력 필드에 입력된 문자열을 칩으로 변환 생성
- **`Backspace`**: 입력 필드가 비어있을 때 누르면 가장 마지막 칩 선택 및 연속 입력 시 해당 칩 삭제
- **`ArrowLeft / ArrowRight`**: 인라인 입력 필드와 생성된 개별 칩 간 포커스 이동
- **`Delete`**: 키보드로 포커스된 칩 삭제

### 5.3. 스크린 리더 대응

- 칩이 동적으로 추가되거나 삭제될 때 `aria-live="polite"` 영역을 통해 스크린 리더에 "000 칩이 추가되었습니다" 또는 "000 칩이 삭제되었습니다" 메시지를 음성으로 안내합니다.