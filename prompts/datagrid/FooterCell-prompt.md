## DataGrid 코드 생성을 위한 순차적 프롬프트 작성 체인
-

## 1단계: 컨텍스트 및 요구사항 전달 프롬프트 (Prompt 1)

````text
[역할 정의]
당신은 DataGrid 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 DataGrid 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[DataGrid 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/DataGrid/GridFooterCell/` 아래에 위치합니다.
2. 표준 파일 구성 (4종):
   - GridFooterCell.ts (코어 Lit 템플릿)
   - GridFooterCell.css.ts (컴포넌트 전용 스타일)
   - GridFooterCell.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - GridFooterCell.stories.ts (Storybook 문서)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `grid-{component-name}` (예: grid-input)
   - CSS Design Token / Custom Properties: `--grid-{component-name}-*` (예: --grid-input-height-md)
   - 루트 CSS 클래스명: `grid-{component-name}`
   - Lit 코어 템플릿 export 명칭: `GridFooterCellTemplate`
   - 템플릿 함수 파라미터 host의 인터페이스 export 명칭:`GridFooterCellHost` 
   - Lit 스타일 export 변수명: `export const GridfooterCellStyles = css`...`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): GridFooterCell
- 커스텀 엘리먼트 태그명 (kebab-case): grid-{component-name}

[요구사항 정의서]
---
# grid-footer-cell

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Footer Cell Container**: 푸터 레이아웃 내에서 대응하는 컬럼 위치에 배치되는 단일 집계 셀 컨테이너입니다.
- **Aggregate Label Area**: 집계 유형(SUM, AVG, MIN, MAX, COUNT 등)을 식별하는 라벨 노출 영역입니다.
- **Aggregate Value Area**: 포맷팅 처리된 집계 연산 결과 수치 텍스트를 노출하는 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 표준 집계 셀 형태입니다.
- `Positive`: 집계 수치가 양수이거나 긍정적 지표일 때 강조 스타일이 적용된 형태입니다.
- `Negative`: 집계 수치가 음수이거나 경고 지표일 때 강조 스타일이 적용된 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Standard`: 상위 `<grid-footer>`의 높이 및 컬럼 정의 너비 규격에 자동 맞춤 처리됩니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `width`: 해당 컬럼의 고정/가변 너비(px)에 맞춰 동적으로 제어됩니다.
- `align`: 컬럼 정의의 데이터 타입 및 정렬 설정에 따라 내부 요소 정렬 방식을 제어합니다 (`left`, `center`, `right`).

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **Default Slot**: 기본 포맷팅 수치 외에 사용자 정의 커스텀 요약 컴포넌트나 복합 집계 표식을 삽입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `columnKey` | `string` | `""` | 집계 셀이 속한 컬럼의 고유 식별자입니다. |
| `aggregateFunc` | `string` | `""` | 적용된 집계 함수 유형입니다 (`sum`, `avg`, `min`, `max`, `count` 등). |
| `value` | `any` | `null` | 연산 완료된 집계 원본 수치/데이터 값입니다. |
| `formatter` | `Function` | `null` | 수치 데이터를 특정 포맷(통화, 천단위 콤마, 퍼센트 등)으로 변환하는 함수입니다. |
| `align` | `string` | `'left'` | 텍스트 정렬 방식입니다 (`left`, `center`, `right`). |

### 3.2. 상태 (States)

- **Formatted Display Value**: `aggregateFunc` 및 `formatter` 조합에 따라 시각화 준비가 완료된 최종 텍스트 상태입니다.
- **Truncated / Ellipsis State**: 셀 공간 부족으로 내용이 잘릴 경우 호버 시 전체 집계 결과 수치 및 라벨 설명을 `title` 속성 또는 툴팁으로 노출하는 상태입니다.
- **Value Condition State**: 연산 수치의 양수, 음수, Zero 또는 설정된 임계치 조건 부합 여부에 따른 시각적 강조 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `footer-cell-click` | `{ columnKey: string, aggregateFunc: string, value: any }` | 집계 셀 클릭 시 발생 |
| `footer-cell-dblclick` | `{ columnKey: string, aggregateFunc: string, value: any }` | 집계 셀 더블클릭 시 발생 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-footer-cell-bg: #f6f8fa;
  --ui-comp-grid-footer-cell-padding: 0 8px;
  --ui-comp-grid-footer-cell-color: #24292f;
  --ui-comp-grid-footer-cell-border-right: 1px solid #d0d7de;
  --ui-comp-grid-footer-cell-positive-color: #1a7f37;
  --ui-comp-grid-footer-cell-negative-color: #cf222e;
  --ui-comp-grid-footer-cell-font-weight: 600;
}
```
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 2단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## 2단계: 코어 템플릿 및 스타일 생성 프롬프트 (Prompt 2)

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 DataGrid 컴포넌트의 코어 템플릿(`GridFooterCell.ts`)과 전용 스타일시트(`GridFooterCell.css`) 코드를 작성해 주세요.

[작성 조건 - GridFooterCell.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `GridFooterCellTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `GridFooterCellHost` 명칭으로 export 하세요.

[작성 조건 - GridFooterCell.css.ts]
1. `:host` 블록 내에 `--grid-{component-name}-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
2. 루트 클래스명은 `grid-{component-name}`으로 지정하세요.
3. 요구사항 정의서 1.2절의 Variants 스타일을 작성하세요.
4. 요구사항 정의서 1.3절의 Sizes 규격 스타일을 작성하세요.
5. 요구사항 정의서 3.2절의 States 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/DataGrid/GridFooterCell/GridFooterCell.ts`, `src/components/GridFooterCell/GridFooterCell.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.

````

---

## 3단계: 웹 컴포넌트 클래스 생성 프롬프트 (Prompt 3)

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/host타입/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`GridFooterCell.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - GridFooterCell.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `GridFooterCellHost`를 implements 하여 클래스를 구현하고, `@customElement('grid-{component-name}')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `GridFooterCellTemplate`과 `GridFooterCellStyles`를 임포트하여 `render()` 메서드 및 `styles` 정적 속성에 연결하세요. `GridFooterCellHost`를 type 임포트하세요.
3. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
4. 요구사항 정의서 3.3절의 이벤트를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridFooterCell/GridFooterCell.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(Storybook 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## 4단계: Storybook 생성 프롬프트 (Prompt 4)

````text
[요청 사항]
1~3단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`GridFooterCell.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - GridFooterCell.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `GridFooterCellHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 3.2절의 주요 States를 시연하는 Story를 작성하세요.
5. Meta의 title을 `DataGrid/GridFooterCell` 로 지정하시오.
6. 3단계에서 작성한 GridFooterCell.wc.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridFooterCell/GridFooterCell.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정이 성공적으로 종료되었음을 최종 안내해 주세요.

---
````
