import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { fn } from "storybook/test";
import type { GridFooterHost, ColumnDef } from "./GridFooter";
import "./GridFooter.wc";
import "../FooterCell/GridFooterCell.wc";

type Args = Required<GridFooterHost> & {
  "summary-extra": string;
  onSummaryBarClick: ReturnType<typeof fn>
  onFooterCellClick: ReturnType<typeof fn>
};

const sampleColumns: ColumnDef[] = [
  { key: "id", width: 80, aggregateFunc: "COUNT", align: "center" },
  { key: "name", width: 150, aggregateFunc: "LABEL", align: "left" },
  { key: "category", width: 120, aggregateFunc: "", align: "left" },
  { key: "price", width: 120, aggregateFunc: "SUM", align: "right", variant: "positive" },
  { key: "quantity", width: 100, aggregateFunc: "SUM", align: "right" },
  { key: "discount", width: 100, aggregateFunc: "AVG", align: "right", variant: "negative" },
  { key: "total", width: 140, aggregateFunc: "SUM", align: "right", variant: "positive" },
];

const sampleSummaryData = {
  id: "Total: 100",
  name: "합계 및 평균",
  category: "",
  price: "₩ 15,400,000",
  quantity: "1,250 개",
  discount: "12.5 %",
  total: "₩ 13,475,000",
};

const meta: Meta<Args> = {
  title: "DataGrid/GridFooter",
  component: "grid-footer",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "compact"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    totalCount: { control: { type: "number" } },
    filteredCount: { control: { type: "number" } },
    selectedCount: { control: { type: "number" } },
    totalWidth: { control: { type: "number" } },
    scrollLeft: { control: { type: "number" } },
  },
  args: {
    variant: "default",
    size: "md",
    columns: sampleColumns,
    summaryData: sampleSummaryData,
    totalCount: 100,
    filteredCount: 85,
    selectedCount: 5,
    totalWidth: 810,
    scrollLeft: 0,
    "summary-extra": "",
    handleSummaryBarClick: fn(),
    onSummaryBarClick: fn(),
    onFooterCellClick: fn(),
  },
  render: (args) => html`
    <grid-footer
      .variant=${args.variant}
      .size=${args.size}
      .columns=${args.columns}
      .summaryData=${args.summaryData}
      .totalCount=${args.totalCount}
      .filteredCount=${args.filteredCount}
      .selectedCount=${args.selectedCount}
      .totalWidth=${args.totalWidth}
      .scrollLeft=${args.scrollLeft}
      @summary-bar-click=${(e: CustomEvent) => {
        args.handleSummaryBarClick(e.detail);
        args.onSummaryBarClick(e.detail);
      }}
      @footer-cell-click=${(e: CustomEvent) => {
        args.onFooterCellClick(e.detail);
      }}
    >
      ${args["summary-extra"]
        ? html`<div slot="summary-extra">${args["summary-extra"]}</div>`
        : ""}
    </grid-footer>
  `,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    variant: "compact",
  },
};

export const SmallSize: Story = {
  args: {
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
  },
};

export const ScrolledState: Story = {
  args: {
    scrollLeft: 150,
  },
};

export const WithSummaryBarSlot: Story = {
  args: {
    "summary-extra": "최종 업데이트: 2026-09-04 09:47",
  },
};

export const SummaryBarClickEvent: Story = {
  args: {
    onSummaryBarClick: fn(),
  },
};

export const FooterCellClickEvent: Story = {
  args: {
    onFooterCellClick: fn(),
  },
};