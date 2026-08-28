# [Breadcrumb] 요구사항 정의서

브레드크럼(Breadcrumb)은 사용자가 현재 웹 애플리케이션 내에서 어떤 위치에 있는지 계층적 구조로 시각화하여 보여주고, 상위 단계로 신속하게 이동할 수 있도록 지원하는 탐색(Navigation) 경로입니다.

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- 최상위 컨테이너, 계층별 항목(Breadcrumb Item), 구분자(Separator), 오버플로우 처리용 더보기 버튼으로 구획을 구성합니다.

### 1.2. 형태 옵션 (Variants)

- `Standard`: 기본 텍스트 및 구분자 조합 스타일
- `Contained`: 각 계층 항목이 칩 또는 배경 블록 형태로 둘러싸인 스타일
- `Standard-Icon`: 항목 내 아이콘과 텍스트가 함께 노출되는 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `wrap`: 너비 초과 시 다음 줄 바꿈 처리 여부 (기본값은 한 줄 노출 및 오버플로우 축약)

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)** | **비고 (Remarks)** |
| --- | --- | --- |
| `start-slot` | 최좌측 내부 주입 영역 (홈 아이콘 등) |  |
| `separator-slot` | 커스텀 구분자 아이콘/문자 주입 영역 | 기본값은 `/` 또는 `>` |
| `end-slot` | 최우측 내부 주입 영역 (추가 액션 버튼 등) |  |
| `dropdown-slot` | 축약된 항목들을 보여줄 드롭다운 메뉴 영역 | 오버플로우 발생 시 사용 |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `items` | `Array<{label: string, href?: string, icon?: string}>` | `[]` | 경로 데이터 배열 |
| `max-items` | `number` | `0` | 최대 노출 항목 수 (초과 시 중간 항목 축약, 0은 전체 노출) |
| `items-before-collapse` | `number` | `1` | 축약 시 앞쪽에 남겨둘 항목 수 |
| `items-after-collapse` | `number` | `1` | 축약 시 뒤쪽에 남겨둘 항목 수 |
| `separator` | `string` | `'/'` | 기본 구분자 문자열 |
| `disabled` | `boolean` | `false` | 전체 비활성화 여부 |

### 3.2. 상태 (States)

- **Hover**: 각 탐색 링크 마우스 오버 시 시각적 피드백 (밑줄, 색상 변경)
- **Focus / Focus-visible**: 키보드 포커스 진입 시 포커스 링 표시
- **Active / Pressed**: 클릭/터치 시 반응 상태
- **Current**: 현재 위치하고 있는 마지막 경로 항목 상태 (인터랙션 불가 또는 강조)
- **Disabled**: 비활성화 (인터랙션 불가, 시각적 Dim)

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `breadcrumb-click` | `{ item: object, index: number, originalEvent: Event }` | 경로 항목 클릭 시 방출 |
| `overflow-click` | `{ collapsedItems: Array }` | 축약 버튼(...) 클릭 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-breadcrumb-height-sm: 28px;
  --ui-breadcrumb-height-md: 36px;
  --ui-breadcrumb-height-lg: 44px;
  --ui-breadcrumb-gap: 8px;
  --ui-breadcrumb-padding-x: 0px;
  --ui-breadcrumb-padding-y: 4px;

  /* Typography */
  --ui-breadcrumb-font-size-sm: 12px;
  --ui-breadcrumb-font-size-md: 14px;
  --ui-breadcrumb-font-size-lg: 16px;

  /* Colors - Base */
  --ui-breadcrumb-text-color: #4b5563;
  --ui-breadcrumb-current-text-color: #111827;
  --ui-breadcrumb-separator-color: #9ca3af;

  /* Colors - Interactive States */
  --ui-breadcrumb-hover-text-color: #2563eb;
  --ui-breadcrumb-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Disabled */
  --ui-breadcrumb-disabled-text-color: #d1d5db;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="navigation"`**: 최상위 컨테이너에 내비게이션 역할 부여
- **`aria-label="Breadcrumb"`**: 탐색 영역의 목적을 명확히 정의
- **`aria-current="page"`**: 현재 위치한 마지막 경로 항목에 바인딩
- **`aria-hidden="true"`**: visual 전용 구분자(separator) 요소에 바인딩하여 스크린 리더 음성 출력 제외

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 각 경로 링크 간 순차적 포커스 이동
- **`Enter` / `Space`**: 포커스된 경로 항목의 링크 실행 또는 이벤트 트리거

### 5.3. 스크린 리더 대응

- 경로가 `<ol>` 및 `<li>` 태그 기반의 정돈된 리스트 구조로 전달되도록 Shadow DOM 내부 구조를 유지합니다.