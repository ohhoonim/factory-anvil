import { css } from 'lit';

export const ipAddressInputStyles = css`
  :host {
    /* Layout & Sizing Tokens */
    --biz-ip-address-input-height-sm: 32px;
    --biz-ip-address-input-height-md: 40px;
    --biz-ip-address-input-height-lg: 48px;
    --biz-ip-address-input-padding-x: 8px;
    --biz-ip-address-input-padding-y: 4px;
    --biz-ip-address-input-border-radius: 4px;
    --biz-ip-address-input-segment-width-ipv4: 40px;
    --biz-ip-address-input-segment-width-ipv6: 52px;

    /* Colors - Base */
    --biz-ip-address-input-bg-color: #ffffff;
    --biz-ip-address-input-border-color: #d1d5db;
    --biz-ip-address-input-text-color: #111827;
    --biz-ip-address-input-separator-color: #6b7280;

    /* Colors - Interactive States */
    --biz-ip-address-input-hover-border-color: #9ca3af;
    --biz-ip-address-input-focus-border-color: #2563eb;
    --biz-ip-address-input-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Colors - Error & Disabled */
    --biz-ip-address-input-error-color: #dc2626;
    --biz-ip-address-input-disabled-bg-color: #f3f4f6;
    --biz-ip-address-input-disabled-text-color: #9ca3af;

    display: inline-block;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    box-sizing: border-box;
  }

  :host([full-width]),
  .biz-ip-address-input--full-width {
    display: block;
    width: 100%;
  }

  .biz-ip-address-input {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: fit-content;
  }

  .biz-ip-address-input--full-width {
    width: 100%;
  }

  /* Field Container */
  .biz-ip-address-input__field {
    display: inline-flex;
    align-items: center;
    background-color: var(--biz-ip-address-input-bg-color);
    border-radius: var(--biz-ip-address-input-border-radius);
    padding: var(--biz-ip-address-input-padding-y) var(--biz-ip-address-input-padding-x);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    box-sizing: border-box;
  }

  /* Variants */
  .biz-ip-address-input--outlined .biz-ip-address-input__field {
    border: 1px solid var(--biz-ip-address-input-border-color);
  }

  .biz-ip-address-input--filled .biz-ip-address-input__field {
    background-color: var(--biz-ip-address-input-disabled-bg-color);
    border: 1px solid transparent;
    border-bottom: 1px solid var(--biz-ip-address-input-border-color);
  }

  .biz-ip-address-input--standard .biz-ip-address-input__field {
    border: none;
    border-bottom: 1px solid var(--biz-ip-address-input-border-color);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
    background-color: transparent;
  }

  /* Sizes */
  .biz-ip-address-input--small .biz-ip-address-input__field {
    height: var(--biz-ip-address-input-height-sm);
    font-size: 12px;
  }

  .biz-ip-address-input--medium .biz-ip-address-input__field {
    height: var(--biz-ip-address-input-height-md);
    font-size: 14px;
  }

  .biz-ip-address-input--large .biz-ip-address-input__field {
    height: var(--biz-ip-address-input-height-lg);
    font-size: 16px;
  }

  /* Segments Layout */
  .biz-ip-address-input__segments {
    display: flex;
    align-items: center;
  }

  /* Inputs & Separator */
  .biz-ip-address-input__segment {
    border: none;
    outline: none;
    background: transparent;
    text-align: center;
    color: var(--biz-ip-address-input-text-color);
    font-family: inherit;
    font-size: inherit;
    padding: 0;
    margin: 0;
  }

  .biz-ip-address-input--ipv4 .biz-ip-address-input__segment {
    width: var(--biz-ip-address-input-segment-width-ipv4);
  }

  .biz-ip-address-input--ipv6 .biz-ip-address-input__segment {
    width: var(--biz-ip-address-input-segment-width-ipv6);
  }

  .biz-ip-address-input__separator {
    color: var(--biz-ip-address-input-separator-color);
    user-select: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  /* Hover State */
  .biz-ip-address-input:hover:not(.biz-ip-address-input--disabled):not(.biz-ip-address-input--error) .biz-ip-address-input__field {
    border-color: var(--biz-ip-address-input-hover-border-color);
  }

  /* Focus States */
  .biz-ip-address-input__field:focus-within {
    border-color: var(--biz-ip-address-input-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-ip-address-input-focus-ring-color);
  }

  /* Error State */
  .biz-ip-address-input--error .biz-ip-address-input__field {
    border-color: var(--biz-ip-address-input-error-color);
  }

  .biz-ip-address-input--error .biz-ip-address-input__field:focus-within {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  .biz-ip-address-input--error .biz-ip-address-input__helper-text {
    color: var(--biz-ip-address-input-error-color);
  }

  /* Disabled State */
  .biz-ip-address-input--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .biz-ip-address-input--disabled .biz-ip-address-input__field {
    background-color: var(--biz-ip-address-input-disabled-bg-color);
    border-color: var(--biz-ip-address-input-border-color);
  }

  .biz-ip-address-input--disabled .biz-ip-address-input__segment {
    color: var(--biz-ip-address-input-disabled-text-color);
    cursor: not-allowed;
  }

  /* Readonly State */
  .biz-ip-address-input--readonly .biz-ip-address-input__field {
    background-color: var(--biz-ip-address-input-disabled-bg-color);
  }

  /* Labels & Helper Text */
  .biz-ip-address-input__label {
    font-size: 14px;
    font-weight: 500;
    color: var(--biz-ip-address-input-text-color);
  }

  .biz-ip-address-input__helper-text {
    font-size: 12px;
    color: var(--biz-ip-address-input-separator-color);
  }
`;