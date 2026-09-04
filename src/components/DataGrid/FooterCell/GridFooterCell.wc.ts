import { LitElement, html, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { GridFooterCellTemplate, type GridFooterCellHost } from "./GridFooterCell";
import { GridfooterCellStyles } from "./GridFooterCell.css";

@customElement("grid-footer-cell")
export class GridFooterCell extends LitElement implements GridFooterCellHost {
  static styles = GridfooterCellStyles;

  @property({ type: String })
  columnKey = "";

  @property({ type: String })
  aggregateFunc = "";

  @property({ attribute: false })
  value: any = null;

  @property({ attribute: false })
  formatter: ((value: any) => string) | null = null;

  @property({ type: String })
  align: "left" | "center" | "right" = "left";

  @property({ type: String })
  variant: "default" | "positive" | "negative" = "default";

  handleClick = (e: MouseEvent): void => {
    this.dispatchEvent(
      new CustomEvent("footer-cell-click", {
        detail: {
          columnKey: this.columnKey,
          aggregateFunc: this.aggregateFunc,
          value: this.value,
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  handleDblClick = (e: MouseEvent): void => {
    this.dispatchEvent(
      new CustomEvent("footer-cell-dblclick", {
        detail: {
          columnKey: this.columnKey,
          aggregateFunc: this.aggregateFunc,
          value: this.value,
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  render(): TemplateResult {
    return GridFooterCellTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'grid-footer-cell': GridFooterCell;
  }
}