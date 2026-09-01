## DataGrid 코드 생성을 위한 순차적 프롬프트 작성 체인
-

## 1단계: 컨텍스트 및 요구사항 전달 프롬프트 (Prompt 1)

````text
[역할 정의]
당신은 DataGrid 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 DataGrid 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[DataGrid 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/DataGrid/GridViewport/` 아래에 위치합니다.
2. 표준 파일 구성 (4종):
   - GridViewport.ts (코어 Lit 템플릿)
   - GridViewport.css.ts (컴포넌트 전용 스타일)
   - GridViewport.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - GridViewport.stories.ts (Storybook 문서)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `grid-{component-name}` (예: grid-input)
   - CSS Design Token / Custom Properties: `--grid-{component-name}-*` (예: --grid-input-height-md)
   - 루트 CSS 클래스명: `grid-{component-name}`
   - Lit 코어 템플릿 export 명칭: `GridViewportTemplate`
   - 템플릿 함수 파라미터 host의 인터페이스 export 명칭:`GridViewportHost` 
   - Lit 스타일 export 변수명: `export const GridviewportStyles = css`...`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): GridViewport
- 커스텀 엘리먼트 태그명 (kebab-case): grid-{component-name}

[요구사항 정의서]
---
# grid-viewport

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Viewport Container**: 실제 브라우저 스크롤바가 생성되는 최외각 뷰포트 영역입니다. `overflow: auto` 속성을 가져 수평/수직 스크롤을 직접 수용합니다.
- **Phantom Layer (`<div class="grid-phantom">`)**: 가상 스크롤 구현을 위해 전체 데이터 행 수와 컬럼 너비 합에 해당하는 실제 높이/너비를 강제로 점유하는 투명 dummy 레이어입니다.
- **Content Canvas (`<div class="grid-content">`)**: DOM Pooling 처리된 실제 `<grid-row>` 인스턴스들이 활성화되어 배치되는 실체 렌더링 컨테이너 레이어입니다.
- **Selection Overlay Layer**: 마우스 드래그를 통한 다중 셀 범위 선택 시 활성화 영역을 시각적으로 하이라이트 표현하는 오버레이 레이어입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 기본 스크롤바 및 표준 배경이 적용된 형태입니다.
- `Zebra Striped`: 홀수/짝수 행에 교차 배경색이 적용되어 시독성을 높인 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Fit Parent`: 상위 `<data-grid>` 높이에 `100%`로 맞추어 늘어나는 기본 형태입니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `phantomWidth`: 전체 컬럼 너비 합산 값(px)으로 핀톰 레이어의 너비를 결정합니다.
- `phantomHeight`: (전체 데이터 건수 × 행 높이) 연산으로 결정되는 핀톰 레이어의 전체 높이(px)입니다.
- `rowHeight`: CSS Variable(`-ui-comp-grid-viewport-row-height`) 형태로 하위 요소에 전달되는 단일 행 높이 규격입니다.

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **`<grid-row>`**: 가시 범위(vRange) 연산 결과에 따라 DOM Pool에서 재사용되어 Content Canvas 내에 배치되는 행 컴포넌트입니다.
- **Default Slot**: 가상화 렌더링 대상 행 배열 외 오버레이 레이어나 커스텀 뷰포트 요소를 수용하는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `phantomWidth` | `number` | `0` | Phantom 레이어에 적용할 전체 수평 너비(px)입니다. |
| `phantomHeight` | `number` | `0` | Phantom 레이어에 적용할 전체 수직 높이(px)입니다. |
| `rowHeight` | `number` | `40` | 개별 행의 기본 높이(px)입니다. |
| `striped` | `boolean` | `false` | 지브라 패턴 배경 적용 여부입니다. |

### 3.2. 상태 (States)

- **Scroll Position (`scrollTop`, `scrollLeft`)**: 현재 뷰포트의 Y축 및 X축 스크롤 오프셋 상태입니다.
- **Selection Box (`selectionRange`)**: 드래그 인터랙션으로 지정된 범위 선택 영역의 Top, Left, Width, Height 좌표 상태입니다.
- **Is Dragging**: 범위 선택을 위한 마우스 Dragging 동작 진행 여부 플래그입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `grid-scroll` | `{ scrollTop: number, scrollLeft: number }` | 뷰포트 스크롤 발생 시 상위 `<data-grid>`로 스크롤 위치를 전달하는 시점 |
| `selection-start` | `{ startRowIndex: number, startColIndex: number }` | 뷰포트 내부에서 셀 범위 선택 드래그 동작이 시작된 시점 |
| `selection-change` | `{ range: SelectionRange }` | 마우스 드래그 이동에 따라 셀 선택 영역 박스가 변경되는 시점 |
| `selection-end` | `{ range: SelectionRange }` | 범위 선택 드래그 동작이 종료된 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-viewport-bg: #ffffff;
  --ui-comp-grid-viewport-row-height: 40px;
  --ui-comp-grid-viewport-zebra-bg: #f9fafb;
  --ui-comp-grid-viewport-selection-bg: rgba(9, 105, 218, 0.12);
  --ui-comp-grid-viewport-selection-border: #0969da;
  --ui-comp-grid-viewport-scrollbar-thumb: #d0d7de;
}
```
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 2단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## 2단계: 코어 템플릿 및 스타일 생성 프롬프트 (Prompt 2)

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 DataGrid 컴포넌트의 코어 템플릿(`GridViewport.ts`)과 전용 스타일시트(`GridViewport.css`) 코드를 작성해 주세요.

[작성 조건 - GridViewport.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `GridViewportTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `GridViewportHost` 명칭으로 export 하세요.

[작성 조건 - GridViewport.css.ts]
1. `:host` 블록 내에 `--grid-{component-name}-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
2. 루트 클래스명은 `grid-{component-name}`으로 지정하세요.
3. 요구사항 정의서 1.2절의 Variants 스타일을 작성하세요.
4. 요구사항 정의서 1.3절의 Sizes 규격 스타일을 작성하세요.
5. 요구사항 정의서 3.2절의 States 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/DataGrid/GridViewport/GridViewport.ts`, `src/components/GridViewport/GridViewport.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.

````

---

## 3단계: 웹 컴포넌트 클래스 생성 프롬프트 (Prompt 3)

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/host타입/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`GridViewport.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - GridViewport.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `GridViewportHost`를 implements 하여 클래스를 구현하고, `@customElement('grid-{component-name}')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `GridViewportTemplate`과 `GridViewportStyles`를 임포트하여 `render()` 메서드 및 `styles` 정적 속성에 연결하세요. `GridViewportHost`를 type 임포트하세요.
3. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
4. 요구사항 정의서 3.3절의 이벤트를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridViewport/GridViewport.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(Storybook 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## 4단계: Storybook 생성 프롬프트 (Prompt 4)

````text
[요청 사항]
1~3단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`GridViewport.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - GridViewport.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `GridViewportHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 3.2절의 주요 States를 시연하는 Story를 작성하세요.
5. Meta의 title을 `DataGrid/GridViewport` 로 지정하시오.
6. 3단계에서 작성한 GridViewport.wc.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridViewport/GridViewport.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정이 성공적으로 종료되었음을 최종 안내해 주세요.

---
````
