import React from 'react';
import { createComponent } from '@lit/react';
import { BizIpAddressInput as IpAddressInputWc } from './IpAddressInput.wc';

export const IpAddressInput = createComponent({
  tagName: 'biz-ip-address-input',
  elementClass: IpAddressInputWc,
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