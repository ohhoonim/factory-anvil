# [DblToggleButton] 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

* 사용자의 클릭/터치 상호작용을 통해 단일 토글을 넘어 두 가지 이상의 상호 배타적이거나 독립적인 2중(Dual) 상태 세그먼트 간의 전환을 수행하는 버튼의 기본 레이아웃 및 시각적 구획을 정의합니다.

### 1.2. 형태 옵션 (Variants)

* 컴포넌트의 시각적 형태 스타일 옵션을 정의합니다.
* `Contained`: 양쪽 세그먼트 영역이 채워진 배경색 중심의 스타일
* `Outlined`: 전체 테두리 중심 및 내부 세그먼트 구분선 스타일
* `Standard`: 하단 경계선 및 탭 형태 결합 스타일



### 1.3. 크기 옵션 (Sizes)

* 컴포넌트의 높이, 내부 패딩, 폰트 크기 등을 제어하는 규격 옵션을 정의합니다.
* `Small` / `Medium` / `Large`



### 1.4. 레이아웃 제어 (Layout Properties)

* `full-width`: 부모 요소 너비 100% 확장 여부

---

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

* Shadow DOM 내부로 HTML 엘리먼트를 주입받는 영역(`<slot>`)을 정의합니다.

| 슬롯명 (Slot Name) | 설명 (Description) | 비고 (Remarks) |
| --- | --- | --- |
| `left-icon-slot` | 좌측 세그먼트 아이콘 주입 영역 |  |
| `left-label-slot` | 좌측 세그먼트 텍스트 레이블 영역 |  |
| `right-icon-slot` | 우측 세그먼트 아이콘 주입 영역 |  |
| `right-label-slot` | 우측 세그먼트 텍스트 레이블 영역 |  |

---

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| 속성명 | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `value` | `string` | `''` | 현재 선택된 듀얼 토글 값 (좌/우 세그먼트 중 매핑된 값) |
| `left-value` | `string` | `'left'` | 좌측 세그먼트 고유 값 |
| `right-value` | `string` | `'right'` | 우측 세그먼트 고유 값 |
| `disabled` | `boolean` | `false` | 전체 컴포넌트 비활성화 여부 |
| `readonly` | `boolean` | `false` | 읽기 전용 여부 |

### 3.2. 상태 (States)

* **Hover**: 각 세그먼트 마우스 오버 시 시각적 피드백
* **Focus / Focus-visible**: 포커스 진입 및 키보드 포커스 링 표시
* **Active / Pressed**: 클릭/터치 시 반응 상태
* **Selected (Left/Right)**: 좌측 또는 우측 세그먼트가 선택된 활성 상태
* **Disabled**: 비활성화 (인터랙션 불가, 시각적 Dim)

### 3.3. 이벤트 (Events)

| 이벤트명 | 상세 (Detail) | 발생 시점 |
| --- | --- | --- |
| `change` | `{ value: string, side: 'left' | 'right' }` |
| `focus` | `FocusEvent` | 컴포넌트 포커스 진입 시 방출 |
| `blur` | `FocusEvent` | 컴포넌트 포커스 해제 시 방출 |

---

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

* 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`--ui-comp-*`)를 준수합니다.

```css
:host {
  /* Layout & Sizing */
  --ui-dbl-toggle-height-sm: 32px;
  --ui-dbl-toggle-height-md: 40px;
  --ui-dbl-toggle-height-lg: 48px;
  --ui-dbl-toggle-padding-x: 16px;
  --ui-dbl-toggle-border-radius: 6px;

  /* Colors - Base (Container & Inactive Segments) */
  --ui-dbl-toggle-bg-color: #f3f4f6;
  --ui-dbl-toggle-border-color: #d1d5db;
  --ui-dbl-toggle-text-color: #4b5563;

  /* Colors - Active Segment State */
  --ui-dbl-toggle-active-bg-color: #ffffff;
  --ui-dbl-toggle-active-text-color: #111827;
  --ui-dbl-toggle-active-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  /* Colors - Interactive & Disabled */
  --ui-dbl-toggle-hover-text-color: #111827;
  --ui-dbl-toggle-focus-ring-color: rgba(37, 99, 235, 0.2);
  --ui-dbl-toggle-disabled-bg-color: #f9fafb;
  --ui-dbl-toggle-disabled-text-color: #9ca3af;
}

```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

* **`role`**: `radiogroup` 또는 동등한 토글 그룹 역할을 부여하여 상호 배타적 선택 구조 명시
* **`aria-pressed` / `aria-checked**`: 각 세그먼트별 현재 선택 상태(`true` / `false`)를 스크린 리더에 전달
* **`aria-disabled`**: `disabled` 상태 시 연동

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

* **`Tab`**: 컴포넌트 전체 영역으로 포커스 진입 순서 준수
* **`Arrow Left` / `Arrow Right**`: 좌/우 세그먼트 간 포커스 이동 및 선택 상태 즉시 전환
* **`Space` / `Enter**`: 현재 포커스된 세그먼트 선택 활성화

### 5.3. 스크린 리더 대응

* Shadow DOM 내부에서 사용자가 현재 어느 세그먼트(좌/우)를 선택했는지 상태 변화(`aria-checked` 또는 `aria-pressed`)를 실시간으로 음성 안내하도록 동기화합니다.