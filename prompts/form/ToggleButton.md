# [ToggleButton] 요구사항 정의서

토글 버튼(ToggleButton)은 클릭할 때마다 단일 옵션의 ON/OFF 상태를 전환(체크박스 특성)하거나, 상호 배타적인 옵션 그룹 내에서 하나를 선택(라디오버튼 특성)하는 시각적 눌림/활성화 상태를 즉각적으로 피드백하는 스위치형 인터랙션 엘리먼트입니다.

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- 버튼 컨테이너, 내부 라벨/아이콘 영역, 선택된 시각적 활성화(Pressed) 인디케이터로 구획을 구성합니다. 그룹 단위 구성 시 버튼 그룹 컨테이너를 함께 포함합니다.

### 1.2. 형태 옵션 (Variants)

- `Standard`: 배경이 투명하며, 선택 시 배경색이 채워지는 기본 스타일
- `Outlined`: 테두리가 존재하며, 선택 시 테두리 및 배경 강조 스타일
- `Contained`: 상시 배경색이 있으며, 선택 시 강조 색상으로 전환되는 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `orientation`: 그룹 모드일 때 버튼 배치 방향 (`horizontal` | `vertical`)

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)** | **비고 (Remarks)** |
| --- | --- | --- |
| `start-slot` | 버튼 내부 좌측 주입 영역 (Prefix 아이콘 등) |  |
| `default` (Main Slot) | 버튼 표기 텍스트 또는 콘텐츠 영역 |  |
| `end-slot` | 버튼 내부 우측 주입 영역 (Suffix 아이콘 등) |  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `value` | `string` | `''` | 버튼의 고유 식별 값 (그룹 모드 시 사용) |
| `pressed` | `boolean` | `false` | 단일 버튼의 선택/활성화 여부 (ON/OFF) |
| `multiple` | `boolean` | `false` | 그룹 모드 시 다중 선택 허용 여부 |
| `enforce-selection` | `boolean` | `false` | 그룹 모드 시 최소 1개 이상 선택 유지 여부 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |

### 3.2. 상태 (States)

- **Hover**: 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 키보드 포커스 진입 시 포커스 링 표시
- **Active / Pressed**: 선택/활성화 상태 (시각적 Pressed 스타일 적용)
- **Unpressed**: 미선택/비활성화 상태
- **Disabled**: 비활성화 (인터랙션 불가, 시각적 Dim)

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `change` | `{ pressed: boolean, value: string }` | 토글 상태 변경 시 방출 |
| `toggle-group-change` | `{ value: string | string[] }` | 그룹 모드에서 선택된 값 목록이 변경될 때 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```css
:host {
  /* Layout & Sizing */
  --ui-toggle-btn-height-sm: 28px;
  --ui-toggle-btn-height-md: 36px;
  --ui-toggle-btn-height-lg: 44px;
  --ui-toggle-btn-padding-x: 12px;
  --ui-toggle-btn-padding-y: 6px;
  --ui-toggle-btn-border-radius: 4px;

  /* Colors - Unpressed */
  --ui-toggle-btn-bg-color: #ffffff;
  --ui-toggle-btn-border-color: #d1d5db;
  --ui-toggle-btn-text-color: #374151;

  /* Colors - Pressed (Active) */
  --ui-toggle-btn-pressed-bg-color: #eff6ff;
  --ui-toggle-btn-pressed-border-color: #2563eb;
  --ui-toggle-btn-pressed-text-color: #2563eb;

  /* Colors - Interactive States */
  --ui-toggle-btn-hover-bg-color: #f3f4f6;
  --ui-toggle-btn-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Disabled */
  --ui-toggle-btn-disabled-bg-color: #f3f4f6;
  --ui-toggle-btn-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`aria-pressed`**: 단일 토글 버튼의 ON/OFF 상태를 `'true'` / `'false'`로 동적 바인딩
- **`role="group"`**: 토글 버튼 그룹 컨테이너에 연동
- **`aria-label`**: 아이콘 전용 토글 버튼의 경우 용도를 설명하는 명일성 라벨 추가

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 토글 버튼 간 순차적 포커스 이동
- **`Enter` / `Space`**: 포커스된 토글 버튼의 선택 상태 전환 (Toggle execution)
- **`Arrow Keys`**: 단일 선택(Radio 형태) 그룹 내에서 방위키를 통한 순환 포커스 및 즉시 선택 이동 지원

### 5.3. 스크린 리더 대응

- 스크린 리더가 요소에 진입할 때 `button` 역할과 함께 현재 눌림 상태(`pressed`)를 즉시 음성으로 전달할 수 있도록 WAI-ARIA 단일/그룹 표준 속성을 준수합니다.