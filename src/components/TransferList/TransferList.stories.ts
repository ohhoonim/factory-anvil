import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './TransferList.wc.js';
import type { BizTransferList } from './TransferList.wc.js';

const mockSourceData = [
  { key: '1', label: 'Item 1' },
  { key: '2', label: 'Item 2' },
  { key: '3', label: 'Item 3', disabled: true },
  { key: '4', label: 'Item 4' },
  { key: '5', label: 'Item 5' }
];

const mockTargetData = [
  { key: '6', label: 'Item 6' },
  { key: '7', label: 'Item 7' }
];

const meta: Meta<BizTransferList> = {
  title: 'Components/Forms/TransferList',
  component: 'biz-transfer-list',
  tags: ['autodocs'],
  argTypes: {
    sourceTitle: { control: 'text' },
    targetTitle: { control: 'text' },
    showSearch: { control: 'boolean' },
    showSelectAll: { control: 'boolean' },
    showReorder: { control: 'boolean' },
    disabled: { control: 'boolean' },
    oneWay: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    }
  },
  args: {
    sourceData: mockSourceData,
    targetData: mockTargetData,
    sourceTitle: 'Source List',
    targetTitle: 'Target List',
    showSearch: true,
    showSelectAll: true,
    showReorder: false,
    disabled: false,
    oneWay: false,
    variant: 'horizontal',
    size: 'medium'
  }
};

export default meta;
type Story = StoryObj<BizTransferList>;

export const Default: Story = {
  render: (args) => html`
    <biz-transfer-list
      .sourceData=${args.sourceData}
      .targetData=${args.targetData}
      .sourceTitle=${args.sourceTitle}
      .targetTitle=${args.targetTitle}
      ?show-search=${args.showSearch}
      ?show-select-all=${args.showSelectAll}
      ?show-reorder=${args.showReorder}
      ?disabled=${args.disabled}
      ?one-way=${args.oneWay}
      .variant=${args.variant}
      .size=${args.size}
    ></biz-transfer-list>
  `
};

export const SmallSize: Story = {
  args: {
    size: 'small'
  },
  render: Default.render
};

export const LargeSize: Story = {
  args: {
    size: 'large'
  },
  render: Default.render
};

export const VerticalVariant: Story = {
  args: {
    variant: 'vertical'
  },
  render: Default.render
};

export const OneWayMode: Story = {
  args: {
    oneWay: true
  },
  render: Default.render
};

export const WithReorder: Story = {
  args: {
    showReorder: true
  },
  render: Default.render
};

export const DisabledState: Story = {
  args: {
    disabled: true
  },
  render: Default.render
};

export const CustomSlots: Story = {
  render: () => html`
    <biz-transfer-list
      .sourceData=${mockSourceData}
      .targetData=${mockTargetData}
      show-search
    >
      <div slot="source-header-slot" style="padding: 8px; font-weight: bold; color: #2563eb;">
        Custom Source Header
      </div>
      <div slot="target-header-slot" style="padding: 8px; font-weight: bold; color: #059669;">
        Custom Target Header
      </div>
      <div slot="empty-source-slot" style="color: #dc2626;">
        No items in source!
      </div>
    </biz-transfer-list>
  `
};
