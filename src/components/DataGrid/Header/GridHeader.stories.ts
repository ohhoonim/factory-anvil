import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { fn } from 'storybook/test';
import type { ColumnDef, GridHeaderHost } from './GridHeader';
import './GridHeader.wc';
import '../HeaderCell/GridHeaderCell.wc';
import '../ColumnResizer/GridColumnResizer.wc';


type Args = Required<GridHeaderHost> & {
  defaultSlot?: string;
  onHandleDrop: ReturnType<typeof fn>;
};

const mockColumns: ColumnDef[] = [
  { key: 'id', label: 'ID', width: '80px', sortable: true, sortDirection: 'ASC', align: 'center' },
  { key: 'name', label: 'Name', width: '150px', sortable: true, filterable: true, reorderable: true },
  { key: 'role', label: 'Role', width: '120px', filterable: true, isFiltered: true, reorderable: true },
  { key: 'department', label: 'Department', width: '180px', sortable: true, reorderable: true },
  { key: 'status', label: 'Status', width: '100px', align: 'center' }
];

const meta: Meta<Args> = {
  title: 'DataGrid/GridHeader',
  tags: ['autodocs'],
  argTypes: {
    columns: {
      table: { type: {summary: `
       interface ColumnDef {
        key: string;
        label: string;
        width?: string | number;
        sortable?: boolean;
        sortDirection?: 'ASC' | 'DESC' | null;
        filterable?: boolean;
        isFiltered?: boolean;
        reorderable?: boolean;
        align?: 'left' | 'center' | 'right';
      } 
        `}}
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'sticky']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    totalWidth: { control: { type: 'number' } },
    scrollLeft: { control: { type: 'number' } },
    dragColumnKey: { control: { type: 'text' } },
    targetColumnKey: { control: { type: 'text' } }
  },
  args: {
    columns: mockColumns,
    colOffsets: [0, 80, 230, 350, 530],
    totalWidth: 630,
    scrollLeft: 0,
    variant: 'default',
    size: 'md',
    dragColumnKey: null,
    targetColumnKey: null,
    defaultSlot: '',
    handleHeaderCellClick: fn(),
    handleFilterClick: fn(),
    handleDragStart: fn(),
    handleDragOver: fn(),
    handleDrop: fn(),
    handleResize: fn(),
  },
  render: (args) => html`
    <grid-header
      .columns="${args.columns}"
      .colOffsets="${args.colOffsets}"
      .totalWidth="${args.totalWidth}"
      .scrollLeft="${args.scrollLeft}"
      .variant="${args.variant}"
      .size="${args.size}"
      .dragColumnKey="${args.dragColumnKey}"
      .targetColumnKey="${args.targetColumnKey}"
      @header-cell-click="${args.handleHeaderCellClick}"
      @filter-open="${args.handleFilterClick}"
    >
      ${args.defaultSlot ? html`<span>${args.defaultSlot}</span>` : ''}
    </grid-header>
  `
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Sticky: Story = {
  args: {
    variant: 'sticky'
  }
};

export const SmallSize: Story = {
  args: {
    size: 'sm'
  }
};

export const LargeSize: Story = {
  args: {
    size: 'lg'
  }
};

export const DragAndDropReorderState: Story = {
  args: {
    dragColumnKey: 'role',
    targetColumnKey: 'name'
  }
};

export const ScrolledHorizontal: Story = {
  args: {
    scrollLeft: 100
  }
};

export const HeaderCellClickEvent: Story = {
  args: {
    handleHeaderCellClick: fn()
  }
};

export const FilterOpenEvent: Story = {
  args: {
    handleFilterClick: fn()
  }
};

export const ColumnReorderEvent: Story = {
  args: {
    handleDrop: fn((e: CustomEvent) => e.detail) 
  }
};