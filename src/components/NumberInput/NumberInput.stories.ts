import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import './NumberInput.wc';

const meta: Meta = {
  title: 'Components/NumberInput',
  component: 'biz-number-input',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    precision: { control: 'number' },
    controls: { control: 'boolean' },
    controlsPosition: {
      control: 'select',
      options: ['end', 'stacked', 'split'],
    },
    useGrouping: { control: 'boolean' },
    required: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: { control: 'boolean' },
  },
  args: {
    value: 10,
    min: 0,
    max: 100,
    step: 1,
    controls: true,
    controlsPosition: 'end',
    useGrouping: false,
    required: false,
    readonly: false,
    disabled: false,
    error: false,
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
  },
  render: (args) => html`
    <biz-number-input
      .value=${args.value}
      .min=${args.min}
      .max=${args.max}
      .step=${args.step}
      .precision=${args.precision}
      ?controls=${args.controls}
      controls-position=${args.controlsPosition}
      ?use-grouping=${args.useGrouping}
      ?required=${args.required}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?error=${args.error}
      variant=${args.variant}
      size=${args.size}
      ?full-width=${args.fullWidth}
    >
      <span slot="label-slot">수량</span>
      <span slot="helper-text-slot">0에서 100 사이의 숫자를 입력하세요.</span>
    </biz-number-input>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-number-input variant="outlined" .value=${10}>
        <span slot="label-slot">Outlined</span>
      </biz-number-input>
      <biz-number-input variant="filled" .value=${20}>
        <span slot="label-slot">Filled</span>
      </biz-number-input>
      <biz-number-input variant="standard" .value=${30}>
        <span slot="label-slot">Standard</span>
      </biz-number-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-number-input size="small" .value=${100}>
        <span slot="label-slot">Small</span>
      </biz-number-input>
      <biz-number-input size="medium" .value=${200}>
        <span slot="label-slot">Medium</span>
      </biz-number-input>
      <biz-number-input size="large" .value=${300}>
        <span slot="label-slot">Large</span>
      </biz-number-input>
    </div>
  `,
};

export const ControlsPlacement: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-number-input controls-position="end" .value=${5}>
        <span slot="label-slot">End Position</span>
      </biz-number-input>
      <biz-number-input controls-position="stacked" .value=${5}>
        <span slot="label-slot">Stacked Position</span>
      </biz-number-input>
      <biz-number-input controls-position="split" .value=${5}>
        <span slot="label-slot">Split Position</span>
      </biz-number-input>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-number-input disabled .value=${50}>
        <span slot="label-slot">Disabled</span>
      </biz-number-input>
      <biz-number-input readonly .value=${50}>
        <span slot="label-slot">Readonly</span>
      </biz-number-input>
      <biz-number-input error .value=${150}>
        <span slot="label-slot">Error</span>
        <span slot="helper-text-slot">최댓값을 초과했습니다.</span>
      </biz-number-input>
    </div>
  `,
};
