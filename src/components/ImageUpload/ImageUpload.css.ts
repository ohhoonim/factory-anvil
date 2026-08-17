import { css } from 'lit';

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

    /* Colors - Error & Disabled */
    --biz-image-upload-error-color: #dc2626;
    --biz-image-upload-disabled-bg: #f3f4f6;
    --biz-image-upload-disabled-text-color: #9ca3af;

    display: inline-block;
    box-sizing: border-box;
    font-family: inherit;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Root Container */
  .biz-image-upload {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: var(--biz-image-upload-width, var(--biz-image-upload-width-md));
  }

  /* Label & Helper Slots */
  .biz-image-upload__label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--biz-image-upload-text-color);
  }

  .biz-image-upload__helper-text {
    font-size: 12px;
    color: #6b7280;
  }

  /* Drop Zone & Main Box */
  .biz-image-upload__container {
    position: relative;
    width: var(--biz-image-upload-width, var(--biz-image-upload-width-md));
    height: var(--biz-image-upload-height, var(--biz-image-upload-height-md));
    border-radius: var(--biz-image-upload-border-radius);
    border: 2px var(--biz-image-upload-border-style) var(--biz-image-upload-border-color);
    background-color: var(--biz-image-upload-bg);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }

  .biz-image-upload__drop-zone {
    padding: 12px;
    text-align: center;
    font-size: 13px;
    color: #6b7280;
  }

  /* Variants */
  .biz-image-upload--outlined .biz-image-upload__container {
    --biz-image-upload-border-style: solid;
  }

  .biz-image-upload--filled .biz-image-upload__container {
    --biz-image-upload-bg: #f9fafb;
    --biz-image-upload-border-style: none;
  }

  .biz-image-upload--standard .biz-image-upload__container {
    --biz-image-upload-border-style: dashed;
  }

  /* Shape: Circle Mode */
  .biz-image-upload--circle .biz-image-upload__container {
    border-radius: 50%;
  }

  /* Sizes */
  .biz-image-upload--sm {
    --biz-image-upload-width: var(--biz-image-upload-width-sm);
    --biz-image-upload-height: var(--biz-image-upload-height-sm);
  }

  .biz-image-upload--md {
    --biz-image-upload-width: var(--biz-image-upload-width-md);
    --biz-image-upload-height: var(--biz-image-upload-height-md);
  }

  .biz-image-upload--lg {
    --biz-image-upload-width: var(--biz-image-upload-width-lg);
    --biz-image-upload-height: var(--biz-image-upload-height-lg);
  }

  /* States: Dragover & Focus */
  .biz-image-upload__container:hover {
    border-color: var(--biz-image-upload-dragover-border-color);
  }

  .biz-image-upload--dragover .biz-image-upload__container {
    background-color: var(--biz-image-upload-dragover-bg);
    border-color: var(--biz-image-upload-dragover-border-color);
  }

  .biz-image-upload__container:focus-visible {
    outline: 2px solid var(--biz-image-upload-dragover-border-color);
    outline-offset: 2px;
  }

  /* State: Disabled */
  .biz-image-upload--disabled .biz-image-upload__container {
    background-color: var(--biz-image-upload-disabled-bg);
    border-color: #e5e7eb;
    cursor: not-allowed;
    opacity: 0.6;
  }

  .biz-image-upload--disabled .biz-image-upload__label {
    color: var(--biz-image-upload-disabled-text-color);
  }

  /* State: Readonly */
  .biz-image-upload--readonly .biz-image-upload__container {
    cursor: default;
    border-style: solid;
  }

  /* State: Error */
  .biz-image-upload--error .biz-image-upload__container {
    border-color: var(--biz-image-upload-error-color);
  }

  .biz-image-upload--error .biz-image-upload__helper-text {
    color: var(--biz-image-upload-error-color);
  }

  /* Preview Image & Control Overlay */
  .biz-image-upload__preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .biz-image-upload__overlay {
    position: absolute;
    inset: 0;
    background-color: var(--biz-image-upload-overlay-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .biz-image-upload__container:hover .biz-image-upload__overlay,
  .biz-image-upload__container:focus-within .biz-image-upload__overlay {
    opacity: 1;
  }

  .biz-image-upload__overlay-btn {
    background: transparent;
    border: 1px solid var(--biz-image-upload-overlay-btn-color);
    color: var(--biz-image-upload-overlay-btn-color);
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
  }

  .biz-image-upload__overlay-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  /* Crop Modal & Canvas Dialog */
  .biz-image-upload__modal-backdrop {
    position: fixed;
    inset: 0;
    background-color: var(--biz-image-upload-crop-mask-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .biz-image-upload__modal {
    background-color: #ffffff;
    border-radius: 8px;
    width: var(--biz-image-upload-crop-modal-width);
    max-width: 90vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .biz-image-upload__crop-canvas {
    width: 100%;
    height: 360px;
    background-color: var(--biz-image-upload-crop-bg);
    color: #ffffff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .biz-image-upload__crop-toolbar,
  .biz-image-upload__crop-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 16px;
    background-color: #f9fafb;
    border-top: 1px solid #e5e7eb;
  }

  .biz-image-upload__btn {
    padding: 6px 12px;
    border-radius: 4px;
    border: 1px solid #d1d5db;
    background-color: #ffffff;
    cursor: pointer;
    font-size: 13px;
  }

  .biz-image-upload__btn--primary {
    background-color: #2563eb;
    color: #ffffff;
    border-color: #2563eb;
  }

  /* Hidden Native Input */
  .biz-image-upload__input {
    display: none;
  }
`;