import { css } from 'lit';

export const sliderStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-slider-track-height: 6px;
    --biz-slider-thumb-size-sm: 14px;
    --biz-slider-thumb-size-md: 18px;
    --biz-slider-thumb-size-lg: 22px;
    --biz-slider-tick-size: 4px;

    /* Colors - Base Track & Fill */
    --biz-slider-track-bg: #e5e7eb;
    --biz-slider-range-fill-bg: #2563eb;

    /* Colors - Thumb & Tooltip */
    --biz-slider-thumb-bg: #ffffff;
    --biz-slider-thumb-border-color: #2563eb;
    --biz-slider-thumb-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    --biz-slider-tooltip-bg: #1f2937;
    --biz-slider-tooltip-text-color: #ffffff;

    /* Colors - Interactive States */
    --biz-slider-thumb-hover-bg: #eff6ff;
    --biz-slider-focus-ring-color: rgba(37, 99, 235, 0.3);

    /* Colors - Error & Disabled */
    --biz-slider-error-color: #dc2626;
    --biz-slider-disabled-track-bg: #f3f4f6;
    --biz-slider-disabled-fill-bg: #9ca3af;
    --biz-slider-disabled-thumb-border: #d1d5db;

    display: inline-block;
    width: 100%;
    box-sizing: border-box;
  }

  .biz-slider {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    position: relative;
    user-select: none;
  }

  /* Variants */
  .biz-slider--standard {
    background: transparent;
  }

  .biz-slider--filled {
    background-color: #f9fafb;
    padding: 12px;
    border-radius: 8px;
  }

  .biz-slider--outlined {
    background-color: transparent;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
  }

  /* Sizes */
  .biz-slider--small {
    --biz-slider-track-height: 4px;
    --biz-slider-thumb-size: var(--biz-slider-thumb-size-sm);
  }

  .biz-slider--medium {
    --biz-slider-track-height: 6px;
    --biz-slider-thumb-size: var(--biz-slider-thumb-size-md);
  }

  .biz-slider--large {
    --biz-slider-track-height: 8px;
    --biz-slider-thumb-size: var(--biz-slider-thumb-size-lg);
  }

  /* Body & Layout */
  .biz-slider__body {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .biz-slider--vertical .biz-slider__body {
    flex-direction: column;
    height: 200px;
  }

  .biz-slider__track-container {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .biz-slider--horizontal .biz-slider__track-container {
    height: var(--biz-slider-thumb-size);
    width: 100%;
  }

  .biz-slider--vertical .biz-slider__track-container {
    width: var(--biz-slider-thumb-size);
    height: 100%;
  }

  .biz-slider__track {
    position: absolute;
    background-color: var(--biz-slider-track-bg);
    border-radius: 9999px;
  }

  .biz-slider--horizontal .biz-slider__track {
    top: 50%;
    left: 0;
    width: 100%;
    height: var(--biz-slider-track-height);
    transform: translateY(-50%);
  }

  .biz-slider--vertical .biz-slider__track {
    left: 50%;
    top: 0;
    height: 100%;
    width: var(--biz-slider-track-height);
    transform: translateX(-50%);
  }

  .biz-slider__range-fill {
    position: absolute;
    background-color: var(--biz-slider-range-fill-bg);
    border-radius: 9999px;
  }

  .biz-slider--horizontal .biz-slider__range-fill {
    top: 50%;
    height: var(--biz-slider-track-height);
    transform: translateY(-50%);
  }

  .biz-slider--vertical .biz-slider__range-fill {
    left: 50%;
    width: var(--biz-slider-track-height);
    transform: translateX(-50%);
  }

  /* Thumb */
  .biz-slider__thumb {
    position: absolute;
    width: var(--biz-slider-thumb-size);
    height: var(--biz-slider-thumb-size);
    background-color: var(--biz-slider-thumb-bg);
    border: 2px solid var(--biz-slider-thumb-border-color);
    border-radius: 50%;
    box-shadow: var(--biz-slider-thumb-shadow);
    box-sizing: border-box;
    outline: none;
    transition: transform 0.1s ease, background-color 0.2s ease;
    z-index: 2;
  }

  .biz-slider--horizontal .biz-slider__thumb {
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .biz-slider--vertical .biz-slider__thumb {
    left: 50%;
    transform: translate(-50%, 50%);
  }

  /* States: Hover, Focus, Active */
  .biz-slider__thumb:hover {
    background-color: var(--biz-slider-thumb-hover-bg);
  }

  .biz-slider__thumb:focus-visible {
    box-shadow: 0 0 0 4px var(--biz-slider-focus-ring-color);
  }

  .biz-slider__thumb--dragging {
    transform: translate(-50%, -50%) scale(1.15) !important;
  }

  /* Tooltip */
  .biz-slider__tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-8px);
    background-color: var(--biz-slider-tooltip-bg);
    color: var(--biz-slider-tooltip-text-color);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  .biz-slider__thumb:hover .biz-slider__tooltip,
  .biz-slider__tooltip--visible {
    opacity: 1;
  }

  /* Ticks */
  .biz-slider__ticks {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .biz-slider__tick {
    position: absolute;
    width: var(--biz-slider-tick-size);
    height: var(--biz-slider-tick-size);
    background-color: #9ca3af;
    border-radius: 50%;
  }

  .biz-slider--horizontal .biz-slider__tick {
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .biz-slider--vertical .biz-slider__tick {
    left: 50%;
    transform: translate(-50%, 50%);
  }

  /* Disabled State */
  .biz-slider--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .biz-slider--disabled .biz-slider__track-container {
    cursor: not-allowed;
  }

  .biz-slider--disabled .biz-slider__track {
    background-color: var(--biz-slider-disabled-track-bg);
  }

  .biz-slider--disabled .biz-slider__range-fill {
    background-color: var(--biz-slider-disabled-fill-bg);
  }

  .biz-slider--disabled .biz-slider__thumb {
    border-color: var(--biz-slider-disabled-thumb-border);
    pointer-events: none;
  }

  /* Readonly State */
  .biz-slider--readonly .biz-slider__track-container {
    cursor: default;
  }

  .biz-slider--readonly .biz-slider__thumb {
    pointer-events: none;
  }

  /* Error State */
  .biz-slider--error .biz-slider__range-fill {
    background-color: var(--biz-slider-error-color);
  }

  .biz-slider--error .biz-slider__thumb {
    border-color: var(--biz-slider-error-color);
  }
`;