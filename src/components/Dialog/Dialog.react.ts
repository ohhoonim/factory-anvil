import React from 'react';
import { createComponent } from '@lit/react';
import { BizDialog } from './Dialog.wc.js';

export const Dialog = createComponent({
  tagName: 'biz-dialog',
  elementClass: BizDialog,
  react: React,
  events: {
    onDialogOpen: 'dialog-open',
    onDialogClose: 'dialog-close',
    onBackdropClick: 'backdrop-click',
  },
});