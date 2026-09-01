# grid-pagination

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Page Size Selector**: 한 페이지에 노출할 레코드 수(10, 20, 50, 100개 등)를 변경할 수 있는 Dropdown 폼 컨트롤 영역입니다.
- **Page Information Display**: 현재 페이지 범위 및 전체 데이터 건수(예: `1-50 of 1,250 items`)를 시각적으로 보여주는 메타 텍스트 영역입니다.
- **Navigation Button Group**: 처음(`<<`), 이전(`<`), 다음(`>`), 끝(`>>`) 페이지로 이동을 제어하는 아이콘 버튼 그룹입니다.
- **Page List Group**: 현재 위치한 페이지 번호 주변의 페이지 번호 버튼 목록 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 페이지 이동 버튼과 페이지 크기 변경 드롭다운이 모두 포함된 표준 페이징 형태입니다.
- `Compact`: 공간이 협소한 환경에서 번호 버튼 목록을 생략하고 이전/다음 버튼과 현재 페이지 정보만 단순 표현하는 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Small` (`sm`): 높이 28px 규격의 소형 컨트롤 레이아웃입니다.
- `Medium` (`md`): 높이 36px 규격의 표준 컨트롤 레이아웃입니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `width`: 상위 컨테이너 또는 그리드 전체 폭(`100%`)에 맞추어 유연하게 배치됩니다.
- `align`: 내부 컨트롤 요소들의 수평 정렬을 제어합니다 (`left`, `center`, `right`, `space-between`).

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **Prefix Slot**: 페이징 컨트롤 좌측에 커스텀 상태 메시지나 버튼을 배치할 수 있는 슬롯입니다.
- **Suffix Slot**: 페이징 컨트롤 우측에 추가 액션 컨트롤을 주입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `currentPage` | `number` | `1` | 현재 활성화된 페이지 번호(1-based)입니다. |
| `pageSize` | `number` | `20` | 한 페이지당 표시할 레코드 수입니다. |
| `totalCount` | `number` | `0` | 전체 레코드 건수입니다 (서버 사이드 페이징 지원). |
| `pageSizeOptions` | `Array<number>` | `[10, 20, 50, 100]` | 페이지 크기 선택 드롭다운에 노출할 옵션 목록입니다. |
| `maxPageButtons` | `number` | `5` | 한 번에 노출할 최대 페이지 번호 버튼 개수입니다. |
| `disabled` | `boolean` | `false` | 전체 페이징 컨트롤 비활성화 여부입니다. |

### 3.2. 상태 (States)

- **Total Pages State (`totalPages`)**: `Math.ceil(totalCount / pageSize)` 계산식에 의해 동적으로 도출되는 전체 페이지 수 상태입니다.
- **Navigability State**: `currentPage` 위치에 따라 처음/이전 및 다음/끝 버튼의 비활성화(`disabled`) 제어 상태입니다.
- **Active Page State**: 현재 선택되어 하이라이트 표시되는 페이지 번호 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `page-change` | `{ page: number, pageSize: number }` | 페이지 번호 클릭 또는 페이지 크기 변경에 의해 조회가 필요한 페이지 상태가 변경된 시점 |
| `page-size-change` | `{ pageSize: number, previousPageSize: number }` | 한 페이지당 노출 행 수가 변경된 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-pagination-bg: #ffffff;
  --ui-comp-grid-pagination-padding: 8px 12px;
  --ui-comp-grid-pagination-border-top: 1px solid #d0d7de;
  --ui-comp-grid-pagination-text-color: #24292f;
  --ui-comp-grid-pagination-btn-bg: #ffffff;
  --ui-comp-grid-pagination-btn-hover-bg: #f3f4f6;
  --ui-comp-grid-pagination-btn-active-bg: #0969da;
  --ui-comp-grid-pagination-btn-active-color: #ffffff;
  --ui-comp-grid-pagination-btn-disabled-color: #8c959f;
}
```