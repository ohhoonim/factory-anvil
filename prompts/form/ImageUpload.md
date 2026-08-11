# ImageUpload 요구사항 정의서

이미지 파일을 업로드한 후 시각적 미리보기를 제공하며, 전용 크롭 캔버스/모달을 통해 필요한 영역만 선택·편집할 수 있는 컨테이너를 제공

## 1. 기본 구조 및 레이아웃 (Layout Architecture)

### 1.1. 기본 구성 요소 (Core Elements)

- `Image Drop Zone`: 이미지 파일 드래그 앤 드롭 수용 및 파일 탐색기 트리거 영역
- `Image Preview Area`: 업로드되었거나 편집 완료된 이미지를 시각적으로 보여주는 썸네일 영역
- `Control Overlay`: 썸네일 호버/포커스 시 노출되는 편집(Crop), 확대/재미리보기(Preview), 삭제(Delete) 액션 버튼 구획
- `Crop Modal / Canvas Dialog`: 이미지 크롭 및 편집을 진행하는 전용 레이어 패널
- `Crop Canvas`: 선택 박스(Cropper Box) 조정, 이동, 확대/축소, 회전 작업을 수행하는 메인 인터랙션 영역
- `Crop Control Toolbar`: 비율(Aspect Ratio) 설정, 회전(Rotate), 반전(Flip), 자르기 완료/취소 버튼으로 구성된 툴바

### 1.2. 형태 및 레이아웃 모드 (Variants)

- `Square / Rectangle Mode` (기본): 사각형 썸네일 및 크롭 영역 제공
- `Circle / Avatar Mode`: 프로필 이미지용 원형 마스크 프레임 및 원형 크롭 영역 제공
- `Custom Ratio Mode`: 자유 비율 또는 고정 비율(예: 16:9, 4:3 등) 크롭 지원

### 1.3. 크기 및 레이아웃 제어 (Sizes & Properties)

- `Small` / `Medium` / `Large` / `Custom Width & Height`
- `shape`: `square`, `circle`

## 2. 슬롯 및 하위 구성 (Slot System & Sub-components)

| **슬롯명 (Slot Name)** | **설명 (Description)**            | **비고 (Remarks)** |
| ------------------- | ------------------------------- | ---------------- |
| `label-slot`        | 상단/좌측 타이틀 레이블 영역                |                  |
| `drop-zone-slot`    | 이미지 업로드 대기 상태의 커스텀 가이드 영역       |                  |
| `preview-mask-slot` | 이미지 썸네일 상단 호버 오버레이 커스텀 영역       |                  |
| `crop-toolbar-slot` | 크롭 모달 내 하단 툴바 커스텀 컨트롤 영역        |                  |
| `crop-footer-slot`  | 크롭 모달 하단 확정/취소 버튼 구획 커스텀 영역     |                  |
| `helper-text-slot`  | 하단 안내/제한사항(확장자, 권장 해상도 등) 표시 영역 |                  |

## 3. 컴포넌트 API 및 상태 (Properties, States & Events)

### 3.1. 속성 (Properties / Attributes)

| **속성명**          | **타입**                         | **기본값**                             | **설명**                                                     |
| ---------------- | ------------------------------ | ----------------------------------- | ---------------------------------------------------------- |
| `value`          | `string \| File \| CropResult` | `null`                              | 현재 업로드/편집 완료된 이미지 (URL 또는 File/Blob 객체)                    |
| `accept`         | `string`                       | `'image/jpeg,image/png,image/webp'` | 허용할 이미지 MIME 타입                                            |
| `max-size`       | `number`                       | `null`                              | 단일 이미지 최대 허용 용량 (Byte 단위)                                  |
| `aspect-ratio`   | `number`                       | `null`                              | 크롭 가로/세로 고정 비율 (예: `1` = 1:1, `1.777` = 16:9, `null` = 자유) |
| `shape`          | `string`                       | `'square'`                          | 썸네일 및 마스크 형태 (`'square'`, `'circle'`)                      |
| `enable-crop`    | `boolean`                      | `true`                              | 파일 선택 후 크롭 모달 자동 실행 여부                                     |
| `output-type`    | `string`                       | `'blob'`                            | 편집 완료 후 결과물 반환 타입 (`'blob'`, `'file'`, `'base64'`)         |
| `output-quality` | `number`                       | `0.92`                              | 크롭 압축 품질 (`0` ~ `1`)                                       |
| `disabled`       | `boolean`                      | `false`                             | 비활성화 여부                                                    |
| `readonly`       | `boolean`                      | `false`                             | 읽기 전용 여부 (미리보기만 가능, 편집/삭제 불가)                              |
| `error`          | `boolean`                      | `false`                             | 유효성 검사 에러 상태 여부                                            |

### 3.2. 상태 (States)

- **Empty (Default)**: 이미지 미선택 상태 (업로드 드롭존 노출)
- **Drag Over**: 이미지 파일을 드롭존 위로 드래그하여 진입한 강조 상태
- **Image Loaded / Selected**: 이미지가 업로드되어 미리보기 썸네일이 활성화된 상태
- **Cropping**: 전용 크롭 모달이 열려 사용자가 영역을 편집 중인 상태
- **Processing**: 크롭 연산 및 이미지 변환/업로드 처리 중 상태 (스피너 표출)
- **Disabled / Readonly**: 비활성화 및 읽기 전용 상태
- **Error**: 허용되지 않은 이미지 포맷, 용량 초과, 크롭 처리 실패 상태

### 3.3. 이벤트 (Events)

| **이벤트명**        | **상세 (Detail)**                                                   | **발생 시점**                     |
| --------------- | ----------------------------------------------------------------- | ----------------------------- |
| `change`        | `{ file: File \| Blob, url: string, cropData: Object }`           | 이미지 선택 및 크롭 완료 시 방출           |
| `crop-start`    | `{ rawFile: File }`                                               | 크롭 모달이 열릴 때 방출                |
| `crop-complete` | `{ croppedResult: CropResult }`                                   | 크롭 모달에서 '확인'을 눌러 편집이 확정될 때 방출 |
| `crop-cancel`   | `void`                                                            | 크롭 모달에서 '취소'를 눌렀을 때 방출        |
| `remove`        | `void`                                                            | 이미지 삭제 버튼 클릭 시 방출             |
| `error`         | `{ type: 'size' \| 'extension' \| 'corrupted', message: string }` | 파일 검증 또는 이미지 로딩 실패 시 방출       |

## 4. 스타일링 및 디자인 토큰 (Styling & CSS Variables)

```CSS
:host {
  /* Layout & Sizing */
  --ui-imageupload-width-sm: 100px;
  --ui-imageupload-height-sm: 100px;
  --ui-imageupload-width-md: 160px;
  --ui-imageupload-height-md: 160px;
  --ui-imageupload-width-lg: 240px;
  --ui-imageupload-height-lg: 240px;
  --ui-imageupload-border-radius: 8px;
  --ui-imageupload-crop-modal-width: 600px;

  /* Colors - Base & Drop Zone */
  --ui-imageupload-bg: #ffffff;
  --ui-imageupload-border-color: #d1d5db;
  --ui-imageupload-border-style: dashed;
  --ui-imageupload-text-color: #111827;

  /* Colors - Hover & Overlay */
  --ui-imageupload-dragover-bg: #eff6ff;
  --ui-imageupload-dragover-border-color: #2563eb;
  --ui-imageupload-overlay-bg: rgba(0, 0, 0, 0.5);
  --ui-imageupload-overlay-btn-color: #ffffff;

  /* Colors - Crop Canvas & Mask */
  --ui-imageupload-crop-bg: #000000;
  --ui-imageupload-crop-mask-bg: rgba(0, 0, 0, 0.6);
  --ui-imageupload-crop-grid-color: rgba(255, 255, 255, 0.4);

  /* Colors - Error & Disabled */
  --ui-imageupload-error-color: #dc2626;
  --ui-imageupload-disabled-bg: #f3f4f6;
  --ui-imageupload-disabled-text-color: #9ca3af;
}
```

## 5. 웹 접근성 (Accessibility & WAI-ARIA)

### 5.1. ARIA 속성 바인딩

- **`role="button"`**: 업로드 드롭존 영역 및 미리보기 오버레이 내 개별 액션(편집, 삭제, 확대) 버튼에 바인딩
- **`role="dialog"`** & **`aria-modal="true"`**: 이미지 크롭 모달 패널에 바인딩
- **`aria-label`**: 썸네일 이미지에 대체 텍스트(예: "업로드된 이미지 미리보기") 및 오버레이 액션 버튼의 명확한 용도 전달
- **`aria-describedby`**: 허용 이미지 포맷 및 용량 제한 가이드 문구 ID 연결

### 5.2. 키보드 인터랙션 (Keyboard Navigation)

- **`Tab` / `Shift + Tab`**: 드롭존, 썸네일 액션 버튼들, 크롭 모달 내부 툴바 컨트롤 및 확정/취소 버튼 간 포커스 순차 이동 (크롭 모달 활성화 시 Focus Trap 적용)
- **`Enter` / `Space`**: 드롭존 포커스 시 OS 파일 탐색기 호출, 오버레이 버튼 포커스 시 해당 액션(크롭 모달 오픈, 이미지 삭제 등) 실행
- **`ArrowKeys` (크롭 모달 내부)**: 선택 박스(Cropper Box) 포커스 시 방향키를 통한 미세 위치 이동 지원
- **`Escape`**: 열려 있는 크롭 모달 패널을 닫고 이전 미리보기 포커스로 복귀

### 5.3. 스크린 리더 대응

- 이미지 로드 완료 시 "이미지가 성공적으로 첨부되었습니다."를 `aria-live="polite"` 영역을 통해 안내하고, 크롭 모달 진입 시 모달 타이틀과 현재 상태를 음성 안내합니다. 편집 완료 후 새로 변경된 이미지 상태를 실시간 음성으로 갱신하여 전달합니다.