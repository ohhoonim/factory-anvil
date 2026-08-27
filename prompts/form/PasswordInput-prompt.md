# PasswordInput Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/PasswordInput/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - PasswordInput.ts (코어 Lit 템플릿)
   - PasswordInput.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - PasswordInput.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - PasswordInput.react.ts (@lit/react 기반 React 래퍼)
   - PasswordInput.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-password-input`
   - Lit 엘리먼트 클래스명: `BizPasswordInput`
   - CSS Design Token / Custom Properties: `--biz-password-input-*`
   - 루트 CSS 클래스명: `biz-password-input`
   - Lit 코어 템플릿 export 명칭: `PasswordInputTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`PasswordInputHost` 
   - Lit 스타일 export 변수명: `export const passwordInputStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizPasswordInput
- 커스텀 엘리먼트 태그명 (kebab-case): biz-password-input
- Lit 스타일 변수명 (camelCase): passwordInputStyles

[요구사항 정의서]
---

# PasswordInput 요구사항 정의서

비밀번호 마스킹/언마스킹(보기/숨기기) 토글 아이콘 및 인터랙션 지원
## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Label`: 상단 또는 좌측에 위치하는 입력 필드 명칭 영역
- `Input Control`: 비밀번호 입력을 수신하는 필드 및 우측 가시성 토글 버튼 구획
- `Visibility Toggle Button`: 우측 internal slot에 배치되어 비밀번호 마스킹 해제/설정을 전환하는 아이콘 버튼
- `Helper Text / Error Message`: 하단 안내 문구 및 유효성 검사 에러 메시지 영역

### 1.2. 형태 옵션 (Variants)

- `Outlined`: 테두리 중심 스타일
- `Filled`: 배경색 중심 스타일
- `Standard`: 하단 경계선 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

|**슬롯명 (Slot Name)**|**설명 (Description)**|**비고 (Remarks)**|
|---|---|---|
|`label-slot`|상단/좌측 레이블 영역|표준 `<label>` 태그 충돌 방지|
|`start-slot`|최좌측 내부 주입 영역 (Prefix 아이콘 등)|RTL 대응 고려 명명|
|`end-slot`|우측 내부 주입 영역 (가시성 토글 버튼 옆 추가 아이콘)||
|`toggle-icon-slot`|비밀번호 가시성 토글 아이콘 대체 영역|기본 눈 모양 아이콘 대체 가능|
|`helper-text-slot`|하단 안내/에러 메시지 영역||

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

|**속성명**|**타입**|**기본값**|**설명**|
|---|---|---|---|
|`value`|`string`|`''`|입력 필드 값|
|`placeholder`|`string`|`''`|플레이스홀더 텍스트|
|`visible`|`boolean`|`false`|평문 노출 여부 (`true`: `text`, `false`: `password`)|
|`required`|`boolean`|`false`|필수 입력 여부|
|`readonly`|`boolean`|`false`|읽기 전용 여부|
|`disabled`|`boolean`|`false`|비활성화 여부|
|`error`|`boolean`|`false`|유효성 에러 상태 여부|
|`clearable`|`boolean`|`false`|초기화 버튼 노출 여부|

### 3.2. 상태 (States)

- **Masked**: 비밀번호가 마스킹 처리된 기본 상태 (`type="password"`)
- **Unmasked**: 비밀번호가 평문으로 노출되는 상태 (`type="text"`)
- **Hover**: 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 포커스 진입 및 키보드 포커스 링 표시
- **Disabled**: 비활성화 (인터랙션 및 토글 불가, 시각적 Dim)
- **Readonly**: 읽기 전용 (값 복사 가능, 수정 및 토글 불가)
- **Error**: 유효성 검사 실패 (시각적 에러 강조)

### 3.3. 이벤트 (Events)

| **이벤트명**            | **상세 (Detail)**        | **발생 시점**            |
| ------------------- | ---------------------- | -------------------- |
| `input`             | `{ value: string }`    | 값 변경 시 실시간 방출        |
| `change`            | `{ value: string }`    | 값 변경 후 포커스 해제 시 방출   |
| `toggle-visibility` | `{ visible: boolean }` | 우측 가시성 토글 버튼 클릭 시 방출 |
| `focus`             | `FocusEvent`           | 포커스 진입 시 방출          |
| `blur`              | `FocusEvent`           | 포커스 해제 시 방출          |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-password-input-height-sm: 32px;
  --ui-password-input-height-md: 40px;
  --ui-password-input-height-lg: 48px;
  --ui-password-input-padding-x: 12px;
  --ui-password-input-padding-y: 8px;
  --ui-password-input-border-radius: 4px;

  /* Colors - Base */
  --ui-password-input-bg-color: #ffffff;
  --ui-password-input-border-color: #d1d5db;
  --ui-password-input-text-color: #111827;
  --ui-password-input-placeholder-color: #9ca3af;
  --ui-password-input-toggle-icon-color: #6b7280;

  /* Colors - Interactive States */
  --ui-password-input-hover-border-color: #9ca3af;
  --ui-password-input-focus-border-color: #2563eb;
  --ui-password-input-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-password-input-error-color: #dc2626;
  --ui-password-input-disabled-bg-color: #f3f4f6;
  --ui-password-input-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`aria-invalid`**: `error` 속성 활성화 시 `'true'`로 연동
- **`aria-required`**: `required` 속성 활성화 시 `'true'`로 연동
- **`aria-describedby`**: `helper-text-slot` 영역의 ID와 입력 필드를 연결하여 스크린 리더 안내
- **`aria-label`** (토글 버튼): "비밀번호 표시" 또는 "비밀번호 숨기기"로 상태에 따라 동적 변경
- **`aria-pressed`** (토글 버튼): 평문 노출(`visible=true`) 시 `'true'`, 마스킹(`visible=false`) 시 `'false'` 바인딩

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 포커스 이동 순서 준수 (입력 필드 진입 후 가시성 토글 버튼으로 이동)
- **`Space / Enter`**: 토글 버튼에 포커스된 상태에서 비밀번호 가시성 상태 전환
- **`Escape`**: `clearable` 활성화 상태일 때 입력값 초기화

### 5.3. 스크린 리더 대응

- 가시성 토글 버튼 클릭 시 스크린 리더에 "비밀번호가 표시되었습니다" 또는 "비밀번호가 숨겨졌습니다"를 명확하게 음성 안내할 수 있도록 `aria-live="polite"` 영역 활용 또는 동적 접근성 레이블을 업데이트합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`PasswordInput.ts`)과 전용 Lit 스타일시트(`PasswordInput.css.ts`) 코드를 작성해 주세요.

[작성 조건 - PasswordInput.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `PasswordInputTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `PasswordInputHost` 명칭으로 export 하세요.

[작성 조건 - PasswordInput.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const passwordInputStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-password-input-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-password-input`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/PasswordInput/PasswordInput.ts`, `src/components/PasswordInput/PasswordInput.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`PasswordInput.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - PasswordInput.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `PasswordInputHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-password-input')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `PasswordInputTemplate` 및 `PasswordInput.css.ts`의 `passwordInputStyles`를 임포트하세요. `PasswordInputHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = passwordInputStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `PasswordInputTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/PasswordInput/PasswordInput.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`PasswordInput.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - PasswordInput.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `PasswordInputWc` 클래스와 커스텀 엘리먼트 태그명(`biz-password-input`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/PasswordInput/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`PasswordInputTemplate`), 스타일(`passwordInputStyles`), 웹 컴포넌트 클래스(`PasswordInputWc`), React 래퍼 컴포넌트(`PasswordInput`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/PasswordInput/PasswordInput.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/PasswordInput/PasswordInput.react.ts`, `src/components/PasswordInput/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`PasswordInput.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - PasswordInput.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `PasswordInputHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 PasswordInput.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요.

[출력 형식]
- 파일 경로(`src/components/PasswordInput/PasswordInput.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
