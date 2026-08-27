# Dropdown Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/Dropdown/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - Dropdown.ts (코어 Lit 템플릿)
   - Dropdown.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - Dropdown.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - Dropdown.react.ts (@lit/react 기반 React 래퍼)
   - Dropdown.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-dropdown`
   - Lit 엘리먼트 클래스명: `BizDropdown`
   - CSS Design Token / Custom Properties: `--biz-dropdown-*`
   - 루트 CSS 클래스명: `biz-dropdown`
   - Lit 코어 템플릿 export 명칭: `DropdownTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`DropdownHost` 
   - Lit 스타일 export 변수명: `export const dropdownStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizDropdown
- 커스텀 엘리먼트 태그명 (kebab-case): biz-dropdown
- Lit 스타일 변수명 (camelCase): dropdownStyles

[요구사항 정의서]
---
# Dropdown 요구사항 정의서

항목 선택을 위한 기본 Select Dropdown 구조
## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Trigger Control`: 클릭/포커스 시 옵션 목록 팝오버를 제어하는 입력 영역
- `Value Display Area`: 단일 선택 시 선택된 텍스트, 다중 선택 시 태그/칩(Tag/Chip) 목록 또는 요약 텍스트(`N개 선택됨`)를 표출하는 영역
- `Filter Input`: 콤보박스(Autocomplete) 모드 활성화 시 입력 박스 내부 또는 드롭다운 상단에서 직접 타이핑을 수신하는 필드
- `Dropdown Popover (Menu)`: 옵션 항목들이 나열되는 하단/상단 부유 레이어
- `Option Item`: 선택 가능한 개별 항목 (체크박스, 아이콘, 텍스트 포함 가능)
- `Clear Button`: 선택된 항목 전체를 일괄 삭제하는 초기화 버튼
- `Helper Text / Error Message`: 하단 안내 문구 및 유효성 검사 에러 메시지 영역

### 1.2. 작동 모드 (Operating Modes)

- `Single Select`: 클릭 시 팝오버가 열리고 단 하나의 옵션만 선택하는 기본 드롭다운
- `Multi Select`: 복수 항목을 선택하며, 선택된 값들을 태그/칩 형태로 시각화하는 드롭다운
- `Combobox / Autocomplete`: Input의 텍스트 입력과 Select의 드롭다운이 결합되어 실시간 키워드 필터링을 제공하는 형태

### 1.3. 형태 옵션 (Variants)

- `Outlined`: 테두리 중심 스타일
- `Filled`: 배경색 중심 스타일
- `Standard`: 하단 경계선 스타일

### 1.4. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.5. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `max-tag-count`: 다중 선택 시 노출할 최대 태그 개수 (초과 시 `+N` 형태의 요약 칩 표출)

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

|**슬롯명 (Slot Name)**|**설명 (Description)**|**비고 (Remarks)**|
|---|---|---|
|`label-slot`|상단/좌측 레이블 영역|표준 `<label>` 태그 충돌 방지|
|`prefix-slot`|Trigger Control 내부 좌측 주입 영역 (아이콘 등)||
|`suffix-slot`|Trigger Control 내부 우측 주입 영역 (화살표 아이콘 등)||
|`tag-slot`|Multi Select 시 생성되는 커스텀 태그/칩 영역||
|`option-slot`|Dropdown Menu 내 개별 옵션 커스텀 커스텀 렌더링 영역||
|`empty-slot`|검색 결과가 없을 때 표시될 커스텀 영역||
|`header-slot`|Dropdown Menu 최상단 주입 영역 (전체 선택 등)||
|`footer-slot`|Dropdown Menu 최하단 주입 영역 (확인/취소 버튼 등)||
|`helper-text-slot`|하단 안내/에러 메시지 영역||

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

|**속성명**|**타입**|**기본값**|**설명**|
|---|---|---|---|
|`value`|`string \| number \| array`|`null`|선택된 값 (Single: 단일값, Multi: 배열)|
|`options`|`Array<{label, value, disabled}>`|`[]`|드롭다운 옵션 목록 데이터|
|`mode`|`string`|`'single'`|동작 모드 (`single`, `multi`)|
|`filterable`|`boolean`|`false`|타이핑을 통한 옵션 필터링(Autocomplete) 여부|
|`placeholder`|`string`|`'선택하세요'`|플레이스홀더 텍스트|
|`clearable`|`boolean`|`false`|선택값 전체 초기화 버튼 노출 여부|
|`max-tag-count`|`number`|`undefined`|Multi 모드 시 표출할 최대 태그 개수|
|`loading`|`boolean`|`false`|원격 데이터 로딩 중 스피너 표시 여부|
|`required`|`boolean`|`false`|필수 선택 여부|
|`readonly`|`boolean`|`false`|읽기 전용 여부|
|`disabled`|`boolean`|`false`|비활성화 여부|
|`error`|`boolean`|`false`|유효성 에러 상태 여부|

### 3.2. 상태 (States)

- **Closed (Default)**: 팝오버가 닫혀 있는 기본 상태
- **Open**: 클릭 또는 키보드 조작으로 옵션 팝오버가 펼쳐진 상태
- **Hover**: Trigger Control 또는 개별 Option Item 마우스 오버 시 시각적 피드백
- **Focus / Focus-visible**: 키보드 탐색 중 Trigger Control 또는 옵션 항목 강조 상태
- **Disabled**: 비활성화 (인터랙션 및 팝오버 연동 불가, 시각적 Dim 처리)
- **Readonly**: 읽기 전용 (선택된 값 변경 불가, 팝오버 열림 불가)
- **Error**: 유효성 검사 실패 상태 (경계선 및 에러 색상 강조)

### 3.3. 이벤트 (Events)

| **이벤트명**     | **상세 (Detail)**                       | **발생 시점**                          |
| ------------ | ------------------------------------- | ---------------------------------- |
| `change`     | `{ value: any, selectedOption: any }` | 옵션 선택 변경 확정 시 방출                   |
| `open`       | `void`                                | 드롭다운 팝오버가 열릴 때 방출                  |
| `close`      | `void`                                | 드롭다운 팝오버가 닫힐 때 방출                  |
| `search`     | `{ keyword: string }`                 | `filterable=true` 모드에서 키워드 입력 시 방출 |
| `clear`      | `void`                                | 초기화 버튼 클릭으로 값 삭제 시 방출              |
| `tag-remove` | `{ removedValue: any }`               | Multi 모드에서 개별 태그 삭제 버튼 클릭 시 방출     |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-dropdown-height-sm: 32px;
  --ui-dropdown-height-md: 40px;
  --ui-dropdown-height-lg: 48px;
  --ui-dropdown-padding-x: 12px;
  --ui-dropdown-padding-y: 8px;
  --ui-dropdown-border-radius: 4px;
  --ui-dropdown-popover-max-height: 256px;

  /* Colors - Base */
  --ui-dropdown-bg-color: #ffffff;
  --ui-dropdown-border-color: #d1d5db;
  --ui-dropdown-text-color: #111827;
  --ui-dropdown-placeholder-color: #9ca3af;
  --ui-dropdown-icon-color: #6b7280;

  /* Colors - Popover & Option */
  --ui-dropdown-popover-bg: #ffffff;
  --ui-dropdown-popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --ui-dropdown-option-hover-bg: #f3f4f6;
  --ui-dropdown-option-selected-bg: #eff6ff;
  --ui-dropdown-option-selected-text: #2563eb;

  /* Colors - Tag / Chip */
  --ui-dropdown-tag-bg: #e5e7eb;
  --ui-dropdown-tag-text: #374151;

  /* Colors - Interactive States */
  --ui-dropdown-hover-border-color: #9ca3af;
  --ui-dropdown-focus-border-color: #2563eb;
  --ui-dropdown-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - Error & Disabled */
  --ui-dropdown-error-color: #dc2626;
  --ui-dropdown-disabled-bg-color: #f3f4f6;
  --ui-dropdown-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="combobox"`**: Trigger Control 영역에 바인딩하여 드롭다운 입력 구조임을 명시
- **`aria-expanded`**: 팝오버가 열려 있으면 `'true'`, 닫혀 있으면 `'false'` 동적 변경
- **`aria-haspopup="listbox"`**: 하단 레이어가 목록 박스 형태임을 전달
- **`aria-controls`**: Dropdown Menu 팝오버 영역의 `id`를 지정하여 연동
- **`role="listbox"`**: Dropdown Menu 영역에 바인딩
- **`role="option"`**: 개별 Option Item 영역에 바인딩 및 선택된 항목에 `aria-selected="true"` 지정
- **`aria-multiselectable="true"`**: `mode="multi"` 설정 시 `listbox` 요소에 바인딩

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`ArrowDown` / `ArrowUp`**: 팝오버를 열거나, 옵션 목록 내에서 위/아래로 하이라이트 포커스 이동
- **`Enter`**: 현재 하이라이트된 옵션을 선택/해제 (Single 모드는 선택 후 팝오버 닫힘)
- **`Escape`**: 열려 있는 드롭다운 팝오버를 즉시 닫고 Trigger Control로 포커스 복귀
- **`Backspace`**: `filterable=true` 및 `mode="multi"` 상태에서 입력창이 비어있을 때 입력창 직전의 태그/칩 삭제
- **`Tab`**: 포커스를 다음 요소로 이동시키며 열려 있는 팝오버는 자동 닫힘 처리

### 5.3. 스크린 리더 및 시각 피드백

- **포커스 자동 추적 (`aria-activedescendant`)**: 키보드 방향키 이동 시 실제로 DOM 포커스는 입력 필드에 유지되면서 하이라이트된 Option Item의 `id`를 `aria-activedescendant`로 갱신하여 스크린 리더가 해당 옵션을 음성 출력하도록 구현합니다.
- 검색 결과 변경 시 "N개의 옵션이 있습니다" 또는 "검색 결과가 없습니다" 형태의 실시간 라이브 리전(`aria-live="polite"`) 음성 안내를 지원합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`Dropdown.ts`)과 전용 Lit 스타일시트(`Dropdown.css.ts`) 코드를 작성해 주세요.

[작성 조건 - Dropdown.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `DropdownTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `DropdownHost` 명칭으로 export 하세요.

[작성 조건 - Dropdown.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const dropdownStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-dropdown-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-dropdown`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/Dropdown/Dropdown.ts`, `src/components/Dropdown/Dropdown.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`Dropdown.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - Dropdown.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `DropdownHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-dropdown')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `DropdownTemplate` 및 `Dropdown.css.ts`의 `dropdownStyles`를 임포트하세요. `DropdownHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = dropdownStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `DropdownTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/Dropdown/Dropdown.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`Dropdown.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - Dropdown.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `DropdownWc` 클래스와 커스텀 엘리먼트 태그명(`biz-dropdown`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/Dropdown/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`DropdownTemplate`), 스타일(`dropdownStyles`), 웹 컴포넌트 클래스(`DropdownWc`), React 래퍼 컴포넌트(`Dropdown`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/Dropdown/Dropdown.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/Dropdown/Dropdown.react.ts`, `src/components/Dropdown/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`Dropdown.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - Dropdown.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `DropdownHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 Dropdown.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요.

[출력 형식]
- 파일 경로(`src/components/Dropdown/Dropdown.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
