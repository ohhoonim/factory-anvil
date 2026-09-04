import { html, type TemplateResult } from "lit";

export interface ColumnDef {
  key: string;
  width?: number | string;
  aggregateFunc?: string;
  align?: "left" | "center" | "right";
  variant?: "default" | "positive" | "negative";
  formatter?: (value: any) => string;
  [key: string]: any;
}

export interface GridFooterHost {
  variant: "default" | "compact";
  size: "sm" | "md" | "lg";
  columns: ColumnDef[];
  summaryData: Record<string, any>;
  totalCount: number;
  filteredCount: number;
  selectedCount: number;
  totalWidth: number;
  scrollLeft: number;
  handleSummaryBarClick: (e: MouseEvent | CustomEvent) => void;
}

export const GridFooterTemplate = (host: GridFooterHost): TemplateResult => {
  const isCompact = host.variant === "compact";

  return html`
    <footer
      class="grid-footer grid-footer--${host.variant} grid-footer--${host.size}"
      role="contentinfo"
    >
      ${!isCompact
        ? html`
            <div
              class="grid-footer__summary-bar"
              @click=${host.handleSummaryBarClick}
            >
              <div class="grid-footer__meta-info">
                <span class="grid-footer__meta-item">
                  전체:
                  <strong>${host.totalCount.toLocaleString()}</strong>
                </span>
                <span class="grid-footer__meta-item">
                  필터:
                  <strong>${host.filteredCount.toLocaleString()}</strong>
                </span>
                <span class="grid-footer__meta-item">
                  선택:
                  <strong>${host.selectedCount.toLocaleString()}</strong>
                </span>
              </div>
              <div class="grid-footer__summary-slot">
                <slot name="summary-extra"></slot>
              </div>
            </div>
          `
        : null}

      <div class="grid-footer__aggregation-viewport">
        <div
          class="grid-footer__aggregation-row"
          style="width: ${typeof host.totalWidth === "number"
            ? `${host.totalWidth}px`
            : host.totalWidth}; transform: translate3d(-${host.scrollLeft}px, 0, 0);"
        >
          ${host.columns.map((col) => {
            const val = host.summaryData ? host.summaryData[col.key] : null;
            const widthVal =
              typeof col.width === "number" ? `${col.width}px` : col.width || "auto";

            return html`
              <grid-footer-cell
                .columnKey=${col.key}
                .aggregateFunc=${col.aggregateFunc || ""}
                .value=${val}
                .formatter=${col.formatter || null}
                .align=${col.align || "left"}
                .variant=${col.variant || "default"}
                style="width: ${widthVal};"
              ></grid-footer-cell>
            `;
          })}
        </div>
      </div>
    </footer>
  `;
};