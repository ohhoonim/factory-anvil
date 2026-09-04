import { html, type TemplateResult } from "lit";

export interface GridFooterCellHost {
  columnKey: string;
  aggregateFunc: string;
  value: any;
  formatter: ((value: any) => string) | null;
  align: "left" | "center" | "right";
  variant: "default" | "positive" | "negative";
  handleClick: (e: MouseEvent) => void;
  handleDblClick: (e: MouseEvent) => void;
}

export const GridFooterCellTemplate = (host: GridFooterCellHost): TemplateResult => {
  let displayValue = "";

  if (host.formatter && typeof host.formatter === "function") {
    displayValue = host.formatter(host.value);
  } else if (host.value !== null && host.value !== undefined) {
    displayValue = String(host.value);
  }

  const labelText = host.aggregateFunc ? host.aggregateFunc.toUpperCase() : "";
  const fullText = labelText ? `[${labelText}] ${displayValue}` : displayValue;

  const variantClass = host.variant ? `variant-${host.variant}` : "variant-default";
  const alignClass = host.align ? `align-${host.align}` : "align-left";

  return html`
    <div
      class="grid-footer-cell ${variantClass} ${alignClass}"
      title="${fullText}"
      @click=${host.handleClick}
      @dblclick=${host.handleDblClick}
    >
      ${labelText
        ? html`<span class="grid-footer-cell__label">${labelText}</span>`
        : ""}
      <span class="grid-footer-cell__value">${displayValue}</span>
      <slot></slot>
    </div>
  `;
};