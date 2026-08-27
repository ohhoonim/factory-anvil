import React from 'react';
import { createComponent } from '@lit/react';
import { BizDropdown } from './Dropdown.wc.ts';

export const Dropdown = createComponent({
  tagName: 'biz-dropdown',
  elementClass: BizDropdown,
  react: React,
  events: {
    onChange: 'change',
    onOpen: 'open',
    onClose: 'close',
    onSearch: 'search',
    onClear: 'clear',
    onTagRemove: 'tag-remove',
  },
});