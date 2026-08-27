import React from 'react';
import { createComponent } from '@lit/react';
import { BizSlider as BizSliderWc } from './Slider.wc.js';

export const BizSlider = createComponent({
  tagName: 'biz-slider',
  elementClass: BizSliderWc,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'change',
    onClear: 'clear',
    onFocus: 'focus',
    onBlur: 'blur',
  },
});