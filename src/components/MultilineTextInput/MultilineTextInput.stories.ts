import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './MultilineTextInput.wc.js';

const meta: Meta = {
  title: 'Components/Forms/MultilineTextInput',
  component: 'biz-multiline-text-input',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'both', 'horizontal', 'vertical']
    },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    maxRows: { control: 'number' },
    maxlength: { control: 'number' },
    showCount: { control: 'boolean' },
    autoResize: { control: 'boolean' },
    required: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' }
  },
  args: {
    variant: 'outlined',
    size: 'medium',
    value: '',
    placeholder: '내용을 입력하세요...',
    rows: 3,
    maxRows: 0,
    showCount: true,
    autoResize: false,
    resize: 'vertical',
    required: false,
    readonly: false,
    disabled: false,
    error: false,
    fullWidth: false
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <biz-multiline-text-input
      .variant="${args.variant}"
      .size="${args.size}"
      .value="${args.value}"
      .placeholder="${args.placeholder}"
      .rows="${args.rows}"
      .maxRows="${args.maxRows}"
      .maxlength="${args.maxlength}"
      ?show-count="${args.showCount}"
      ?auto-resize="${args.autoResize}"
      .resize="${args.resize}"
      ?required="${args.required}"
      ?readonly="${args.readonly}"
      ?disabled="${args.disabled}"
      ?error="${args.error}"
      ?full-width="${args.fullWidth}"
    >
      <span slot="label-slot">문의 내용</span>
      <span slot="helper-text-slot">상세히 작성해 주세요.</span>
    </biz-multiline-text-input>
  `
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-multiline-text-input variant="outlined" placeholder="Outlined Variant">
        <span slot="label-slot">Outlined</span>
      </biz-multiline-text-input>

      <biz-multiline-text-input variant="filled" placeholder="Filled Variant">
        <span slot="label-slot">Filled</span>
      </biz-multiline-text-input>

      <biz-multiline-text-input variant="standard" placeholder="Standard Variant">
        <span slot="label-slot">Standard</span>
      </biz-multiline-text-input>
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-multiline-text-input size="small" placeholder="Small Size">
        <span slot="label-slot">Small</span>
      </biz-multiline-text-input>

      <biz-multiline-text-input size="medium" placeholder="Medium Size">
        <span slot="label-slot">Medium</span>
      </biz-multiline-text-input>

      <biz-multiline-text-input size="large" placeholder="Large Size">
        <span slot="label-slot">Large</span>
      </biz-multiline-text-input>
    </div>
  `
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-multiline-text-input disabled value="비활성화된 입력창입니다.">
        <span slot="label-slot">Disabled</span>
      </biz-multiline-text-input>

      <biz-multiline-text-input readonly value="읽기 전용 입력창입니다.">
        <span slot="label-slot">Readonly</span>
      </biz-multiline-text-input>

      <biz-multiline-text-input error value="잘못된 입력값입니다.">
        <span slot="label-slot">Error</span>
        <span slot="helper-text-slot">입력 형식이 바르지 않습니다.</span>
      </biz-multiline-text-input>
    </div>
  `
};

export const AutoResize: Story = {
  render: () => html`
    <biz-multiline-text-input
      auto-resize
      .rows="${2}"
      .maxRows="${5}"
      placeholder="텍스트를 계속 입력하면 높이가 자동으로 늘어납니다 (최대 5줄)."
    >
      <span slot="label-slot">Auto Resize (Max 5 rows)</span>
    </biz-multiline-text-input>
  `
};

export const CharacterCount: Story = {
  render: () => html`
    <biz-multiline-text-input
      show-count
      .maxlength="${100}"
      placeholder="100자 제한입니다."
    >
      <span slot="label-slot">Character Counter</span>
      <span slot="helper-text-slot">글자 수 제한 상태 표시</span>
    </biz-multiline-text-input>
  `
};