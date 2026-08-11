# TileLayoutGrid Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/TileLayoutGrid/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - TileLayoutGrid.ts (코어 Lit 템플릿)
   - TileLayoutGrid.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - TileLayoutGrid.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - TileLayoutGrid.react.ts (@lit/react 기반 React 래퍼)
   - TileLayoutGrid.stories.ts (Storybook 문서 및 a11y 검증)
   - TileLayoutGrid.test.ts (Vitest 및 Playwright 테스트)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-tile-layout-grid`
   - CSS Design Token / Custom Properties: `--biz-tile-layout-grid-*`
   - 루트 CSS 클래스명: `biz-tile-layout-grid`
   - Lit 코어 템플릿 export 명칭: `TileLayoutGridTemplate`
   - Lit 스타일 export 변수명: `export const tileLayoutGridStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): TileLayoutGrid
- 커스텀 엘리먼트 태그명 (kebab-case): biz-tile-layout-grid
- Lit 스타일 변수명 (camelCase): tileLayoutGridStyles

[요구사항 정의서]
---
# TileLayoutGrid 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Grid Container`: 여러 자식 타일(Tile) 엘리먼트들을 그리드 규칙에 따라 정렬하고 배치하는 컨테이너 영역입니다.
- `Tile Item`: 그리드 내부에 삽입되는 개별 콘텐츠 카드 및 패널 구획입니다.

### 1.2. 형태 옵션 (Variants)

- `Fixed-Tile (정격 Tile Grid)`: 모든 자식 타일 요소가 동일한 높이와 비율을 유지하는 균등 그리드 레이아웃
- `Masonry (가변 높이 Grid)`: 콘텐츠의 내용 길이에 따라 자식 타일의 높이가 가변적으로 반응하며 빈 공간을 메우는 레이아웃

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large` (타일 간의 Gap 및 최소 너비 규격 제어)

### 1.4. 레이아웃 제어 (Layout Properties)

- `columns`: 그리드 컬럼 수 제어 (`auto-fit`, `auto-fill` 또는 고정 개수)
- `full-width`: 부모 요소 너비 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**          | **비고 (Remarks)** |
| ------------------- | ----------------------------- | ---------------- |
| `default`           | Grid 내부에 배치될 자식 Tile 요소 주입 영역 |                  |
| `header-slot`       | 그리드 상단 툴바/필터링 영역              | 선택사항             |
| `empty-slot`        | 내부 Tile 요소가 없을 때 표시할 대체 UI 영역 |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**          | **타입**             | **기본값**      | **설명**                                            |
| ---------------- | ------------------ | ------------ | ------------------------------------------------- |
| `mode`           | `string`           | `'fixed'`    | 그리드 모드 (`fixed`: 정격 높이, `masonry`: 가변 높이)         |
| `columns`        | `number \| string` | `'auto-fit'` | 컬럼 수 설정 (`auto-fit`, `auto-fill` 또는 지정 숫자)        |
| `min-tile-width` | `string`           | `'280px'`    | 타일의 최소 너비 규격                                      |
| `gap`            | `string`           | `'medium'`   | 타일 간 간격 (`small`, `medium`, `large` 또는 px/rem 단위) |
| `aspect-ratio`   | `string`           | `'1/1'`      | `fixed` 모드 시 적용할 타일의 가로세로 비율                      |
| `loading`        | `boolean`          | `false`      | 스켈레톤 로딩 상태 여부                                     |

### 3.2. 상태 (States)

- **Normal**: 기본 그리드 타일 배치 상태
- **Loading**: 타일 데이터 비동기 로드 중 스켈레톤 그리드 표시
- **Empty**: 표시할 자식 타일 엘리먼트가 없는 상태
- **Responsive Breakpoint**: 화면 크기 변화에 따라 컬럼 수 및 간격이 실시간 반응하는 상태

### 3.3. 이벤트 (Events)

| **이벤트명**        | **상세 (Detail)**                        | **발생 시점**                       |
| --------------- | -------------------------------------- | ------------------------------- |
| `layout-change` | `{ columns: number, mode: string }`    | 반응형 브레이크포인트 도달로 레이아웃 구조 변경 시 방출 |
| `tile-click`    | `{ item: HTMLElement, index: number }` | 내부 타일 요소 클릭 시 방출                |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-tile-grid-gap-sm: 12px;
  --ui-tile-grid-gap-md: 16px;
  --ui-tile-grid-gap-lg: 24px;
  --ui-tile-grid-min-width: 280px;
  --ui-tile-grid-aspect-ratio: 1 / 1;

  /* Colors - Base */
  --ui-tile-grid-bg-color: transparent;
  --ui-tile-grid-skeleton-bg-color: #e5e7eb;

  /* Colors - Interactive States */
  --ui-tile-grid-focus-ring-color: rgba(37, 99, 235, 0.2);
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="grid"`** 또는 **`role="list"`**: 자식 타일들의 집합 구조에 맞춰 مناسب한 Landmark/Structure Role 부여
- **`aria-busy`**: `loading` 속성이 활성화되어 스켈레톤을 표출할 때 `'true'`로 연동
- **`aria-rowcount` / `aria-colcount`**: 그리드 모드에서 전체 행과 열 수 정보를 스크린 리더에 제공

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab`**: 그리드 내부 첫 번째 포커스 가능한 자식 타일로 진입
- **`ArrowKeys (Left/Right/Up/Down)`**: 2차원 그리드 방향에 따라 이전/다음 자식 타일 요소로 포커스 이동

### 5.3. 스크린 리더 대응

- 가변 높이(`masonry`) 모드 적용 시 시각적 위치와 DOM 순서가 일치하도록 순서를 관리하여 스크린 리더 탐색의 혼선을 방지합니다.
---

위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`TileLayoutGrid.ts`)과 전용 Lit 스타일시트(`TileLayoutGrid.css.ts`) 코드를 작성해 주세요.

[작성 조건 - TileLayoutGrid.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `TileLayoutGridTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.

[작성 조건 - TileLayoutGrid.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const tileLayoutGridStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-tile-layout-grid-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-tile-layout-grid`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/TileLayoutGrid/TileLayoutGrid.ts`, `src/components/TileLayoutGrid/TileLayoutGrid.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`TileLayoutGrid.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - TileLayoutGrid.wc.ts]
1. `LitElement`를 상속받아 클래스를 구현하고, `@customElement('biz-tile-layout-grid')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `TileLayoutGridTemplate` 및 `TileLayoutGrid.css.ts`의 `tileLayoutGridStyles`를 임포트하세요.
3. 정적 클래스 속성으로 `static styles = tileLayoutGridStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `TileLayoutGridTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/TileLayoutGrid/TileLayoutGrid.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`TileLayoutGrid.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - TileLayoutGrid.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `TileLayoutGridWc` 클래스와 커스텀 엘리먼트 태그명(`biz-tile-layout-grid`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/TileLayoutGrid/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`TileLayoutGridTemplate`), 스타일(`tileLayoutGridStyles`), 웹 컴포넌트 클래스(`TileLayoutGridWc`), React 래퍼 컴포넌트(`TileLayoutGrid`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/TileLayoutGrid/TileLayoutGrid.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/TileLayoutGrid/TileLayoutGrid.react.ts`, `src/components/TileLayoutGrid/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 및 테스트 코드 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 및 테스트 코드 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`TileLayoutGrid.stories.ts`)과 단위/통합 테스트 파일(`TileLayoutGrid.test.ts`) 코드를 작성해 주세요.

[작성 조건 - TileLayoutGrid.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
3. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
4. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.

[작성 조건 - TileLayoutGrid.test.ts]
1. Vitest 및 Playwright 환경에서 실행 가능한 테스트 스위트를 구현하세요.
2. [단위 테스트]: Properties 변경에 따른 DOM 반영, 3.3절 커스텀 이벤트(`input`, `change`, `clear` 등) 방출 여부 및 `detail` 데이터 검증을 수행하세요.
3. [통합 및 접근성 테스트]: 5.1절 ARIA 속성(`aria-invalid`, `aria-describedby` 등) 바인딩 및 5.2절 키보드 네비게이션(`Tab`, `Escape`, `Enter` 등) 동작을 브라우저 상에서 검증하는 시나리오를 구현하세요.

[출력 형식]
- 각 파일별 경로(`src/components/TileLayoutGrid/TileLayoutGrid.stories.ts`, `src/components/TileLayoutGrid/TileLayoutGrid.test.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
