import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './RadioButton.wc';
import { RadioButton } from './RadioButton.wc';

const meta: Meta<RadioButton> = {
  title: 'Components/Forms/RadioButton',
  component: 'biz-radio-button',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    value: { control: 'text' },
    name: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'button', 'card'],
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['right', 'left'],
    },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    checked: false,
    value: 'option1',
    name: 'demo-radio',
    size: 'medium',
    variant: 'standard',
    labelPosition: 'right',
    readonly: false,
    disabled: false,
    error: false,
  },
  render: (args) => html`
    <biz-radio-button
      .checked=${args.checked}
      .value=${args.value}
      .name=${args.name}
      .size=${args.size}
      .variant=${args.variant}
      label-position=${args.labelPosition}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?error=${args.error}
    >
      라디오 옵션 항목
    </biz-radio-button>
  `,
};

export default meta;
type Story = StoryObj<RadioButton>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <biz-radio-button name="variant-group" value="standard" variant="standard" checked>
        Standard Variant
      </biz-radio-button>
      <biz-radio-button name="variant-group" value="button" variant="button">
        Button Variant
      </biz-radio-button>
      <biz-radio-button name="variant-group" value="card" variant="card">
        Card Variant
        <span slot="description-slot">카드 형태의 풍부한 보조 설명 영역입니다.</span>
      </biz-radio-button>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <biz-radio-button name="size-group" size="small" value="sm">Small Size</biz-radio-button>
      <biz-radio-button name="size-group" size="medium" value="md" checked>Medium Size</biz-radio-button>
      <biz-radio-button name="size-group" size="large" value="lg">Large Size</biz-radio-button>
    </div>
  `,
};

export const LabelPositions: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <biz-radio-button name="label-pos-group" label-position="right" value="right" checked>
        Right Label Position (Default)
      </biz-radio-button>
      <biz-radio-button name="label-pos-group" label-position="left" value="left">
        Left Label Position
      </biz-radio-button>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-radio-button name="state-group" value="disabled" disabled>
        Disabled State
      </biz-radio-button>

      <biz-radio-button name="state-group" value="disabled-checked" disabled checked>
        Disabled Checked State
      </biz-radio-button>

      <biz-radio-button name="state-group" value="readonly" readonly checked>
        Readonly State
      </biz-radio-button>

      <biz-radio-button name="state-group" value="error" error>
        Error State
        <span slot="description-slot">필수 선택 항목입니다.</span>
      </biz-radio-button>
    </div>
  `,
};

export const CustomSlots: Story = {
  render: () => html`
    <biz-radio-button name="custom-slot-group" value="custom" checked>
      커스텀 아이콘 & 설명
      <svg slot="icon-slot" width="10" height="10" viewBox="0 0 24 24" fill="#2563eb">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
      <span slot="description-slot">아이콘 슬롯과 디스크립션 슬롯이 재정의된 커스텀 모드입니다.</span>
    </biz-radio-button>
  `,
};