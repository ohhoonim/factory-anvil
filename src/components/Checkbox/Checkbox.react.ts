import React from 'react';
import { createComponent } from '@lit/react';
import { BizCheckbox } from './Checkbox.wc.ts';

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