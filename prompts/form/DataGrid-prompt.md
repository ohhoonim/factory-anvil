# DataGrid Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/DataGrid/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - DataGrid.ts (코어 Lit 템플릿)
   - DataGrid.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - DataGrid.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - DataGrid.react.ts (@lit/react 기반 React 래퍼)
   - DataGrid.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-data-grid`
   - Lit 엘리먼트 클래스명: `BizDataGrid`
   - CSS Design Token / Custom Properties: `--biz-data-grid-*`
   - 루트 CSS 클래스명: `biz-data-grid`
   - Lit 코어 템플릿 export 명칭: `DataGridTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`DataGridHost` 
   - Lit 스타일 export 변수명: `export const dataGridStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizDataGrid
- 커스텀 엘리먼트 태그명 (kebab-case): biz-data-grid
- Lit 스타일 변수명 (camelCase): dataGridStyles

[요구사항 정의서]
---
제공해주신 HTML 및 JavaScript 코드를 분석하여 작성한 **DataGrid 컴포넌트 요구사항 정의서**입니다.

---

# DataGrid 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

* **Viewport (`grid-viewport`)**: 실제 스크롤이 발생하는 최상위 컨테이너 영역 (`height: 100vh`, `overflow: auto`)
* **Phantom (`grid-phantom`)**: 전체 데이터 수(10만 건 이상)에 상응하는 전체 스크롤 높이 및 너비를 확보하기 위한 가상 영억
* **Content Container (`grid-content`)**: 뷰포트에 실제 노출되는 고정된 수의 렌더링 영역 (`translate3d` 기반 하드웨어 가속 이동)
* **Row & Cell (`grid-row`, `grid-cell`)**: DOM 풀링 방식으로 재사용되는 행 및 열 구성 요소를 포함

### 1.2. 형태 옵션 (Variants)

* `Zebra Striping` (Standard): CSS `repeating-linear-gradient` 기반으로 별도의 DOM 생성 없이 홀/짝 행에 교차 배경색을 부여하는 가벼운 얼룩무늬 스타일

### 1.3. 크기 옵션 (Sizes)

* `Row Height`: 기본값 `40px` (옵션 설정을 통해 커스텀 높이 조절 가능)
* `Cell Font Size`: 기본값 `13px`

### 1.4. 레이아웃 제어 (Layout Properties)

* `virtual-scroll`: 수직 및 수평 동시 가상화(Virtualization)를 제공하여 대용량 데이터 렌더링 지원
* `will-change`: 스크롤 시 그래픽 레이어 분리를 통한 하드웨어 가속 제어 (`will-change: transform`)

---

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| 슬롯명 (Slot Name) | 설명 (Description) | 비고 (Remarks) |
| --- | --- | --- |
| `cell-icon-slot` | 셀 데이터 타입별 아이콘 영역 (SVG Data URI) | `type-string`, `type-number`, `type-objectId` 대응 |
| `cell-content-slot` | 텍스트 표시 영역 (최대 100자 자름 처리) | `text-overflow: ellipsis` 적용 |

---

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| 속성명 | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| `rawData` | `Array<Object>` | `[]` | 그리드에 표시할 대용량 원본 데이터 배열 |
| `columns` | `Array<ColumnDef>` | `[]` | 컬럼 정의 객체 목록 (`key`, `path`, `width`) |
| `rowHeight` | `number` | `40` | 단일 행의 높이 (px) |
| `vBuffer` | `number` | `5` | 수직 가상화 렌더링 상/하단 행 버퍼 개수 |
| `hBuffer` | `number` | `200` | 수평 가상화 렌더링 좌/우 픽셀 버퍼 크기 |

### 3.2. 상태 (States)

* **Scrolling**: 스크롤 동작 중 상태 (고속 스크롤 시 10px/ms 초과 구간은 렌더링 스킵 처리)
* **Hover**: 이벤트 위임 기반으로 셀 위에 마우스 커서 진입 시 원본 데이터(`dataset.raw`) 툴팁 노출 상태

### 3.3. 이벤트 (Events)

| 이벤트명 | 상세 (Detail) | 발생 시점 |
| --- | --- | --- |
| `scroll` | `{ scrollTop: number, scrollLeft: number }` | 그리드 뷰포트 스크롤 발생 시 (`requestAnimationFrame` 제어) |
| `mouseover` | `{ targetCell: HTMLElement, rawData: string }` | 셀 요소 진입 시 이벤트 위임 방식으로 툴팁(`title`) 연동 |

---

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```css
:host {
  /* Layout & Sizing */
  --row-height: 40px;
  --grid-border-color: #ccc;
  --grid-cell-border-color: #eee;
  --grid-cell-padding-x: 8px;
  --grid-font-size: 13px;

  /* Repeating Linear Gradient Background (Zebra Style) */
  --grid-row-bg-even: #ffffff;
  --grid-row-bg-odd: #f9f9f9;

  /* Data Type Icon Colors */
  --icon-color-string: #4a90e2;
  --icon-color-number: #50e3c2;
  --icon-color-objectid: #f5a623;
}

```

---

## 5. 웹 접근성 및 성능 최적화 (Accessibility & Performance Architecture)

### 5.1. 성능 최적화 기법 (Performance Techniques)

* **Shadow Table**: 원본 데이터 객체를 가공(`detectType`, `formatDisplayString`)하여 접근 속도를 극대화한 그림자 객체 배열 사전 구축
* **DOM Pooling & Slot Tracking**: 뷰포트에 필요한 최소 행 수만큼 DOM 객체 풀(`rowPool`)을 사전 생성하여 `appendChild` / `removeChild` 부하 차단
* **Cumulative Sum & Binary Search**: 수평 가상화 시 컬럼 너비 누적 합을 기반으로 이진 탐색(`binarySearchColumn`) 수행하여 렌더링 대상 컬럼 정밀 계산
* **Hardware Acceleration**: `top`/`left` 오프셋 제어 대신 `translate3d()`를 적극 사용하여 GPU 기반 렌더링 적용 및 Reflow 최소화
* **Speed Detector**: 스크롤 속도가 일정한 프레임 예산(10px/ms)을 초과하는 고속 스크롤 시 렌더링을 일시 스킵하여 프레임 드랍 방지

### 5.2. ARIA 및 접근성 (Accessibility)

* **`pointer-events: none`**: 가상 높이 영역(`grid-phantom`)의 마우스 이벤트 간섭 차단
* **`text-overflow: ellipsis`**: 긴 텍스트를 가진 셀 영역의 문자열 잘림 및 영역 이탈 방지
* **`title` Attribute**: 셀 마우스 호버 시 원본(`dataset.raw`) 전체 값을 마우스 툴팁 형태로 볼 수 있도록 연동
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`DataGrid.ts`)과 전용 Lit 스타일시트(`DataGrid.css.ts`) 코드를 작성해 주세요.

[작성 조건 - DataGrid.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `DataGridTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `DataGridHost` 명칭으로 export 하세요.

[작성 조건 - DataGrid.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const dataGridStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-data-grid-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-data-grid`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/DataGrid/DataGrid.ts`, `src/components/DataGrid/DataGrid.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`DataGrid.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - DataGrid.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `DataGridHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-data-grid')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `DataGridTemplate` 및 `DataGrid.css.ts`의 `dataGridStyles`를 임포트하세요. `DataGridHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = dataGridStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `DataGridTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/DataGrid/DataGrid.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`DataGrid.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - DataGrid.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `DataGridWc` 클래스와 커스텀 엘리먼트 태그명(`biz-data-grid`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/DataGrid/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`DataGridTemplate`), 스타일(`dataGridStyles`), 웹 컴포넌트 클래스(`DataGridWc`), React 래퍼 컴포넌트(`DataGrid`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/DataGrid/DataGrid.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/DataGrid/DataGrid.react.ts`, `src/components/DataGrid/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`DataGrid.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - DataGrid.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `DataGridHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 DataGrid.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/DataGrid/DataGrid.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
