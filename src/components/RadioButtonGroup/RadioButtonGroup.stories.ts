import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import "./RadioButtonGroup.wc";

const meta: Meta = {
  title: 'Components/Forms/RadioButtonGroup',
  component: 'biz-radio-button-group',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['vertical', 'horizontal'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'card', 'button', 'outlined', 'filled'],
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    label: '결제 수단 선택',
    helperText: '원하시는 결제 수단을 하나 선택해 주세요.',
    value: 'card',
    orientation: 'vertical',
    size: 'medium',
    variant: 'standard',
    disabled: false,
    readonly: false,
    error: false,
    fullWidth: false,
  },
  render: (args) => html`
    <biz-radio-button-group
      .label=${args.label}
      .helperText=${args.helperText}
      .value=${args.value}
      .orientation=${args.orientation}
      .size=${args.size}
      .variant=${args.variant}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      ?full-width=${args.fullWidth}
    >
      <input type="radio" name="payment" value="card" id="card" />
      <label for="card">신용/체크카드</label>
      <input type="radio" name="payment" value="trans" id="trans" />
      <label for="trans">실시간 계좌이체</label>
      <input type="radio" name="payment" value="vbank" id="vbank" />
      <label for="vbank">가상계좌</label>
    </biz-radio-button-group>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <biz-radio-button-group label="Standard Variant" variant="standard" value="1">
        <input type="radio" name="v1" value="1" id="v1-1" /><label for="v1-1">Option 1</label>
        <input type="radio" name="v1" value="2" id="v1-2" /><label for="v1-2">Option 2</label>
      </biz-radio-button-group>

      <biz-radio-button-group label="Card Variant" variant="card" value="1">
        <input type="radio" name="v2" value="1" id="v2-1" /><label for="v2-1">Option 1</label>
        <input type="radio" name="v2" value="2" id="v2-2" /><label for="v2-2">Option 2</label>
      </biz-radio-button-group>

      <biz-radio-button-group label="Outlined Variant" variant="outlined" value="1">
        <input type="radio" name="v3" value="1" id="v3-1" /><label for="v3-1">Option 1</label>
        <input type="radio" name="v3" value="2" id="v3-2" /><label for="v3-2">Option 2</label>
      </biz-radio-button-group>

      <biz-radio-button-group label="Filled Variant" variant="filled" value="1">
        <input type="radio" name="v4" value="1" id="v4-1" /><label for="v4-1">Option 1</label>
        <input type="radio" name="v4" value="2" id="v4-2" /><label for="v4-2">Option 2</label>
      </biz-radio-button-group>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <biz-radio-button-group label="Small Size" size="small" value="1">
        <input type="radio" name="s1" value="1" id="s1-1" /><label for="s1-1">Small 1</label>
        <input type="radio" name="s1" value="2" id="s1-2" /><label for="s1-2">Small 2</label>
      </biz-radio-button-group>

      <biz-radio-button-group label="Medium Size" size="medium" value="1">
        <input type="radio" name="s2" value="1" id="s2-1" /><label for="s2-1">Medium 1</label>
        <input type="radio" name="s2" value="2" id="s2-2" /><label for="s2-2">Medium 2</label>
      </biz-radio-button-group>

      <biz-radio-button-group label="Large Size" size="large" value="1">
        <input type="radio" name="s3" value="1" id="s3-1" /><label for="s3-1">Large 1</label>
        <input type="radio" name="s3" value="2" id="s3-2" /><label for="s3-2">Large 2</label>
      </biz-radio-button-group>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <biz-radio-button-group label="Disabled State" disabled value="1">
        <input type="radio" name="st1" value="1" id="st1-1" /><label for="st1-1">Option 1</label>
        <input type="radio" name="st1" value="2" id="st1-2" /><label for="st1-2">Option 2</label>
      </biz-radio-button-group>

      <biz-radio-button-group label="Readonly State" readonly value="1">
        <input type="radio" name="st2" value="1" id="st2-1" /><label for="st2-1">Option 1</label>
        <input type="radio" name="st2" value="2" id="st2-2" /><label for="st2-2">Option 2</label>
      </biz-radio-button-group>

      <biz-radio-button-group label="Error State" error helperText="필수 선택 항목입니다." value="">
        <input type="radio" name="st3" value="1" id="st3-1" /><label for="st3-1">Option 1</label>
        <input type="radio" name="st3" value="2" id="st3-2" /><label for="st3-2">Option 2</label>
      </biz-radio-button-group>
    </div>
  `,
};