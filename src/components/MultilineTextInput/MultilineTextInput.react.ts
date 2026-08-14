import React from 'react';
import { createComponent } from '@lit/react';
import { BizMultilineTextInput } from './MultilineTextInput.wc.js';

export const MultilineTextInput = createComponent({
  tagName: 'biz-multiline-text-input',
  elementClass: BizMultilineTextInput,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'change',
    onFocus: 'focus',
    onBlur: 'blur',
    onClear: 'clear'
  }
});