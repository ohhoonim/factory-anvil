import React from 'react';
import { createComponent } from '@lit/react';
import { BizCheckbox } from './Checkbox.wc.js';

export const Checkbox = createComponent({
  tagName: 'biz-checkbox',
  elementClass: BizCheckbox,
  react: React,
  events: {
    onChange: 'change',
    onFocus: 'focus',
    onBlur: 'blur',
  },
});