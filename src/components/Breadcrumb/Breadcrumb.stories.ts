import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { fn } from 'storybook/test';
import type { BreadcrumbHost, BreadcrumbItem } from './Breadcrumb';
import './Breadcrumb.wc';

type Args = Required<BreadcrumbHost> & {
  startSlot?: string;
  separatorSlot?: string;
  endSlot?: string;
  dropdownSlot?: string;
  onBreadcrumbClick: (e: CustomEvent) => void;
  onOverflowClick: (e: CustomEvent) => void;
};

const sampleItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Category', href: '/products/category' },
  { label: 'Subcategory', href: '/products/category/sub' },
  { label: 'Current Page', href: '/products/category/sub/current' }
];

const meta: Meta<Args> = {
  title: 'Components/Forms/Breadcrumb',
  component: 'biz-breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'contained', 'standard-icon']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    maxItems: { control: 'number' },
    itemsBeforeCollapse: { control: 'number' },
    itemsAfterCollapse: { control: 'number' },
    separator: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    wrap: { control: 'boolean' },
    startSlot: { control: 'text' },
    separatorSlot: { control: 'text' },
    endSlot: { control: 'text' },
    dropdownSlot: { control: 'text' }
  },
  args: {
    items: sampleItems,
    variant: 'standard',
    size: 'medium',
    maxItems: 0,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1,
    separator: '/',
    disabled: false,
    fullWidth: false,
    wrap: false,
    onBreadcrumbClick: fn(),
    onOverflowClick: fn()
  },
  render: (args) => html`
    <biz-breadcrumb
      .items="${args.items}"
      .variant="${args.variant}"
      .size="${args.size}"
      .maxItems="${args.maxItems}"
      .itemsBeforeCollapse="${args.itemsBeforeCollapse}"
      .itemsAfterCollapse="${args.itemsAfterCollapse}"
      .separator="${args.separator}"
      ?disabled="${args.disabled}"
      ?full-width="${args.fullWidth}"
      ?wrap="${args.wrap}"
      @breadcrumb-click="${args.onBreadcrumbClick}"
      @overflow-click="${args.onOverflowClick}"
    >
      ${args.startSlot ? html`<span slot="start-slot">${args.startSlot}</span>` : ''}
      ${args.separatorSlot ? html`<span slot="separator-slot">${args.separatorSlot}</span>` : ''}
      ${args.endSlot ? html`<span slot="end-slot">${args.endSlot}</span>` : ''}
      ${args.dropdownSlot ? html`<span slot="dropdown-slot">${args.dropdownSlot}</span>` : ''}
    </biz-breadcrumb>
  `
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Standard: Story = {
  args: {
    variant: 'standard'
  }
};

export const Contained: Story = {
  args: {
    variant: 'contained'
  }
};

export const StandardIcon: Story = {
  args: {
    variant: 'standard-icon',
    items: [
      { label: 'Home', href: '/', icon: '🏠' },
      { label: 'Settings', href: '/settings', icon: '⚙️' },
      { label: 'Profile', href: '/settings/profile', icon: '👤' }
    ]
  }
};

export const Small: Story = {
  args: {
    size: 'small'
  }
};

export const Medium: Story = {
  args: {
    size: 'medium'
  }
};

export const Large: Story = {
  args: {
    size: 'large'
  }
};

export const Collapsed: Story = {
  args: {
    maxItems: 3,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const CustomSlots: Story = {
  args: {
    startSlot: '📍',
    separatorSlot: '>',
    endSlot: '🔍'
  }
};

export const AccessibilityValidation: Story = {
  args: {
    variant: 'standard',
    size: 'medium'
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }]
      }
    }
  }
};