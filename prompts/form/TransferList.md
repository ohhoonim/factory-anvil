# TransferList 요구사항 정의서

좌측 소스 리스트(Source List Box)와 우측 타겟 리스트(Target List Box), 그리고 중앙의 이동 액션 버튼 구획(Action Controls)으로 구성된 데이터 전송 선택 인터페이스를 제공
## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Source List Box`: 이동 가능한 원본 데이터 항목(Unselected/Available)이 표시되는 좌측 리스트 영역
- `Target List Box`: 선택/이동 완료된 데이터 항목(Selected/Chosen)이 표시되는 우측 리스트 영역
- `Action Controls`: 양쪽 리스트 상호 간 데이터 이동을 수행하는 중앙 액션 버튼 구획
    - `Move Right` (`>`): 좌측 선택 항목을 우측으로 이동
    - `Move All Right` (`>>`): 좌측 전체 항목을 우측으로 이동
    - `Move Left` (`<`): 우측 선택 항목을 좌측으로 이동
    - `Move All Left` (`<<`): 우측 전체 항목을 좌측으로 이동
- `List Header`: 각 리스트 박스 상단의 타이틀, 전체 선택 체크박스, 선택된 항목 수 카운터 표시 영역
- `List Search Bar`: 리스트 내부 항목을 실시간 검색/필터링하는 검색 입력 필드
- `Reorder Controls`: (옵션) Target List Box 내 선택된 항목의 순서를 위/아래로 변경하는 우측 순서 제어 버튼 구획 (`Move Up`, `Move Down`)

### 1.2. 형태 및 배치 옵션 (Variants & Placement)

- `Horizontal` (기본): [Source List Box] - [Action Controls] - [Target List Box] 가로 가로 배치
- `Vertical`: 모바일/협소 뷰포트용 세로 적층 배치 ([Source] - [Action Controls] - [Target])

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)**    | **설명 (Description)**   | **비고 (Remarks)**     |
| ---------------------- | ---------------------- | -------------------- |
| `source-header-slot`   | 좌측 리스트 상단 헤더 커스텀 영역    |                      |
| `target-header-slot`   | 우측 리스트 상단 헤더 커스텀 영역    |                      |
| `item-slot`            | 리스트 내 개별 항목 커스텀 렌더링 영역 | 아이콘, 서브 텍스트, 태그 등 추가 |
| `action-controls-slot` | 중앙 이동 버튼 구획 전체 커스텀 영역  | 커스텀 버튼 디자인 및 레이블 주입  |
| `empty-source-slot`    | 좌측 리스트 데이터 부재 시 표시 영역  |                      |
| `empty-target-slot`    | 우측 리스트 데이터 부재 시 표시 영역  |                      |
| `footer-slot`          | 각 리스트 박스 최하단 커스텀 영역    | 추가 액션, 페이징 등         |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**           | **타입**                    | **기본값**    | **설명**                                |
| ----------------- | ------------------------- | ---------- | ------------------------------------- |
| `source-data`     | `Array<ListItem>`         | `[]`       | 좌측 Source 리스트에 표시될 데이터 배열             |
| `target-data`     | `Array<ListItem>`         | `[]`       | 우측 Target 리스트에 표시될 데이터 배열             |
| `value`           | `Array<string \| number>` | `[]`       | Target 리스트에 위치한 데이터의 key/id 목록        |
| `source-title`    | `string`                  | `'Source'` | 좌측 리스트 상단 타이틀                         |
| `target-title`    | `string`                  | `'Target'` | 우측 리스트 상단 타이틀                         |
| `show-search`     | `boolean`                 | `false`    | 리스트 내 검색 바 노출 여부                      |
| `show-select-all` | `boolean`                 | `true`     | 헤더 내 전체 선택 체크박스 노출 여부                 |
| `show-reorder`    | `boolean`                 | `false`    | Target 리스트 내 순서 변경(Up/Down) 버튼 노출 여부  |
| `disabled`        | `boolean`                 | `false`    | 컴포넌트 전체 비활성화 여부                       |
| `one-way`         | `boolean`                 | `false`    | 단방향 이동 전용 모드 (Target에서 Source로 복귀 불가) |

### 3.2. 상태 (States)

- **Idle**: 기본 상태
- **Item Selected**: 특정 항목(들)이 체크박스 또는 클릭으로 선택된 상태 (이동 버튼 활성화)
- **Hover**: 리스트 항목 및 액션 버튼 마우스 오버 상태
- **Focus / Focus-visible**: 키보드 탐색으로 리스트 항목 또는 버튼에 포커스 진입 상태
- **Disabled Item**: 특정 항목의 선택/이동이 불가능하도록 설정된 상태
- **Disabled Component**: 컴포넌트 전체 비활성화 (모든 버튼 및 리스트 인터랙션 차단)
- **Filtered**: 검색어 입력에 의해 일부 항목만 가시화된 상태

### 3.3. 이벤트 (Events)

| **이벤트명**        | **상세 (Detail)**                                                                            | **발생 시점**                  |
| --------------- | ------------------------------------------------------------------------------------------ | -------------------------- |
| `change`        | `{ sourceData: Array, targetData: Array, movedKeys: Array, direction: 'left' \| 'right' }` | 항목 이동 확정 시 방출              |
| `select-change` | `{ sourceSelectedKeys: Array, targetSelectedKeys: Array }`                                 | 좌/우 리스트 내 항목 선택 체크 변경 시 방출 |
| `search`        | `{ side: 'source' \| 'target', query: string }`                                            | 검색어 입력 시 방출                |
| `reorder`       | `{ targetData: Array, movedKey: string \| number, newIndex: number }`                      | Target 리스트 내 순서 변경 시 방출    |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-transferlist-width: 600px;
  --ui-transferlist-box-width: 250px;
  --ui-transferlist-box-height: 320px;
  --ui-transferlist-item-height: 40px;
  --ui-transferlist-border-radius: 6px;
  --ui-transferlist-gap: 16px;

  /* Colors - Base & Box */
  --ui-transferlist-bg: #ffffff;
  --ui-transferlist-border-color: #d1d5db;
  --ui-transferlist-header-bg: #f9fafb;
  --ui-transferlist-text-color: #111827;

  /* Colors - Item & Interaction */
  --ui-transferlist-item-hover-bg: #f3f4f6;
  --ui-transferlist-item-selected-bg: #eff6ff;
  --ui-transferlist-item-selected-text: #2563eb;

  /* Colors - Action Buttons */
  --ui-transferlist-btn-bg: #ffffff;
  --ui-transferlist-btn-border-color: #d1d5db;
  --ui-transferlist-btn-hover-bg: #f9fafb;
  --ui-transferlist-btn-active-bg: #2563eb;
  --ui-transferlist-btn-active-text: #ffffff;

  /* Colors - Disabled */
  --ui-transferlist-disabled-bg: #f3f4f6;
  --ui-transferlist-disabled-text: #9ca3af;
  --ui-transferlist-disabled-border: #e5e7eb;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="group"`** 또는 **`role="region"`**: TransferList 전체 컨테이너에 바인딩
- **`role="listbox"`**: Source 및 Target 리스트 박스 영역에 각각 바인딩
- **`role="option"`**: 리스트 내 개별 항목에 바인딩
- **`aria-multiselectable="true"`**: 다중 선택 가능함을 명시
- **`aria-selected="true"`**: 선택 상태인 `option` 요소에 바인딩
- **`aria-labelledby`**: 각 리스트 박스 및 액션 버튼의 명확한 용도 안내 바인딩

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab` / `Shift + Tab`**: 좌측 리스트, 이동 버튼들, 우측 리스트 간 순차 포커스 이동
- **`ArrowDown` / `ArrowUp`**: 현재 포커스된 리스트 박스 내에서 항목 간 상/하 이동
- **`Space`**: 포커스된 리스트 항목의 선택(체크) 토글
- **`Ctrl + A` / `Cmd + A`**: 현재 포커스된 리스트 박스 내 전체 항목 선택
- **`Enter`**: 포커스된 항목을 즉시 반대편 리스트로 이동 (또는 선택 확정)

### 5.3. 스크린 리더 대응

- 항목 이동 시 이동된 항목 수와 결과(예: "3개 항목이 우측 선택 리스트로 이동되었습니다.")를 `aria-live="polite"` 영역을 통해 실시간 대화형으로 전달하고, 리스트 헤더의 카운터를 동적 갱신하여 전체/선택 상태를 명확히 음성 안내합니다.