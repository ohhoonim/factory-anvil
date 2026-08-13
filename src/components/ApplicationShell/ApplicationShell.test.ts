import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";

import { ApplicationShell as ApplicationShellWc } from "./ApplicationShell.wc";

describe('ApplicationShell (Unit Tests - Vitest)', () => {
  let element: ApplicationShellWc;

  beforeEach(async () => {
    element = document.createElement('biz-application-shell') as ApplicationShellWc;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('renders with default property values', () => {
    expect(element.variant).toBe('default');
    expect(element.sidebarCollapsed).toBe(false);
    expect(element.stickyHeader).toBe(true);
    expect(element.fixedSidebar).toBe(true);
  });

  it('updates DOM classes when properties change', async () => {
    element.variant = 'full-width';
    element.sidebarCollapsed = true;
    await element.updateComplete;

    const shellContainer = element.shadowRoot?.querySelector('.biz-application-shell');
    expect(shellContainer?.classList.contains('biz-application-shell--variant-full-width')).toBe(true);
    expect(shellContainer?.classList.contains('biz-application-shell--sidebar-collapsed')).toBe(true);
  });

  it('dispatches sidebar-toggle custom event on property update', async () => {
    const toggleSpy = vi.fn();
    element.addEventListener('sidebar-toggle', toggleSpy);

    element.sidebarCollapsed = true;
    await element.updateComplete;

    expect(toggleSpy).toHaveBeenCalledTimes(1);
    const eventDetail = (toggleSpy.mock.calls[0][0] as CustomEvent).detail;
    expect(eventDetail).toEqual({ collapsed: true });
  });

  it('toggles sidebar state via public method toggleSidebar', async () => {
    expect(element.sidebarCollapsed).toBe(false);
    element.toggleSidebar();
    await element.updateComplete;
    expect(element.sidebarCollapsed).toBe(true);
  });
});
