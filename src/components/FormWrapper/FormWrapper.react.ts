import { createComponent } from '@lit/react';
import { BizFormWrapper } from "./FormWrapper.wc";
import React from 'react';

export const FormWrapper = createComponent({
  tagName: 'biz-form-wrapper',
  elementClass: BizFormWrapper,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'change',
    onClear: 'clear'
  }
});