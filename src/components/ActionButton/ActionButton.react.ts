import React from 'react';
import { createComponent } from '@lit/react';
import { BizActionButton } from './ActionButton.wc.js';

export const ActionButton = createComponent({
  tagName: 'biz-action-button',
  elementClass: BizActionButton,
  react: React,
  events: {
    onActionClick: 'action-click',
    onItemSelect: 'item-select',
    onDropdownToggle: 'dropdown-toggle',
  },
});