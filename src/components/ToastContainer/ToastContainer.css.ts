// src/components/ToastContainer/ToastContainer.css.ts
import { css } from 'lit';

export const toastContainerStyles = css`
  :host {
    /* Positioning & Layout */
    --biz-toast-container-top: 20px;
    --biz-toast-container-bottom: 20px;
    --biz-toast-container-left: 20px;
    --biz-toast-container-right: 20px;
    --biz-toast-container-z-index: 9999;
    --biz-toast-container-gap: 10px;
    --biz-toast-container-max-width: 420px;
    --biz-toast-container-width: 100%;

    /* Flex & Alignments */
    --biz-toast-container-display: flex;
    --biz-toast-container-direction: column;
    --biz-toast-container-align: flex-end;

    /* States & Visual Attributes */
    --biz-toast-container-opacity: 1;
    --biz-toast-container-filter: none;
    --biz-toast-container-border: none;
    --biz-toast-container-bg: transparent;

    position: fixed;
    z-index: var(--biz-toast-container-z-index);
    pointer-events: none;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  /* Screen Position Variants */
  :host([position='top-right']) {
    top: var(--biz-toast-container-top);
    right: var(--biz-toast-container-right);
    bottom: auto;
    left: auto;
    transform: none;
    --biz-toast-container-align: flex-end;
    --biz-toast-container-direction: column;
  }

  :host([position='top-left']) {
    top: var(--biz-toast-container-top);
    left: var(--biz-toast-container-left);
    bottom: auto;
    right: auto;
    transform: none;
    --biz-toast-container-align: flex-start;
    --biz-toast-container-direction: column;
  }

  :host([position='bottom-right']) {
    bottom: var(--biz-toast-container-bottom);
    right: var(--biz-toast-container-right);
    top: auto;
    left: auto;
    transform: none;
    --biz-toast-container-align: flex-end;
    --biz-toast-container-direction: column-reverse;
  }

  :host([position='bottom-left']) {
    bottom: var(--biz-toast-container-bottom);
    left: var(--biz-toast-container-left);
    top: auto;
    right: auto;
    transform: none;
    --biz-toast-container-align: flex-start;
    --biz-toast-container-direction: column-reverse;
  }

  :host([position='top-center']) {
    top: var(--biz-toast-container-top);
    left: 50%;
    transform: translateX(-50%);
    bottom: auto;
    right: auto;
    --biz-toast-container-align: center;
    --biz-toast-container-direction: column;
  }

  :host([position='bottom-center']) {
    bottom: var(--biz-toast-container-bottom);
    left: 50%;
    transform: translateX(-50%);
    top: auto;
    right: auto;
    --biz-toast-container-align: center;
    --biz-toast-container-direction: column-reverse;
  }

  /* Sizes Variants (Gap control) */
  :host([size='small']) {
    --biz-toast-container-gap: 6px;
  }

  :host([size='medium']) {
    --biz-toast-container-gap: 10px;
  }

  :host([size='large']) {
    --biz-toast-container-gap: 16px;
  }

  /* Variants (Outlined, Filled, Standard) Support Frame */
  :host([variant='outlined']) .biz-toast-container {
    border: 1px dashed rgba(0, 0, 0, 0.12);
  }

  :host([variant='filled']) .biz-toast-container {
    background-color: var(--biz-toast-container-bg);
  }

  :host([variant='standard']) .biz-toast-container {
    border: none;
  }

  /* Root Container Layout */
  .biz-toast-container {
    display: var(--biz-toast-container-display);
    flex-direction: var(--biz-toast-container-direction);
    align-items: var(--biz-toast-container-align);
    gap: var(--biz-toast-container-gap);
    width: var(--biz-toast-container-width);
    max-width: var(--biz-toast-container-max-width);
    box-sizing: border-box;
    opacity: var(--biz-toast-container-opacity);
    filter: var(--biz-toast-container-filter);
    border: var(--biz-toast-container-border);
    transition: opacity 0.2s ease, filter 0.2s ease;
  }

  /* States (Hover, Focus, Active, Disabled, Readonly, Error, Loading) */
  .biz-toast-container[data-hovered='true'] {
    --biz-toast-container-opacity: 0.98;
  }

  :host([focused]) .biz-toast-container,
  :host(:focus-within) .biz-toast-container {
    outline: 2px solid #1976d2;
    outline-offset: 4px;
  }

  :host([active]) .biz-toast-container {
    --biz-toast-container-opacity: 0.9;
  }

  :host([disabled]) {
    pointer-events: none;
    --biz-toast-container-opacity: 0.5;
  }

  :host([readonly]) {
    pointer-events: none;
  }

  :host([error]) .biz-toast-container {
    border: 1px solid #d32f2f;
  }

  :host([loading]) .biz-toast-container {
    --biz-toast-container-filter: grayscale(0.3);
  }

  /* Slot Child Element Orchestration */
  ::slotted(*) {
    pointer-events: auto;
    transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out;
  }

  /* Overflow Handling Strategy */
  .biz-toast-container[data-overflow='true'] ::slotted(.biz-toast-hidden) {
    display: none !important;
  }
`;