# FileUploader Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/FileUploader/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - FileUploader.ts (코어 Lit 템플릿)
   - FileUploader.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - FileUploader.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - FileUploader.react.ts (@lit/react 기반 React 래퍼)
   - FileUploader.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-file-uploader`
   - Lit 엘리먼트 클래스명: `BizFileUploader`
   - CSS Design Token / Custom Properties: `--biz-file-uploader-*`
   - 루트 CSS 클래스명: `biz-file-uploader`
   - Lit 코어 템플릿 export 명칭: `FileUploaderTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`FileUploaderHost` 
   - Lit 스타일 export 변수명: `export const fileUploaderStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizFileUploader
- 커스텀 엘리먼트 태그명 (kebab-case): biz-file-uploader
- Lit 스타일 변수명 (camelCase): fileUploaderStyles

[요구사항 정의서]
---
# FileUploader 요구사항 정의서

파일 탐색기를 통한 파일 선택 버튼 형태와 외부 파일을 직접 끌어다 놓을 수 있는 Drag & Drop Zone 형태를 지원

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Drop Zone`: 파일 드래그 앤 드롭을 수용하는 주요 영역
- `Upload Trigger Button`: OS 파일 탐색기를 호출하는 버튼
- `File List Panel`: 업로드 대기 중이거나 완료된 파일 목록을 표출하는 영역
- `File Item`: 개별 파일의 파일명, 확장자 아이콘, 용량, 삭제 버튼 등을 표출하는 셀
- `Progress Indicator`: 파일 업로드 진행률을 시각적으로 나타내는 프로그레스 바 또는 스피너
- `Error Message Display`: 확장자 불일치, 용량 초과 등 유효성 검사 실패 시 노출되는 가이드 영역

### 1.2. 사용 형태 (Variants)

- `Button Mode`: 단일 버튼 형태로 클릭 시 파일 탐색기만 호출
- `Drop Zone Mode` (기본): 드롭존 구획과 안내 문구, 파일 탐색기 버튼이 통합된 대형 박스 형태
- `Compact / Avatar Mode`: 프로필 이미지 업로드 등에 최적화된 작은 사각형 또는 원형 형태

### 1.3. 크기 및 레이아웃 제어 (Sizes & Properties)

- `Small` / `Medium` / `Large`
- `full-width`: 부모 요소 너비 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)**      | **설명 (Description)**          | **비고 (Remarks)** |
| ------------------------ | ----------------------------- | ---------------- |
| `label-slot`             | 상단/좌측 타이틀 레이블 영역              |                  |
| `drop-zone-content-slot` | Drop Zone 내부 아이콘 및 안내 문구 영역   |                  |
| `file-item-slot`         | 파일 목록 내 개별 항목 커스텀 렌더링 영역      | 커스텀 썸네일, 메타데이터 등 |
| `upload-button-slot`     | 파일 탐색기 호출 버튼 커스텀 영역           |                  |
| `helper-text-slot`       | 하단 안내/제한사항(확장자, 최대용량 등) 표시 영역 |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**       | **타입**                        | **기본값** | **설명**                                         |
| ------------- | ----------------------------- | ------- | ---------------------------------------------- |
| `value`       | `Array<File UploadedFile \|>` | `[]`    | 업로드된 파일 객체 목록                                  |
| `accept`      | `string`                      | `null`  | 허용할 파일 확장자/MIME 타입 (예: `'.png,.jpg,image/*'` ) |
| `multiple`    | `boolean`                     | `false` | 다중 파일 선택/드롭 허용 여부                              |
| `max-size`    | `number`                      | `null`  | 단일 파일 최대 허용 용량 (Byte 단위)                       |
| `max-count`   | `number`                      | `null`  | 업로드 가능한 최대 파일 개수                               |
| `auto-upload` | `boolean`                     | `true`  | 파일 선택 즉시 업로드 처리 실행 여부                          |
| `disabled`    | `boolean`                     | `false` | 컴포넌트 전체 비활성화 여부                                |
| `readonly`    | `boolean`                     | `false` | 읽기 전용 여부 (파일 조회만 가능, 삭제/추가 불가)                 |
| `error`       | `boolean`                     | `false` | 유효성 검사 에러 상태 여부                                |

### 3.2. 상태 (States)

- **Idle (Default)**: 파일 선택 대기 기본 상태
- **Drag Over**: 외부 파일을 Drop Zone 위로 드래그하여 진입한 강조 상태 (Border & BG 강조)
- **Uploading**: 파일 업로드 프로세스 진행 중 상태 (프로그레스 바 및 스피너 표출)
- **Success / Completed**: 파일 추가 및 업로드가 완료된 상태
- **Error / Invalid**: 용량 초과, 확장자 오류, 업로드 실패 등의 에러 상태
- **Disabled / Readonly**: 비활성화 및 읽기 전용 상태

### 3.3. 이벤트 (Events)

| **이벤트명**          | **상세 (Detail)**                                                            | **발생 시점**               |
| ----------------- | -------------------------------------------------------------------------- | ----------------------- |
| `change`          | `{ files: File[] }`                                                        | 파일 목록 추가/삭제 등으로 변경 시 방출 |
| `file-add`        | `{ addedFiles: File[] }`                                                   | 신규 파일이 추가되었을 때 방출       |
| `file-remove`     | `{ removedFile: File \| UploadedFile }`                                    | 특정 파일 삭제 클릭 시 방출        |
| `upload-progress` | `{ file: File, progress: number }`                                         | 파일 업로드 진행 상황 변경 시 방출    |
| `error`           | `{ type: 'size' \| 'extension' \| 'count' \| 'network', message: string }` | 유효성 검사 또는 업로드 실패 시 방출   |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-fileuploader-dropzone-padding: 24px;
  --ui-fileuploader-dropzone-min-height: 160px;
  --ui-fileuploader-border-radius: 8px;
  --ui-fileuploader-item-height: 48px;

  /* Colors - Base & Drop Zone */
  --ui-fileuploader-bg: #ffffff;
  --ui-fileuploader-border-color: #d1d5db;
  --ui-fileuploader-border-style: dashed;
  --ui-fileuploader-text-color: #111827;

  /* Colors - Drag Over & Focus */
  --ui-fileuploader-dragover-bg: #eff6ff;
  --ui-fileuploader-dragover-border-color: #2563eb;
  --ui-fileuploader-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - File Item & Progress */
  --ui-fileuploader-item-bg: #f9fafb;
  --ui-fileuploader-progress-bar-bg: #2563eb;

  /* Colors - Error & Disabled */
  --ui-fileuploader-error-color: #dc2626;
  --ui-fileuploader-error-bg: #fef2f2;
  --ui-fileuploader-disabled-bg: #f3f4f6;
  --ui-fileuploader-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="button"`**: Drop Zone 전체 또는 파일 선택 영역에 바인딩
- **`aria-dropeffect="copy"`**: 파일 드롭이 가능한 영역임을 명시
- **`aria-describedby`**: 허용 확장자, 최대 용량 등의 안내 문구 요소 ID 연결
- **`aria-invalid="true"`**: 유효성 실패 상태 시 바인딩
- 숨김 처리된 Native `<input type="file">` 요소에 `tabindex="0"`을 적용하여 키보드 접근성 확보

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab` / `Shift + Tab`**: Drop Zone(파일 선택 버튼) 및 파일 목록 내 개별 파일 삭제 버튼으로 포커스 이동
- **`Enter` / `Space`**: Drop Zone 영역에 포커스된 상태에서 실행 시 Native OS 파일 탐색기 창 오픈

### 5.3. 스크린 리더 대응

- 파일 드롭 진입 및 이탈 시 상태 변화를 명확히 음성 출력하도록 구성하며, 파일 추가/업로드 완료/오류 발생 상황을 `aria-live="polite"` 영역을 통해 실시간 알림을 전달합니다. 개별 파일 항목에는 파일명과 용량 정보가 `aria-label`로 묶여 명확하게 읽히도록 처리합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`FileUploader.ts`)과 전용 Lit 스타일시트(`FileUploader.css.ts`) 코드를 작성해 주세요.

[작성 조건 - FileUploader.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `FileUploaderTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `FileUploaderHost` 명칭으로 export 하세요.

[작성 조건 - FileUploader.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const fileUploaderStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-file-uploader-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-file-uploader`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/FileUploader/FileUploader.ts`, `src/components/FileUploader/FileUploader.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`FileUploader.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - FileUploader.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `FileUploaderHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-file-uploader')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `FileUploaderTemplate` 및 `FileUploader.css.ts`의 `fileUploaderStyles`를 임포트하세요. `FileUploaderHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = fileUploaderStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `FileUploaderTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/FileUploader/FileUploader.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`FileUploader.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - FileUploader.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `FileUploaderWc` 클래스와 커스텀 엘리먼트 태그명(`biz-file-uploader`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/FileUploader/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`FileUploaderTemplate`), 스타일(`fileUploaderStyles`), 웹 컴포넌트 클래스(`FileUploaderWc`), React 래퍼 컴포넌트(`FileUploader`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/FileUploader/FileUploader.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/FileUploader/FileUploader.react.ts`, `src/components/FileUploader/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`FileUploader.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - FileUploader.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `FileUploaderHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 FileUploader.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요.

[출력 형식]
- 파일 경로(`src/components/FileUploader/FileUploader.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
