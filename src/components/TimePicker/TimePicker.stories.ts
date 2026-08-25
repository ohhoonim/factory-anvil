import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './TimePicker.wc.ts';

const meta: Meta = {
  title: 'Components/Forms/TimePicker',
  component: 'biz-time-picker',
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
    format: { control: 'text' },
    use12Hours: { control: 'boolean' },
    hourStep: { control: 'number' },
    minuteStep: { control: 'number' },
    secondStep: { control: 'number' },
    showSeconds: { control: 'boolean' },
    placeholder: { control: 'text' },
    clearable: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    variant: 'outlined',
    size: 'medium',
    format: 'HH:mm',
    use12Hours: false,
    hourStep: 1,
    minuteStep: 1,
    secondStep: 1,
    showSeconds: false,
    placeholder: 'HH:mm',
    clearable: true,
    readonly: false,
    disabled: false,
    error: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <biz-time-picker
      .variant=${args.variant}
      .size=${args.size}
      .value=${args.value}
      .format=${args.format}
      ?use12-hours=${args.use12Hours}
      .hourStep=${args.hourStep}
      .minuteStep=${args.minuteStep}
      .secondStep=${args.secondStep}
      ?show-seconds=${args.showSeconds}
      .placeholder=${args.placeholder}
      ?clearable=${args.clearable}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?error=${args.error}
      ?full-width=${args.fullWidth}
    >
      <label slot="label-slot" style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 600;">
        Select Time
      </label>
      <span slot="helper-text-slot" style="font-size: 12px; color: #6b7280; margin-top: 4px; display: block;">
        Please pick a valid business hour.
      </span>
    </biz-time-picker>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
      <div>
        <h4 style="margin: 0 0 8px 0;">Outlined</h4>
        <biz-time-picker variant="outlined" placeholder="Outlined"></biz-time-picker>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0;">Filled</h4>
        <biz-time-picker variant="filled" placeholder="Filled"></biz-time-picker>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0;">Standard</h4>
        <biz-time-picker variant="standard" placeholder="Standard"></biz-time-picker>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
      <div>
        <h4 style="margin: 0 0 8px 0;">Small</h4>
        <biz-time-picker size="small" placeholder="Small Size"></biz-time-picker>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0;">Medium</h4>
        <biz-time-picker size="medium" placeholder="Medium Size"></biz-time-picker>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0;">Large</h4>
        <biz-time-picker size="large" placeholder="Large Size"></biz-time-picker>
      </div>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
      <div>
        <h4 style="margin: 0 0 8px 0;">Disabled</h4>
        <biz-time-picker disabled value="14:30"></biz-time-picker>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0;">Readonly</h4>
        <biz-time-picker readonly value="09:00"></biz-time-picker>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0;">Error</h4>
        <biz-time-picker error value="99:99">
          <span slot="helper-text-slot" style="color: #dc2626; font-size: 12px;">Invalid time format</span>
        </biz-time-picker>
      </div>
    </div>
  `,
};

export const TwelveHourSystem: Story = {
  render: () => html`
    <biz-time-picker
      use12-hours
      show-seconds
      value="14:30:15"
      placeholder="hh:mm:ss A"
    >
      <label slot="label-slot" style="display: block; margin-bottom: 4px; font-size: 14px;">12-Hour System with Seconds</label>
    </biz-time-picker>
  `,
};

export const CustomSteps: Story = {
  render: () => html`
    <biz-time-picker
      minute-step="15"
      second-step="10"
      show-seconds
      placeholder="15m / 10s Step"
    >
      <label slot="label-slot" style="display: block; margin-bottom: 4px; font-size: 14px;">Interval Steps (Minute: 15, Second: 10)</label>
    </biz-time-picker>
  `,
};