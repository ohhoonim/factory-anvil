import { css } from 'lit';

export const applicationShellStyles = css`
  :host {
    --biz-application-shell-header-height: 64px;
    --biz-application-shell-footer-height: 48px;
    --biz-application-shell-sidebar-width: 256px;
    --biz-application-shell-sidebar-collapsed-width: 64px;

    --biz-application-shell-bg-color: #f9fafb;
    --biz-application-shell-header-bg: #ffffff;
    --biz-application-shell-sidebar-bg: #1f2937;
    --biz-application-shell-footer-bg: #ffffff;
    --biz-application-shell-border-color: #e5e7eb;

    --biz-application-shell-header-z-index: 100;
    --biz-application-shell-sidebar-z-index: 90;
    --biz-application-shell-overlay-z-index: 200;

    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .biz-application-shell__skip-link {
    position: absolute;
    top: -100px;
    left: 0;
    background: #000000;
    color: #ffffff;
    padding: 8px 16px;
    z-index: 1000;
    text-decoration: none;
  }

  .biz-application-shell__skip-link:focus {
    top: 0;
  }

  .biz-application-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--biz-application-shell-bg-color);
  }

  .biz-application-shell--sticky-header .biz-application-shell__header {
    position: sticky;
    top: 0;
    z-index: var(--biz-application-shell-header-z-index);
  }

  .biz-application-shell__header {
    height: var(--biz-application-shell-header-height);
    background-color: var(--biz-application-shell-header-bg);
    border-bottom: 1px solid var(--biz-application-shell-border-color);
  }

  .biz-application-shell__body {
    display: flex;
    flex: 1;
    position: relative;
  }

  .biz-application-shell__sidebar {
    width: var(--biz-application-shell-sidebar-width);
    background-color: var(--biz-application-shell-sidebar-bg);
    border-right: 1px solid var(--biz-application-shell-border-color);
    transition: width 0.3s ease;
  }

  .biz-application-shell--fixed-sidebar .biz-application-shell__sidebar {
    position: sticky;
    top: var(--biz-application-shell-header-height);
    height: calc(100vh - var(--biz-application-shell-header-height));
    overflow-y: auto;
    z-index: var(--biz-application-shell-sidebar-z-index);
  }

  .biz-application-shell--sidebar-collapsed .biz-application-shell__sidebar {
    width: var(--biz-application-shell-sidebar-collapsed-width);
  }

  .biz-application-shell__content {
    flex: 1;
    overflow-y: auto;
    outline: none;
  }

  .biz-application-shell__footer {
    height: var(--biz-application-shell-footer-height);
    background-color: var(--biz-application-shell-footer-bg);
    border-top: 1px solid var(--biz-application-shell-border-color);
  }

  .biz-application-shell--variant-full-width .biz-application-shell__sidebar {
    display: none;
  }

  .biz-application-shell--variant-minimal .biz-application-shell__header,
  .biz-application-shell--variant-minimal .biz-application-shell__footer,
  .biz-application-shell--variant-minimal .biz-application-shell__sidebar {
    display: none;
  }

  .biz-application-shell__overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: calc(var(--biz-application-shell-overlay-z-index) - 1);
  }

`;