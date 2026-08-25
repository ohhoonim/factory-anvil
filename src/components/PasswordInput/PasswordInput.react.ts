import React from 'react';
import { BizPasswordInput } from "./PasswordInput.wc";
import { createComponent } from '@lit/react';

export const PasswordInput = createComponent({
  tagName: 'biz-password-input',
  elementClass: BizPasswordInput,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'change',
    onToggleVisibility: 'toggle-visibility',
    onClear: 'clear',
    onFocus: 'focus',
    onBlur: 'blur',
  },
});