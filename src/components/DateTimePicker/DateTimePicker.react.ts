import { createComponent } from "@lit/react";
import { BizDateTimePicker } from "./DateTimePicker.wc";
import React from "react";

export const DateTimePicker = createComponent({
  tagName: 'biz-date-time-picker',
  elementClass: BizDateTimePicker,
  react: React,
  events: {
    onInput: 'input',
    onChange: 'change',
    onOpen: 'open',
    onClose: 'close',
    onDateChange: 'date-change',
    onTimeChange: 'time-change',
    onClear: 'clear',
  },
});