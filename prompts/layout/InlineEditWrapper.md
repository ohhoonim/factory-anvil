# InlineEditWrapper 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `View Area`: 편집 전 텍스트 또는 렌더링된 데이터 값을 노출하는 읽기 전용 영역
- `Edit Control Area`: 클릭/포커스 전환 시 노출되는 인라인 편집 컨트롤(Input, Select 등) 주입 영역
- `Action Buttons (Optional)`: 편집 모드 진입 시 우측 또는 하단에 노출되는 저장/취소 버튼 구획

### 1.2. 형태 옵션 (Variants)

- `Standard`: 별도 경계선 없이 호버 시에만 텍스트 하이라이트가 표시되는 기본 스타일
- `Outlined`: View Mode에서도 편집 가능 영역임을 나타내는 경계선/패딩 스타일
- `Ghost`: 텍스트 형태를 유지하며 최소한의 편집 피드백만 제공하는 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `show-actions`: 저장/취소 버튼 영역 노출 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**         | **비고 (Remarks)** |
| ------------------- | ---------------------------- | ---------------- |
| `default`           | Edit Mode 시 노출될 편집 컨트롤 주입 영역 | Input, Select 등  |
| `view-slot`         | View Mode 시 노출될 텍스트/표시 영역    | 미지정 시 기본 텍스트 표시  |
| `actions-slot`      | 편집 모드 우측/하단 저장/취소 커스텀 버튼 영역  |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**        | **타입**    | **기본값**   | **설명**                                          |
| -------------- | --------- | --------- | ----------------------------------------------- |
| `value`        | `string`  | `''`      | 편집 대상 데이터 값                                     |
| `mode`         | `string`  | `'view'`  | 현재 표시 모드 (`view`, `edit`)                       |
| `trigger`      | `string`  | `'click'` | Edit Mode 전환 트리가 (`click`, `dblclick`, `focus`) |
| `show-actions` | `boolean` | `false`   | 저장/취소 액션 버튼 노출 여부                               |
| `auto-save`    | `boolean` | `true`    | Blur 시 자동 저장 처리 여부                              |
| `disabled`     | `boolean` | `false`   | 편집 모드 전환 비활성화 여부                                |
| `error`        | `boolean` | `false`   | 편집 값 유효성 에러 상태 여부                               |

### 3.2. 상태 (States)

- **View**: 일반 텍스트 노출 상태
- **Hover**: View Mode 상태에서 마우스 오버 시 편집 가능 영역 피드백 (연한 배경/아이콘 노출)
- **Edit**: 편집 필드 진입 및 키보드/마우스 입력 수신 상태
- **Disabled**: 비활성화 상태 (인터랙션 불가, Dim 처리)
- **Loading / Saving**: 편집 완료 후 데이터 비동기 저장 중 스피너 표시

### 3.3. 이벤트 (Events)

| **이벤트명**      | **상세 (Detail)**                       | **발생 시점**                       |
| ------------- | ------------------------------------- | ------------------------------- |
| `mode-change` | `{ mode: 'view' \| 'edit' }`          | View Mode <-> Edit Mode 전환 시 방출 |
| `save`        | `{ value: string, oldValue: string }` | 편집 저장 확정 시 방출                   |
| `cancel`      | `{ value: string }`                   | 편집 취소 및 이전 값 복원 시 방출            |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-inline-edit-min-height-sm: 32px;
  --ui-inline-edit-min-height-md: 40px;
  --ui-inline-edit-min-height-lg: 48px;
  --ui-inline-edit-padding-x: 8px;
  --ui-inline-edit-padding-y: 4px;
  --ui-inline-edit-border-radius: 4px;

  /* Colors - Base */
  --ui-inline-edit-view-text-color: #111827;
  --ui-inline-edit-view-hover-bg: #f3f4f6;
  --ui-inline-edit-edit-bg: #ffffff;
  --ui-inline-edit-border-color: #d1d5db;

  /* Colors - Interactive States */
  --ui-inline-edit-focus-border-color: #2563eb;
  --ui-inline-edit-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-inline-edit-error-color: #dc2626;
  --ui-inline-edit-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="button"`** (View Mode): View Mode의 표시 영역에 버튼 역할을 부여하여 클릭 및 포커스 가능 영역임을 전달
- **`aria-label`**: "편집하려면 선택하세요: [현재 값]" 형태의 명확한 상태 안내 적용
- **`aria-expanded`**: `mode="edit"` 시 `'true'`, `mode="view"` 시 `'false'` 설정

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Enter / Space`**: View Mode 포커스 시 Edit Mode로 전환
- **`Enter`**: Edit Mode에서 입력 내용 저장 및 View Mode로 복귀 (`auto-save` 또는 폼 내 스코프 연동)
- **`Escape`**: Edit Mode에서 입력 내용을 취소하고 기존 값 복원 후 View Mode로 복귀
- **`Tab`**: Edit Mode 진입 시 내부 입력 컴포넌트로 포커스 자동 이동

### 5.3. 스크린 리더 대응

- View Mode에서 Edit Mode로 전환되는 즉시 내부 입력 컨트롤에 자동 포커스(`focus()`)를 적용하여 스크린 리더가 수정 가능한 입력 필드로 전환되었음을 즉시 음성 안내하도록 제어합니다.