import React from 'react';
import { createComponent } from '@lit/react';
import { BizRating } from './Rating.wc.js';

export const Rating = createComponent({
  tagName: 'biz-rating',
  elementClass: BizRating,
  react: React,
  events: {
    onChange: 'change',
    onHoverChange: 'hover-change',
    onClear: 'clear',
  },
});