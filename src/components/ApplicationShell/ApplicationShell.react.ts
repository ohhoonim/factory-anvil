import { createComponent } from "@lit/react";
import React from "react";
import { ApplicationShell as ApplicationShellWc } from "./ApplicationShell.wc";

export const ApplicationShell = createComponent({
  react: React,
  tagName: 'biz-application-shell',
  elementClass: ApplicationShellWc,
  events: {
    onSidebarToggle: 'sidebar-toggle',
    onBreakpointChange: 'breakpoint-change',
    onClear: 'clear'
  }
});