import React from 'react';
import { createComponent } from '@lit/react';
import { BizSearchInput } from './SearchInput.wc.js';

export const SearchInput = createComponent({
  tagName: 'biz-search-input',
  elementClass: BizSearchInput,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'change',
    onSearch: 'search',
    onClear: 'clear',
    onFocus: 'focus',
    onBlur: 'blur',
  },
});