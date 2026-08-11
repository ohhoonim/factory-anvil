# FormWrapper 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Label & Required Indicator`: 필드 명칭 영역 및 필수 입력 표시(`*`)
- `Input Control Area`: 하위 단일 입력 컴포넌트(Input, Select, Switch 등)가 주입되는 영역
- `Message Area`: 하단 안내 문구(Helper Text), 에러 메시지(Error Message) 및 성공 메시지(Success Message) 영역

### 1.2. 형태 옵션 (Variants)

- `Vertical`: 레이블이 입력 필드 상단에 위치하는 수직 정렬 스타일
- `Horizontal`: 레이블이 입력 필드 좌측에 위치하는 수평 정렬 스타일
- `Inline`: 입력 필드와 메시지가 한 줄로 배치되는 축소형 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `label-width`: `Horizontal` 모드 시 좌측 레이블 고정 너비 지정

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**    | **비고 (Remarks)**        |
| ------------------- | ----------------------- | ----------------------- |
| `label-slot`        | 상단/좌측 레이블 영역            | 표준 `<label>` 태그 충돌 방지   |
| `default`           | 단일 입력 컴포넌트 주입 영역        | Input, Select, Switch 등 |
| `helper-text-slot`  | 하단 안내/에러/성공 메시지 영역      |                         |
| `extra-slot`        | 레이블 우측 부가 영역 (툴팁, 링크 등) |                         |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**           | **타입**    | **기본값**      | **설명**                                       |
| ----------------- | --------- | ------------ | -------------------------------------------- |
| `label`           | `string`  | `''`         | 필드 레이블 텍스트                                   |
| `required`        | `boolean` | `false`      | 필수 입력 여부 (`*` 표시 연동)                         |
| `helper-text`     | `string`  | `''`         | 기본 안내 문구                                     |
| `error-message`   | `string`  | `''`         | 에러 메시지 (설정 시 에러 상태 전환)                       |
| `success-message` | `string`  | `''`         | 성공 메시지 (설정 시 성공 상태 전환)                       |
| `layout`          | `string`  | `'vertical'` | 레이아웃 형태 (`vertical`, `horizontal`, `inline`) |
| `disabled`        | `boolean` | `false`      | 비활성화 여부                                      |

### 3.2. 상태 (States)

- **Normal**: 기본 안내 문구 표시 상태
- **Focus-within**: 내부 입력 컴포넌트로 포커스 진입 상태
- **Error**: 유효성 검사 실패 및 에러 메시지 강조 상태
- **Success**: 유효성 검사 통과 및 성공 메시지 강조 상태
- **Disabled**: 비활성화 상태 (하위 요소 Dim 및 인터랙션 제한)

### 3.3. 이벤트 (Events)

- 하위 단일 입력 컴포넌트의 이벤트를 투명하게 전파하며, FormWrapper 자체 방출 이벤트 없음.

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-form-wrapper-gap: 6px;
  --ui-form-wrapper-label-width: 120px;
  --ui-form-wrapper-label-margin-bottom: 4px;

  /* Colors - Base */
  --ui-form-wrapper-label-color: #111827;
  --ui-form-wrapper-required-color: #dc2626;
  --ui-form-wrapper-helper-text-color: #6b7280;

  /* Colors - Validation States */
  --ui-form-wrapper-error-color: #dc2626;
  --ui-form-wrapper-success-color: #16a34a;

  /* Colors - Disabled */
  --ui-form-wrapper-disabled-opacity: 0.5;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`aria-invalid`**: `error-message` 존재 시 하위 입력 컴포넌트에 `'true'` 전달
- **`aria-required`**: `required` 속성 활성화 시 하위 입력 컴포넌트에 `'true'` 전달
- **`aria-describedby`**: 안내/에러/성공 메시지 영역의 ID를 생성하여 하위 입력 컴포넌트의 `aria-describedby`와 자동 바인딩

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- 레이블 클릭 시 내부 주입된 단일 입력 컴포넌트로 포커스 이동

### 5.3. 스크린 리더 대응

- Shadow DOM 내부에서 생성된 레이블과 하위 입력 컴포넌트 간 `for`-`id` 바인딩을 자동으로 연결하여 스크린 리더가 필드 진입 시 레이블과 상태 메시지를 정확히 음성 안내하도록 구성