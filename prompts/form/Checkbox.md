# Checkbox 요구사항 정의서

독립된 단일 항목의 Boolean(True/False) 선택 또는 여러 항목을 동시 선택하기 위한 CheckboxGroup 내에서 동작하는 Checkbox 
## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Checkbox Control`: 선택 상태를 표시하는 사각형 박스 (체크, 미체크, 부분 선택 상태 시각화)
- `Label`: 선택 항목의 의미를 전달하는 텍스트 영역
- `Checkbox Group Context`: 상위 CheckboxGroup과의 상태 및 이벤트를 동기화하는 컨텍스트 연동 구획
- `Helper Text / Description Area`: 단일 체크박스 하단 보조 설명 영역

### 1.2. 형태 및 배치 옵션 (Variants & Placement)

- `Standard`: 체크박스 컨트롤 + 레이블 기본 형태
- `Button / Card`: 체크박스를 버튼 또는 카드 컨테이너 스타일로 감싼 형태
- `Label Position`: 레이블 위치 제어 (`right`: 컨트롤 우측, `left`: 컨트롤 좌측)

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 상위 그룹 연동 (Group Integration)

- 독립 단일 상태로 동작하거나, `CheckboxGroup` 하위 요소로 배치 시 그룹의 `value`, `disabled`, `readonly` 상태를 상속받아 동기화

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**                              | **비고 (Remarks)**      |
| ------------------- | ------------------------------------------------- | --------------------- |
| `default`           | 체크박스 우측/좌측 레이블 영역                                 | 텍스트 및 서브 타이틀 등 커스텀 노출 |
| `icon-slot`         | 선택(`checked`) 및 부분 선택(`indeterminate`) 아이콘 커스텀 영역 |                       |
| `description-slot`  | 체크박스 하단 보조 설명 텍스트 영역                              |                       |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**          | **타입**             | **기본값**   | **설명**                        |
| ---------------- | ------------------ | --------- | ----------------------------- |
| `checked`        | `boolean`          | `false`   | 단일 체크박스 선택 여부                 |
| `value`          | `string \| number` | `''`      | CheckboxGroup 내에서 식별자로 사용되는 값 |
| `indeterminate`  | `boolean`          | `false`   | 하위 항목 일부 선택 상태(미결정) 표시 여부     |
| `label-position` | `string`           | `'right'` | 레이블 위치 (`right`, `left`)      |
| `required`       | `boolean`          | `false`   | 필수 선택 여부                      |
| `readonly`       | `boolean`          | `false`   | 읽기 전용 여부                      |
| `disabled`       | `boolean`          | `false`   | 비활성화 여부 (그룹 제어 시 상속)          |
| `error`          | `boolean`          | `false`   | 유효성 에러 상태 여부                  |

### 3.2. 상태 (States)

- **Unchecked**: 선택되지 않은 기본 상태
- **Checked**: 선택 완료 상태
- **Indeterminate**: 하위 항목 일부만 선택된 상태 (대시 `-` 표시)
- **Hover**: 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 키보드 포커스 진입 및 포커스 링 표시
- **Disabled**: 비활성화 (인터랙션 및 선택 변경 불가, Dim 처리)
- **Readonly**: 읽기 전용 (선택 상태 유지, 인터랙션 불가)
- **Error**: 필수 선택 미충족 시 시각적 에러 강조

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)**                    | **발생 시점**                   |
| -------- | ---------------------------------- | --------------------------- |
| `change` | `{ checked: boolean, value: any }` | 선택 상태 변경 시 방출 (Group으로도 전달) |
| `focus`  | `FocusEvent`                       | 포커스 진입 시 방출                 |
| `blur`   | `FocusEvent`                       | 포커스 해제 시 방출                 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-checkbox-size-sm: 16px;
  --ui-checkbox-size-md: 20px;
  --ui-checkbox-size-lg: 24px;
  --ui-checkbox-label-gap: 8px;
  --ui-checkbox-border-radius: 4px;

  /* Colors - Base */
  --ui-checkbox-bg: #ffffff;
  --ui-checkbox-border-color: #d1d5db;
  --ui-checkbox-text-color: #111827;

  /* Colors - Checked & Indeterminate */
  --ui-checkbox-checked-bg: #2563eb;
  --ui-checkbox-checked-border-color: #2563eb;
  --ui-checkbox-icon-color: #ffffff;

  /* Colors - Interactive States */
  --ui-checkbox-hover-border-color: #9ca3af;
  --ui-checkbox-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-checkbox-error-color: #dc2626;
  --ui-checkbox-disabled-bg: #f3f4f6;
  --ui-checkbox-disabled-border-color: #e5e7eb;
  --ui-checkbox-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="checkbox"`**: 단일 선택 요소임을 명시 (표준 `<input type="checkbox">` 내부 사용 시 자동 대응)
- **`aria-checked`**: 상태에 따라 `'true'`, `'false'`, `'mixed'`(부분 선택) 동적 연동
- **`aria-invalid`**: `error` 속성 활성화 시 `'true'`로 연동
- **`aria-required`**: `required` 속성 활성화 시 `'true'`로 연동
- **`aria-describedby`**: `description-slot` 영역의 ID와 연결하여 스크린 리더 안내

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 체크박스 요소로 순차 포커스 이동
- **`Space`**: 포커스된 체크박스의 선택/해제 상태 전환 (`checked` <-> `unchecked`)

### 5.3. 스크린 리더 대응

- `indeterminate` 상태일 때 `aria-checked="mixed"`를 지정하여 스크린 리더가 "부분 선택됨"으로 음성 안내하도록 제어하고, `CheckboxGroup` 내부에서 동작 시 상위 그룹의 `aria-labelledby`를 통해 전체 범주 문맥을 함께 읽어줄 수 있도록 구현합니다.