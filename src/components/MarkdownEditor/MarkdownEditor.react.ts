import { createComponent } from '@lit/react';
import { BizMarkdownEditor } from "./MarkdownEditor.wc";
import React from 'react';

export const MarkdownEditor = createComponent({
  tagName: 'biz-markdown-editor',
  elementClass: BizMarkdownEditor,
  react: React,
  events: {
    onChange: 'change',
    onModeChange: 'mode-change',
    onUploadImage: 'upload-image',
    onFocus: 'focus',
    onBlur: 'blur',
    onClear: 'clear',
  },
});