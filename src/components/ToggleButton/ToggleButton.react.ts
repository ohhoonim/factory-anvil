import React from 'react';
import { createComponent } from '@lit/react';
import { BizToggleButton } from './ToggleButton.wc.js';

export const ToggleButton = createComponent({
  tagName: 'biz-toggle-button',
  elementClass: BizToggleButton,
  react: React,
  events: {
    onChange: 'change'
  }
});