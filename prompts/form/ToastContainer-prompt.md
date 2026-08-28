# ToastContainer Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/ToastContainer/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - ToastContainer.ts (코어 Lit 템플릿)
   - ToastContainer.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - ToastContainer.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - ToastContainer.react.ts (@lit/react 기반 React 래퍼)
   - ToastContainer.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-toast-container`
   - Lit 엘리먼트 클래스명: `BizToastContainer`
   - CSS Design Token / Custom Properties: `--biz-toast-container-*`
   - 루트 CSS 클래스명: `biz-toast-container`
   - Lit 코어 템플릿 export 명칭: `ToastContainerTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`ToastContainerHost` 
   - Lit 스타일 export 변수명: `export const toastContainerStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizToastContainer
- 커스텀 엘리먼트 태그명 (kebab-case): biz-toast-container
- Lit 스타일 변수명 (camelCase): toastContainerStyles

[요구사항 정의서]
---
# [ToastContainer] 요구사항 정의서

Toast Manager는 시스템 전역에서 발생하는 비동기 알림 요청을 수집·큐잉(Queueing)하고, 화면 우측 상단 스택 레이아웃의 최대 노출 개수 제어, 라이프사이클(자동 소멸 및 애니메이션) 추적, 수동 일괄 닫기 등 토스트 컴포넌트들의 오케스트레이션을 전담하는 중앙 관리 객체입니다.

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Toast Container (`<biz-toast-container>`)**: 화면 우측 상단 고정 위치(`position: fixed`)에 위치하며, 슬롯으로 주입되거나 동적으로 전달되는 토스트 엘리먼트들을 수직 스택(Stack) 형태로 배열하고 오케스트레이션하는 컨테이너 전용 컴포넌트입니다.

### 1.2. 형태 옵션 (Variants)

- 본 컨테이너는 하위 토스트 렌더링 영역만을 제어하는 레이아웃 관리 컴포넌트로, 자체적인 시각적 Variant 옵션을 가지지 않습니다.

### 1.3. 크기 옵션 (Sizes)

- 본 컨테이너는 내부 토스트 요소들의 간격 및 스택 레이아웃 규격만 제어합니다.
    - `Small`: 바짝 붙은 촘촘한 간격 (간격 6px)
    - `Medium`: 표준 고정 간격 (간격 10px)
    - `Large`: 넓은 여백 간격 (간격 16px)

### 1.4. 레이아웃 제어 (Layout Properties)

- `max-visible-count`: 컨테이너 내부 스택에 동시에 노출 가능한 최대 토스트 개수 (기본값: `5`)
- `position`: 컨테이너의 화면 고정 위치 (기본값: `'top-right'`)
- `newest-on-top`: 최신 주입된 토스트 엘리먼트를 스택 최상단에 배치할지 여부 (기본값: `true`)

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- Shadow DOM 내부로 외부 토스트 엘리먼트들을 수집 및 오케스트레이션하기 위한 기본 슬롯 구성을 정의합니다.

| **슬롯명 (Slot Name)** | **설명 (Description)** | **비고 (Remarks)** |
| --- | --- | --- |
| `default` | 컨테이너 내부로 주입되는 토스트 엘리먼트들의 기본 배치 영역 | `<slot>` 노드 변경 감지를 통해 자식 토스트 수량 추적 |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

#### Container Configuration & Properties

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `maxVisibleCount` | `number` | `5` | 동시 노출 및 스택으로 보여줄 최대 토스트 개수 |
| `position` | `string` | `'top-right'` | 컨테이너 화면 고정 위치 (`top-right`, `top-left`, `bottom-right`, `bottom-left`) |
| `gap` | `number` | `10` | 스택 내부 토스트 요소 간의 수직 간격 (px) |
| `newestOnTop` | `boolean` | `true` | 새로운 토스트의 스택 최상단 배치 여부 |
| `pauseOnHover` | `boolean` | `true` | 컨테이너 영역 호버 시 내부 자식 토스트들의 소멸 일시정지 상태 전파 여부 |

#### Container Operations (Imperative Methods)

| **메서드명** | **파라미터** | **반환 타입** | **설명** |
| --- | --- | --- | --- |
| `add()` | `element: HTMLElement` | `void` | 컨테이너 스택 내부에 새로운 토스트 엘리먼트 동적 추가 |
| `remove()` | `element: HTMLElement` | `void` | 특정 토스트 엘리먼트를 컨테이너 스택에서 제거 |
| `clear()` | `void` | `void` | 현재 컨테이너 내부의 모든 토스트 엘리먼트 일괄 제거 |

### 3.2. 상태 (States)

- **Empty**: 관리 및 배치 중인 하위 토스트가 없는 상태
- **Stacking**: `maxVisibleCount` 범위 내에서 토스트들이 화면 우측 상단에 정렬되어 표시 중인 상태
- **Overflow**: `maxVisibleCount`를 초과하여 초과 분량이 화면에 노출되지 않도록 가려지거나 큐로 제어되는 상태
- **Hovered**: 마우스 포인터가 컨테이너 영역 내부에 진입하여 자식들의 인터랙션이 활성화된 상태

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `container-change` | `{ count: number, visibleCount: number }` | 자식 토스트 추가/제거로 인해 스택 개수가 변경될 때 방출 |
| `overflow-change` | `{ overflowCount: number }` | `maxVisibleCount` 초과 토스트 수량 변경 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 스택 컨테이너의 화면 배치 및 자식 레이아웃 관리를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-biz-toast-container-*`)를 준수합니다.

```
:host {
  /* Positioning & Layout */
  --biz-toast-container-top: 20px;
  --biz-toast-container-right: 20px;
  --biz-toast-container-z-index: 9999;
  --biz-toast-container-gap: 10px;
  --biz-toast-container-max-width: 420px;

  /* Flex & Alignments */
  --biz-toast-container-display: flex;
  --biz-toast-container-direction: column;
  --biz-toast-container-align: flex-end;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role`**: `'region'` 설정하여 독립적인 라이브 알림 영역임을 명시
- **`aria-label`**: `'알림 목록'` 또는 `'Notifications'` 설정
- **`aria-live`**: `'polite'` 설정하여 하위 요소 추가 시 스크린 리더에 동적 갱신 감지 기회 제공

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Alt + T` / `F6`**: 화면 전역에서 스택 컨테이너 내부 영역으로 포커스 즉시 이동
- **`Tab`**: 컨테이너 내부 자식 토스트들의 대화형 요소 간 포커스 이동 순서 유지

### 5.3. 스크린 리더 대응

- 컨테이너 내부로 토스트 요소가 동적으로 삽입/삭제될 때 스크린 리더가 영역 전체를 재독출하지 않고, 추가되거나 제거된 변경 사항만 실시간 안내할 수 있도록 보장합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`ToastContainer.ts`)과 전용 Lit 스타일시트(`ToastContainer.css.ts`) 코드를 작성해 주세요.

[작성 조건 - ToastContainer.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `ToastContainerTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `ToastContainerHost` 명칭으로 export 하세요.

[작성 조건 - ToastContainer.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const toastContainerStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-toast-container-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-toast-container`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/ToastContainer/ToastContainer.ts`, `src/components/ToastContainer/ToastContainer.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`ToastContainer.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - ToastContainer.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `ToastContainerHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-toast-container')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `ToastContainerTemplate` 및 `ToastContainer.css.ts`의 `toastContainerStyles`를 임포트하세요. `ToastContainerHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = toastContainerStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `ToastContainerTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/ToastContainer/ToastContainer.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`ToastContainer.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - ToastContainer.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `ToastContainerWc` 클래스와 커스텀 엘리먼트 태그명(`biz-toast-container`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/ToastContainer/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`ToastContainerTemplate`), 스타일(`toastContainerStyles`), 웹 컴포넌트 클래스(`ToastContainerWc`), React 래퍼 컴포넌트(`ToastContainer`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/ToastContainer/ToastContainer.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/ToastContainer/ToastContainer.react.ts`, `src/components/ToastContainer/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`ToastContainer.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - ToastContainer.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `ToastContainerHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 ToastContainer.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/ToastContainer/ToastContainer.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
