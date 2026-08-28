// src/components/ToastContainer/ToastContainer.react.ts
import React from 'react';
import { createComponent } from '@lit/react';
import { BizToastContainer } from './ToastContainer.wc.js';

export const ToastContainer = createComponent({
  tagName: 'biz-toast-container',
  elementClass: BizToastContainer,
  react: React,
  events: {
    onContainerChange: 'container-change',
    onOverflowChange: 'overflow-change',
    onClear: 'clear',
  },
});