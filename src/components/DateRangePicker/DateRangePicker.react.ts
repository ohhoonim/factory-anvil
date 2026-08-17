import React from 'react';
import { createComponent } from '@lit/react';
import { DateRangePicker as DateRangePickerWc } from './DateRangePicker.wc.ts';

export const DateRangePicker = createComponent({
  tagName: 'biz-date-range-picker',
  elementClass: DateRangePickerWc,
  react: React,
  events: {
    onChange: 'change',
    onInput: 'input',
    onRangeStartSelect: 'range-start-select',
    onRangeEndSelect: 'range-end-select',
    onOpen: 'open',
    onClose: 'close',
    onClear: 'clear',
  },
});