import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import type { GridInfoHost } from './GridInfo.js';
import './GridInfo.wc.js';

type GridInfoArgs = Required<GridInfoHost> & {
  prefix?: string;
  suffix?: string;
  'info-click': ReturnType<typeof fn>;
};

const meta: Meta<GridInfoArgs> = {
  title: 'DataGrid/GridInfo',
  component: 'grid-info',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact'],
      description: '컴포넌트 변형 형태',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: '컴포넌트 크기 규격',
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom'],
      description: '그리드 내 위치',
    },
    totalCount: { control: 'number', description: '전체 행 수' },
    filteredCount: { control: 'number', description: '필터링 적용 후 행 수' },
    selectedRowCount: { control: 'number', description: '선택된 행 수' },
    selectedCellCount: { control: 'number', description: '선택된 셀 수' },
    dirtyRowCount: { control: 'number', description: '수정된 행 수' },
    dirtyCellCount: { control: 'number', description: '수정된 셀 수' },
    renderedRange: { control: 'object', description: '가상 스크롤 렌더링 범위' },
    sortState: { control: 'object', description: '정렬 정보' },
    prefix: { control: 'text', description: 'Prefix 슬롯 콘텐츠',
      table: {category: 'slots'}
     },
    suffix: { control: 'text', description: 'Suffix 슬롯 콘텐츠',
      table: {category: 'slots'}
     },
    'info-click': { 
      description: "정보창을 클릭했을때, type: 'count' | 'sort' | 'selection' | 'dirty'",
      table: { category: 'events'}
    }
  },
  args: {
    totalCount: 1000,
    filteredCount: 0,
    renderedRange: { start: 1, end: 50 },
    selectedRowCount: 0,
    selectedCellCount: 0,
    dirtyRowCount: 0,
    dirtyCellCount: 0,
    sortState: [],
    variant: 'default',
    size: 'md',
    position: 'bottom',
    prefix: '',
    suffix: '',
    'info-click': fn(),
  },
  render: (args) => html`
    <grid-info
      .totalCount=${args.totalCount}
      .filteredCount=${args.filteredCount}
      .renderedRange=${args.renderedRange}
      .selectedRowCount=${args.selectedRowCount}
      .selectedCellCount=${args.selectedCellCount}
      .dirtyRowCount=${args.dirtyRowCount}
      .dirtyCellCount=${args.dirtyCellCount}
      .sortState=${args.sortState}
      .variant=${args.variant}
      .size=${args.size}
      .position=${args.position}
      @info-click=${(e: CustomEvent) => args['info-click'](e.detail)}
    >
      ${args.prefix ? html`<span slot="prefix">${args.prefix}</span>` : ''}
      ${args.suffix ? html`<span slot="suffix">${args.suffix}</span>` : ''}
    </grid-info>
  `,
};

export default meta;
type Story = StoryObj<GridInfoArgs>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    variant: 'compact',
    size: 'sm',
  },
};

export const WithFiltering: Story = {
  args: {
    totalCount: 10000,
    filteredCount: 250,
    renderedRange: { start: 1, end: 30 },
  },
};

export const WithSelection: Story = {
  args: {
    selectedRowCount: 5,
    selectedCellCount: 20,
  },
};

export const WithDirtyState: Story = {
  args: {
    dirtyRowCount: 3,
    dirtyCellCount: 8,
  },
};

export const WithSortState: Story = {
  args: {
    sortState: [
      { columnKey: 'name', direction: 'asc' },
      { columnKey: 'age', direction: 'desc' },
    ],
  },
};

export const FullFeatured: Story = {
  args: {
    totalCount: 50000,
    filteredCount: 1200,
    renderedRange: { start: 101, end: 150 },
    selectedRowCount: 10,
    selectedCellCount: 30,
    dirtyRowCount: 2,
    dirtyCellCount: 5,
    sortState: [{ columnKey: 'createdAt', direction: 'desc' }],
    prefix: '📊 STATUS:',
    suffix: '⏱️ Last updated: 10:00 AM',
  },
};