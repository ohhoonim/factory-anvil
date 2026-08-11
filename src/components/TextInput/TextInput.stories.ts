import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './TextInput.wc';

const meta: Meta = {
  title: 'Components/TextInput',
  component: 'biz-text-input',
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
    type: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    clearable: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    variant: 'outlined',
    size: 'medium',
    value: '',
    placeholder: '텍스트를 입력하세요...',
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    clearable: true,
    loading: false,
    fullWidth: false,
  },
  render: (args) => html`
    <biz-text-input
      .variant="${args.variant}"
      .size="${args.size}"
      .type="${args.type}"
      .value="${args.value}"
      .placeholder="${args.placeholder}"
      ?disabled="${args.disabled}"
      ?readonly="${args.readonly}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?clearable="${args.clearable}"
      ?loading="${args.loading}"
      ?full-width="${args.fullWidth}"
    >
      <label slot="label-slot" for="input">레이블</label>
      <span slot="helper-text-slot">도움말 텍스트입니다.</span>
    </biz-text-input>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-text-input variant="outlined" placeholder="Outlined Variant">
        <label slot="label-slot">Outlined</label>
      </biz-text-input>
      <biz-text-input variant="filled" placeholder="Filled Variant">
        <label slot="label-slot">Filled</label>
      </biz-text-input>
      <biz-text-input variant="standard" placeholder="Standard Variant">
        <label slot="label-slot">Standard</label>
      </biz-text-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-text-input size="small" placeholder="Small Size">
        <label slot="label-slot">Small</label>
      </biz-text-input>
      <biz-text-input size="medium" placeholder="Medium Size">
        <label slot="label-slot">Medium</label>
      </biz-text-input>
      <biz-text-input size="large" placeholder="Large Size">
        <label slot="label-slot">Large</label>
      </biz-text-input>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-text-input value="비활성화 상태" disabled>
        <label slot="label-slot">Disabled</label>
      </biz-text-input>
      <biz-text-input value="읽기 전용 상태" readonly>
        <label slot="label-slot">Readonly</label>
      </biz-text-input>
      <biz-text-input value="잘못된 입력 값" error>
        <label slot="label-slot">Error</label>
        <span slot="helper-text-slot" style="color: var(--biz-text-input-error-color);">
          유효성 검사에 실패했습니다.
        </span>
      </biz-text-input>
      <biz-text-input loading placeholder="로딩 중...">
        <label slot="label-slot">Loading</label>
      </biz-text-input>
    </div>
  `,
};

export const Accessibility: Story = {
  render: () => html`
    <biz-text-input required error clearable value="접근성 테스트">
      <label slot="label-slot">필수 입력 항목</label>
      <span slot="helper-text-slot">에러 상태 및 필수 입력 안내 메시지입니다.</span>
    </biz-text-input>
  `,
};