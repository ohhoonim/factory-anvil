import { LitElement } from "lit";
import { splitPaneStyles } from "./SplitPane.css";
import { customElement, property, state } from "lit/decorators.js";
import { SplitPaneTemplate } from "./SplitPane";


@customElement('biz-split-pane')
export class BizSplitPane extends LitElement {
  static styles = splitPaneStyles;

  @property({ type: String }) direction = 'horizontal';
  @property({ type: Array }) sizes = [50, 50];
  @property({ type: Array, attribute: 'min-sizes' }) minSizes = [100, 100];
  @property({ type: Array, attribute: 'max-sizes' }) maxSizes = [];
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) collapsible = false;
  @property({ type: String }) variant = 'Line';
  @property({ type: String }) size = 'Medium';
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth = false;
  @property({ type: Boolean, attribute: 'full-height' }) fullHeight = false;

  @state() isDragging = false;
  @state() collapsed = 0;

  private startPos = 0;
  private startSizes: number[] = [];

  render() {
    return SplitPaneTemplate(this);
  }

  onResizeStart = (e: MouseEvent | TouchEvent) => {
    if (this.disabled) return;
    this.isDragging = true;
    this.startSizes = [...this.sizes];
    this.startPos = e instanceof MouseEvent 
      ? (this.direction === 'horizontal' ? e.clientX : e.clientY) 
      : (this.direction === 'horizontal' ? e.touches[0].clientX : e.touches[0].clientY);

    window.addEventListener('mousemove', this.onResize);
    window.addEventListener('touchmove', this.onResize);
    window.addEventListener('mouseup', this.onResizeEnd);
    window.addEventListener('touchend', this.onResizeEnd);

    this.dispatchEvent(new CustomEvent('resize-start', { 
      bubbles: true, 
      composed: true, 
      detail: { sizes: this.sizes } 
    }));
  }

  onResize = (e: MouseEvent | TouchEvent) => {
    if (!this.isDragging) return;
    const currentPos = e instanceof MouseEvent 
      ? (this.direction === 'horizontal' ? e.clientX : e.clientY) 
      : (this.direction === 'horizontal' ? e.touches[0].clientX : e.touches[0].clientY);
    
    const delta = currentPos - this.startPos;
    const containerRect = this.getBoundingClientRect();
    const containerSize = this.direction === 'horizontal' ? containerRect.width : containerRect.height;
    const deltaPercent = (delta / containerSize) * 100;

    const newSize0 = Math.max(0, this.startSizes[0] + deltaPercent);
    const newSize1 = Math.max(0, this.startSizes[1] - deltaPercent);

    this.sizes = [newSize0, newSize1];
    
    this.dispatchEvent(new CustomEvent('resize', { 
      bubbles: true, 
      composed: true, 
      detail: { sizes: this.sizes } 
    }));
  }

  onResizeEnd = () => {
    this.isDragging = false;
    window.removeEventListener('mousemove', this.onResize);
    window.removeEventListener('touchmove', this.onResize);
    window.removeEventListener('mouseup', this.onResizeEnd);
    window.removeEventListener('touchend', this.onResizeEnd);

    this.dispatchEvent(new CustomEvent('resize-end', { 
      bubbles: true, 
      composed: true, 
      detail: { sizes: this.sizes } 
    }));
  }

  onKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    const step = 5;
    let newSize0 = this.sizes[0];
    let newSize1 = this.sizes[1];

    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      newSize0 -= step;
      newSize1 += step;
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      newSize0 += step;
      newSize1 -= step;
    } else if (e.key === 'Home') {
      newSize0 = 0;
      newSize1 = 100;
    } else if (e.key === 'End') {
      newSize0 = 100;
      newSize1 = 0;
    } else if (e.key === 'Enter' && this.collapsible) {
      this.onDoubleClick();
      return;
    } else {
      return;
    }

    this.sizes = [Math.max(0, newSize0), Math.max(0, newSize1)];
    
    this.dispatchEvent(new CustomEvent('resize', { 
      bubbles: true, 
      composed: true, 
      detail: { sizes: this.sizes } 
    }));
    this.dispatchEvent(new CustomEvent('resize-end', { 
      bubbles: true, 
      composed: true, 
      detail: { sizes: this.sizes } 
    }));
  }

  onDoubleClick = () => {
    if (!this.collapsible || this.disabled) return;
    this.collapsed = this.collapsed === 1 ? 0 : 1;
    this.dispatchEvent(new CustomEvent('collapse', { 
      bubbles: true, 
      composed: true, 
      detail: { paneIndex: 1, collapsed: this.collapsed === 1 } 
    }));
  }
}