import { createComponent } from '@lit/react';
import React from 'react';

import { ContentContainer as ContentContainerWc } from "./ContentContainer.wc";

export const ContentContainer = createComponent({
  react: React,
  tagName: 'biz-content-container',
  elementClass: ContentContainerWc,
  events: {
    onScroll: 'scroll',
  },
});