import { html } from 'lit';

export const SplitPaneTemplate = (props: any) => html`
  <div 
    class="biz-split-pane ${props.direction} ${props.variant} ${props.size} ${props.disabled ? 'disabled' : ''} ${props.collapsible ? 'collapsible' : ''} ${props.fullWidth ? 'full-width' : ''} ${props.fullHeight ? 'full-height' : ''}"
  >
    <div 
      id="pane-1"
      class="pane pane-1 ${props.collapsed === 1 ? 'collapsed' : ''}" 
      style="flex: ${props.sizes[0]} 1 0%; min-width: ${props.minSizes[0]}px; max-width: ${props.maxSizes[0] ? props.maxSizes[0] + 'px' : 'none'};"
    >
      <slot name="pane-1-slot"></slot>
    </div>
    
    <div
      class="resizer ${props.isDragging ? 'active' : ''}"
      role="separator"
      aria-orientation="${props.direction}"
      aria-valuenow="${props.sizes[0]}"
      aria-valuemin="${props.minSizes[0]}"
      aria-valuemax="${props.maxSizes[0] || 100}"
      aria-controls="pane-1 pane-2"
      tabindex="${props.disabled ? '-1' : '0'}"
      @mousedown="${props.onResizeStart}"
      @touchstart="${props.onResizeStart}"
      @keydown="${props.onKeyDown}"
      @dblclick="${props.onDoubleClick}"
    >
      <slot name="resizer-slot">
        ${props.variant === 'Grip' ? html`<div class="grip-icon"></div>` : html``}
      </slot>
    </div>

    <div 
      id="pane-2"
      class="pane pane-2 ${props.collapsed === 2 ? 'collapsed' : ''}" 
      style="flex: ${props.sizes[1]} 1 0%; min-width: ${props.minSizes[1]}px; max-width: ${props.maxSizes[1] ? props.maxSizes[1] + 'px' : 'none'};"
    >
      <slot name="pane-2-slot"></slot>
    </div>
  </div>
`;