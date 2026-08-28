import React from 'react';
import { createComponent } from '@lit/react';
import { BizTransferList } from './TransferList.wc';

export const TransferList = createComponent({
  tagName: 'biz-transfer-list',
  elementClass: BizTransferList,
  react: React,
  events: {
    onChange: 'change',
    onSelectChange: 'select-change',
    onSearch: 'search',
    onReorder: 'reorder',
  },
});