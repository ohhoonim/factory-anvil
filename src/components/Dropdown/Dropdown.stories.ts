import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import './Dropdown.wc.ts';
import type { DropdownHost, DropdownOption } from './Dropdown.ts';

type SlotArgs = {
  labelSlot?: string;
  prefixSlot?: string;
  suffixSlot?: string;
  tagSlot?: string;
  optionSlot?: string;
  emptySlot?: string;
  headerSlot?: string;
  footerSlot?: string;
  helperTextSlot?: string;
};

type DropdownStoryArgs = Required<DropdownHost> & SlotArgs;

const sampleOptions: DropdownOption[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
  { label: 'Option 4 (Disabled)', value: 'opt4', disabled: true },
  { label: 'Option 5', value: 'opt5' },
];

const renderDropdown = (args: DropdownStoryArgs) => html`
  <biz-dropdown
    .value=${args.value}
    .options=${args.options}
    .mode=${args.mode}
    .variant=${args.variant}
    .size=${args.size}
    .labelPlacement=${args.labelPlacement}
    ?filterable=${args.filterable}
    .placeholder=${args.placeholder}
    ?clearable=${args.clearable}
    .maxTagCount=${args.maxTagCount}
    ?loading=${args.loading}
    ?required=${args.required}
    ?readonly=${args.readonly}
    ?disabled=${args.disabled}
    ?error=${args.error}
    
  >
    ${args.labelSlot ? html`<span slot="label-slot">${args.labelSlot}</span>` : ''}
    ${args.prefixSlot ? html`<span slot="prefix-slot">${args.prefixSlot}</span>` : ''}
    ${args.suffixSlot ? html`<span slot="suffix-slot">${args.suffixSlot}</span>` : ''}
    ${args.tagSlot ? html`<span slot="tag-slot">${args.tagSlot}</span>` : ''}
    ${args.optionSlot ? html`<span slot="option-slot">${args.optionSlot}</span>` : ''}
    ${args.emptySlot ? html`<span slot="empty-slot">${args.emptySlot}</span>` : ''}
    ${args.headerSlot ? html`<span slot="header-slot">${args.headerSlot}</span>` : ''}
    ${args.footerSlot ? html`<span slot="footer-slot">${args.footerSlot}</span>` : ''}
    ${args.helperTextSlot ? html`<span slot="helper-text-slot">${args.helperTextSlot}</span>` : ''}
  </biz-dropdown>
`;

type CustomEventHandlers = {
  onChange: (e: CustomEvent) => void;
  onOpen: (e: CustomEvent) => void;
  onClose: (e: CustomEvent) => void;
  onSearch: (e: CustomEvent) => void;
  onClear: (e: CustomEvent) => void;
  onTagRemove: (e: CustomEvent) => void;
};

type StoryArgs = DropdownStoryArgs & CustomEventHandlers;

const meta: Meta<StoryArgs> = {
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
    labelPlacement: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
    value: { control: 'object' },
    options: { control: 'object' },
    filterable: { control: 'boolean' },
    placeholder: { control: 'text' },
    clearable: { control: 'boolean' },
    maxTagCount: { control: 'number' },
    loading: { control: 'boolean' },
    required: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    value: null,
    options: sampleOptions,
    mode: 'single',
    variant: 'outlined',
    size: 'medium',
    labelPlacement: 'vertical',
    hasLabelSlot: true,
    filterable: false,
    placeholder: '선택하세요',
    clearable: true,
    maxTagCount: undefined,
    loading: false,
    required: false,
    readonly: false,
    disabled: false,
    error: false,
    isOpen: false,
    focusedOptionIndex: -1,
    searchKeyword: '',
    labelSlot: '항목 선택',
    prefixSlot: '',
    suffixSlot: '',
    tagSlot: '',
    optionSlot: '',
    emptySlot: '',
    headerSlot: '',
    footerSlot: '',
    helperTextSlot: '옵션을 선택해 주세요.',
    handleTriggerClick: () => {},
    handleInputClick: () => {},
    handleTriggerKeyDown: () => {},
    handleOptionClick: () => {},
    handleClearClick: () => {},
    handleTagRemove: () => {},
    handleFilterInput: () => {},
    handleLabelSlotChange: () => {},
    getFilteredOptions: () => sampleOptions,
    getOptionId: (i: number) => `biz-dropdown-option-${i}`,
    onChange: fn(),
    onOpen: fn(),
    onClose: fn(),
    onSearch: fn(),
    onClear: fn(),
    onTagRemove: fn(),
  },
  render: renderDropdown,
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

export const WithoutLabel: Story = {
  args: {
    labelSlot: '',
    hasLabelSlot: false,
    helperTextSlot: '',
  },
};

export const LabelPlacements: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
      ${renderDropdown({ ...args, labelPlacement: 'vertical', labelSlot: 'Vertical Label' })}
      ${renderDropdown({ ...args, labelPlacement: 'horizontal', labelSlot: 'Horizontal Label' })}
    </div>
  `,
};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      ${renderDropdown({ ...args, variant: 'outlined', labelSlot: 'Outlined' })}
      ${renderDropdown({ ...args, variant: 'filled', labelSlot: 'Filled' })}
      ${renderDropdown({ ...args, variant: 'standard', labelSlot: 'Standard' })}
    </div>
  `,
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      ${renderDropdown({ ...args, size: 'small', labelSlot: 'Small' })}
      ${renderDropdown({ ...args, size: 'medium', labelSlot: 'Medium' })}
      ${renderDropdown({ ...args, size: 'large', labelSlot: 'Large' })}
    </div>
  `,
};

export const States: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      ${renderDropdown({ ...args, disabled: true, labelSlot: 'Disabled State' })}
      ${renderDropdown({ ...args, readonly: true, value: 'opt1', labelSlot: 'Readonly State' })}
      ${renderDropdown({ ...args, error: true, helperTextSlot: '필수 선택 항목입니다.', labelSlot: 'Error State' })}
      ${renderDropdown({ ...args, loading: true, labelSlot: 'Loading State' })}
    </div>
  `,
};

export const MultiSelect: Story = {
  args: {
    mode: 'multi',
    value: ['opt1', 'opt2'],
    labelSlot: '다중 선택 드롭다운',
    helperTextSlot: '여러 개 선택이 가능합니다.',
  },
};

export const ComboboxAutocomplete: Story = {
  args: {
    filterable: true,
    labelSlot: '검색 기능 드롭다운',
    placeholder: '검색어를 입력하세요',
  },
};

export const EventHandlers: Story = {
  args: {
    labelSlot: '이벤트 테스트 드롭다운',
    clearable: true,
    filterable: true,
    onChange: fn(),
    onOpen: fn(),
    onClose: fn(),
    onSearch: fn(),
    onClear: fn(),
    onTagRemove: fn(),
  },
};