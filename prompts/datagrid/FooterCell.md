# grid-footer-cell

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Footer Cell Container**: 푸터 레이아웃 내에서 대응하는 컬럼 위치에 배치되는 단일 집계 셀 컨테이너입니다.
- **Aggregate Label Area**: 집계 유형(SUM, AVG, MIN, MAX, COUNT 등)을 식별하는 라벨 노출 영역입니다.
- **Aggregate Value Area**: 포맷팅 처리된 집계 연산 결과 수치 텍스트를 노출하는 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 표준 집계 셀 형태입니다.
- `Positive`: 집계 수치가 양수이거나 긍정적 지표일 때 강조 스타일이 적용된 형태입니다.
- `Negative`: 집계 수치가 음수이거나 경고 지표일 때 강조 스타일이 적용된 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Standard`: 상위 `<grid-footer>`의 높이 및 컬럼 정의 너비 규격에 자동 맞춤 처리됩니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `width`: 해당 컬럼의 고정/가변 너비(px)에 맞춰 동적으로 제어됩니다.
- `align`: 컬럼 정의의 데이터 타입 및 정렬 설정에 따라 내부 요소 정렬 방식을 제어합니다 (`left`, `center`, `right`).

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **Default Slot**: 기본 포맷팅 수치 외에 사용자 정의 커스텀 요약 컴포넌트나 복합 집계 표식을 삽입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `columnKey` | `string` | `""` | 집계 셀이 속한 컬럼의 고유 식별자입니다. |
| `aggregateFunc` | `string` | `""` | 적용된 집계 함수 유형입니다 (`sum`, `avg`, `min`, `max`, `count` 등). |
| `value` | `any` | `null` | 연산 완료된 집계 원본 수치/데이터 값입니다. |
| `formatter` | `Function` | `null` | 수치 데이터를 특정 포맷(통화, 천단위 콤마, 퍼센트 등)으로 변환하는 함수입니다. |
| `align` | `string` | `'left'` | 텍스트 정렬 방식입니다 (`left`, `center`, `right`). |

### 3.2. 상태 (States)

- **Formatted Display Value**: `aggregateFunc` 및 `formatter` 조합에 따라 시각화 준비가 완료된 최종 텍스트 상태입니다.
- **Truncated / Ellipsis State**: 셀 공간 부족으로 내용이 잘릴 경우 호버 시 전체 집계 결과 수치 및 라벨 설명을 `title` 속성 또는 툴팁으로 노출하는 상태입니다.
- **Value Condition State**: 연산 수치의 양수, 음수, Zero 또는 설정된 임계치 조건 부합 여부에 따른 시각적 강조 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `footer-cell-click` | `{ columnKey: string, aggregateFunc: string, value: any }` | 집계 셀 클릭 시 발생 |
| `footer-cell-dblclick` | `{ columnKey: string, aggregateFunc: string, value: any }` | 집계 셀 더블클릭 시 발생 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-footer-cell-bg: #f6f8fa;
  --ui-comp-grid-footer-cell-padding: 0 8px;
  --ui-comp-grid-footer-cell-color: #24292f;
  --ui-comp-grid-footer-cell-border-right: 1px solid #d0d7de;
  --ui-comp-grid-footer-cell-positive-color: #1a7f37;
  --ui-comp-grid-footer-cell-negative-color: #cf222e;
  --ui-comp-grid-footer-cell-font-weight: 600;
}
```