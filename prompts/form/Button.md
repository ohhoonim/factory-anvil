# Button 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

* 버튼 아이콘 및 텍스트 레이블을 담는 영역과 배경, 테두리로 구성됩니다.

### 1.2. 형태 옵션 (Variants)

* `Filled` (Primary): 배경색 중심의 기본/강조 스타일
* `Outlined`: 테두리 중심의 스타일
* `Text`: 배경과 테두리가 없는 텍스트 중심 스타일

### 1.3. 크기 옵션 (Sizes)

* `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

* `full-width`: 부모 요소 너비 100% 확장 여부

---

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| 슬롯명 (Slot Name) | 설명 (Description) | 비고 (Remarks) |
| --- | --- | --- |
| `default` | 버튼 내부 기본 콘텐츠 (텍스트/레이블) |  |
| `start-slot` | 버튼 내부 좌측 주입 영역 (Prefix 아이콘 등) | RTL 대응 고려 명명 |
| `end-slot` | 버튼 내부 우측 주입 영역 (Suffix 아이콘 등) |  |

---

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| 속성명 | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `variant` | `'filled' | 'outlined' | 'text'` | `'filled'` | 버튼 시각적 형태 옵션 |
| `size` | `'small' | 'medium' | 'large'` | `'medium'` | 버튼 크기 옵션 |
| `type` | `'button' | 'submit' | 'reset'` | `'button'` | 버튼의 기능적 동작 타입 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `loading` | `boolean` | `false` | 로딩 상태 여부 (스피너 노출 및 인터랙션 차단) |
| `full-width` | `boolean` | `false` | 너비 100% 확장 여부 |

### 3.2. 상태 (States)

* **Hover**: 마우스 오버 시 시각적 피드백
* **Focus / Focus-visible**: 포커스 진입 및 키보드 포커스 링 표시
* **Active / Pressed**: 클릭/터치 시 눌림 상태 반응
* **Disabled**: 비활성화 (인터랙션 불가, 시각적 Dim 처리 및 `cursor: not-allowed`)
* **Loading**: 비동기 처리 중 스피너 표시 및 클릭 이벤트 차단

### 3.3. 이벤트 (Events)

| 이벤트명 | 상세 (Detail) | 발생 시점 |
| --- | --- | --- |
| `click` | `MouseEvent` | 버튼 클릭 시 방출 (`disabled` 또는 `loading` 시 차단) |
| `focus` | `FocusEvent` | 포커스 진입 시 방출 |
| `blur` | `FocusEvent` | 포커스 해제 시 방출 |

---

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```css
:host {
  /* Layout & Sizing */
  --ui-button-height-sm: 32px;
  --ui-button-height-md: 40px;
  --ui-button-height-lg: 48px;
  --ui-button-padding-x-sm: 12px;
  --ui-button-padding-x-md: 16px;
  --ui-button-padding-x-lg: 20px;
  --ui-button-border-radius: 4px;
  --ui-button-font-size-sm: 12px;
  --ui-button-font-size-md: 14px;
  --ui-button-font-size-lg: 16px;

  /* Colors - Base (Filled Variant) */
  --ui-button-bg-color: #2563eb;
  --ui-button-text-color: #ffffff;
  --ui-button-border-color: transparent;

  /* Colors - Interactive States */
  --ui-button-hover-bg-color: #1d4ed8;
  --ui-button-active-bg-color: #1e40af;
  --ui-button-focus-ring-color: rgba(37, 99, 235, 0.4);

  /* Colors - Disabled & Loading */
  --ui-button-disabled-bg-color: #e5e7eb;
  --ui-button-disabled-text-color: #9ca3af;
  --ui-button-disabled-border-color: transparent;
}

```

---

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

* **`role="button"`**: 표준 `<button>` 요소 또는 Custom Element의 롤 명시
* **`aria-disabled`**: `disabled` 또는 `loading` 상태 시 `'true'`로 연동
* **`aria-busy`**: `loading` 속성 활성화 시 `'true'`로 연동하여 진행 중 상태 전달

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

* **`Tab`**: 포커스 이동 순서 준수 (키보드 포커스 진입 가능)
* **`Enter` / `Space**`: 버튼 클릭 동작 트리거 (`preventDefault`로 스크롤 방지 및 `click` 이벤트 발생)

### 5.3. 스크린 리더 대응

* 아이콘 전용 버튼(Icon-only Button)의 경우 `aria-label` 속성을 통해 목적을 명확히 전달하도록 구성을 권장합니다.
* `loading` 상태 시 내부에 로딩 상태임을 알리는 대치 텍스트를 제공하여 스크린 리더가 인지할 수 있도록 합니다.