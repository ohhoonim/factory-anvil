import * as React from 'react';
import { createComponent } from '@lit/react';
import { BizToggleButton } from './ToggleButton.wc.js';

export const ToggleButton = createComponent({
  tagName: 'biz-toggle-button',
  elementClass: BizToggleButton,
  react: React,
  events: {
    onToggle: 'toggle' as const,
    onChange: 'change' as const,
    onFocus: 'focus' as const,
    onBlur: 'blur' as const,
  },
});