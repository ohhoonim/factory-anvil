# CardContainer Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/CardContainer/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - CardContainer.ts (코어 Lit 템플릿)
   - CardContainer.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - CardContainer.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - CardContainer.react.ts (@lit/react 기반 React 래퍼)
   - CardContainer.stories.ts (Storybook 문서 및 a11y 검증)
   - CardContainer.test.ts (Vitest 및 Playwright 테스트)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-card-container`
   - CSS Design Token / Custom Properties: `--biz-card-container-*`
   - 루트 CSS 클래스명: `biz-card-container`
   - Lit 코어 템플릿 export 명칭: `CardContainerTemplate`
   - Lit 스타일 export 변수명: `export const cardContainerStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): CardContainer
- 커스텀 엘리먼트 태그명 (kebab-case): biz-card-container
- Lit 스타일 변수명 (camelCase): cardContainerStyles

[요구사항 정의서]
---
# CardContainer 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Header`: 카드 상단 영역 (타이틀, 아이콘, 닫기/더보기 버튼 등)
- `Body`: 카드 중앙 메인 콘텐츠 영역
- `Footer`: 카드 하단 영역 (작업 버튼, 상태 메시지 등)
- 3개 영역이 독립적으로 구분되면서 수직으로 배치되는 컨테이너 구조를 정의합니다.

### 1.2. 형태 옵션 (Variants)

- `Outlined`: 테두리 중심 스타일
- `Filled`: 배경색 중심 스타일
- `Elevated`: 그림자(Shadow) 효과 중심 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `bordered-divider`: Header, Body, Footer 구획 간 구분선 표시 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**         | **비고 (Remarks)** |
| ------------------- | ---------------------------- | ---------------- |
| `header-slot`       | 카드 상단 헤더 영역                  | 타이틀, 아이콘 등       |
| `default`           | 카드 중앙 메인 본문 영역 (`body-slot`) |                  |
| `footer-slot`       | 카드 하단 푸터 영역                  | 주요 버튼 및 액션 등     |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**            | **타입**    | **기본값**      | **설명**                                   |
| ------------------ | --------- | ------------ | ---------------------------------------- |
| `variant`          | `string`  | `'outlined'` | 형태 옵션 (`outlined`, `filled`, `elevated`) |
| `size`             | `string`  | `'medium'`   | 크기 옵션 (`small`, `medium`, `large`)       |
| `full-width`       | `boolean` | `false`      | 너비 100% 확장 여부                            |
| `bordered-divider` | `boolean` | `false`      | Header, Body, Footer 사이 구분선 적용 여부        |
| `hoverable`        | `boolean` | `false`      | 마우스 오버 시 인터랙션 스타일 적용 여부                  |

### 3.2. 상태 (States)

- **Hover**: `hoverable` 활성화 시 마우스 오버 시각적 피드백 (그림자/테두리 변화)
- **Focus / Focus-visible**: 카드 전체 클릭/선택 가능 시 키보드 포커스 링 표시
- **Loading**: 카드 내부 콘텐츠 비동기 로딩 스피너/스켈레톤 표시
- **Disabled**: 비활성화 상태 (인터랙션 불가, Dim 처리)

### 3.3. 이벤트 (Events)

| **이벤트명**     | **상세 (Detail)** | **발생 시점**                          |
| ------------ | --------------- | ---------------------------------- |
| `card-click` | `MouseEvent`    | 카드 컨테이너 전체 클릭 시 방출 (클릭 가능한 카드인 경우) |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-card-padding-sm: 12px;
  --ui-card-padding-md: 16px;
  --ui-card-padding-lg: 24px;
  --ui-card-border-radius: 8px;

  /* Colors - Base */
  --ui-card-bg-color: #ffffff;
  --ui-card-border-color: #e5e7eb;
  --ui-card-divider-color: #f3f4f6;

  /* Elevation & States */
  --ui-card-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --ui-card-hover-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="region"`** 또는 **`role="article"`**: 가치 있는 독립적 컨텐츠 영역임을 명시
- **`aria-labelledby`**: `header-slot` 내부의 타이틀 요소 ID와 연결하여 구획 설명 제공

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: Header, Body, Footer 내부의 포커스 가능 요소(버튼, 링크 등)로 순차 이동

### 5.3. 스크린 리더 대응

- 구획별 구분선(`bordered-divider`)은 단순 시각적 요소이므로 `aria-hidden="true"`를 적용하여 스크린 리더에서 불필요하게 읽히지 않도록 구성
---

위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`CardContainer.ts`)과 전용 Lit 스타일시트(`CardContainer.css.ts`) 코드를 작성해 주세요.

[작성 조건 - CardContainer.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `CardContainerTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.

[작성 조건 - CardContainer.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const cardContainerStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-card-container-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-card-container`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/CardContainer/CardContainer.ts`, `src/components/CardContainer/CardContainer.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`CardContainer.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - CardContainer.wc.ts]
1. `LitElement`를 상속받아 클래스를 구현하고, `@customElement('biz-card-container')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `CardContainerTemplate` 및 `CardContainer.css.ts`의 `cardContainerStyles`를 임포트하세요.
3. 정적 클래스 속성으로 `static styles = cardContainerStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `CardContainerTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/CardContainer/CardContainer.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`CardContainer.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - CardContainer.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `CardContainerWc` 클래스와 커스텀 엘리먼트 태그명(`biz-card-container`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/CardContainer/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`CardContainerTemplate`), 스타일(`cardContainerStyles`), 웹 컴포넌트 클래스(`CardContainerWc`), React 래퍼 컴포넌트(`CardContainer`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/CardContainer/CardContainer.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/CardContainer/CardContainer.react.ts`, `src/components/CardContainer/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 및 테스트 코드 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 및 테스트 코드 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`CardContainer.stories.ts`)과 단위/통합 테스트 파일(`CardContainer.test.ts`) 코드를 작성해 주세요.

[작성 조건 - CardContainer.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
3. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
4. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.

[작성 조건 - CardContainer.test.ts]
1. Vitest 및 Playwright 환경에서 실행 가능한 테스트 스위트를 구현하세요.
2. [단위 테스트]: Properties 변경에 따른 DOM 반영, 3.3절 커스텀 이벤트(`input`, `change`, `clear` 등) 방출 여부 및 `detail` 데이터 검증을 수행하세요.
3. [통합 및 접근성 테스트]: 5.1절 ARIA 속성(`aria-invalid`, `aria-describedby` 등) 바인딩 및 5.2절 키보드 네비게이션(`Tab`, `Escape`, `Enter` 등) 동작을 브라우저 상에서 검증하는 시나리오를 구현하세요.

[출력 형식]
- 각 파일별 경로(`src/components/CardContainer/CardContainer.stories.ts`, `src/components/CardContainer/CardContainer.test.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
