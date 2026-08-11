# SearchInput 요구사항 정의서

검색어 입력 및 즉시 검색을 위한 전용 검색 필드 구조
## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Label`: 상단 또는 좌측에 위치하는 입력 필드 명칭 영역
- `Search Icon`: 좌측 internal slot에 위치하여 검색 필드임을 직관적으로 나타내는 아이콘 영역
- `Input Control`: 검색 키워드 입력을 수신하는 필드
- `Clear Button`: 우측 internal slot에 위치하여 입력된 검색어를 한 번에 삭제하는 초기화 버튼
- `Search Action Button`: 우측 internal slot 또는 외부에 위치하여 검색을 실행하는 전용 버튼
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
|`start-slot`|최좌측 내부 주입 영역 (기본 검색 아이콘 위치)|RTL 대응 고려 명명|
|`end-slot`|최우측 내부 주입 영역 (초기화 및 검색 실행 버튼 등)||
|`search-button-slot`|외부 연동 검색 실행 버튼 주입 영역|기본 버튼 대체 가능|
|`helper-text-slot`|하단 안내/에러 메시지 영역||

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**              | **타입**    | **기본값**        | **설명**                  |
| -------------------- | --------- | -------------- | ----------------------- |
| `value`              | `string`  | `''`           | 검색 입력 필드 값              |
| `placeholder`        | `string`  | `'검색어를 입력하세요'` | 플레이스홀더 텍스트              |
| `clearable`          | `boolean` | `true`         | 입력값 초기화(Clear) 버튼 노출 여부 |
| `show-search-button` | `boolean` | `false`        | 우측 검색 실행 버튼 노출 여부       |
| `loading`            | `boolean` | `false`        | 검색 처리 중 스피너 노출 여부       |
| `required`           | `boolean` | `false`        | 필수 입력 여부                |
| `readonly`           | `boolean` | `false`        | 읽기 전용 여부                |
| `disabled`           | `boolean` | `false`        | 비활성화 여부                 |
| `error`              | `boolean` | `false`        | 유효성 에러 상태 여부            |

### 3.2. 상태 (States)

- **Hover**: 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 포커스 진입 및 키보드 포커스 링 표시
- **Active / Searching**: 검색 실행 클릭 또는 Enter 키 입력 시 상태
- **Disabled**: 비활성화 (인터랙션 및 검색 불가, 시각적 Dim 처리)
- **Readonly**: 읽기 전용 (검색어 수정 및 검색 실행 불가, 복사 가능)
- **Error**: 유효성 검사 실패 (시각적 에러 강조)
- **Loading**: 비동기 검색 처리 중 스피너 표시 (아이콘 영역 대체)

### 3.3. 이벤트 (Events)

|**이벤트명**|**상세 (Detail)**|**발생 시점**|
|---|---|---|
|`input`|`{ value: string }`|값 변경 시 실시간 방출|
|`change`|`{ value: string }`|값 변경 후 포커스 해제 시 방출|
|`search`|`{ value: string }`|Enter 키 입력 또는 검색 버튼 클릭 시 방출|
|`clear`|`void`|초기화 버튼 클릭 시 방출|
|`focus`|`FocusEvent`|포커스 진입 시 방출|
|`blur`|`FocusEvent`|포커스 해제 시 방출|

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-search-input-height-sm: 32px;
  --ui-search-input-height-md: 40px;
  --ui-search-input-height-lg: 48px;
  --ui-search-input-padding-x: 12px;
  --ui-search-input-padding-y: 8px;
  --ui-search-input-border-radius: 4px;

  /* Colors - Base */
  --ui-search-input-bg-color: #ffffff;
  --ui-search-input-border-color: #d1d5db;
  --ui-search-input-text-color: #111827;
  --ui-search-input-placeholder-color: #9ca3af;
  --ui-search-input-icon-color: #6b7280;

  /* Colors - Interactive States */
  --ui-search-input-hover-border-color: #9ca3af;
  --ui-search-input-focus-border-color: #2563eb;
  --ui-search-input-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-search-input-error-color: #dc2626;
  --ui-search-input-disabled-bg-color: #f3f4f6;
  --ui-search-input-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="searchbox"`**: 일반 입력 필드와 구분하여 검색 전용 입력 랜드마크 기능 수행
- **`aria-invalid`**: `error` 속성 활성화 시 `'true'`로 연동
- **`aria-required`**: `required` 속성 활성화 시 `'true'`로 연동
- **`aria-describedby`**: `helper-text-slot` 영역의 ID와 입력 필드를 연결하여 스크린 리더 안내
- **`aria-label`** (버튼): 초기화 버튼에 "검색어 삭제", 검색 버튼에 "검색 실행" 접근성 레이블 부여

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 포커스 이동 순서 준수 (입력 필드 -> 초기화 버튼 -> 검색 버튼 순으로 진입)
- **`Enter`**: 입력 필드 내에서 Enter 키 입력 시 `search` 이벤트 트리거
- **`Escape`**: 입력 필드에 값이 존재할 때 Escape 키 입력 시 검색어 초기화 (`clear` 이벤트 방출)

### 5.3. 스크린 리더 대응

- 검색어 초기화 실행 시 스크린 리더에 "검색어가 지워졌습니다"를 음성으로 안내하고, `loading` 상태 전환 시 `aria-busy="true"`를 적용하여 현재 검색 작업이 진행 중임을 인지시킵니다.