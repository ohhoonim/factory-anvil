import React from 'react';
import { createComponent } from '@lit/react';
import { BizSlider } from './Slider.wc';

export const Slider = createComponent({
  tagName: 'biz-slider',
  elementClass: BizSlider,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'change',
    onFocus: 'focus',
    onBlur: 'blur',
    onClear: 'clear',
  },
});