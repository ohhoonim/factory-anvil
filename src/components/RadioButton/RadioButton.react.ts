import React from 'react';
import { createComponent } from '@lit/react';
import { RadioButton as RadioButtonWc } from './RadioButton.wc';

export const RadioButton = createComponent({
  tagName: 'biz-radio-button',
  elementClass: RadioButtonWc,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'change',
    onFocus: 'focus',
    onBlur: 'blur',
    onClear: 'clear',
  },
});