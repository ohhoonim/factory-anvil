import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { fn } from "storybook/test";
import type { GridRowHost } from "./GridRow";
import "./GridRow.wc";
import "../Cell/GridCell.wc";

type Args = Required<GridRowHost> & {
  cellsSlot?: string;
  defaultSlot?: string;
};

const meta: Meta<Args> = {
  title: "DataGrid/GridRow",
  tags: ["autodocs"],
  argTypes: {
    rowIndex: {
      control: "number",
      description: "가상화 스크롤 상의 절대 행 인덱스",
    },
    rowData: {
      control: "object",
      description: "바인딩된 원본 데이터 객체 (grid-cell 동적 생성에 사용)",
    },
    dataType: {
      control: "object",
      description: "컬럼별 데이터 타입",
    },
    isActive: {
      control: "boolean",
      description: "Pool 활성화 상태 여부",
    },
    isDirty: {
      control: "boolean",
      description: "하위 셀 수정 여부 (Dirty 상태)",
    },
    isSelected: {
      control: "boolean",
      description: "행 선택 상태 여부",
    },
    editable: {
      control: "boolean",
      description: "셀 편집 모드 전환",
    },
    cellsSlot: {
      control: "text",
      description: "cells 슬롯 오버라이드 커스텀 콘텐츠",
    },
    defaultSlot: {
      control: "text",
      description: "기본 슬롯에 삽입될 콘텐츠 (오버레이/익스팬션)",
    },
  },
  args: {
    rowIndex: 0,
    rowData: {
      id: 101,
      name: "홍길동",
      age: 30,
      role: "developer",
      joinDate: "2026-09-01",
    },
    dataType: {
      id: "number",
      name: "text",
      age: "number",
      role: "text",
      joinDate: "date",
    },
    isActive: true,
    isDirty: false,
    isSelected: false,
    editable: false,
    handleRowClick: fn(),
    handleRowDblClick: fn(),
    cellsSlot: undefined,
    defaultSlot: undefined,
  },
  render: (args) => html`
    <grid-row
      .rowIndex="${args.rowIndex}"
      .rowData="${args.rowData}"
      .dataType="${args.dataType}"
      .isActive="${args.isActive}"
      .isDirty="${args.isDirty}"
      .isSelected="${args.isSelected}"
      .editable="${args.editable}"
      @row-click="${args.handleRowClick}"
      @row-dblclick="${args.handleRowDblClick}"
    >
      ${args.cellsSlot
        ? html`<div slot="cells">${args.cellsSlot}</div>`
        : ""}
      ${args.defaultSlot ? html`${args.defaultSlot}` : ""}
    </grid-row>
  `,
};

export default meta;

type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    rowIndex: 0,
    isActive: true,
    isDirty: false,
    isSelected: false,
  },
};

export const Dirty: Story = {
  args: {
    rowIndex: 1,
    isActive: true,
    isDirty: true,
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    rowIndex: 2,
    isActive: true,
    isDirty: false,
    isSelected: true,
  },
};

export const DirtyAndSelected: Story = {
  args: {
    rowIndex: 3,
    isActive: true,
    isDirty: true,
    isSelected: true,
  },
};

export const InactivePoolState: Story = {
  args: {
    rowIndex: 4,
    isActive: false,
    isDirty: false,
    isSelected: false,
  },
};

export const CustomSlotOverride: Story = {
  args: {
    rowIndex: 5,
    isActive: true,
    cellsSlot: "커스텀 cells 슬롯 콘텐츠로 기본 grid-cell 바인딩을 재정의합니다.",
  },
};

export const RowClickEvent: Story = {
  args: {
    rowIndex: 6,
    isActive: true,
    handleRowClick: fn(),
  },
};

export const RowDblClickEvent: Story = {
  args: {
    rowIndex: 7,
    isActive: true,
    handleRowDblClick: fn(),
  },
};