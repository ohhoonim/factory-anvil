import { LitElement } from 'lit';
import { customElement, property, state } from "lit/decorators.js";
import { applicationShellStyles } from "./ApplicationShell.css";
import { ApplicationShellTemplate, type ApplicationShellHost } from "./ApplicationShell";


@customElement('biz-application-shell')
export class BizApplicationShell extends LitElement implements ApplicationShellHost {
  static styles = applicationShellStyles;

  @property({ type: String })
  variant: 'default' | 'full-width' | 'minimal' = 'default';

  @property({ type: Boolean, attribute: 'sidebar-collapsed', reflect: true })
  sidebarCollapsed: boolean = false;

  @property({ type: Boolean, attribute: 'sticky-header' })
  stickyHeader: boolean = true;

  @property({ type: Boolean, attribute: 'fixed-sidebar' })
  fixedSidebar: boolean = true;

  @state()
  private mobileDrawerOpen: boolean = false;

  private resizeObserver: ResizeObserver | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleGlobalKeyDown);
    this.setupResizeObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleGlobalKeyDown);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  protected updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('sidebarCollapsed')) {
      this.dispatchSidebarToggleEvent();
    }
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        let breakpoint = 'desktop';
        if (width <= 768) {
          breakpoint = 'mobile';
        } else if (width <= 1024) {
          breakpoint = 'tablet';
        }
        this.dispatchEvent(
          new CustomEvent('breakpoint-change', {
            detail: { breakpoint },
            bubbles: true,
            composed: true
          })
        );
      }
    });
    this.resizeObserver.observe(this);
  }

  public toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  private dispatchSidebarToggleEvent() {
    this.dispatchEvent(
      new CustomEvent('sidebar-toggle', {
        detail: { collapsed: this.sidebarCollapsed },
        bubbles: true,
        composed: true
      })
    );
  }

  private handleSidebarKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.mobileDrawerOpen) {
      this.mobileDrawerOpen = false;
    }
  };

  private handleGlobalKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.mobileDrawerOpen) {
      this.mobileDrawerOpen = false;
    }
  };

  render() {
    return ApplicationShellTemplate({
      variant: this.variant,
      sidebarCollapsed: this.sidebarCollapsed,
      stickyHeader: this.stickyHeader,
      fixedSidebar: this.fixedSidebar,
    });
  }
}