## DataGrid 코드 생성을 위한 순차적 프롬프트 작성 체인
-

## 1단계: 컨텍스트 및 요구사항 전달 프롬프트 (Prompt 1)

````text
[역할 정의]
당신은 DataGrid 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 DataGrid 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[DataGrid 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/DataGrid/GridPagination/` 아래에 위치합니다.
2. 표준 파일 구성 (4종):
   - GridPagination.ts (코어 Lit 템플릿)
   - GridPagination.css.ts (컴포넌트 전용 스타일)
   - GridPagination.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - GridPagination.stories.ts (Storybook 문서)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `grid-{component-name}` (예: grid-input)
   - CSS Design Token / Custom Properties: `--grid-{component-name}-*` (예: --grid-input-height-md)
   - 루트 CSS 클래스명: `grid-{component-name}`
   - Lit 코어 템플릿 export 명칭: `GridPaginationTemplate`
   - 템플릿 함수 파라미터 host의 인터페이스 export 명칭:`GridPaginationHost` 
   - Lit 스타일 export 변수명: `export const GridpaginationStyles = css`...`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): GridPagination
- 커스텀 엘리먼트 태그명 (kebab-case): grid-{component-name}

[요구사항 정의서]
---
# grid-pagination

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Page Size Selector**: 한 페이지에 노출할 레코드 수(10, 20, 50, 100개 등)를 변경할 수 있는 Dropdown 폼 컨트롤 영역입니다.
- **Page Information Display**: 현재 페이지 범위 및 전체 데이터 건수(예: `1-50 of 1,250 items`)를 시각적으로 보여주는 메타 텍스트 영역입니다.
- **Navigation Button Group**: 처음(`<<`), 이전(`<`), 다음(`>`), 끝(`>>`) 페이지로 이동을 제어하는 아이콘 버튼 그룹입니다.
- **Page List Group**: 현재 위치한 페이지 번호 주변의 페이지 번호 버튼 목록 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 페이지 이동 버튼과 페이지 크기 변경 드롭다운이 모두 포함된 표준 페이징 형태입니다.
- `Compact`: 공간이 협소한 환경에서 번호 버튼 목록을 생략하고 이전/다음 버튼과 현재 페이지 정보만 단순 표현하는 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Small` (`sm`): 높이 28px 규격의 소형 컨트롤 레이아웃입니다.
- `Medium` (`md`): 높이 36px 규격의 표준 컨트롤 레이아웃입니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `width`: 상위 컨테이너 또는 그리드 전체 폭(`100%`)에 맞추어 유연하게 배치됩니다.
- `align`: 내부 컨트롤 요소들의 수평 정렬을 제어합니다 (`left`, `center`, `right`, `space-between`).

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **Prefix Slot**: 페이징 컨트롤 좌측에 커스텀 상태 메시지나 버튼을 배치할 수 있는 슬롯입니다.
- **Suffix Slot**: 페이징 컨트롤 우측에 추가 액션 컨트롤을 주입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `currentPage` | `number` | `1` | 현재 활성화된 페이지 번호(1-based)입니다. |
| `pageSize` | `number` | `20` | 한 페이지당 표시할 레코드 수입니다. |
| `totalCount` | `number` | `0` | 전체 레코드 건수입니다 (서버 사이드 페이징 지원). |
| `pageSizeOptions` | `Array<number>` | `[10, 20, 50, 100]` | 페이지 크기 선택 드롭다운에 노출할 옵션 목록입니다. |
| `maxPageButtons` | `number` | `5` | 한 번에 노출할 최대 페이지 번호 버튼 개수입니다. |
| `disabled` | `boolean` | `false` | 전체 페이징 컨트롤 비활성화 여부입니다. |

### 3.2. 상태 (States)

- **Total Pages State (`totalPages`)**: `Math.ceil(totalCount / pageSize)` 계산식에 의해 동적으로 도출되는 전체 페이지 수 상태입니다.
- **Navigability State**: `currentPage` 위치에 따라 처음/이전 및 다음/끝 버튼의 비활성화(`disabled`) 제어 상태입니다.
- **Active Page State**: 현재 선택되어 하이라이트 표시되는 페이지 번호 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `page-change` | `{ page: number, pageSize: number }` | 페이지 번호 클릭 또는 페이지 크기 변경에 의해 조회가 필요한 페이지 상태가 변경된 시점 |
| `page-size-change` | `{ pageSize: number, previousPageSize: number }` | 한 페이지당 노출 행 수가 변경된 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-pagination-bg: #ffffff;
  --ui-comp-grid-pagination-padding: 8px 12px;
  --ui-comp-grid-pagination-border-top: 1px solid #d0d7de;
  --ui-comp-grid-pagination-text-color: #24292f;
  --ui-comp-grid-pagination-btn-bg: #ffffff;
  --ui-comp-grid-pagination-btn-hover-bg: #f3f4f6;
  --ui-comp-grid-pagination-btn-active-bg: #0969da;
  --ui-comp-grid-pagination-btn-active-color: #ffffff;
  --ui-comp-grid-pagination-btn-disabled-color: #8c959f;
}
```
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 2단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## 2단계: 코어 템플릿 및 스타일 생성 프롬프트 (Prompt 2)

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 DataGrid 컴포넌트의 코어 템플릿(`GridPagination.ts`)과 전용 스타일시트(`GridPagination.css`) 코드를 작성해 주세요.

[작성 조건 - GridPagination.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `GridPaginationTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `GridPaginationHost` 명칭으로 export 하세요.

[작성 조건 - GridPagination.css.ts]
1. `:host` 블록 내에 `--grid-{component-name}-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
2. 루트 클래스명은 `grid-{component-name}`으로 지정하세요.
3. 요구사항 정의서 1.2절의 Variants 스타일을 작성하세요.
4. 요구사항 정의서 1.3절의 Sizes 규격 스타일을 작성하세요.
5. 요구사항 정의서 3.2절의 States 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/DataGrid/GridPagination/GridPagination.ts`, `src/components/GridPagination/GridPagination.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.

````

---

## 3단계: 웹 컴포넌트 클래스 생성 프롬프트 (Prompt 3)

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/host타입/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`GridPagination.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - GridPagination.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `GridPaginationHost`를 implements 하여 클래스를 구현하고, `@customElement('grid-{component-name}')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `GridPaginationTemplate`과 `GridPaginationStyles`를 임포트하여 `render()` 메서드 및 `styles` 정적 속성에 연결하세요. `GridPaginationHost`를 type 임포트하세요.
3. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
4. 요구사항 정의서 3.3절의 이벤트를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridPagination/GridPagination.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(Storybook 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## 4단계: Storybook 생성 프롬프트 (Prompt 4)

````text
[요청 사항]
1~3단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`GridPagination.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - GridPagination.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `GridPaginationHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 3.2절의 주요 States를 시연하는 Story를 작성하세요.
5. Meta의 title을 `DataGrid/GridPagination` 로 지정하시오.
6. 3단계에서 작성한 GridPagination.wc.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridPagination/GridPagination.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정이 성공적으로 종료되었음을 최종 안내해 주세요.

---
````
