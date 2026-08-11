# CardContainer 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Header`: 카드 상단 영역 (타이틀, 아이콘, 닫기/더보기 버튼 등)
- `Body`: 카드 중앙 메인 콘텐츠 영역
- `Footer`: 카드 하단 영역 (작업 버튼, 상태 메시지 등)
- 3개 영역이 독립적으로 구분되면서 수직으로 배치되는 컨테이너 구조를 정의합니다.

### 1.2. 형태 옵션 (Variants)

- `Outlined`: 테두리 중심 스타일
- `Filled`: 배경색 중심 스타일
- `Elevated`: 그림자(Shadow) 효과 중심 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `bordered-divider`: Header, Body, Footer 구획 간 구분선 표시 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**         | **비고 (Remarks)** |
| ------------------- | ---------------------------- | ---------------- |
| `header-slot`       | 카드 상단 헤더 영역                  | 타이틀, 아이콘 등       |
| `default`           | 카드 중앙 메인 본문 영역 (`body-slot`) |                  |
| `footer-slot`       | 카드 하단 푸터 영역                  | 주요 버튼 및 액션 등     |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**            | **타입**    | **기본값**      | **설명**                                   |
| ------------------ | --------- | ------------ | ---------------------------------------- |
| `variant`          | `string`  | `'outlined'` | 형태 옵션 (`outlined`, `filled`, `elevated`) |
| `size`             | `string`  | `'medium'`   | 크기 옵션 (`small`, `medium`, `large`)       |
| `full-width`       | `boolean` | `false`      | 너비 100% 확장 여부                            |
| `bordered-divider` | `boolean` | `false`      | Header, Body, Footer 사이 구분선 적용 여부        |
| `hoverable`        | `boolean` | `false`      | 마우스 오버 시 인터랙션 스타일 적용 여부                  |

### 3.2. 상태 (States)

- **Hover**: `hoverable` 활성화 시 마우스 오버 시각적 피드백 (그림자/테두리 변화)
- **Focus / Focus-visible**: 카드 전체 클릭/선택 가능 시 키보드 포커스 링 표시
- **Loading**: 카드 내부 콘텐츠 비동기 로딩 스피너/스켈레톤 표시
- **Disabled**: 비활성화 상태 (인터랙션 불가, Dim 처리)

### 3.3. 이벤트 (Events)

| **이벤트명**     | **상세 (Detail)** | **발생 시점**                          |
| ------------ | --------------- | ---------------------------------- |
| `card-click` | `MouseEvent`    | 카드 컨테이너 전체 클릭 시 방출 (클릭 가능한 카드인 경우) |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-card-padding-sm: 12px;
  --ui-card-padding-md: 16px;
  --ui-card-padding-lg: 24px;
  --ui-card-border-radius: 8px;

  /* Colors - Base */
  --ui-card-bg-color: #ffffff;
  --ui-card-border-color: #e5e7eb;
  --ui-card-divider-color: #f3f4f6;

  /* Elevation & States */
  --ui-card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --ui-card-hover-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="region"`** 또는 **`role="article"`**: 가치 있는 독립적 컨텐츠 영역임을 명시
- **`aria-labelledby`**: `header-slot` 내부의 타이틀 요소 ID와 연결하여 구획 설명 제공

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: Header, Body, Footer 내부의 포커스 가능 요소(버튼, 링크 등)로 순차 이동

### 5.3. 스크린 리더 대응

- 구획별 구분선(`bordered-divider`)은 단순 시각적 요소이므로 `aria-hidden="true"`를 적용하여 스크린 리더에서 불필요하게 읽히지 않도록 구성