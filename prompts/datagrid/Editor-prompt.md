## DataGrid 코드 생성을 위한 순차적 프롬프트 작성 체인
-

## 1단계: 컨텍스트 및 요구사항 전달 프롬프트 (Prompt 1)

````text
[역할 정의]
당신은 DataGrid 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 DataGrid 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[DataGrid 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/DataGrid/GridEditor/` 아래에 위치합니다.
2. 표준 파일 구성 (4종):
   - GridEditor.ts (코어 Lit 템플릿)
   - GridEditor.css.ts (컴포넌트 전용 스타일)
   - GridEditor.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - GridEditor.stories.ts (Storybook 문서)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `grid-{component-name}` (예: grid-input)
   - CSS Design Token / Custom Properties: `--grid-{component-name}-*` (예: --grid-input-height-md)
   - 루트 CSS 클래스명: `grid-{component-name}`
   - Lit 코어 템플릿 export 명칭: `GridEditorTemplate`
   - 템플릿 함수 파라미터 host의 인터페이스 export 명칭:`GridEditorHost` 
   - Lit 스타일 export 변수명: `export const GrideditorStyles = css`...`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): GridEditor
- 커스텀 엘리먼트 태그명 (kebab-case): grid-{component-name}

[요구사항 정의서]
---
# grid-editor

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- **Editor Container**: 셀 더블클릭 시 해당 셀의 위치 및 크기 위에 동적으로 오버레이되거나 내부에 마운트되는 최외각 레이어입니다.
- **Form Control Host**: 컬럼 데이터 타입에 맞게 매핑된 입력 컨트롤(Input, Select, DatePicker 등)이 배치되는 영역입니다.
- **Validation Message Indicator**: 실시간 유효성 검증 실패 시 에러 스타일 및 툴팁/에러 메시지를 노출하는 영역입니다.

### 1.2. 형태 옵션 (Variants)

- `Inline`: 기존 셀 내부 영역에 맞춰 1:1 크기로 마운트되는 표준 편집기 형태입니다.
- `Popup / Overlay`: DatePicker, Select 등 드롭다운 형태의 팝업 UI가 셀 경계를 넘어 확장을 필요로 할 때 적용되는 형태입니다.
- `Invalid`: 유효성 검증에 실패하여 에러 테두리 및 메시지 인디케이터가 적용된 형태입니다.

### 1.3. 크기 옵션 (Sizes)

- `Fit Cell`: 대상 `<grid-cell>`의 높이와 너비 규격을 정밀하게 승계하여 맞춤 적용됩니다.

### 1.4. 레이아웃 제어 (Layout Properties)

- `width`: 편집 대상 셀의 너비(`100%`)에 일치하도록 지정됩니다.
- `height`: 편집 대상 셀의 높이(`100%`)에 일치하도록 지정됩니다.

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- **Custom Input Slot**: 기본 매핑 컨트롤(Text, Number, Select, DatePicker) 외 커스텀 입력 컴포넌트를 편집기 내부에 주입할 수 있는 슬롯입니다.

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `columnKey` | `string` | `""` | 편집 중인 컬럼의 고유 식별자입니다. |
| `rowIndex` | `number` | `-1` | 편집 중인 행의 인덱스 번호입니다. |
| `value` | `any` | `null` | 편집기에 바인딩되는 초기 원본 값입니다. |
| `type` | `string` | `'text'` | 입력 폼 타입을 결정하는 스키마 속성입니다 (`text`, `number`, `select`, `date` 등). |
| `options` | `Array<{label: string, value: any}>` | `[]` | `type='select'`일 때 드롭다운에 노출할 선택지 목록입니다. |
| `validationRules` | `ValidationRule` | `null` | 필수 여부, 최소/최대, 정규식 패턴 등 유효성 검증 규칙 객체입니다. |

### 3.2. 상태 (States)

- **Current Value (`editValue`)**: 편집기 내부 입력 폼에서 사용자가 실시간으로 수정 중인 값 상태입니다.
- **Validation State (`isValid`, `errorMessage`)**: 실시간 유효성 검증 수행 결과에 따른 통과 여부 및 에러 메시지 상태입니다.
- **Focus & Select State**: 마운트 완료 시 내부 Input 요소로 포커스가 자동 이동하고 텍스트 전체 선택(Select)이 적용된 상태입니다.

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `cell-commit` | `{ rowIndex: number, columnKey: string, newValue: any, oldValue: any }` | Enter, Tab 입력 또는 Blur 발생 시 유효성 검증을 통과하여 최종 값 변경이 확정된 시점 |
| `cell-cancel` | `{ rowIndex: number, columnKey: string }` | Escape 키 입력으로 변경 사항을 취소하고 편집 모드를 종료하는 시점 |
| `validation-error` | `{ columnKey: string, errorMessage: string, value: any }` | 실시간 입력 값이 유효성 검증 규칙을 위반한 시점 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 테마 커스텀 및 스타일 제어를 위한 CSS Custom Properties를 정의합니다. 네임스페이스(`-ui-comp-*`)를 준수합니다.

```css
:host {
  --ui-comp-grid-editor-bg: #ffffff;
  --ui-comp-grid-editor-border: 2px solid #0969da;
  --ui-comp-grid-editor-font-size: 13px;
  --ui-comp-grid-editor-padding: 0 6px;
  --ui-comp-grid-editor-error-border: #cf222e;
  --ui-comp-grid-editor-error-bg: #ffebe9;
  --ui-comp-grid-editor-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
```
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 2단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## 2단계: 코어 템플릿 및 스타일 생성 프롬프트 (Prompt 2)

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 DataGrid 컴포넌트의 코어 템플릿(`GridEditor.ts`)과 전용 스타일시트(`GridEditor.css`) 코드를 작성해 주세요.

[작성 조건 - GridEditor.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `GridEditorTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `GridEditorHost` 명칭으로 export 하세요.

[작성 조건 - GridEditor.css.ts]
1. `:host` 블록 내에 `--grid-{component-name}-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
2. 루트 클래스명은 `grid-{component-name}`으로 지정하세요.
3. 요구사항 정의서 1.2절의 Variants 스타일을 작성하세요.
4. 요구사항 정의서 1.3절의 Sizes 규격 스타일을 작성하세요.
5. 요구사항 정의서 3.2절의 States 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/DataGrid/GridEditor/GridEditor.ts`, `src/components/GridEditor/GridEditor.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.

````

---

## 3단계: 웹 컴포넌트 클래스 생성 프롬프트 (Prompt 3)

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/host타입/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`GridEditor.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - GridEditor.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `GridEditorHost`를 implements 하여 클래스를 구현하고, `@customElement('grid-{component-name}')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `GridEditorTemplate`과 `GridEditorStyles`를 임포트하여 `render()` 메서드 및 `styles` 정적 속성에 연결하세요. `GridEditorHost`를 type 임포트하세요.
3. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
4. 요구사항 정의서 3.3절의 이벤트를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridEditor/GridEditor.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(Storybook 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## 4단계: Storybook 생성 프롬프트 (Prompt 4)

````text
[요청 사항]
1~3단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`GridEditor.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - GridEditor.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `GridEditorHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 3.2절의 주요 States를 시연하는 Story를 작성하세요.
5. Meta의 title을 `DataGrid/GridEditor` 로 지정하시오.
6. 3단계에서 작성한 GridEditor.wc.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/DataGrid/GridEditor/GridEditor.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정이 성공적으로 종료되었음을 최종 안내해 주세요.

---
````
