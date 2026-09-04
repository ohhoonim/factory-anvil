import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { fn } from 'storybook/test';
import './GridHeaderCell.wc';
import '../ColumnResizer/GridColumnResizer.wc';
import type { GridHeaderCellHost } from './GridHeaderCell.js';

type Args = Required<GridHeaderCellHost> & {
  titleSlot?: string;
  filterIconSlot?: string;
  filterSlot?: string;
  defaultSlot?: string;
};

const meta: Meta<Args> = {
  title: 'DataGrid/GridHeaderCell',
  tags: ['autodocs'],
  argTypes: {
    columnKey: { control: 'text' },
    label: { control: 'text' },
    sortable: { control: 'boolean' },
    sortDirection: {
      control: 'select',
      options: ['ASC', 'DESC', null],
    },
    filterable: { control: 'boolean', description: '필터 기능 제공 여부 ' },
    isFiltered: { control: 'boolean' },
    reorderable: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    width: { control: 'text' },
    isDragging: { control: 'boolean' },
    titleSlot: { name: 'title', 
      description: "컬럼명이 들어갈 자리이다. 기본적으로 label 을 사용한다.", 
      table: { category: 'slots', type: {summary: 'string | HTMLElement'}},
      control: 'text' },
    filterIconSlot: { 
      name: "filter-icon",
      description: "filter 아이콘 표시를 위한 내부용 슬롯이다. 기본 아이콘을 제공한다.", 
      table: { category: 'slots', type: {summary: 'string | HTMLElement'}},
      control: 'text' },
    filterSlot: {
      name: "filter",
      constrol: 'text',
      table: { category: 'slots', type: {summary: 'string | HTMLElement'}},
      description: "필터 팝업/드롭다운 등의 외부 필터 UI 주입용"
    },
    defaultSlot: {},
    
  },
  args: {
    columnKey: 'user_name',
    label: 'User Name',
    sortable: true,
    sortDirection: null,
    filterable: true,
    isFiltered: false,
    reorderable: true,
    size: 'md',
    align: 'left',
    width: '200px',
    isDragging: false,
    handleCellClick: fn(),
    handleFilterClick: fn(),
    handleDragStart: fn(),
    handleDragOver: fn(),
  },
  render: (args) => html`
    <grid-header-cell
      .columnKey="${args.columnKey}"
      .label="${args.label}"
      .sortable="${args.sortable}"
      .sortDirection="${args.sortDirection}"
      .filterable="${args.filterable}"
      .isFiltered="${args.isFiltered}"
      .reorderable="${args.reorderable}"
      .size="${args.size}"
      .align="${args.align}"
      .width="${args.width}"
      .isDragging="${args.isDragging}"
      @header-cell-click="${args.handleCellClick}"
      @filter-trigger-click="${args.handleFilterClick}"
      @column-drag-start="${args.handleDragStart}"
      @column-drag-over="${args.handleDragOver}"
    >
      ${args.titleSlot ? html`<span slot="title">${args.titleSlot}</span>` : ''}
      ${args.filterIconSlot ? html`<span slot="filter-icon">${args.filterIconSlot}</span>` : ''}
    </grid-header-cell>
  `,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    label: 'Default Header',
  },
};

export const SortAscending: Story = {
  args: {
    label: 'Sorted Ascending',
    sortDirection: 'ASC',
  },
};

export const SortDescending: Story = {
  args: {
    label: 'Sorted Descending',
    sortDirection: 'DESC',
  },
};

export const FilteredActive: Story = {
  args: {
    label: 'Filtered Column',
    isFiltered: true,
  },
};

export const DraggingState: Story = {
  args: {
    label: 'Dragging Column',
    isDragging: true,
  },
};

export const CustomSlots: Story = {
  args: {
    titleSlot: 'Custom Title Slot',
    filterIconSlot: '🔍',
    isFiltered: true,
  },
};

export const HeaderCellClickEvent: Story = {
  args: {
    label: 'Click to Sort',
    sortable: true,
    sortDirection: null,
  },
};

export const FilterTriggerClickEvent: Story = {
  args: {
    label: 'Click Filter Trigger',
    filterable: true,
  },
};

export const ColumnDragStartEvent: Story = {
  args: {
    label: 'Drag Me',
    reorderable: true,
  },
};

export const ColumnDragOverEvent: Story = {
  args: {
    label: 'Drag Target',
    reorderable: true,
  },
};