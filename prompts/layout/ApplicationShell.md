# ApplicationShell 요구사항 정의서

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- 웹 애플리케이션의 최상위 구획인 Header, Sidebar, Content, Footer 영역을 관리하는 레이아웃 컴포넌트를 제공한다.

### 1.2. 형태 옵션 (Variants)

- `default`: Header, Sidebar, Content, Footer가 모두 노출되는 기본 애플리케이션 레이아웃
- `full-width`: Sidebar 없이 Header, Content, Footer만 넓게 배치되는 단일 컬럼 레이아웃
- `minimal`: Header/Footer 없이 Main Content 영역 중심의 단순화 레이아웃 (로그인/에러 페이지 등)

### 1.3. 크기 및 규격 옵션 (Sizes)

- `sidebar-width`: Sidebar 영역의 가로 너비 설정 (`collapsed` / `expanded`)
- `header-height`: Header 영역의 고정 높이 설정

### 1.4. 레이아웃 제어 (Layout Properties)

- `sticky-header`: Header 영역 상단 고정 여부 (boolean)
- `fixed-sidebar`: Sidebar 영역 좌측 고정 여부 및 내부 스크롤 적용 여부 (boolean)
- `collapsible-sidebar`: Sidebar 영역 축소/확장 가능 여부 (boolean)

---

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

- Shadow DOM 내부 각 구획으로 HTML 엘리먼트를 주입받는 영역(`<slot>`)을 정의한다.

|   |   |   |
|---|---|---|
|**슬롯명 (Slot Name)**|**설명 (Description)**|**비고 (Remarks)**|
|`header-slot`|상단 네비게이션 및 헤더 영역 주입|`<header>` 태그 연동|
|`sidebar-slot`|좌측 네비게이션 메뉴 영역 주입|`<aside>` 태그 연동|
|`content-slot`|메인 콘텐츠 영역 주입 (필수)|`<main>` 태그 연동|
|`footer-slot`|하단 푸터 영역 주입|`<footer>` 태그 연동|

---

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

|   |   |   |   |
|---|---|---|---|
|**속성명**|**타입**|**기본값**|**설명**|
|`variant`|`string`|`'default'`|레이아웃 형태 (`default`, `full-width`, `minimal`)|
|`sidebar-collapsed`|`boolean`|`false`|사이드바 축소 상태 여부|
|`sticky-header`|`boolean`|`true`|헤더 상단 고정 여부|
|`fixed-sidebar`|`boolean`|`true`|사이드바 고정 여부|

### 3.2. 상태 (States)

- **Sidebar Expanded**: 사이드바 펼침 상태 (기본 가로 너비 유지)
- **Sidebar Collapsed**: 사이드바 접힘 상태 (아이콘 전용 너비로 축소)
- **Mobile Drawer Open / Closed**: 모바일/소형 화면에서의 오버레이 사이드바 열림/닫힘 상태

### 3.3. 이벤트 (Events)

|   |   |   |
|---|---|---|
|**이벤트명**|**상세 (Detail)**|**발생 시점**|
|`sidebar-toggle`|`{ collapsed: boolean }`|사이드바 토글 버튼 클릭 또는 속성 변경 시 방출|
|`breakpoint-change`|`{ breakpoint: string }`|화면 크기 변경으로 인한 반응형 임계점 도달 시 방출|

---

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

- 애플리케이션의 최상위 구획 및 테마를 제어하기 위한 CSS Custom Properties를 정의한다.

```css
:host {
  /* Layout Dimensions */
  --ui-app-shell-header-height: 64px;
  --ui-app-shell-footer-height: 48px;
  --ui-app-shell-sidebar-width: 256px;
  --ui-app-shell-sidebar-collapsed-width: 64px;

  /* Colors */
  --ui-app-shell-bg-color: #f9fafb;
  --ui-app-shell-header-bg: #ffffff;
  --ui-app-shell-sidebar-bg: #1f2937;
  --ui-app-shell-footer-bg: #ffffff;
  --ui-app-shell-border-color: #e5e7eb;

  /* Z-Index Structure */
  --ui-app-shell-header-z-index: 100;
  --ui-app-shell-sidebar-z-index: 90;
  --ui-app-shell-overlay-z-index: 200;
}
```

---

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="banner"`**: `header-slot` 구획에 연동
- **`role="navigation"`**: `sidebar-slot` 구획에 연동
- **`role="main"`**: `content-slot` 구획에 연동
- **`role="contentinfo"`**: `footer-slot` 구획에 연동
- **`aria-expanded`**: `sidebar-collapsed` 속성 상태에 맞춰 토글 버튼 및 사이드바에 연동

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Skip Link` 지원**: 키보드 접근 사용자가 네비게이션을 건너뛰고 메인 콘텐츠 (`role="main"`)로 바로 이동할 수 있는 건너뛰기 링크 인터랙션 제공
- **`Escape`**: 모바일 오버레이 사이드바 모드에서 사이드바 닫기

### 5.3. 스크린 리더 대응

- 각 시맨틱 구획 태그 (`<header>`, `<aside>`, `<main>`, `<footer>`)를 Shadow DOM 내부 고유 구획으로 명확히 할당하여 스크린 리더 탐색성을 확보한다.