import { css } from 'lit';

export const sliderStyles = css`
  :host {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;

    --biz-slider-track-height: 6px;
    --biz-slider-thumb-size-sm: 14px;
    --biz-slider-thumb-size-md: 18px;
    --biz-slider-thumb-size-lg: 22px;
    --biz-slider-tick-size: 4px;

    --biz-slider-track-bg: #e5e7eb;
    --biz-slider-range-fill-bg: #2563eb;

    --biz-slider-thumb-bg: #ffffff;
    --biz-slider-thumb-border-color: #2563eb;
    --biz-slider-thumb-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    --biz-slider-tooltip-bg: #1f2937;
    --biz-slider-tooltip-text-color: #ffffff;

    --biz-slider-thumb-hover-bg: #eff6ff;
    --biz-slider-focus-ring-color: rgba(37, 99, 235, 0.3);

    --biz-slider-error-color: #dc2626;
    --biz-slider-disabled-track-bg: #f3f4f6;
    --biz-slider-disabled-fill-bg: #9ca3af;
    --biz-slider-disabled-thumb-border: #d1d5db;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .biz-slider {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    font-family: inherit;
  }

  .biz-slider__body {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
  }

  .biz-slider.vertical .biz-slider__body {
    flex-direction: column;
    height: 200px;
  }

  .biz-slider__track-container {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px 0;
    touch-action: none;
  }

  .biz-slider.vertical .biz-slider__track-container {
    height: 100%;
    padding: 0 10px;
    justify-content: center;
  }

  .biz-slider__track {
    width: 100%;
    height: var(--biz-slider-track-height);
    background-color: var(--biz-slider-track-bg);
    border-radius: 9999px;
    position: relative;
  }

  .biz-slider.vertical .biz-slider__track {
    width: var(--biz-slider-track-height);
    height: 100%;
  }

  .biz-slider__fill {
    position: absolute;
    background-color: var(--biz-slider-range-fill-bg);
    border-radius: 9999px;
    height: var(--biz-slider-track-height);
  }

  .biz-slider.vertical .biz-slider__fill {
    width: var(--biz-slider-track-height);
  }

  .biz-slider__thumb {
    position: absolute;
    width: var(--thumb-size, var(--biz-slider-thumb-size-md));
    height: var(--thumb-size, var(--biz-slider-thumb-size-md));
    background-color: var(--biz-slider-thumb-bg);
    border: 2px solid var(--biz-slider-thumb-border-color);
    border-radius: 50%;
    box-shadow: var(--biz-slider-thumb-shadow);
    transform: translate(-50%, -50%);
    top: 50%;
    cursor: grab;
    outline: none;
    transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
    z-index: 2;
  }

  .biz-slider.vertical .biz-slider__thumb {
    left: 50%;
    top: auto;
  }

  .biz-slider__thumb:hover {
    background-color: var(--biz-slider-thumb-hover-bg);
  }

  .biz-slider__thumb:focus-visible {
    box-shadow: 0 0 0 4px var(--biz-slider-focus-ring-color);
  }

  .biz-slider__thumb.active {
    cursor: grabbing;
    transform: translate(-50%, -50%) scale(1.15);
  }

  .biz-slider__tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    background-color: var(--biz-slider-tooltip-bg);
    color: var(--biz-slider-tooltip-text-color);
    font-size: 12px;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  .biz-slider__thumb:hover .biz-slider__tooltip,
  .biz-slider__thumb.active .biz-slider__tooltip,
  .biz-slider__thumb:focus-visible .biz-slider__tooltip {
    opacity: 1;
  }

  .biz-slider.small {
    --thumb-size: var(--biz-slider-thumb-size-sm);
  }

  .biz-slider.medium {
    --thumb-size: var(--biz-slider-thumb-size-md);
  }

  .biz-slider.large {
    --thumb-size: var(--biz-slider-thumb-size-lg);
  }

  .biz-slider.standard {
    border: none;
  }

  .biz-slider.outlined {
    border: 1px solid var(--biz-slider-track-bg);
    padding: 12px;
    border-radius: 8px;
  }

  .biz-slider.filled {
    background-color: #f9fafb;
    padding: 12px;
    border-radius: 8px;
  }

  .biz-slider.disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .biz-slider.disabled .biz-slider__track {
    background-color: var(--biz-slider-disabled-track-bg);
  }

  .biz-slider.disabled .biz-slider__fill {
    background-color: var(--biz-slider-disabled-fill-bg);
  }

  .biz-slider.disabled .biz-slider__thumb {
    border-color: var(--biz-slider-disabled-thumb-border);
    cursor: not-allowed;
  }

  .biz-slider.readonly .biz-slider__track-container {
    cursor: default;
  }

  .biz-slider.readonly .biz-slider__thumb {
    cursor: default;
  }

  .biz-slider.error .biz-slider__fill {
    background-color: var(--biz-slider-error-color);
  }

  .biz-slider.error .biz-slider__thumb {
    border-color: var(--biz-slider-error-color);
  }

  .biz-slider.loading {
    opacity: 0.7;
    pointer-events: none;
  }

  .biz-slider__ticks {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
  }

  .biz-slider__native-input {
    display: none;
  }
`;