import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { fn } from 'storybook/test';
import './MarkdownEditor.wc.js';
import type { MarkdownEditorHost } from './MarkdownEditor.js';

type MarkdownEditorArgs = Required<MarkdownEditorHost> & {
  'start-slot'?: string;
  'end-slot'?: string;
  'toolbar-left-slot'?: string;
  'toolbar-right-slot'?: string;
  'label-slot'?: string;
  'editor-header-slot'?: string;
  'preview-header-slot'?: string;
  'custom-preview-slot'?: string;
  'helper-text-slot'?: string;
  'statusbar-slot'?: string;
  onChange?: (e: CustomEvent) => void;
  onModeChange?: (e: CustomEvent) => void;
  onUploadImage?: (e: CustomEvent) => void;
  onFocus?: (e: CustomEvent) => void;
  onBlur?: (e: CustomEvent) => void;
  onClear?: (e: CustomEvent) => void;
};

const meta: Meta<MarkdownEditorArgs> = {
  title: 'Components/Forms/MarkdownEditor',
  component: 'biz-markdown-editor',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
      description: '컴포넌트 변형 스타일'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '컴포넌트 크기'
    },
    mode: {
      control: { type: 'select' },
      options: ['split', 'edit', 'preview'],
      description: '화면 표시 모드'
    },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    syncScroll: { control: 'boolean' },
    height: { control: 'text' },
    maxHeight: { control: 'text' },
    autofocus: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    sanitize: { control: 'boolean' },
    isFocused: { control: 'boolean' },
    isResizing: { control: 'boolean' },
    isError: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    splitRatio: { control: { type: 'range', min: 15, max: 85, step: 1 } },
    charCount: { control: 'number' },
    wordCount: { control: 'number' },
    lineCount: { control: 'number' },
    cursorLine: { control: 'number' },
    cursorCol: { control: 'number' },
    renderedHtml: { control: 'text' }
  },
  args: {
    value: '# Hello Biz-UI\nThis is **MarkdownEditor** component.',
    mode: 'split',
    placeholder: '마크다운을 입력하세요...',
    syncScroll: true,
    height: '500px',
    maxHeight: null,
    autofocus: false,
    readonly: false,
    disabled: false,
    sanitize: true,
    variant: 'outlined',
    size: 'medium',
    isFocused: false,
    isResizing: false,
    isError: false,
    isLoading: false,
    splitRatio: 50,
    charCount: 0,
    wordCount: 0,
    lineCount: 1,
    cursorLine: 1,
    cursorCol: 1,
    renderedHtml: '',
    onChange: fn(),
    onModeChange: fn(),
    onUploadImage: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClear: fn()
  },
  render: (args) => html`
    <biz-markdown-editor
      .value="${args.value}"
      .mode="${args.mode}"
      .placeholder="${args.placeholder}"
      ?sync-scroll="${args.syncScroll}"
      .height="${args.height}"
      .max-height="${args.maxHeight}"
      ?autofocus="${args.autofocus}"
      ?readonly="${args.readonly}"
      ?disabled="${args.disabled}"
      ?sanitize="${args.sanitize}"
      .variant="${args.variant}"
      .size="${args.size}"
      .isFocused="${args.isFocused}"
      .isResizing="${args.isResizing}"
      .isError="${args.isError}"
      .isLoading="${args.isLoading}"
      .splitRatio="${args.splitRatio}"
      @change="${args.onChange}"
      @mode-change="${args.onModeChange}"
      @upload-image="${args.onUploadImage}"
      @focus="${args.onFocus}"
      @blur="${args.onBlur}"
      @clear="${args.onClear}"
    >
      ${args['start-slot'] ? html`<div slot="start-slot">${args['start-slot']}</div>` : ''}
      ${args['end-slot'] ? html`<div slot="end-slot">${args['end-slot']}</div>` : ''}
      ${args['toolbar-left-slot'] ? html`<div slot="toolbar-left-slot">${args['toolbar-left-slot']}</div>` : ''}
      ${args['toolbar-right-slot'] ? html`<div slot="toolbar-right-slot">${args['toolbar-right-slot']}</div>` : ''}
      ${args['label-slot'] ? html`<div slot="label-slot">${args['label-slot']}</div>` : ''}
      ${args['editor-header-slot'] ? html`<div slot="editor-header-slot">${args['editor-header-slot']}</div>` : ''}
      ${args['preview-header-slot'] ? html`<div slot="preview-header-slot">${args['preview-header-slot']}</div>` : ''}
      ${args['custom-preview-slot'] ? html`<div slot="custom-preview-slot">${args['custom-preview-slot']}</div>` : ''}
      ${args['helper-text-slot'] ? html`<div slot="helper-text-slot">${args['helper-text-slot']}</div>` : ''}
      ${args['statusbar-slot'] ? html`<div slot="statusbar-slot">${args['statusbar-slot']}</div>` : ''}
    </biz-markdown-editor>
  `
};

export default meta;
type Story = StoryObj<MarkdownEditorArgs>;

export const Default: Story = {};

export const Outlined: Story = {
  args: { variant: 'outlined' }
};

export const Filled: Story = {
  args: { variant: 'filled' }
};

export const Standard: Story = {
  args: { variant: 'standard' }
};

export const Small: Story = {
  args: { size: 'small', height: '350px' }
};

export const Medium: Story = {
  args: { size: 'medium', height: '500px' }
};

export const Large: Story = {
  args: { size: 'large', height: '600px' }
};

export const ModeEditOnly: Story = {
  args: { mode: 'edit' }
};

export const ModePreviewOnly: Story = {
  args: { mode: 'preview' }
};

export const Disabled: Story = {
  args: { disabled: true }
};

export const Readonly: Story = {
  args: { readonly: true }
};

export const ErrorState: Story = {
  args: {
    isError: true,
    'helper-text-slot': '올바른 마크다운 문법을 입력해주세요.'
  }
};

export const LoadingState: Story = {
  args: { isLoading: true }
};

export const AccessibilityValidation: Story = {
  args: {
    'label-slot': '문서 본문 작성기',
    'helper-text-slot': '접근성을 보장하는 마크다운 에디터입니다.',
    placeholder: '키보드 단축키(Ctrl+B, Ctrl+I, Ctrl+K)를 지원합니다.'
  }
};