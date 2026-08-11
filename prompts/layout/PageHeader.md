# PageHeader 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Breadcrumb`: 페이지 상위 이동 경로 표시 영역
- `Title & Subtitle`: 페이지 주 제목 및 부제목 영역
- `Meta Status`: 상태 태그/배지 등 상단 부가 정보 영역
- `Extra Actions`: 우측 상단 주요 작업 버튼 영역

### 1.2. 형태 옵션 (Variants)

- `Standard`: 기본 투명 배경 스타일
- `Filled`: 배경색 지정 카드 형태 스타일
- `Ghost`: 테두리 및 배경이 최소화된 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `compact`: 여백 축소 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)**  | **설명 (Description)** | **비고 (Remarks)** |
| -------------------- | -------------------- | ---------------- |
| `breadcrumb-slot`    | 상단 브레드크럼 위치          |                  |
| `title-slot`         | 메인 타이틀 영역            | 기본 텍스트 속성 대체 가능  |
| `subtitle-slot`      | 서브 타이틀 영역            |                  |
| `meta-status-slot`   | 타이틀 우측 메타 상태 표시 영역   | 배지, 태그 등         |
| `extra-actions-slot` | 우측 상단 액션 버튼 영역       | 버튼, 드롭다운 등       |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**      | **타입**    | **기본값**      | **설명**                                |
| ------------ | --------- | ------------ | ------------------------------------- |
| `title`      | `string`  | `''`         | 페이지 메인 타이틀                            |
| `subtitle`   | `string`  | `''`         | 페이지 서브 타이틀                            |
| `variant`    | `string`  | `'standard'` | 형태 옵션 (`standard`, `filled`, `ghost`) |
| `size`       | `string`  | `'medium'`   | 크기 옵션 (`small`, `medium`, `large`)    |
| `full-width` | `boolean` | `false`      | 너비 100% 확장 여부                         |
| `compact`    | `boolean` | `false`      | 컴팩트 레이아웃 여부                           |

### 3.2. 상태 (States)

- **Hover**: 액션 요소 오버 시 피드백
- **Focus / Focus-visible**: 키보드 접근 시 포커스 링 표시
- **Loading**: 스켈레톤 로딩 상태 표시

### 3.3. 이벤트 (Events)

| **이벤트명**       | **상세 (Detail)**        | **발생 시점**             |
| -------------- | ---------------------- | --------------------- |
| `action-click` | `{ actionId: string }` | Extra Actions 클릭 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-page-header-padding-x: 24px;
  --ui-page-header-padding-y: 16px;
  --ui-page-header-title-size-sm: 18px;
  --ui-page-header-title-size-md: 24px;
  --ui-page-header-title-size-lg: 30px;
  
  /* Colors */
  --ui-page-header-bg-color: #ffffff;
  --ui-page-header-border-color: #e5e7eb;
  --ui-page-header-title-color: #111827;
  --ui-page-header-subtitle-color: #6b7280;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="region"`**: 독립된 시각적 영역으로 식별되도록 설정
- **`aria-label`**: 컴포넌트 구분을 위해 "Page Header" 기본 바인딩

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: internal Breadcrumb 및 Extra Actions 슬롯 내부 포커스 가능 요소 순차 이동

### 5.3. 스크린 리더 대응

- 메인 타이틀은 `<h1>` 레벨 구조를 기본 유지하여 스크린 리더에서 가누기를 신속히 수행할 수 있도록 설정