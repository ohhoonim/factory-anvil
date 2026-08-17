import React from 'react';
import { createComponent } from '@lit/react';
import { CheckboxGroup as CheckboxGroupWc } from './CheckboxGroup.wc.js';

export const CheckboxGroup = createComponent({
  tagName: 'biz-checkbox-group',
  elementClass: CheckboxGroupWc,
  react: React,
  events: {
    onChange: 'change',
    onClear: 'clear'
  }
});