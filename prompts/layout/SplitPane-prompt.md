# SplitPane Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/SplitPane/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - SplitPane.ts (코어 Lit 템플릿)
   - SplitPane.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - SplitPane.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - SplitPane.react.ts (@lit/react 기반 React 래퍼)
   - SplitPane.stories.ts (Storybook 문서 및 a11y 검증)
   - SplitPane.test.ts (Vitest 및 Playwright 테스트)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-split-pane`
   - CSS Design Token / Custom Properties: `--biz-split-pane-*`
   - 루트 CSS 클래스명: `biz-split-pane`
   - Lit 코어 템플릿 export 명칭: `SplitPaneTemplate`
   - Lit 스타일 export 변수명: `export const splitPaneStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): SplitPane
- 커스텀 엘리먼트 태그명 (kebab-case): biz-split-pane
- Lit 스타일 변수명 (camelCase): splitPaneStyles

[요구사항 정의서]
---
# SplitPane 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Pane`: 분할된 각 영역을 구성하는 패널 구획
- `Resizer (Divider)`: 패널 사이에 위치하여 드래그/키보드로 크기를 조절하는 분할 바 영역

### 1.2. 형태 옵션 (Variants)

- `Line`: 경계선 형태의 기본 리사이저 스타일
- `Grip`: 중앙에 드래그 핸들 아이콘이 포함된 스타일
- `Invisible`: 평소에는 구분선만 표시되고 마우스 호버 시 강조되는 최소화 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large` (Resizer 두께 및 터치 영역 크기 제어)

### 1.4. 레이아웃 제어 (Layout Properties)

- `direction`: 분할 방향 제어 (`horizontal`, `vertical`)
- `full-width`: 부모 요소 너비 100% 확장 여부
- `full-height`: 부모 요소 높이 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)** | **비고 (Remarks)** |
| ------------------- | -------------------- | ---------------- |
| `pane-1-slot`       | 첫 번째(좌/상) 패널 주입 영역   |                  |
| `pane-2-slot`       | 두 번째(우/하) 패널 주입 영역   | N개 확장 구조 지원      |
| `resizer-slot`      | 커스텀 리사이저 핸들 주입 영역    | 기본 리사이저 대체 가능    |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**       | **타입**     | **기본값**        | **설명**                           |
| ------------- | ---------- | -------------- | -------------------------------- |
| `direction`   | `string`   | `'horizontal'` | 분할 방향 (`horizontal`, `vertical`) |
| `sizes`       | `number[]` | `[50, 50]`     | 각 패널의 초기 비율 (%) 또는 크기 (px)       |
| `min-sizes`   | `number[]` | `[100, 100]`   | 각 패널의 최소 크기 (px)                 |
| `max-sizes`   | `number[]` | `[]`           | 각 패널의 최대 크기 (px)                 |
| `disabled`    | `boolean`  | `false`        | 리사이징 기능 비활성화 여부                  |
| `collapsible` | `boolean`  | `false`        | 리사이저 더블 클릭 시 패널 접기 활성화 여부        |

### 3.2. 상태 (States)

- **Hover**: 리사이저 바 오버 시 포인터 커서 변경 (`col-resize` / `row-resize`) 및 시각적 피드백
- **Focus / Focus-visible**: 키보드로 리사이저 조작 시 포커스 링 표시
- **Dragging / Active**: 드래그 진행 중 리사이저 강조 및 하이라이트 표시
- **Disabled**: 리사이징 비활성화 (드래그 불가 및 포인터 커서 기본값 유지)
- **Collapsed**: 패널이 완전히 접힌 상태

### 3.3. 이벤트 (Events)

| **이벤트명**       | **상세 (Detail)**                             | **발생 시점**         |
| -------------- | ------------------------------------------- | ----------------- |
| `resize-start` | `{ sizes: number[] }`                       | 드래그/조작 시작 시점 방출   |
| `resize`       | `{ sizes: number[] }`                       | 크기 조절 진행 중 실시간 방출 |
| `resize-end`   | `{ sizes: number[] }`                       | 드래그/조작 완료 시점 방출   |
| `collapse`     | `{ paneIndex: number, collapsed: boolean }` | 패널 접힘/펼침 시 방출     |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-split-pane-resizer-size-sm: 4px;
  --ui-split-pane-resizer-size-md: 6px;
  --ui-split-pane-resizer-size-lg: 8px;
  --ui-split-pane-resizer-hit-area: 12px;

  /* Colors - Base */
  --ui-split-pane-bg-color: #ffffff;
  --ui-split-pane-resizer-bg-color: #e5e7eb;

  /* Colors - Interactive States */
  --ui-split-pane-resizer-hover-color: #2563eb;
  --ui-split-pane-resizer-active-color: #1d4ed8;
  --ui-split-pane-resizer-focus-ring-color: rgba(37, 99, 235, 0.2);
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="separator"`**: Resizer 요소에 분할 구분선 역할 부여
- **`aria-orientation`**: `direction` 속성에 따라 `'horizontal'` 또는 `'vertical'` 설정
- **`aria-valuenow`**: 현재 첫 번째 패널의 크기 비율/값 설정
- **`aria-valuemin`**: 최소 허용 값 연동 (`min-sizes`)
- **`aria-valuemax`**: 최대 허용 값 연동 (`max-sizes`)
- **`aria-controls`**: 리사이저가 제어하는 패널 요소 ID 연동

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: Resizer 요소로 키보드 포커스 이동
- **`ArrowLeft / ArrowUp`**: 현재 방향에 따라 이전 방향으로 패널 크기 축소/확장
- **`ArrowRight / ArrowDown`**: 현재 방향에 따라 다음 방향으로 패널 크기 확장/축소
- **`Home`**: 최소 크기로 패널 축소
- **`End`**: 최대 크기로 패널 확장
- **`Enter`**: `collapsible` 활성화 상태일 때 패널 접기/펼침 토글

### 5.3. 스크린 리더 대응

- 스크린 리더에서 리사이저 조작 시 변경되는 크기 비율 정보를 `aria-valuenow`를 통해 실시간 수치로 제공합니다.
---

위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`SplitPane.ts`)과 전용 Lit 스타일시트(`SplitPane.css.ts`) 코드를 작성해 주세요.

[작성 조건 - SplitPane.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `SplitPaneTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.

[작성 조건 - SplitPane.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const splitPaneStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-split-pane-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-split-pane`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/SplitPane/SplitPane.ts`, `src/components/SplitPane/SplitPane.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`SplitPane.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - SplitPane.wc.ts]
1. `LitElement`를 상속받아 클래스를 구현하고, `@customElement('biz-split-pane')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `SplitPaneTemplate` 및 `SplitPane.css.ts`의 `splitPaneStyles`를 임포트하세요.
3. 정적 클래스 속성으로 `static styles = splitPaneStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `SplitPaneTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/SplitPane/SplitPane.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`SplitPane.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - SplitPane.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `SplitPaneWc` 클래스와 커스텀 엘리먼트 태그명(`biz-split-pane`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/SplitPane/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`SplitPaneTemplate`), 스타일(`splitPaneStyles`), 웹 컴포넌트 클래스(`SplitPaneWc`), React 래퍼 컴포넌트(`SplitPane`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/SplitPane/SplitPane.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/SplitPane/SplitPane.react.ts`, `src/components/SplitPane/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 및 테스트 코드 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 및 테스트 코드 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`SplitPane.stories.ts`)과 단위/통합 테스트 파일(`SplitPane.test.ts`) 코드를 작성해 주세요.

[작성 조건 - SplitPane.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
3. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
4. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.

[작성 조건 - SplitPane.test.ts]
1. Vitest 및 Playwright 환경에서 실행 가능한 테스트 스위트를 구현하세요.
2. [단위 테스트]: Properties 변경에 따른 DOM 반영, 3.3절 커스텀 이벤트(`input`, `change`, `clear` 등) 방출 여부 및 `detail` 데이터 검증을 수행하세요.
3. [통합 및 접근성 테스트]: 5.1절 ARIA 속성(`aria-invalid`, `aria-describedby` 등) 바인딩 및 5.2절 키보드 네비게이션(`Tab`, `Escape`, `Enter` 등) 동작을 브라우저 상에서 검증하는 시나리오를 구현하세요.

[출력 형식]
- 각 파일별 경로(`src/components/SplitPane/SplitPane.stories.ts`, `src/components/SplitPane/SplitPane.test.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
