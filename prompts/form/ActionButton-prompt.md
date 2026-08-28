# ActionButton Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/ActionButton/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - ActionButton.ts (코어 Lit 템플릿)
   - ActionButton.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - ActionButton.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - ActionButton.react.ts (@lit/react 기반 React 래퍼)
   - ActionButton.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-action-button`
   - Lit 엘리먼트 클래스명: `BizActionButton`
   - CSS Design Token / Custom Properties: `--biz-action-button-*`
   - 루트 CSS 클래스명: `biz-action-button`
   - Lit 코어 템플릿 export 명칭: `ActionButtonTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`ActionButtonHost` 
   - Lit 스타일 export 변수명: `export const actionButtonStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizActionButton
- 커스텀 엘리먼트 태그명 (kebab-case): biz-action-button
- Lit 스타일 변수명 (camelCase): actionButtonStyles

[요구사항 정의서]
---
# [ActionButton] 요구사항 정의서

액션 버튼(ActionButton)은 데이터그리드(DataGrid) 내의 데이터에 대해 추가, 수정, 삭제 등의 비즈니스 규칙을 실행하여 데이터 상태 변화를 직접 유발하는 실행 주체이며, 다수의 연관 작업이나 하위 옵션을 드롭다운(Dropdown) 형태로 확장·전환하여 선택적으로 집행하는 기능을 포함합니다.

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- 단일 실행을 담당하는 메인 버튼, 하위 옵션을 확장하는 드롭다운 트리거 버튼, 확장 시 표시되는 팝오버 메뉴 컨테이너로 구획을 구성합니다.

### 1.2. 형태 옵션 (Variants)

- `Solid`: 배경색 중심의 기본 강조 스타일 (주요 비즈니스 실행용)
- `Outlined`: 테두리 중심 스타일 (보조/일반 실행용)
- `Text`: 배경 및 테두리가 없는 최소화 스타일 (그리드 셀 내부 임베드용)
- `Split`: 메인 액션 버튼과 드롭다운 화살표 트리거 버튼이 분리된 스타일

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

### 1.4. 레이아웃 제어 (Layout Properties)

- `full-width`: 부모 요소 너비 100% 확장 여부
- `placement`: 드롭다운 메뉴가 전개되는 방향 (`bottom-start`, `bottom-end`, `top-start`, `top-end`)

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)** | **비고 (Remarks)** |
| --- | --- | --- |
| `start-slot` | 버튼 내부 좌측 주입 영역 (주요 액션 아이콘 등) |  |
| `end-slot` | 버튼 내부 우측 주입 영역 (드롭다운 화살표 커스텀 등) | `split` 모드 시 메뉴 트리거 영역 |
| `menu-slot` | 커스텀 드롭다운 메뉴 레이아웃 주입 영역 | 기본 옵션 목록 대체용 |
| `helper-text-slot` | 하단 안내/에러 메시지 영역 |  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명** | **타입** | **기본값** | **설명** |
| --- | --- | --- | --- |
| `label` | `string` | `''` | 버튼 표기 텍스트 |
| `variant` | `string` | `'solid'` | 버튼 형태 옵션 (`solid`, `outlined`, `text`, `split`) |
| `items` | `Array<{id: string, label: string, icon?: string, disabled?: boolean, danger?: boolean}>` | `[]` | 드롭다운 메뉴 항목 데이터 배열 |
| `split` | `boolean` | `false` | 단일 실행과 드롭다운 트리거의 분리 여부 |
| `open` | `boolean` | `false` | 드롭다운 메뉴 열림 여부 |
| `disabled` | `boolean` | `false` | 전체 버튼 비활성화 여부 |
| `loading` | `boolean` | `false` | 액션 처리 중 스피너 표시 여부 |

### 3.2. 상태 (States)

- **Hover**: 마우스 오버 시 시각적 피드백 (배경/테두리 색상 변경)
- **Focus / Focus-visible**: 키보드 포커스 진입 시 포커스 링 표시
- **Active / Pressed**: 클릭/터치 시 눌림 반응 상태
- **Open**: 드롭다운 메뉴 확장 상태 (트리거 버튼 강조 유지)
- **Disabled**: 비활성화 (인터랙션 불가, 시각적 Dim)
- **Loading**: 액션 실행 중 (인터랙션 차단, 스피너 표출)

### 3.3. 이벤트 (Events)

| **이벤트명** | **상세 (Detail)** | **발생 시점** |
| --- | --- | --- |
| `action-click` | `{ originalEvent: Event }` | 메인 액션 버튼 클릭 시 방출 |
| `item-select` | `{ item: object, id: string, originalEvent: Event }` | 드롭다운 메뉴 항목 선택 시 방출 |
| `dropdown-toggle` | `{ open: boolean }` | 드롭다운 메뉴 열림/닫힘 시 방출 |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```css
:host {
  /* Layout & Sizing */
  --ui-action-btn-height-sm: 28px;
  --ui-action-btn-height-md: 36px;
  --ui-action-btn-height-lg: 44px;
  --ui-action-btn-padding-x: 12px;
  --ui-action-btn-padding-y: 6px;
  --ui-action-btn-border-radius: 4px;

  /* Colors - Base */
  --ui-action-btn-bg-color: #2563eb;
  --ui-action-btn-border-color: #2563eb;
  --ui-action-btn-text-color: #ffffff;

  /* Colors - Interactive States */
  --ui-action-btn-hover-bg-color: #1d4ed8;
  --ui-action-btn-focus-ring-color: rgba(37, 99, 235, 0.3);

  /* Colors - Menu */
  --ui-action-menu-bg-color: #ffffff;
  --ui-action-menu-border-color: #e5e7eb;
  --ui-action-menu-item-hover-bg-color: #f3f4f6;
  --ui-action-menu-item-danger-color: #dc2626;

  /* Colors - Disabled */
  --ui-action-btn-disabled-bg-color: #f3f4f6;
  --ui-action-btn-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`aria-haspopup="menu"`**: 드롭다운 메뉴를 제어하는 트리거 버튼에 연동
- **`aria-expanded`**: 드롭다운 메뉴의 열림(`'true'`) / 닫힘(`'false'`) 상태 연동
- **`aria-controls`**: 트리거 버튼과 팝오버 메뉴 요소의 ID를 상호 연결
- **`role="menu"`** & **`role="menuitem"`**: 드롭다운 메뉴 및 내부 선택 항목에 바인딩
- **`aria-busy`**: `loading` 상태 활성화 시 `'true'`로 연동

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Enter` / `Space`**: 버튼 클릭 실행 또는 드롭다운 메뉴 토글
- **`Down Arrow`**: 메뉴 열기 및 첫 번째 메뉴 항목으로 포커스 이동
- **`Up Arrow` / `Down Arrow`**: 드롭다운 메뉴 내부 항목 간 순환 포커스 이동
- **`Escape`**: 열려 있는 드롭다운 메뉴를 닫고 트리거 버튼으로 포커스 복귀

### 5.3. 스크린 리더 대응

- 메인 버튼과 드롭다운 트리거가 분리된 `Split` 형태의 경우, 각 버튼의 역할과 접근성 명칭(`aria-label`)을 별도로 선언하여 독립된 개체로 인식되도록 합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`ActionButton.ts`)과 전용 Lit 스타일시트(`ActionButton.css.ts`) 코드를 작성해 주세요.

[작성 조건 - ActionButton.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `ActionButtonTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `ActionButtonHost` 명칭으로 export 하세요.

[작성 조건 - ActionButton.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const actionButtonStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-action-button-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-action-button`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/ActionButton/ActionButton.ts`, `src/components/ActionButton/ActionButton.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`ActionButton.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - ActionButton.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `ActionButtonHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-action-button')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `ActionButtonTemplate` 및 `ActionButton.css.ts`의 `actionButtonStyles`를 임포트하세요. `ActionButtonHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = actionButtonStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `ActionButtonTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/ActionButton/ActionButton.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`ActionButton.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - ActionButton.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `ActionButtonWc` 클래스와 커스텀 엘리먼트 태그명(`biz-action-button`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/ActionButton/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`ActionButtonTemplate`), 스타일(`actionButtonStyles`), 웹 컴포넌트 클래스(`ActionButtonWc`), React 래퍼 컴포넌트(`ActionButton`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/ActionButton/ActionButton.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/ActionButton/ActionButton.react.ts`, `src/components/ActionButton/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`ActionButton.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - ActionButton.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `ActionButtonHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 ActionButton.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요.

[출력 형식]
- 파일 경로(`src/components/ActionButton/ActionButton.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
