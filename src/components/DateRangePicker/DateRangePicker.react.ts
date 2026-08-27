import {createComponent} from '@lit/react';
import React from 'react';
import { BizDateRangePicker } from './DateRangePicker.wc.js';

export const DateRangePicker = createComponent({
  react: React,
  tagName: 'biz-date-range-picker',
  elementClass: BizDateRangePicker,
  events: {
    onChange: 'change',
    onInput: 'input',
    onRangeStartSelect: 'range-start-select',
    onRangeEndSelect: 'range-end-select',
    onOpen: 'open',
    onClose: 'close',
    onClear: 'clear'
  }
});