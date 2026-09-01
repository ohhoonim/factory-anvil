제공해주신 HTML 및 JavaScript 코드를 분석하여 작성한 **DataGrid 컴포넌트 요구사항 정의서**입니다.

---

# DataGrid 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

* **Viewport (`grid-viewport`)**: 실제 스크롤이 발생하는 최상위 컨테이너 영역 (`height: 100vh`, `overflow: auto`)
* **Phantom (`grid-phantom`)**: 전체 데이터 수(10만 건 이상)에 상응하는 전체 스크롤 높이 및 너비를 확보하기 위한 가상 영억
* **Content Container (`grid-content`)**: 뷰포트에 실제 노출되는 고정된 수의 렌더링 영역 (`translate3d` 기반 하드웨어 가속 이동)
* **Row & Cell (`grid-row`, `grid-cell`)**: DOM 풀링 방식으로 재사용되는 행 및 열 구성 요소를 포함

### 1.2. 형태 옵션 (Variants)

* `Zebra Striping` (Standard): CSS `repeating-linear-gradient` 기반으로 별도의 DOM 생성 없이 홀/짝 행에 교차 배경색을 부여하는 가벼운 얼룩무늬 스타일

### 1.3. 크기 옵션 (Sizes)

* `Row Height`: 기본값 `40px` (옵션 설정을 통해 커스텀 높이 조절 가능)
* `Cell Font Size`: 기본값 `13px`

### 1.4. 레이아웃 제어 (Layout Properties)

* `virtual-scroll`: 수직 및 수평 동시 가상화(Virtualization)를 제공하여 대용량 데이터 렌더링 지원
* `will-change`: 스크롤 시 그래픽 레이어 분리를 통한 하드웨어 가속 제어 (`will-change: transform`)

---

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| 슬롯명 (Slot Name) | 설명 (Description) | 비고 (Remarks) |
| --- | --- | --- |
| `cell-icon-slot` | 셀 데이터 타입별 아이콘 영역 (SVG Data URI) | `type-string`, `type-number`, `type-objectId` 대응 |
| `cell-content-slot` | 텍스트 표시 영역 (최대 100자 자름 처리) | `text-overflow: ellipsis` 적용 |

---

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| 속성명 | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `rawData` | `Array<Object>` | `[]` | 그리드에 표시할 대용량 원본 데이터 배열 |
| `columns` | `Array<ColumnDef>` | `[]` | 컬럼 정의 객체 목록 (`key`, `path`, `width`) |
| `rowHeight` | `number` | `40` | 단일 행의 높이 (px) |
| `vBuffer` | `number` | `5` | 수직 가상화 렌더링 상/하단 행 버퍼 개수 |
| `hBuffer` | `number` | `200` | 수평 가상화 렌더링 좌/우 픽셀 버퍼 크기 |

### 3.2. 상태 (States)

* **Scrolling**: 스크롤 동작 중 상태 (고속 스크롤 시 10px/ms 초과 구간은 렌더링 스킵 처리)
* **Hover**: 이벤트 위임 기반으로 셀 위에 마우스 커서 진입 시 원본 데이터(`dataset.raw`) 툴팁 노출 상태

### 3.3. 이벤트 (Events)

| 이벤트명 | 상세 (Detail) | 발생 시점 |
| --- | --- | --- |
| `scroll` | `{ scrollTop: number, scrollLeft: number }` | 그리드 뷰포트 스크롤 발생 시 (`requestAnimationFrame` 제어) |
| `mouseover` | `{ targetCell: HTMLElement, rawData: string }` | 셀 요소 진입 시 이벤트 위임 방식으로 툴팁(`title`) 연동 |

---

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```css
:host {
  /* Layout & Sizing */
  --row-height: 40px;
  --grid-border-color: #ccc;
  --grid-cell-border-color: #eee;
  --grid-cell-padding-x: 8px;
  --grid-font-size: 13px;

  /* Repeating Linear Gradient Background (Zebra Style) */
  --grid-row-bg-even: #ffffff;
  --grid-row-bg-odd: #f9f9f9;

  /* Data Type Icon Colors */
  --icon-color-string: #4a90e2;
  --icon-color-number: #50e3c2;
  --icon-color-objectid: #f5a623;
}

```

---

## 5. 웹 접근성 및 성능 최적화 (Accessibility & Performance Architecture)

### 5.1. 성능 최적화 기법 (Performance Techniques)

* **Shadow Table**: 원본 데이터 객체를 가공(`detectType`, `formatDisplayString`)하여 접근 속도를 극대화한 그림자 객체 배열 사전 구축
* **DOM Pooling & Slot Tracking**: 뷰포트에 필요한 최소 행 수만큼 DOM 객체 풀(`rowPool`)을 사전 생성하여 `appendChild` / `removeChild` 부하 차단
* **Cumulative Sum & Binary Search**: 수평 가상화 시 컬럼 너비 누적 합을 기반으로 이진 탐색(`binarySearchColumn`) 수행하여 렌더링 대상 컬럼 정밀 계산
* **Hardware Acceleration**: `top`/`left` 오프셋 제어 대신 `translate3d()`를 적극 사용하여 GPU 기반 렌더링 적용 및 Reflow 최소화
* **Speed Detector**: 스크롤 속도가 일정한 프레임 예산(10px/ms)을 초과하는 고속 스크롤 시 렌더링을 일시 스킵하여 프레임 드랍 방지

### 5.2. ARIA 및 접근성 (Accessibility)

* **`pointer-events: none`**: 가상 높이 영역(`grid-phantom`)의 마우스 이벤트 간섭 차단
* **`text-overflow: ellipsis`**: 긴 텍스트를 가진 셀 영역의 문자열 잘림 및 영역 이탈 방지
* **`title` Attribute**: 셀 마우스 호버 시 원본(`dataset.raw`) 전체 값을 마우스 툴팁 형태로 볼 수 있도록 연동