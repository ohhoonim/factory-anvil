# Rating 요구사항 정의서

지정된 개수의 아이콘(기본: 별 모양)이 연속 배치되어 마우스 호버 또는 터치/클릭을 통해 평점 수치를 선택하거나 조회하는 컴포넌트를 제공
## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Rating Track`: 설정된 최대 점수(`max`) 개수만큼 아이콘이 가로로 연속 배치되는 컨테이너
- `Rating Item (Icon)`: 평점을 나타내는 개별 아이콘 (기본값: 별 모양 `Star`)
- `Filled Layer`: 현재 선택되거나 호버된 평점 수치만큼 채워진 상태를 시각적으로 보여주는 레이어
- `Empty Layer`: 채워지지 않은 기본 상태의 배경 아이콘 레이어
- `Value Label`: (옵션) 현재 선택되거나 호버 중인 평점 수치를 수치 텍스트(예: `4.5 / 5`)로 표출하는 레이어

### 1.2. 단위 선택 모드 (Precision Modes)

- `Full Star (1.0)`: 아이콘 1개 단위로 평점 선택 (정수 단위)
- `Half Star (0.5)`: 아이콘 반개 단위로 평점 선택 (0.5 단위)
- `Exact / Fractional`: 읽기 전용 모드 등에서 소수점 단위(예: `3.7`)의 세밀한 채움 비율 표시

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large` / `Custom Size`

### 1.4. 사용 형태 (Variants)

- `Interactive`: 마우스 호버 및 클릭/터치 조작을 통해 값을 변경하는 입력용 모드
- `Read-only / Display`: 변경 불가능하며 수치 조회 목적으로만 사용하는 노출 전용 모드

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**       | **비고 (Remarks)** |
| ------------------- | -------------------------- | ---------------- |
| `icon-filled-slot`  | 채워진 상태의 커스텀 아이콘 주입 영역      | 하트, 엄지 등         |
| `icon-empty-slot`   | 비어있는 상태의 커스텀 아이콘 주입 영역     |                  |
| `icon-half-slot`    | (옵션) 반개 채워진 상태의 커스텀 아이콘 영역 |                  |
| `value-label-slot`  | 평점 수치 텍스트 표출 커스텀 영역        | 예: "4.5점 / 5.0점" |
| `helper-text-slot`  | 하단 안내/에러 메시지 영역            |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**        | **타입**    | **기본값** | **설명**                              |
| -------------- | --------- | ------- | ----------------------------------- |
| `value`        | `number`  | `0`     | 현재 설정된 평점 값                         |
| `max`          | `number`  | `5`     | 표시할 최대 아이콘 개수 및 점수                  |
| `precision`    | `number`  | `1`     | 선택 단위 (`1`: Full, `0.5`: Half, 소수점) |
| `allow-clear`  | `boolean` | `false` | 이미 선택된 점수 재클릭 시 `0`점으로 초기화 허용 여부    |
| `readonly`     | `boolean` | `false` | 읽기 전용 상태 여부 (호버/클릭 인터랙션 비활성화)       |
| `disabled`     | `boolean` | `false` | 비활성화 상태 여부 (Dim 처리 및 입력 차단)         |
| `show-tooltip` | `boolean` | `false` | 아이콘 호버 시 점수 툴팁 노출 여부                |
| `size`         | `string`  | `'md'`  | 아이콘 크기 (`'sm'`, `'md'`, `'lg'`)     |
| `name`         | `string`  | `null`  | 폼 제출 시 사용할 input name               |

### 3.2. 상태 (States)

- **Idle (Default)**: 설정된 `value` 상태로 유휴 중인 기본 상태
- **Hover**: 마우스 오버로 임시 평점 수치가 예비 강조(Preview) 표시되는 상태
- **Focus / Focus-visible**: 키보드 조작을 위해 컴포넌트에 포커스가 진입한 상태 (포커스 링 표시)
- **Disabled**: 비활성화 상태 (클릭/호버 차단, Dim 처리)
- **Readonly**: 읽기 전용 상태 (현재 값 표시 유지, 클릭/호버 차단)

### 3.3. 이벤트 (Events)

| **이벤트명**       | **상세 (Detail)**     | **발생 시점**                                         |
| -------------- | ------------------- | ------------------------------------------------- |
| `change`       | `{ value: number }` | 클릭 또는 키보드 조작으로 평점 선택 확정 시 방출                      |
| `hover-change` | `{ value: number }` | 마우스 호버로 예비 수치가 변경될 때 방출 (마우스 이탈 시 현재 `value`로 복귀) |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-rating-icon-size-sm: 16px;
  --ui-rating-icon-size-md: 24px;
  --ui-rating-icon-size-lg: 32px;
  --ui-rating-gap: 4px;

  /* Colors - Icon */
  --ui-rating-filled-color: #f59e0b; /* Amber 500 */
  --ui-rating-empty-color: #e5e7eb;  /* Gray 200 */
  --ui-rating-hover-color: #fbbf24;  /* Amber 400 */

  /* Colors - Interactive & States */
  --ui-rating-focus-ring-color: rgba(245, 158, 11, 0.4);
  --ui-rating-disabled-filled-color: #d1d5db;
  --ui-rating-disabled-empty-color: #f3f4f6;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="slider"`** 또는 **`role="radiogroup"`**: 전체 컨테이너에 바인딩 (`slider` 역할 권장)
- **`aria-valuenow`**: 현재 바인딩된 평점 수치 동적 연동
- **`aria-valuemin`**: `0` 지정
- **`aria-valuemax`**: `max` 속성 값 지정
- **`aria-valuetext`**: 포맷팅된 수치 텍스트 전달 (예: "별점 5점 만점에 4.5점")
- **`aria-readonly="true"`**: `readonly` 상태 시 바인딩
- **`aria-disabled="true"`**: `disabled` 상태 시 바인딩
- **`aria-label`** 또는 **`aria-labelledby`**: 컴포넌트의 용도(예: "상품 평점 선택") 안내

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`ArrowRight` / `ArrowUp`**: `precision` 단위만큼 평점 수치 증가
- **`ArrowLeft` / `ArrowDown`**: `precision` 단위만큼 평점 수치 감소
- **`Home`**: 최소 평점 수치(`0` 또는 `precision` 최소값)로 변경
- **`End`**: 최대 평점 수치(`max`)로 변경

### 5.3. 스크린 리더 대응

- 키보드로 점수 변경 시 `aria-valuenow` 및 `aria-valuetext` 변경 사항을 스크린 리더가 즉시 음성으로 안내하며, 읽기 전용 모드에서는 정적 텍스트로 전체 만점 대비 현재 평점을 명확히 전달합니다.