import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import './ImageUpload.wc.js';
import type { ImageUploadHost } from './ImageUpload.js';

type Args = Required<ImageUploadHost> & {
    labelSlot?: string;
    dropZoneSlot?: string;
    previewMaskSlot?: string;
    cropToolbarSlot?: string;
    cropFooterSlot?: string;
    helperTextSlot?: string;
    onChange: (e: any) => void;
    onCropStart: (e: any) => void;
    onCropComplete: (e: any) => void;
    onCropCancel: (e: any) => void;
    onRemove: (e: any) => void;
    onError: (e: any) => void;
    onClear: (e: any) => void;
};

const meta: Meta<Args> = {
    title: 'Components/Forms/ImageUpload',
    component: 'biz-image-upload',
    tags: ['autodocs'],
    argTypes: {
        shape: {
            control: 'select',
            options: ['square', 'circle'],
        },
        outputType: {
            control: 'select',
            options: ['blob', 'file', 'base64'],
        },
        outputQuality: {
            control: { type: 'number', min: 0, max: 1, step: 0.05 },
        },
        accept: { control: 'text' },
        maxSize: { control: 'number' },
        aspectRatio: { control: 'number' },
        enableCrop: { control: 'boolean' },
        disabled: { control: 'boolean' },
        readonly: { control: 'boolean' },
        error: { control: 'boolean' },
        isDragOver: { control: 'boolean' },
        isCropping: { control: 'boolean' },
        isProcessing: { control: 'boolean' },
    },
    args: {
        value: null,
        accept: 'image/jpeg,image/png,image/webp',
        maxSize: 5242880,
        aspectRatio: 1,
        shape: 'square',
        enableCrop: true,
        outputType: 'blob',
        outputQuality: 0.92,
        disabled: false,
        readonly: false,
        error: false,
        isDragOver: false,
        isCropping: false,
        isProcessing: false,
        previewUrl: null,
        statusMessage: '',
        labelSlot: '프로필 이미지',
        dropZoneSlot: '클릭하거나 파일을 드래그하여 업로드하세요.',
        previewMaskSlot: '',
        cropToolbarSlot: '',
        cropFooterSlot: '',
        helperTextSlot: 'JPG, PNG, WEBP 파일 지원 (최대 5MB)',
        handleFileSelect: fn(),
        handleDragOver: fn(),
        handleDragLeave: fn(),
        handleDrop: fn(),
        handleTriggerFileSelect: fn(),
        handleOpenCrop: fn(),
        handleConfirmCrop: fn(),
        handleCancelCrop: fn(),
        handleRemove: fn(),
        handleKeydown: fn(),
    },
    render: (args) => html`
    <biz-image-upload
      .value=${args.value}
      accept=${args.accept}
      .maxSize=${args.maxSize}
      .aspectRatio=${args.aspectRatio}
      shape=${args.shape}
      ?enable-crop=${args.enableCrop}
      output-type=${args.outputType}
      .outputQuality=${args.outputQuality}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
    >
      ${args.labelSlot
            ? html`<span slot="label-slot">${args.labelSlot}</span>`
            : ''}
      ${args.dropZoneSlot
            ? html`<div slot="drop-zone-slot">${args.dropZoneSlot}</div>`
            : ''}
      ${args.previewMaskSlot
            ? html`<div slot="preview-mask-slot">${args.previewMaskSlot}</div>`
            : ''}
      ${args.cropToolbarSlot
            ? html`<div slot="crop-toolbar-slot">${args.cropToolbarSlot}</div>`
            : ''}
      ${args.cropFooterSlot
            ? html`<div slot="crop-footer-slot">${args.cropFooterSlot}</div>`
            : ''}
      ${args.helperTextSlot
            ? html`<span slot="helper-text-slot">${args.helperTextSlot}</span>`
            : ''}
    </biz-image-upload>
  `,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Variants: Story = {
    render: (args) => html`
    <div style="display: flex; gap: 24px; align-items: flex-start;">
      <biz-image-upload variant="outlined" .maxSize=${args.maxSize}>
        <span slot="label-slot">Outlined (기본)</span>
        <span slot="helper-text-slot">Outlined 변형</span>
      </biz-image-upload>

      <biz-image-upload variant="filled" .maxSize=${args.maxSize}>
        <span slot="label-slot">Filled</span>
        <span slot="helper-text-slot">Filled 변형</span>
      </biz-image-upload>

      <biz-image-upload variant="standard" .maxSize=${args.maxSize}>
        <span slot="label-slot">Standard</span>
        <span slot="helper-text-slot">Standard 변형</span>
      </biz-image-upload>
    </div>
  `,
};

export const Sizes: Story = {
    render: (args) => html`
    <div style="display: flex; gap: 24px; align-items: flex-end;">
      <biz-image-upload size="small" .maxSize=${args.maxSize}>
        <span slot="label-slot">Small</span>
      </biz-image-upload>

      <biz-image-upload size="medium" .maxSize=${args.maxSize}>
        <span slot="label-slot">Medium</span>
      </biz-image-upload>

      <biz-image-upload size="large" .maxSize=${args.maxSize}>
        <span slot="label-slot">Large</span>
      </biz-image-upload>
    </div>
  `,
};

export const Shapes: Story = {
    render: (args) => html`
    <div style="display: flex; gap: 24px; align-items: flex-start;">
      <biz-image-upload shape="square" .maxSize=${args.maxSize}>
        <span slot="label-slot">Square (기본)</span>
      </biz-image-upload>

      <biz-image-upload shape="circle" .maxSize=${args.maxSize}>
        <span slot="label-slot">Circle (아바타)</span>
      </biz-image-upload>
    </div>
  `,
};

export const States: Story = {
    render: (args) => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap;">
      <biz-image-upload disabled>
        <span slot="label-slot">Disabled</span>
        <span slot="helper-text-slot">비활성화 상태</span>
      </biz-image-upload>

      <biz-image-upload
        value="https://via.placeholder.com/160"
        readonly
      >
        <span slot="label-slot">Readonly</span>
        <span slot="helper-text-slot">읽기 전용 상태</span>
      </biz-image-upload>

      <biz-image-upload error>
        <span slot="label-slot">Error</span>
        <span slot="helper-text-slot">올바른 이미지 형식이 아닙니다.</span>
      </biz-image-upload>
    </div>
  `,
};

export const PreviewAndSelected: Story = {
    args: {
        value: 'https://via.placeholder.com/160',
        labelSlot: '이미지 선택 완료',
        helperTextSlot: '호버/포커스 시 편집 및 삭제 버튼이 노출됩니다.',
    },
};

export const Events: Story = {
    args: {
        onChange: fn(),
        onCropStart: fn(),
        onCropComplete: fn(),
        onCropCancel: fn(),
        onRemove: fn(),
        onError: fn(),
        onClear: fn(),
    },
};

/*
## 활용방법

`BizImageUpload` 컴포넌트에서 크롭된 결과물을 서버로 업로드하려면 **`crop-complete`** 이벤트 또는 **`change`** 이벤트를 수신하여 전달받은 `detail` 데이터를 `FormData`나 `API` 요청 body에 실어 보내면 됩니다.

**1.1. 이벤트 리스너 등록:**

크롭 완료 이벤트 감지.

`crop-complete` 이벤트를 감지하여 크롭이 완료된 파일(`croppedResult.file`) 객체를 추출합니다.

```jsx
const uploadComponent = document.querySelector('biz-image-upload');

uploadComponent.addEventListener('crop-complete', (e) => {
  const { file } = e.detail.croppedResult;
  uploadImageToServer(file);
});
```

**2.2. FormData 구성 및 서버 업로드:**

output-type 설정에 따른 파일 전송.

컴포넌트의 `output-type` 설정에 맞춰 적절한 형태로 FormData를 전달합니다.

```jsx
async function uploadImageToServer(fileData) {
  const formData = new FormData();

  // output-type이 'blob' 또는 'file'인 경우
  if (fileData instanceof Blob || fileData instanceof File) {
    formData.append('image', fileData, 'cropped-image.jpg');
  }
  // output-type이 'base64'인 경우
  else if (typeof fileData === 'string') {
    formData.append('imageBase64', fileData);
  }

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log('업로드 성공:', result);
  } catch (error) {
    console.error('업로드 실패:', error);
  }
}
```

**주요 속성 설정 팁**

- **`output-type="file"`**: `File` 객체 형태로 반환되어 `FormData` 전송 시 파일 이름을 유지할 수 있습니다.
- **`output-type="blob"`** *(기본값)*: `Blob` 형태로 반환되며 `FormData.append()`의 세 번째 인자로 파일명을 직접 지정할 수 있습니다.
- **`output-type="base64"`**: JSON 형태의 API 요청 body에 직접 인코딩된 문자열을 전달할 때 유용합니다.
*/