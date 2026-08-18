import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

export interface CardContainerProps {
  variant?: 'outlined' | 'filled' | 'elevated';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  borderedDivider?: boolean;
  hoverable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  ariaLabelledby?: string;
  onCardClick?: (event: MouseEvent) => void;
}

export const CardContainerTemplate = (props: CardContainerProps) => {
  const {
    variant = 'outlined',
    size = 'medium',
    fullWidth = false,
    borderedDivider = false,
    hoverable = false,
    disabled = false,
    loading = false,
    ariaLabelledby,
    onCardClick,
  } = props;

  const handleClick = (event: MouseEvent) => {
    if (disabled || loading) return;
    if (onCardClick) {
      onCardClick(event);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (disabled || loading) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onCardClick) {
        onCardClick(event as unknown as MouseEvent);
      }
    }
  };

  return html`
    <div
      class=${classMap({
        'biz-card-container': true,
        [`biz-card-container--${variant}`]: true,
        [`biz-card-container--${size}`]: true,
        'biz-card-container--full-width': fullWidth,
        'biz-card-container--bordered-divider': borderedDivider,
        'biz-card-container--hoverable': hoverable && !disabled && !loading,
        'biz-card-container--disabled': disabled,
        'biz-card-container--loading': loading,
      })}
      role=${hoverable ? 'button' : 'region'}
      tabindex=${hoverable && !disabled ? '0' : '-1'}
      aria-labelledby=${ifDefined(ariaLabelledby)}
      aria-disabled=${disabled ? 'true' : 'false'}
      aria-busy=${loading ? 'true' : 'false'}
      @click=${handleClick}
      @keydown=${handleKeyDown}
    >
      ${loading
        ? html`
            <div class="biz-card-container__loading-overlay" aria-hidden="true">
              <span class="biz-card-container__spinner"></span>
            </div>
          `
        : ''}

      <header class="biz-card-container__header">
        <slot name="header-slot"></slot>
      </header>

      ${borderedDivider ? html`<div class="biz-card-container__divider" aria-hidden="true"></div>` : ''}

      <main class="biz-card-container__body">
        <slot></slot>
      </main>

      ${borderedDivider ? html`<div class="biz-card-container__divider" aria-hidden="true"></div>` : ''}

      <footer class="biz-card-container__footer">
        <slot name="footer-slot"></slot>
      </footer>
    </div>
  `;
};