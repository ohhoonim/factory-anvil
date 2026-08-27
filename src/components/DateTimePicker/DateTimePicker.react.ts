import React from 'react';
import { createComponent } from '@lit/react';
import { BizDateTimePicker } from './DateTimePicker.wc.js';

export const DateTimePicker = createComponent({
  tagName: 'biz-date-time-picker',
  elementClass: BizDateTimePicker,
  react: React,
  events: {
    onChange: 'change',
    onInput: 'input',
    onOpen: 'open',
    onClose: 'close',
    onDateChange: 'date-change',
    onTimeChange: 'time-change',
    onClear: 'clear',
  },
});