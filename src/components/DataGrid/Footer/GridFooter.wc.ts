import { LitElement, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GridFooterTemplate, type GridFooterHost, type ColumnDef } from "./GridFooter";
import { GridfooterStyles } from "./GridFooter.css";

@customElement("grid-footer")
export class GridFooter extends LitElement implements GridFooterHost {
  static styles = GridfooterStyles;

  @property({ type: String })
  variant: "default" | "compact" = "default";

  @property({ type: String })
  size: "sm" | "md" | "lg" = "md";

  @property({ type: Array })
  columns: ColumnDef[] = [];

  @property({ type: Object })
  summaryData: Record<string, any> = {};

  @property({ type: Number })
  totalCount = 0;

  @property({ type: Number })
  filteredCount = 0;

  @property({ type: Number })
  selectedCount = 0;

  @property({ type: Number })
  totalWidth = 0;

  @property({ type: Number })
  scrollLeft = 0;

  handleSummaryBarClick = (e: MouseEvent | CustomEvent): void => {
    this.dispatchEvent(
      new CustomEvent("summary-bar-click", {
        detail: {
          totalCount: this.totalCount,
          selectedCount: this.selectedCount,
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  render(): TemplateResult {
    return GridFooterTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "grid-footer": GridFooter;
  }
}