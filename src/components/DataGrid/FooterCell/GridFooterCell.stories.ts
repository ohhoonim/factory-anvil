import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { fn } from "storybook/test";
import type { GridFooterCellHost } from "./GridFooterCell";
import "./GridFooterCell.wc";

type Args = Required<GridFooterCellHost> & {
  defaultSlot?: string;
  onFooterCellClick: ReturnType<typeof fn>;
  onFooterCellDblClick: ReturnType<typeof fn>;
};

const meta: Meta<Args> = {
  title: "DataGrid/GridFooterCell",
  tags: ["autodocs"],
  argTypes: {
    columnKey: { control: "text" },
    aggregateFunc: { control: "text" },
    value: { control: "object" },
    formatter: { control: false },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "positive", "negative"],
    },
    defaultSlot: { control: "text" },
  },
  args: {
    columnKey: "totalAmount",
    aggregateFunc: "sum",
    value: 1250000,
    formatter: (val: any) =>
      typeof val === "number" ? `$${val.toLocaleString()}` : String(val),
    align: "right",
    variant: "default",
    handleClick: () => {},
    handleDblClick: () => {},
    onFooterCellClick: fn(),
    // "footer-cell-click": fn(),
    onFooterCellDblClick: fn(),
    // "footer-cell-dbl-click": fn(),
  },
  render: (args) => html`
    <div style="width: 200px; height: 36px;">
      <grid-footer-cell
        .columnKey=${args.columnKey}
        .aggregateFunc=${args.aggregateFunc}
        .value=${args.value}
        .formatter=${args.formatter}
        .align=${args.align}
        .variant=${args.variant}
        @footer-cell-click=${(e: CustomEvent) => args.onFooterCellClick(e.detail)}
        @footer-cell-dblclick=${(e: CustomEvent) => args.onFooterCellDblClick(e.detail)}
      >
        ${args.defaultSlot ? html`<span>${args.defaultSlot}</span>` : ""}
      </grid-footer-cell>
    </div>
  `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {};

export const PositiveValue: Story = {
  args: {
    variant: "positive",
    value: 45000,
    aggregateFunc: "sum",
    formatter: (val: number) => `+$${val.toLocaleString()}`,
  },
};

export const NegativeValue: Story = {
  args: {
    variant: "negative",
    value: -12500,
    aggregateFunc: "sum",
    formatter: (val: number) => `-$${Math.abs(val).toLocaleString()}`,
  },
};

export const TruncatedEllipsis: Story = {
  render: (args) => html`
    <div style="width: 120px; height: 36px;">
      <grid-footer-cell
        .columnKey=${args.columnKey}
        .aggregateFunc=${args.aggregateFunc}
        .value=${args.value}
        .formatter=${args.formatter}
        .align=${args.align}
        .variant=${args.variant}
      ></grid-footer-cell>
    </div>
  `,
  args: {
    aggregateFunc: "count",
    value: 999999999999,
    formatter: (val: number) => `TOTAL_COUNT_${val}`,
  },
};

export const CustomSlotContent: Story = {
  args: {
    aggregateFunc: "",
    value: null,
    defaultSlot: "🔥 Custom Summary Widget",
    align: "center",
  },
};

export const CellClickEvents: Story = {
  args: {
    columnKey: "clickTestColumn",
    aggregateFunc: "avg",
    value: 88.5,
  },
};