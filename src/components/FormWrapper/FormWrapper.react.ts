import * as React from 'react';
import { createComponent } from '@lit/react';
import { FormWrapper as FormWrapperWc } from './FormWrapper.wc';

export const FormWrapper = createComponent({
  tagName: 'biz-form-wrapper',
  elementClass: FormWrapperWc,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'change',
    onClear: 'clear',
  },
});