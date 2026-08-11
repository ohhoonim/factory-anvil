# MarkdownEditor 요구사항 정의서

마크다운으로 텍스트를 작성하면 미리보기를 지원
## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Toolbar`: 텍스트 서식(Bold, Italic, Heading 등), 리스트, 링크, 이미지 주입 버튼 및 뷰 모드 전환 컨트롤이 위치하는 상단 도구 모음
- `Editor Area (Raw Text)`: 마크다운 문법 텍스트를 직접 작성하고 편집하는 에디터 구획 (Line Number 및 Syntax Highlighting 지원)
- `Preview Area (Rendered HTML)`: 작성된 마크다운 텍스트를 HTML로 실시간 파싱하여 표출하는 미리보기 구획
- `Split Resizer`: Split 모드에서 에디터 영역과 미리보기 영역의 너비 비율을 드래그하여 조절하는 분할 바
- `Status Bar`: 최하단에 위치하며 글자 수, 단어 수, 줄 수, 커서 위치 및 현재 모드 정보를 표출하는 바

### 1.2. 뷰 모드 (View Modes)

- `Split View` (기본): 에디터와 미리보기 창을 좌우 나란히 배치하여 실시간 동기화 탐색
- `Edit Only`: 에디터 영역만 가득 채워 작성에 집중하는 모드
- `Preview Only`: 파싱된 최종 결과물만 보여주는 읽기/확인 모드

### 1.3. 동기화 및 편리 기능 (Synchronization & Productivity)

- `Sync Scroll`: 에디터 스크롤 위치에 맞춰 미리보기 영역 스크롤 위치를 실시간 비례 이동
- `Auto-indent / Pair Closing`: 기호(`*`, `` ` ``, `[`, `(`) 입력 시 자동 짝 맞춤 및 엔터 시 리스트 연속 생성

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)**   | **설명 (Description)**       | **비고 (Remarks)** |
| --------------------- | -------------------------- | ---------------- |
| `toolbar-left-slot`   | 툴바 좌측 커스텀 도구 추가 영역         | 커스텀 서식 버튼 등      |
| `toolbar-right-slot`  | 툴바 우측 커스텀 액션 영역            | 저장, 전송 버튼 등      |
| `editor-header-slot`  | 에디터 영역 상단 헤더 커스텀 영역        |                  |
| `preview-header-slot` | 미리보기 영역 상단 헤더 커스텀 영역       |                  |
| `custom-preview-slot` | 기본 파서 외 커스텀 마크다운 렌더러 교체 영역 |                  |
| `statusbar-slot`      | 최하단 상태 바 커스텀 메타데이터 표출 영역   |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**       | **타입**    | **기본값**            | **설명**                                      |
| ------------- | --------- | ------------------ | ------------------------------------------- |
| `value`       | `string`  | `''`               | 마크다운 원본 텍스트 문자열                             |
| `mode`        | `string`  | `'split'`          | 화면 표시 모드 (`'split'`, `'edit'`, `'preview'`) |
| `placeholder` | `string`  | `'마크다운을 입력하세요...'` | 에디터 빈 값일 때 표출 문구                            |
| `sync-scroll` | `boolean` | `true`             | 에디터와 미리보기 간 스크롤 동기화 여부                      |
| `height`      | `string`  | `'500px'`          | 에디터 높이 (픽셀 또는 `%`)                          |
| `max-height`  | `string`  | `null`             | 에디터 최대 높이 제한                                |
| `autofocus`   | `boolean` | `false`            | 마운트 시 에디터 포커스 지정 여부                         |
| `readonly`    | `boolean` | `false`            | 읽기 전용 여부 (미리보기 모드로 고정)                      |
| `disabled`    | `boolean` | `false`            | 비활성화 여부                                     |
| `sanitize`    | `boolean` | `true`             | HTML 파싱 시 XSS 방지를 위한 산이타이즈 활성화 여부           |

### 3.2. 상태 (States)

- **Idle (Default)**: 작성 중인 기본 상태
- **Focused**: 에디터 영역에 키보드 포커스가 들어와 있는 상태
- **Mode Shift**: 뷰 모드(Split/Edit/Preview)가 전환된 상태
- **Resizing**: Split Resizer를 드래그하여 레이아웃 비율을 변경 중인 상태
- **Disabled / Readonly**: 비활성화 및 읽기 전용 상태

### 3.3. 이벤트 (Events)

| **이벤트명**       | **상세 (Detail)**                            | **발생 시점**                     |
| -------------- | ------------------------------------------ | ----------------------------- |
| `change`       | `{ markdown: string, html: string }`       | 텍스트 수정 발생 시 방출                |
| `mode-change`  | `{ mode: 'split' \| 'edit' \| 'preview' }` | 뷰 모드 전환 시 방출                  |
| `upload-image` | `{ file: File, insert: Function }`         | 드래그 앤 드롭 또는 붙여넣기로 이미지 첨부 시 방출 |
| `focus`        | `FocusEvent`                               | 에디터 포커스 진입 시 방출               |
| `blur`         | `FocusEvent`                               | 에디터 포커스 해제 시 방출               |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-markdowneditor-width: 100%;
  --ui-markdowneditor-height: 500px;
  --ui-markdowneditor-border-radius: 6px;
  --ui-markdowneditor-toolbar-height: 42px;
  --ui-markdowneditor-statusbar-height: 28px;

  /* Colors - Base & Panels */
  --ui-markdowneditor-bg: #ffffff;
  --ui-markdowneditor-border-color: #d1d5db;
  --ui-markdowneditor-toolbar-bg: #f9fafb;
  --ui-markdowneditor-statusbar-bg: #f3f4f6;
  --ui-markdowneditor-text-color: #111827;

  /* Colors - Editor & Syntax */
  --ui-markdowneditor-editor-bg: #ffffff;
  --ui-markdowneditor-preview-bg: #ffffff;
  --ui-markdowneditor-resizer-bg: #e5e7eb;
  --ui-markdowneditor-resizer-hover-bg: #2563eb;

  /* Colors - Focus & Active States */
  --ui-markdowneditor-focus-border-color: #2563eb;
  --ui-markdowneditor-focus-ring-color: rgba(37, 99, 235, 0.2);
  --ui-markdowneditor-toolbar-btn-hover-bg: #e5e7eb;

  /* Colors - Disabled */
  --ui-markdowneditor-disabled-bg: #f3f4f6;
  --ui-markdowneditor-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="toolbar"`**: 상단 서식 및 제어 도구 모음에 바인딩
- **`role="textbox"`** & **`aria-multiline="true"`**: 에디터 작성 영역에 바인딩
- **`aria-label`**: 툴바 내 개별 서식 버튼(예: "굵게", "기울임", "링크 삽입")에 명확한 용도 바인딩
- **`role="region"`** & **`aria-label="미리보기"`**: 파싱된 HTML 미리보기 컨테이너에 지정
- **`role="separator"`** & **`aria-orientation="vertical"`**: Split Resizer 분할 바 요소에 지정

### 5.2. 키보드 단축키 및 인터랙션 (Keyboard Shortcuts & Navigation)

- **`Ctrl + B` / `Cmd + B`**: 선택 영역 굵게(Bold) 지정
- **`Ctrl + I` / `Cmd + I`**: 선택 영역 기울임(Italic) 지정
- **`Ctrl + K` / `Cmd + K`**: 링크(Link) 문법 주입
- **`Tab` / `Shift + Tab`**: 툴바 버튼, 에디터 입력 창, 미리보기 영역 간 순차 이동 (에디터 내부 Tab 키 입력 시 들여쓰기 동작 처리 옵션 제공)
- **`Escape`**: 툴바 버튼 포커스 상태에서 에디터 입력 창으로 빠른 복귀

### 5.3. 스크린 리더 대응

- 뷰 모드 전환(Split $\rightarrow$ Edit $\rightarrow$ Preview) 시 현재 활성화된 모드 상태를 `aria-live="polite"` 영역을 통해 음성 출력하고, 에디터 작성 시 실시간 변경되는 글자 수/단어 수 등의 상태 바 메타데이터를 필요 시 접근성 텍스트로 전달합니다.