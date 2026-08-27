# MarkdownEditor Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/MarkdownEditor/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - MarkdownEditor.ts (코어 Lit 템플릿)
   - MarkdownEditor.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - MarkdownEditor.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - MarkdownEditor.react.ts (@lit/react 기반 React 래퍼)
   - MarkdownEditor.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-markdown-editor`
   - Lit 엘리먼트 클래스명: `BizMarkdownEditor`
   - CSS Design Token / Custom Properties: `--biz-markdown-editor-*`
   - 루트 CSS 클래스명: `biz-markdown-editor`
   - Lit 코어 템플릿 export 명칭: `MarkdownEditorTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`MarkdownEditorHost` 
   - Lit 스타일 export 변수명: `export const markdownEditorStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizMarkdownEditor
- 커스텀 엘리먼트 태그명 (kebab-case): biz-markdown-editor
- Lit 스타일 변수명 (camelCase): markdownEditorStyles

[요구사항 정의서]
---
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
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`MarkdownEditor.ts`)과 전용 Lit 스타일시트(`MarkdownEditor.css.ts`) 코드를 작성해 주세요.

[작성 조건 - MarkdownEditor.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `MarkdownEditorTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `MarkdownEditorHost` 명칭으로 export 하세요.

[작성 조건 - MarkdownEditor.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const markdownEditorStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-markdown-editor-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-markdown-editor`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/MarkdownEditor/MarkdownEditor.ts`, `src/components/MarkdownEditor/MarkdownEditor.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`MarkdownEditor.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - MarkdownEditor.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `MarkdownEditorHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-markdown-editor')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `MarkdownEditorTemplate` 및 `MarkdownEditor.css.ts`의 `markdownEditorStyles`를 임포트하세요. `MarkdownEditorHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = markdownEditorStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `MarkdownEditorTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/MarkdownEditor/MarkdownEditor.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`MarkdownEditor.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - MarkdownEditor.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `MarkdownEditorWc` 클래스와 커스텀 엘리먼트 태그명(`biz-markdown-editor`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/MarkdownEditor/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`MarkdownEditorTemplate`), 스타일(`markdownEditorStyles`), 웹 컴포넌트 클래스(`MarkdownEditorWc`), React 래퍼 컴포넌트(`MarkdownEditor`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/MarkdownEditor/MarkdownEditor.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/MarkdownEditor/MarkdownEditor.react.ts`, `src/components/MarkdownEditor/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`MarkdownEditor.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - MarkdownEditor.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `MarkdownEditorHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 MarkdownEditor.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요.

[출력 형식]
- 파일 경로(`src/components/MarkdownEditor/MarkdownEditor.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
