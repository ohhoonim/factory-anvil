# TileLayoutGrid 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Grid Container`: 여러 자식 타일(Tile) 엘리먼트들을 그리드 규칙에 따라 정렬하고 배치하는 컨테이너 영역입니다.
- `Tile Item`: 그리드 내부에 삽입되는 개별 콘텐츠 카드 및 패널 구획입니다.

### 1.2. 형태 옵션 (Variants)

- `Fixed-Tile (정격 Tile Grid)`: 모든 자식 타일 요소가 동일한 높이와 비율을 유지하는 균등 그리드 레이아웃
- `Masonry (가변 높이 Grid)`: 콘텐츠의 내용 길이에 따라 자식 타일의 높이가 가변적으로 반응하며 빈 공간을 메우는 레이아웃

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large` (타일 간의 Gap 및 최소 너비 규격 제어)

### 1.4. 레이아웃 제어 (Layout Properties)

- `columns`: 그리드 컬럼 수 제어 (`auto-fit`, `auto-fill` 또는 고정 개수)
- `full-width`: 부모 요소 너비 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**          | **비고 (Remarks)** |
| ------------------- | ----------------------------- | ---------------- |
| `default`           | Grid 내부에 배치될 자식 Tile 요소 주입 영역 |                  |
| `header-slot`       | 그리드 상단 툴바/필터링 영역              | 선택사항             |
| `empty-slot`        | 내부 Tile 요소가 없을 때 표시할 대체 UI 영역 |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**          | **타입**             | **기본값**      | **설명**                                            |
| ---------------- | ------------------ | ------------ | ------------------------------------------------- |
| `mode`           | `string`           | `'fixed'`    | 그리드 모드 (`fixed`: 정격 높이, `masonry`: 가변 높이)         |
| `columns`        | `number \| string` | `'auto-fit'` | 컬럼 수 설정 (`auto-fit`, `auto-fill` 또는 지정 숫자)        |
| `min-tile-width` | `string`           | `'280px'`    | 타일의 최소 너비 규격                                      |
| `gap`            | `string`           | `'medium'`   | 타일 간 간격 (`small`, `medium`, `large` 또는 px/rem 단위) |
| `aspect-ratio`   | `string`           | `'1/1'`      | `fixed` 모드 시 적용할 타일의 가로세로 비율                      |
| `loading`        | `boolean`          | `false`      | 스켈레톤 로딩 상태 여부                                     |

### 3.2. 상태 (States)

- **Normal**: 기본 그리드 타일 배치 상태
- **Loading**: 타일 데이터 비동기 로드 중 스켈레톤 그리드 표시
- **Empty**: 표시할 자식 타일 엘리먼트가 없는 상태
- **Responsive Breakpoint**: 화면 크기 변화에 따라 컬럼 수 및 간격이 실시간 반응하는 상태

### 3.3. 이벤트 (Events)

| **이벤트명**        | **상세 (Detail)**                        | **발생 시점**                       |
| --------------- | -------------------------------------- | ------------------------------- |
| `layout-change` | `{ columns: number, mode: string }`    | 반응형 브레이크포인트 도달로 레이아웃 구조 변경 시 방출 |
| `tile-click`    | `{ item: HTMLElement, index: number }` | 내부 타일 요소 클릭 시 방출                |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-tile-grid-gap-sm: 12px;
  --ui-tile-grid-gap-md: 16px;
  --ui-tile-grid-gap-lg: 24px;
  --ui-tile-grid-min-width: 280px;
  --ui-tile-grid-aspect-ratio: 1 / 1;

  /* Colors - Base */
  --ui-tile-grid-bg-color: transparent;
  --ui-tile-grid-skeleton-bg-color: #e5e7eb;

  /* Colors - Interactive States */
  --ui-tile-grid-focus-ring-color: rgba(37, 99, 235, 0.2);
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="grid"`** 또는 **`role="list"`**: 자식 타일들의 집합 구조에 맞춰 مناسب한 Landmark/Structure Role 부여
- **`aria-busy`**: `loading` 속성이 활성화되어 스켈레톤을 표출할 때 `'true'`로 연동
- **`aria-rowcount` / `aria-colcount`**: 그리드 모드에서 전체 행과 열 수 정보를 스크린 리더에 제공

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 그리드 내부 첫 번째 포커스 가능한 자식 타일로 진입
- **`ArrowKeys (Left/Right/Up/Down)`**: 2차원 그리드 방향에 따라 이전/다음 자식 타일 요소로 포커스 이동

### 5.3. 스크린 리더 대응

- 가변 높이(`masonry`) 모드 적용 시 시각적 위치와 DOM 순서가 일치하도록 순서를 관리하여 스크린 리더 탐색의 혼선을 방지합니다.