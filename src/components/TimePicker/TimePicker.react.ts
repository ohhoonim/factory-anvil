import React from 'react';
import { createComponent } from '@lit/react';
import { BizTimePicker } from './TimePicker.wc.ts';

export const TimePicker = createComponent({
  tagName: 'biz-time-picker',
  elementClass: BizTimePicker,
  react: React,
  events: {
    onChange: 'change',
    onInput: 'input',
    onOpen: 'open',
    onClose: 'close',
    onClear: 'clear',
    onFocus: 'focus',
    onBlur: 'blur'
  }
});