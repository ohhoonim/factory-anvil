# grid-info

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Status Container**: 그리드의 상단 또는 하단에 배치되어 메타 정보 텍스트들을 가로 레이아웃으로 전달하는 바(Bar) 형태의 컨테이너입니다.
- **Row Counter Group**: 전체, 필터링, 가상 스크롤 렌더링 범위 및 선택된 행 수의 카운터 정보를 표기하는 영역입니다.
- **Sort & Filter Summary Area**: 현재 활성화된 정렬 컬럼/방향(ASC/DESC) 및 필터 상태 텍스트를 요약 표기하는 영역입니다.
- **Selection & Modification Summary Area**: 선택된 셀 범위 및 데이터 수정(Dirty)이 발생한 행/셀의 총 개수를 표기하는 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 카운터, 정렬/필터 요약, 수정/선택 메타 정보가 모두 포함된 표준 바 형태입니다.
- `Compact`: 공간이 협소한 환경에서 카운터 정보만 간결하게 표기하는 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Small` (`sm`): 높이 24px 규격의 컴팩트 정보 바 레이아웃입니다.
- `Medium` (`md`): 높이 32px 규격의 표준 정보 바 레이아웃입니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `width`: 상위 `<data-grid>` 전체 폭(`100%`)에 맞추어 유연하게배치됩니다.
- `position`: 그리드 내에서의 배치 위치를 지정합니다 (`top`, `bottom`).

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **Prefix Slot**: 메타 정보 좌측에 사용자 정의 상태 아이콘이나 안내 문구를 주입할 수 있는 슬롯입니다.
- **Suffix Slot**: 메타 정보 우측에 추가 상태 표시 컨트롤이나 액션 버튼을 주입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `totalCount` | `number` | `0` | 그리드 전체 행 수입니다. |
| `filteredCount` | `number` | `0` | 필터링 조건이 적용되어 출력되는 행 수입니다. |
| `renderedRange` | `{ start: number, end: number }` | `{ start: 0, end: 0 }` | 현재 가상 스크롤에 의해 DOM으로 렌더링 중인 행 범위입니다. |
| `selectedRowCount` | `number` | `0` | 현재 선택된 행의 총 개수입니다. |
| `selectedCellCount` | `number` | `0` | 현재 선택된 셀의 총 개수입니다. |
| `dirtyRowCount` | `number` | `0` | 수정된 셀을 포함하고 있는 행의 총 개수입니다. |
| `dirtyCellCount` | `number` | `0` | 수정된 전체 셀의 총 개수입니다. |
| `sortState` | `Array<{ columnKey: string, direction: 'asc' | 'desc' }>` | `[]` | 적용된 정렬 상태 정보 배열입니다. |

### 3.2. 상태 (States)

- **Formatted Summary Text**: 수신된 `totalCount`, `filteredCount`, `renderedRange` 등의 프로퍼티 조합을 바탕으로 "100,000개 중 1~20번째 표시" 형태의 가독성 있는 문장으로 가공한 상태입니다.
- **Modification Indicator State**: `dirtyRowCount` 또는 `dirtyCellCount`가 0보다 클 때 활성화되는 변경 메타 정보 하이라이트 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `info-click` | `{ type: 'count' | 'sort' | 'selection' | 'dirty' }` | 메타 정보 바의 특정 요약 영역 클릭 시 발생 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-info-bg: #f6f8fa;
  --ui-comp-grid-info-padding: 0 12px;
  --ui-comp-grid-info-border-top: 1px solid #d0d7de;
  --ui-comp-grid-info-height: 32px;
  --ui-comp-grid-info-text-color: #5760 Sat;
  --ui-comp-grid-info-font-size: 12px;
  --ui-comp-grid-info-dirty-color: #d97706;
  --ui-comp-grid-info-selected-color: #0969da;
}
```