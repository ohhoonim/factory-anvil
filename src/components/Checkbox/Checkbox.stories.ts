import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './Checkbox.wc.ts';

const meta: Meta = {
  title: 'Components/Forms/Checkbox',
  component: 'biz-checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'outlined', 'filled'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    value: { control: 'text' },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    labelPosition: 'right',
    variant: 'standard',
    size: 'medium',
    value: 'option1',
  },
  render: (args) => html`
    <biz-checkbox
      .checked=${args.checked}
      .indeterminate=${args.indeterminate}
      .disabled=${args.disabled}
      .readonly=${args.readonly}
      .required=${args.required}
      .error=${args.error}
      .labelPosition=${args.labelPosition}
      .variant=${args.variant}
      .size=${args.size}
      .value=${args.value}
    >
      동의합니다
    </biz-checkbox>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <biz-checkbox variant="standard">Standard</biz-checkbox>
      <biz-checkbox variant="outlined">Outlined</biz-checkbox>
      <biz-checkbox variant="filled">Filled</biz-checkbox>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <biz-checkbox size="small">Small (16px)</biz-checkbox>
      <biz-checkbox size="medium">Medium (20px)</biz-checkbox>
      <biz-checkbox size="large">Large (24px)</biz-checkbox>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <biz-checkbox checked>Checked State</biz-checkbox>
      <biz-checkbox indeterminate>Indeterminate State</biz-checkbox>
      <biz-checkbox disabled>Disabled State</biz-checkbox>
      <biz-checkbox disabled checked>Disabled Checked</biz-checkbox>
      <biz-checkbox readonly checked>Readonly Checked</biz-checkbox>
      <biz-checkbox error required>Error / Required State</biz-checkbox>
    </div>
  `,
};

export const LabelPosition: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <biz-checkbox label-position="right">Label Right (Default)</biz-checkbox>
      <biz-checkbox label-position="left">Label Left</biz-checkbox>
    </div>
  `,
};

export const WithDescription: Story = {
  render: () => html`
    <biz-checkbox checked variant="outlined">
      이용약관 동의 (필수)
      <span slot="description-slot">서비스 이용을 위해 필수 약관에 동의해야 합니다.</span>
    </biz-checkbox>
  `,
};