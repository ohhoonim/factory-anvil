import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import type { MultilineTextInputHost } from './MultilineTextInput.js';
import './MultilineTextInput.wc.js';

type MultilineTextInputArgs = Required<MultilineTextInputHost> & {
  labelSlot?: string;
  headerExtraSlot?: string;
  helperTextSlot?: string;
  footerExtraSlot?: string;
};

const meta: Meta<MultilineTextInputArgs> = {
  title: 'Components/Forms/MultilineTextInput',
  component: 'biz-multiline-text-input',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'both', 'horizontal', 'vertical'],
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
    fullWidth: { control: 'boolean' },
    labelSlot: { control: 'text' },
    headerExtraSlot: { control: 'text' },
    helperTextSlot: { control: 'text' },
    footerExtraSlot: { control: 'text' },
  },
  args: {
    value: '',
    placeholder: '내용을 입력하세요...',
    rows: 3,
    maxRows: 0,
    maxlength: 200,
    showCount: true,
    autoResize: false,
    resize: 'vertical',
    required: false,
    readonly: false,
    disabled: false,
    error: false,
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    labelSlot: '설명',
    headerExtraSlot: '',
    helperTextSlot: '안내 문구입니다.',
    footerExtraSlot: '',
    handleInput: fn(),
    handleChange: fn(),
    handleFocus: fn(),
    handleBlur: fn(),
  },
  render: (args) => html`
    <biz-multiline-text-input
      .value=${args.value}
      .placeholder=${args.placeholder}
      .rows=${args.rows}
      .maxRows=${args.maxRows}
      .maxlength=${args.maxlength}
      ?show-count=${args.showCount}
      ?auto-resize=${args.autoResize}
      .resize=${args.resize}
      ?required=${args.required}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?error=${args.error}
      .variant=${args.variant}
      .size=${args.size}
      ?full-width=${args.fullWidth}
      @input=${args.handleInput}
      @change=${args.handleChange}
      @focus=${args.handleFocus}
      @blur=${args.handleBlur}
    >
      ${args.labelSlot ? html`<label slot="label-slot">${args.labelSlot}</label>` : ''}
      ${args.headerExtraSlot ? html`<span slot="header-extra-slot">${args.headerExtraSlot}</span>` : ''}
      ${args.helperTextSlot ? html`<span slot="helper-text-slot">${args.helperTextSlot}</span>` : ''}
      ${args.footerExtraSlot ? html`<span slot="footer-extra-slot">${args.footerExtraSlot}</span>` : ''}
    </biz-multiline-text-input>
  `,
};

export default meta;
type Story = StoryObj<MultilineTextInputArgs>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
      <biz-multiline-text-input
        ...=${args}
        variant="outlined"
        placeholder="Outlined 변형"
      >
        <label slot="label-slot">Outlined</label>
      </biz-multiline-text-input>

      <biz-multiline-text-input
        ...=${args}
        variant="filled"
        placeholder="Filled 변형"
      >
        <label slot="label-slot">Filled</label>
      </biz-multiline-text-input>

      <biz-multiline-text-input
        ...=${args}
        variant="standard"
        placeholder="Standard 변형"
      >
        <label slot="label-slot">Standard</label>
      </biz-multiline-text-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
      <biz-multiline-text-input
        ...=${args}
        size="small"
        placeholder="Small 크기"
      >
        <label slot="label-slot">Small</label>
      </biz-multiline-text-input>

      <biz-multiline-text-input
        ...=${args}
        size="medium"
        placeholder="Medium 크기"
      >
        <label slot="label-slot">Medium</label>
      </biz-multiline-text-input>

      <biz-multiline-text-input
        ...=${args}
        size="large"
        placeholder="Large 크기"
      >
        <label slot="label-slot">Large</label>
      </biz-multiline-text-input>
    </div>
  `,
};

export const States: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
      <biz-multiline-text-input
        ...=${args}
        disabled
        value="비활성화된 입력값입니다."
      >
        <label slot="label-slot">Disabled State</label>
      </biz-multiline-text-input>

      <biz-multiline-text-input
        ...=${args}
        readonly
        value="읽기 전용 입력값입니다."
      >
        <label slot="label-slot">Readonly State</label>
      </biz-multiline-text-input>

      <biz-multiline-text-input
        ...=${args}
        error
        value="잘못된 입력 내용입니다."
      >
        <label slot="label-slot">Error State</label>
        <span slot="helper-text-slot" style="color: var(--biz-multiline-text-input-error-color);">
          유효하지 않은 입력입니다.
        </span>
      </biz-multiline-text-input>
    </div>
  `,
};

export const AutoResize: Story = {
  args: {
    autoResize: true,
    rows: 2,
    maxRows: 5,
    placeholder: '텍스트를 여러 줄 입력하면 높이가 자동으로 늘어납니다 (최대 5줄)...',
  },
};

export const EventHandlers: Story = {
  args: {
    handleInput: fn(),
    handleChange: fn(),
    handleFocus: fn(),
    handleBlur: fn(),
  },
};