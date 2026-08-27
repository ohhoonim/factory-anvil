import { css } from "lit";

export const fileUploaderStyles = css`
  :host {
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

    display: inline-block;
    box-sizing: border-box;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  :host([full-width]),
  .biz-file-uploader--full-width {
    width: 100%;
    display: block;
  }

  .biz-file-uploader {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    box-sizing: border-box;
  }

  .biz-file-uploader__dropzone {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--biz-file-uploader-dropzone-padding);
    min-height: var(--biz-file-uploader-dropzone-min-height);
    background-color: var(--biz-file-uploader-bg);
    border: 2px var(--biz-file-uploader-border-style) var(--biz-file-uploader-border-color);
    border-radius: var(--biz-file-uploader-border-radius);
    color: var(--biz-file-uploader-text-color);
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    outline: none;
  }

  .biz-file-uploader__dropzone:hover:not(.biz-file-uploader--disabled) {
    border-color: var(--biz-file-uploader-dragover-border-color);
    background-color: var(--biz-file-uploader-dragover-bg);
  }

  .biz-file-uploader__dropzone:focus-visible {
    border-color: var(--biz-file-uploader-dragover-border-color);
    box-shadow: 0 0 0 3px var(--biz-file-uploader-focus-ring-color);
  }

  .biz-file-uploader--dragover .biz-file-uploader__dropzone {
    background-color: var(--biz-file-uploader-dragover-bg);
    border-color: var(--biz-file-uploader-dragover-border-color);
    border-style: solid;
  }

  .biz-file-uploader__dropzone-default {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
  }

  .biz-file-uploader__upload-icon {
    width: 32px;
    height: 32px;
    color: var(--biz-file-uploader-border-color);
  }

  .biz-file-uploader__dropzone-text {
    margin: 0;
    font-size: 14px;
    color: var(--biz-file-uploader-text-color);
  }

  .biz-file-uploader__browse-text {
    color: var(--biz-file-uploader-dragover-border-color);
    font-weight: 600;
    text-decoration: underline;
  }

  .biz-file-uploader__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    border-radius: var(--biz-file-uploader-border-radius);
    border: 1px solid var(--biz-file-uploader-border-color);
    background-color: var(--biz-file-uploader-bg);
    color: var(--biz-file-uploader-text-color);
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }

  .biz-file-uploader__button:hover:not(:disabled) {
    background-color: var(--biz-file-uploader-item-bg);
    border-color: var(--biz-file-uploader-dragover-border-color);
  }

  .biz-file-uploader__compact {
    width: 80px;
    height: 80px;
    border: 2px dashed var(--biz-file-uploader-border-color);
    border-radius: var(--biz-file-uploader-border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: var(--biz-file-uploader-bg);
  }

  .biz-file-uploader__compact-icon {
    width: 24px;
    height: 24px;
    color: var(--biz-file-uploader-border-color);
  }

  .biz-file-uploader--small {
    --biz-file-uploader-dropzone-padding: 16px;
    --biz-file-uploader-dropzone-min-height: 120px;
    --biz-file-uploader-item-height: 36px;
  }

  .biz-file-uploader--large {
    --biz-file-uploader-dropzone-padding: 32px;
    --biz-file-uploader-dropzone-min-height: 200px;
    --biz-file-uploader-item-height: 56px;
  }

  .biz-file-uploader--disabled .biz-file-uploader__dropzone,
  .biz-file-uploader--disabled .biz-file-uploader__compact {
    background-color: var(--biz-file-uploader-disabled-bg);
    color: var(--biz-file-uploader-disabled-text-color);
    cursor: not-allowed;
    border-style: solid;
  }

  .biz-file-uploader--readonly .biz-file-uploader__dropzone,
  .biz-file-uploader--readonly .biz-file-uploader__compact {
    background-color: var(--biz-file-uploader-disabled-bg);
    cursor: default;
  }

  .biz-file-uploader--error .biz-file-uploader__dropzone {
    border-color: var(--biz-file-uploader-error-color);
    background-color: var(--biz-file-uploader-error-bg);
  }

  .biz-file-uploader__file-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .biz-file-uploader__file-item {
    height: var(--biz-file-uploader-item-height);
    background-color: var(--biz-file-uploader-item-bg);
    border-radius: var(--biz-file-uploader-border-radius);
    padding: 0 12px;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .biz-file-uploader__file-item-inner {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
  }

  .biz-file-uploader__file-icon {
    width: 20px;
    height: 20px;
    color: var(--biz-file-uploader-text-color);
  }

  .biz-file-uploader__file-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  .biz-file-uploader__file-name {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .biz-file-uploader__file-size {
    font-size: 12px;
    color: var(--biz-file-uploader-disabled-text-color);
  }

  .biz-file-uploader__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #e5e7eb;
  }

  .biz-file-uploader__progress-bar {
    height: 100%;
    background-color: var(--biz-file-uploader-progress-bar-bg);
    transition: width 0.2s ease;
  }

  .biz-file-uploader__remove-btn {
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
    color: var(--biz-file-uploader-disabled-text-color);
    padding: 0 4px;
  }

  .biz-file-uploader__remove-btn:hover {
    color: var(--biz-file-uploader-error-color);
  }

  .biz-file-uploader__error-text {
    font-size: 12px;
    color: var(--biz-file-uploader-error-color);
  }

  .biz-file-uploader__sr-only {
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
`;