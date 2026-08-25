import { createComponent } from '@lit/react';
import React from 'react';
import { BizNumberInput } from "./NumberInput.wc";

export const NumberInput = createComponent({
  react: React,
  tagName: 'biz-number-input',
  elementClass: BizNumberInput,
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