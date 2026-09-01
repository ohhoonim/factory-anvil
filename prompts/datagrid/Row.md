# grid-row

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Row Container**: DOM Pooling 메커니즘에 따라 한정된 개수로 사전 생성되어 재사용되는 단일 행 컨테이너입니다.
- **Cell Group**: 컬럼 오프셋 및 화면 가시 영역(hRange)에 대응하는 `<grid-cell>` 서브 컴포넌트들을 가로 레이아웃으로 배치합니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 기본 데이터 행 스타일입니다.
- `Dirty`: 하위 셀 중 수정된 데이터가 포함되어 행 전체에 Dirty 상태 강조 배경 스타일이 적용된 형태입니다.
- `Selected`: 행 전체 또는 포함된 셀이 선택 영역에 포함되었을 때 하이라이트 스타일이 적용된 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Standard`: 상위 `<grid-viewport>`의 CSS Variable(`-ui-comp-grid-viewport-row-height`) 규격을 전달받아 동작합니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `height`: 단일 행의 높이(px)를 제어합니다.
- `transformY`: 가상화 연산 결과인 `rowIndex`에 기반하여 `translate3d(0, rowIndex * rowHeight, 0)` 수직 오프셋 위치를 명시적으로 제어합니다.

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **`<grid-cell>`**: 행 내부에서 각 컬럼 데이터 값을 바인딩하고 렌더링하는 개별 셀 서브 컴포넌트입니다.
- **Default Slot**: 셀 목록 외 행 단위 오버레이나 커스텀 익스팬션(Row Expansion) 요소를 수용하는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `rowIndex` | `number` | `-1` | 가상화 스크롤 상에서 현재 행이 표현하는 데이터의 절대 인덱스 번호입니다. |
| `rowData` | `Record<string, any>` | `null` | 현재 행에 바인딩된 원본 데이터 객체입니다. |
| `isActive` | `boolean` | `false` | 가시 범위 내에 진입하여 활성화 상태로 렌더링되고 있는지 여부입니다. |
| `isDirty` | `boolean` | `false` | 하위 셀 중 수정된 데이터가 존재하는지 나타내는 행 단위 Dirty 플래그입니다. |
| `isSelected` | `boolean` | `false` | 현재 행이 선택 상태인지 나타내는 플래그입니다. |

### 3.2. 상태 (States)

- **Pool State (`Active` / `Inactive`)**: DOM Pool 내에서 활성화되어 실제 화면에 바인딩된 상태 또는 가시 범위를 벗어나 숨김 처리 및 재사용 대기 중인 상태입니다.
- **Cell Map (`cellMap`)**: 효율적인 데이터 업데이트 및 포커스 제어를 위해 하위 `<grid-cell>` 인스턴스를 키(`columnKey`) 기반으로 추적/관리하는 내부 Map 구조 상태입니다.
- **Transform State**: Y축 고속 포지셔닝을 위한 `translate3d` 오프셋 좌표 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `row-click` | `{ rowIndex: number, rowData: Record<string, any> }` | 행 영역 클릭 시 상위 컨트롤러로 행 선택 이벤트를 전달하는 시점 |
| `row-dblclick` | `{ rowIndex: number, rowData: Record<string, any> }` | 행 영역 더블클릭 이벤트 발생 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-row-bg: #ffffff;
  --ui-comp-grid-row-hover-bg: #f1f5f9;
  --ui-comp-grid-row-dirty-bg: #fffbe6;
  --ui-comp-grid-row-selected-bg: #e6f4ff;
  --ui-comp-grid-row-border-bottom: 1px solid #e1e4e8;
}
```