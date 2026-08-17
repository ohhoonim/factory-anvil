import React from "react";
import { BizRadioButtonGroup } from "./RadioButtonGroup.wc";
import { createComponent } from "@lit/react";

export const RadioButtonGroup = createComponent({
  tagName: 'biz-radio-button-group',
  elementClass: BizRadioButtonGroup,
  react: React,
  events: {
    onChange: 'change',
    onClear: 'clear',
    onInput: 'input'
  }
});