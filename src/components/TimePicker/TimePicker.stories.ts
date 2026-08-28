import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn, expect, userEvent, within } from 'storybook/test';
import type { TimePickerHost } from './TimePicker';
import './TimePicker.wc';

type SlotArgs = {
  'label-slot'?: string;
  'prefix-slot'?: string;
  'suffix-slot'?: string;
  'header-slot'?: string;
  'footer-slot'?: string;
  'helper-text-slot'?: string;
};

type Args = Required<TimePickerHost> & SlotArgs;

const render = (args: Args) => html`
  <biz-time-picker
    .value=${args.value}
    .format=${args.format}
    ?use12Hours=${args.use12Hours}
    .hourStep=${args.hourStep}
    .minuteStep=${args.minuteStep}
    .secondStep=${args.secondStep}
    ?showSeconds=${args.showSeconds}
    .disabledHours=${args.disabledHours}
    .disabledMinutes=${args.disabledMinutes}
    .disabledSeconds=${args.disabledSeconds}
    .placeholder=${args.placeholder}
    ?clearable=${args.clearable}
    ?readonly=${args.readonly}
    ?disabled=${args.disabled}
    ?error=${args.error}
    .variant=${args.variant}
    .size=${args.size}
    ?fullWidth=${args.fullWidth}
    ?open=${args.open}
    .focusedColumn=${args.focusedColumn}
    .selectedHour=${args.selectedHour}
    .selectedMinute=${args.selectedMinute}
    .selectedSecond=${args.selectedSecond}
    .selectedAmPm=${args.selectedAmPm}
    .inputValue=${args.inputValue}
    ?hasLabel=${args.hasLabel}
    @time-change=${args.handleInput}
    @panel-toggle=${args.togglePanel}
    @clear=${args.handleClear}
    @column-focus=${args.handleInputFocus}
  >
    ${args['label-slot'] ? html`<span slot="label-slot">${args['label-slot']}</span>` : ''}
    ${args['prefix-slot'] ? html`<span slot="prefix-slot">${args['prefix-slot']}</span>` : ''}
    ${args['suffix-slot'] ? html`<span slot="suffix-slot">${args['suffix-slot']}</span>` : ''}
    ${args['header-slot'] ? html`<div slot="header-slot">${args['header-slot']}</div>` : ''}
    ${args['footer-slot'] ? html`<div slot="footer-slot">${args['footer-slot']}</div>` : ''}
    ${args['helper-text-slot'] ? html`<span slot="helper-text-slot">${args['helper-text-slot']}</span>` : ''}
  </biz-time-picker>
`;

const meta: Meta<Args> = {
  title: 'Components/Forms/TimePicker',
  component: 'biz-time-picker',
  tags: ["autodocs"],
  render,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    focusedColumn: {
      control: { type: 'select' },
      options: ['hour', 'minute', 'second', 'ampm'],
    },
    selectedAmPm: {
      control: { type: 'select' },
      options: ['AM', 'PM', null],
    },
    disabledHours: { table: { disable: true } },
    disabledMinutes: { table: { disable: true } },
    disabledSeconds: { table: { disable: true } },
    handleLabelSlotChange: { table: { disable: true } },
    handleInputKeydown: { table: { disable: true } },
    handleInput: { table: { disable: true } },
    handleInputFocus: { table: { disable: true } },
    handleInputBlur: { table: { disable: true } },
    togglePanel: { table: { disable: true } },
    handleClear: { table: { disable: true } },
    handleOptionSelect: { table: { disable: true } },
    handleColumnKeydown: { table: { disable: true } },
    handleNowClick: { table: { disable: true } },
    handleConfirmClick: { table: { disable: true } },
    getHourOptions: { table: { disable: true } },
    getMinuteOptions: { table: { disable: true } },
    getSecondOptions: { table: { disable: true } },
    getAmPmOptions: { table: { disable: true } },
  },
  args: {
    value: '10:30',
    format: 'HH:mm',
    use12Hours: false,
    hourStep: 1,
    minuteStep: 1,
    secondStep: 1,
    showSeconds: false,
    disabledHours: null,
    disabledMinutes: null,
    disabledSeconds: null,
    placeholder: 'Select time',
    clearable: true,
    readonly: false,
    disabled: false,
    error: false,
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    open: false,
    focusedColumn: 'hour',
    selectedHour: 10,
    selectedMinute: 30,
    selectedSecond: null,
    selectedAmPm: null,
    inputValue: '10:30',
    hasLabel: true,
    'label-slot': 'Time Selection',
    'prefix-slot': '',
    'suffix-slot': '',
    'header-slot': '',
    'footer-slot': '',
    'helper-text-slot': 'Select a valid time option.',
    handleLabelSlotChange: fn(),
    handleInputKeydown: fn(),
    handleInput: fn(),
    handleInputFocus: fn(),
    handleInputBlur: fn(),
    togglePanel: fn(),
    handleClear: fn(),
    handleOptionSelect: fn(),
    handleColumnKeydown: fn(),
    handleNowClick: fn(),
    handleConfirmClick: fn(),
    getHourOptions: () => [],
    getMinuteOptions: () => [],
    getSecondOptions: () => [],
    getAmPmOptions: () => [],
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const WithoutLabel: Story = {
  args: {
    hasLabel: false,
    'label-slot': '',
  },
};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-time-picker .variant=${'outlined'} .value=${args.value} .inputValue=${args.inputValue}>
        <span slot="label-slot">Outlined</span>
      </biz-time-picker>
      <biz-time-picker .variant=${'filled'} .value=${args.value} .inputValue=${args.inputValue}>
        <span slot="label-slot">Filled</span>
      </biz-time-picker>
      <biz-time-picker .variant=${'standard'} .value=${args.value} .inputValue=${args.inputValue}>
        <span slot="label-slot">Standard</span>
      </biz-time-picker>
    </div>
  `,
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-time-picker .size=${'small'} .value=${args.value} .inputValue=${args.inputValue}>
        <span slot="label-slot">Small</span>
      </biz-time-picker>
      <biz-time-picker .size=${'medium'} .value=${args.value} .inputValue=${args.inputValue}>
        <span slot="label-slot">Medium</span>
      </biz-time-picker>
      <biz-time-picker .size=${'large'} .value=${args.value} .inputValue=${args.inputValue}>
        <span slot="label-slot">Large</span>
      </biz-time-picker>
    </div>
  `,
};

export const States: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-time-picker ?disabled=${true} .value=${args.value} .inputValue=${args.inputValue}>
        <span slot="label-slot">Disabled State</span>
      </biz-time-picker>
      <biz-time-picker ?readonly=${true} .value=${args.value} .inputValue=${args.inputValue}>
        <span slot="label-slot">Readonly State</span>
      </biz-time-picker>
      <biz-time-picker ?error=${true} .value=${args.value} .inputValue=${args.inputValue}>
        <span slot="label-slot">Error State</span>
        <span slot="helper-text-slot">Invalid time format</span>
      </biz-time-picker>
    </div>
  `,
};

export const OpenDropdown: Story = {
  args: {
    open: true,
  },
};

export const TwelveHourFormatWithSeconds: Story = {
  args: {
    use12Hours: true,
    showSeconds: true,
    format: 'hh:mm:ss a',
    value: '10:30:45 AM',
    inputValue: '10:30:45 AM',
    selectedHour: 10,
    selectedMinute: 30,
    selectedSecond: 45,
    selectedAmPm: 'AM',
  },
};

export const EventTimeChange: Story = {
  args: {
    handleInput: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, '11:45');
    await expect(args.handleInput).toHaveBeenCalled();
  },
};

export const EventPanelToggle: Story = {
  args: {
    togglePanel: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('button', { name: /toggle time panel/i });
    await userEvent.click(toggleButton);
    await expect(args.togglePanel).toHaveBeenCalled();
  },
};

export const EventClear: Story = {
  args: {
    clearable: true,
    value: '10:30',
    inputValue: '10:30',
    handleClear: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const clearButton = canvas.getByRole('button', { name: /clear time/i });
    await userEvent.click(clearButton);
    await expect(args.handleClear).toHaveBeenCalled();
  },
};

export const AccessibilityInteractive: Story = {
  args: {
    'label-slot': 'Accessible Time Selection',
    'helper-text-slot': 'Use arrow keys to navigate and enter to select',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await expect(input).toHaveAttribute('aria-haspopup', 'listbox');
  },
};