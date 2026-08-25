import { createComponent } from '@lit/react';
import { BizSplitPane } from "./SplitPane.wc";
import React from 'react';

export const SplitPane = createComponent({
  tagName: 'biz-split-pane',
  elementClass: BizSplitPane,
  react: React,
  events: {
    onResizeStart: 'resize-start',
    onResize: 'resize',
    onResizeEnd: 'resize-end',
    onCollapse: 'collapse',
  },
});