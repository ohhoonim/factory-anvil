
# PasswordInput 요구사항 정의서

비밀번호 마스킹/언마스킹(보기/숨기기) 토글 아이콘 및 인터랙션 지원
## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Label`: 상단 또는 좌측에 위치하는 입력 필드 명칭 영역
- `Input Control`: 비밀번호 입력을 수신하는 필드 및 우측 가시성 토글 버튼 구획
- `Visibility Toggle Button`: 우측 internal slot에 배치되어 비밀번호 마스킹 해제/설정을 전환하는 아이콘 버튼
- `Helper Text / Error Message`: 하단 안내 문구 및 유효성 검사 에러 메시지 영역

### 1.2. 형태 옵션 (Variants)

- `Outlined`: 테두리 중심 스타일
- `Filled`: 배경색 중심 스타일
- `Standard`: 하단 경계선 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

|**슬롯명 (Slot Name)**|**설명 (Description)**|**비고 (Remarks)**|
|---|---|---|
|`label-slot`|상단/좌측 레이블 영역|표준 `<label>` 태그 충돌 방지|
|`start-slot`|최좌측 내부 주입 영역 (Prefix 아이콘 등)|RTL 대응 고려 명명|
|`end-slot`|우측 내부 주입 영역 (가시성 토글 버튼 옆 추가 아이콘)||
|`toggle-icon-slot`|비밀번호 가시성 토글 아이콘 대체 영역|기본 눈 모양 아이콘 대체 가능|
|`helper-text-slot`|하단 안내/에러 메시지 영역||

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

|**속성명**|**타입**|**기본값**|**설명**|
|---|---|---|---|
|`value`|`string`|`''`|입력 필드 값|
|`placeholder`|`string`|`''`|플레이스홀더 텍스트|
|`visible`|`boolean`|`false`|평문 노출 여부 (`true`: `text`, `false`: `password`)|
|`required`|`boolean`|`false`|필수 입력 여부|
|`readonly`|`boolean`|`false`|읽기 전용 여부|
|`disabled`|`boolean`|`false`|비활성화 여부|
|`error`|`boolean`|`false`|유효성 에러 상태 여부|
|`clearable`|`boolean`|`false`|초기화 버튼 노출 여부|

### 3.2. 상태 (States)

- **Masked**: 비밀번호가 마스킹 처리된 기본 상태 (`type="password"`)
- **Unmasked**: 비밀번호가 평문으로 노출되는 상태 (`type="text"`)
- **Hover**: 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 포커스 진입 및 키보드 포커스 링 표시
- **Disabled**: 비활성화 (인터랙션 및 토글 불가, 시각적 Dim)
- **Readonly**: 읽기 전용 (값 복사 가능, 수정 및 토글 불가)
- **Error**: 유효성 검사 실패 (시각적 에러 강조)

### 3.3. 이벤트 (Events)

| **이벤트명**            | **상세 (Detail)**        | **발생 시점**            |
| ------------------- | ---------------------- | -------------------- |
| `input`             | `{ value: string }`    | 값 변경 시 실시간 방출        |
| `change`            | `{ value: string }`    | 값 변경 후 포커스 해제 시 방출   |
| `toggle-visibility` | `{ visible: boolean }` | 우측 가시성 토글 버튼 클릭 시 방출 |
| `focus`             | `FocusEvent`           | 포커스 진입 시 방출          |
| `blur`              | `FocusEvent`           | 포커스 해제 시 방출          |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-password-input-height-sm: 32px;
  --ui-password-input-height-md: 40px;
  --ui-password-input-height-lg: 48px;
  --ui-password-input-padding-x: 12px;
  --ui-password-input-padding-y: 8px;
  --ui-password-input-border-radius: 4px;

  /* Colors - Base */
  --ui-password-input-bg-color: #ffffff;
  --ui-password-input-border-color: #d1d5db;
  --ui-password-input-text-color: #111827;
  --ui-password-input-placeholder-color: #9ca3af;
  --ui-password-input-toggle-icon-color: #6b7280;

  /* Colors - Interactive States */
  --ui-password-input-hover-border-color: #9ca3af;
  --ui-password-input-focus-border-color: #2563eb;
  --ui-password-input-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-password-input-error-color: #dc2626;
  --ui-password-input-disabled-bg-color: #f3f4f6;
  --ui-password-input-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`aria-invalid`**: `error` 속성 활성화 시 `'true'`로 연동
- **`aria-required`**: `required` 속성 활성화 시 `'true'`로 연동
- **`aria-describedby`**: `helper-text-slot` 영역의 ID와 입력 필드를 연결하여 스크린 리더 안내
- **`aria-label`** (토글 버튼): "비밀번호 표시" 또는 "비밀번호 숨기기"로 상태에 따라 동적 변경
- **`aria-pressed`** (토글 버튼): 평문 노출(`visible=true`) 시 `'true'`, 마스킹(`visible=false`) 시 `'false'` 바인딩

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 포커스 이동 순서 준수 (입력 필드 진입 후 가시성 토글 버튼으로 이동)
- **`Space / Enter`**: 토글 버튼에 포커스된 상태에서 비밀번호 가시성 상태 전환
- **`Escape`**: `clearable` 활성화 상태일 때 입력값 초기화

### 5.3. 스크린 리더 대응

- 가시성 토글 버튼 클릭 시 스크린 리더에 "비밀번호가 표시되었습니다" 또는 "비밀번호가 숨겨졌습니다"를 명확하게 음성 안내할 수 있도록 `aria-live="polite"` 영역 활용 또는 동적 접근성 레이블을 업데이트합니다.