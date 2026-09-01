# grid-footer

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Footer Container**: 그리드 최하단에 위치하는 전체 푸터 영역으로, 수직 스크롤 시에도 하단에 고정(Sticky)되는 최외각 레이어입니다.
- **Aggregation Row Container**: 컬럼 정의에 대응하는 푸터 셀들을 포함하며, 뷰포트 수평 스크롤 오프셋과 동기화되어 이동하는 수평 트랜스폼 레이어입니다.
- **Meta Summary Bar**: 전체 데이터 건수, 필터링된 행 수, 현재 선택된 행 수 등 그리드 전반의 상태 요약 정보를 표현하는 가로 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 요약 통계 바와 집계 행이 모두 포함된 표준 푸터 형태입니다.
- `Compact`: 메타 정보 바를 생략하고 집계 행만 노출하는 경량 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Small` (`sm`): 높이 32px 규격의 컴팩트 푸터 레이아웃입니다.
- `Medium` (`md`): 높이 40px 규격의 표준 푸터 레이아웃입니다.
- `Large` (`lg`): 높이 48px 규격의 확장 푸터 레이아웃입니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `totalWidth`: 전체 컬럼 너비의 합산 값(px)으로, 트랜스폼 레이어의 전체 수평 너비를 결정합니다.
- `scrollLeft`: 상위 `<data-grid>` 또는 `<grid-viewport>`로부터 전달받는 수평 스크롤 오프셋(px)입니다.

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **`<grid-footer-cell>`**: 개별 컬럼별 집계 수치 및 집계 라벨을 노출하는 하위 셀 컴포넌트입니다.
- **Summary Bar Slot**: 메타 정보 영역에 사용자 정의 버튼이나 페이지네이션 등 추가 컨트롤을 주입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `columns` | `Array<ColumnDef>` | `[]` | 집계 함수 정의(`aggregateFunc`)가 포함된 컬럼 스키마 정보 배열입니다. |
| `summaryData` | `Record<string, any>` | `{}` | 컬럼별 연산 집계 결과 데이터 객체입니다. |
| `totalCount` | `number` | `0` | 그리드 전체 레코드 건수입니다. |
| `filteredCount` | `number` | `0` | 필터링 조건이 적용된 레코드 건수입니다. |
| `selectedCount` | `number` | `0` | 현재 사용자에 의해 선택된 레코드 건수입니다. |
| `scrollLeft` | `number` | `0` | 뷰포트 수평 스크롤 위치(px)입니다. |

### 3.2. 상태 (States)

- **Transform State (`translateX`)**: `scrollLeft` 수신에 따라 `translate3d(-scrollLeft, 0, 0)` 형태로 적용되는 수평 동기화 트랜스폼 상태입니다.
- **Aggregation Calculation State**: 데이터 변경 또는 필터 적용 시 `sum`, `avg`, `min`, `max`, `count` 등의 연산이 완료되어 반영된 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `footer-cell-click` | `{ columnKey: string, aggregateFunc: string, value: any }` | 푸터의 특정 집계 셀 클릭 시 발생 |
| `summary-bar-click` | `{ totalCount: number, selectedCount: number }` | 메타 요약 정보 영역 클릭 시 발생 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-footer-bg: #f6f8fa;
  --ui-comp-grid-footer-border-top: 1px solid #d0d7de;
  --ui-comp-grid-footer-height: 40px;
  --ui-comp-grid-footer-text-color: #24292f;
  --ui-comp-grid-footer-font-size: 13px;
  --ui-comp-grid-footer-font-weight: 600;
  --ui-comp-grid-footer-summary-bg: #ffffff;
}
```