# grid-editor

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Editor Container**: 셀 더블클릭 시 해당 셀의 위치 및 크기 위에 동적으로 오버레이되거나 내부에 마운트되는 최외각 레이어입니다.
- **Form Control Host**: 컬럼 데이터 타입에 맞게 매핑된 입력 컨트롤(Input, Select, DatePicker 등)이 배치되는 영역입니다.
- **Validation Message Indicator**: 실시간 유효성 검증 실패 시 에러 스타일 및 툴팁/에러 메시지를 노출하는 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Inline`: 기존 셀 내부 영역에 맞춰 1:1 크기로 마운트되는 표준 편집기 형태입니다.
- `Popup / Overlay`: DatePicker, Select 등 드롭다운 형태의 팝업 UI가 셀 경계를 넘어 확장을 필요로 할 때 적용되는 형태입니다.
- `Invalid`: 유효성 검증에 실패하여 에러 테두리 및 메시지 인디케이터가 적용된 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Fit Cell`: 대상 `<grid-cell>`의 높이와 너비 규격을 정밀하게 승계하여 맞춤 적용됩니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `width`: 편집 대상 셀의 너비(`100%`)에 일치하도록 지정됩니다.
- `height`: 편집 대상 셀의 높이(`100%`)에 일치하도록 지정됩니다.

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **Custom Input Slot**: 기본 매핑 컨트롤(Text, Number, Select, DatePicker) 외 커스텀 입력 컴포넌트를 편집기 내부에 주입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `columnKey` | `string` | `""` | 편집 중인 컬럼의 고유 식별자입니다. |
| `rowIndex` | `number` | `-1` | 편집 중인 행의 인덱스 번호입니다. |
| `value` | `any` | `null` | 편집기에 바인딩되는 초기 원본 값입니다. |
| `type` | `string` | `'text'` | 입력 폼 타입을 결정하는 스키마 속성입니다 (`text`, `number`, `select`, `date` 등). |
| `options` | `Array<{label: string, value: any}>` | `[]` | `type='select'`일 때 드롭다운에 노출할 선택지 목록입니다. |
| `validationRules` | `ValidationRule` | `null` | 필수 여부, 최소/최대, 정규식 패턴 등 유효성 검증 규칙 객체입니다. |

### 3.2. 상태 (States)

- **Current Value (`editValue`)**: 편집기 내부 입력 폼에서 사용자가 실시간으로 수정 중인 값 상태입니다.
- **Validation State (`isValid`, `errorMessage`)**: 실시간 유효성 검증 수행 결과에 따른 통과 여부 및 에러 메시지 상태입니다.
- **Focus & Select State**: 마운트 완료 시 내부 Input 요소로 포커스가 자동 이동하고 텍스트 전체 선택(Select)이 적용된 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `cell-commit` | `{ rowIndex: number, columnKey: string, newValue: any, oldValue: any }` | Enter, Tab 입력 또는 Blur 발생 시 유효성 검증을 통과하여 최종 값 변경이 확정된 시점 |
| `cell-cancel` | `{ rowIndex: number, columnKey: string }` | Escape 키 입력으로 변경 사항을 취소하고 편집 모드를 종료하는 시점 |
| `validation-error` | `{ columnKey: string, errorMessage: string, value: any }` | 실시간 입력 값이 유효성 검증 규칙을 위반한 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-editor-bg: #ffffff;
  --ui-comp-grid-editor-border: 2px solid #0969da;
  --ui-comp-grid-editor-font-size: 13px;
  --ui-comp-grid-editor-padding: 0 6px;
  --ui-comp-grid-editor-error-border: #cf222e;
  --ui-comp-grid-editor-error-bg: #ffebe9;
  --ui-comp-grid-editor-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
```