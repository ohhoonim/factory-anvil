import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { fn } from "storybook/test";
import type { GridDataGridHost, ColumnDef } from "./GridDataGrid";

import "./GridDataGrid.wc";
import "../Header/GridHeader.wc";
import "../HeaderCell/GridHeaderCell.wc";
import "../ColumnResizer/GridColumnResizer.wc";
import "../Viewport/GridViewport.wc";
import "../Row/GridRow.wc";
import "../Cell/GridCell.wc";
import "../Editor/GridEditor.wc";
import "../Footer/GridFooter.wc";
import "../FooterCell/GridFooterCell.wc";
import "../Info/GridInfo.wc";
import "../Pagination/GridPagination.wc";

interface SampleRowData {
  id: number;
  name: string;
  age: number;
  role: string;
  joinDate: string;
}

type Args = Required<GridDataGridHost> & {
  headerSlot?: string;
  viewportSlot?: string;
  footerSlot?: string;
  infoSlot?: string;
  paginationSlot?: string;
  defaultSlot?: string;
};

const sampleColumns: ColumnDef[] = [
  { key: "id", label: "ID", width: 80, sortable: true },
  { key: "name", label: "Name", width: 120, sortable: true },
  { key: "age", label: "Age", width: 80, sortable: true },
  { key: "role", label: "Role", width: 140, filterable: true },
  { key: "joinDate", label: "Join Date", width: 140 }
];

const generateSampleRows = (count: number): SampleRowData[] => {
  const roles = ["developer", "designer", "manager", "qa"];
  const names = ["홍길동", "김철수", "이영희", "박민수", "정수진"];

  return Array.from({ length: count }, (_, i) => ({
    id: 101 + i,
    name: names[i % names.length],
    age: 25 + (i % 20),
    role: roles[i % roles.length],
    joinDate: `2026-09-${String((i % 30) + 1).padStart(2, "0")}`
  }));
};

const sampleData = generateSampleRows(100);

const meta: Meta<Args> = {
  title: "DataGrid/GridDataGrid",
  tags: ["autodocs"],
  render: (args) => html`
    <grid-data-grid
      .data=${args.data}
      .columns=${args.columns}
      .rowHeight=${args.rowHeight}
      .pageSize=${args.pageSize}
      .currentPage=${args.currentPage}
      .storageKey=${args.storageKey}
      .variant=${args.variant}
      .size=${args.size}
      .width=${args.width}
      .height=${args.height}
      .shadowTable=${args.shadowTable}
      .colOffsets=${args.colOffsets}
      .vRange=${args.vRange}
      .hRange=${args.hRange}
      .sortState=${args.sortState}
      .filterState=${args.filterState}
      .dirtyMap=${args.dirtyMap}
      .selectionRange=${args.selectionRange}
      @config-save=${args.handleHeaderClick}
      @data-change=${args.handleCellEditStart}
      @footer-cell-click=${args.handleFooterCellClick}
      @page-change=${args.handlePageChange}
    >
      ${args.headerSlot ? html`<div slot="header">${args.headerSlot}</div>` : ""}
      ${args.viewportSlot ? html`<div slot="viewport">${args.viewportSlot}</div>` : ""}
      ${args.footerSlot ? html`<div slot="footer">${args.footerSlot}</div>` : ""}
      ${args.infoSlot ? html`<div slot="info">${args.infoSlot}</div>` : ""}
      ${args.paginationSlot ? html`<div slot="pagination">${args.paginationSlot}</div>` : ""}
      ${args.defaultSlot ? html`<div>${args.defaultSlot}</div>` : ""}
    </grid-data-grid>
  `,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "bordered", "borderless"]
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"]
    }
  },
  args: {
    data: sampleData,
    columns: sampleColumns,
    rowHeight: 40,
    pageSize: 20,
    currentPage: 1,
    storageKey: "grid-demo-key",
    variant: "default",
    size: "md",
    width: "100%",
    height: "500px",
    shadowTable: sampleData,
    colOffsets: [0, 80, 200, 280, 420],
    vRange: { start: 0, end: 12 },
    hRange: { start: 0, end: 5 },
    sortState: { key: "name", direction: "asc" },
    filterState: {},
    dirtyMap: new Map<string, any>([
      ["1-name", "김철수(수정됨)"],
      ["2-role", "lead developer"]
    ]),
    handleScroll: fn(),
    handleHeaderClick: fn(),
    handleColumnResize: fn(),
    handleCellEditStart: fn(),
    handleFooterCellClick: fn(),
    handlePageChange: fn(),
    headerSlot: "",
    viewportSlot: "",
    footerSlot: "",
    infoSlot: "",
    paginationSlot: "",
    defaultSlot: ""
  }
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};