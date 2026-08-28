# [ToastContainer] 요구사항 정의서

Toast Manager는 시스템 전역에서 발생하는 비동기 알림 요청을 수집·큐잉(Queueing)하고, 화면 우측 상단 스택 레이아웃의 최대 노출 개수 제어, 라이프사이클(자동 소멸 및 애니메이션) 추적, 수동 일괄 닫기 등 토스트 컴포넌트들의 오케스트레이션을 전담하는 중앙 관리 객체입니다.

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Toast Container (`<biz-toast-container>`)**: 화면 우측 상단 고정 위치(`position: fixed`)에 위치하며, 슬롯으로 주입되거나 동적으로 전달되는 토스트 엘리먼트들을 수직 스택(Stack) 형태로 배열하고 오케스트레이션하는 컨테이너 전용 컴포넌트입니다.

### 1.2. 형태 옵션 (Variants)

- 본 컨테이너는 하위 토스트 렌더링 영역만을 제어하는 레이아웃 관리 컴포넌트로, 자체적인 시각적 Variant 옵션을 가지지 않습니다.

### 1.3. 크기 옵션 (Sizes)

- 본 컨테이너는 내부 토스트 요소들의 간격 및 스택 레이아웃 규격만 제어합니다.
    - `Small`: 바짝 붙은 촘촘한 간격 (간격 6px)
    - `Medium`: 표준 고정 간격 (간격 10px)
    - `Large`: 넓은 여백 간격 (간격 16px)

### 1.4. 레이아웃 제어 (Layout Properties)

- `max-visible-count`: 컨테이너 내부 스택에 동시에 노출 가능한 최대 토스트 개수 (기본값: `5`)
- `position`: 컨테이너의 화면 고정 위치 (기본값: `'top-right'`)
- `newest-on-top`: 최신 주입된 토스트 엘리먼트를 스택 최상단에 배치할지 여부 (기본값: `true`)

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- Shadow DOM 내부로 외부 토스트 엘리먼트들을 수집 및 오케스트레이션하기 위한 기본 슬롯 구성을 정의합니다.

| **슬롯명 (Slot Name)** | **설명 (Description)** | **비고 (Remarks)** |
| --- | --- | --- |
| `default` | 컨테이너 내부로 주입되는 토스트 엘리먼트들의 기본 배치 영역 | `<slot>` 노드 변경 감지를 통해 자식 토스트 수량 추적 |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

#### Container Configuration & Properties

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `maxVisibleCount` | `number` | `5` | 동시 노출 및 스택으로 보여줄 최대 토스트 개수 |
| `position` | `string` | `'top-right'` | 컨테이너 화면 고정 위치 (`top-right`, `top-left`, `bottom-right`, `bottom-left`) |
| `gap` | `number` | `10` | 스택 내부 토스트 요소 간의 수직 간격 (px) |
| `newestOnTop` | `boolean` | `true` | 새로운 토스트의 스택 최상단 배치 여부 |
| `pauseOnHover` | `boolean` | `true` | 컨테이너 영역 호버 시 내부 자식 토스트들의 소멸 일시정지 상태 전파 여부 |

#### Container Operations (Imperative Methods)

| **메서드명** | **파라미터** | **반환 타입** | **설명** |
| --- | --- | --- | --- |
| `add()` | `element: HTMLElement` | `void` | 컨테이너 스택 내부에 새로운 토스트 엘리먼트 동적 추가 |
| `remove()` | `element: HTMLElement` | `void` | 특정 토스트 엘리먼트를 컨테이너 스택에서 제거 |
| `clear()` | `void` | `void` | 현재 컨테이너 내부의 모든 토스트 엘리먼트 일괄 제거 |

### 3.2. 상태 (States)

- **Empty**: 관리 및 배치 중인 하위 토스트가 없는 상태
- **Stacking**: `maxVisibleCount` 범위 내에서 토스트들이 화면 우측 상단에 정렬되어 표시 중인 상태
- **Overflow**: `maxVisibleCount`를 초과하여 초과 분량이 화면에 노출되지 않도록 가려지거나 큐로 제어되는 상태
- **Hovered**: 마우스 포인터가 컨테이너 영역 내부에 진입하여 자식들의 인터랙션이 활성화된 상태

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `container-change` | `{ count: number, visibleCount: number }` | 자식 토스트 추가/제거로 인해 스택 개수가 변경될 때 방출 |
| `overflow-change` | `{ overflowCount: number }` | `maxVisibleCount` 초과 토스트 수량 변경 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 스택 컨테이너의 화면 배치 및 자식 레이아웃 관리를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-biz-toast-container-*`)를 준수합니다.

```
:host {
  /* Positioning & Layout */
  --biz-toast-container-top: 20px;
  --biz-toast-container-right: 20px;
  --biz-toast-container-z-index: 9999;
  --biz-toast-container-gap: 10px;
  --biz-toast-container-max-width: 420px;

  /* Flex & Alignments */
  --biz-toast-container-display: flex;
  --biz-toast-container-direction: column;
  --biz-toast-container-align: flex-end;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role`**: `'region'` 설정하여 독립적인 라이브 알림 영역임을 명시
- **`aria-label`**: `'알림 목록'` 또는 `'Notifications'` 설정
- **`aria-live`**: `'polite'` 설정하여 하위 요소 추가 시 스크린 리더에 동적 갱신 감지 기회 제공

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Alt + T` / `F6`**: 화면 전역에서 스택 컨테이너 내부 영역으로 포커스 즉시 이동
- **`Tab`**: 컨테이너 내부 자식 토스트들의 대화형 요소 간 포커스 이동 순서 유지

### 5.3. 스크린 리더 대응

- 컨테이너 내부로 토스트 요소가 동적으로 삽입/삭제될 때 스크린 리더가 영역 전체를 재독출하지 않고, 추가되거나 제거된 변경 사항만 실시간 안내할 수 있도록 보장합니다.