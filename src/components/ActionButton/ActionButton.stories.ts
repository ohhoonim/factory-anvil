import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { fn } from 'storybook/test';
import type { ActionButtonHost, ActionButtonItem } from './ActionButton.js';
import './ActionButton.wc.js';

type ActionButtonArgs = Required<ActionButtonHost> & {
  'start-slot'?: string;
  'end-slot'?: string;
  'menu-slot'?: string;
  'helper-text-slot'?: string;
};

const defaultItems: ActionButtonItem[] = [
  { id: '1', label: '수정', icon: '✏️' },
  { id: '2', label: '복사', icon: '📋' },
  { id: '3', label: '비활성화 옵션', disabled: true },
  { id: '4', label: '삭제', icon: '🗑️', danger: true },
];

const meta: Meta<ActionButtonArgs> = {
  title: 'Components/Forms/ActionButton',
  component: 'biz-action-button',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outlined', 'text', 'split'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    split: { control: 'boolean' },
    open: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    placement: {
      control: { type: 'select' },
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
    },
    'start-slot': { control: 'text' },
    'end-slot': { control: 'text' },
    'menu-slot': { control: 'text' },
    'helper-text-slot': { control: 'text' },
  },
  args: {
    label: '실행',
    variant: 'solid',
    size: 'medium',
    items: defaultItems,
    split: false,
    open: false,
    disabled: false,
    loading: false,
    fullWidth: false,
    placement: 'bottom-start',
    handleMainClick: fn(),
    handleTriggerClick: fn(),
    handleItemClick: fn(),
    handleKeyDown: fn(),
  },
  render: (args) => html`
    <biz-action-button
      .label=${args.label}
      .variant=${args.variant}
      .size=${args.size}
      .items=${args.items}
      ?split=${args.split}
      ?open=${args.open}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      ?full-width=${args.fullWidth}
      .placement=${args.placement}
      @action-click=${args.handleMainClick}
      @dropdown-toggle=${args.handleTriggerClick}
      @item-select=${args.handleItemClick}
    >
      ${args['start-slot'] ? html`<span slot="start-slot">${args['start-slot']}</span>` : ''}
      ${args['end-slot'] ? html`<span slot="end-slot">${args['end-slot']}</span>` : ''}
      ${args['menu-slot'] ? html`<div slot="menu-slot">${args['menu-slot']}</div>` : ''}
      ${args['helper-text-slot']
        ? html`<span slot="helper-text-slot">${args['helper-text-slot']}</span>`
        : ''}
    </biz-action-button>
  `,
};

export default meta;
type Story = StoryObj<ActionButtonArgs>;

export const Default: Story = {
  args: {
    label: '기본 액션',
  },
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <biz-action-button label="Solid" variant="solid"></biz-action-button>
      <biz-action-button label="Outlined" variant="outlined"></biz-action-button>
      <biz-action-button label="Text" variant="text"></biz-action-button>
      <biz-action-button
        label="Split"
        variant="split"
        .items=${defaultItems}
      ></biz-action-button>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <biz-action-button label="Small" size="small"></biz-action-button>
      <biz-action-button label="Medium" size="medium"></biz-action-button>
      <biz-action-button label="Large" size="large"></biz-action-button>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div style="display: flex; gap: 12px;">
        <biz-action-button label="Disabled" disabled></biz-action-button>
        <biz-action-button label="Loading" loading></biz-action-button>
        <biz-action-button
          label="Open Dropdown"
          open
          .items=${defaultItems}
        ></biz-action-button>
      </div>
    </div>
  `,
};

export const SplitDropdown: Story = {
  args: {
    label: '신규 등록',
    variant: 'split',
    split: true,
    items: defaultItems,
  },
};

export const InteractiveEvents: Story = {
  args: {
    label: '이벤트 테스트',
    variant: 'split',
    split: true,
    items: defaultItems,
    handleMainClick: fn(),
    handleTriggerClick: fn(),
    handleItemClick: fn(),
  },
};