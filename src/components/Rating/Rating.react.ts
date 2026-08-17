import React from 'react';
import { createComponent } from '@lit/react';
import { BizRating } from './Rating.wc.js';

export const Rating = createComponent({
  tagName: 'biz-rating',
  elementClass: BizRating,
  react: React,
  events: {
    onChange: 'change',
    onInput: 'input',
    onHoverChange: 'hover-change',
    onClear: 'clear',
  },
});