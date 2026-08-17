import { css } from "lit";

export const fileUploaderStyles = css`
  :host {
    display: inline-block;
    box-sizing: border-box;
    --biz-file-uploader-dropzone-padding: 24px;
    --biz-file-uploader-dropzone-min-height: 160px;
    --biz-file-uploader-border-radius: 8px;
    --biz-file-uploader-item-height: 48px;
    --biz-file-uploader-bg: #ffffff;
    --biz-file-uploader-border-color: #d1d5db;
    --biz-file-uploader-border-style: dashed;
    --biz-file-uploader-text-color: #111827;
    --biz-file-uploader-dragover-bg: #eff6ff;
    --biz-file-uploader-dragover-border-color: #2563eb;
    --biz-file-uploader-focus-ring-color: rgba(37, 99, 235, 0.2);
    --biz-file-uploader-item-bg: #f9fafb;
    --biz-file-uploader-progress-bar-bg: #2563eb;
    --biz-file-uploader-error-color: #dc2626;
    --biz-file-uploader-error-bg: #fef2f2;
    --biz-file-uploader-disabled-bg: #f3f4f6;
    --biz-file-uploader-disabled-text-color: #9ca3af;
  }

  .biz-file-uploader {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    color: var(--biz-file-uploader-text-color);
    box-sizing: border-box;
  }

  .biz-file-uploader.full-width {
    width: 100%;
  }

  .hidden-input {
    display: none;
  }

  .drop-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--biz-file-uploader-dropzone-padding);
    min-height: var(--biz-file-uploader-dropzone-min-height);
    background-color: var(--biz-file-uploader-bg);
    border: 2px var(--biz-file-uploader-border-style) var(--biz-file-uploader-border-color);
    border-radius: var(--biz-file-uploader-border-radius);
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;
    box-sizing: border-box;
  }

  .drop-zone:hover {
    border-color: var(--biz-file-uploader-dragover-border-color);
    background-color: var(--biz-file-uploader-dragover-bg);
  }

  .drop-zone:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--biz-file-uploader-focus-ring-color);
  }

  .drop-zone-default-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .drop-zone-icon {
    font-size: 32px;
  }

  .drop-zone-text {
    font-size: 14px;
    color: var(--biz-file-uploader-text-color);
  }

  .upload-btn {
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid var(--biz-file-uploader-border-color);
    background-color: var(--biz-file-uploader-bg);
    cursor: pointer;
    font-size: 14px;
  }

  .file-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--biz-file-uploader-item-height);
    padding: 0 12px;
    background-color: var(--biz-file-uploader-item-bg);
    border-radius: var(--biz-file-uploader-border-radius);
    position: relative;
    overflow: hidden;
  }

  .file-item-info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }

  .file-name {
    font-weight: 500;
  }

  .file-size {
    font-size: 12px;
    color: var(--biz-file-uploader-disabled-text-color);
  }

  .progress-bar-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #e5e7eb;
  }

  .progress-bar {
    height: 100%;
    background-color: var(--biz-file-uploader-progress-bar-bg);
    transition: width 0.2s;
  }

  .remove-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: var(--biz-file-uploader-text-color);
    padding: 4px;
  }

  .variant-button .drop-zone {
    display: none;
  }

  .variant-compact .drop-zone {
    min-height: 80px;
    padding: 12px;
  }

  .variant-outlined {
    border-style: solid;
  }

  .variant-filled {
    background-color: var(--biz-file-uploader-item-bg);
  }

  .variant-standard {
    border-style: none;
  }

  .size-small {
    --biz-file-uploader-dropzone-min-height: 100px;
    --biz-file-uploader-dropzone-padding: 12px;
    --biz-file-uploader-item-height: 36px;
  }

  .size-medium {
    --biz-file-uploader-dropzone-min-height: 160px;
    --biz-file-uploader-dropzone-padding: 24px;
    --biz-file-uploader-item-height: 48px;
  }

  .size-large {
    --biz-file-uploader-dropzone-min-height: 220px;
    --biz-file-uploader-dropzone-padding: 32px;
    --biz-file-uploader-item-height: 56px;
  }

  .biz-file-uploader.is-dragover .drop-zone {
    background-color: var(--biz-file-uploader-dragover-bg);
    border-color: var(--biz-file-uploader-dragover-border-color);
  }

  .biz-file-uploader.is-error .drop-zone {
    border-color: var(--biz-file-uploader-error-color);
    background-color: var(--biz-file-uploader-error-bg);
  }

  .biz-file-uploader.is-disabled .drop-zone {
    background-color: var(--biz-file-uploader-disabled-bg);
    border-color: var(--biz-file-uploader-border-color);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .biz-file-uploader.is-disabled .upload-btn,
  .biz-file-uploader.is-disabled .remove-btn {
    cursor: not-allowed;
    color: var(--biz-file-uploader-disabled-text-color);
  }

  .biz-file-uploader.is-readonly .drop-zone {
    cursor: default;
  }

  .biz-file-uploader.is-uploading {
    pointer-events: none;
  }

  .helper-text {
    font-size: 12px;
    color: var(--biz-file-uploader-disabled-text-color);
  }

  .biz-file-uploader.is-error .helper-text {
    color: var(--biz-file-uploader-error-color);
  }
`;