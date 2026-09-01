## DataGrid 코드 생성을 위한 순차적 프롬프트 작성 체인

### 1단계: 컨텍스트 및 요구사항 전달 프롬프트 (Prompt 1)

```
[역할 정의]
당신은 DataGrid 라이브러리의 웹 컴포넌트 전문 개발자입니다. 
제공하는 요구사항 정의서를 바탕으로 DataGrid 표준 개발 규격을 엄격히 준수하여 코드 생성을 준비하세요.

[DataGrid 개발 컨벤션]
1. 디렉터리 구조: 모든 파일은 `src/components/DataGrid/Grid{ComponentName}/` 아래에 위치합니다.
2. 표준 파일 구성 (4종):
   - Grid{ComponentName}.ts (코어 Lit 템플릿)
   - Grid{ComponentName}.css.ts (컴포넌트 전용 스타일)
   - Grid{ComponentName}.wc.ts (LitElement 기반 웹 컴포넌트 클래스)
   - Grid{ComponentName}.stories.ts (Storybook 문서)
3. 네임스페이스 및 명명 규칙:
   - 커스텀 엘리먼트 태그명: `grid-{component-name}` (예: grid-input)
   - CSS Design Token / Custom Properties: `--grid-{component-name}-*` (예: --grid-input-height-md)
   - 루트 CSS 클래스명: `grid-{component-name}`
   - Lit 코어 템플릿 export 명칭: `Grid{ComponentName}Template`
   - 템플릿 함수 파라미터 host의 인터페이스 export 명칭:`Grid{ComponentName}Host` 
   - Lit 스타일 export 변수명: `export const Grid{componentNameCamel}Styles = css`...`

[작성 대상 컴포넌트 정보]
- 컴포넌트 명칭 (PascalCase): Grid{ComponentName}
- 커스텀 엘리먼트 태그명 (kebab-case): grid-{component-name}

[요구사항 정의서]
---
{requirementsDoc}
---

현 단계는 1단계입니다. 위 컨텍스트와 요구사항을 완벽히 이해했음을 확인하고, 2단계(코어 템플릿 및 스타일 생성) 진행 준비가 되었음을 알려주세요. 아직 코드를 작성하지 마세요.

```

### 2단계: 코어 템플릿 및 스타일 생성 프롬프트 (Prompt 2)

```
[요청 사항]
1단계에서 전달받은 요구사항 정의서를 바탕으로 DataGrid 컴포넌트의 코어 템플릿(`Grid{ComponentName}.ts`)과 전용 스타일시트(`Grid{ComponentName}.css`) 코드를 작성해 주세요.

[작성 조건 - Grid{ComponentName}.ts]
1. Lit의 html 태그드 템플릿을 사용하는 순수 함수 템플릿 형태로 구현하세요.
2. 템플릿 함수는 `Grid{ComponentName}Template` 명칭으로 export 하세요.
3. 요구사항 정의서 2절의 슬롯 명세를 올바르게 배치하세요.
4. 속성(Properties), 상태(States), 이벤트 핸들러 바인딩 구조를 템플릿 내에 반영하세요.
5. 템플릿 함수의 파라미터명은 'host'를 사용하고, host타입을 인터페이스로 작성해주세요. 
6. host타입은 `Grid{ComponentName}Host` 명칭으로 export 하세요.

[작성 조건 - Grid{ComponentName}.css.ts]
1. `:host` 블록 내에 `--grid-{component-name}-*` 형태의 CSS Custom Properties(디자인 토큰)를 기본값과 함께 정의하세요.
2. 루트 클래스명은 `grid-{component-name}`으로 지정하세요.
3. 요구사항 정의서 1.2절의 Variants 스타일을 작성하세요.
4. 요구사항 정의서 1.3절의 Sizes 규격 스타일을 작성하세요.
5. 요구사항 정의서 3.2절의 States 시각 효과를 반영하세요.

[출력 형식]
- 파일별 경로(`src/components/DataGrid/Grid{ComponentName}/Grid{ComponentName}.ts`, `src/components/Grid{ComponentName}/Grid{ComponentName}.css.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 3단계(웹 컴포넌트 클래스 생성) 진행 준비가 되었음을 알려주고 대기하세요.

```

### 3단계: 웹 컴포넌트 클래스 생성 프롬프트 (Prompt 3)

```
[요청 사항]
1단계의 요구사항 정의서와 2단계에서 작성된 코어 템플릿/host타입/스타일을 바탕으로 웹 컴포넌트 클래스 파일(`Grid{ComponentName}.wc.ts`) 코드를 작성해 주세요.

[작성 조건 - Grid{ComponentName}.wc.ts]
1. `LitElement`를 상속받고, 2단계에서 생성한 `Grid{ComponentName}Host`를 implements 하여 클래스를 구현하고, `@customElement('grid-{component-name}')` 디코레이터를 사용하여 커스텀 엘리먼트로 등록하세요.
2. 2단계에서 생성한 `Grid{ComponentName}Template`과 `Grid{ComponentName}Styles`를 임포트하여 `render()` 메서드 및 `styles` 정적 속성에 연결하세요. `Grid{ComponentName}Host`를 type 임포트하세요.
3. 요구사항 정의서 3.1절의 속성(Properties/Attributes)을 Lit의 `@property` 및 `@state` 디코레이터로 정의하세요.
4. 요구사항 정의서 3.3절의 이벤트를 발생시키는 내부 이벤트 핸들러 및 `CustomEvent` 방출 메서드를 구현하세요. (`bubbles: true`, `composed: true`, `detail` 객체 구성 준수)

[출력 형식]
- 파일 경로(`src/components/DataGrid/Grid{ComponentName}/Grid{ComponentName}.wc.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 코드를 작성한 후 4단계(Storybook 생성) 진행 준비가 되었음을 알려주고 대기하세요.

```

### 4단계: Storybook 생성 프롬프트 (Prompt 4)

```
[요청 사항]
1~3단계에서 작성된 코드와 요구사항 정의서를 바탕으로 컴포넌트 품질 관리를 위한 Storybook 문서 파일(`Grid{ComponentName}.stories.ts`) 코드를 작성해 주세요.

[작성 조건 - Grid{ComponentName}.stories.ts]
1. Storybook v7+ CSF 3.0 명세를 준수하여 기본 Meta 및 Stories를 구현하세요.
2. 컴포넌트의 Host 속성 타입(e.g., `Grid{ComponentName}Host`)에 `Required<T>`를 적용하여 모든 프로퍼티를 필수화한 후, Slot 관련 컨트롤 키를 추가한 `Args` 타입을 정의하세요.
3. `Args` 타입을 Meta와 StoryObj 의 제네릭 타입으로 사용하시오.
4. 요구사항 정의서 3.2절의 주요 States를 시연하는 Story를 작성하세요.
5. Meta의 title을 `DataGrid/Grid{ComponentName}` 로 지정하시오.
6. 3단계에서 작성한 Grid{ComponentName}.wc.ts에서 dispatchEvent 를 분석하여 각 이벤트에 대한 story를 작성하세요. action()말고 fn() 을 사용하세요. `import { fn } from 'storybook/test'`

[출력 형식]
- 파일 경로(`src/components/DataGrid/Grid{ComponentName}/Grid{ComponentName}.stories.ts`)를 명시하고 해당 코드 블록만 출력하세요.
- 모든 코드 작성이 완료되면 전체 개발 공정이 성공적으로 종료되었음을 최종 안내해 주세요.

```