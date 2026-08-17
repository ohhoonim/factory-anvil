import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { BizDateTimePicker } from "./DateTimePicker.wc";

const meta: Meta<BizDateTimePicker> = {
  title: 'Components/DateTimePicker',
  component: 'biz-date-time-picker',
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
    layoutMode: {
      control: { type: 'select' },
      options: ['side-by-side', 'tabbed'],
    },
    use12Hours: { control: 'boolean' },
    showSeconds: { control: 'boolean' },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    variant: 'outlined',
    size: 'medium',
    layoutMode: 'side-by-side',
    use12Hours: false,
    showSeconds: false,
    clearable: true,
    disabled: false,
    readonly: false,
    error: false,
    fullWidth: false,
    placeholder: 'YYYY-MM-DD HH:mm',
  },
  render: (args) => html`
    <biz-date-time-picker
      .value=${args.value}
      .format=${args.format || 'YYYY-MM-DD HH:mm'}
      .layoutMode=${args.layoutMode}
      ?use12-hours=${args.use12Hours}
      ?show-seconds=${args.showSeconds}
      placeholder=${args.placeholder}
      ?clearable=${args.clearable}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?error=${args.error}
      variant=${args.variant}
      size=${args.size}
      ?full-width=${args.fullWidth}
    >
      <span slot="label-slot">일시 선택</span>
      <span slot="helper-text-slot">예: 2026-08-07 16:47</span>
    </biz-date-time-picker>
  `,
};

export default meta;
type Story = StoryObj<BizDateTimePicker>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-date-time-picker variant="outlined">
        <span slot="label-slot">Outlined</span>
      </biz-date-time-picker>
      <biz-date-time-picker variant="filled">
        <span slot="label-slot">Filled</span>
      </biz-date-time-picker>
      <biz-date-time-picker variant="standard">
        <span slot="label-slot">Standard</span>
      </biz-date-time-picker>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-date-time-picker size="small">
        <span slot="label-slot">Small</span>
      </biz-date-time-picker>
      <biz-date-time-picker size="medium">
        <span slot="label-slot">Medium</span>
      </biz-date-time-picker>
      <biz-date-time-picker size="large">
        <span slot="label-slot">Large</span>
      </biz-date-time-picker>
    </div>
  `,
};

export const LayoutModes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4>Side by Side Mode</h4>
        <biz-date-time-picker layout-mode="side-by-side"></biz-date-time-picker>
      </div>
      <div>
        <h4>Tabbed Mode</h4>
        <biz-date-time-picker layout-mode="tabbed"></biz-date-time-picker>
      </div>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-date-time-picker disabled value="2026-08-07T16:47:00">
        <span slot="label-slot">Disabled</span>
      </biz-date-time-picker>
      <biz-date-time-picker readonly value="2026-08-07T16:47:00">
        <span slot="label-slot">Readonly</span>
      </biz-date-time-picker>
      <biz-date-time-picker error>
        <span slot="label-slot">Error State</span>
        <span slot="helper-text-slot" style="color: var(--biz-date-time-picker-error-color);">올바른 일시를 입력하세요.</span>
      </biz-date-time-picker>
    </div>
  `,
};
