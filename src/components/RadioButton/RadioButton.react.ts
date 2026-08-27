import React from 'react';
import { createComponent } from '@lit/react';
import { BizRadioButton } from './RadioButton.wc.js';

export const RadioButton = createComponent({
  tagName: 'biz-radio-button',
  elementClass: BizRadioButton,
  react: React,
  events: {
    onChange: 'change',
    onFocus: 'focus',
    onBlur: 'blur',
    onClear: 'clear',
  },
});