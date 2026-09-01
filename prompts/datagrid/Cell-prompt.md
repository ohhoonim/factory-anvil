## DataGrid 코드 생성을 위한 순차적 프롬프트 작성 체인
-

## 1단계: 컨텍스트 및 요구사항 전달 프롬프트 (Prompt 1)

````text
[역할 정의]
당신은 DataGrid 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 DataGrid 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[DataGrid 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/DataGrid/GridCell/` 아래에 위치합니다.
2. 표준 파일 구성 (4종):
   - GridCell.ts (코어 Lit 템플릿)
   - GridCell.css.ts (컴포넌트 전용 스타일)
   - GridCell.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - GridCell.stories.ts (Storybook 문서)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `grid-{component-name}` (예: grid-input)
   - CSS Design Token / Custom Properties: `--grid-{component-name}-*` (예: --grid-input-height-md)
   - 루트 CSS 클래스명: `grid-{component-name}`
   - Lit 코어 템플릿 export 명칭: `GridCellTemplate`
   - 템플릿 함수 파라미터 host의 인터페이스 export 명칭:`GridCellHost` 
   - Lit 스타일 export 변수명: `export const GridcellStyles = css`...`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): GridCell
- 커스텀 엘리먼트 태그명 (kebab-case): grid-{component-name}

[요구사항 정의서]
---
# grid-cell

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Cell Container**: 단일 데이터 셀을 구성하는 컨테이너로, X축 컬럼 오프셋 및 너비에 맞춰 배치됩니다.
- **Type Icon Area**: 데이터 타입(string, number, objectId 등)을 식별할 수 있는 SVG 아이콘 영역입니다.
- **Display Text Area**: 포맷팅된 데이터 텍스트(`displayStr`)를 노출하는 영역입니다.
- **Dirty Indicator**: 원본 데이터 대비 셀 값이 수정되었음을 나타내는 시각적 인디케이터 표식 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 표준 데이터 셀 형태입니다.
- `Dirty`: 원본 값 대비 셀 값이 변경되어 강조 배경색 및 변경 표시 인디케이터가 적용된 형태입니다.
- `Selected`: Shift+클릭 또는 드래그 기반 다중 셀 선택 하이라이팅 스타일이 적용된 형태입니다.
- `Editing`: 인라인 편집 상태로 전환되어 내부 렌더링 컨텐츠가 편집 모드로 교체된 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Standard`: 상위 `<grid-row>`의 행 높이 및 컬럼 정의 너비 규격에 자동 맞춤 처리됩니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `width`: 해당 컬럼의 고정/가변 너비(px)에 맞춰 제어됩니다.
- `align`: 컬럼 정의의 데이터 타입 및 설정에 따라 내부 요소 정렬 방식을 제어합니다 (`left`, `center`, `right`).

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **`<grid-editor>`**: `editable: true` 조건에서 더블클릭 발생 시 셀 내부 또는 위 레이어에 마운트되는 인라인 편집 서브 컴포넌트입니다.
- **Default Slot**: 커스텀 셀 포맷터 및 컴포넌트를 셀 내부에 삽입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `columnKey` | `string` | `""` | 셀이 속한 컬럼의 고유 식별자입니다. |
| `rowIndex` | `number` | `-1` | 셀이 속한 행의 인덱스 번호입니다. |
| `rawValue` | `any` | `null` | 포맷팅 전 원본 데이터 값입니다 (`dataset.raw` 및 툴팁 노출 기준). |
| `displayValue` | `string` | `""` | 포맷터가 적용되어 실제 화면에 노출되는 텍스트입니다. |
| `dataType` | `string` | `'string'` | 데이터 타입입니다 (`string`, `number`, `objectId`, `date` 등). |
| `editable` | `boolean` | `false` | 셀 인라인 편집 허용 여부입니다. |
| `isDirty` | `boolean` | `false` | 원본 값 대비 셀 변경 여부를 나타내는 플래그입니다. |
| `isSelected` | `boolean` | `false` | 범위 선택 영역 포함 여부입니다. |

### 3.2. 상태 (States)

- **Hover State (Tooltip)**: 마우스 오버 시 `dataset.raw` 원본 값을 `title` 속성 또는 툴팁 요소로 노출하는 상태입니다.
- **Editing State**: 셀 더블클릭 시 편집 모드로 전환되어 입력 컨트롤 또는 `<grid-editor>`가 활성화된 상태입니다.
- **Clipboard Selection State**: 범위 선택 하이라이팅 및 `Ctrl+C` / `Ctrl+V` 이벤트 처리가 가능한 영역 포커스 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `cell-edit-start` | `{ rowIndex: number, columnKey: string, rawValue: any }` | `editable: true` 셀 더블클릭 발생으로 편집 모드 전환을 요청하는 시점 |
| `cell-commit` | `{ rowIndex: number, columnKey: string, newValue: any, oldValue: any }` | Enter 키 입력 또는 Blur 발생으로 편집 값이 검증 및 반영되는 시점 |
| `cell-cancel` | `{ rowIndex: number, columnKey: string }` | Escape 키 입력으로 셀 편집이 취소되는 시점 |
| `cell-copy` | `{ rowIndex: number, columnKey: string, value: any }` | 셀 선택 상태에서 `Ctrl+C` 클립보드 복사 이벤트가 수신된 시점 |
| `cell-paste` | `{ rowIndex: number, columnKey: string, pasteData: string }` | 셀 선택 상태에서 `Ctrl+V` 클립보드 붙여넣기 이벤트가 수신된 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-cell-bg: #ffffff;
  --ui-comp-grid-cell-padding: 0 8px;
  --ui-comp-grid-cell-color: #24292f;
  --ui-comp-grid-cell-border-right: 1px solid #e1e4e8;
  --ui-comp-grid-cell-dirty-bg: #fffbe6;
  --ui-comp-grid-cell-dirty-indicator-color: #d97706;
  --ui-comp-grid-cell-selected-bg: rgba(9, 105, 218, 0.12);
  --ui-comp-grid-cell-selected-border: #0969da;
}
```
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 2단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## 2단계: 코어 템플릿 및 스타일 생성 프롬프트 (Prompt 2)

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 DataGrid 컴포넌트의 코어 템플릿(`GridCell.ts`)과 전용 스타일시트(`GridCell.css`) 코드를 작성해 주세요.

[작성 조건 - GridCell.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `GridCellTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `GridCellHost` 명칭으로 export 하세요.

[작성 조건 - GridCell.css.ts]
1. `:host` 블록 내에 `--grid-{component-name}-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
2. 루트 클래스명은 `grid-{component-name}`으로 지정하세요.
3. 요구사항 정의서 1.2절의 Variants 스타일을 작성하세요.
4. 요구사항 정의서 1.3절의 Sizes 규격 스타일을 작성하세요.
5. 요구사항 정의서 3.2절의 States 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/DataGrid/GridCell/GridCell.ts`, `src/components/GridCell/GridCell.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.

````

---

## 3단계: 웹 컴포넌트 클래스 생성 프롬프트 (Prompt 3)

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/host타입/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`GridCell.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - GridCell.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `GridCellHost`를 implements 하여 클래스를 구현하고, `@customElement('grid-{component-name}')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `GridCellTemplate`과 `GridCellStyles`를 임포트하여 `render()` 메서드 및 `styles` 정적 속성에 연결하세요. `GridCellHost`를 type 임포트하세요.
3. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
4. 요구사항 정의서 3.3절의 이벤트를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridCell/GridCell.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(Storybook 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## 4단계: Storybook 생성 프롬프트 (Prompt 4)

````text
[요청 사항]
1~3단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`GridCell.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - GridCell.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `GridCellHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 3.2절의 주요 States를 시연하는 Story를 작성하세요.
5. Meta의 title을 `DataGrid/GridCell` 로 지정하시오.
6. 3단계에서 작성한 GridCell.wc.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridCell/GridCell.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정이 성공적으로 종료되었음을 최종 안내해 주세요.

---
````
