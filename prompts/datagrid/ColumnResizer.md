# grid-column-resizer

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Resizer Handle**: `<grid-header-cell>` 우측 경계선에 영역을 차지하는 마우스/터치 인터랙션 영역입니다.
- **Visual Overlay Line**: 드래그 진행 중 그리드 바디 전체 세로 영역을 가로지르며 변경될 컬럼 너비를 미리 보여주는 가이드 라인 요소입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 기본 가느다란 경계선 형태의 핸들입니다.
- `Active`: 마우스 호버 및 드래그 동작 중 강조된 색상과 커서가 적용된 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Standard`: 폭 6px 내외의 손쉬운 드래그 상호작용 영역을 제공합니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `height`: 헤더 셀의 전체 높이(`100%`)에 맞춰 수직으로 채워집니다.
- `position`: `<grid-header-cell>` 우측 끝에 absolute 포지셔닝으로 배치됩니다.

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- 하위 서브 컴포넌트를 가지지 않는 단일 인터랙션 제어 컴포넌트입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `columnKey` | `string` | `""` | 너비를 변경할 대상 컬럼의 고유 식별자입니다. |
| `currentWidth` | `number` | `100` | 리사이징 동작 시작 시점의 컬럼 너비(px)입니다. |
| `minWidth` | `number` | `50` | 컬럼 축소 시 허용되는 최소 너비(px)입니다. |
| `maxWidth` | `number` | `1000` | 컬럼 확대 시 허용되는 최대 너비(px)입니다. |

### 3.2. 상태 (States)

- **Hover State**: 리사이저 핸들 영역 위에 마우스 포인터가 진입하여 `col-resize` 커서 스타일이 활성화된 상태입니다.
- **Resizing State**: 마우스 Down/Touch Start로 드래그 인터랙션이 진행 중인 상태입니다.
- **Guide Line Position (`deltaX`)**: 드래그 이동 거리에 따른 시각적 가이드 라인의 X축 상대 위치 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `resize-start` | `{ columnKey: string, startX: number, initialWidth: number }` | 드래그 핸들 다운 이벤트로 리사이징 동작이 시작된 시점 |
| `resize-move` | `{ columnKey: string, currentWidth: number, deltaX: number }` | 드래그 이동 중 실시간으로 변경 너비 및 가이드 라인 위치를 계산하는 시점 |
| `column-resize` | `{ columnKey: string, width: number }` | 드래그 종료 시 최종 결정된 너비를 상위 `<data-grid>`로 전달하여 레이아웃 재계산을 트리거하는 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-resizer-width: 6px;
  --ui-comp-grid-resizer-hover-bg: #0969da;
  --ui-comp-grid-resizer-active-bg: #218bff;
  --ui-comp-grid-resizer-line-color: #0969da;
  --ui-comp-grid-resizer-cursor: col-resize;
}
```