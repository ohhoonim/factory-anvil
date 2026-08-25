import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './ImageUpload.wc';

const meta: Meta = {
  title: 'Components/Forms/ImageUpload',
  component: 'biz-image-upload',
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: 'select',
      options: ['square', 'circle'],
    },
    accept: {
      control: 'text',
    },
    maxSize: {
      control: 'number',
    },
    aspectRatio: {
      control: 'number',
    },
    enableCrop: {
      control: 'boolean',
    },
    outputType: {
      control: 'select',
      options: ['blob', 'file', 'base64'],
    },
    outputQuality: {
      control: { type: 'number', min: 0, max: 1, step: 0.05 },
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
  args: {
    accept: 'image/jpeg,image/png,image/webp',
    shape: 'square',
    enableCrop: true,
    outputType: 'blob',
    outputQuality: 0.92,
    disabled: false,
    readonly: false,
    error: false,
  },
  render: (args) => html`
    <biz-image-upload
      .value=${args.value ?? null}
      .accept=${args.accept}
      .maxSize=${args.maxSize ?? null}
      .aspectRatio=${args.aspectRatio ?? null}
      .shape=${args.shape}
      ?enable-crop=${args.enableCrop}
      .outputType=${args.outputType}
      .outputQuality=${args.outputQuality}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
    >
      <span slot="label-slot">프로필 이미지 업로드</span>
      <span slot="helper-text-slot">JPG, PNG, WEBP 파일만 허용됩니다. (최대 5MB)</span>
    </biz-image-upload>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const CircleMode: Story = {
  args: {
    shape: 'circle',
    aspectRatio: 1,
  },
};

export const SmallSize: Story = {
  render: () => html`
    <biz-image-upload class="biz-image-upload--sm">
      <span slot="label-slot">Small Size</span>
      <span slot="helper-text-slot">100x100 영역</span>
    </biz-image-upload>
  `,
};

export const MediumSize: Story = {
  render: () => html`
    <biz-image-upload class="biz-image-upload--md">
      <span slot="label-slot">Medium Size</span>
      <span slot="helper-text-slot">160x160 영역</span>
    </biz-image-upload>
  `,
};

export const LargeSize: Story = {
  render: () => html`
    <biz-image-upload class="biz-image-upload--lg">
      <span slot="label-slot">Large Size</span>
      <span slot="helper-text-slot">240x240 영역</span>
    </biz-image-upload>
  `,
};

export const OutlinedVariant: Story = {
  render: () => html`
    <biz-image-upload class="biz-image-upload--outlined">
      <span slot="label-slot">Outlined Variant</span>
    </biz-image-upload>
  `,
};

export const FilledVariant: Story = {
  render: () => html`
    <biz-image-upload class="biz-image-upload--filled">
      <span slot="label-slot">Filled Variant</span>
    </biz-image-upload>
  `,
};

export const StandardVariant: Story = {
  render: () => html`
    <biz-image-upload class="biz-image-upload--standard">
      <span slot="label-slot">Standard Variant</span>
    </biz-image-upload>
  `,
};

export const DisabledState: Story = {
  args: {
    disabled: true,
  },
};

export const ReadonlyState: Story = {
  args: {
    readonly: true,
    value: 'https://via.placeholder.com/160',
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
  },
};

export const WithPreloadedValue: Story = {
  args: {
    value: 'https://via.placeholder.com/300',
  },
};