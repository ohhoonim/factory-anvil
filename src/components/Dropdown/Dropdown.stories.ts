import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './Dropdown.wc';
import type { BizDropdown } from './Dropdown.wc';

const mockOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
  { label: 'Option 4 (Disabled)', value: 'opt4', disabled: true },
  { label: 'Option 5', value: 'opt5' },
];

const meta: Meta<BizDropdown> = {
  title: 'Components/Forms/Dropdown',
  component: 'biz-dropdown',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'multi'],
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    filterable: { control: 'boolean' },
    clearable: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    options: mockOptions,
    placeholder: '선택하세요',
    mode: 'single',
    variant: 'outlined',
    size: 'medium',
    filterable: false,
    clearable: false,
    loading: false,
    disabled: false,
    readonly: false,
    error: false,
    fullWidth: false,
  },
  render: (args) => html`
    <biz-dropdown
      .value=${args.value}
      .options=${args.options}
      .mode=${args.mode}
      .variant=${args.variant}
      .size=${args.size}
      ?filterable=${args.filterable}
      .placeholder=${args.placeholder}
      ?clearable=${args.clearable}
      .maxTagCount=${args.maxTagCount}
      ?loading=${args.loading}
      ?required=${args.required}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?error=${args.error}
      ?full-width=${args.fullWidth}
    >
      <label slot="label-slot">선택 항목</label>
      <span slot="helper-text-slot">도움말 문구입니다.</span>
    </biz-dropdown>
  `,
};

export default meta;
type Story = StoryObj<BizDropdown>;

export const Default: Story = {
  args: {},
};

export const MultiSelect: Story = {
  args: {
    mode: 'multi',
    value: ['opt1', 'opt2'],
    clearable: true,
  },
};

export const FilterableCombobox: Story = {
  args: {
    filterable: true,
    placeholder: '검색어를 입력하세요',
  },
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-dropdown .options=${mockOptions} variant="outlined" placeholder="Outlined">
        <label slot="label-slot">Outlined Variant</label>
      </biz-dropdown>
      <biz-dropdown .options=${mockOptions} variant="filled" placeholder="Filled">
        <label slot="label-slot">Filled Variant</label>
      </biz-dropdown>
      <biz-dropdown .options=${mockOptions} variant="standard" placeholder="Standard">
        <label slot="label-slot">Standard Variant</label>
      </biz-dropdown>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-dropdown .options=${mockOptions} size="small" placeholder="Small Size">
        <label slot="label-slot">Small Size</label>
      </biz-dropdown>
      <biz-dropdown .options=${mockOptions} size="medium" placeholder="Medium Size">
        <label slot="label-slot">Medium Size</label>
      </biz-dropdown>
      <biz-dropdown .options=${mockOptions} size="large" placeholder="Large Size">
        <label slot="label-slot">Large Size</label>
      </biz-dropdown>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-dropdown .options=${mockOptions} disabled placeholder="Disabled State">
        <label slot="label-slot">Disabled</label>
      </biz-dropdown>
      <biz-dropdown .options=${mockOptions} readonly value="opt1" placeholder="Readonly State">
        <label slot="label-slot">Readonly</label>
      </biz-dropdown>
      <biz-dropdown .options=${mockOptions} error placeholder="Error State">
        <label slot="label-slot">Error</label>
        <span slot="helper-text-slot">올바른 값을 선택해 주세요.</span>
      </biz-dropdown>
      <biz-dropdown .options=${mockOptions} loading placeholder="Loading State">
        <label slot="label-slot">Loading</label>
      </biz-dropdown>
    </div>
  `,
};