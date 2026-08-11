# ContentContainer 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- Application Shell 내에서 실제 업무 화면(페이지) 콘텐츠를 감싸는 메인 영역을 정의합니다.
- 콘텐츠 스크롤 및 중앙 정렬, 최대 너비(Max-width) 제한 등의 레이아웃을 제어합니다.

### 1.2. 형태 옵션 (Variants)

- `Standard`: 여백 및 최대 너비가 제한된 표준 업무 화면 스타일
- `Fluid`: 최대 너비 제한 없이 부모 영역을 전체 사용하는 스타일
- `Card`: 독립된 배경 영역 및 그림자 효과가 적용된 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large` / `Full`

### 1.4. 레이아웃 제어 (Layout Properties)

- `centered`: 콘텐츠 중앙 정렬 여부
- `scrollable`: 컨테이너 내부 자체 스크롤 적용 여부
- `padding`: 내부 패딩 활성화 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**         | **비고 (Remarks)** |
| ------------------- | ---------------------------- | ---------------- |
| `default`           | 실제 업무 화면 콘텐츠 주입 영역           |                  |
| `header-slot`       | 컨테이너 상단 고정 영역 (PageHeader 등) |                  |
| `footer-slot`       | 컨테이너 하단 고정 영역                |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**      | **타입**    | **기본값**      | **설명**                                        |
| ------------ | --------- | ------------ | --------------------------------------------- |
| `variant`    | `string`  | `'standard'` | 형태 옵션 (`standard`, `fluid`, `card`)           |
| `size`       | `string`  | `'medium'`   | 최대 너비 옵션 (`small`, `medium`, `large`, `full`) |
| `centered`   | `boolean` | `false`      | 중앙 정렬 여부                                      |
| `scrollable` | `boolean` | `false`      | 자체 스크롤 영역 사용 여부                               |
| `padding`    | `boolean` | `true`       | 기본 패딩 적용 여부                                   |

### 3.2. 상태 (States)

- **Normal**: 기본 콘텐츠 표시 상태
- **Loading**: 비동기 페이지 로딩 중 스피너 또는 스켈레톤 UI 표시
- **Empty**: 콘텐츠가 없을 경우 안내 영역 표시

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)**         | **발생 시점**                       |
| -------- | ----------------------- | ------------------------------- |
| `scroll` | `{ scrollTop: number }` | `scrollable` 속성 활성화 시 스크롤 발생 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-content-container-max-width-sm: 800px;
  --ui-content-container-max-width-md: 1200px;
  --ui-content-container-max-width-lg: 1600px;
  --ui-content-container-padding-x: 24px;
  --ui-content-container-padding-y: 24px;

  /* Colors */
  --ui-content-container-bg-color: #f9fafb;
  --ui-content-container-card-bg-color: #ffffff;
  --ui-content-container-border-color: #e5e7eb;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="main"`**: Application Shell 내 핵심 본문 컨테이너임을 명시
- **`aria-busy`**: `loading` 상태 활성화 시 `'true'` 연동

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 컨테이너 내부 첫 번째 포커스 가능 요소로 진입
- **`PageUp / PageDown / Arrows`**: `scrollable` 속성 사용 시 키보드를 통한 스크롤 제어 지원

### 5.3. 스크린 리더 대응

- landmark 역할을 수행하도록 `<main>` 키워드 기반 구조를 구성하여 페이지 탐색 시 본문 영역으로 바로 이동 가능하도록 지원