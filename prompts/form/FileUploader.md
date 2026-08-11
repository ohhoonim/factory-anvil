# FileUploader 요구사항 정의서

파일 탐색기를 통한 파일 선택 버튼 형태와 외부 파일을 직접 끌어다 놓을 수 있는 Drag & Drop Zone 형태를 지원

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Drop Zone`: 파일 드래그 앤 드롭을 수용하는 주요 영역
- `Upload Trigger Button`: OS 파일 탐색기를 호출하는 버튼
- `File List Panel`: 업로드 대기 중이거나 완료된 파일 목록을 표출하는 영역
- `File Item`: 개별 파일의 파일명, 확장자 아이콘, 용량, 삭제 버튼 등을 표출하는 셀
- `Progress Indicator`: 파일 업로드 진행률을 시각적으로 나타내는 프로그레스 바 또는 스피너
- `Error Message Display`: 확장자 불일치, 용량 초과 등 유효성 검사 실패 시 노출되는 가이드 영역

### 1.2. 사용 형태 (Variants)

- `Button Mode`: 단일 버튼 형태로 클릭 시 파일 탐색기만 호출
- `Drop Zone Mode` (기본): 드롭존 구획과 안내 문구, 파일 탐색기 버튼이 통합된 대형 박스 형태
- `Compact / Avatar Mode`: 프로필 이미지 업로드 등에 최적화된 작은 사각형 또는 원형 형태

### 1.3. 크기 및 레이아웃 제어 (Sizes & Properties)

- `Small` / `Medium` / `Large`
- `full-width`: 부모 요소 너비 100% 확장 여부

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)**      | **설명 (Description)**          | **비고 (Remarks)** |
| ------------------------ | ----------------------------- | ---------------- |
| `label-slot`             | 상단/좌측 타이틀 레이블 영역              |                  |
| `drop-zone-content-slot` | Drop Zone 내부 아이콘 및 안내 문구 영역   |                  |
| `file-item-slot`         | 파일 목록 내 개별 항목 커스텀 렌더링 영역      | 커스텀 썸네일, 메타데이터 등 |
| `upload-button-slot`     | 파일 탐색기 호출 버튼 커스텀 영역           |                  |
| `helper-text-slot`       | 하단 안내/제한사항(확장자, 최대용량 등) 표시 영역 |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**       | **타입**                        | **기본값** | **설명**                                         |
| ------------- | ----------------------------- | ------- | ---------------------------------------------- |
| `value`       | `Array<File UploadedFile \|>` | `[]`    | 업로드된 파일 객체 목록                                  |
| `accept`      | `string`                      | `null`  | 허용할 파일 확장자/MIME 타입 (예: `'.png,.jpg,image/*'` ) |
| `multiple`    | `boolean`                     | `false` | 다중 파일 선택/드롭 허용 여부                              |
| `max-size`    | `number`                      | `null`  | 단일 파일 최대 허용 용량 (Byte 단위)                       |
| `max-count`   | `number`                      | `null`  | 업로드 가능한 최대 파일 개수                               |
| `auto-upload` | `boolean`                     | `true`  | 파일 선택 즉시 업로드 처리 실행 여부                          |
| `disabled`    | `boolean`                     | `false` | 컴포넌트 전체 비활성화 여부                                |
| `readonly`    | `boolean`                     | `false` | 읽기 전용 여부 (파일 조회만 가능, 삭제/추가 불가)                 |
| `error`       | `boolean`                     | `false` | 유효성 검사 에러 상태 여부                                |

### 3.2. 상태 (States)

- **Idle (Default)**: 파일 선택 대기 기본 상태
- **Drag Over**: 외부 파일을 Drop Zone 위로 드래그하여 진입한 강조 상태 (Border & BG 강조)
- **Uploading**: 파일 업로드 프로세스 진행 중 상태 (프로그레스 바 및 스피너 표출)
- **Success / Completed**: 파일 추가 및 업로드가 완료된 상태
- **Error / Invalid**: 용량 초과, 확장자 오류, 업로드 실패 등의 에러 상태
- **Disabled / Readonly**: 비활성화 및 읽기 전용 상태

### 3.3. 이벤트 (Events)

| **이벤트명**          | **상세 (Detail)**                                                            | **발생 시점**               |
| ----------------- | -------------------------------------------------------------------------- | ----------------------- |
| `change`          | `{ files: File[] }`                                                        | 파일 목록 추가/삭제 등으로 변경 시 방출 |
| `file-add`        | `{ addedFiles: File[] }`                                                   | 신규 파일이 추가되었을 때 방출       |
| `file-remove`     | `{ removedFile: File \| UploadedFile }`                                    | 특정 파일 삭제 클릭 시 방출        |
| `upload-progress` | `{ file: File, progress: number }`                                         | 파일 업로드 진행 상황 변경 시 방출    |
| `error`           | `{ type: 'size' \| 'extension' \| 'count' \| 'network', message: string }` | 유효성 검사 또는 업로드 실패 시 방출   |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-fileuploader-dropzone-padding: 24px;
  --ui-fileuploader-dropzone-min-height: 160px;
  --ui-fileuploader-border-radius: 8px;
  --ui-fileuploader-item-height: 48px;

  /* Colors - Base & Drop Zone */
  --ui-fileuploader-bg: #ffffff;
  --ui-fileuploader-border-color: #d1d5db;
  --ui-fileuploader-border-style: dashed;
  --ui-fileuploader-text-color: #111827;

  /* Colors - Drag Over & Focus */
  --ui-fileuploader-dragover-bg: #eff6ff;
  --ui-fileuploader-dragover-border-color: #2563eb;
  --ui-fileuploader-focus-ring-color: rgba(37, 99, 235, 0.2);

  /* Colors - File Item & Progress */
  --ui-fileuploader-item-bg: #f9fafb;
  --ui-fileuploader-progress-bar-bg: #2563eb;

  /* Colors - Error & Disabled */
  --ui-fileuploader-error-color: #dc2626;
  --ui-fileuploader-error-bg: #fef2f2;
  --ui-fileuploader-disabled-bg: #f3f4f6;
  --ui-fileuploader-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="button"`**: Drop Zone 전체 또는 파일 선택 영역에 바인딩
- **`aria-dropeffect="copy"`**: 파일 드롭이 가능한 영역임을 명시
- **`aria-describedby`**: 허용 확장자, 최대 용량 등의 안내 문구 요소 ID 연결
- **`aria-invalid="true"`**: 유효성 실패 상태 시 바인딩
- 숨김 처리된 Native `<input type="file">` 요소에 `tabindex="0"`을 적용하여 키보드 접근성 확보

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab` / `Shift + Tab`**: Drop Zone(파일 선택 버튼) 및 파일 목록 내 개별 파일 삭제 버튼으로 포커스 이동
- **`Enter` / `Space`**: Drop Zone 영역에 포커스된 상태에서 실행 시 Native OS 파일 탐색기 창 오픈

### 5.3. 스크린 리더 대응

- 파일 드롭 진입 및 이탈 시 상태 변화를 명확히 음성 출력하도록 구성하며, 파일 추가/업로드 완료/오류 발생 상황을 `aria-live="polite"` 영역을 통해 실시간 알림을 전달합니다. 개별 파일 항목에는 파일명과 용량 정보가 `aria-label`로 묶여 명확하게 읽히도록 처리합니다.