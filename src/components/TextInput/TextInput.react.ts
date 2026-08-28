import React from 'react';
import { createComponent } from '@lit/react';
import { BizTextInput } from './TextInput.wc.ts';

export const TextInput = createComponent({
  tagName: 'biz-text-input',
  elementClass: BizTextInput,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'change',
    onFocus: 'focus',
    onBlur: 'blur',
    onClear: 'clear'
  }
});