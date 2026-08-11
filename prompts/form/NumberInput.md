# NumberInput 요구사항 정의서

수치(Number) 데이터 전용 입력 및 증감(Stepper) 버튼 컨트롤 제공
### 1.1. 기본 구성 요소 (Core Elements)

- `Label`: 상단 또는 좌측에 위치하는 입력 필드 명칭 영역
- `Input Control`: 숫자 데이터 입력을 수신하고 정렬(우측/좌측)을 처리하는 필드
- `Decrement Button (-)`: 수치를 지정된 `step` 단위만큼 감소시키는 버튼
- `Increment Button (+)`: 수치를 지정된 `step` 단위만큼 증가시키는 버튼
- `Helper Text / Error Message`: 하단 안내 문구 및 유효성 검사 에러 메시지 영역

### 1.2. 형태 옵션 (Variants)

- `Outlined`: 테두리 중심 스타일
- `Filled`: 배경색 중심 스타일
- `Standard`: 하단 경계선 스타일

### 1.3. 증감 버튼 배치 옵션 (Controls Placement)

- `End`: 입력 필드 우측에 증감 버튼이 나란히 배치되는 형태
- `Stacked`: 입력 필드 우측 내부에 상/하 버튼으로 중첩 배치되는 형태
- `Split`: 입력 필드 좌측에 감소(-), 우측에 증가(+) 버튼이 양끝으로 분할 배치되는 형태

### 1.4. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`
### 1.5. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)**   | **설명 (Description)**                 | **비고 (Remarks)**      |
| --------------------- | ------------------------------------ | --------------------- |
| `label-slot`          | 상단/좌측 레이블 영역                         | 표준 `<label>` 태그 충돌 방지 |
| `prefix-slot`         | 입력 필드 내부 좌측 영역 (통화 기호 `$`, `₩` 등)    |                       |
| `suffix-slot`         | 입력 필드 내부 우측 영역 (단위 `%`, `개`, `kg` 등) |                       |
| `decrement-icon-slot` | 감소(-) 버튼 커스텀 아이콘 영역                  |                       |
| `increment-icon-slot` | 증가(+) 버튼 커스텀 아이콘 영역                  |                       |
| `helper-text-slot`    | 하단 안내/에러 메시지 영역                      |                       |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**             | **타입**           | **기본값**     | **설명**                               |
| ------------------- | ---------------- | ----------- | ------------------------------------ |
| `value`             | `number \| null` | `null`      | 현재 수치 값                              |
| `min`               | `number`         | `-Infinity` | 입력/증감 가능한 최솟값                        |
| `max`               | `number`         | `Infinity`  | 입력/증감 가능한 최댓값                        |
| `step`              | `number`         | `1`         | 증감 버튼 클릭 시 변경될 수치 단위                 |
| `precision`         | `number`         | `undefined` | 소수점 표출 및 제한 자릿수                      |
| `controls`          | `boolean`        | `true`      | 증감 버튼 (+/-) 노출 여부                    |
| `controls-position` | `string`         | `'end'`     | 증감 버튼 위치 (`end`, `stacked`, `split`) |
| `use-grouping`      | `boolean`        | `false`     | 천 단위 콤마(,) 표출 여부                     |
| `required`          | `boolean`        | `false`     | 필수 입력 여부                             |
| `readonly`          | `boolean`        | `false`     | 읽기 전용 여부                             |
| `disabled`          | `boolean`        | `false`     | 비활성화 여부                              |
| `error`             | `boolean`        | `false`     | 유효성 에러 상태 여부                         |

### 3.2. 상태 (States)

- **Hover**: 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 포커스 진입 및 키보드 포커스 링 표시
- **Min / Max Reached**: 최솟값 또는 최댓값 도달 시 해당 증감 버튼 비활성화 상태
- **Disabled**: 비활성화 (인터랙션 및 값 변경 불가, 시각적 Dim 처리)
- **Readonly**: 읽기 전용 (값 수정 및 증감 버튼 클릭 불가, 복사 가능)
- **Error**: 최솟값/최댓값 범위 초과 또는 비숫자 입력 등 유효성 실패 상태

### 3.3. 이벤트 (Events)

| **이벤트명**    | **상세 (Detail)**             | **발생 시점**                  |
| ----------- | --------------------------- | -------------------------- |
| `input`     | `{ value: number \| null }` | 값 변경 시 실시간 방출              |
| `change`    | `{ value: number \| null }` | 값 변경 후 포커스 해제 시 방출         |
| `step-up`   | `{ value: number }`         | 증가(+) 버튼 클릭 또는 키보드 조작 시 방출 |
| `step-down` | `{ value: number }`         | 감소(-) 버튼 클릭 또는 키보드 조작 시 방출 |
| `focus`     | `FocusEvent`                | 포커스 진입 시 방출                |
| `blur`      | `FocusEvent`                | 포커스 해제 시 방출                |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-number-input-height-sm: 32px;
  --ui-number-input-height-md: 40px;
  --ui-number-input-height-lg: 48px;
  --ui-number-input-padding-x: 12px;
  --ui-number-input-padding-y: 8px;
  --ui-number-input-border-radius: 4px;

  /* Colors - Base */
  --ui-number-input-bg-color: #ffffff;
  --ui-number-input-border-color: #d1d5db;
  --ui-number-input-text-color: #111827;
  --ui-number-input-placeholder-color: #9ca3af;
  --ui-number-input-control-bg: #f9fafb;
  --ui-number-input-control-icon-color: #4b5563;

  /* Colors - Interactive States */
  --ui-number-input-hover-border-color: #9ca3af;
  --ui-number-input-focus-border-color: #2563eb;
  --ui-number-input-focus-ring-color: rgba(37, 99, 235, 0.2);
  --ui-number-input-control-hover-bg: #f3f4f6;

  /* Colors - Error & Disabled */
  --ui-number-input-error-color: #dc2626;
  --ui-number-input-disabled-bg-color: #f3f4f6;
  --ui-number-input-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="spinbutton"`**: 수치 조정 전용 컴포넌트임을 명시
- **`aria-valuenow`**: 현재 설정된 수치 값을 바인딩
- **`aria-valuemin`**: `min` 속성에 지정된 최솟값 바인딩
- **`aria-valuemax`**: `max` 속성에 지정된 최댓값 바인딩
- **`aria-invalid`**: `error` 속성 활성화 시 `'true'`로 연동
- **`aria-required`**: `required` 속성 활성화 시 `'true'`로 연동
- **`aria-describedby`**: `helper-text-slot` 영역의 ID와 입력 필드를 연결하여 스크린 리더 안내
- **`aria-label`** (증감 버튼): 감소 버튼에 "값 감소", 증가 버튼에 "값 증가" 접근성 레이블 부여

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`ArrowUp`**: 수치를 `step` 단위만큼 증가 (`max` 범위 초과 불가)
- **`ArrowDown`**: 수치를 `step` 단위만큼 감소 (`min` 범위 초과 불가)
- **`Home`**: `min` 값이 존재할 경우 최솟값으로 즉시 변경
- **`End`**: `max` 값이 존재할 경우 최댓값으로 즉시 변경
- **`PageUp`**: 수치를 `step * 10` 단위만큼 대폭 증가
- **`PageDown`**: 수치를 `step * 10` 단위만큼 대폭 감소

### 5.3. 스크린 리더 대응

- 증감 버튼 클릭 또는 키보드 방향키 조작으로 수치가 변경될 때, `aria-valuenow` 값 변화를 통해 변경된 실시간 수치가 스크린 리더에 즉시 음성으로 전달되도록 제어합니다. 또한 최솟값/최댓값 도달 시 "최솟값에 도달했습니다" 또는 "최댓값에 도달했습니다" 안내를 지원합니다.