import { html } from 'lit';
import { classMap } from "lit/directives/class-map.js";

export interface ApplicationShellHost {
  variant?: "minimal" | "default" | "full-width";
  stickyHeader?: boolean;
  fixedSidebar?: boolean;
  sidebarCollapsed?: boolean;
}

export const ApplicationShellTemplate = (host: ApplicationShellHost) => html`
  <a href="#main-content" class="biz-application-shell__skip-link">
    Skip to main content
  </a>
  <div
    class=${classMap({
      'biz-application-shell': true,
      [`biz-application-shell--variant-${host.variant}`]: true,
      'biz-application-shell--sticky-header': host.stickyHeader ?? false,
      'biz-application-shell--fixed-sidebar': host.fixedSidebar ?? false,
      'biz-application-shell--sidebar-collapsed': host.sidebarCollapsed ?? false,
    })}
  >
    ${host.variant !== 'minimal' ? html`
      <header class="biz-application-shell__header" role="banner">
        <slot name="header-slot"></slot>
      </header>
    ` : null}

    <div class="biz-application-shell__body">
      ${host.variant === 'default' ? html`
        <aside
          class="biz-application-shell__sidebar"
          role="navigation"
          aria-expanded=${!host.sidebarCollapsed}
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

    ${host.variant !== 'minimal' ? html`
      <footer class="biz-application-shell__footer" role="contentinfo">
        <slot name="footer-slot"></slot>
      </footer>
    ` : null}
  </div>
`;