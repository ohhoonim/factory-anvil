## DataGrid 코드 생성을 위한 순차적 프롬프트 작성 체인
-

## 1단계: 컨텍스트 및 요구사항 전달 프롬프트 (Prompt 1)

````text
[역할 정의]
당신은 DataGrid 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 DataGrid 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[DataGrid 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/DataGrid/GridFooter/` 아래에 위치합니다.
2. 표준 파일 구성 (4종):
   - GridFooter.ts (코어 Lit 템플릿)
   - GridFooter.css.ts (컴포넌트 전용 스타일)
   - GridFooter.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - GridFooter.stories.ts (Storybook 문서)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `grid-{component-name}` (예: grid-input)
   - CSS Design Token / Custom Properties: `--grid-{component-name}-*` (예: --grid-input-height-md)
   - 루트 CSS 클래스명: `grid-{component-name}`
   - Lit 코어 템플릿 export 명칭: `GridFooterTemplate`
   - 템플릿 함수 파라미터 host의 인터페이스 export 명칭:`GridFooterHost` 
   - Lit 스타일 export 변수명: `export const GridfooterStyles = css`...`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): GridFooter
- 커스텀 엘리먼트 태그명 (kebab-case): grid-{component-name}

[요구사항 정의서]
---
# grid-footer

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Footer Container**: 그리드 최하단에 위치하는 전체 푸터 영역으로, 수직 스크롤 시에도 하단에 고정(Sticky)되는 최외각 레이어입니다.
- **Aggregation Row Container**: 컬럼 정의에 대응하는 푸터 셀들을 포함하며, 뷰포트 수평 스크롤 오프셋과 동기화되어 이동하는 수평 트랜스폼 레이어입니다.
- **Meta Summary Bar**: 전체 데이터 건수, 필터링된 행 수, 현재 선택된 행 수 등 그리드 전반의 상태 요약 정보를 표현하는 가로 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 요약 통계 바와 집계 행이 모두 포함된 표준 푸터 형태입니다.
- `Compact`: 메타 정보 바를 생략하고 집계 행만 노출하는 경량 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Small` (`sm`): 높이 32px 규격의 컴팩트 푸터 레이아웃입니다.
- `Medium` (`md`): 높이 40px 규격의 표준 푸터 레이아웃입니다.
- `Large` (`lg`): 높이 48px 규격의 확장 푸터 레이아웃입니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `totalWidth`: 전체 컬럼 너비의 합산 값(px)으로, 트랜스폼 레이어의 전체 수평 너비를 결정합니다.
- `scrollLeft`: 상위 `<data-grid>` 또는 `<grid-viewport>`로부터 전달받는 수평 스크롤 오프셋(px)입니다.

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **`<grid-footer-cell>`**: 개별 컬럼별 집계 수치 및 집계 라벨을 노출하는 하위 셀 컴포넌트입니다.
- **Summary Bar Slot**: 메타 정보 영역에 사용자 정의 버튼이나 페이지네이션 등 추가 컨트롤을 주입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `columns` | `Array<ColumnDef>` | `[]` | 집계 함수 정의(`aggregateFunc`)가 포함된 컬럼 스키마 정보 배열입니다. |
| `summaryData` | `Record<string, any>` | `{}` | 컬럼별 연산 집계 결과 데이터 객체입니다. |
| `totalCount` | `number` | `0` | 그리드 전체 레코드 건수입니다. |
| `filteredCount` | `number` | `0` | 필터링 조건이 적용된 레코드 건수입니다. |
| `selectedCount` | `number` | `0` | 현재 사용자에 의해 선택된 레코드 건수입니다. |
| `scrollLeft` | `number` | `0` | 뷰포트 수평 스크롤 위치(px)입니다. |

### 3.2. 상태 (States)

- **Transform State (`translateX`)**: `scrollLeft` 수신에 따라 `translate3d(-scrollLeft, 0, 0)` 형태로 적용되는 수평 동기화 트랜스폼 상태입니다.
- **Aggregation Calculation State**: 데이터 변경 또는 필터 적용 시 `sum`, `avg`, `min`, `max`, `count` 등의 연산이 완료되어 반영된 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `footer-cell-click` | `{ columnKey: string, aggregateFunc: string, value: any }` | 푸터의 특정 집계 셀 클릭 시 발생 |
| `summary-bar-click` | `{ totalCount: number, selectedCount: number }` | 메타 요약 정보 영역 클릭 시 발생 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-footer-bg: #f6f8fa;
  --ui-comp-grid-footer-border-top: 1px solid #d0d7de;
  --ui-comp-grid-footer-height: 40px;
  --ui-comp-grid-footer-text-color: #24292f;
  --ui-comp-grid-footer-font-size: 13px;
  --ui-comp-grid-footer-font-weight: 600;
  --ui-comp-grid-footer-summary-bg: #ffffff;
}
```
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 2단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## 2단계: 코어 템플릿 및 스타일 생성 프롬프트 (Prompt 2)

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 DataGrid 컴포넌트의 코어 템플릿(`GridFooter.ts`)과 전용 스타일시트(`GridFooter.css`) 코드를 작성해 주세요.

[작성 조건 - GridFooter.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `GridFooterTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `GridFooterHost` 명칭으로 export 하세요.

[작성 조건 - GridFooter.css.ts]
1. `:host` 블록 내에 `--grid-{component-name}-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
2. 루트 클래스명은 `grid-{component-name}`으로 지정하세요.
3. 요구사항 정의서 1.2절의 Variants 스타일을 작성하세요.
4. 요구사항 정의서 1.3절의 Sizes 규격 스타일을 작성하세요.
5. 요구사항 정의서 3.2절의 States 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/DataGrid/GridFooter/GridFooter.ts`, `src/components/GridFooter/GridFooter.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.

````

---

## 3단계: 웹 컴포넌트 클래스 생성 프롬프트 (Prompt 3)

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/host타입/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`GridFooter.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - GridFooter.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `GridFooterHost`를 implements 하여 클래스를 구현하고, `@customElement('grid-{component-name}')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `GridFooterTemplate`과 `GridFooterStyles`를 임포트하여 `render()` 메서드 및 `styles` 정적 속성에 연결하세요. `GridFooterHost`를 type 임포트하세요.
3. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
4. 요구사항 정의서 3.3절의 이벤트를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridFooter/GridFooter.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(Storybook 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## 4단계: Storybook 생성 프롬프트 (Prompt 4)

````text
[요청 사항]
1~3단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`GridFooter.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - GridFooter.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `GridFooterHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 3.2절의 주요 States를 시연하는 Story를 작성하세요.
5. Meta의 title을 `DataGrid/GridFooter` 로 지정하시오.
6. 3단계에서 작성한 GridFooter.wc.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridFooter/GridFooter.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정이 성공적으로 종료되었음을 최종 안내해 주세요.

---
````
