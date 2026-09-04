import { css } from "lit";

export const GriddataGridStyles = css`
  :host {
    --grid-data-grid-width: 100%;
    --grid-data-grid-height: 600px;
    --grid-data-grid-bg: #ffffff;
    --grid-data-grid-border-color: #e1e4e8;
    --grid-data-grid-header-bg: #f6f8fa;
    --grid-data-grid-row-height: 40px;
    --grid-data-grid-row-hover-bg: #f1f5f9;
    --grid-data-grid-row-dirty-bg: #fffbe6;
    --grid-data-grid-selection-border: #0969da;
    --grid-data-grid-padding: 8px 12px;
    --grid-data-grid-font-size: 14px;

    display: block;
    width: var(--grid-data-grid-width);
    height: var(--grid-data-grid-height);
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .grid-data-grid {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: var(--grid-data-grid-bg);
    font-size: var(--grid-data-grid-font-size);
    overflow: hidden;
  }

  /* Variants */
  .grid-data-grid--default {
    border: 1px solid var(--grid-data-grid-border-color);
    border-radius: 4px;
  }

  .grid-data-grid--bordered {
    border: 2px solid var(--grid-data-grid-border-color);
  }

  .grid-data-grid--borderless {
    border: none;
    box-shadow: none;
  }

  /* 헤더-행 셀 너비 스타일 동기화 */
  grid-header-cell,
  grid-cell,
  grid-footer-cell {
    box-sizing: border-box;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
  }

  /* 푸터 영역 수직선 정리 및 레이아웃 정돈 */
  grid-footer {
    display: flex;
    width: 100%;
    background-color: var(--grid-data-grid-header-bg);
    border-top: 1px solid var(--grid-data-grid-border-color);
    box-sizing: border-box;
    overflow: hidden;
  }

  grid-footer-cell {
    min-height: var(--grid-data-grid-row-height);
    border-right: 1px solid var(--grid-data-grid-border-color);
    padding: var(--grid-data-grid-padding);
  }

  grid-footer-cell:last-child {
    border-right: none;
  }

  /* 툴바 및 페이지네이션 오버플로우 수정 */
  .grid-data-grid__toolbar {
    position: relative;
    overflow: hidden;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: var(--grid-data-grid-padding);
    background-color: var(--grid-data-grid-header-bg);
    border-top: 1px solid var(--grid-data-grid-border-color);
    margin-top: auto;
    flex-shrink: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .grid-data-grid__toolbar ::slotted(grid-info),
  .grid-data-grid__toolbar ::slotted(grid-pagination),
  grid-info,
  grid-pagination {
    display: flex;
    align-items: center;
  }
`;