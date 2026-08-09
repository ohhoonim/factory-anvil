import React from 'react';
import { createComponent } from '@lit/react';
import { BreadcrumbWC } from './Breadcrumb.wc';

export const Breadcrumb = createComponent({
  tagName: 'biz-breadcrumb',
  elementClass: BreadcrumbWC,
  react: React,
  events: {
    onPathClick: 'path-click',
  },
});
