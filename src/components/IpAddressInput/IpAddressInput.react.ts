import React from 'react';
import { createComponent } from '@lit/react';
import { BizIpAddressInput } from './IpAddressInput.wc.js';

export const IpAddressInput = createComponent({
  tagName: 'biz-ip-address-input',
  elementClass: BizIpAddressInput,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'change',
    onPaste: 'paste',
    onFocus: 'focus',
    onBlur: 'blur',
    onClear: 'clear',
  },
});