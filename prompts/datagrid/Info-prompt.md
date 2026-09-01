## DataGrid 코드 생성을 위한 순차적 프롬프트 작성 체인
-

## 1단계: 컨텍스트 및 요구사항 전달 프롬프트 (Prompt 1)

````text
[역할 정의]
당신은 DataGrid 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 DataGrid 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[DataGrid 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/DataGrid/GridInfo/` 아래에 위치합니다.
2. 표준 파일 구성 (4종):
   - GridInfo.ts (코어 Lit 템플릿)
   - GridInfo.css.ts (컴포넌트 전용 스타일)
   - GridInfo.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - GridInfo.stories.ts (Storybook 문서)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `grid-{component-name}` (예: grid-input)
   - CSS Design Token / Custom Properties: `--grid-{component-name}-*` (예: --grid-input-height-md)
   - 루트 CSS 클래스명: `grid-{component-name}`
   - Lit 코어 템플릿 export 명칭: `GridInfoTemplate`
   - 템플릿 함수 파라미터 host의 인터페이스 export 명칭:`GridInfoHost` 
   - Lit 스타일 export 변수명: `export const GridinfoStyles = css`...`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): GridInfo
- 커스텀 엘리먼트 태그명 (kebab-case): grid-{component-name}

[요구사항 정의서]
---
# grid-info

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Status Container**: 그리드의 상단 또는 하단에 배치되어 메타 정보 텍스트들을 가로 레이아웃으로 전달하는 바(Bar) 형태의 컨테이너입니다.
- **Row Counter Group**: 전체, 필터링, 가상 스크롤 렌더링 범위 및 선택된 행 수의 카운터 정보를 표기하는 영역입니다.
- **Sort & Filter Summary Area**: 현재 활성화된 정렬 컬럼/방향(ASC/DESC) 및 필터 상태 텍스트를 요약 표기하는 영역입니다.
- **Selection & Modification Summary Area**: 선택된 셀 범위 및 데이터 수정(Dirty)이 발생한 행/셀의 총 개수를 표기하는 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 카운터, 정렬/필터 요약, 수정/선택 메타 정보가 모두 포함된 표준 바 형태입니다.
- `Compact`: 공간이 협소한 환경에서 카운터 정보만 간결하게 표기하는 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Small` (`sm`): 높이 24px 규격의 컴팩트 정보 바 레이아웃입니다.
- `Medium` (`md`): 높이 32px 규격의 표준 정보 바 레이아웃입니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `width`: 상위 `<data-grid>` 전체 폭(`100%`)에 맞추어 유연하게배치됩니다.
- `position`: 그리드 내에서의 배치 위치를 지정합니다 (`top`, `bottom`).

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **Prefix Slot**: 메타 정보 좌측에 사용자 정의 상태 아이콘이나 안내 문구를 주입할 수 있는 슬롯입니다.
- **Suffix Slot**: 메타 정보 우측에 추가 상태 표시 컨트롤이나 액션 버튼을 주입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `totalCount` | `number` | `0` | 그리드 전체 행 수입니다. |
| `filteredCount` | `number` | `0` | 필터링 조건이 적용되어 출력되는 행 수입니다. |
| `renderedRange` | `{ start: number, end: number }` | `{ start: 0, end: 0 }` | 현재 가상 스크롤에 의해 DOM으로 렌더링 중인 행 범위입니다. |
| `selectedRowCount` | `number` | `0` | 현재 선택된 행의 총 개수입니다. |
| `selectedCellCount` | `number` | `0` | 현재 선택된 셀의 총 개수입니다. |
| `dirtyRowCount` | `number` | `0` | 수정된 셀을 포함하고 있는 행의 총 개수입니다. |
| `dirtyCellCount` | `number` | `0` | 수정된 전체 셀의 총 개수입니다. |
| `sortState` | `Array<{ columnKey: string, direction: 'asc' | 'desc' }>` | `[]` | 적용된 정렬 상태 정보 배열입니다. |

### 3.2. 상태 (States)

- **Formatted Summary Text**: 수신된 `totalCount`, `filteredCount`, `renderedRange` 등의 프로퍼티 조합을 바탕으로 "100,000개 중 1~20번째 표시" 형태의 가독성 있는 문장으로 가공한 상태입니다.
- **Modification Indicator State**: `dirtyRowCount` 또는 `dirtyCellCount`가 0보다 클 때 활성화되는 변경 메타 정보 하이라이트 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `info-click` | `{ type: 'count' | 'sort' | 'selection' | 'dirty' }` | 메타 정보 바의 특정 요약 영역 클릭 시 발생 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-info-bg: #f6f8fa;
  --ui-comp-grid-info-padding: 0 12px;
  --ui-comp-grid-info-border-top: 1px solid #d0d7de;
  --ui-comp-grid-info-height: 32px;
  --ui-comp-grid-info-text-color: #5760 Sat;
  --ui-comp-grid-info-font-size: 12px;
  --ui-comp-grid-info-dirty-color: #d97706;
  --ui-comp-grid-info-selected-color: #0969da;
}
```
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 2단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## 2단계: 코어 템플릿 및 스타일 생성 프롬프트 (Prompt 2)

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 DataGrid 컴포넌트의 코어 템플릿(`GridInfo.ts`)과 전용 스타일시트(`GridInfo.css`) 코드를 작성해 주세요.

[작성 조건 - GridInfo.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `GridInfoTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `GridInfoHost` 명칭으로 export 하세요.

[작성 조건 - GridInfo.css.ts]
1. `:host` 블록 내에 `--grid-{component-name}-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
2. 루트 클래스명은 `grid-{component-name}`으로 지정하세요.
3. 요구사항 정의서 1.2절의 Variants 스타일을 작성하세요.
4. 요구사항 정의서 1.3절의 Sizes 규격 스타일을 작성하세요.
5. 요구사항 정의서 3.2절의 States 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/DataGrid/GridInfo/GridInfo.ts`, `src/components/GridInfo/GridInfo.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.

````

---

## 3단계: 웹 컴포넌트 클래스 생성 프롬프트 (Prompt 3)

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/host타입/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`GridInfo.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - GridInfo.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `GridInfoHost`를 implements 하여 클래스를 구현하고, `@customElement('grid-{component-name}')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `GridInfoTemplate`과 `GridInfoStyles`를 임포트하여 `render()` 메서드 및 `styles` 정적 속성에 연결하세요. `GridInfoHost`를 type 임포트하세요.
3. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
4. 요구사항 정의서 3.3절의 이벤트를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridInfo/GridInfo.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(Storybook 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## 4단계: Storybook 생성 프롬프트 (Prompt 4)

````text
[요청 사항]
1~3단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`GridInfo.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - GridInfo.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `GridInfoHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 3.2절의 주요 States를 시연하는 Story를 작성하세요.
5. Meta의 title을 `DataGrid/GridInfo` 로 지정하시오.
6. 3단계에서 작성한 GridInfo.wc.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridInfo/GridInfo.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정이 성공적으로 종료되었음을 최종 안내해 주세요.

---
````
