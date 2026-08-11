# SplitPane 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Pane`: 분할된 각 영역을 구성하는 패널 구획
- `Resizer (Divider)`: 패널 사이에 위치하여 드래그/키보드로 크기를 조절하는 분할 바 영역

### 1.2. 형태 옵션 (Variants)

- `Line`: 경계선 형태의 기본 리사이저 스타일
- `Grip`: 중앙에 드래그 핸들 아이콘이 포함된 스타일
- `Invisible`: 평소에는 구분선만 표시되고 마우스 호버 시 강조되는 최소화 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large` (Resizer 두께 및 터치 영역 크기 제어)

### 1.4. 레이아웃 제어 (Layout Properties)

- `direction`: 분할 방향 제어 (`horizontal`, `vertical`)
- `full-width`: 부모 요소 너비 100% 확장 여부
- `full-height`: 부모 요소 높이 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)** | **비고 (Remarks)** |
| ------------------- | -------------------- | ---------------- |
| `pane-1-slot`       | 첫 번째(좌/상) 패널 주입 영역   |                  |
| `pane-2-slot`       | 두 번째(우/하) 패널 주입 영역   | N개 확장 구조 지원      |
| `resizer-slot`      | 커스텀 리사이저 핸들 주입 영역    | 기본 리사이저 대체 가능    |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**       | **타입**     | **기본값**        | **설명**                           |
| ------------- | ---------- | -------------- | -------------------------------- |
| `direction`   | `string`   | `'horizontal'` | 분할 방향 (`horizontal`, `vertical`) |
| `sizes`       | `number[]` | `[50, 50]`     | 각 패널의 초기 비율 (%) 또는 크기 (px)       |
| `min-sizes`   | `number[]` | `[100, 100]`   | 각 패널의 최소 크기 (px)                 |
| `max-sizes`   | `number[]` | `[]`           | 각 패널의 최대 크기 (px)                 |
| `disabled`    | `boolean`  | `false`        | 리사이징 기능 비활성화 여부                  |
| `collapsible` | `boolean`  | `false`        | 리사이저 더블 클릭 시 패널 접기 활성화 여부        |

### 3.2. 상태 (States)

- **Hover**: 리사이저 바 오버 시 포인터 커서 변경 (`col-resize` / `row-resize`) 및 시각적 피드백
- **Focus / Focus-visible**: 키보드로 리사이저 조작 시 포커스 링 표시
- **Dragging / Active**: 드래그 진행 중 리사이저 강조 및 하이라이트 표시
- **Disabled**: 리사이징 비활성화 (드래그 불가 및 포인터 커서 기본값 유지)
- **Collapsed**: 패널이 완전히 접힌 상태

### 3.3. 이벤트 (Events)

| **이벤트명**       | **상세 (Detail)**                             | **발생 시점**         |
| -------------- | ------------------------------------------- | ----------------- |
| `resize-start` | `{ sizes: number[] }`                       | 드래그/조작 시작 시점 방출   |
| `resize`       | `{ sizes: number[] }`                       | 크기 조절 진행 중 실시간 방출 |
| `resize-end`   | `{ sizes: number[] }`                       | 드래그/조작 완료 시점 방출   |
| `collapse`     | `{ paneIndex: number, collapsed: boolean }` | 패널 접힘/펼침 시 방출     |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-split-pane-resizer-size-sm: 4px;
  --ui-split-pane-resizer-size-md: 6px;
  --ui-split-pane-resizer-size-lg: 8px;
  --ui-split-pane-resizer-hit-area: 12px;

  /* Colors - Base */
  --ui-split-pane-bg-color: #ffffff;
  --ui-split-pane-resizer-bg-color: #e5e7eb;

  /* Colors - Interactive States */
  --ui-split-pane-resizer-hover-color: #2563eb;
  --ui-split-pane-resizer-active-color: #1d4ed8;
  --ui-split-pane-resizer-focus-ring-color: rgba(37, 99, 235, 0.2);
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="separator"`**: Resizer 요소에 분할 구분선 역할 부여
- **`aria-orientation`**: `direction` 속성에 따라 `'horizontal'` 또는 `'vertical'` 설정
- **`aria-valuenow`**: 현재 첫 번째 패널의 크기 비율/값 설정
- **`aria-valuemin`**: 최소 허용 값 연동 (`min-sizes`)
- **`aria-valuemax`**: 최대 허용 값 연동 (`max-sizes`)
- **`aria-controls`**: 리사이저가 제어하는 패널 요소 ID 연동

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: Resizer 요소로 키보드 포커스 이동
- **`ArrowLeft / ArrowUp`**: 현재 방향에 따라 이전 방향으로 패널 크기 축소/확장
- **`ArrowRight / ArrowDown`**: 현재 방향에 따라 다음 방향으로 패널 크기 확장/축소
- **`Home`**: 최소 크기로 패널 축소
- **`End`**: 최대 크기로 패널 확장
- **`Enter`**: `collapsible` 활성화 상태일 때 패널 접기/펼침 토글

### 5.3. 스크린 리더 대응

- 스크린 리더에서 리사이저 조작 시 변경되는 크기 비율 정보를 `aria-valuenow`를 통해 실시간 수치로 제공합니다.