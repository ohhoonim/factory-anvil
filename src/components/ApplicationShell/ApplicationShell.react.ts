import { createComponent } from '@lit/react';
import React from 'react';
import { BizApplicationShell } from './ApplicationShell.wc';

export const ApplicationShell = createComponent({
  react: React,
  tagName: 'biz-application-shell',
  elementClass: BizApplicationShell,
  events: {
    onSidebarToggle: 'sidebar-toggle',
    onBreakpointChange: 'breakpoint-change',
    onClear: 'clear'
  }
});