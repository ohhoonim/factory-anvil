import { createComponent } from '@lit/react';
import React from 'react';

import { PageHeader as PageHeaderWc } from "./PageHeader.wc";

export const PageHeader = createComponent({
  react: React,
  tagName: 'biz-page-header',
  elementClass: PageHeaderWc,
  events: {
    onActionClick: 'action-click',
    onClear: 'clear',
    onSlotChange: 'slot-change',
  },
});