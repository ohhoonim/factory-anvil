import React from 'react';
import { createComponent } from '@lit/react';
import { BizFileUploader } from './FileUploader.wc.js';

export const FileUploader = createComponent({
  tagName: 'biz-file-uploader',
  elementClass: BizFileUploader,
  react: React,
  events: {
    onChange: 'change',
    onFileAdd: 'file-add',
    onFileRemove: 'file-remove',
    onUploadProgress: 'upload-progress',
    onError: 'error',
    onClear: 'clear',
  },
});