# [Toast] 요구사항 정의서

토스트(Toast)는 사용자의 현재 과업을 방해하지 않으면서 시스템 상태 변경, 작업 결과, 또는 일시적 경고 메시지를 화면 구석에 짧게 띄웠다 지정된 시간 후 자동으로 사라지게 만드는 비침습적(Non-disruptive) 피드백 알림입니다.

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- 상태 아이콘, 메시지 텍스트, 사용자 액션(버튼), 수동 닫기 버튼, 컨테이너로 구획을 구성합니다.

### 1.2. 형태 옵션 (Variants)

- `Success`: 성공 결과 피드백 (초록색 계열)
- `Info`: 일반 정보 및 상태 안내 (파란색 계열)
- `Warning`: 주의 요구 메시지 (주황색 계열)
- `Error`: 시스템 에러 및 실행 실패 알림 (빨간색 계열)

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `placement`: 화면 내 노출 위치 (`top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`)
- `stacked`: 동일 위치에 복수 토스트 발생 시 적재(Queue) 방식 설정

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)** | **비고 (Remarks)** |
| --- | --- | --- |
| `start-slot` | 최좌측 내부 주입 영역 (커스텀 상태 아이콘 등) | 기본 아이콘 대체 |
| `default` (Main Slot) | 메시지 본문 영역 | 단순 텍스트 또는 리치 텍스트 |
| `action-slot` | 메인 메시지 우측 액션 영역 (실행 취소 버튼 등) |  |
| `close-button-slot` | 수동 닫기 버튼 영역 |  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `message` | `string` | `''` | 토스트 표기 메시지 |
| `type` | `string` | `'info'` | 피드백 심버리티 타입 (`success`, `info`, `warning`, `error`) |
| `duration` | `number` | `4000` | 자동 종료 대기 시간 (ms 단위, `0` 지정 시 자동 중지 안 함) |
| `auto-dismiss` | `boolean` | `true` | 지정 시간 후 자동 사라짐 여부 |
| `dismissible` | `boolean` | `true` | 사용자의 수동 닫기 버튼 노출 여부 |

### 3.2. 상태 (States)

- **Entering**: 화면 외곽에서 슬라이드/페이드로 나타나는 상태
- **Showing**: 화면에 고정 노출된 상태
- **Hover / Paused**: 마우스 오버 시 타이머가 일시 정지된 상태
- **Exiting**: 지정 시간 만료 또는 수동 닫기로 사라지는 상태

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `toast-show` | `void` | 토스트가 화면에 노출을 시작할 때 방출 |
| `toast-close` | `{ reason: 'timeout' | 'user' | 'programmatic' }` | 토스트가 사라질 때 방출 |
| `action-click` | `{ originalEvent: Event }` | `action-slot` 내부 실행 버튼 클릭 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```css
:host {
  /* Layout & Sizing */
  --ui-toast-min-width: 300px;
  --ui-toast-max-width: 480px;
  --ui-toast-padding-x: 16px;
  --ui-toast-padding-y: 12px;
  --ui-toast-border-radius: 6px;

  /* Typography */
  --ui-toast-font-size: 14px;
  --ui-toast-line-height: 1.5;

  /* Elevation & Transition */
  --ui-toast-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --ui-toast-transition-duration: 300ms;

  /* Type Palette - Success */
  --ui-toast-success-bg: #f0fdf4;
  --ui-toast-success-border: #bbf7d0;
  --ui-toast-success-text: #166534;

  /* Type Palette - Error */
  --ui-toast-error-bg: #fef2f2;
  --ui-toast-error-border: #fecaca;
  --ui-toast-error-text: #991b1b;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="status"`**: 일반 안내(`info`, `success`) 메시지에 바인딩하여 사용자의 현재 작업을 방해하지 않고 알림
- **`role="alert"`**: 즉각적 확인이 필요한 `error`, `warning` 메시지에 바인딩하여 즉시 음성 출력
- **`aria-live`**: `info`/`success`는 `'polite'`, `error`/`warning`은 `'assertive'`로 동적 연동
- **`aria-atomic="true"`**: 토스트 전체 구조를 한 번에 인지하도록 지정

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Focus Bypass`**: 토스트 자체는 기본 포커스 진입 흐름을 방해하지 않음
- **`Escape` / `Shortcut`**: 액션 버튼이 존재하는 토스트의 경우 단축키 진입 또는 `Escape` 키로 수동 닫기 제공

### 5.3. 스크린 리더 대응

- 스크린 리더 사용자가 메시지를 다 읽기 전에 자동 닫기(`duration`)가 작동하여 정보를 놓치지 않도록, 마우스 포커스나 스크린 리더 감지 시 일시 정지(Pause Timer) 메커니즘을 지원합니다.