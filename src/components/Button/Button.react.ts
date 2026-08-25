import React from 'react';
import { createComponent } from '@lit/react';
import { BizButton } from './Button.wc';

export const Button = createComponent({
  tagName: 'biz-button',
  elementClass: BizButton,
  react: React,
  events: {
    onClick: 'click',
    onFocus: 'focus',
    onBlur: 'blur',
  },
});