## DataGrid 코드 생성을 위한 순차적 프롬프트 작성 체인
-

## 1단계: 컨텍스트 및 요구사항 전달 프롬프트 (Prompt 1)

````text
[역할 정의]
당신은 DataGrid 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 DataGrid 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[DataGrid 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/DataGrid/GridDataGrid/` 아래에 위치합니다.
2. 표준 파일 구성 (4종):
   - GridDataGrid.ts (코어 Lit 템플릿)
   - GridDataGrid.css.ts (컴포넌트 전용 스타일)
   - GridDataGrid.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - GridDataGrid.stories.ts (Storybook 문서)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `grid-{component-name}` (예: grid-input)
   - CSS Design Token / Custom Properties: `--grid-{component-name}-*` (예: --grid-input-height-md)
   - 루트 CSS 클래스명: `grid-{component-name}`
   - Lit 코어 템플릿 export 명칭: `GridDataGridTemplate`
   - 템플릿 함수 파라미터 host의 인터페이스 export 명칭:`GridDataGridHost` 
   - Lit 스타일 export 변수명: `export const GriddataGridStyles = css`...`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): GridDataGrid
- 커스텀 엘리먼트 태그명 (kebab-case): grid-{component-name}

[요구사항 정의서]
---
# data-grid

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **최상위 컨트롤러 영역**: 전체 그리드의 루트 컨테이너 역할을 수행하며, 가상 스크롤 뷰포트, 헤더, 푸터 툴바 레이아웃을 통제합니다.
- **Header Area**: 컬럼 라벨, 정렬 UI 및 컬럼 리사이저를 포함하는 헤더 영역을 상단에 배치합니다.
- **Viewport & Content Area**: 실제 가상 스크롤이 이루어지는 스크롤 뷰포트 영역 및 Phantom 레이어, DOM Pool 행 컨테이너를 관리합니다.
- **Footer Toolbar Area**: 하단 영역에 상태 및 메타 정보를 노출하는 `<grid-info>` 및 페이지네이션을 처리하는 `<grid-pagination>`을 배치합니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 기본 테두리와 구분선이 포함된 표준 Grid 레이아웃 형태입니다.
- `Bordered`: 외각선 및 셀 간 구분선이 명확히 강조된 형태입니다.
- `Borderless`: 외각 테두리를 제거하여 카드 내부나 모달 내에 자연스럽게 삽입되는 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Small` (`sm`): 컴팩트한 행 높이 및 패딩을 적용하여 단시간에 많은 데이터를 조회하는 밀도 높은 뷰를 제공합니다.
- `Medium` (`md`): 표준 행 높이 및 패딩을 적용하는 기본 형태입니다.
- `Large` (`lg`): 여유 있는 행 높이 및 패딩을 적용하여 터치 환경이나 시독성을 높인 형태입니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `width`: 그리드 전체 너비를 지정합니다 (예: `100%`, `1200px`).
- `height`: 그리드 전체 높이를 지정합니다 (가상 스크롤 구동을 위해 고정 높이 또는 `100vh` 설정 필요).
- `rowHeight`: 가상 스크롤 연산의 기준이 되는 행의 높이(px)를 설정합니다.

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **`<grid-header>`**: 헤더 영역 레이아웃 및 수평 스크롤 동기화를 담당하는 직속 하위 컴포넌트입니다.
- **`<grid-viewport>`**: 실제 스크롤바와 Phantom 레이어, DOM Pool 행을 내장하는 가상 스크롤 뷰포트입니다.
- `<grid-footer>` : 그리드 하단 고정 푸터 레이어
- **`<grid-info>`**: 푸터 영역 내 그리드 데이터 수, 선택 범위, 상태 메타 정보를 표시하는 하위 컴포넌트입니다.
- **`<grid-pagination>`**: 푸터 영역 내 페이지네이션 버튼 및 페이지 크기 선택을 담당하는 하위 컴포넌트입니다.
- **Default Slot**: 별도의 커스텀 툴바나 서브 요소를 그리드 내부에 유동적으로 배치할 수 있도록 지원합니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `data` | `Array<Record<string, any>>` | `[]` | 그리드에 바인딩할 Raw 데이터 배열입니다. |
| `columns` | `Array<ColumnDef>` | `[]` | 컬럼 스키마, 너비, 포맷터, 필터/정렬 옵션 정의 배열입니다. |
| `rowHeight` | `number` | `40` | 행의 기본 높이(px)입니다. |
| `pageSize` | `number` | `50` | 페이지당 노출할 데이터 개수입니다. |
| `currentPage` | `number` | `1` | 현재 활성화된 페이지 번호입니다. |
| `storageKey` | `string` | `""` | 개인화 설정(컬럼 너비, 위치, 숨김 등)을 LocalStorage에 저장할 키 값입니다. |

### 3.2. 상태 (States)

- **Shadow Table (`shadowTable`)**: Raw 데이터를 렌더링 및 인덱싱에 최적화된 내부 데이터 구조로 변환한 상태입니다.
- **Column Offsets (`colOffsets`)**: 이진 탐색 기반의 고속 위치 연산을 위해 계산된 컬럼별 X축 누적 오프셋 배열입니다.
- **Virtual Ranges (`vRange`, `hRange`)**: 현재 스크롤 위치와 속도에 따라 산출된 가시 범위 내의 행/열 인덱스 구간 정보입니다.
- **Sort State (`sortState`)**: 현재 정렬이 적용된 컬럼 키, 방향(ASC/DESC) 및 원본 데이터 복원용 백업 상태입니다.
- **Filter State (`filterState`)**: 조건별(포함, 일치, 범위 등) 데이터 필터링 연산 규칙 및 조건 집합입니다.
- **Dirty Maps (`dirtyMap`)**: 원본 데이터 대비 수정된 셀 및 행 단위의 커밋 전 데이터 매핑 상태입니다.
- **Clipboard Selection (`selectionRange`)**: 복사/붙여넣기 및 일괄 변경을 위한 현재 선택된 셀 범위 영역입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `data-change` | `{ updatedData: Array, dirtyMap: Map }` | 셀 편집 완료, 붙여넣기, 일괄 변경 등으로 데이터 수정이 일어난 시점 |
| `selection-change` | `{ range: SelectionRange }` | 셀 범위 선택 영역이 변경된 시점 |
| `page-change` | `{ page: number, pageSize: number }` | 페이지 번호나 페이지당 보기 수가 변경된 시점 |
| `config-save` | `{ key: string, config: Object }` | 컬럼 너비, 위치 등 개인화 설정이 저장되거나 초기화된 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-data-grid-width: 100%;
  --ui-comp-data-grid-height: 600px;
  --ui-comp-data-grid-bg: #ffffff;
  --ui-comp-data-grid-border-color: #e1e4e8;
  --ui-comp-data-grid-header-bg: #f6f8fa;
  --ui-comp-data-grid-row-height: 40px;
  --ui-comp-data-grid-row-hover-bg: #f1f5f9;
  --ui-comp-data-grid-row-dirty-bg: #fffbe6;
  --ui-comp-data-grid-selection-border: #0969da;
}
```
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 2단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## 2단계: 코어 템플릿 및 스타일 생성 프롬프트 (Prompt 2)

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 DataGrid 컴포넌트의 코어 템플릿(`GridDataGrid.ts`)과 전용 스타일시트(`GridDataGrid.css`) 코드를 작성해 주세요.

[작성 조건 - GridDataGrid.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `GridDataGridTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `GridDataGridHost` 명칭으로 export 하세요.

[작성 조건 - GridDataGrid.css.ts]
1. `:host` 블록 내에 `--grid-{component-name}-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
2. 루트 클래스명은 `grid-{component-name}`으로 지정하세요.
3. 요구사항 정의서 1.2절의 Variants 스타일을 작성하세요.
4. 요구사항 정의서 1.3절의 Sizes 규격 스타일을 작성하세요.
5. 요구사항 정의서 3.2절의 States 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/DataGrid/GridDataGrid/GridDataGrid.ts`, `src/components/GridDataGrid/GridDataGrid.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.

````

---

## 3단계: 웹 컴포넌트 클래스 생성 프롬프트 (Prompt 3)

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/host타입/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`GridDataGrid.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - GridDataGrid.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `GridDataGridHost`를 implements 하여 클래스를 구현하고, `@customElement('grid-{component-name}')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `GridDataGridTemplate`과 `GridDataGridStyles`를 임포트하여 `render()` 메서드 및 `styles` 정적 속성에 연결하세요. `GridDataGridHost`를 type 임포트하세요.
3. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
4. 요구사항 정의서 3.3절의 이벤트를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridDataGrid/GridDataGrid.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(Storybook 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## 4단계: Storybook 생성 프롬프트 (Prompt 4)

````text
[요청 사항]
1~3단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`GridDataGrid.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - GridDataGrid.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `GridDataGridHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 3.2절의 주요 States를 시연하는 Story를 작성하세요.
5. Meta의 title을 `DataGrid/GridDataGrid` 로 지정하시오.
6. 3단계에서 작성한 GridDataGrid.wc.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridDataGrid/GridDataGrid.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정이 성공적으로 종료되었음을 최종 안내해 주세요.

---
````
