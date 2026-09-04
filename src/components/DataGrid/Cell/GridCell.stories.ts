import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { fn } from "storybook/test";
import type { GridCellHost } from "./GridCell";
import "./GridCell.wc";
import "../Editor/GridEditor.wc";

type Args = Required<GridCellHost> & {
  slotContent?: string;
  onCellEditStart: (e: CustomEvent) => void;
  onCellCommit: (e: CustomEvent) => void;
  onCellCancel: (e: CustomEvent) => void;
  onCellCopy: (e: CustomEvent) => void;
  onCellPaste: (e: CustomEvent) => void;
};

const meta: Meta<Args> = {
  title: "DataGrid/GridCell",
  tags: ["autodocs"],
  argTypes: {
    columnKey: { control: "text" },
    rowIndex: { control: "number" },
    rawValue: { control: "object" },
    displayValue: { control: "text" },
    dataType: {
      control: "select",
      options: ["text", "select", "number", "date"],
    },
    editable: { control: "boolean" },
    isDirty: { control: "boolean" },
    isSelected: { control: "boolean" },
    isEditing: { control: "boolean" },
    align: {
      control: "radio",
      options: ["left", "center", "right"],
    },
    width: { control: "text" },
    slotContent: { control: "text" },
    options: {control: "object", description: "label: value"},
    valiedateRules: [],
  },
  args: {
    columnKey: "userName",
    rowIndex: 0,
    rawValue: "John Doe",
    displayValue: "John Doe",
    dataType: "text",
    editable: true,
    isDirty: false,
    isSelected: false,
    isEditing: false,
    align: "left",
    width: "200px",
    slotContent: "",
    handleDblClick: () => {},
    handleKeyDown: () => {},
    handleCellCommit: () => {},
    handleCellCancel: () => {},
    onCellEditStart: fn(),
    onCellCommit: fn(),
    onCellCancel: fn(),
    onCellCopy: fn(),
    onCellPaste: fn(),
  },
  render: (args) => html`
    <grid-cell
      .columnKey="${args.columnKey}"
      .rowIndex="${args.rowIndex}"
      .rawValue="${args.rawValue}"
      .displayValue="${args.displayValue}"
      .dataType="${args.dataType}"
      .editable="${args.editable}"
      .isDirty="${args.isDirty}"
      .isSelected="${args.isSelected}"
      .align="${args.align}"
      .width="${args.width}"
      .options="${args.options}"
      .validationRules="${args.valiedateRules}"
      @cell-edit-start="${args.onCellEditStart}"
      @cell-commit="${args.onCellCommit}"
      @cell-cancel="${args.onCellCancel}"
      @cell-copy="${args.onCellCopy}"
      @cell-paste="${args.onCellPaste}"
    >
      ${args.slotContent ? html`<span>${args.slotContent}</span>` : ""}
    </grid-cell>
  `,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    displayValue: "기본 데이터",
    rawValue: "기본 데이터",
  },
};

export const HoverAndTooltipState: Story = {
  args: {
    displayValue: "마우스 오버 시 원본 값 표시 (dataset.raw)",
    rawValue: "RAW_VALUE_ORIGINAL_DATA_12345",
  },
};

export const DirtyState: Story = {
  args: {
    displayValue: "수정된 데이터",
    rawValue: "수정된 데이터",
    isDirty: true,
  },
};

export const SelectedState: Story = {
  args: {
    displayValue: "선택된 데이터",
    rawValue: "선택된 데이터",
    isSelected: true,
  },
};

export const EditingState: Story = {
  args: {
    displayValue: "편집 모드 데이터",
    rawValue: "편집 모드 데이터",
    editable: true,
    isEditing: true,
  },
};

export const SelectEditingState: Story = {
  args: {
    columnKey: "role",
    dataType: "select",
    displayValue: "관리자",
    rawValue: "admin",
    editable: true,
    isEditing: true,
    options: [{label: '관리자', value: 'admin'}, {label: '사용자', value: 'user'}],
  },
};

export const DateEditingState: Story = {
  args: {
    columnKey: "createdAt",
    dataType: "date",
    displayValue: "2026-09-03",
    rawValue: "2026-09-03",
    editable: true,
    isEditing: true,
  },
};

export const OnCellEditStart: Story = {
  args: {
    displayValue: "더블클릭 시 cell-edit-start 이벤트 발생",
    rawValue: "더블클릭 데이터",
    editable: true,
  },
};

export const OnCellCommitAndCancel: Story = {
  args: {
    displayValue: "편집 후 commit / cancel 이벤트 확인",
    rawValue: "편집 테스트 데이터",
    editable: true,
    isEditing: true,
  },
};

export const OnCellCopyAndPaste: Story = {
  args: {
    displayValue: "Ctrl+C / Ctrl+V 이벤트 테스트",
    rawValue: "복사 및 붙여넣기 데이터",
    isSelected: true,
  },
};