# RadioButton 요구사항 정의서 

상호 배타적인 옵션 리스트 중 오직 하나의 항목만 선택할 수 있는 배타적 컨트롤을 제공하고, RadioButtonGroup내에서 사용가능한 RadioButton

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Radio Control`: 단일 선택 상태를 표시하는 원형 박스 (선택 시 내부 원형 점 표시)
- `Label`: 라디오 버튼 우측 또는 좌측에 위치하여 선택 항목의 의미를 나타내는 텍스트 영역
- `RadioButtonGroup Context`: 상위 RadioButtonGroup과의 선택 상태, name, disabled 등 상태 및 이벤트를 동기화하는 컨텍스트 연동 구획
- `Helper Text / Description Area`: 단일 라디오 버튼 하단 보조 설명 영역

### 1.2. 형태 및 배치 옵션 (Variants & Placement)

- `Standard`: 원형 라디오 컨트롤 + 레이블 기본 형태
- `Button / Card`: 라디오 컨트롤을 버튼 또는 카드 컨테이너 스타일로 감싼 형태
- `Label Position`: 레이블 위치 제어 (`right`: 컨트롤 우측, `left`: 컨트롤 좌측)

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 상위 그룹 연동 (Group Integration)

- `RadioButtonGroup` 하위 요소로 배치 시 동일한 `name` 및 컨텍스트를 공유하여 배타적 단일 선택 구현
- 상위 그룹의 `value`, `name`, `disabled`, `readonly` 상태를 상속받아 동기화

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**              | **비고 (Remarks)**      |
| ------------------- | --------------------------------- | --------------------- |
| `default`           | 라디오 버튼 우측/좌측 레이블 영역               | 텍스트 및 서브 타이틀 등 커스텀 노출 |
| `icon-slot`         | 선택(`checked`) 상태 내부 표시 아이콘 커스텀 영역 | 기본 원형 점 대체 가능         |
| `description-slot`  | 라디오 버튼 하단 보조 설명 텍스트 영역            |                       |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**          | **타입**                        | **기본값**   | **설명**                           |
| ---------------- | ----------------------------- | --------- | -------------------------------- |
| `checked`        | `boolean`                     | `false`   | 단일 라디오 버튼 선택 여부                  |
| `value`          | `string \| number \| boolean` | `''`      | RadioButtonGroup 내에서 식별자로 사용되는 값 |
| `name`           | `string`                      | `''`      | 폼 식별용 이름 (그룹 제어 시 상속)            |
| `label-position` | `string`                      | `'right'` | 레이블 위치 (`right`, `left`)         |
| `readonly`       | `boolean`                     | `false`   | 읽기 전용 여부                         |
| `disabled`       | `boolean`                     | `false`   | 비활성화 여부 (그룹 제어 시 상속)             |
| `error`          | `boolean`                     | `false`   | 유효성 에러 상태 여부                     |

### 3.2. 상태 (States)

- **Unchecked**: 선택되지 않은 기본 상태
- **Checked**: 단일 선택 완료 상태 (내부 점 표출)
- **Hover**: 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 키보드 포커스 진입 및 포커스 링 표시
- **Disabled**: 비활성화 (인터랙션 및 선택 변경 불가, Dim 처리)
- **Readonly**: 읽기 전용 (선택 상태 유지, 인터랙션 불가)
- **Error**: 필수 선택 미충족 시 시각적 에러 강조

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)**                    | **발생 시점**                   |
| -------- | ---------------------------------- | --------------------------- |
| `change` | `{ checked: boolean, value: any }` | 선택 상태 변경 시 방출 (Group으로도 전달) |
| `focus`  | `FocusEvent`                       | 포커스 진입 시 방출                 |
| `blur`   | `FocusEvent`                       | 포커스 해제 시 방출                 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-radio-size-sm: 16px;
  --ui-radio-size-md: 20px;
  --ui-radio-size-lg: 24px;
  --ui-radio-label-gap: 8px;

  /* Colors - Base */
  --ui-radio-bg: #ffffff;
  --ui-radio-border-color: #d1d5db;
  --ui-radio-text-color: #111827;

  /* Colors - Checked */
  --ui-radio-checked-border-color: #2563eb;
  --ui-radio-checked-icon-color: #2563eb;

  /* Colors - Interactive States */
  --ui-radio-hover-border-color: #9ca3af;
  --ui-radio-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-radio-error-color: #dc2626;
  --ui-radio-disabled-bg: #f3f4f6;
  --ui-radio-disabled-border-color: #e5e7eb;
  --ui-radio-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="radio"`**: 단일 선택 요소임을 명시 (표준 `<input type="radio">` 사용 시 자동 대응)
- **`aria-checked`**: 선택 상태에 따라 `'true'` 또는 `'false'` 동적 연동
- **`aria-invalid`**: `error` 속성 활성화 시 `'true'`로 연동
- **`aria-describedby`**: `description-slot` 영역의 ID와 연결하여 스크린 리더 안내

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 라디오 그룹 전체로 진입 (선택된 라디오 버튼으로 포커스 진입)
- **`ArrowDown` / `ArrowRight`**: 그룹 내 다음 라디오 버튼으로 포커스를 이동하고 해당 항목을 자동 선택
- **`ArrowUp` / `ArrowLeft`**: 그룹 내 이전 라디오 버튼으로 포커스를 이동하고 해당 항목을 자동 선택
- **`Space`**: 포커스된 라디오 버튼을 선택 확정

### 5.3. 스크린 리더 대응

- `RadioButtonGroup` 내에서 동작 시 상위 그룹의 `aria-labelledby` 또는 `aria-label`을 통해 그룹의 전체 범주 정보를 함께 전달하며, 방향키 이동 시 선택 상태가 실시간 반영되어 스크린 리더가 레이블과 "선택됨" 상태를 즉시 음성 출력하도록 구현합니다.