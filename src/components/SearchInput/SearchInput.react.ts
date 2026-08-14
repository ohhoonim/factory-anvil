import React from "react";
import { SearchInputWC } from "./SearchInput.wc";
import { createComponent } from "@lit/react";

export const SearchInput = createComponent({
  tagName: 'biz-search-input',
  elementClass: SearchInputWC,
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