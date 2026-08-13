import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface ApplicationShellContext {
  variant?: string;
  stickyHeader?: boolean;
  fixedSidebar?: boolean;
  sidebarCollapsed?: boolean;
  mobileDrawerOpen?: boolean;
  handleOverlayClick?: (event: Event) => void;
  handleSidebarKeyDown?: (event: KeyboardEvent) => void;
}

export const ApplicationShellTemplate = (context: ApplicationShellContext) => html`
  <a href="#main-content" class="biz-application-shell__skip-link">
    Skip to main content
  </a>
  <div
    class=${classMap({
      'biz-application-shell': true,
      [`biz-application-shell--variant-${context.variant}`]: true,
      'biz-application-shell--sticky-header': context.stickyHeader ?? false,
      'biz-application-shell--fixed-sidebar': context.fixedSidebar ?? false,
      'biz-application-shell--sidebar-collapsed': context.sidebarCollapsed ?? false,
      'biz-application-shell--mobile-drawer-open': context.mobileDrawerOpen ?? false
    })}
  >
    ${context.variant !== 'minimal' ? html`
      <header class="biz-application-shell__header" role="banner">
        <slot name="header-slot"></slot>
      </header>
    ` : null}

    <div class="biz-application-shell__body">
      ${context.variant === 'default' ? html`
        <div
          class="biz-application-shell__overlay"
          @click=${context.handleOverlayClick}
        ></div>
        <aside
          class="biz-application-shell__sidebar"
          role="navigation"
          aria-expanded=${!context.sidebarCollapsed}
          @keydown=${context.handleSidebarKeyDown}
        >
          <slot name="sidebar-slot"></slot>
        </aside>
      ` : null}

      <main
        id="main-content"
        class="biz-application-shell__content"
        role="main"
        tabindex="-1"
      >
        <slot name="content-slot"></slot>
      </main>
    </div>

    ${context.variant !== 'minimal' ? html`
      <footer class="biz-application-shell__footer" role="contentinfo">
        <slot name="footer-slot"></slot>
      </footer>
    ` : null}
  </div>
`;