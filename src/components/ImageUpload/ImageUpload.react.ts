import { createComponent } from "@lit/react";
import { ImageUpload as ImageUploadWc } from "./ImageUpload.wc";
import React from "react";

export const ImageUpload = createComponent({
  tagName: 'biz-image-upload',
  elementClass: ImageUploadWc,
  react: React,
  events: {
    onChange: 'change',
    onCropStart: 'crop-start',
    onCropComplete: 'crop-complete',
    onCropCancel: 'crop-cancel',
    onRemove: 'remove',
    onClear: 'clear',
    onError: 'error',
  },
});