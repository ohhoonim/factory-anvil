import { html } from 'lit';

import {BizMarkdownEditor } from './MarkdownEditor.wc';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta<BizMarkdownEditor> = {
  title: 'Components/Forms/MarkdownEditor',
  component: 'biz-markdown-editor',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['split', 'edit', 'preview'],
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
  },
  args: {
    value: '# Hello Biz-UI MarkdownEditor\n\nThis is **bold** text and *italic* text.',
    mode: 'split',
    placeholder: '마크다운을 입력하세요...',
    syncScroll: true,
    height: '500px',
    readonly: false,
    disabled: false,
    sanitize: true,
  },
};

export default meta;

type Story = StoryObj<BizMarkdownEditor>;

export const Default: Story = {
  render: (args) => html`
    <biz-markdown-editor
      .value=${args.value}
      .mode=${args.mode}
      .placeholder=${args.placeholder}
      ?sync-scroll=${args.syncScroll}
      .height=${args.height}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?sanitize=${args.sanitize}
    ></biz-markdown-editor>
  `,
};

export const EditOnly: Story = {
  args: {
    mode: 'edit',
  },
  render: Default.render,
};

export const PreviewOnly: Story = {
  args: {
    mode: 'preview',
  },
  render: Default.render,
};

export const Readonly: Story = {
  args: {
    readonly: true,
  },
  render: Default.render,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: Default.render,
};

export const CustomSlots: Story = {
  render: () => html`
    <biz-markdown-editor value="# Custom Slots Example">
      <div slot="toolbar-left-slot">
        <button type="button">Custom Action</button>
      </div>
      <div slot="toolbar-right-slot">
        <button type="button" style="background: #2563eb; color: #fff; border: none; border-radius: 4px; padding: 4px 8px;">
          Save
        </button>
      </div>
      <div slot="statusbar-slot">
        <span>Status: Ready</span>
      </div>
    </biz-markdown-editor>
  `,
};
