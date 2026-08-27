import { createComponent } from "@lit/react";
import { BizRadioButtonGroup } from "./RadioButtonGroup.wc";
import React from "react";

export const RadioButtonGroup = createComponent({
  tagName: 'biz-radio-button-group',
  elementClass: BizRadioButtonGroup,
  react: React,
  events: {
    onChange: 'change',
    onInput: 'input',
    onClear: 'clear',
  },
});