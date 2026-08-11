# MultilineTextInput 요구사항 정의서


다행 텍스트 입력을 위한 영역 확장형 컨트롤 지원

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Label`: 상단 또는 좌측에 위치하는 입력 필드 명칭 영역
- `TextArea Control`: 여러 줄의 장문 텍스트 입력을 수신하는 영역 및 리사이즈 핸들
- `Character Counter`: 하단 우측에 위치하여 현재 입력된 글자 수 및 최대 글자 수를 표시하는 영역
- `Helper Text / Error Message`: 하단 안내 문구 및 유효성 검사 에러 메시지 영역

### 1.2. 형태 옵션 (Variants)

- `Outlined`: 테두리 중심 스타일
- `Filled`: 배경색 중심 스타일
- `Standard`: 하단 경계선 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `auto-resize`: 입력된 텍스트 양에 따라 높이가 자동으로 조절되는 기능 여부
- `resize`: 사용자에 의한 수동 크기 조절 옵션 (`none`, `both`, `horizontal`, `vertical`)

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

|**슬롯명 (Slot Name)**|**설명 (Description)**|**비고 (Remarks)**|
|---|---|---|
|`label-slot`|상단/좌측 레이블 영역|표준 `<label>` 태그 충돌 방지|
|`header-extra-slot`|레이블 우측 부가 영역 (툴팁, 액션 등)||
|`footer-extra-slot`|하단 보조 영역 (글자 수 카운터 좌측 커스텀 메시지 등)||
|`helper-text-slot`|하단 안내/에러 메시지 영역||

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

|**속성명**|**타입**|**기본값**|**설명**|
|---|---|---|---|
|`value`|`string`|`''`|입력 필드 값|
|`placeholder`|`string`|`''`|플레이스홀더 텍스트|
|`rows`|`number`|`3`|기본 노출 줄 수|
|`max-rows`|`number`|`0`|`auto-resize` 사용 시 최대 확장 가능 줄 수 (0은 무제한)|
|`maxlength`|`number`|`undefined`|최대 입력 가능 글자 수|
|`show-count`|`boolean`|`false`|글자 수 카운터 표시 여부|
|`auto-resize`|`boolean`|`false`|텍스트 양에 따른 높이 자동 조절 여부|
|`resize`|`string`|`'vertical'`|리사이즈 방향 (`none`, `both`, `horizontal`, `vertical`)|
|`required`|`boolean`|`false`|필수 입력 여부|
|`readonly`|`boolean`|`false`|읽기 전용 여부|
|`disabled`|`boolean`|`false`|비활성화 여부|
|`error`|`boolean`|`false`|유효성 에러 상태 여부|

### 3.2. 상태 (States)

- **Hover**: 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 포커스 진입 및 키보드 포커스 링 표시
- **Disabled**: 비활성화 (인터랙션 및 입력 불가, 시각적 Dim 처리)
- **Readonly**: 읽기 전용 (텍스트 선택 및 복사 가능, 수정 불가)
- **Error**: 유효성 검사 실패 또는 글자 수 초과 (시각적 에러 강조)

### 3.3. 이벤트 (Events)

|**이벤트명**|**상세 (Detail)**|**발생 시점**|
|---|---|---|
|`input`|`{ value: string }`|값 변경 시 실시간 방출|
|`change`|`{ value: string }`|값 변경 후 포커스 해제 시 방출|
|`focus`|`FocusEvent`|포커스 진입 시 방출|
|`blur`|`FocusEvent`|포커스 해제 시 방출|

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-multiline-input-min-height: 80px;
  --ui-multiline-input-padding-x: 12px;
  --ui-multiline-input-padding-y: 8px;
  --ui-multiline-input-border-radius: 4px;

  /* Colors - Base */
  --ui-multiline-input-bg-color: #ffffff;
  --ui-multiline-input-border-color: #d1d5db;
  --ui-multiline-input-text-color: #111827;
  --ui-multiline-input-placeholder-color: #9ca3af;
  --ui-multiline-input-counter-color: #6b7280;

  /* Colors - Interactive States */
  --ui-multiline-input-hover-border-color: #9ca3af;
  --ui-multiline-input-focus-border-color: #2563eb;
  --ui-multiline-input-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-multiline-input-error-color: #dc2626;
  --ui-multiline-input-disabled-bg-color: #f3f4f6;
  --ui-multiline-input-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`aria-invalid`**: `error` 속성 활성화 시 `'true'`로 연동
- **`aria-required`**: `required` 속성 활성화 시 `'true'`로 연동
- **`aria-describedby`**: `helper-text-slot` 영역 및 글자 수 카운터 영역의 ID와 입력 필드를 연결하여 스크린 리더 안내
- **`aria-multiline`**: `'true'`로 바인딩하여 장문 입력 필드임을 명시

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 포커스 이동 순서 준수 (Shadow DOM 내부 입력 요소 진입)
- **`Enter`**: 다음 줄로 개행(Line break) 처리

### 5.3. 스크린 리더 대응

- 글자 수 제한(`maxlength`) 초과에 임계점이 도달하거나 에러가 발생할 경우 `aria-live="polite"` 영역을 통해 현재 글자 수 상태를 음성으로 제공합니다.