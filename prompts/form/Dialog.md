# [Dialog] 요구사항 정의서

다이얼로그(Dialog)는 사용자의 흐름을 잠시 멈추고 중요한 정보 전달, 사용자 확인, 또는 추가 데이터 입력을 요구하기 위해 기존 레이아웃 위에 독립된 레이어 형태로 노출되는 모달(Modal) 상호작용 창입니다.

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- 배경을 가리는 백드롭(Backdrop/Scrim), 메인 대화상자 컨테이너, 헤더(Title & Close Button), 본문 콘텐츠 영역(Body), 푸터 액션 영역(Footer)으로 구성됩니다.

### 1.2. 형태 옵션 (Variants)

- `Modal`: 배경 상호작용을 차단하고 사용자의 명시적 응답을 요구하는 표준 다이얼로그
- `Non-Modal`: 배경 요소와 동시 상호작용이 가능한 보조 창 스타일
- `Alert`: 경고, 삭제 confirmation 등 주요 비즈니스 확인을 위한 단답형 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large` / `Full-screen`

### 1.4. 레이아웃 제어 (Layout Properties)

- `centered`: 화면 중앙 정렬 여부
- `scrollable`: 본문 영역 내용이 길어질 경우 내부 스크롤 적용 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)** | **비고 (Remarks)** |
| --- | --- | --- |
| `header-slot` | 상단 타이틀 및 헤더 영역 | 커스텀 제목 또는 닫기 버튼 배치 |
| `default` (Main Slot) | 다이얼로그 본문 영역 | 사용자 입력 폼 및 상세 메시지 주입 |
| `footer-slot` | 하단 액션 버튼 영역 | 확인, 취소 등 인터랙션 버튼 배치 |
| `close-icon-slot` | 헤더 우측 상단 닫기 아이콘 영역 |  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | 다이얼로그 노출 여부 |
| `heading` | `string` | `''` | 다이얼로그 제목 텍스트 |
| `modal` | `boolean` | `true` | 모달 여부 (배경 블록 처리 및 포커스 가두기 적용) |
| `hide-close-button` | `boolean` | `false` | 헤더 닫기(X) 버튼 숨김 여부 |
| `prevent-backdrop-close` | `boolean` | `false` | 백드롭 영역 클릭 시 닫힘 방지 여부 |
| `prevent-escape-close` | `boolean` | `false` | Escape 키 입력 시 닫힘 방지 여부 |

### 3.2. 상태 (States)

- **Open / Showing**: 애니메이션과 함께 화면에 노출된 상태
- **Closing**: 닫힘 애니메이션 진행 상태
- **Focused**: 다이얼로그 내부 첫 번째 대화형 요소에 포커스 진입 상태
- **Backdrop-Active**: 배경 Dim 처리 상태 (모달 모드)

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `dialog-open` | `void` | 다이얼로그가 열릴 때 방출 |
| `dialog-close` | `{ reason: 'backdrop' | 'escape' | 'close-button' | 'programmatic' }` | 다이얼로그가 닫힐 때 방출 |
| `backdrop-click` | `{ originalEvent: Event }` | 배경 어두운 영역 클릭 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```css
:host {
  /* Sizing & Radius */
  --ui-dialog-width-sm: 400px;
  --ui-dialog-width-md: 560px;
  --ui-dialog-width-lg: 800px;
  --ui-dialog-border-radius: 8px;
  --ui-dialog-padding: 24px;

  /* Colors - Base */
  --ui-dialog-bg-color: #ffffff;
  --ui-dialog-text-color: #111827;
  --ui-dialog-backdrop-color: rgba(0, 0, 0, 0.5);

  /* Elevation & Transition */
  --ui-dialog-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --ui-dialog-transition-duration: 200ms;

  /* Header & Footer */
  --ui-dialog-header-border-color: #e5e7eb;
  --ui-dialog-footer-border-color: #e5e7eb;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="dialog"`** (또는 `role="alertdialog"`): 최상위 컨테이너에 대화상자 역할 부여
- **`aria-modal="true"`**: 배경 요소와의 상호작용 차단을 스크린 리더에 알림
- **`aria-labelledby`**: 헤더 타이틀 요소의 ID를 다이얼로그 컨테이너에 바인딩
- **`aria-describedby`**: 본문 요약을 다이얼로그 컨테이너에 바인딩하여 열림 시 읽어주도록 구성

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Focus Trapping`**: 다이얼로그가 열려 있는 동안 `Tab` 및 `Shift+Tab` 키 이동이 다이얼로그 내부 요소로만 제한
- **`Escape`**: `prevent-escape-close`가 활성화되지 않은 경우 즉시 다이얼로그 닫기
- **`Initial Focus`**: 다이얼로그 진입 시 첫 번째 입력 요소 또는 닫기 버튼으로 자동 포커스 이동
- **`Return Focus`**: 다이얼로그가 닫히면 호출했던 이전 트리거 요소로 포커스 원복

### 5.3. 스크린 리더 대응

- 네이티브 `<dialog>` 엘리먼트를 내부적으로 활용하거나 Polyfill 기반의 포커스 제어를 통해 본문 외부 DOM 트리(`aria-hidden="true"`)와의 완전한 분리를 유지합니다.