# ImageUpload Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/ImageUpload/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - ImageUpload.ts (코어 Lit 템플릿)
   - ImageUpload.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - ImageUpload.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - ImageUpload.react.ts (@lit/react 기반 React 래퍼)
   - ImageUpload.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-image-upload`
   - Lit 엘리먼트 클래스명: `BizImageUpload`
   - CSS Design Token / Custom Properties: `--biz-image-upload-*`
   - 루트 CSS 클래스명: `biz-image-upload`
   - Lit 코어 템플릿 export 명칭: `ImageUploadTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`ImageUploadHost` 
   - Lit 스타일 export 변수명: `export const imageUploadStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizImageUpload
- 커스텀 엘리먼트 태그명 (kebab-case): biz-image-upload
- Lit 스타일 변수명 (camelCase): imageUploadStyles

[요구사항 정의서]
---
# ImageUpload 요구사항 정의서

이미지 파일을 업로드한 후 시각적 미리보기를 제공하며, 전용 크롭 캔버스/모달을 통해 필요한 영역만 선택·편집할 수 있는 컨테이너를 제공

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Image Drop Zone`: 이미지 파일 드래그 앤 드롭 수용 및 파일 탐색기 트리거 영역
- `Image Preview Area`: 업로드되었거나 편집 완료된 이미지를 시각적으로 보여주는 썸네일 영역
- `Control Overlay`: 썸네일 호버/포커스 시 노출되는 편집(Crop), 확대/재미리보기(Preview), 삭제(Delete) 액션 버튼 구획
- `Crop Modal / Canvas Dialog`: 이미지 크롭 및 편집을 진행하는 전용 레이어 패널
- `Crop Canvas`: 선택 박스(Cropper Box) 조정, 이동, 확대/축소, 회전 작업을 수행하는 메인 인터랙션 영역
- `Crop Control Toolbar`: 비율(Aspect Ratio) 설정, 회전(Rotate), 반전(Flip), 자르기 완료/취소 버튼으로 구성된 툴바

### 1.2. 형태 및 레이아웃 모드 (Variants)

- `Square / Rectangle Mode` (기본): 사각형 썸네일 및 크롭 영역 제공
- `Circle / Avatar Mode`: 프로필 이미지용 원형 마스크 프레임 및 원형 크롭 영역 제공
- `Custom Ratio Mode`: 자유 비율 또는 고정 비율(예: 16:9, 4:3 등) 크롭 지원

### 1.3. 크기 및 레이아웃 제어 (Sizes & Properties)

- `Small` / `Medium` / `Large` / `Custom Width & Height`
- `shape`: `square`, `circle`

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**            | **비고 (Remarks)** |
| ------------------- | ------------------------------- | ---------------- |
| `label-slot`        | 상단/좌측 타이틀 레이블 영역                |                  |
| `drop-zone-slot`    | 이미지 업로드 대기 상태의 커스텀 가이드 영역       |                  |
| `preview-mask-slot` | 이미지 썸네일 상단 호버 오버레이 커스텀 영역       |                  |
| `crop-toolbar-slot` | 크롭 모달 내 하단 툴바 커스텀 컨트롤 영역        |                  |
| `crop-footer-slot`  | 크롭 모달 하단 확정/취소 버튼 구획 커스텀 영역     |                  |
| `helper-text-slot`  | 하단 안내/제한사항(확장자, 권장 해상도 등) 표시 영역 |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**          | **타입**                         | **기본값**                             | **설명**                                                     |
| ---------------- | ------------------------------ | ----------------------------------- | ---------------------------------------------------------- |
| `value`          | `string \| File \| CropResult` | `null`                              | 현재 업로드/편집 완료된 이미지 (URL 또는 File/Blob 객체)                    |
| `accept`         | `string`                       | `'image/jpeg,image/png,image/webp'` | 허용할 이미지 MIME 타입                                            |
| `max-size`       | `number`                       | `null`                              | 단일 이미지 최대 허용 용량 (Byte 단위)                                  |
| `aspect-ratio`   | `number`                       | `null`                              | 크롭 가로/세로 고정 비율 (예: `1` = 1:1, `1.777` = 16:9, `null` = 자유) |
| `shape`          | `string`                       | `'square'`                          | 썸네일 및 마스크 형태 (`'square'`, `'circle'`)                      |
| `enable-crop`    | `boolean`                      | `true`                              | 파일 선택 후 크롭 모달 자동 실행 여부                                     |
| `output-type`    | `string`                       | `'blob'`                            | 편집 완료 후 결과물 반환 타입 (`'blob'`, `'file'`, `'base64'`)         |
| `output-quality` | `number`                       | `0.92`                              | 크롭 압축 품질 (`0` ~ `1`)                                       |
| `disabled`       | `boolean`                      | `false`                             | 비활성화 여부                                                    |
| `readonly`       | `boolean`                      | `false`                             | 읽기 전용 여부 (미리보기만 가능, 편집/삭제 불가)                              |
| `error`          | `boolean`                      | `false`                             | 유효성 검사 에러 상태 여부                                            |

### 3.2. 상태 (States)

- **Empty (Default)**: 이미지 미선택 상태 (업로드 드롭존 노출)
- **Drag Over**: 이미지 파일을 드롭존 위로 드래그하여 진입한 강조 상태
- **Image Loaded / Selected**: 이미지가 업로드되어 미리보기 썸네일이 활성화된 상태
- **Cropping**: 전용 크롭 모달이 열려 사용자가 영역을 편집 중인 상태
- **Processing**: 크롭 연산 및 이미지 변환/업로드 처리 중 상태 (스피너 표출)
- **Disabled / Readonly**: 비활성화 및 읽기 전용 상태
- **Error**: 허용되지 않은 이미지 포맷, 용량 초과, 크롭 처리 실패 상태

### 3.3. 이벤트 (Events)

| **이벤트명**        | **상세 (Detail)**                                                   | **발생 시점**                     |
| --------------- | ----------------------------------------------------------------- | ----------------------------- |
| `change`        | `{ file: File \| Blob, url: string, cropData: Object }`           | 이미지 선택 및 크롭 완료 시 방출           |
| `crop-start`    | `{ rawFile: File }`                                               | 크롭 모달이 열릴 때 방출                |
| `crop-complete` | `{ croppedResult: CropResult }`                                   | 크롭 모달에서 '확인'을 눌러 편집이 확정될 때 방출 |
| `crop-cancel`   | `void`                                                            | 크롭 모달에서 '취소'를 눌렀을 때 방출        |
| `remove`        | `void`                                                            | 이미지 삭제 버튼 클릭 시 방출             |
| `error`         | `{ type: 'size' \| 'extension' \| 'corrupted', message: string }` | 파일 검증 또는 이미지 로딩 실패 시 방출       |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-imageupload-width-sm: 100px;
  --ui-imageupload-height-sm: 100px;
  --ui-imageupload-width-md: 160px;
  --ui-imageupload-height-md: 160px;
  --ui-imageupload-width-lg: 240px;
  --ui-imageupload-height-lg: 240px;
  --ui-imageupload-border-radius: 8px;
  --ui-imageupload-crop-modal-width: 600px;

  /* Colors - Base & Drop Zone */
  --ui-imageupload-bg: #ffffff;
  --ui-imageupload-border-color: #d1d5db;
  --ui-imageupload-border-style: dashed;
  --ui-imageupload-text-color: #111827;

  /* Colors - Hover & Overlay */
  --ui-imageupload-dragover-bg: #eff6ff;
  --ui-imageupload-dragover-border-color: #2563eb;
  --ui-imageupload-overlay-bg: rgba(0, 0, 0, 0.5);
  --ui-imageupload-overlay-btn-color: #ffffff;

  /* Colors - Crop Canvas & Mask */
  --ui-imageupload-crop-bg: #000000;
  --ui-imageupload-crop-mask-bg: rgba(0, 0, 0, 0.6);
  --ui-imageupload-crop-grid-color: rgba(255, 255, 255, 0.4);

  /* Colors - Error & Disabled */
  --ui-imageupload-error-color: #dc2626;
  --ui-imageupload-disabled-bg: #f3f4f6;
  --ui-imageupload-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="button"`**: 업로드 드롭존 영역 및 미리보기 오버레이 내 개별 액션(편집, 삭제, 확대) 버튼에 바인딩
- **`role="dialog"`** & **`aria-modal="true"`**: 이미지 크롭 모달 패널에 바인딩
- **`aria-label`**: 썸네일 이미지에 대체 텍스트(예: "업로드된 이미지 미리보기") 및 오버레이 액션 버튼의 명확한 용도 전달
- **`aria-describedby`**: 허용 이미지 포맷 및 용량 제한 가이드 문구 ID 연결

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab` / `Shift + Tab`**: 드롭존, 썸네일 액션 버튼들, 크롭 모달 내부 툴바 컨트롤 및 확정/취소 버튼 간 포커스 순차 이동 (크롭 모달 활성화 시 Focus Trap 적용)
- **`Enter` / `Space`**: 드롭존 포커스 시 OS 파일 탐색기 호출, 오버레이 버튼 포커스 시 해당 액션(크롭 모달 오픈, 이미지 삭제 등) 실행
- **`ArrowKeys` (크롭 모달 내부)**: 선택 박스(Cropper Box) 포커스 시 방향키를 통한 미세 위치 이동 지원
- **`Escape`**: 열려 있는 크롭 모달 패널을 닫고 이전 미리보기 포커스로 복귀

### 5.3. 스크린 리더 대응

- 이미지 로드 완료 시 "이미지가 성공적으로 첨부되었습니다."를 `aria-live="polite"` 영역을 통해 안내하고, 크롭 모달 진입 시 모달 타이틀과 현재 상태를 음성 안내합니다. 편집 완료 후 새로 변경된 이미지 상태를 실시간 음성으로 갱신하여 전달합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`ImageUpload.ts`)과 전용 Lit 스타일시트(`ImageUpload.css.ts`) 코드를 작성해 주세요.

[작성 조건 - ImageUpload.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `ImageUploadTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `ImageUploadHost` 명칭으로 export 하세요.

[작성 조건 - ImageUpload.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const imageUploadStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-image-upload-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-image-upload`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/ImageUpload/ImageUpload.ts`, `src/components/ImageUpload/ImageUpload.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`ImageUpload.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - ImageUpload.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `ImageUploadHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-image-upload')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `ImageUploadTemplate` 및 `ImageUpload.css.ts`의 `imageUploadStyles`를 임포트하세요. `ImageUploadHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = imageUploadStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `ImageUploadTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/ImageUpload/ImageUpload.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`ImageUpload.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - ImageUpload.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `ImageUploadWc` 클래스와 커스텀 엘리먼트 태그명(`biz-image-upload`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/ImageUpload/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`ImageUploadTemplate`), 스타일(`imageUploadStyles`), 웹 컴포넌트 클래스(`ImageUploadWc`), React 래퍼 컴포넌트(`ImageUpload`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/ImageUpload/ImageUpload.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/ImageUpload/ImageUpload.react.ts`, `src/components/ImageUpload/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`ImageUpload.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - ImageUpload.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `ImageUploadHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 ImageUpload.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요.

[출력 형식]
- 파일 경로(`src/components/ImageUpload/ImageUpload.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
