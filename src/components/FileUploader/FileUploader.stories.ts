import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import './FileUploader.wc.js';
import type { FileUploaderHost, FileUploadedFile } from './FileUploader.js';

type Args = Required<FileUploaderHost> & {
  'label-slot': string;
  'drop-zone-content-slot': string;
  'file-item-slot': string;
  'upload-button-slot': string;
  'helper-text-slot': string;
  onChange: (e: CustomEvent) => void;
  onFileAdd: (e: CustomEvent) => void;
  onFileRemove: (e: CustomEvent) => void;
  onUploadProgress: (e: CustomEvent) => void;
  onError: (e: CustomEvent) => void;
  onClear: (e: CustomEvent) => void;
};

const meta: Meta<Args> = {
  title: 'Components/Forms/FileUploader',
  component: 'biz-file-uploader',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['dropzone', 'button', 'compact'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    maxSize: { control: 'number' },
    maxCount: { control: 'number' },
    autoUpload: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    isDragOver: { control: 'boolean' },
    isUploading: { control: 'boolean' },
    errorMessage: { control: 'text' },
    'label-slot': { control: 'text' },
    'drop-zone-content-slot': { control: 'text' },
    'file-item-slot': { control: 'text' },
    'upload-button-slot': { control: 'text' },
    'helper-text-slot': { control: 'text' },
  },
  args: {
    value: [],
    accept: '.png,.jpg,.jpeg',
    multiple: true,
    maxSize: 5242880, // 5MB
    maxCount: 5,
    autoUpload: true,
    disabled: false,
    readonly: false,
    error: false,
    variant: 'dropzone',
    size: 'medium',
    fullWidth: false,
    isDragOver: false,
    isUploading: false,
    errorMessage: '',
    'label-slot': 'Upload Documents',
    'drop-zone-content-slot': '',
    'file-item-slot': '',
    'upload-button-slot': '',
    'helper-text-slot': 'PNG, JPG up to 5MB (Max 5 files)',
    onChange: fn(),
    onFileAdd: fn(),
    onFileRemove: fn(),
    onUploadProgress: fn(),
    onError: fn(),
    onClear: fn(),
  },
  render: (args) => html`
    <biz-file-uploader
      .value=${args.value}
      .accept=${args.accept}
      ?multiple=${args.multiple}
      .maxSize=${args.maxSize}
      .maxCount=${args.maxCount}
      ?autoUpload=${args.autoUpload}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      .variant=${args.variant}
      .size=${args.size}
      ?full-width=${args.fullWidth}
      .errorMessage=${args.errorMessage}
      @change=${args.onChange}
      @file-add=${args.onFileAdd}
      @file-remove=${args.onFileRemove}
      @upload-progress=${args.onUploadProgress}
      @error=${args.onError}
      @clear=${args.onClear}
    >
      ${args['label-slot']
        ? html`<label slot="label-slot" style="font-weight: 600; font-size: 14px;">${args['label-slot']}</label>`
        : ''}
      ${args['drop-zone-content-slot']
        ? html`<div slot="drop-zone-content-slot">${args['drop-zone-content-slot']}</div>`
        : ''}
      ${args['file-item-slot']
        ? html`<div slot="file-item-slot">${args['file-item-slot']}</div>`
        : ''}
      ${args['upload-button-slot']
        ? html`<button slot="upload-button-slot">${args['upload-button-slot']}</button>`
        : ''}
      ${args['helper-text-slot']
        ? html`<span slot="helper-text-slot" style="font-size: 12px; color: #6b7280;">${args['helper-text-slot']}</span>`
        : ''}
    </biz-file-uploader>
  `,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h3>Drop Zone Mode (Default)</h3>
        <biz-file-uploader
          .variant=${'dropzone'}
          .size=${args.size}
          .value=${args.value}
          @change=${args.onChange}
        ></biz-file-uploader>
      </div>
      <div>
        <h3>Button Mode</h3>
        <biz-file-uploader
          .variant=${'button'}
          .size=${args.size}
          .value=${args.value}
          @change=${args.onChange}
        ></biz-file-uploader>
      </div>
      <div>
        <h3>Compact Mode</h3>
        <biz-file-uploader
          .variant=${'compact'}
          .size=${args.size}
          .value=${args.value}
          @change=${args.onChange}
        ></biz-file-uploader>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h3>Small</h3>
        <biz-file-uploader
          .size=${'small'}
          .variant=${args.variant}
          .value=${args.value}
        ></biz-file-uploader>
      </div>
      <div>
        <h3>Medium</h3>
        <biz-file-uploader
          .size=${'medium'}
          .variant=${args.variant}
          .value=${args.value}
        ></biz-file-uploader>
      </div>
      <div>
        <h3>Large</h3>
        <biz-file-uploader
          .size=${'large'}
          .variant=${args.variant}
          .value=${args.value}
        ></biz-file-uploader>
      </div>
    </div>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
    value: [
      { name: 'document_v1.pdf', size: 1048576, status: 'success' },
      { name: 'image_preview.png', size: 2097152, status: 'success' },
    ],
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
    errorMessage: 'File size exceeds maximum limit (5MB).',
  },
};

export const WithFilesAndProgress: Story = {
  args: {
    value: [
      { name: 'completed_report.pdf', size: 1258291, status: 'success' },
      { name: 'large_video_upload.mp4', size: 15728640, status: 'uploading', progress: 65 },
    ] as FileUploadedFile[],
  },
};

export const EventHandlers: Story = {
  args: {
    onChange: fn(),
    onFileAdd: fn(),
    onFileRemove: fn(),
    onUploadProgress: fn(),
    onError: fn(),
    onClear: fn(),
  },
};