import { createComponent } from "@lit/react";
import React from "react";


import { InlineEditWrapper as InlineEditWrapperWc } from "./InlineEditWrapper.wc";

export const InlineEditWrapper = createComponent({
  tagName: 'biz-inline-edit-wrapper',
  elementClass: InlineEditWrapperWc,
  react: React,
  events: {
    onModeChange: 'mode-change',
    onSave: 'save',
    onCancel: 'cancel',
  },
});