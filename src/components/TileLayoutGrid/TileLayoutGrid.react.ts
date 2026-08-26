import React from 'react';
import { createComponent } from '@lit/react';
import { TileLayoutGrid as TileLayoutGridWc } from './TileLayoutGrid.wc';

export const TileLayoutGrid = createComponent({
  tagName: 'biz-tile-layout-grid',
  elementClass: TileLayoutGridWc,
  react: React,
  events: {
    onLayoutChange: 'layout-change',
    onTileClick: 'tile-click',
  },
});