import { createComponent } from "@lit/react";
import React from "react";

import { CardContainer as CardContainerWc } from "./CardContainer.wc";

export const CardContainer = createComponent({
  tagName: 'biz-card-container',
  elementClass: CardContainerWc,
  react: React,
  events: {
    onCardClick: 'card-click',
  },
});