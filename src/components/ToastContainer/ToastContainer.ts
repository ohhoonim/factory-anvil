// src/components/ToastContainer/ToastContainer.ts
import { html, type TemplateResult } from 'lit';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export type ToastSize = 'small' | 'medium' | 'large';

export interface ToastContainerHost {
  maxVisibleCount: number;
  position: ToastPosition;
  gap: number;
  newestOnTop: boolean;
  pauseOnHover: boolean;
  size: ToastSize;
  isHovered: boolean;
  isOverflowing: boolean;
  handleSlotChange: (e: Event) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export const ToastContainerTemplate = (host: ToastContainerHost): TemplateResult => {
  return html`
    <div
      class="biz-toast-container"
      role="region"
      aria-label="알림 목록"
      aria-live="polite"
      data-hovered="${host.isHovered}"
      data-overflow="${host.isOverflowing}"
      @mouseenter="${host.handleMouseEnter}"
      @mouseleave="${host.handleMouseLeave}"
    >
      <slot name="label-slot"></slot>
      <slot name="start-slot"></slot>
      <slot @slotchange="${host.handleSlotChange}"></slot>
      <slot name="end-slot"></slot>
      <slot name="helper-text-slot"></slot>
    </div>
  `;
};