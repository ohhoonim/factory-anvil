import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import './PasswordInput.wc.ts';
import type { PasswordInputHost } from './PasswordInput.ts';

type PasswordInputStoryArgs = Required<PasswordInputHost> & {
  labelSlot?: string;
  startSlot?: string;
  endSlot?: string;
  helperTextSlot?: string;
};

const meta: Meta<PasswordInputStoryArgs> = {
  title: 'Components/Forms/PasswordInput',
  component: 'biz-password-input',
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
    value: { control: 'text' },
    placeholder: { control: 'text' },
    visible: { control: 'boolean' },
    required: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    clearable: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    labelSlot: { control: 'text' },
    startSlot: { control: 'text' },
    endSlot: { control: 'text' },
    helperTextSlot: { control: 'text' },
  },
  args: {
    value: '',
    placeholder: '비밀번호를 입력하세요',
    visible: false,
    required: false,
    readonly: false,
    disabled: false,
    error: false,
    clearable: true,
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    labelSlot: '비밀번호',
    startSlot: '',
    endSlot: '',
    helperTextSlot: '8자 이상 영문, 숫자, 특수문자를 조합해주세요.',
    handleInput: fn(),
    handleChange: fn(),
    handleToggleVisibility: fn(),
    handleClear: fn(),
    handleFocus: fn(),
    handleBlur: fn(),
    handleKeyDown: fn(),
  },
  render: (args) => html`
    <biz-password-input
      .value=${args.value}
      .placeholder=${args.placeholder}
      ?visible=${args.visible}
      ?required=${args.required}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?error=${args.error}
      ?clearable=${args.clearable}
      .variant=${args.variant}
      .size=${args.size}
      ?full-width=${args.fullWidth}
      @input=${args.handleInput}
      @change=${args.handleChange}
      @toggle-visibility=${args.handleToggleVisibility}
      @clear=${args.handleClear}
      @focus=${args.handleFocus}
      @blur=${args.handleBlur}
      @keydown=${args.handleKeyDown}
    >
      ${args.labelSlot ? html`<span slot="label-slot">${args.labelSlot}</span>` : ''}
      ${args.startSlot ? html`<span slot="start-slot">${args.startSlot}</span>` : ''}
      ${args.endSlot ? html`<span slot="end-slot">${args.endSlot}</span>` : ''}
      ${args.helperTextSlot ? html`<span slot="helper-text-slot">${args.helperTextSlot}</span>` : ''}
    </biz-password-input>
  `,
};

export default meta;
type Story = StoryObj<PasswordInputStoryArgs>;

export const Default: Story = {
  args: {
    value: 'SecretPass123!',
  },
};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-password-input .variant=${'outlined'} .value=${'Outlined Variant'}>
        <span slot="label-slot">Outlined</span>
      </biz-password-input>
      <biz-password-input .variant=${'filled'} .value=${'Filled Variant'}>
        <span slot="label-slot">Filled</span>
      </biz-password-input>
      <biz-password-input .variant=${'standard'} .value=${'Standard Variant'}>
        <span slot="label-slot">Standard</span>
      </biz-password-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-password-input .size=${'small'} .value=${'Small Size'}>
        <span slot="label-slot">Small</span>
      </biz-password-input>
      <biz-password-input .size=${'medium'} .value=${'Medium Size'}>
        <span slot="label-slot">Medium</span>
      </biz-password-input>
      <biz-password-input .size=${'large'} .value=${'Large Size'}>
        <span slot="label-slot">Large</span>
      </biz-password-input>
    </div>
  `,
};

export const States: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-password-input ?disabled=${true} .value=${'Disabled State'}>
        <span slot="label-slot">Disabled</span>
      </biz-password-input>
      <biz-password-input ?readonly=${true} .value=${'Readonly State'}>
        <span slot="label-slot">Readonly</span>
      </biz-password-input>
      <biz-password-input ?error=${true} .value=${'Invalid Password'}>
        <span slot="label-slot">Error</span>
        <span slot="helper-text-slot">비밀번호가 일치하지 않습니다.</span>
      </biz-password-input>
    </div>
  `,
};

export const UnmaskedVisible: Story = {
  args: {
    value: 'VisiblePassword123!',
    visible: true,
  },
};