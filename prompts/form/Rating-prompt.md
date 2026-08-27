# Rating Biz-UI 웹 컴포넌트 개발 프롬프트 체인

---

## [Prompt 1] 1단계: 컨텍스트 및 요구사항 전달 프롬프트

````text
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/Rating/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - Rating.ts (코어 Lit 템플릿)
   - Rating.css.ts (Lit css 태그드 템플릿 기반 전용 스타일)
   - Rating.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - Rating.react.ts (@lit/react 기반 React 래퍼)
   - Rating.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-rating`
   - Lit 엘리먼트 클래스명: `BizRating`
   - CSS Design Token / Custom Properties: `--biz-rating-*`
   - 루트 CSS 클래스명: `biz-rating`
   - Lit 코어 템플릿 export 명칭: `RatingTemplate`
   - 템플릿 함수 파라미터 'host'의 인터페이스 export 명칭:`RatingHost` 
   - Lit 스타일 export 변수명: `export const ratingStyles = css`...``
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): BizRating
- 커스텀 엘리먼트 태그명 (kebab-case): biz-rating
- Lit 스타일 변수명 (camelCase): ratingStyles

[요구사항 정의서]
---
# Rating 요구사항 정의서

지정된 개수의 아이콘(기본: 별 모양)이 연속 배치되어 마우스 호버 또는 터치/클릭을 통해 평점 수치를 선택하거나 조회하는 컴포넌트를 제공
## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Rating Track`: 설정된 최대 점수(`max`) 개수만큼 아이콘이 가로로 연속 배치되는 컨테이너
- `Rating Item (Icon)`: 평점을 나타내는 개별 아이콘 (기본값: 별 모양 `Star`)
- `Filled Layer`: 현재 선택되거나 호버된 평점 수치만큼 채워진 상태를 시각적으로 보여주는 레이어
- `Empty Layer`: 채워지지 않은 기본 상태의 배경 아이콘 레이어
- `Value Label`: (옵션) 현재 선택되거나 호버 중인 평점 수치를 수치 텍스트(예: `4.5 / 5`)로 표출하는 레이어

### 1.2. 단위 선택 모드 (Precision Modes)

- `Full Star (1.0)`: 아이콘 1개 단위로 평점 선택 (정수 단위)
- `Half Star (0.5)`: 아이콘 반개 단위로 평점 선택 (0.5 단위)
- `Exact / Fractional`: 읽기 전용 모드 등에서 소수점 단위(예: `3.7`)의 세밀한 채움 비율 표시

### 1.3. 크기 옵션 (Sizes)

- `Small` / `Medium` / `Large` / `Custom Size`

### 1.4. 사용 형태 (Variants)

- `Interactive`: 마우스 호버 및 클릭/터치 조작을 통해 값을 변경하는 입력용 모드
- `Read-only / Display`: 변경 불가능하며 수치 조회 목적으로만 사용하는 노출 전용 모드

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**       | **비고 (Remarks)** |
| ------------------- | -------------------------- | ---------------- |
| `icon-filled-slot`  | 채워진 상태의 커스텀 아이콘 주입 영역      | 하트, 엄지 등         |
| `icon-empty-slot`   | 비어있는 상태의 커스텀 아이콘 주입 영역     |                  |
| `icon-half-slot`    | (옵션) 반개 채워진 상태의 커스텀 아이콘 영역 |                  |
| `value-label-slot`  | 평점 수치 텍스트 표출 커스텀 영역        | 예: "4.5점 / 5.0점" |
| `helper-text-slot`  | 하단 안내/에러 메시지 영역            |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**        | **타입**    | **기본값** | **설명**                              |
| -------------- | --------- | ------- | ----------------------------------- |
| `value`        | `number`  | `0`     | 현재 설정된 평점 값                         |
| `max`          | `number`  | `5`     | 표시할 최대 아이콘 개수 및 점수                  |
| `precision`    | `number`  | `1`     | 선택 단위 (`1`: Full, `0.5`: Half, 소수점) |
| `allow-clear`  | `boolean` | `false` | 이미 선택된 점수 재클릭 시 `0`점으로 초기화 허용 여부    |
| `readonly`     | `boolean` | `false` | 읽기 전용 상태 여부 (호버/클릭 인터랙션 비활성화)       |
| `disabled`     | `boolean` | `false` | 비활성화 상태 여부 (Dim 처리 및 입력 차단)         |
| `show-tooltip` | `boolean` | `false` | 아이콘 호버 시 점수 툴팁 노출 여부                |
| `size`         | `string`  | `'md'`  | 아이콘 크기 (`'sm'`, `'md'`, `'lg'`)     |
| `name`         | `string`  | `null`  | 폼 제출 시 사용할 input name               |

### 3.2. 상태 (States)

- **Idle (Default)**: 설정된 `value` 상태로 유휴 중인 기본 상태
- **Hover**: 마우스 오버로 임시 평점 수치가 예비 강조(Preview) 표시되는 상태
- **Focus / Focus-visible**: 키보드 조작을 위해 컴포넌트에 포커스가 진입한 상태 (포커스 링 표시)
- **Disabled**: 비활성화 상태 (클릭/호버 차단, Dim 처리)
- **Readonly**: 읽기 전용 상태 (현재 값 표시 유지, 클릭/호버 차단)

### 3.3. 이벤트 (Events)

| **이벤트명**       | **상세 (Detail)**     | **발생 시점**                                         |
| -------------- | ------------------- | ------------------------------------------------- |
| `change`       | `{ value: number }` | 클릭 또는 키보드 조작으로 평점 선택 확정 시 방출                      |
| `hover-change` | `{ value: number }` | 마우스 호버로 예비 수치가 변경될 때 방출 (마우스 이탈 시 현재 `value`로 복귀) |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-rating-icon-size-sm: 16px;
  --ui-rating-icon-size-md: 24px;
  --ui-rating-icon-size-lg: 32px;
  --ui-rating-gap: 4px;

  /* Colors - Icon */
  --ui-rating-filled-color: #f59e0b; /* Amber 500 */
  --ui-rating-empty-color: #e5e7eb;  /* Gray 200 */
  --ui-rating-hover-color: #fbbf24;  /* Amber 400 */

  /* Colors - Interactive & States */
  --ui-rating-focus-ring-color: rgba(245, 158, 11, 0.4);
  --ui-rating-disabled-filled-color: #d1d5db;
  --ui-rating-disabled-empty-color: #f3f4f6;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="slider"`** 또는 **`role="radiogroup"`**: 전체 컨테이너에 바인딩 (`slider` 역할 권장)
- **`aria-valuenow`**: 현재 바인딩된 평점 수치 동적 연동
- **`aria-valuemin`**: `0` 지정
- **`aria-valuemax`**: `max` 속성 값 지정
- **`aria-valuetext`**: 포맷팅된 수치 텍스트 전달 (예: "별점 5점 만점에 4.5점")
- **`aria-readonly="true"`**: `readonly` 상태 시 바인딩
- **`aria-disabled="true"`**: `disabled` 상태 시 바인딩
- **`aria-label`** 또는 **`aria-labelledby`**: 컴포넌트의 용도(예: "상품 평점 선택") 안내

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`ArrowRight` / `ArrowUp`**: `precision` 단위만큼 평점 수치 증가
- **`ArrowLeft` / `ArrowDown`**: `precision` 단위만큼 평점 수치 감소
- **`Home`**: 최소 평점 수치(`0` 또는 `precision` 최소값)로 변경
- **`End`**: 최대 평점 수치(`max`)로 변경

### 5.3. 스크린 리더 대응

- 키보드로 점수 변경 시 `aria-valuenow` 및 `aria-valuetext` 변경 사항을 스크린 리더가 즉시 음성으로 안내하며, 읽기 전용 모드에서는 정적 텍스트로 전체 만점 대비 현재 평점을 명확히 전달합니다.
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 다음 단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
````

---

## [Prompt 2] 2단계: 코어 템플릿 및 스타일 생성 프롬프트

````text
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`Rating.ts`)과 전용 Lit 스타일시트(`Rating.css.ts`) 코드를 작성해 주세요.

[작성 조건 - Rating.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `RatingTemplate` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `RatingHost` 명칭으로 export 하세요.

[작성 조건 - Rating.css.ts]
1. `import { css } from 'lit';` 구문을 작성하세요.
2. 스타일은 `export const ratingStyles = css`...`` 형태의 Lit css 태그드 템플릿 모듈로 생성하세요.
3. `:host` 블록 내에 `--biz-rating-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
4. 루트 클래스명은 `biz-rating`으로 지정하세요.
5. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
6. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
7. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/Rating/Rating.ts`, `src/components/Rating/Rating.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 3] 3단계: 웹 컴포넌트 클래스 생성 프롬프트

````text
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`Rating.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - Rating.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `RatingHost`를 implements 하여  클래스를 구현하고, `@customElement('biz-rating')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `RatingTemplate` 및 `Rating.css.ts`의 `ratingStyles`를 임포트하세요. `RatingHost`를 type 임포트하세요.
3. 정적 클래스 속성으로 `static styles = ratingStyles;` 구문을 사용하여 스타일을 연결하고, `render()` 메서드에 `RatingTemplate`을 바인딩하세요.
4. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
5. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
6. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
7. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/Rating/Rating.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 4] 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트

````text
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`Rating.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - Rating.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `RatingWc` 클래스와 커스텀 엘리먼트 태그명(`biz-rating`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/Rating/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`RatingTemplate`), 스타일(`ratingStyles`), 웹 컴포넌트 클래스(`RatingWc`), React 래퍼 컴포넌트(`Rating`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/Rating/Rating.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/Rating/Rating.react.ts`, `src/components/Rating/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 생성 프롬프트) 진행 준비가 되었음을 알려주고 대기하세요.
````

---

## [Prompt 5] 5단계: Storybook 생성 프롬프트

````text
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`Rating.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - Rating.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `RatingHost`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.
7. 3단계에서 작성한 Rating.ws.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요.. action()말고 fn() 을 사용하세요.

[출력 형식]
- 파일 경로(`src/components/Rating/Rating.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
````
