# Biz-UI 웹 컴포넌트

Biz-UI는 백오피스용 웹 컴포넌트 라이브러리입니다.

## 프로젝트를 구성하는 라이브러리

* Lit
* TypeScript
* Vite
* Storybook
* Vitest

## clone 후 npm 설치 방법

install을 할 때 `--legacy-peer-deps` 옵션을 붙여줘야합니다. 

```sh
$ npm install --legacy-peer-deps
```

## 🏭 개발 공정

반드시 숙지하고 상세 내용은 `biz-ui-skill.md` 파일을 참고하십시오

## 🧬 biz-ui 프롬프트 생성기

프롬프트 형태의 AI 도구 지원을 위해 `propmts/generate-prompt.js` 생성기가 마련되어있습니다. 자세한 설명은 생략합니다.

```sh
# 실행방법
$ cd prompts
$ node generate-prompt.js [컴포넌트명]
```
## 📚 Storybook

작성된 웹 컴포넌트의 문서 사양서 대안으로 Stroybook을 사용합니다. 별도의 문서는 제공되지 않습니다.

```sh
$ npm run storybook
```

## 🏗️ 빌드

신규 추가 컴포넌트가 있을 경우, 빌드 전 src/generate-index.js 를 실행하여 components 내의 index.ts 파일을 업데이트 해줍니다. 

```sh
# 실행방법, (프로젝트 루트에서)
$ node src/generate-index.js 
```

빌드 과정에서 코어 라이브러리와 프레임워크 전용 래퍼(React)에 대한 진입점이 각각 생성됩니다.

- 순수 웹 컴포넌트: bizui-library/index: 순수 웹 컴포넌트
- React 래퍼: bizui-library/react

```json
  "scripts": {
    "build": "npm run build:vanilla && npm run build:react && npm run build:types ",
    "build:vanilla": "vite build",
    "build:react": "vite build --config vite.config.react.ts",
    "build:types": "tsc",
  },
```

## 🛖 index.html

storybook 없이 html 에서 사용하는 방법은 index.html 파일을 참고하십시오. Lit 라이브러리는 build 파일과 별개로 추가해주어야 합니다. 

```html
<script type="importmap">
  {
    "imports": {
      "lit": "https://esm.run/lit",
      "lit/directives/repeat.js": "https://esm.run/lit/directives/repeat.js"
    }
  }
</script>
```

## 📌 주요 파일

- package.json: 프로젝트 메타데이터, 의존성 및 스크립트를 정의합니다.
- tsconfig.json: TypeScript 컴파일러를 설정합니다.
- vite.config.ts (명시되진 않았으나 Vite 사용 시 존재): Vite 빌드 도구 설정 파일입니다.
- .storybook/main.ts: Storybook 스토리 위치 및 애드온 설정 파일입니다.
- .storybook/preview.ts: Storybook 전역 파라미터 및 데코레이터 설정 파일입니다.
- vitest.config.ts: 브라우저 테스트 설정을 포함한 Vitest 설정 파일입니다.
- src/index.ts: 모든 컴포넌트를 내보내는 메인 진입점 파일입니다.