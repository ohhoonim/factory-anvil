# grid-cell

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Cell Container**: 단일 데이터 셀을 구성하는 컨테이너로, X축 컬럼 오프셋 및 너비에 맞춰 배치됩니다.
- **Type Icon Area**: 데이터 타입(string, number, objectId 등)을 식별할 수 있는 SVG 아이콘 영역입니다.
- **Display Text Area**: 포맷팅된 데이터 텍스트(`displayStr`)를 노출하는 영역입니다.
- **Dirty Indicator**: 원본 데이터 대비 셀 값이 수정되었음을 나타내는 시각적 인디케이터 표식 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 표준 데이터 셀 형태입니다.
- `Dirty`: 원본 값 대비 셀 값이 변경되어 강조 배경색 및 변경 표시 인디케이터가 적용된 형태입니다.
- `Selected`: Shift+클릭 또는 드래그 기반 다중 셀 선택 하이라이팅 스타일이 적용된 형태입니다.
- `Editing`: 인라인 편집 상태로 전환되어 내부 렌더링 컨텐츠가 편집 모드로 교체된 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Standard`: 상위 `<grid-row>`의 행 높이 및 컬럼 정의 너비 규격에 자동 맞춤 처리됩니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `width`: 해당 컬럼의 고정/가변 너비(px)에 맞춰 제어됩니다.
- `align`: 컬럼 정의의 데이터 타입 및 설정에 따라 내부 요소 정렬 방식을 제어합니다 (`left`, `center`, `right`).

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **`<grid-editor>`**: `editable: true` 조건에서 더블클릭 발생 시 셀 내부 또는 위 레이어에 마운트되는 인라인 편집 서브 컴포넌트입니다.
- **Default Slot**: 커스텀 셀 포맷터 및 컴포넌트를 셀 내부에 삽입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `columnKey` | `string` | `""` | 셀이 속한 컬럼의 고유 식별자입니다. |
| `rowIndex` | `number` | `-1` | 셀이 속한 행의 인덱스 번호입니다. |
| `rawValue` | `any` | `null` | 포맷팅 전 원본 데이터 값입니다 (`dataset.raw` 및 툴팁 노출 기준). |
| `displayValue` | `string` | `""` | 포맷터가 적용되어 실제 화면에 노출되는 텍스트입니다. |
| `dataType` | `string` | `'string'` | 데이터 타입입니다 (`string`, `number`, `objectId`, `date` 등). |
| `editable` | `boolean` | `false` | 셀 인라인 편집 허용 여부입니다. |
| `isDirty` | `boolean` | `false` | 원본 값 대비 셀 변경 여부를 나타내는 플래그입니다. |
| `isSelected` | `boolean` | `false` | 범위 선택 영역 포함 여부입니다. |

### 3.2. 상태 (States)

- **Hover State (Tooltip)**: 마우스 오버 시 `dataset.raw` 원본 값을 `title` 속성 또는 툴팁 요소로 노출하는 상태입니다.
- **Editing State**: 셀 더블클릭 시 편집 모드로 전환되어 입력 컨트롤 또는 `<grid-editor>`가 활성화된 상태입니다.
- **Clipboard Selection State**: 범위 선택 하이라이팅 및 `Ctrl+C` / `Ctrl+V` 이벤트 처리가 가능한 영역 포커스 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `cell-edit-start` | `{ rowIndex: number, columnKey: string, rawValue: any }` | `editable: true` 셀 더블클릭 발생으로 편집 모드 전환을 요청하는 시점 |
| `cell-commit` | `{ rowIndex: number, columnKey: string, newValue: any, oldValue: any }` | Enter 키 입력 또는 Blur 발생으로 편집 값이 검증 및 반영되는 시점 |
| `cell-cancel` | `{ rowIndex: number, columnKey: string }` | Escape 키 입력으로 셀 편집이 취소되는 시점 |
| `cell-copy` | `{ rowIndex: number, columnKey: string, value: any }` | 셀 선택 상태에서 `Ctrl+C` 클립보드 복사 이벤트가 수신된 시점 |
| `cell-paste` | `{ rowIndex: number, columnKey: string, pasteData: string }` | 셀 선택 상태에서 `Ctrl+V` 클립보드 붙여넣기 이벤트가 수신된 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-cell-bg: #ffffff;
  --ui-comp-grid-cell-padding: 0 8px;
  --ui-comp-grid-cell-color: #24292f;
  --ui-comp-grid-cell-border-right: 1px solid #e1e4e8;
  --ui-comp-grid-cell-dirty-bg: #fffbe6;
  --ui-comp-grid-cell-dirty-indicator-color: #d97706;
  --ui-comp-grid-cell-selected-bg: rgba(9, 105, 218, 0.12);
  --ui-comp-grid-cell-selected-border: #0969da;
}
```