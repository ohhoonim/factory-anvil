import React from 'react';
import { createComponent } from '@lit/react';
import { BizNumberInput } from './NumberInput.wc.js';

export const NumberInput = createComponent({
  tagName: 'biz-number-input',
  elementClass: BizNumberInput,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'change',
    onStepUp: 'step-up',
    onStepDown: 'step-down',
    onFocus: 'focus',
    onBlur: 'blur',
    onClear: 'clear',
  },
});