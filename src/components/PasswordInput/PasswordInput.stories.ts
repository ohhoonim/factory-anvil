import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import "./PasswordInput.wc";

const meta: Meta = {
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
    visible: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    clearable: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
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
      variant=${args.variant}
      size=${args.size}
      ?full-width=${args.fullWidth}
    >
      <label slot="label-slot" for="input">비밀번호</label>
      <span slot="helper-text-slot">${args.error ? '8자리 이상 입력해주세요.' : '영문, 숫자 포함 8자 이상'}</span>
    </biz-password-input>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-password-input variant="outlined" value="secret123">
        <label slot="label-slot">Outlined</label>
      </biz-password-input>
      <biz-password-input variant="filled" value="secret123">
        <label slot="label-slot">Filled</label>
      </biz-password-input>
      <biz-password-input variant="standard" value="secret123">
        <label slot="label-slot">Standard</label>
      </biz-password-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-password-input size="small" value="secret123">
        <label slot="label-slot">Small</label>
      </biz-password-input>
      <biz-password-input size="medium" value="secret123">
        <label slot="label-slot">Medium</label>
      </biz-password-input>
      <biz-password-input size="large" value="secret123">
        <label slot="label-slot">Large</label>
      </biz-password-input>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-password-input value="secret123" disabled>
        <label slot="label-slot">Disabled</label>
      </biz-password-input>
      <biz-password-input value="secret123" readonly>
        <label slot="label-slot">Readonly</label>
      </biz-password-input>
      <biz-password-input value="invalid" error clearable>
        <label slot="label-slot">Error</label>
        <span slot="helper-text-slot">올바른 비밀번호 형식이 아닙니다.</span>
      </biz-password-input>
    </div>
  `,
};
