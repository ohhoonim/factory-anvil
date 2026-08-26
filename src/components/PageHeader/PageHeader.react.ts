import React from 'react';
import { createComponent } from '@lit/react';
import { BizPageHeader } from './PageHeader.wc.js';

export const PageHeader = createComponent({
  tagName: 'biz-page-header',
  elementClass: BizPageHeader,
  react: React,
  events: {
    onActionClick: 'action-click',
    onClear: 'clear',
  },
});