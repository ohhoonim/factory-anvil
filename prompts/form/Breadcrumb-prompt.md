# Breadcrumb Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/Breadcrumb/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - Breadcrumb.ts (코어 Lit 템플릿)
   - Breadcrumb.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - Breadcrumb.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - Breadcrumb.react.ts (@lit/react 기반 React 래퍼)
   - Breadcrumb.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-breadcrumb`
   - Lit 엘리먼트 클래스명: `BizBreadcrumb`
   - CSS Design Token / Custom Properties: `--biz-breadcrumb-*`
   - 루트 CSS 클래스명: `biz-breadcrumb`
   - Lit 코어 템플릿 export 명칭: `BreadcrumbTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`BreadcrumbHost` 
   - Lit 스타일 export 변수명: `export const breadcrumbStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizBreadcrumb
- 커스텀 엘리먼트 태그명 (kebab-case): biz-breadcrumb
- Lit 스타일 변수명 (camelCase): breadcrumbStyles

[요구사항 정의서]
---
# [Breadcrumb] 요구사항 정의서

브레드크럼(Breadcrumb)은 사용자가 현재 웹 애플리케이션 내에서 어떤 위치에 있는지 계층적 구조로 시각화하여 보여주고, 상위 단계로 신속하게 이동할 수 있도록 지원하는 탐색(Navigation) 경로입니다.

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- 최상위 컨테이너, 계층별 항목(Breadcrumb Item), 구분자(Separator), 오버플로우 처리용 더보기 버튼으로 구획을 구성합니다.

### 1.2. 형태 옵션 (Variants)

- `Standard`: 기본 텍스트 및 구분자 조합 스타일
- `Contained`: 각 계층 항목이 칩 또는 배경 블록 형태로 둘러싸인 스타일
- `Standard-Icon`: 항목 내 아이콘과 텍스트가 함께 노출되는 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `wrap`: 너비 초과 시 다음 줄 바꿈 처리 여부 (기본값은 한 줄 노출 및 오버플로우 축약)

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)** | **비고 (Remarks)** |
| --- | --- | --- |
| `start-slot` | 최좌측 내부 주입 영역 (홈 아이콘 등) |  |
| `separator-slot` | 커스텀 구분자 아이콘/문자 주입 영역 | 기본값은 `/` 또는 `>` |
| `end-slot` | 최우측 내부 주입 영역 (추가 액션 버튼 등) |  |
| `dropdown-slot` | 축약된 항목들을 보여줄 드롭다운 메뉴 영역 | 오버플로우 발생 시 사용 |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `items` | `Array<{label: string, href?: string, icon?: string}>` | `[]` | 경로 데이터 배열 |
| `max-items` | `number` | `0` | 최대 노출 항목 수 (초과 시 중간 항목 축약, 0은 전체 노출) |
| `items-before-collapse` | `number` | `1` | 축약 시 앞쪽에 남겨둘 항목 수 |
| `items-after-collapse` | `number` | `1` | 축약 시 뒤쪽에 남겨둘 항목 수 |
| `separator` | `string` | `'/'` | 기본 구분자 문자열 |
| `disabled` | `boolean` | `false` | 전체 비활성화 여부 |

### 3.2. 상태 (States)

- **Hover**: 각 탐색 링크 마우스 오버 시 시각적 피드백 (밑줄, 색상 변경)
- **Focus / Focus-visible**: 키보드 포커스 진입 시 포커스 링 표시
- **Active / Pressed**: 클릭/터치 시 반응 상태
- **Current**: 현재 위치하고 있는 마지막 경로 항목 상태 (인터랙션 불가 또는 강조)
- **Disabled**: 비활성화 (인터랙션 불가, 시각적 Dim)

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `breadcrumb-click` | `{ item: object, index: number, originalEvent: Event }` | 경로 항목 클릭 시 방출 |
| `overflow-click` | `{ collapsedItems: Array }` | 축약 버튼(...) 클릭 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-breadcrumb-height-sm: 28px;
  --ui-breadcrumb-height-md: 36px;
  --ui-breadcrumb-height-lg: 44px;
  --ui-breadcrumb-gap: 8px;
  --ui-breadcrumb-padding-x: 0px;
  --ui-breadcrumb-padding-y: 4px;

  /* Typography */
  --ui-breadcrumb-font-size-sm: 12px;
  --ui-breadcrumb-font-size-md: 14px;
  --ui-breadcrumb-font-size-lg: 16px;

  /* Colors - Base */
  --ui-breadcrumb-text-color: #4b5563;
  --ui-breadcrumb-current-text-color: #111827;
  --ui-breadcrumb-separator-color: #9ca3af;

  /* Colors - Interactive States */
  --ui-breadcrumb-hover-text-color: #2563eb;
  --ui-breadcrumb-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Disabled */
  --ui-breadcrumb-disabled-text-color: #d1d5db;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="navigation"`**: 최상위 컨테이너에 내비게이션 역할 부여
- **`aria-label="Breadcrumb"`**: 탐색 영역의 목적을 명확히 정의
- **`aria-current="page"`**: 현재 위치한 마지막 경로 항목에 바인딩
- **`aria-hidden="true"`**: visual 전용 구분자(separator) 요소에 바인딩하여 스크린 리더 음성 출력 제외

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 각 경로 링크 간 순차적 포커스 이동
- **`Enter` / `Space`**: 포커스된 경로 항목의 링크 실행 또는 이벤트 트리거

### 5.3. 스크린 리더 대응

- 경로가 `<ol>` 및 `<li>` 태그 기반의 정돈된 리스트 구조로 전달되도록 Shadow DOM 내부 구조를 유지합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`Breadcrumb.ts`)과 전용 Lit 스타일시트(`Breadcrumb.css.ts`) 코드를 작성해 주세요.

[작성 조건 - Breadcrumb.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `BreadcrumbTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `BreadcrumbHost` 명칭으로 export 하세요.

[작성 조건 - Breadcrumb.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const breadcrumbStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-breadcrumb-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-breadcrumb`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/Breadcrumb/Breadcrumb.ts`, `src/components/Breadcrumb/Breadcrumb.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`Breadcrumb.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - Breadcrumb.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `BreadcrumbHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-breadcrumb')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `BreadcrumbTemplate` 및 `Breadcrumb.css.ts`의 `breadcrumbStyles`를 임포트하세요. `BreadcrumbHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = breadcrumbStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `BreadcrumbTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/Breadcrumb/Breadcrumb.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`Breadcrumb.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - Breadcrumb.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `BreadcrumbWc` 클래스와 커스텀 엘리먼트 태그명(`biz-breadcrumb`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/Breadcrumb/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`BreadcrumbTemplate`), 스타일(`breadcrumbStyles`), 웹 컴포넌트 클래스(`BreadcrumbWc`), React 래퍼 컴포넌트(`Breadcrumb`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/Breadcrumb/Breadcrumb.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/Breadcrumb/Breadcrumb.react.ts`, `src/components/Breadcrumb/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`Breadcrumb.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - Breadcrumb.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `BreadcrumbHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 Breadcrumb.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/Breadcrumb/Breadcrumb.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
