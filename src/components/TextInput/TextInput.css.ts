import { css } from 'lit';

export const textInputStyles = css`
  :host {
    display: inline-block;
    font-family: inherit;

    /* Layout & Sizing Tokens */
    --biz-text-input-height-sm: 32px;
    --biz-text-input-height-md: 40px;
    --biz-text-input-height-lg: 48px;
    --biz-text-input-padding-x: 12px;
    --biz-text-input-padding-y: 8px;
    --biz-text-input-border-radius: 4px;

    /* Colors - Base Tokens */
    --biz-text-input-bg-color: #ffffff;
    --biz-text-input-border-color: #d1d5db;
    --biz-text-input-text-color: #111827;
    --biz-text-input-placeholder-color: #9ca3af;

    /* Colors - Interactive States Tokens */
    --biz-text-input-hover-border-color: #9ca3af;
    --biz-text-input-focus-border-color: #2563eb;
    --biz-text-input-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Colors - Error & Disabled Tokens */
    --biz-text-input-error-color: #dc2626;
    --biz-text-input-disabled-bg-color: #f3f4f6;
    --biz-text-input-disabled-text-color: #9ca3af;
  }

  :host([full-width]),
  .biz-text-input.full-width {
    width: 100%;
  }

  .biz-text-input {
    display: flex;
    flex-direction: column;
    gap: 4px;
    box-sizing: border-box;
  }

  .label-container {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--biz-text-input-text-color);
  }

  .input-control {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  .input-field {
    flex: 1;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-text-input-text-color);
    font-family: inherit;
    font-size: 14px;
    box-sizing: border-box;
    padding: 0;
  }

  .input-field::placeholder {
    color: var(--biz-text-input-placeholder-color);
  }

  /* Variants */
  .biz-text-input.outlined .input-control {
    background-color: var(--biz-text-input-bg-color);
    border: 1px solid var(--biz-text-input-border-color);
    border-radius: var(--biz-text-input-border-radius);
  }

  .biz-text-input.filled .input-control {
    background-color: #f9fafb;
    border: 1px solid transparent;
    border-bottom: 1px solid var(--biz-text-input-border-color);
    border-radius: var(--biz-text-input-border-radius) var(--biz-text-input-border-radius) 0 0;
  }

  .biz-text-input.standard .input-control {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--biz-text-input-border-color);
    border-radius: 0;
  }

  /* Sizes */
  .biz-text-input.small .input-control {
    height: var(--biz-text-input-height-sm);
    padding: 0 var(--biz-text-input-padding-x);
  }

  .biz-text-input.medium .input-control {
    height: var(--biz-text-input-height-md);
    padding: 0 var(--biz-text-input-padding-x);
  }

  .biz-text-input.large .input-control {
    height: var(--biz-text-input-height-lg);
    padding: 0 var(--biz-text-input-padding-x);
  }

  /* States: Hover */
  .biz-text-input:not(.disabled):not(.readonly):hover .input-control {
    border-color: var(--biz-text-input-hover-border-color);
  }

  /* States: Focus / Focus-visible */
  .biz-text-input:not(.disabled):not(.readonly) .input-control:focus-within {
    border-color: var(--biz-text-input-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-text-input-focus-ring-color);
  }

  /* States: Error */
  .biz-text-input.error .input-control {
    border-color: var(--biz-text-input-error-color) !important;
  }

  .biz-text-input.error:not(.disabled) .input-control:focus-within {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  /* States: Disabled */
  .biz-text-input.disabled .input-control {
    background-color: var(--biz-text-input-disabled-bg-color);
    border-color: var(--biz-text-input-border-color);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .biz-text-input.disabled .input-field {
    color: var(--biz-text-input-disabled-text-color);
    cursor: not-allowed;
  }

  /* States: Readonly */
  .biz-text-input.readonly .input-control {
    background-color: #f3f4f6;
    border-style: dashed;
  }

  /* Clear button */
  .clear-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    color: var(--biz-text-input-placeholder-color);
    padding: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .clear-button:hover {
    color: var(--biz-text-input-text-color);
  }

  /* Loading Spinner */
  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid var(--biz-text-input-border-color);
    border-top-color: var(--biz-text-input-focus-border-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-left: 4px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Helper text & Error message */
  .helper-text-container {
    font-size: 12px;
    color: #6b7280;
  }

  .biz-text-input.error .helper-text-container {
    color: var(--biz-text-input-error-color);
  }
  /* TextInput.css.ts 의 .label-container 부분 수정 및 하단 추가 */
    .label-container {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--biz-text-input-text-color);
    }

    /* 슬롯에 전달된 자식 노드가 없거나 비어있는 경우 안보이도록 처리 */
    .label-container:has(slot[name="label-slot"]:empty) {
    display: none;
    }
    /* Layout Directions */
.biz-text-input.vertical {
  flex-direction: column;
  gap: 4px;
}

.biz-text-input.horizontal {
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
}

.biz-text-input.horizontal .label-container {
  padding-top: var(--biz-text-input-padding-y);
  white-space: nowrap;
}

.biz-text-input.horizontal .input-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
`;