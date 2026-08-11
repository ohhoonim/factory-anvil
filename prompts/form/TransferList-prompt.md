# TransferList Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/TransferList/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - TransferList.ts (코어 Lit 템플릿)
   - TransferList.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - TransferList.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - TransferList.react.ts (@lit/react 기반 React 래퍼)
   - TransferList.stories.ts (Storybook 문서 및 a11y 검증)
   - TransferList.test.ts (Vitest 및 Playwright 테스트)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-transfer-list`
   - CSS Design Token / Custom Properties: `--biz-transfer-list-*`
   - 루트 CSS 클래스명: `biz-transfer-list`
   - Lit 코어 템플릿 export 명칭: `TransferListTemplate`
   - Lit 스타일 export 변수명: `export const transferListStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): TransferList
- 커스텀 엘리먼트 태그명 (kebab-case): biz-transfer-list
- Lit 스타일 변수명 (camelCase): transferListStyles

[요구사항 정의서]
---
# TransferList 요구사항 정의서

좌측 소스 리스트(Source List Box)와 우측 타겟 리스트(Target List Box), 그리고 중앙의 이동 액션 버튼 구획(Action Controls)으로 구성된 데이터 전송 선택 인터페이스를 제공
## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Source List Box`: 이동 가능한 원본 데이터 항목(Unselected/Available)이 표시되는 좌측 리스트 영역
- `Target List Box`: 선택/이동 완료된 데이터 항목(Selected/Chosen)이 표시되는 우측 리스트 영역
- `Action Controls`: 양쪽 리스트 상호 간 데이터 이동을 수행하는 중앙 액션 버튼 구획
    - `Move Right` (`>`): 좌측 선택 항목을 우측으로 이동
    - `Move All Right` (`>>`): 좌측 전체 항목을 우측으로 이동
    - `Move Left` (`<`): 우측 선택 항목을 좌측으로 이동
    - `Move All Left` (`<<`): 우측 전체 항목을 좌측으로 이동
- `List Header`: 각 리스트 박스 상단의 타이틀, 전체 선택 체크박스, 선택된 항목 수 카운터 표시 영역
- `List Search Bar`: 리스트 내부 항목을 실시간 검색/필터링하는 검색 입력 필드
- `Reorder Controls`: (옵션) Target List Box 내 선택된 항목의 순서를 위/아래로 변경하는 우측 순서 제어 버튼 구획 (`Move Up`, `Move Down`)

### 1.2. 형태 및 배치 옵션 (Variants & Placement)

- `Horizontal` (기본): [Source List Box] - [Action Controls] - [Target List Box] 가로 가로 배치
- `Vertical`: 모바일/협소 뷰포트용 세로 적층 배치 ([Source] - [Action Controls] - [Target])

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large`

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)**    | **설명 (Description)**   | **비고 (Remarks)**     |
| ---------------------- | ---------------------- | -------------------- |
| `source-header-slot`   | 좌측 리스트 상단 헤더 커스텀 영역    |                      |
| `target-header-slot`   | 우측 리스트 상단 헤더 커스텀 영역    |                      |
| `item-slot`            | 리스트 내 개별 항목 커스텀 렌더링 영역 | 아이콘, 서브 텍스트, 태그 등 추가 |
| `action-controls-slot` | 중앙 이동 버튼 구획 전체 커스텀 영역  | 커스텀 버튼 디자인 및 레이블 주입  |
| `empty-source-slot`    | 좌측 리스트 데이터 부재 시 표시 영역  |                      |
| `empty-target-slot`    | 우측 리스트 데이터 부재 시 표시 영역  |                      |
| `footer-slot`          | 각 리스트 박스 최하단 커스텀 영역    | 추가 액션, 페이징 등         |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**           | **타입**                    | **기본값**    | **설명**                                |
| ----------------- | ------------------------- | ---------- | ------------------------------------- |
| `source-data`     | `Array<ListItem>`         | `[]`       | 좌측 Source 리스트에 표시될 데이터 배열             |
| `target-data`     | `Array<ListItem>`         | `[]`       | 우측 Target 리스트에 표시될 데이터 배열             |
| `value`           | `Array<string \| number>` | `[]`       | Target 리스트에 위치한 데이터의 key/id 목록        |
| `source-title`    | `string`                  | `'Source'` | 좌측 리스트 상단 타이틀                         |
| `target-title`    | `string`                  | `'Target'` | 우측 리스트 상단 타이틀                         |
| `show-search`     | `boolean`                 | `false`    | 리스트 내 검색 바 노출 여부                      |
| `show-select-all` | `boolean`                 | `true`     | 헤더 내 전체 선택 체크박스 노출 여부                 |
| `show-reorder`    | `boolean`                 | `false`    | Target 리스트 내 순서 변경(Up/Down) 버튼 노출 여부  |
| `disabled`        | `boolean`                 | `false`    | 컴포넌트 전체 비활성화 여부                       |
| `one-way`         | `boolean`                 | `false`    | 단방향 이동 전용 모드 (Target에서 Source로 복귀 불가) |

### 3.2. 상태 (States)

- **Idle**: 기본 상태
- **Item Selected**: 특정 항목(들)이 체크박스 또는 클릭으로 선택된 상태 (이동 버튼 활성화)
- **Hover**: 리스트 항목 및 액션 버튼 마우스 오버 상태
- **Focus / Focus-visible**: 키보드 탐색으로 리스트 항목 또는 버튼에 포커스 진입 상태
- **Disabled Item**: 특정 항목의 선택/이동이 불가능하도록 설정된 상태
- **Disabled Component**: 컴포넌트 전체 비활성화 (모든 버튼 및 리스트 인터랙션 차단)
- **Filtered**: 검색어 입력에 의해 일부 항목만 가시화된 상태

### 3.3. 이벤트 (Events)

| **이벤트명**        | **상세 (Detail)**                                                                            | **발생 시점**                  |
| --------------- | ------------------------------------------------------------------------------------------ | -------------------------- |
| `change`        | `{ sourceData: Array, targetData: Array, movedKeys: Array, direction: 'left' \| 'right' }` | 항목 이동 확정 시 방출              |
| `select-change` | `{ sourceSelectedKeys: Array, targetSelectedKeys: Array }`                                 | 좌/우 리스트 내 항목 선택 체크 변경 시 방출 |
| `search`        | `{ side: 'source' \| 'target', query: string }`                                            | 검색어 입력 시 방출                |
| `reorder`       | `{ targetData: Array, movedKey: string \| number, newIndex: number }`                      | Target 리스트 내 순서 변경 시 방출    |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-transferlist-width: 600px;
  --ui-transferlist-box-width: 250px;
  --ui-transferlist-box-height: 320px;
  --ui-transferlist-item-height: 40px;
  --ui-transferlist-border-radius: 6px;
  --ui-transferlist-gap: 16px;

  /* Colors - Base & Box */
  --ui-transferlist-bg: #ffffff;
  --ui-transferlist-border-color: #d1d5db;
  --ui-transferlist-header-bg: #f9fafb;
  --ui-transferlist-text-color: #111827;

  /* Colors - Item & Interaction */
  --ui-transferlist-item-hover-bg: #f3f4f6;
  --ui-transferlist-item-selected-bg: #eff6ff;
  --ui-transferlist-item-selected-text: #2563eb;

  /* Colors - Action Buttons */
  --ui-transferlist-btn-bg: #ffffff;
  --ui-transferlist-btn-border-color: #d1d5db;
  --ui-transferlist-btn-hover-bg: #f9fafb;
  --ui-transferlist-btn-active-bg: #2563eb;
  --ui-transferlist-btn-active-text: #ffffff;

  /* Colors - Disabled */
  --ui-transferlist-disabled-bg: #f3f4f6;
  --ui-transferlist-disabled-text: #9ca3af;
  --ui-transferlist-disabled-border: #e5e7eb;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="group"`** 또는 **`role="region"`**: TransferList 전체 컨테이너에 바인딩
- **`role="listbox"`**: Source 및 Target 리스트 박스 영역에 각각 바인딩
- **`role="option"`**: 리스트 내 개별 항목에 바인딩
- **`aria-multiselectable="true"`**: 다중 선택 가능함을 명시
- **`aria-selected="true"`**: 선택 상태인 `option` 요소에 바인딩
- **`aria-labelledby`**: 각 리스트 박스 및 액션 버튼의 명확한 용도 안내 바인딩

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab` / `Shift + Tab`**: 좌측 리스트, 이동 버튼들, 우측 리스트 간 순차 포커스 이동
- **`ArrowDown` / `ArrowUp`**: 현재 포커스된 리스트 박스 내에서 항목 간 상/하 이동
- **`Space`**: 포커스된 리스트 항목의 선택(체크) 토글
- **`Ctrl + A` / `Cmd + A`**: 현재 포커스된 리스트 박스 내 전체 항목 선택
- **`Enter`**: 포커스된 항목을 즉시 반대편 리스트로 이동 (또는 선택 확정)

### 5.3. 스크린 리더 대응

- 항목 이동 시 이동된 항목 수와 결과(예: "3개 항목이 우측 선택 리스트로 이동되었습니다.")를 `aria-live="polite"` 영역을 통해 실시간 대화형으로 전달하고, 리스트 헤더의 카운터를 동적 갱신하여 전체/선택 상태를 명확히 음성 안내합니다.
---

위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`TransferList.ts`)과 전용 Lit 스타일시트(`TransferList.css.ts`) 코드를 작성해 주세요.

[작성 조건 - TransferList.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `TransferListTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.

[작성 조건 - TransferList.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const transferListStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-transfer-list-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-transfer-list`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/TransferList/TransferList.ts`, `src/components/TransferList/TransferList.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`TransferList.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - TransferList.wc.ts]
1. `LitElement`를 상속받아 클래스를 구현하고, `@customElement('biz-transfer-list')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `TransferListTemplate` 및 `TransferList.css.ts`의 `transferListStyles`를 임포트하세요.
3. 정적 클래스 속성으로 `static styles = transferListStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `TransferListTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/TransferList/TransferList.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`TransferList.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - TransferList.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `TransferListWc` 클래스와 커스텀 엘리먼트 태그명(`biz-transfer-list`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/TransferList/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`TransferListTemplate`), 스타일(`transferListStyles`), 웹 컴포넌트 클래스(`TransferListWc`), React 래퍼 컴포넌트(`TransferList`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/TransferList/TransferList.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/TransferList/TransferList.react.ts`, `src/components/TransferList/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 및 테스트 코드 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 및 테스트 코드 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`TransferList.stories.ts`)과 단위/통합 테스트 파일(`TransferList.test.ts`) 코드를 작성해 주세요.

[작성 조건 - TransferList.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
3. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
4. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.

[작성 조건 - TransferList.test.ts]
1. Vitest 및 Playwright 환경에서 실행 가능한 테스트 스위트를 구현하세요.
2. [단위 테스트]: Properties 변경에 따른 DOM 반영, 3.3절 커스텀 이벤트(`input`, `change`, `clear` 등) 방출 여부 및 `detail` 데이터 검증을 수행하세요.
3. [통합 및 접근성 테스트]: 5.1절 ARIA 속성(`aria-invalid`, `aria-describedby` 등) 바인딩 및 5.2절 키보드 네비게이션(`Tab`, `Escape`, `Enter` 등) 동작을 브라우저 상에서 검증하는 시나리오를 구현하세요.

[출력 형식]
- 각 파일별 경로(`src/components/TransferList/TransferList.stories.ts`, `src/components/TransferList/TransferList.test.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
