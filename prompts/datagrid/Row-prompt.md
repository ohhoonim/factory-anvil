## DataGrid 코드 생성을 위한 순차적 프롬프트 작성 체인
-

## 1단계: 컨텍스트 및 요구사항 전달 프롬프트 (Prompt 1)

````text
[역할 정의]
당신은 DataGrid 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 DataGrid 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[DataGrid 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/DataGrid/GridRow/` 아래에 위치합니다.
2. 표준 파일 구성 (4종):
   - GridRow.ts (코어 Lit 템플릿)
   - GridRow.css.ts (컴포넌트 전용 스타일)
   - GridRow.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - GridRow.stories.ts (Storybook 문서)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `grid-{component-name}` (예: grid-input)
   - CSS Design Token / Custom Properties: `--grid-{component-name}-*` (예: --grid-input-height-md)
   - 루트 CSS 클래스명: `grid-{component-name}`
   - Lit 코어 템플릿 export 명칭: `GridRowTemplate`
   - 템플릿 함수 파라미터 host의 인터페이스 export 명칭:`GridRowHost` 
   - Lit 스타일 export 변수명: `export const GridrowStyles = css`...`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): GridRow
- 커스텀 엘리먼트 태그명 (kebab-case): grid-{component-name}

[요구사항 정의서]
---
# grid-row

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Row Container**: DOM Pooling 메커니즘에 따라 한정된 개수로 사전 생성되어 재사용되는 단일 행 컨테이너입니다.
- **Cell Group**: 컬럼 오프셋 및 화면 가시 영역(hRange)에 대응하는 `<grid-cell>` 서브 컴포넌트들을 가로 레이아웃으로 배치합니다.

### 1.2. 형태 옵션 (Variants)

- `Default`: 기본 데이터 행 스타일입니다.
- `Dirty`: 하위 셀 중 수정된 데이터가 포함되어 행 전체에 Dirty 상태 강조 배경 스타일이 적용된 형태입니다.
- `Selected`: 행 전체 또는 포함된 셀이 선택 영역에 포함되었을 때 하이라이트 스타일이 적용된 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Standard`: 상위 `<grid-viewport>`의 CSS Variable(`-ui-comp-grid-viewport-row-height`) 규격을 전달받아 동작합니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `height`: 단일 행의 높이(px)를 제어합니다.
- `transformY`: 가상화 연산 결과인 `rowIndex`에 기반하여 `translate3d(0, rowIndex * rowHeight, 0)` 수직 오프셋 위치를 명시적으로 제어합니다.

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **`<grid-cell>`**: 행 내부에서 각 컬럼 데이터 값을 바인딩하고 렌더링하는 개별 셀 서브 컴포넌트입니다.
- **Default Slot**: 셀 목록 외 행 단위 오버레이나 커스텀 익스팬션(Row Expansion) 요소를 수용하는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `rowIndex` | `number` | `-1` | 가상화 스크롤 상에서 현재 행이 표현하는 데이터의 절대 인덱스 번호입니다. |
| `rowData` | `Record<string, any>` | `null` | 현재 행에 바인딩된 원본 데이터 객체입니다. |
| `isActive` | `boolean` | `false` | 가시 범위 내에 진입하여 활성화 상태로 렌더링되고 있는지 여부입니다. |
| `isDirty` | `boolean` | `false` | 하위 셀 중 수정된 데이터가 존재하는지 나타내는 행 단위 Dirty 플래그입니다. |
| `isSelected` | `boolean` | `false` | 현재 행이 선택 상태인지 나타내는 플래그입니다. |

### 3.2. 상태 (States)

- **Pool State (`Active` / `Inactive`)**: DOM Pool 내에서 활성화되어 실제 화면에 바인딩된 상태 또는 가시 범위를 벗어나 숨김 처리 및 재사용 대기 중인 상태입니다.
- **Cell Map (`cellMap`)**: 효율적인 데이터 업데이트 및 포커스 제어를 위해 하위 `<grid-cell>` 인스턴스를 키(`columnKey`) 기반으로 추적/관리하는 내부 Map 구조 상태입니다.
- **Transform State**: Y축 고속 포지셔닝을 위한 `translate3d` 오프셋 좌표 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `row-click` | `{ rowIndex: number, rowData: Record<string, any> }` | 행 영역 클릭 시 상위 컨트롤러로 행 선택 이벤트를 전달하는 시점 |
| `row-dblclick` | `{ rowIndex: number, rowData: Record<string, any> }` | 행 영역 더블클릭 이벤트 발생 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-row-bg: #ffffff;
  --ui-comp-grid-row-hover-bg: #f1f5f9;
  --ui-comp-grid-row-dirty-bg: #fffbe6;
  --ui-comp-grid-row-selected-bg: #e6f4ff;
  --ui-comp-grid-row-border-bottom: 1px solid #e1e4e8;
}
```
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 2단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## 2단계: 코어 템플릿 및 스타일 생성 프롬프트 (Prompt 2)

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 DataGrid 컴포넌트의 코어 템플릿(`GridRow.ts`)과 전용 스타일시트(`GridRow.css`) 코드를 작성해 주세요.

[작성 조건 - GridRow.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `GridRowTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `GridRowHost` 명칭으로 export 하세요.

[작성 조건 - GridRow.css.ts]
1. `:host` 블록 내에 `--grid-{component-name}-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
2. 루트 클래스명은 `grid-{component-name}`으로 지정하세요.
3. 요구사항 정의서 1.2절의 Variants 스타일을 작성하세요.
4. 요구사항 정의서 1.3절의 Sizes 규격 스타일을 작성하세요.
5. 요구사항 정의서 3.2절의 States 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/DataGrid/GridRow/GridRow.ts`, `src/components/GridRow/GridRow.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.

````

---

## 3단계: 웹 컴포넌트 클래스 생성 프롬프트 (Prompt 3)

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/host타입/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`GridRow.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - GridRow.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `GridRowHost`를 implements 하여 클래스를 구현하고, `@customElement('grid-{component-name}')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `GridRowTemplate`과 `GridRowStyles`를 임포트하여 `render()` 메서드 및 `styles` 정적 속성에 연결하세요. `GridRowHost`를 type 임포트하세요.
3. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
4. 요구사항 정의서 3.3절의 이벤트를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridRow/GridRow.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(Storybook 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## 4단계: Storybook 생성 프롬프트 (Prompt 4)

````text
[요청 사항]
1~3단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`GridRow.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - GridRow.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `GridRowHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 3.2절의 주요 States를 시연하는 Story를 작성하세요.
5. Meta의 title을 `DataGrid/GridRow` 로 지정하시오.
6. 3단계에서 작성한 GridRow.wc.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridRow/GridRow.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정이 성공적으로 종료되었음을 최종 안내해 주세요.

---
````
