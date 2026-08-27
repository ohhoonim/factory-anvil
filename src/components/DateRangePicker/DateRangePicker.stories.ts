import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import type { DateRangePickerHost, PresetObject } from './DateRangePicker.js';
import './DateRangePicker.wc.js';

type Args = Required<DateRangePickerHost> & {
  labelSlot?: string;
  prefixSlot?: string;
  separatorSlot?: string;
  suffixSlot?: string;
  presetsSlot?: string;
  headerSlot?: string;
  footerSlot?: string;
  helperTextSlot?: string;
};

const samplePresets: PresetObject[] = [
  {
    label: '오늘',
    value: [new Date(), new Date()]
  },
  {
    label: '최근 7일',
    value: [
      new Date(new Date().setDate(new Date().getDate() - 6)),
      new Date()
    ]
  },
  {
    label: '이번 달',
    value: [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    ]
  }
];

const meta: Meta<Args> = {
  title: 'Components/Forms/DateRangePicker',
  component: 'biz-date-range-picker',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    calendarMode: {
      control: { type: 'inline-radio' },
      options: ['dual', 'single']
    },
    inputMode: {
      control: { type: 'inline-radio' },
      options: ['single', 'double']
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    clearable: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    format: { control: 'text' }
  },
  args: {
    value: [null, null],
    format: 'YYYY-MM-DD',
    calendarMode: 'dual',
    inputMode: 'double',
    minDate: null,
    maxDate: null,
    minRange: null,
    maxRange: null,
    disabledDates: [],
    presets: samplePresets,
    placeholder: ['시작일', '종료일'],
    clearable: true,
    readonly: false,
    disabled: false,
    error: false,
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    isOpen: false,
    focusedInput: null,
    currentDisplayMonth: new Date(),
    hoveredDate: null,
    handleInputFocus: fn(),
    handleInputChange: fn(),
    handleTogglePopover: fn(),
    handleClear: fn(),
    handlePresetClick: fn(),
    handleDateClick: fn(),
    handleDateMouseEnter: fn(),
    handleDateMouseLeave: fn(),
    handlePrevMonth: fn(),
    handleNextMonth: fn(),
    handleApply: fn(),
    handleCancel: fn(),
    handleKeyDown: fn(),
    formatDateValue: (date) => (date ? String(date) : ''),
    isDateDisabled: () => false,
    isDateSelected: () => false,
    isDateInRange: () => false,
    isRangeStart: () => false,
    isRangeEnd: () => false,
    renderCalendarGrid: () => html``,
    labelSlot: '조회 기간',
    prefixSlot: '',
    separatorSlot: '~',
    suffixSlot: '',
    presetsSlot: '',
    headerSlot: '',
    footerSlot: '',
    helperTextSlot: '시작일과 종료일을 선택하세요.'
  },
  render: (args) => html`
    <biz-date-range-picker
      .value="${args.value}"
      .format="${args.format}"
      .calendarMode="${args.calendarMode}"
      .inputMode="${args.inputMode}"
      .minDate="${args.minDate}"
      .maxDate="${args.maxDate}"
      .minRange="${args.minRange}"
      .maxRange="${args.maxRange}"
      .disabledDates="${args.disabledDates}"
      .presets="${args.presets}"
      .placeholder="${args.placeholder}"
      ?clearable="${args.clearable}"
      ?readonly="${args.readonly}"
      ?disabled="${args.disabled}"
      ?error="${args.error}"
      .variant="${args.variant}"
      .size="${args.size}"
      ?full-width="${args.fullWidth}"
     
    >
      ${args.labelSlot ? html`<span slot="label-slot">${args.labelSlot}</span>` : ''}
      ${args.prefixSlot ? html`<span slot="prefix-slot">${args.prefixSlot}</span>` : ''}
      ${args.separatorSlot ? html`<span slot="separator-slot">${args.separatorSlot}</span>` : ''}
      ${args.suffixSlot ? html`<span slot="suffix-slot">${args.suffixSlot}</span>` : ''}
      ${args.presetsSlot ? html`<span slot="presets-slot">${args.presetsSlot}</span>` : ''}
      ${args.headerSlot ? html`<span slot="header-slot">${args.headerSlot}</span>` : ''}
      ${args.footerSlot ? html`<span slot="footer-slot">${args.footerSlot}</span>` : ''}
      ${args.helperTextSlot ? html`<span slot="helper-text-slot">${args.helperTextSlot}</span>` : ''}
    </biz-date-range-picker>
  `
};

export default meta;

export const Default: StoryObj<Args> = {};

export const Variants: StoryObj<Args> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-date-range-picker variant="outlined">
        <span slot="label-slot">Outlined (Default)</span>
      </biz-date-range-picker>
      <biz-date-range-picker variant="filled">
        <span slot="label-slot">Filled</span>
      </biz-date-range-picker>
      <biz-date-range-picker variant="standard">
        <span slot="label-slot">Standard</span>
      </biz-date-range-picker>
    </div>
  `
};

export const Sizes: StoryObj<Args> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-date-range-picker size="small">
        <span slot="label-slot">Small</span>
      </biz-date-range-picker>
      <biz-date-range-picker size="medium">
        <span slot="label-slot">Medium (Default)</span>
      </biz-date-range-picker>
      <biz-date-range-picker size="large">
        <span slot="label-slot">Large</span>
      </biz-date-range-picker>
    </div>
  `
};

export const States: StoryObj<Args> = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-date-range-picker disabled .value="${[new Date('2026-08-01'), new Date('2026-08-07')] as [Date, Date]}">
        <span slot="label-slot">Disabled</span>
      </biz-date-range-picker>
      <biz-date-range-picker readonly .value="${[new Date('2026-08-01'), new Date('2026-08-07')] as [Date, Date]}">
        <span slot="label-slot">Readonly</span>
      </biz-date-range-picker>
      <biz-date-range-picker error>
        <span slot="label-slot">Error</span>
        <span slot="helper-text-slot">올바른 날짜 범위를 선택하세요.</span>
      </biz-date-range-picker>
    </div>
  `
};

export const SingleInputMode: StoryObj<Args> = {
  args: {
    inputMode: 'single',
    placeholder: '기간을 선택하세요'
  }
};

export const SingleCalendarMode: StoryObj<Args> = {
  args: {
    calendarMode: 'single'
  }
};

export const CustomPresets: StoryObj<Args> = {
  args: {
    presets: samplePresets
  }
};
