# [ActionButton] 요구사항 정의서

액션 버튼(ActionButton)은 데이터그리드(DataGrid) 내의 데이터에 대해 추가, 수정, 삭제 등의 비즈니스 규칙을 실행하여 데이터 상태 변화를 직접 유발하는 실행 주체이며, 다수의 연관 작업이나 하위 옵션을 드롭다운(Dropdown) 형태로 확장·전환하여 선택적으로 집행하는 기능을 포함합니다.

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- 단일 실행을 담당하는 메인 버튼, 하위 옵션을 확장하는 드롭다운 트리거 버튼, 확장 시 표시되는 팝오버 메뉴 컨테이너로 구획을 구성합니다.

### 1.2. 형태 옵션 (Variants)

- `Solid`: 배경색 중심의 기본 강조 스타일 (주요 비즈니스 실행용)
- `Outlined`: 테두리 중심 스타일 (보조/일반 실행용)
- `Text`: 배경 및 테두리가 없는 최소화 스타일 (그리드 셀 내부 임베드용)
- `Split`: 메인 액션 버튼과 드롭다운 화살표 트리거 버튼이 분리된 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `placement`: 드롭다운 메뉴가 전개되는 방향 (`bottom-start`, `bottom-end`, `top-start`, `top-end`)

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)** | **비고 (Remarks)** |
| --- | --- | --- |
| `start-slot` | 버튼 내부 좌측 주입 영역 (주요 액션 아이콘 등) |  |
| `end-slot` | 버튼 내부 우측 주입 영역 (드롭다운 화살표 커스텀 등) | `split` 모드 시 메뉴 트리거 영역 |
| `menu-slot` | 커스텀 드롭다운 메뉴 레이아웃 주입 영역 | 기본 옵션 목록 대체용 |
| `helper-text-slot` | 하단 안내/에러 메시지 영역 |  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `label` | `string` | `''` | 버튼 표기 텍스트 |
| `variant` | `string` | `'solid'` | 버튼 형태 옵션 (`solid`, `outlined`, `text`, `split`) |
| `items` | `Array<{id: string, label: string, icon?: string, disabled?: boolean, danger?: boolean}>` | `[]` | 드롭다운 메뉴 항목 데이터 배열 |
| `split` | `boolean` | `false` | 단일 실행과 드롭다운 트리거의 분리 여부 |
| `open` | `boolean` | `false` | 드롭다운 메뉴 열림 여부 |
| `disabled` | `boolean` | `false` | 전체 버튼 비활성화 여부 |
| `loading` | `boolean` | `false` | 액션 처리 중 스피너 표시 여부 |

### 3.2. 상태 (States)

- **Hover**: 마우스 오버 시 시각적 피드백 (배경/테두리 색상 변경)
- **Focus / Focus-visible**: 키보드 포커스 진입 시 포커스 링 표시
- **Active / Pressed**: 클릭/터치 시 눌림 반응 상태
- **Open**: 드롭다운 메뉴 확장 상태 (트리거 버튼 강조 유지)
- **Disabled**: 비활성화 (인터랙션 불가, 시각적 Dim)
- **Loading**: 액션 실행 중 (인터랙션 차단, 스피너 표출)

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `action-click` | `{ originalEvent: Event }` | 메인 액션 버튼 클릭 시 방출 |
| `item-select` | `{ item: object, id: string, originalEvent: Event }` | 드롭다운 메뉴 항목 선택 시 방출 |
| `dropdown-toggle` | `{ open: boolean }` | 드롭다운 메뉴 열림/닫힘 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```css
:host {
  /* Layout & Sizing */
  --ui-action-btn-height-sm: 28px;
  --ui-action-btn-height-md: 36px;
  --ui-action-btn-height-lg: 44px;
  --ui-action-btn-padding-x: 12px;
  --ui-action-btn-padding-y: 6px;
  --ui-action-btn-border-radius: 4px;

  /* Colors - Base */
  --ui-action-btn-bg-color: #2563eb;
  --ui-action-btn-border-color: #2563eb;
  --ui-action-btn-text-color: #ffffff;

  /* Colors - Interactive States */
  --ui-action-btn-hover-bg-color: #1d4ed8;
  --ui-action-btn-focus-ring-color: rgba(37, 99, 235, 0.3);

  /* Colors - Menu */
  --ui-action-menu-bg-color: #ffffff;
  --ui-action-menu-border-color: #e5e7eb;
  --ui-action-menu-item-hover-bg-color: #f3f4f6;
  --ui-action-menu-item-danger-color: #dc2626;

  /* Colors - Disabled */
  --ui-action-btn-disabled-bg-color: #f3f4f6;
  --ui-action-btn-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`aria-haspopup="menu"`**: 드롭다운 메뉴를 제어하는 트리거 버튼에 연동
- **`aria-expanded`**: 드롭다운 메뉴의 열림(`'true'`) / 닫힘(`'false'`) 상태 연동
- **`aria-controls`**: 트리거 버튼과 팝오버 메뉴 요소의 ID를 상호 연결
- **`role="menu"`** & **`role="menuitem"`**: 드롭다운 메뉴 및 내부 선택 항목에 바인딩
- **`aria-busy`**: `loading` 상태 활성화 시 `'true'`로 연동

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Enter` / `Space`**: 버튼 클릭 실행 또는 드롭다운 메뉴 토글
- **`Down Arrow`**: 메뉴 열기 및 첫 번째 메뉴 항목으로 포커스 이동
- **`Up Arrow` / `Down Arrow`**: 드롭다운 메뉴 내부 항목 간 순환 포커스 이동
- **`Escape`**: 열려 있는 드롭다운 메뉴를 닫고 트리거 버튼으로 포커스 복귀

### 5.3. 스크린 리더 대응

- 메인 버튼과 드롭다운 트리거가 분리된 `Split` 형태의 경우, 각 버튼의 역할과 접근성 명칭(`aria-label`)을 별도로 선언하여 독립된 개체로 인식되도록 합니다.