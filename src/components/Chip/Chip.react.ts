import React from 'react';
import { createComponent } from '@lit/react';
import { BizChip } from './Chip.wc.js';

export const Chip = createComponent({
  tagName: 'biz-chip',
  elementClass: BizChip,
  react: React,
  events: {
    onChange: 'change',
    onChipAdd: 'chip-add',
    onChipRemove: 'chip-remove',
    onFocus: 'focus',
    onBlur: 'blur',
    onClear: 'clear',
  },
});