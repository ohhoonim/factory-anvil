// src/components/DataGrid/DataGrid.react.ts
import React from 'react';
import { createComponent } from '@lit/react';
import { BizDataGrid } from './DataGrid.wc.js';

export const DataGrid = createComponent({
  tagName: 'biz-data-grid',
  elementClass: BizDataGrid,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'change',
    onClear: 'clear',
    onScroll: 'scroll',
    onMouseOver: 'mouseover',
  },
});