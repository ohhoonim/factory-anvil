import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { DateRangePickerProps } from './DateRangePicker';
import './DateRangePicker.wc';

const meta: Meta<DateRangePickerProps> = {
  title: 'Components/Forms/DateRangePicker',
  render: (args) => html`
    <biz-date-range-picker 
      .startDate=${args.startDate}? 
      .endDate=${args.endDate}? 
      .minDate=${args.minDate}? 
      .maxDate=${args.maxDate}? 
      @range-change=${(e: CustomEvent) => args.onRangeChange?.(e.detail)}
    ></biz-date-range-picker>
  `,
};

export default meta;
type Story = StoryObj<DateRangePickerProps>;

export const Default: Story = {
  args: {
    startDate: '2026-04-18',
    endDate: '2026-04-25',
  },
};
