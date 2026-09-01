# grid-viewport

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Viewport Container**: 실제 브라우저 스크롤바가 생성되는 최외각 뷰포트 영역입니다. `overflow: auto` 속성을 가져 수평/수직 스크롤을 직접 수용합니다.
- **Phantom Layer (`<div class="grid-phantom">`)**: 가상 스크롤 구현을 위해 전체 데이터 행 수와 컬럼 너비 합에 해당하는 실제 높이/너비를 강제로 점유하는 투명 dummy 레이어입니다.
- **Content Canvas (`<div class="grid-content">`)**: DOM Pooling 처리된 실제 `<grid-row>` 인스턴스들이 활성화되어 배치되는 실체 렌더링 컨테이너 레이어입니다.
- **Selection Overlay Layer**: 마우스 드래그를 통한 다중 셀 범위 선택 시 활성화 영역을 시각적으로 하이라이트 표현하는 오버레이 레이어입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 기본 스크롤바 및 표준 배경이 적용된 형태입니다.
- `Zebra Striped`: 홀수/짝수 행에 교차 배경색이 적용되어 시독성을 높인 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Fit Parent`: 상위 `<data-grid>` 높이에 `100%`로 맞추어 늘어나는 기본 형태입니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `phantomWidth`: 전체 컬럼 너비 합산 값(px)으로 핀톰 레이어의 너비를 결정합니다.
- `phantomHeight`: (전체 데이터 건수 × 행 높이) 연산으로 결정되는 핀톰 레이어의 전체 높이(px)입니다.
- `rowHeight`: CSS Variable(`-ui-comp-grid-viewport-row-height`) 형태로 하위 요소에 전달되는 단일 행 높이 규격입니다.

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **`<grid-row>`**: 가시 범위(vRange) 연산 결과에 따라 DOM Pool에서 재사용되어 Content Canvas 내에 배치되는 행 컴포넌트입니다.
- **Default Slot**: 가상화 렌더링 대상 행 배열 외 오버레이 레이어나 커스텀 뷰포트 요소를 수용하는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `phantomWidth` | `number` | `0` | Phantom 레이어에 적용할 전체 수평 너비(px)입니다. |
| `phantomHeight` | `number` | `0` | Phantom 레이어에 적용할 전체 수직 높이(px)입니다. |
| `rowHeight` | `number` | `40` | 개별 행의 기본 높이(px)입니다. |
| `striped` | `boolean` | `false` | 지브라 패턴 배경 적용 여부입니다. |

### 3.2. 상태 (States)

- **Scroll Position (`scrollTop`, `scrollLeft`)**: 현재 뷰포트의 Y축 및 X축 스크롤 오프셋 상태입니다.
- **Selection Box (`selectionRange`)**: 드래그 인터랙션으로 지정된 범위 선택 영역의 Top, Left, Width, Height 좌표 상태입니다.
- **Is Dragging**: 범위 선택을 위한 마우스 Dragging 동작 진행 여부 플래그입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `grid-scroll` | `{ scrollTop: number, scrollLeft: number }` | 뷰포트 스크롤 발생 시 상위 `<data-grid>`로 스크롤 위치를 전달하는 시점 |
| `selection-start` | `{ startRowIndex: number, startColIndex: number }` | 뷰포트 내부에서 셀 범위 선택 드래그 동작이 시작된 시점 |
| `selection-change` | `{ range: SelectionRange }` | 마우스 드래그 이동에 따라 셀 선택 영역 박스가 변경되는 시점 |
| `selection-end` | `{ range: SelectionRange }` | 범위 선택 드래그 동작이 종료된 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-viewport-bg: #ffffff;
  --ui-comp-grid-viewport-row-height: 40px;
  --ui-comp-grid-viewport-zebra-bg: #f9fafb;
  --ui-comp-grid-viewport-selection-bg: rgba(9, 105, 218, 0.12);
  --ui-comp-grid-viewport-selection-border: #0969da;
  --ui-comp-grid-viewport-scrollbar-thumb: #d0d7de;
}
```