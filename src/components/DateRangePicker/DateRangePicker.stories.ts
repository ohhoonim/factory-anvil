import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './DateRangePicker.wc';

const meta: Meta = {
  title: 'Components/Forms/DateRangePicker',
  component: 'biz-date-range-picker',
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
    calendarMode: {
      control: { type: 'radio' },
      options: ['dual', 'single'],
    },
    inputMode: {
      control: { type: 'radio' },
      options: ['single', 'double'],
    },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    loading: { control: 'boolean' },
    onchange: { action: 'change' },
    oninput: { action: 'input' },
    onclear: { action: 'clear' },
  },
  args: {
    variant: 'outlined',
    size: 'medium',
    calendarMode: 'dual',
    inputMode: 'double',
    clearable: true,
    disabled: false,
    readonly: false,
    error: false,
    loading: false,
  },
  render: (args) => html`
    <biz-date-range-picker
      .value=${args.value || [null, null]}
      .format=${args.format || 'YYYY-MM-DD'}
      .calendarMode=${args.calendarMode}
      .inputMode=${args.inputMode}
      .variant=${args.variant}
      .size=${args.size}
      .placeholder=${args.placeholder || ['시작일', '종료일']}
      ?clearable=${args.clearable}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?error=${args.error}
      ?loading=${args.loading}
      .presets=${args.presets || []}
      @change=${args.onChange}
      @input=${args.onInput}
      @clear=${args.onClear}
    >
      <span slot="label-slot">조회 기간</span>
      <span slot="helper-text-slot">시작일과 종료일을 선택해 주세요.</span>
    </biz-date-range-picker>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-date-range-picker variant="outlined">
        <span slot="label-slot">Outlined Variant</span>
      </biz-date-range-picker>
      <biz-date-range-picker variant="filled">
        <span slot="label-slot">Filled Variant</span>
      </biz-date-range-picker>
      <biz-date-range-picker variant="standard">
        <span slot="label-slot">Standard Variant</span>
      </biz-date-range-picker>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-date-range-picker size="small">
        <span slot="label-slot">Small Size</span>
      </biz-date-range-picker>
      <biz-date-range-picker size="medium">
        <span slot="label-slot">Medium Size</span>
      </biz-date-range-picker>
      <biz-date-range-picker size="large">
        <span slot="label-slot">Large Size</span>
      </biz-date-range-picker>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-date-range-picker disabled>
        <span slot="label-slot">Disabled State</span>
      </biz-date-range-picker>
      <biz-date-range-picker readonly .value=${[new Date('2026-08-01'), new Date('2026-08-07')] as [Date,Date]}>
        <span slot="label-slot">Readonly State</span>
      </biz-date-range-picker>
      <biz-date-range-picker error>
        <span slot="label-slot">Error State</span>
        <span slot="helper-text-slot" style="color: var(--biz-date-range-picker-error-color);">
          유효하지 않은 날짜 범위입니다.
        </span>
      </biz-date-range-picker>
      <biz-date-range-picker loading>
        <span slot="label-slot">Loading State</span>
      </biz-date-range-picker>
    </div>
  `,
};

export const SingleInputAndCalendar: Story = {
  args: {
    inputMode: 'single',
    calendarMode: 'single',
  },
};

export const WithPresets: Story = {
  args: {
    presets: [
      { label: '오늘', range: [new Date(), new Date()] },
      {
        label: '최근 7일',
        range: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],
      },
      {
        label: '이번 달',
        range: [
          new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        ],
      },
    ],
  },
};