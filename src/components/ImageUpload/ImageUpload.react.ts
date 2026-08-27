import React from 'react';
import { createComponent } from '@lit/react';
import { BizImageUpload } from './ImageUpload.wc.js';

export const ImageUpload = createComponent({
  tagName: 'biz-image-upload',
  elementClass: BizImageUpload,
  react: React,
  events: {
    onChange: 'change',
    onCropStart: 'crop-start',
    onCropComplete: 'crop-complete',
    onCropCancel: 'crop-cancel',
    onRemove: 'remove',
    onError: 'error',
    onClear: 'clear',
  },
});