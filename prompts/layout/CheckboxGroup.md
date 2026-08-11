# CheckboxGroup 요구사항 정의서
복수 선택 항목 관리를 위한 상위 Checkbox Group 컨테이너 구조

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Group Label`: 그룹 전체의 명칭 및 목적을 나타내는 레이블 영역
- `Checkbox Items Container`: 여러 개의 개별 Checkbox 컴포넌트들을 수직/수평으로 배치하고 관리하는 컨테이너 영역
- `Helper Text / Error Message`: 그룹 전체에 적용되는 안내 문구 및 유효성 검사 에러 메시지 영역

### 1.2. 형태 옵션 (Variants)

- `Standard`: 기본 텍스트 및 체크박스 형태의 스택 스타일
- `Card`: 개별 체크박스 항목이 카드 형태로 확장된 인라인/그리드 스타일
- `Button`: 버튼 형태(Segmented Button) 스타일의 그룹 옵션

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `orientation`: 개별 체크박스 배치 방향 제어 (`vertical`, `horizontal`)
- `full-width`: 부모 요소 너비 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

|**슬롯명 (Slot Name)**|**설명 (Description)**|**비고 (Remarks)**|
|---|---|---|
|`label-slot`|그룹 전체 상단/좌측 레이블 영역||
|`default`|하위 Checkbox 컴포넌트 주입 영역||
|`helper-text-slot`|하단 안내/에러 메시지 영역||

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

|**속성명**|**타입**|**기본값**|**설명**|
|---|---|---|---|
|`value`|`string[]`|`[]`|선택된 체크박스 항목들의 값 배열|
|`name`|`string`|`''`|폼 제출 시 사용할 그룹 명칭|
|`orientation`|`string`|`'vertical'`|항목 배치 방향 (`vertical`, `horizontal`)|
|`required`|`boolean`|`false`|필수 선택 여부|
|`disabled`|`boolean`|`false`|그룹 내 모든 체크박스 비활성화 여부|
|`readonly`|`boolean`|`false`|읽기 전용 여부|
|`error`|`boolean`|`false`|유효성 에러 상태 여부|
|`min`|`number`|`0`|최소 선택 필요 개수|
|`max`|`number`|`Infinity`|최대 선택 가능 개수|

### 3.2. 상태 (States)

- **Hover**: 하위 체크박스 항목 마우스 오버 시 피드백
- **Focus / Focus-visible**: 키보드 탐색 시 해당 체크박스 항목 포커스 링 표시
- **Disabled**: 그룹 전체 비활성화 (모든 하위 항목 인터랙션 불가, Dim 처리)
- **Readonly**: 읽기 전용 (선택 상태 변경 불가)
- **Error**: 유효성 검사 실패 (최소/최대 선택 수 미달 등 시각적 에러 강조)
- **Indeterminate**: 전체 선택 체크박스와 연동 시 일부만 선택된 상태

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)**       | **발생 시점**                       |
| -------- | --------------------- | ------------------------------- |
| `change` | `{ value: string[] }` | 하위 체크박스 선택/해제로 선택 항목 배열 변경 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-checkbox-group-gap-sm: 8px;
  --ui-checkbox-group-gap-md: 12px;
  --ui-checkbox-group-gap-lg: 16px;
  --ui-checkbox-group-label-margin-bottom: 8px;

  /* Colors - Base */
  --ui-checkbox-group-label-color: #111827;
  --ui-checkbox-group-helper-text-color: #6b7280;

  /* Colors - Error & Disabled */
  --ui-checkbox-group-error-color: #dc2626;
  --ui-checkbox-group-disabled-opacity: 0.5;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="group"`**: 체크박스 요소들을 하나로 묶는 그룹 역할 부여
- **`aria-labelledby`**: `label-slot` 영역의 ID와 연결하여 그룹 명칭 제공
- **`aria-describedby`**: `helper-text-slot` 영역의 ID와 연결하여 스크린 리더 안내
- **`aria-invalid`**: `error` 속성 활성화 시 `'true'`로 연동
- **`aria-required`**: `required` 속성 활성화 시 `'true'`로 연동

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 체크박스 그룹 내부의 각 체크박스 항목으로 순차 포커스 이동
- **`Space`**: 현재 포커스된 체크박스 항목의 선택 상태 토글

### 5.3. 스크린 리더 대응

- 그룹 롤(`role="group"`)과 `aria-labelledby`를 통해 스크린 리더 사용자가 개별 체크박스 진입 시 속한 그룹의 목적과 전체 선택 상태를 명확히 인지할 수 있도록 구성합니다.