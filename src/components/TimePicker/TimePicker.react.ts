import React from 'react';
import { createComponent } from '@lit/react';
import { BizTimePicker as BizTimePickerElement } from './TimePicker.wc';

export const TimePicker = createComponent({
  tagName: 'biz-time-picker',
  elementClass: BizTimePickerElement,
  react: React,
  events: {
    onChange: 'change',
    onInput: 'input',
    onOpen: 'open',
    onClose: 'close',
    onClear: 'clear',
  },
});