import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import './TransferList.wc';
import type { ListItem, TransferListHost } from './TransferList';

type TransferListArgs = Required<TransferListHost> & {
  'source-header-slot'?: string;
  'target-header-slot'?: string;
  'item-slot'?: string;
  'action-controls-slot'?: string;
  'empty-source-slot'?: string;
  'empty-target-slot'?: string;
  'footer-slot'?: string;
};

const sampleSourceData: ListItem[] = [
  { key: '1', label: 'Item 1: React' },
  { key: '2', label: 'Item 2: Vue' },
  { key: '3', label: 'Item 3: Angular' },
  { key: '4', label: 'Item 4: Svelte' },
  { key: '5', label: 'Item 5: Lit', disabled: true },
];

const sampleTargetData: ListItem[] = [
  { key: '6', label: 'Item 6: TypeScript' },
  { key: '7', label: 'Item 7: JavaScript' },
];

const meta: Meta<TransferListArgs> = {
  title: 'Components/Forms/TransferList',
  component: 'biz-transfer-list',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    disabled: { control: 'boolean' },
    showSearch: { control: 'boolean' },
    showSelectAll: { control: 'boolean' },
    showReorder: { control: 'boolean' },
    oneWay: { control: 'boolean' },
  },
  args: {
    sourceData: sampleSourceData,
    targetData: sampleTargetData,
    value: ['6', '7'],
    sourceTitle: 'Available Skills',
    targetTitle: 'Selected Skills',
    showSearch: true,
    showSelectAll: true,
    showReorder: false,
    disabled: false,
    oneWay: false,
    size: 'medium',
    variant: 'horizontal',
    sourceSelectedKeys: [],
    targetSelectedKeys: [],
    sourceSearchQuery: '',
    targetSearchQuery: '',
    handleSourceSelectAll: fn(),
    handleTargetSelectAll: fn(),
    handleSourceItemSelect: fn(),
    handleTargetItemSelect: fn(),
    handleSourceSearch: fn(),
    handleTargetSearch: fn(),
    handleMoveRight: fn(),
    handleMoveAllRight: fn(),
    handleMoveLeft: fn(),
    handleMoveAllLeft: fn(),
    handleMoveUp: fn(),
    handleMoveDown: fn(),
    handleItemKeyDown: fn(),
  },
  render: (args: TransferListArgs) => html`
    <biz-transfer-list
      .sourceData=${args.sourceData}
      .targetData=${args.targetData}
      .value=${args.value}
      .sourceTitle=${args.sourceTitle}
      .targetTitle=${args.targetTitle}
      ?show-search=${args.showSearch}
      ?show-select-all=${args.showSelectAll}
      ?show-reorder=${args.showReorder}
      ?disabled=${args.disabled}
      ?one-way=${args.oneWay}
      .size=${args.size}
      .variant=${args.variant}
      @change=${args.handleMoveRight}
      @select-change=${args.handleSourceSelectAll}
      @search=${args.handleSourceSearch}
      @reorder=${args.handleMoveUp}
    >
      ${args['source-header-slot'] ? html`<div slot="source-header-slot">${args['source-header-slot']}</div>` : ''}
      ${args['target-header-slot'] ? html`<div slot="target-header-slot">${args['target-header-slot']}</div>` : ''}
      ${args['empty-source-slot'] ? html`<div slot="empty-source-slot">${args['empty-source-slot']}</div>` : ''}
      ${args['empty-target-slot'] ? html`<div slot="empty-target-slot">${args['empty-target-slot']}</div>` : ''}
      ${args['footer-slot'] ? html`<div slot="footer-slot">${args['footer-slot']}</div>` : ''}
    </biz-transfer-list>
  `,
};

export default meta;
type Story = StoryObj<TransferListArgs>;

export const Default: Story = {};

export const VerticalVariant: Story = {
  args: {
    variant: 'vertical',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'small',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'large',
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
  },
};

export const OneWayMode: Story = {
  args: {
    oneWay: true,
  },
};

export const WithReorder: Story = {
  args: {
    showReorder: true,
  },
};

export const EmptySourceState: Story = {
  args: {
    sourceData: [],
    'empty-source-slot': 'No available items to choose from.',
  },
};

export const InteractiveEvents: Story = {
  args: {
    handleSourceSelectAll: fn(),
    handleTargetSelectAll: fn(),
    handleSourceItemSelect: fn(),
    handleTargetItemSelect: fn(),
    handleSourceSearch: fn(),
    handleTargetSearch: fn(),
    handleMoveRight: fn(),
    handleMoveAllRight: fn(),
    handleMoveLeft: fn(),
    handleMoveAllLeft: fn(),
    handleMoveUp: fn(),
    handleMoveDown: fn(),
    handleItemKeyDown: fn(),
  },
};