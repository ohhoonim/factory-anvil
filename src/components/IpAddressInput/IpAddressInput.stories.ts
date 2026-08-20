import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './IpAddressInput.wc';

const meta: Meta = {
  title: 'Components/Forms/IpAddressInput',
  component: 'biz-ip-address-input',
  tags: ["autodocs"],
  argTypes: {
    value: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['ipv4', 'ipv6'],
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    autoFocusNext: { control: 'boolean' },
    required: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    value: '',
    type: 'ipv4',
    variant: 'outlined',
    size: 'medium',
    autoFocusNext: true,
    required: false,
    readonly: false,
    disabled: false,
    error: false,
    fullWidth: false,
    label: 'IP 주소',
    helperText: '올바른 IPv4 주소를 입력하세요.',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <biz-ip-address-input
      .value="${args.value}"
      .type="${args.type}"
      .variant="${args.variant}"
      .size="${args.size}"
      ?auto-focus-next="${args.autoFocusNext}"
      ?required="${args.required}"
      ?readonly="${args.readonly}"
      ?disabled="${args.disabled}"
      ?error="${args.error}"
      ?full-width="${args.fullWidth}"
      .label="${args.label}"
      .helper-text="${args.helperText}"
    ></biz-ip-address-input>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-ip-address-input variant="outlined" label="Outlined (기본)" value="192.168.0.1"></biz-ip-address-input>
      <biz-ip-address-input variant="filled" label="Filled" value="192.168.0.1"></biz-ip-address-input>
      <biz-ip-address-input variant="standard" label="Standard" value="192.168.0.1"></biz-ip-address-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-ip-address-input size="small" label="Small" value="10.0.0.1"></biz-ip-address-input>
      <biz-ip-address-input size="medium" label="Medium" value="10.0.0.1"></biz-ip-address-input>
      <biz-ip-address-input size="large" label="Large" value="10.0.0.1"></biz-ip-address-input>
    </div>
  `,
};

export const IPv6Mode: Story = {
  render: () => html`
    <biz-ip-address-input
      type="ipv6"
      label="IPv6 주소"
      value="2001:0db8:85a3:0000:0000:8a2e:0370:7334"
      helper-text="8개 세그먼트 16진수 입력"
    ></biz-ip-address-input>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-ip-address-input label="Disabled 상태" disabled value="192.168.0.1"></biz-ip-address-input>
      <biz-ip-address-input label="Readonly 상태" readonly value="192.168.0.1"></biz-ip-address-input>
      <biz-ip-address-input label="Error 상태" error helper-text="유효하지 않은 IP 주소 형식입니다." value="256.300.0.1"></biz-ip-address-input>
    </div>
  `,
};

export const AccessibilityValidation: Story = {
  render: () => html`
    <biz-ip-address-input
      label="서버 IP 주소"
      required
      error
      helper-text="필수 입력 항목입니다. 올바른 IP를 입력해주세요."
      value="192.168.1.1"
    ></biz-ip-address-input>
  `,
};