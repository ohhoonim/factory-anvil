## DataGrid 코드 생성을 위한 순차적 프롬프트 작성 체인
-

## 1단계: 컨텍스트 및 요구사항 전달 프롬프트 (Prompt 1)

````text
[역할 정의]
당신은 DataGrid 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 DataGrid 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[DataGrid 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/DataGrid/GridHeaderCell/` 아래에 위치합니다.
2. 표준 파일 구성 (4종):
   - GridHeaderCell.ts (코어 Lit 템플릿)
   - GridHeaderCell.css.ts (컴포넌트 전용 스타일)
   - GridHeaderCell.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - GridHeaderCell.stories.ts (Storybook 문서)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `grid-{component-name}` (예: grid-input)
   - CSS Design Token / Custom Properties: `--grid-{component-name}-*` (예: --grid-input-height-md)
   - 루트 CSS 클래스명: `grid-{component-name}`
   - Lit 코어 템플릿 export 명칭: `GridHeaderCellTemplate`
   - 템플릿 함수 파라미터 host의 인터페이스 export 명칭:`GridHeaderCellHost` 
   - Lit 스타일 export 변수명: `export const GridheaderCellStyles = css`...`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): GridHeaderCell
- 커스텀 엘리먼트 태그명 (kebab-case): grid-{component-name}

[요구사항 정의서]
---
# grid-header-cell

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Cell Container**: 개별 컬럼 헤더 영역의 최외각 컨테이너로, 텍스트 및 각종 컨트롤 요소를 포함합니다.
- **Title Label**: 컬럼명을 노출하는 텍스트 영역입니다.
- **Sort Indicator**: 정렬 방향 상태(▲ / ▼)를 시각적으로 노출하는 아이콘 영역입니다.
- **Filter Trigger**: 컬럼별 필터 드롭다운 UI를 호출하는 버튼/아이콘 영역입니다.
- **Drag Handle**: 컬럼 순서 변경(Reordering)을 위해 드래그 동작을 감지하는 인터랙션 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 라벨, 정렬, 필터 아이콘이 기본 배치된 헤더 셀 형태입니다.
- `Sortable`: 정렬 기능이 활성화되어 마우스 호버 및 클릭 상호작용이 가능한 형태입니다.
- `Filtered`: 필터 조건이 활성화되어 필터 아이콘 강조 색상이 적용된 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Small` (`sm`): 높이 32px 헤더 규격에 맞춘 패딩 및 폰트 크기입니다.
- `Medium` (`md`): 높이 40px 헤더 규격의 표준 형태입니다.
- `Large` (`lg`): 높이 48px 헤더 규격에 맞춘 여유 있는 레이아웃 형태입니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `width`: 해당 컬럼의 너비(px)를 지정하며 상위 오프셋 상태와 연동됩니다.
- `align`: 헤더 셀 내부 텍스트 및 정렬 아이콘의 정렬 방식을 제어합니다 (`left`, `center`, `right`).

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **`<grid-column-resizer>`**: 컬럼 좌우 폭을 조절하기 위해 헤더 셀 우측 경계에 배치되는 하위 컴포넌트입니다.
- **Title Slot**: 컬럼 제목 영역에 단순 텍스트 외 커스텀 HTML/컴포넌트를 전달할 수 있는 슬롯입니다.
- **Filter Slot**: 커스텀 필터 UI 드롭다운을 삽입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `columnKey` | `string` | `""` | 개별 컬럼을 식별하는 고유 키 값입니다. |
| `label` | `string` | `""` | 헤더 셀에 표시될 라벨 텍스트입니다. |
| `sortable` | `boolean` | `true` | 클릭을 통한 정렬 기능 활성화 여부입니다. |
| `sortDirection` | `'ASC' | 'DESC' | null` | `null` | 현재 적용된 정렬 방향 상태입니다. |
| `filterable` | `boolean` | `false` | 필터 UI 아이콘 노출 및 필터 기능 활성화 여부입니다. |
| `isFiltered` | `boolean` | `false` | 현재 컬럼에 필터 조건이 적용되었는지 나타내는 플래그입니다. |
| `reorderable` | `boolean` | `true` | 드래그 앤 드롭을 통한 컬럼 순서 변경 활성화 여부입니다. |

### 3.2. 상태 (States)

- **Sort State (`ASC` / `DESC` / `Cancel`)**: 정렬 3단계 순환 처리 상태입니다.
- **Hover State**: 마우스 호버 시 `sortable` 속성 존재 여부에 따른 커서 스타일 및 배경색 하이라이팅 상태입니다.
- **Dragging State**: 컬럼 이동을 위해 드래그 동작이 시작 및 진행 중인 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `header-cell-click` | `{ columnKey: string, sortDirection: 'ASC' | 'DESC' | null }` | `sortable` 상태의 헤더 셀 클릭 시 정렬 방향이 순환 변경되는 시점 |
| `filter-trigger-click` | `{ columnKey: string, anchorEl: HTMLElement }` | 필터 아이콘 클릭으로 필터 드롭다운 UI 제어가 요청된 시점 |
| `column-drag-start` | `{ columnKey: string, clientX: number }` | 컬럼 순서 변경 드래그 핸들링 동작이 시작된 시점 |
| `column-drag-over` | `{ targetColumnKey: string, position: 'before' | 'after' }` | 드래그 중 다른 헤더 셀 영역 위로 진입한 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-header-cell-bg: #f6f8fa;
  --ui-comp-grid-header-cell-hover-bg: #eaeef2;
  --ui-comp-grid-header-cell-padding: 0 12px;
  --ui-comp-grid-header-cell-color: #24292f;
  --ui-comp-grid-header-cell-border-right: 1px solid #d0d7de;
  --ui-comp-grid-header-cell-cursor: pointer;
  --ui-comp-grid-header-cell-icon-active-color: #0969da;
}
```
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 2단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## 2단계: 코어 템플릿 및 스타일 생성 프롬프트 (Prompt 2)

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 DataGrid 컴포넌트의 코어 템플릿(`GridHeaderCell.ts`)과 전용 스타일시트(`GridHeaderCell.css`) 코드를 작성해 주세요.

[작성 조건 - GridHeaderCell.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `GridHeaderCellTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `GridHeaderCellHost` 명칭으로 export 하세요.

[작성 조건 - GridHeaderCell.css.ts]
1. `:host` 블록 내에 `--grid-{component-name}-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
2. 루트 클래스명은 `grid-{component-name}`으로 지정하세요.
3. 요구사항 정의서 1.2절의 Variants 스타일을 작성하세요.
4. 요구사항 정의서 1.3절의 Sizes 규격 스타일을 작성하세요.
5. 요구사항 정의서 3.2절의 States 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/DataGrid/GridHeaderCell/GridHeaderCell.ts`, `src/components/GridHeaderCell/GridHeaderCell.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.

````

---

## 3단계: 웹 컴포넌트 클래스 생성 프롬프트 (Prompt 3)

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/host타입/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`GridHeaderCell.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - GridHeaderCell.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `GridHeaderCellHost`를 implements 하여 클래스를 구현하고, `@customElement('grid-{component-name}')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `GridHeaderCellTemplate`과 `GridHeaderCellStyles`를 임포트하여 `render()` 메서드 및 `styles` 정적 속성에 연결하세요. `GridHeaderCellHost`를 type 임포트하세요.
3. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
4. 요구사항 정의서 3.3절의 이벤트를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridHeaderCell/GridHeaderCell.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(Storybook 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## 4단계: Storybook 생성 프롬프트 (Prompt 4)

````text
[요청 사항]
1~3단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`GridHeaderCell.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - GridHeaderCell.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `GridHeaderCellHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 3.2절의 주요 States를 시연하는 Story를 작성하세요.
5. Meta의 title을 `DataGrid/GridHeaderCell` 로 지정하시오.
6. 3단계에서 작성한 GridHeaderCell.wc.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridHeaderCell/GridHeaderCell.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정이 성공적으로 종료되었음을 최종 안내해 주세요.

---
````
