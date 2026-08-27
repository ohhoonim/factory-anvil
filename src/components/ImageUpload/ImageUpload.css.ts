import { css } from "lit";

export const imageUploadStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-image-upload-width-sm: 100px;
    --biz-image-upload-height-sm: 100px;
    --biz-image-upload-width-md: 160px;
    --biz-image-upload-height-md: 160px;
    --biz-image-upload-width-lg: 240px;
    --biz-image-upload-height-lg: 240px;
    --biz-image-upload-border-radius: 8px;
    --biz-image-upload-crop-modal-width: 600px;

    /* Colors - Base & Drop Zone */
    --biz-image-upload-bg: #ffffff;
    --biz-image-upload-border-color: #d1d5db;
    --biz-image-upload-border-style: dashed;
    --biz-image-upload-text-color: #111827;

    /* Colors - Hover & Overlay */
    --biz-image-upload-dragover-bg: #eff6ff;
    --biz-image-upload-dragover-border-color: #2563eb;
    --biz-image-upload-overlay-bg: rgba(0, 0, 0, 0.5);
    --biz-image-upload-overlay-btn-color: #ffffff;

    /* Colors - Crop Canvas & Mask */
    --biz-image-upload-crop-bg: #000000;
    --biz-image-upload-crop-mask-bg: rgba(0, 0, 0, 0.6);
    --biz-image-upload-crop-grid-color: rgba(255, 255, 255, 0.4);

    /* Colors - Error & Disabled */
    --biz-image-upload-error-color: #dc2626;
    --biz-image-upload-disabled-bg: #f3f4f6;
    --biz-image-upload-disabled-text-color: #9ca3af;

    display: inline-block;
    box-sizing: border-box;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .biz-image-upload {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  /* Label Area */
  .biz-image-upload__label {
    font-size: 14px;
    font-weight: 600;
    color: var(--biz-image-upload-text-color);
  }

  /* Container & Sizes */
  .biz-image-upload__container {
    position: relative;
    border-radius: var(--biz-image-upload-border-radius);
    overflow: hidden;
    background-color: var(--biz-image-upload-bg);
  }

  :host([size='small']) .biz-image-upload__container {
    width: var(--biz-image-upload-width-sm);
    height: var(--biz-image-upload-height-sm);
  }

  :host([size='medium']) .biz-image-upload__container,
  :host(:not([size])) .biz-image-upload__container {
    width: var(--biz-image-upload-width-md);
    height: var(--biz-image-upload-height-md);
  }

  :host([size='large']) .biz-image-upload__container {
    width: var(--biz-image-upload-width-lg);
    height: var(--biz-image-upload-height-lg);
  }

  /* Variants */
  :host([variant='outlined']) .biz-image-upload__dropzone,
  :host(:not([variant])) .biz-image-upload__dropzone {
    border: 2px var(--biz-image-upload-border-style) var(--biz-image-upload-border-color);
    background-color: var(--biz-image-upload-bg);
  }

  :host([variant='filled']) .biz-image-upload__dropzone {
    border: 2px solid transparent;
    background-color: #f3f4f6;
  }

  :host([variant='standard']) .biz-image-upload__dropzone {
    border: none;
    border-bottom: 2px var(--biz-image-upload-border-style) var(--biz-image-upload-border-color);
    border-radius: 0;
    background-color: transparent;
  }

  /* Shapes */
  :host([shape='circle']) .biz-image-upload__container,
  :host([shape='circle']) .biz-image-upload__dropzone,
  :host([shape='circle']) .biz-image-upload__preview-wrapper {
    border-radius: 50%;
  }

  /* Dropzone & Hover/Focus/Active States */
  .biz-image-upload__dropzone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    padding: 12px;
    text-align: center;
  }

  .biz-image-upload__dropzone:hover {
    border-color: var(--biz-image-upload-dragover-border-color);
    background-color: var(--biz-image-upload-dragover-bg);
  }

  .biz-image-upload__dropzone:focus-visible {
    outline: 2px solid var(--biz-image-upload-dragover-border-color);
    outline-offset: 2px;
  }

  .biz-image-upload__dropzone:active {
    transform: scale(0.98);
  }

  /* Dragover State */
  .biz-image-upload__container--dragover .biz-image-upload__dropzone {
    border-color: var(--biz-image-upload-dragover-border-color);
    background-color: var(--biz-image-upload-dragover-bg);
  }

  /* Hidden Input */
  .biz-image-upload__input {
    display: none;
  }

  .biz-image-upload__drop-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    color: var(--biz-image-upload-text-color);
    font-size: 12px;
  }

  /* Preview Area */
  .biz-image-upload__preview-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .biz-image-upload__preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Overlay */
  .biz-image-upload__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--biz-image-upload-overlay-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .biz-image-upload__preview-wrapper:hover .biz-image-upload__overlay,
  .biz-image-upload__preview-wrapper:focus-within .biz-image-upload__overlay {
    opacity: 1;
  }

  .biz-image-upload__action-btn {
    background: none;
    border: none;
    color: var(--biz-image-upload-overlay-btn-color);
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

  .biz-image-upload__action-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .biz-image-upload__action-btn:focus-visible {
    outline: 2px solid var(--biz-image-upload-overlay-btn-color);
  }

  /* Disabled State */
  .biz-image-upload--disabled .biz-image-upload__dropzone {
    background-color: var(--biz-image-upload-disabled-bg);
    cursor: not-allowed;
    border-color: #e5e7eb;
    color: var(--biz-image-upload-disabled-text-color);
  }

  .biz-image-upload--disabled .biz-image-upload__dropzone:hover {
    border-color: #e5e7eb;
    background-color: var(--biz-image-upload-disabled-bg);
  }

  /* Readonly State */
  .biz-image-upload--readonly .biz-image-upload__dropzone {
    cursor: default;
  }

  .biz-image-upload--readonly .biz-image-upload__overlay {
    display: none;
  }

  /* Error State */
  .biz-image-upload--error .biz-image-upload__dropzone {
    border-color: var(--biz-image-upload-error-color);
  }

  /* Loading State & Spinner */
  .biz-image-upload__spinner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .biz-image-upload__spinner {
    width: 24px;
    height: 24px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Crop Modal / Dialog */
  .biz-image-upload__dialog {
    border: none;
    border-radius: 8px;
    padding: 20px;
    max-width: var(--biz-image-upload-crop-modal-width);
    width: 90vw;
    background-color: #ffffff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .biz-image-upload__dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .biz-image-upload__crop-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .biz-image-upload__crop-canvas {
    position: relative;
    width: 100%;
    height: 300px;
    background-color: var(--biz-image-upload-crop-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .biz-image-upload__crop-toolbar,
  .biz-image-upload__crop-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  /* Helper Text & Screen Reader Live Region */
  .biz-image-upload__helper-text {
    font-size: 12px;
    color: #6b7280;
  }

  .biz-image-upload--error .biz-image-upload__helper-text {
    color: var(--biz-image-upload-error-color);
  }

  .biz-image-upload__sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* .biz-image-upload__crop-footer 내 버튼 스타일 추가/수정 */
  .biz-image-upload__crop-footer .biz-image-upload__action-btn {
    color: var(--biz-image-upload-text-color, #111827);
    background-color: #f3f4f6;
    border: 1px solid #d1d5db;
    padding: 6px 16px;
    font-weight: 500;
  }

  .biz-image-upload__crop-footer .biz-image-upload__action-btn:hover {
    background-color: #e5e7eb;
  }

  .biz-image-upload__crop-footer .biz-image-upload__action-btn--primary {
    color: #ffffff;
    background-color: #2563eb;
    border-color: #2563eb;
  }

  .biz-image-upload__crop-footer .biz-image-upload__action-btn--primary:hover {
    background-color: #1d4ed8;
  }
`;