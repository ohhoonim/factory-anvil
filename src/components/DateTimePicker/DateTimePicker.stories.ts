import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import type { DateTimePickerHost } from './DateTimePicker.js';
import './DateTimePicker.wc.js';

type Args = Required<DateTimePickerHost> & {
  'label-slot'?: string;
  'prefix-slot'?: string;
  'suffix-slot'?: string;
  'header-slot'?: string;
  'footer-slot'?: string;
  'helper-text-slot'?: string;
  onChange?: (e: CustomEvent) => void;
  onInput?: (e: CustomEvent) => void;
  onOpen?: (e: CustomEvent) => void;
  onClose?: (e: CustomEvent) => void;
  onDateChange?: (e: CustomEvent) => void;
  onTimeChange?: (e: CustomEvent) => void;
  onClear?: (e: CustomEvent) => void;
};

const meta: Meta<Args> = {
  title: 'Components/Forms/DateTimePicker',
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
    labelLayout: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
    value: { control: 'text' },
    format: { control: 'text' },
    use12Hours: { control: 'boolean' },
    showSeconds: { control: 'boolean' },
    minDatetime: { control: 'text' },
    maxDatetime: { control: 'text' },
    placeholder: { control: 'text' },
    clearable: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    value: '',
    format: 'YYYY-MM-DD HH:mm',
    layoutMode: 'side-by-side',
    labelLayout: 'vertical',
    use12Hours: false,
    showSeconds: false,
    minDatetime: null,
    maxDatetime: null,
    placeholder: 'YYYY-MM-DD HH:mm',
    clearable: true,
    readonly: false,
    disabled: false,
    error: false,
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    isOpen: false,
    activeTab: 'date',
    displayMonth: new Date(),
    selectedDate: null,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ampm: 'AM',
    formattedValue: '',
    liveAnnounceText: '',
    disabledDates: [],
    disabledHours: null,
    disabledMinutes: null,
    calendarGrid: [],
    hoursList: [],
    minutesList: [],
    secondsList: [],
    ampmList: [],
    handleInputClick: fn(),
    handleInputKeydown: fn(),
    handleClear: fn(),
    handlePrevMonth: fn(),
    handleNextMonth: fn(),
    handleDateSelect: fn(),
    handleTimeSelect: fn(),
    handleTabChange: fn(),
    handleNowClick: fn(),
    handleConfirmClick: fn(),
    handleCancelClick: fn(),
  },
  render: (args) => html`
    <biz-date-time-picker
      .value=${args.value}
      .format=${args.format}
      layout-mode=${args.layoutMode}
      label-layout=${args.labelLayout}
      ?use12-hours=${args.use12Hours}
      ?show-seconds=${args.showSeconds}
      .minDatetime=${args.minDatetime}
      .maxDatetime=${args.maxDatetime}
      .disabledDates=${args.disabledDates}
      .disabledHours=${args.disabledHours}
      .disabledMinutes=${args.disabledMinutes}
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
      @date-change=${args.onDateChange}
      @time-change=${args.onTimeChange}
      @clear=${args.onClear}
    >
      ${args['label-slot'] ? html`<span slot="label-slot">${args['label-slot']}</span>` : ''}
      ${args['prefix-slot'] ? html`<span slot="prefix-slot">${args['prefix-slot']}</span>` : ''}
      ${args['suffix-slot'] ? html`<span slot="suffix-slot">${args['suffix-slot']}</span>` : ''}
      ${args['header-slot'] ? html`<div slot="header-slot">${args['header-slot']}</div>` : ''}
      ${args['footer-slot'] ? html`<div slot="footer-slot">${args['footer-slot']}</div>` : ''}
      ${args['helper-text-slot'] ? html`<span slot="helper-text-slot">${args['helper-text-slot']}</span>` : ''}
    </biz-date-time-picker>
  `,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    'label-slot': 'Select Date & Time',
    'helper-text-slot': 'Please choose a valid date and time.',
    onChange: fn(),
    onInput: fn(),
    onOpen: fn(),
    onClose: fn(),
    onDateChange: fn(),
    onTimeChange: fn(),
    onClear: fn(),
  },
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-date-time-picker .variant=${'outlined'} .placeholder=${'Outlined Variant'}>
        <span slot="label-slot">Outlined</span>
      </biz-date-time-picker>
      <biz-date-time-picker .variant=${'filled'} .placeholder=${'Filled Variant'}>
        <span slot="label-slot">Filled</span>
      </biz-date-time-picker>
      <biz-date-time-picker .variant=${'standard'} .placeholder=${'Standard Variant'}>
        <span slot="label-slot">Standard</span>
      </biz-date-time-picker>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-date-time-picker .size=${'small'} .placeholder=${'Small Size'}>
        <span slot="label-slot">Small</span>
      </biz-date-time-picker>
      <biz-date-time-picker .size=${'medium'} .placeholder=${'Medium Size'}>
        <span slot="label-slot">Medium</span>
      </biz-date-time-picker>
      <biz-date-time-picker .size=${'large'} .placeholder=${'Large Size'}>
        <span slot="label-slot">Large</span>
      </biz-date-time-picker>
    </div>
  `,
};

export const LabelLayouts: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 500px;">
      <biz-date-time-picker label-layout="vertical">
        <span slot="label-slot">Vertical Label</span>
      </biz-date-time-picker>
      <biz-date-time-picker label-layout="horizontal">
        <span slot="label-slot">Horizontal Label</span>
      </biz-date-time-picker>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-date-time-picker ?disabled=${true} .value=${'2026-08-27 14:30'}>
        <span slot="label-slot">Disabled State</span>
      </biz-date-time-picker>
      <biz-date-time-picker ?readonly=${true} .value=${'2026-08-27 14:30'}>
        <span slot="label-slot">Readonly State</span>
      </biz-date-time-picker>
      <biz-date-time-picker ?error=${true} .value=${'Invalid Date'}>
        <span slot="label-slot">Error State</span>
        <span slot="helper-text-slot">Invalid date selected.</span>
      </biz-date-time-picker>
    </div>
  `,
};

export const LayoutTabbed: Story = {
  args: {
    layoutMode: 'tabbed',
    'label-slot': 'Tabbed Layout',
    onChange: fn(),
    onInput: fn(),
    onOpen: fn(),
    onClose: fn(),
    onDateChange: fn(),
    onTimeChange: fn(),
    onClear: fn(),
  },
};

export const InteractiveEvents: Story = {
  args: {
    'label-slot': 'Event Listener Test',
    clearable: true,
    onChange: fn(),
    onInput: fn(),
    onOpen: fn(),
    onClose: fn(),
    onDateChange: fn(),
    onTimeChange: fn(),
    onClear: fn(),
  },
};