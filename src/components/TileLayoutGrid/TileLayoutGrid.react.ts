import { createComponent } from "@lit/react";
import React from "react";

import { TileLayoutGrid as TileLayoutGridWc } from "./TileLayoutGrid.wc";


export const TileLayoutGrid = createComponent({
  react: React,
  tagName: 'biz-tile-layout-grid',
  elementClass: TileLayoutGridWc,
  events: {
    onLayoutChange: 'layout-change',
    onTileClick: 'tile-click',
  },
});