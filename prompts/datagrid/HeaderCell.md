# grid-header-cell

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Cell Container**: 개별 컬럼 헤더 영역의 최외각 컨테이너로, 텍스트 및 각종 컨트롤 요소를 포함합니다.
- **Title Label**: 컬럼명을 노출하는 텍스트 영역입니다.
- **Sort Indicator**: 정렬 방향 상태(▲ / ▼)를 시각적으로 노출하는 아이콘 영역입니다.
- **Filter Trigger**: 컬럼별 필터 드롭다운 UI를 호출하는 버튼/아이콘 영역입니다.
- **Drag Handle**: 컬럼 순서 변경(Reordering)을 위해 드래그 동작을 감지하는 인터랙션 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 라벨, 정렬, 필터 아이콘이 기본 배치된 헤더 셀 형태입니다.
- `Sortable`: 정렬 기능이 활성화되어 마우스 호버 및 클릭 상호작용이 가능한 형태입니다.
- `Filtered`: 필터 조건이 활성화되어 필터 아이콘 강조 색상이 적용된 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Small` (`sm`): 높이 32px 헤더 규격에 맞춘 패딩 및 폰트 크기입니다.
- `Medium` (`md`): 높이 40px 헤더 규격의 표준 형태입니다.
- `Large` (`lg`): 높이 48px 헤더 규격에 맞춘 여유 있는 레이아웃 형태입니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `width`: 해당 컬럼의 너비(px)를 지정하며 상위 오프셋 상태와 연동됩니다.
- `align`: 헤더 셀 내부 텍스트 및 정렬 아이콘의 정렬 방식을 제어합니다 (`left`, `center`, `right`).

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **`<grid-column-resizer>`**: 컬럼 좌우 폭을 조절하기 위해 헤더 셀 우측 경계에 배치되는 하위 컴포넌트입니다.
- **Title Slot**: 컬럼 제목 영역에 단순 텍스트 외 커스텀 HTML/컴포넌트를 전달할 수 있는 슬롯입니다.
- **Filter Slot**: 커스텀 필터 UI 드롭다운을 삽입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `columnKey` | `string` | `""` | 개별 컬럼을 식별하는 고유 키 값입니다. |
| `label` | `string` | `""` | 헤더 셀에 표시될 라벨 텍스트입니다. |
| `sortable` | `boolean` | `true` | 클릭을 통한 정렬 기능 활성화 여부입니다. |
| `sortDirection` | `'ASC' | 'DESC' | null` | `null` | 현재 적용된 정렬 방향 상태입니다. |
| `filterable` | `boolean` | `false` | 필터 UI 아이콘 노출 및 필터 기능 활성화 여부입니다. |
| `isFiltered` | `boolean` | `false` | 현재 컬럼에 필터 조건이 적용되었는지 나타내는 플래그입니다. |
| `reorderable` | `boolean` | `true` | 드래그 앤 드롭을 통한 컬럼 순서 변경 활성화 여부입니다. |

### 3.2. 상태 (States)

- **Sort State (`ASC` / `DESC` / `Cancel`)**: 정렬 3단계 순환 처리 상태입니다.
- **Hover State**: 마우스 호버 시 `sortable` 속성 존재 여부에 따른 커서 스타일 및 배경색 하이라이팅 상태입니다.
- **Dragging State**: 컬럼 이동을 위해 드래그 동작이 시작 및 진행 중인 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `header-cell-click` | `{ columnKey: string, sortDirection: 'ASC' | 'DESC' | null }` | `sortable` 상태의 헤더 셀 클릭 시 정렬 방향이 순환 변경되는 시점 |
| `filter-trigger-click` | `{ columnKey: string, anchorEl: HTMLElement }` | 필터 아이콘 클릭으로 필터 드롭다운 UI 제어가 요청된 시점 |
| `column-drag-start` | `{ columnKey: string, clientX: number }` | 컬럼 순서 변경 드래그 핸들링 동작이 시작된 시점 |
| `column-drag-over` | `{ targetColumnKey: string, position: 'before' | 'after' }` | 드래그 중 다른 헤더 셀 영역 위로 진입한 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-header-cell-bg: #f6f8fa;
  --ui-comp-grid-header-cell-hover-bg: #eaeef2;
  --ui-comp-grid-header-cell-padding: 0 12px;
  --ui-comp-grid-header-cell-color: #24292f;
  --ui-comp-grid-header-cell-border-right: 1px solid #d0d7de;
  --ui-comp-grid-header-cell-cursor: pointer;
  --ui-comp-grid-header-cell-icon-active-color: #0969da;
}
```