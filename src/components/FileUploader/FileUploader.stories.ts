import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import './FileUploader.wc';

const meta: Meta = {
  title: 'Components/Forms/FileUploader',
  component: 'biz-file-uploader',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['dropzone', 'button', 'compact']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    multiple: { control: 'boolean' },
    accept: { control: 'text' },
    maxSize: { control: 'number' },
    maxCount: { control: 'number' },
    helperText: { control: 'text' }
  },
  args: {
    variant: 'dropzone',
    size: 'medium',
    disabled: false,
    readonly: false,
    error: false,
    multiple: false,
    helperText: '최대 10MB까지 업로드 가능합니다.'
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <biz-file-uploader
      .variant="${args.variant}"
      .size="${args.size}"
      ?disabled="${args.disabled}"
      ?readonly="${args.readonly}"
      ?error="${args.error}"
      ?multiple="${args.multiple}"
      .accept="${args.accept}"
      .maxSize="${args.maxSize}"
      .maxCount="${args.maxCount}"
      .helperText="${args.helperText}"
    >
      <span slot="label-slot">프로필 이미지 업로드</span>
    </biz-file-uploader>
  `
};

export const ButtonMode: Story = {
  args: {
    variant: 'button'
  },
  render: (args) => html`
    <biz-file-uploader .variant="${args.variant}" .helperText="${args.helperText}">
      <span slot="label-slot">첨부파일</span>
    </biz-file-uploader>
  `
};

export const CompactMode: Story = {
  args: {
    variant: 'compact'
  },
  render: (args) => html`
    <biz-file-uploader .variant="${args.variant}" .helperText="${args.helperText}">
      <span slot="label-slot">아바타 등록</span>
    </biz-file-uploader>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-file-uploader size="small" helper-text="Small 사이즈">
        <span slot="label-slot">Small</span>
      </biz-file-uploader>
      <biz-file-uploader size="medium" helper-text="Medium 사이즈">
        <span slot="label-slot">Medium</span>
      </biz-file-uploader>
      <biz-file-uploader size="large" helper-text="Large 사이즈">
        <span slot="label-slot">Large</span>
      </biz-file-uploader>
    </div>
  `
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-file-uploader disabled helper-text="비활성화 상태입니다.">
        <span slot="label-slot">Disabled State</span>
      </biz-file-uploader>
      <biz-file-uploader readonly helper-text="읽기 전용 상태입니다.">
        <span slot="label-slot">Readonly State</span>
      </biz-file-uploader>
      <biz-file-uploader error helper-text="올바르지 않은 파일 형식입니다.">
        <span slot="label-slot">Error State</span>
      </biz-file-uploader>
    </div>
  `
};

