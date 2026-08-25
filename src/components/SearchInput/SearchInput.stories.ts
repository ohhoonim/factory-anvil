import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import "./SearchInput.wc";

const meta: Meta = {
  title: 'Components/Forms/SearchInput',
  component: 'biz-search-input',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    clearable: { control: 'boolean' },
    showSearchButton: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    value: '',
    placeholder: '검색어를 입력하세요',
    clearable: true,
    showSearchButton: false,
    loading: false,
    disabled: false,
    readonly: false,
    error: false,
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    label: '검색',
    helperText: '원하는 키워드를 입력 후 Enter를 누르세요.',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
      <biz-search-input variant="outlined" label="Outlined (기본)" value="Outlined 스타일"></biz-search-input>
      <biz-search-input variant="filled" label="Filled" value="Filled 스타일"></biz-search-input>
      <biz-search-input variant="standard" label="Standard" value="Standard 스타일"></biz-search-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
      <biz-search-input size="small" label="Small" value="Small 크기"></biz-search-input>
      <biz-search-input size="medium" label="Medium" value="Medium 크기"></biz-search-input>
      <biz-search-input size="large" label="Large" value="Large 크기"></biz-search-input>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
      <biz-search-input label="Disabled" value="비활성화 상태" disabled></biz-search-input>
      <biz-search-input label="Readonly" value="읽기 전용 상태" readonly></biz-search-input>
      <biz-search-input label="Error" value="잘못된 입력값" error helper-text="유효하지 않은 검색어입니다."></biz-search-input>
      <biz-search-input label="Loading" value="검색 중..." loading></biz-search-input>
    </div>
  `,
};

export const WithActionButton: Story = {
  args: {
    showSearchButton: true,
    label: '버튼 포함 검색',
  },
};

export const InteractiveA11y: Story = {
  args: {
    label: '접근성 검증 검색 필드',
    helperText: 'Tab 및 Enter/Escape 키보드 네비게이션을 테스트해보세요.',
    clearable: true,
    showSearchButton: true,
  },
};