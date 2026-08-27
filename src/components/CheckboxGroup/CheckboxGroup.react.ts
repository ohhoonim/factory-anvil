import { createComponent } from "@lit/react";
import React from "react";
import { BizCheckboxGroup } from "./CheckboxGroup.wc";

export const CheckboxGroup = createComponent({
  react: React,
  tagName: 'biz-checkbox-group',
  elementClass: BizCheckboxGroup,
  events: {
    onChange: 'change',
    onClear: 'clear',
  },
});