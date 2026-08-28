# Dialog Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/Dialog/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - Dialog.ts (코어 Lit 템플릿)
   - Dialog.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - Dialog.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - Dialog.react.ts (@lit/react 기반 React 래퍼)
   - Dialog.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-dialog`
   - Lit 엘리먼트 클래스명: `BizDialog`
   - CSS Design Token / Custom Properties: `--biz-dialog-*`
   - 루트 CSS 클래스명: `biz-dialog`
   - Lit 코어 템플릿 export 명칭: `DialogTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`DialogHost` 
   - Lit 스타일 export 변수명: `export const dialogStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizDialog
- 커스텀 엘리먼트 태그명 (kebab-case): biz-dialog
- Lit 스타일 변수명 (camelCase): dialogStyles

[요구사항 정의서]
---
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
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`Dialog.ts`)과 전용 Lit 스타일시트(`Dialog.css.ts`) 코드를 작성해 주세요.

[작성 조건 - Dialog.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `DialogTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `DialogHost` 명칭으로 export 하세요.

[작성 조건 - Dialog.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const dialogStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-dialog-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-dialog`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/Dialog/Dialog.ts`, `src/components/Dialog/Dialog.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`Dialog.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - Dialog.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `DialogHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-dialog')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `DialogTemplate` 및 `Dialog.css.ts`의 `dialogStyles`를 임포트하세요. `DialogHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = dialogStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `DialogTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/Dialog/Dialog.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`Dialog.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - Dialog.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `DialogWc` 클래스와 커스텀 엘리먼트 태그명(`biz-dialog`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/Dialog/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`DialogTemplate`), 스타일(`dialogStyles`), 웹 컴포넌트 클래스(`DialogWc`), React 래퍼 컴포넌트(`Dialog`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/Dialog/Dialog.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/Dialog/Dialog.react.ts`, `src/components/Dialog/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`Dialog.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - Dialog.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `DialogHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 Dialog.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/Dialog/Dialog.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
