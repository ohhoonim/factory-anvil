import { createComponent } from '@lit/react';
import { FileUploader as FileUploaderWc } from "./FileUploader.wc";
import React from 'react';

export const FileUploader = createComponent({
    tagName: 'biz-file-uploader',
    elementClass: FileUploaderWc,
    react: React,
    events: {
        onChange: 'change',
        onFileAdd: 'file-add',
        onFileRemove: 'file-remove',
        onUploadProgress: 'upload-progress',
        onError: 'error',
        onClear: 'clear'
    }
});