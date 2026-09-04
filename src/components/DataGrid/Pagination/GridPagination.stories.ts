import type { Meta, StoryObj } from "@storybook/web-components-vite";
import type { GridPaginationHost } from "./GridPagination";
import './GridPagination.wc';
import { html } from "lit";
import { fn } from "storybook/test";

type GridPaginationArgs = Required<GridPaginationHost> & {
  prefixSlot?: string;
  suffixSlot?: string;
  'page-size-change': ReturnType<typeof fn>;
  'page-change': ReturnType<typeof fn>;
}
const meta: Meta<GridPaginationArgs> = {
  title: 'DataGrid/GridPagination',
  component: 'grid-pagination',
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    pageSize: { control: { type: 'number', min: 1 } },
    totalCount: { control: { type: 'number', min: 0 } },
    pageSizeOptions: { control: 'object' },
    maxPageButtons: { control: { type: 'number', min: 1 } },
    disabled: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['default', 'compact']
    },
    size: {
      control: 'radio',
      options: ['sm', 'md']
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'space-between']
    },
    prefixSlot: { control: 'text', name: 'prefix', table: {category: 'slots'} },
    suffixSlot: { control: 'text', name: 'suffix', table: {category: 'slots'} },
    'page-size-change': {description: `
      detail: {
          page: this.currentPage,
          pageSize: this.pageSize
        }, 
      `, table: {category: 'events'}},
    'page-change': {description: `
        detail: {
          page: this.currentPage,
          pageSize: this.pageSize
        }, 
      `,table: {category: 'events'}},
      onPageChange: { table: {disable: true}},
      onPageSizeChange: {table: {disable: true}},
  },
  args: {
    currentPage: 1,
    pageSize: 20,
    totalCount: 1250,
    pageSizeOptions: [10, 20, 50, 100],
    maxPageButtons: 5,
    disabled: false,
    variant: 'default',
    size: 'md',
    align: 'space-between',
    'page-change': fn(),
    'page-size-change': fn(),
  },
  render: (args) => {
    return html`
      <grid-pagination
        .currentPage="${args.currentPage}"
        .pageSize="${args.pageSize}"
        .totalCount="${args.totalCount}"
        .pageSizeOptions="${args.pageSizeOptions}"
        .maxPageButtons="${args.maxPageButtons}"
        ?disabled="${args.disabled}"
        .variant="${args.variant}"
        .size="${args.size}"
        .align="${args.align}"
        @page-change="${(e: CustomEvent) => args['page-change'](e.detail)}"
        @page-size-change="${(e: CustomEvent) => args['page-size-change'](e.detail)}"
      >
        ${args.prefixSlot ? html`<div slot="prefix">${args.prefixSlot}</div>` : ''}
        ${args.suffixSlot ? html`<div slot="suffix">${args.suffixSlot}</div>` : ''}
      </grid-pagination>
    `;
  }
};

export default meta;
type Story = StoryObj<GridPaginationArgs>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    variant: 'compact',
    align: 'center'
  }
};

export const SmallSize: Story = {
  args: {
    size: 'sm'
  }
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalCount: 500
  }
};

export const MiddlePage: Story = {
  args: {
    currentPage: 12,
    totalCount: 500
  }
};

export const LastPage: Story = {
  args: {
    currentPage: 25,
    totalCount: 500
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const WithSlots: Story = {
  args: {
    prefixSlot: 'Total 1,250 records selected',
    suffixSlot: 'Export Options'
  }
};

export const OnPageChangeTrigger: Story = {
  args: {
    currentPage: 3,
    totalCount: 200,
  }
};

export const OnPageSizeChangeTrigger: Story = {
  args: {
    pageSize: 20,
    totalCount: 500,
  }
};