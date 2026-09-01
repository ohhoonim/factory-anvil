# grid-header

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Header Container**: 전체 헤더 영역을 감싸는 컨테이너로, 뷰포트의 수평 스크롤 위치와 동기화되어 움직이는 수평 트랜스폼 레이어를 포함합니다.
- **Header Cell Group**: 컬럼 정의(`columns`)에 따라 생성된 `<grid-header-cell>` 인스턴스들을 가로로 배열하는 레이아웃 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 표준 헤더 스타일입니다.
- `Sticky`: 상단 고정 형태를 유지하며 뷰포트 수평 스크롤에만 동기화되는 레이아웃입니다.

### 1.3. 크기 옵션 (Sizes)

- `Small` (`sm`): 높이 32px의 컴팩트 헤더 레이아웃입니다.
- `Medium` (`md`): 높이 40px의 표준 헤더 레이아웃입니다.
- `Large` (`lg`): 높이 48px의 확장 헤더 레이아웃입니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `totalWidth`: 전체 컬럼 너비의 합산 값(px)으로, 내부 트랜스폼 레이어의 전체 너비를 결정합니다.
- `scrollLeft`: 상위 `<data-grid>` 또는 `<grid-viewport>`로부터 전달받는 수평 스크롤 오프셋(px)입니다.

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **`<grid-header-cell>`**: 각 컬럼별 라벨, 정렬, 필터, 리사이즈, 드래그 핸들을 포함하는 개별 헤더 셀 컴포넌트입니다.
- **Default Slot**: 기본 헤더 셀 목록 외에 커스텀 헤더 영역이나 추가 제어 컨트롤을 삽입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `columns` | `Array<ColumnDef>` | `[]` | 헤더에 표시할 컬럼 스키마 및 옵션 정보 배열입니다. |
| `colOffsets` | `Array<number>` | `[]` | 각 컬럼의 X축 시작/종료 오프셋 위치 배열입니다. |
| `totalWidth` | `number` | `0` | 전체 컬럼 너비의 합계(px)입니다. |
| `scrollLeft` | `number` | `0` | 뷰포트 수평 스크롤 위치(px)입니다. |

### 3.2. 상태 (States)

- **Transform State (`translateX`)**: `scrollLeft` 수신에 따라 `translate3d(-scrollLeft, 0, 0)` 형태로 적용되는 수평 동기화 트랜스폼 상태입니다.
- **Drag Reorder State (`dragColumnKey`, `targetColumnKey`)**: 컬럼 순서 변경(Reordering) 드래그 진행 시 드래그 중인 컬럼과 타겟 위치 컬럼 정보 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `header-cell-click` | `{ columnKey: string, sortDirection: 'ASC' | 'DESC' | null }` | 하위 `<grid-header-cell>` 클릭으로 정렬 상태 변경 요청이 발생한 시점 |
| `column-reorder` | `{ fromIndex: number, toIndex: number, columnKey: string }` | 헤더 셀 드래그 앤 드롭을 통해 컬럼 순서 변경이 완료된 시점 |
| `filter-open` | `{ columnKey: string, anchorEl: HTMLElement }` | 특정 컬럼의 필터 아이콘 클릭으로 필터 드롭다운 제어가 요청된 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-header-bg: #f6f8fa;
  --ui-comp-grid-header-border-bottom: 1px solid #d0d7de;
  --ui-comp-grid-header-height: 40px;
  --ui-comp-grid-header-text-color: #24292f;
  --ui-comp-grid-header-font-size: 13px;
  --ui-comp-grid-header-font-weight: 600;
}
```