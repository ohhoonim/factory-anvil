## Biz-UI 코드 생성을 위한 순차적 프롬프트 작성 체인

요약 목록

1. 컨텍스트 및 요구사항 주입 (Prompt 1): 개발 표준 컨벤션과 작성된 요구사항 정의서 전달
2. 코어 템플릿 및 스타일 작성 (Prompt 2): `ComponentName.ts` 및 `ComponentName.css` 생성
3. 웹 컴포넌트 클래스 작성 (Prompt 3): `ComponentName.wc.ts` (LitElement 및 ARIA/이벤트 연동) 생성
4. React 래퍼 및 모듈 내보내기 작성 (Prompt 4): `ComponentName.react.ts`, `index.ts`, `src/react.ts` 생성
5. Storybook 작성 (Prompt 5): `ComponentName.stories.ts` 

### 1단계: 컨텍스트 및 요구사항 전달 프롬프트 (Prompt 1)

* 목적: Biz-UI 개발 컨벤션 및 대상 컴포넌트의 요구사항 정의서 전달
* 프롬프트 구성 항목:
    * 역할 정의 (Biz-UI 웹 컴포넌트 전문 개발자)
    * 파일 구조 및 디렉터리 생성 규칙 명시 (`src/components/ComponentName/`)
    * 네임스페이스 규칙 명시 (`biz-component-name`, `--biz-component-name-*`)
    * 작성된 요구사항 정의서 전문 입력

```
[역할 정의]
당신은 Biz-UI 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 Biz-UI 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[Biz-UI 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/{ComponentName}/` 아래에 위치합니다.
2. 표준 파일 구성 (7종):
   - {ComponentName}.ts (코어 Lit 템플릿)
   - {ComponentName}.css.ts (컴포넌트 전용 스타일)
   - {ComponentName}.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - {ComponentName}.react.ts (@lit/react 기반 React 래퍼)
   - {ComponentName}.stories.ts (Storybook 문서 및 a11y 검증)
   - index.ts (통합 export)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `biz-{component-name}` (예: biz-input)
   - CSS Design Token / Custom Properties: `--biz-{component-name}-*` (예: --biz-input-height-md)
   - 루트 CSS 클래스명: `biz-{component-name}`
   - Lit 코어 템플릿 export 명칭: `{ComponentName}Template`
   - 템플릿 함수 파라미터 host의 인터페이스 export 명칭:`{ComponentName}Host` 
   - Lit 스타일 export 변수명: `export const {componentNameCamel}Styles = css`...`
   - React Event Handler 매핑: Custom Event `clear` -> React Prop `onClear`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): {ComponentName}
- 커스텀 엘리먼트 태그명 (kebab-case): biz-{component-name}

[요구사항 정의서]
---
{여기에 요구사항 정의서 전문을 입력하세요}
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 2단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.
```

### 2단계: 코어 템플릿 및 스타일 생성 프롬프트 (Prompt 2)

* 목적: Phase 3의 1단계 코어 템플릿 및 CSS 작성
* 프롬프트 구성 항목:
    * `ComponentName.ts` 생성 요청 (순수 Lit 템플릿, `ComponentNameTemplate` 내보내기)
    * `ComponentName.css` 생성 요청 (`:host` 내 `--biz-component-name-*` 토큰 정의, Variants 및 Sizes 스타일 정의)
    * 정의서에 명시된 슬롯(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot`) 구조 반영 요청

```
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 Biz-UI 컴포넌트의 코어 템플릿(`{ComponentName}.ts`)과 전용 스타일시트(`{ComponentName}.css`) 코드를 작성해 주세요.

[작성 조건 - {ComponentName}.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `{ComponentName}Template` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세(`label-slot`, `start-slot`, `end-slot`, `helper-text-slot` 등)를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `{ComponentName}Host` 명칭으로 export 하세요.

[작성 조건 - {ComponentName}.css.ts]
1. `:host` 블록 내에 `--biz-{component-name}-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
2. 루트 클래스명은 `biz-{component-name}`으로 지정하세요.
3. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 스타일을 작성하세요.
4. 요구사항 정의서 1.3절의 Sizes(`Small`, `Medium`, `Large`) 규격 스타일을 작성하세요.
5. 요구사항 정의서 3.2절의 States(`Hover`, `Focus`, `Active`, `Disabled`, `Readonly`, `Error`, `Loading` 등) 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/{ComponentName}/{ComponentName}.ts`, `src/components/{ComponentName}/{ComponentName}.css`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.
```

### 3단계: 웹 컴포넌트 클래스 생성 프롬프트 (Prompt 3)

* 목적: Phase 3의 2단계 웹 컴포넌트 등록 및 속성/상태/이벤트 바인딩
* 프롬프트 구성 항목:
    * `ComponentName.wc.ts` 생성 요청 (`LitElement` 상속 클래스)
    * `@customElement('biz-component-name')` 태그 등록
    * Properties/Attributes (`value`, `disabled`, `error` 등) 및 reactive state 설정
    * Custom Event 방출 로직 및 Detail 객체 구성 (`input`, `change`, `clear` 등)
    * ARIA 속성 자동 연동 (`aria-invalid`, `aria-describedby` 등) 및 키보드 인터랙션 구현

```
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/host타입/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`{ComponentName}.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - {ComponentName}.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `{ComponentName}Host`를 implements 하여  클래스를 구현하고,  `@customElement('biz-{component-name}')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `{ComponentName}Template`과 `{ComponentName}.css`를 임포트하여 `render()` 메서드 및 `styles` 정적 속성에 연결하세요. `{ComponentName}Host`를 type 임포트하세요..
3. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
4. 요구사항 정의서 3.3절의 이벤트(`input`, `change`, `clear` 등)를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)
5. 요구사항 정의서 5.1절의 ARIA 속성 바인딩(`aria-invalid`, `aria-required`, `aria-describedby`, `aria-disabled` 등)을 렌더링 로직 및 섀도 DOM 내부 엘리먼트에 연동하세요.
6. 요구사항 정의서 5.2절의 키보드 인터랙션(`Tab`, `Escape`, `Enter` 등) 이벤트 리스너를 구현하세요.

[출력 형식]
- 파일 경로(`src/components/{ComponentName}/{ComponentName}.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(React 래퍼 및 모듈 내보내기 작성) 진행 준비가 되었음을 알려주고 대기하세요.
```


### 4단계: React 래퍼 및 모듈 내보내기 생성 프롬프트 (Prompt 4)

* 목적: Phase 4의 프레임워크 바인딩 및 모듈 바인딩
* 프롬프트 구성 항목:
    * `ComponentName.react.ts` 생성 요청 (`@lit/react` `createComponent` 사용)
    * 커스텀 이벤트를 React Event Handler Prop (`onInput`, `onChange`, `onClear`)으로 1:1 매핑
    * `src/components/ComponentName/index.ts` 작성 (컴포넌트, React 래퍼, TypeScript 타입 일괄 export)
    * `src/react.ts`에 새로 생성한 React 래퍼 export 구문 추가 요청

```
[요청 사항]
1~3단계에서 작성된 요구사항 정의서 및 웹 컴포넌트 코드를 바탕으로 React 래퍼 파일(`{ComponentName}.react.ts`), 컴포넌트 통합 모듈(`index.ts`), 그리고 패키지 통합 진입점(`src/react.ts`) 구문을 작성해 주세요.

[작성 조건 - {ComponentName}.react.ts]
1. `@lit/react` 패키지의 `createComponent` 함수를 사용하여 React 컴포넌트를 정의하세요.
2. 3단계에서 생성한 `{ComponentName}Wc` 클래스와 커스텀 엘리먼트 태그명(`biz-{component-name}`)을 연결하세요.
3. 요구사항 정의서 3.3절의 커스텀 이벤트와 React Event Handler Prop(예: `input` -> `onInput`, `change` -> `onChange`, `clear` -> `onClear` 등)을 `events` 옵션 객체에 1:1로 정확히 매핑하세요.

[작성 조건 - index.ts]
1. `src/components/{ComponentName}/index.ts` 경로에 작성하세요.
2. 코어 템플릿(`{ComponentName}Template`), 웹 컴포넌트 클래스(`{ComponentName}Wc`), React 래퍼 컴포넌트(`{ComponentName}`), 그리고 주요 TypeScript Interface/Type들을 모두 export 하세요.

[작성 조건 - src/react.ts]
1. 패키지 루트의 `src/react.ts` 진입점에 신규 생성된 React 래퍼 컴포넌트를 re-export 하는 구문을 작성해 주세요. (예: `export * from './components/{ComponentName}/{ComponentName}.react';`)

[출력 형식]
- 각 파일별 경로(`src/components/{ComponentName}/{ComponentName}.react.ts`, `src/components/{ComponentName}/index.ts`, `src/react.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 5단계(Storybook 및 테스트 코드 생성) 진행 준비가 되었음을 알려주고 대기하세요.
```


### 5단계: Storybook  생성 프롬프트 (Prompt 5)

* 목적: Phase 5 품질 관리 및 검증 코드 생성
* 프롬프트 구성 항목:
    * `ComponentName.stories.ts` 생성 요청 (Variants, Sizes, States 상태별 Story 구성, `@storybook/addon-a11y` 접근성 검증 설정)

```
[요청 사항]
1~4단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`{ComponentName}.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - {ComponentName}.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `{ComponentName}Host`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 \`Args\` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 1.2절의 Variants(`Outlined`, `Filled`, `Standard`) 및 1.3절의 Sizes(`Small`, `Medium`, `Large`)를 시연하는 Story를 작성하세요.
5. 요구사항 정의서 3.2절의 주요 States(`Disabled`, `Readonly`, `Error`, `Loading` 등)를 시연하는 Story를 작성하세요.
6. `@storybook/addon-a11y` 연동을 고려하여 접근성 검증 요소(Label, ARIA 속성 연동 등)가 정상 반영된 Interactive Story를 구성하세요.

[출력 형식]
- 파일 경로(`src/components/{ComponentName}/{ComponentName}.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정(Phase 1~5)이 성공적으로 종료되었음을 최종 안내해 주세요.
```