import { css } from "lit";

export const passwordInputStyles = css`
  :host {
    /* Layout & Sizing Tokens */
    --biz-password-input-height-sm: 32px;
    --biz-password-input-height-md: 40px;
    --biz-password-input-height-lg: 48px;
    --biz-password-input-padding-x: 12px;
    --biz-password-input-padding-y: 8px;
    --biz-password-input-border-radius: 4px;

    /* Color Tokens - Base */
    --biz-password-input-bg-color: #ffffff;
    --biz-password-input-border-color: #d1d5db;
    --biz-password-input-text-color: #111827;
    --biz-password-input-placeholder-color: #9ca3af;
    --biz-password-input-toggle-icon-color: #6b7280;

    /* Color Tokens - Interactive States */
    --biz-password-input-hover-border-color: #9ca3af;
    --biz-password-input-focus-border-color: #2563eb;
    --biz-password-input-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Color Tokens - Error & Disabled */
    --biz-password-input-error-color: #dc2626;
    --biz-password-input-disabled-bg-color: #f3f4f6;
    --biz-password-input-disabled-text-color: #9ca3af;

    display: inline-block;
    font-family: system-ui, -apple-system, sans-serif;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .biz-password-input {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
    width: 240px;
  }

  .biz-password-input--full-width {
    width: 100%;
  }

  .biz-password-input__label-area {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 14px;
    font-weight: 500;
    color: var(--biz-password-input-text-color);
  }

  /* label-slot에 주입된 요소(노드)가 없거나 비어있는 경우 전체 레이블 영역 숨김 */
.biz-password-input__label-area:not(:has(slot[name="label-slot"]::slotted(*))) {
  display: none;
}

  .biz-password-input__required-asterisk {
    color: var(--biz-password-input-error-color);
  }

  .biz-password-input__control {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: var(--biz-password-input-border-radius);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  .biz-password-input__field {
    flex: 1 1 auto;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-password-input-text-color);
    font-size: 14px;
    padding: var(--biz-password-input-padding-y) var(--biz-password-input-padding-x);
  }

  .biz-password-input__field::placeholder {
    color: var(--biz-password-input-placeholder-color);
  }

  /* Icons & Action Buttons */
  .biz-password-input__toggle-btn,
  .biz-password-input__clear-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    padding: 4px;
    margin-right: 4px;
    cursor: pointer;
    color: var(--biz-password-input-toggle-icon-color);
    border-radius: 50%;
    transition: color 0.15s ease, background-color 0.15s ease;
  }

  .biz-password-input__toggle-btn:hover,
  .biz-password-input__clear-btn:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .biz-password-input__start-slot,
  .biz-password-input__end-slot {
    display: inline-flex;
    align-items: center;
  }

  /* Variants */
  .biz-password-input--outlined .biz-password-input__control {
    background-color: var(--biz-password-input-bg-color);
    border: 1px solid var(--biz-password-input-border-color);
  }

  .biz-password-input--outlined:not(.biz-password-input--disabled):hover .biz-password-input__control {
    border-color: var(--biz-password-input-hover-border-color);
  }

  .biz-password-input--filled .biz-password-input__control {
    background-color: #f3f4f6;
    border: 1px solid transparent;
    border-bottom: 2px solid var(--biz-password-input-border-color);
  }

  .biz-password-input--standard .biz-password-input__control {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--biz-password-input-border-color);
    border-radius: 0;
  }

  /* Sizes */
  .biz-password-input--small .biz-password-input__control {
    min-height: var(--biz-password-input-height-sm);
  }
  .biz-password-input--small .biz-password-input__field {
    font-size: 12px;
  }

  .biz-password-input--medium .biz-password-input__control {
    min-height: var(--biz-password-input-height-md);
  }

  .biz-password-input--large .biz-password-input__control {
    min-height: var(--biz-password-input-height-lg);
  }
  .biz-password-input--large .biz-password-input__field {
    font-size: 16px;
  }

  /* Focus State */
  .biz-password-input__control:focus-within {
    border-color: var(--biz-password-input-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-password-input-focus-ring-color);
  }

  /* Error State */
  .biz-password-input--error .biz-password-input__control {
    border-color: var(--biz-password-input-error-color) !important;
  }

  .biz-password-input--error .biz-password-input__control:focus-within {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  .biz-password-input__helper-area {
    font-size: 12px;
    color: var(--biz-password-input-toggle-icon-color);
  }

  .biz-password-input--error .biz-password-input__helper-area {
    color: var(--biz-password-input-error-color);
  }

  /* Disabled State */
  .biz-password-input--disabled .biz-password-input__control {
    background-color: var(--biz-password-input-disabled-bg-color);
    border-color: var(--biz-password-input-border-color);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .biz-password-input--disabled .biz-password-input__field,
  .biz-password-input--disabled .biz-password-input__toggle-btn {
    cursor: not-allowed;
    color: var(--biz-password-input-disabled-text-color);
  }

  /* Readonly State */
  .biz-password-input--readonly .biz-password-input__control {
    background-color: #f9fafb;
  }
`;