import { html, type TemplateResult } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { fn } from 'storybook/test';
import { type SearchInputHost } from './SearchInput';
import './SearchInput.wc.js';

type SearchInputArgs = Required<SearchInputHost> & {
  labelSlot?: string;
  startSlot?: string;
  endSlot?: string;
  searchButtonSlot?: string;
  helperTextSlot?: string;
};

const renderSearchInput = (args: SearchInputArgs): TemplateResult => html`
  <biz-search-input
    .value="${args.value}"
    .placeholder="${args.placeholder}"
    ?clearable="${args.clearable}"
    ?show-search-button="${args.showSearchButton}"
    ?loading="${args.loading}"
    ?required="${args.required}"
    ?readonly="${args.readonly}"
    ?disabled="${args.disabled}"
    ?error="${args.error}"
    .variant="${args.variant}"
    .size="${args.size}"
    ?full-width="${args.fullWidth}"
    .helperText="${args.helperText}"
    @input="${args.handleInput}"
    @change="${args.handleChange}"
    @search="${args.handleSearch}"
    @clear="${args.handleClear}"
    @focus="${args.handleFocus}"
    @blur="${args.handleBlur}"
  >
    ${args.labelSlot ? html`<label slot="label-slot" for="search-input-control">${args.labelSlot}</label>` : ''}
    ${args.startSlot ? html`<span slot="start-slot">${args.startSlot}</span>` : ''}
    ${args.endSlot ? html`<span slot="end-slot">${args.endSlot}</span>` : ''}
    ${args.searchButtonSlot ? html`<button slot="search-button-slot">${args.searchButtonSlot}</button>` : ''}
    ${args.helperTextSlot ? html`<span slot="helper-text-slot">${args.helperTextSlot}</span>` : ''}
  </biz-search-input>
`;

const meta: Meta<SearchInputArgs> = {
  title: 'Components/Forms/SearchInput',
  component: 'biz-search-input',
  render: renderSearchInput,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
      description: '검색 필드 스타일 유형',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '검색 필드 크기',
    },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    clearable: { control: 'boolean' },
    showSearchButton: { control: 'boolean' },
    loading: { control: 'boolean' },
    required: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    helperText: { control: 'text' },
  },
  args: {
    value: '',
    placeholder: '검색어를 입력하세요',
    clearable: true,
    showSearchButton: false,
    loading: false,
    required: false,
    readonly: false,
    disabled: false,
    error: false,
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    helperText: '',
    handleInput: fn(),
    handleChange: fn(),
    handleKeyDown: fn(),
    handleSearch: fn(),
    handleClear: fn(),
    handleFocus: fn(),
    handleBlur: fn(),
  },
};

export default meta;

type Story = StoryObj<SearchInputArgs>;

export const Default: Story = {
  args: {
    labelSlot: '통합 검색',
    helperText: '원하시는 검색어를 입력 후 엔터를 누르세요.',
  },
};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
      <biz-search-input .variant="${'outlined'}" .value="${args.value}" placeholder="Outlined Variant"></biz-search-input>
      <biz-search-input .variant="${'filled'}" .value="${args.value}" placeholder="Filled Variant"></biz-search-input>
      <biz-search-input .variant="${'standard'}" .value="${args.value}" placeholder="Standard Variant"></biz-search-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
      <biz-search-input .size="${'small'}" .value="${args.value}" placeholder="Small Size (32px)"></biz-search-input>
      <biz-search-input .size="${'medium'}" .value="${args.value}" placeholder="Medium Size (40px)"></biz-search-input>
      <biz-search-input .size="${'large'}" .value="${args.value}" placeholder="Large Size (48px)"></biz-search-input>
    </div>
  `,
};

export const States: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
      <biz-search-input value="검색어 입력됨" ?clearable="${true}" placeholder="Active / Clearable State"></biz-search-input>
      <biz-search-input ?loading="${true}" placeholder="Loading State"></biz-search-input>
      <biz-search-input ?error="${true}" helper-text="올바른 검색어를 입력해주세요." placeholder="Error State"></biz-search-input>
      <biz-search-input ?readonly="${true}" value="읽기 전용 값" placeholder="Readonly State"></biz-search-input>
      <biz-search-input ?disabled="${true}" value="비활성화 값" placeholder="Disabled State"></biz-search-input>
    </div>
  `,
};

export const WithSearchButton: Story = {
  args: {
    showSearchButton: true,
    value: '스프링 프레임워크',
    labelSlot: '기술 스택 검색',
  },
};

export const AccessibilityValidation: Story = {
  args: {
    required: true,
    error: true,
    labelSlot: '필수 검색 항목 (a11y 검증)',
    helperText: '스크린 리더에서 aria-describedby 및 aria-invalid를 식별합니다.',
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
};

export const EventTesting: Story = {
  args: {
    value: '이벤트 테스트 중',
    showSearchButton: true,
    handleInput: fn(),
    handleChange: fn(),
    handleSearch: fn(),
    handleClear: fn(),
    handleFocus: fn(),
    handleBlur: fn(),
  },
};