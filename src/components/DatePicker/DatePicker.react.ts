import React from 'react';
import { createComponent } from '@lit/react';
import { BizDatePicker } from './DatePicker.wc.js';

export const DatePicker = createComponent({
  tagName: 'biz-date-picker',
  elementClass: BizDatePicker,
  react: React,
  events: {
    onChange: 'change',
    onInput: 'input',
    onOpen: 'open',
    onClose: 'close',
    onMonthChange: 'month-change',
    onClear: 'clear',
  },
});