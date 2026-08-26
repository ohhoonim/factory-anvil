import React from 'react';
import { createComponent } from '@lit/react';
import { BizInlineEditWrapper } from './InlineEditWrapper.wc.js';

export const InlineEditWrapper = createComponent({
  tagName: 'biz-inline-edit-wrapper',
  elementClass: BizInlineEditWrapper,
  react: React,
  events: {
    onModeChange: 'mode-change',
    onSave: 'save',
    onCancel: 'cancel',
  },
});