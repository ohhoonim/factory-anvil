import React from 'react';
import { createComponent } from '@lit/react';
import { BizBreadcrumb } from './Breadcrumb.wc';

export const Breadcrumb = createComponent({
  tagName: 'biz-breadcrumb',
  elementClass: BizBreadcrumb,
  react: React,
  events: {
    onPathClick: 'path-click',
  },
});
