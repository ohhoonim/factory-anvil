import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { fn } from 'storybook/test';
import './DatePicker.wc.js';
import type { DatePickerHost } from './DatePicker.js';

type DatePickerArgs = Required<DatePickerHost> & {
  labelSlot?: string;
  prefixSlot?: string;
  suffixSlot?: string;
  helperTextSlot?: string;
  onChange?: (e: CustomEvent) => void;
  onInput?: (e: CustomEvent) => void;
  onOpen?: (e: CustomEvent) => void;
  onClose?: (e: CustomEvent) => void;
  onMonthChange?: (e: CustomEvent) => void;
  onClear?: (e: CustomEvent) => void;
};

const meta: Meta<DatePickerArgs> = {
  title: 'Components/Forms/DatePicker',
  component: 'biz-date-picker',
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
    mode: {
      control: { type: 'radio' },
      options: ['single', 'range'],
    },
    clearable: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    placeholder: { control: 'text' },
    format: { control: 'text' },
  },
  args: {
    value: null,
    format: 'YYYY-MM-DD',
    mode: 'single',
    minDate: null,
    maxDate: null,
    disabledDates: [],
    placeholder: 'YYYY-MM-DD',
    clearable: true,
    readonly: false,
    disabled: false,
    error: false,
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    isOpen: false,
    inputValue: '',
    currentYear: 2026,
    currentMonth: 7,
    calendarGrid: [],
    weekdays: ['일', '월', '화', '수', '목', '금', '토'],
    liveAnnouncement: '',
    labelSlot: '선택 일자',
    prefixSlot: '',
    suffixSlot: '',
    helperTextSlot: '날짜를 입력하거나 달력에서 선택하세요.',
    onChange: fn(),
    onInput: fn(),
    onOpen: fn(),
    onClose: fn(),
    onMonthChange: fn(),
    onClear: fn(),
  },
  render: (args) => html`
    <biz-date-picker
      .value=${args.value}
      .format=${args.format}
      .mode=${args.mode}
      .minDate=${args.minDate}
      .maxDate=${args.maxDate}
      .disabledDates=${args.disabledDates}
      .placeholder=${args.placeholder}
      ?clearable=${args.clearable}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?error=${args.error}
      .variant=${args.variant}
      .size=${args.size}
      ?full-width=${args.fullWidth}
      @change=${args.onChange}
      @input=${args.onInput}
      @open=${args.onOpen}
      @close=${args.onClose}
      @month-change=${args.onMonthChange}
      @clear=${args.onClear}
    >
      ${args.labelSlot ? html`<span slot="label-slot">${args.labelSlot}</span>` : ''}
      ${args.prefixSlot ? html`<span slot="prefix-slot">${args.prefixSlot}</span>` : ''}
      ${args.suffixSlot ? html`<span slot="suffix-slot">${args.suffixSlot}</span>` : ''}
      ${args.helperTextSlot ? html`<span slot="helper-text-slot">${args.helperTextSlot}</span>` : ''}
    </biz-date-picker>
  `,
};

export default meta;
type Story = StoryObj<DatePickerArgs>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 16px; flex-direction: column;">
      <biz-date-picker .variant=${'outlined'} .placeholder=${'Outlined'} .value=${args.value}>
        <span slot="label-slot">Outlined</span>
      </biz-date-picker>
      <biz-date-picker .variant=${'filled'} .placeholder=${'Filled'} .value=${args.value}>
        <span slot="label-slot">Filled</span>
      </biz-date-picker>
      <biz-date-picker .variant=${'standard'} .placeholder=${'Standard'} .value=${args.value}>
        <span slot="label-slot">Standard</span>
      </biz-date-picker>
    </div>
  `,
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 16px; flex-direction: column;">
      <biz-date-picker .size=${'small'} .placeholder=${'Small'} .value=${args.value}>
        <span slot="label-slot">Small</span>
      </biz-date-picker>
      <biz-date-picker .size=${'medium'} .placeholder=${'Medium'} .value=${args.value}>
        <span slot="label-slot">Medium</span>
      </biz-date-picker>
      <biz-date-picker .size=${'large'} .placeholder=${'Large'} .value=${args.value}>
        <span slot="label-slot">Large</span>
      </biz-date-picker>
    </div>
  `,
};

export const RangeMode: Story = {
  args: {
    mode: 'range',
    placeholder: 'YYYY-MM-DD ~ YYYY-MM-DD',
    labelSlot: '기간 선택',
    helperTextSlot: '시작일과 종료일을 선택하세요.',
  },
};

export const States: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 16px; flex-direction: column;">
      <biz-date-picker ?disabled=${true} .value=${'2026-08-01'}>
        <span slot="label-slot">Disabled State</span>
      </biz-date-picker>
      <biz-date-picker ?readonly=${true} .value=${'2026-08-15'}>
        <span slot="label-slot">Readonly State</span>
      </biz-date-picker>
      <biz-date-picker ?error=${true} .value=${'2026-08-99'}>
        <span slot="label-slot">Error State</span>
        <span slot="helper-text-slot" style="color: var(--biz-date-picker-error-color);">올바르지 않은 날짜 포맷입니다.</span>
      </biz-date-picker>
    </div>
  `,
};

export const EventHandlers: Story = {
  args: {
    onChange: fn(),
    onInput: fn(),
    onOpen: fn(),
    onClose: fn(),
    onMonthChange: fn(),
    onClear: fn(),
  },
};