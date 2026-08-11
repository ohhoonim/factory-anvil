# IpAddressInput

IPv4 (4개 Octet) 및 선택적 IPv6 (8개 Group) 주소 입력을 위한 분할/통합 입력 필드 구조
## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Label`: 상단 또는 좌측에 위치하는 입력 필드 명칭 영역
- `Segment Inputs`: IPv4(4개) 또는 IPv6(8개) 모드에 따라 분할 배치되는 세그먼트별 독립 입력 필드
- `Separators`: 각 세그먼트 사이에 고정 위치하는 구분자 기호(IPv4: `.`, IPv6: `:`)
- `Helper Text / Error Message`: 하단 안내 문구 및 유효성 검사 에러 메시지 영역

### 1.2. 형태 옵션 (Variants)

- `Outlined`: 전체 컨테이너 테두리 중심 스타일
- `Filled`: 전체 컨테이너 배경색 중심 스타일
- `Standard`: 하단 경계선 중심 스타일

### 1.3. 프로토콜 모드 (Protocol Modes)

- `IPv4`: 4개의 세그먼트와 3개의 Dot(`.`) 구분자로 구성 (각 세그먼트 0~255 숫자 3자리)
- `IPv6`: 8개의 세그먼트와 7개의 Colon(`:`) 구분자로 구성 (각 세그먼트 4자리 16진수)

### 1.4. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.5. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**               | **비고 (Remarks)**      |
| ------------------- | ---------------------------------- | --------------------- |
| `label-slot`        | 상단/좌측 레이블 영역                       | 표준 `<label>` 태그 충돌 방지 |
| `prefix-slot`       | 입력 필드 내부 좌측 영역 (아이콘 등)             |                       |
| `suffix-slot`       | 입력 필드 내부 우측 영역 (포트 번호 입력란 등 추가 확장) |                       |
| `separator-slot`    | 세그먼트 간 구분자 커스텀 영역                  | 기본 Dot/Colon 대체 가능    |
| `helper-text-slot`  | 하단 안내/에러 메시지 영역                    |                       |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**           | **타입**    | **기본값**  | **설명**                                |
| ----------------- | --------- | -------- | ------------------------------------- |
| `value`           | `string`  | `''`     | 전체 IP 주소 문자열 (구분자 포함)                 |
| `type`            | `string`  | `'ipv4'` | IP 프로토콜 버전 (`ipv4`, `ipv6`)           |
| `auto-focus-next` | `boolean` | `true`   | 세그먼트 입력 완료/구분자 입력 시 다음 세그먼트로 자동 이동 여부 |
| `required`        | `boolean` | `false`  | 필수 입력 여부                              |
| `readonly`        | `boolean` | `false`  | 읽기 전용 여부                              |
| `disabled`        | `boolean` | `false`  | 비활성화 여부                               |
| `error`           | `boolean` | `false`  | 유효성 에러 상태 여부                          |

### 3.2. 상태 (States)

- **Hover**: 전체 컨테이너 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 특정 세그먼트 진입 시 전체 컨테이너 Focus Ring 활성화
- **Segment Complete**: 개별 세그먼트에 유효한 자릿수가 채워진 상태
- **Disabled**: 비활성화 (인터랙션 및 입력 불가, 시각적 Dim 처리)
- **Readonly**: 읽기 전용 (수정 불가, 전체 IP 복사 가능)
- **Error**: 범위를 벗어난 숫자(IPv4 256 이상) 또는 허용되지 않는 문자가 포함된 유효성 실패 상태

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)**                                     | **발생 시점**                 |
| -------- | --------------------------------------------------- | ------------------------- |
| `input`  | `{ value: string, segments: string[] }`             | 세그먼트 값 변경 시 실시간 방출        |
| `change` | `{ value: string, segments: string[] }`             | 입력 완료 후 전체 필드 포커스 해제 시 방출 |
| `paste`  | `{ pastedValue: string, parsedSegments: string[] }` | 전체 IP 주소 붙여넣기 실행 시 방출     |
| `focus`  | `FocusEvent`                                        | 임의의 세그먼트로 포커스 진입 시 방출     |
| `blur`   | `FocusEvent`                                        | 전체 컨테이너 외부로 포커스 해제 시 방출   |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-ip-input-height-sm: 32px;
  --ui-ip-input-height-md: 40px;
  --ui-ip-input-height-lg: 48px;
  --ui-ip-input-padding-x: 8px;
  --ui-ip-input-padding-y: 4px;
  --ui-ip-input-border-radius: 4px;
  --ui-ip-input-segment-width-ipv4: 40px;
  --ui-ip-input-segment-width-ipv6: 52px;

  /* Colors - Base */
  --ui-ip-input-bg-color: #ffffff;
  --ui-ip-input-border-color: #d1d5db;
  --ui-ip-input-text-color: #111827;
  --ui-ip-input-separator-color: #6b7280;

  /* Colors - Interactive States */
  --ui-ip-input-hover-border-color: #9ca3af;
  --ui-ip-input-focus-border-color: #2563eb;
  --ui-ip-input-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-ip-input-error-color: #dc2626;
  --ui-ip-input-disabled-bg-color: #f3f4f6;
  --ui-ip-input-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="group"`**: 컨테이너 요소에 서브 컴포넌트들의 그룹임을 명시하고 `aria-label="IP 주소 입력"` 적용
- **`aria-invalid`**: `error` 속성 활성화 시 컨테이너 및 각 세그먼트 입력란에 `'true'`로 연동
- **`aria-required`**: `required` 속성 활성화 시 `'true'`로 연동
- **`aria-describedby`**: `helper-text-slot` 영역의 ID와 연결하여 스크린 리더 안내
- **`aria-label`** (개별 세그먼트): "IP 주소 세그먼트 1/4" 또는 "IPv6 주소 세그먼트 1/8"과 같이 위치 정보 제공

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`ArrowRight`**: 현재 세그먼트의 커서가 맨 우측에 있을 때 다음 세그먼트로 이동
- **`ArrowLeft`**: 현재 세그먼트의 커서가 맨 좌측에 있을 때 이전 세그먼트로 이동
- **`Dot (.)` / `Colon (:)`**: 해당 프로토콜 구분자 키 입력 시 즉시 다음 세그먼트로 이동
- **`Backspace`**: 세그먼트가 비어있는 상태에서 입력 시 이전 세그먼트로 포커스 이동 후 해당 세그먼트의 마지막 글자 삭제
- **`Tab`**: 세그먼트 단위 순차 이동 또는 전체 컨테이너 단위 이동 (설정에 따라 준수)

### 5.3. 스크린 리더 및 붙여넣기 대응

- **붙여넣기(Paste) 스마트 파싱**: 클립보드에 전체 IP 문자열(예: `192.168.0.1`)이 복사된 상태에서 첫 번째 세그먼트에 붙여넣기 할 경우, 구분자를 기준으로 자동 분할되어 각 세그먼트에 세팅되어야 합니다.
- 스크린 리더 사용자가 개별 필드로 오해하지 않도록 각 세그먼트에 명확한 서명(Label)을 동적으로 제공합니다.