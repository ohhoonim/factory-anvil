# [ToggleButton] 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

* 상태 전환을 위한 토글 스위치(Switch) 영역과 상태 레이블(Label) 영역으로 구성됩니다.

### 1.2. 형태 옵션 (Variants)

* `Standard`: 기본 토글 스위치 형태
* `WithLabel`: 토글 옆에 텍스트 상태값이 표시되는 형태

### 1.3. 크기 옵션 (Sizes)

* `Small` (24px Height) / `Medium` (32px Height) / `Large` (40px Height)

### 1.4. 레이아웃 제어 (Layout Properties)

* `label-position`: `left` | `right` (토글 기준 레이블 위치)

---

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| 슬롯명 (Slot Name) | 설명 (Description) | 비고 (Remarks) |
| --- | --- | --- |
| `label-slot` | 토글 옆에 표시될 텍스트 또는 상태 레이블 |  |
| `on-text-slot` | 토글 On 상태 시 내부 표시 텍스트 |  |
| `off-text-slot` | 토글 Off 상태 시 내부 표시 텍스트 |  |

---

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| 속성명 | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `checked` | `boolean` | `false` | 현재 토글 상태 (On/Off) |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `readonly` | `boolean` | `false` | 읽기 전용 (값 수정 불가) |

### 3.2. 상태 (States)

* **Checked (On)**: 활성화된 상태 (시각적 하이라이트 색상 적용)
* **Unchecked (Off)**: 비활성화된 상태
* **Hover**: 마우스 오버 시 시각적 피드백
* **Disabled**: 인터랙션 불가, Dim 처리
* **Focus-visible**: 키보드 탭 이동 시 포커스 링 표시

### 3.3. 이벤트 (Events)

| 이벤트명 | 상세 (Detail) | 발생 시점 |
| --- | --- | --- |
| `toggle` | `{ checked: boolean }` | 클릭 또는 키보드 조작으로 상태 변경 시 발생 |
| `change` | `{ checked: boolean }` | 상태 확정 후 외부로 방출 |

---

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```css
:host {
  /* Layout & Sizing */
  --ui-toggle-width-md: 52px;
  --ui-toggle-height-md: 32px;
  --ui-toggle-thumb-size: 24px;

  /* Colors */
  --ui-toggle-bg-off: #e5e7eb;
  --ui-toggle-bg-on: #2563eb;
  --ui-toggle-thumb-color: #ffffff;
  
  /* Interactive */
  --ui-toggle-disabled-opacity: 0.5;
  --ui-toggle-transition-duration: 0.2s;
}

```

---

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

* **`role`**: `'switch'`로 지정하여 스크린 리더에 토글 타입임을 알림
* **`aria-checked`**: `checked` 속성값과 실시간 연동 (`true` / `false`)
* **`aria-disabled`**: `disabled` 상태 시 연동

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

* **`Space` 또는 `Enter**`: 포커스 상태에서 토글 상태 전환 (`checked` 값 반전)

### 5.3. 스크린 리더 대응

* 토글의 현재 상태(On/Off)가 변경될 때마다 시각적으로 확인 가능해야 하며, 스크린 리더가 상태 변화를 즉시 인지할 수 있도록 `aria-checked`를 활용합니다.