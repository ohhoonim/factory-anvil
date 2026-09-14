import React from 'react';
import { createComponent } from '@lit/react';
import { BizDblToggleButton } from './DblToggleButton.wc';

export const DblToggleButton = createComponent({
  tagName: 'biz-dbl-toggle-button',
  elementClass: BizDblToggleButton,
  react: React,
  events: {
    onChange: 'change',
    onFocus: 'focus',
    onBlur: 'blur',
  },
});