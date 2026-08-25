import { LitElement } from 'lit';
import { customElement, property } from "lit/decorators.js";
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


  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  public toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  render() {
    return ApplicationShellTemplate({
      variant: this.variant,
      sidebarCollapsed: this.sidebarCollapsed,
      stickyHeader: this.stickyHeader,
      fixedSidebar: this.fixedSidebar,
    });
  }
}