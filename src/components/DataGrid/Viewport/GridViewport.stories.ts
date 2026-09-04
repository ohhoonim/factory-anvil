import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { fn } from "storybook/test";
import "./GridViewport.wc";
import "../Row/GridRow.wc";
import "../Editor/GridEditor.wc";
import "../Cell/GridCell.wc"
import type { GridViewportHost } from "./GridViewport";
import type { EditorDataType } from "../Editor/GridEditor";

interface SampleRowData {
  id: number;
  name: string;
  age: number;
  role: string;
  joinDate: string;
}

type Args = Required<GridViewportHost> & {
  rowCount: number;
  editable: boolean;
  onGridScroll: (e: CustomEvent) => void;
  onSelectionStart: (e: CustomEvent) => void;
  onSelectionChange: (e: CustomEvent) => void;
  onSelectionEnd: (e: CustomEvent) => void;
  onRowClick: (e: CustomEvent) => void;
  onRowDblClick: (e: CustomEvent) => void;
};

const sampleDataType: Record<string, EditorDataType> = {
  id: "number",
  name: "text",
  age: "number",
  role: "text",
  joinDate: "date",
};

const generateSampleRows = (count: number): SampleRowData[] => {
  const roles = ["developer", "designer", "manager", "qa"];
  const names = ["홍길동", "김철수", "이영희", "박민수", "정수진"];

  return Array.from({ length: count }, (_, i) => ({
    id: 101 + i,
    name: names[i % names.length],
    age: 25 + (i % 20),
    role: roles[i % roles.length],
    joinDate: `2026-09-${String((i % 30) + 1).padStart(2, "0")}`,
  }));
};

const meta: Meta<Args> = {
  title: "DataGrid/GridViewport",
  tags: ["autodocs"],
  argTypes: {
    phantomWidth: {
      control: "number",
      description: "Phantom 레이어에 적용할 전체 수평 너비(px)",
    },
    phantomHeight: {
      control: "number",
      description: "Phantom 레이어에 적용할 전체 수직 높이(px)",
    },
    rowHeight: {
      control: "number",
      description: "개별 행의 기본 높이(px)",
    },
    striped: {
      control: "boolean",
      description: "지브라 패턴 배경 적용 여부",
    },
    rowCount: {
      control: "number",
      description: "바인딩할 그리드 행 데이터 수",
    },
    editable: {
      control: "boolean",
      description: "하위 셀 편집 모드 활성화 여부",
    },
    scrollTop: {
      control: "number",
      description: "현재 Y축 스크롤 위치",
    },
    scrollLeft: {
      control: "number",
      description: "현재 X축 스크롤 위치",
    },
    isDragging: {
      control: "boolean",
      description: "범위 선택 드래그 진행 여부",
    },
  },
  args: {
    phantomWidth: 800,
    phantomHeight: 400,
    rowHeight: 40,
    striped: false,
    rowCount: 20,
    editable: false,
    scrollTop: 0,
    scrollLeft: 0,
    selectionRange: null,
    isDragging: false,
    handleScroll: () => {},
    handleMouseDown: () => {},
    handleMouseMove: () => {},
    handleMouseUp: () => {},
    onGridScroll: fn(),
    onSelectionStart: fn(),
    onSelectionChange: fn(),
    onSelectionEnd: fn(),
    onRowClick: fn(),
    onRowDblClick: fn(),
  },
  render: (args) => {
    const rows = generateSampleRows(args.rowCount);
    const calculatedPhantomHeight = args.rowCount * args.rowHeight;

    return html`
      <div style="width: 700px; height: 320px; border: 1px solid #d0d7de; position: relative; border-radius: 6px; overflow: hidden;">
        <grid-viewport
          .phantomWidth="${args.phantomWidth}"
          .phantomHeight="${calculatedPhantomHeight || args.phantomHeight}"
          .rowHeight="${args.rowHeight}"
          ?striped="${args.striped}"
          .scrollTop="${args.scrollTop}"
          .scrollLeft="${args.scrollLeft}"
          .selectionRange="${args.selectionRange}"
          .isDragging="${args.isDragging}"
          @grid-scroll="${args.onGridScroll}"
          @selection-start="${args.onSelectionStart}"
          @selection-change="${args.onSelectionChange}"
          @selection-end="${args.onSelectionEnd}"
        >
          ${rows.map(
            (rowData, index) => html`
              <grid-row
                .rowIndex="${index}"
                .rowData="${rowData}"
                .dataType="${sampleDataType}"
                .isActive="${true}"
                .isDirty="${index === 1}"
                .isSelected="${index === 2}"
                .editable="${args.editable}"
                @row-click="${args.onRowClick}"
                @row-dblclick="${args.onRowDblClick}"
              ></grid-row>
            `
          )}
        </grid-viewport>
      </div>
    `;
  },
};

export default meta;

type Story = StoryObj<Args>;

export const DefaultWithGridRow: Story = {
  args: {
    rowCount: 20,
  },
};

export const ZebraStripedWithGridRow: Story = {
  args: {
    striped: true,
    rowCount: 20,
  },
};

export const SelectionActiveWithGridRow: Story = {
  args: {
    rowCount: 20,
    isDragging: false,
    selectionRange: {
      top: 40,
      left: 0,
      width: 680,
      height: 80,
    },
  },
};

export const EditableGridRows: Story = {
  args: {
    rowCount: 10,
    editable: true,
  },
};

export const LargeDataSetVirtualized: Story = {
  args: {
    rowCount: 1000,
  },
};