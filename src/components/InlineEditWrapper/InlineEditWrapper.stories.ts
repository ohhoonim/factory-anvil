import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './InlineEditWrapper.wc';

const meta: Meta = {
  title: 'Components/Layout/InlineEditWrapper',
  component: 'biz-inline-edit-wrapper',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['standard', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    mode: {
      control: { type: 'radio' },
      options: ['view', 'edit'],
    },
    trigger: {
      control: { type: 'select' },
      options: ['click', 'dblclick', 'focus'],
    },
    showActions: { control: 'boolean' },
    autoSave: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    value: '편집 가능한 텍스트입니다',
    variant: 'standard',
    size: 'medium',
    mode: 'view',
    trigger: 'click',
    showActions: false,
    autoSave: true,
    disabled: false,
    error: false,
    loading: false,
    fullWidth: false,
  },
  render: (args) => html`
    <biz-inline-edit-wrapper
      .value=${args.value}
      .variant=${args.variant}
      .size=${args.size}
      .mode=${args.mode}
      .trigger=${args.trigger}
      ?show-actions=${args.showActions}
      ?auto-save=${args.autoSave}
      ?disabled=${args.disabled}
      ?error=${args.error}
      ?loading=${args.loading}
      ?full-width=${args.fullWidth}
    >
      <input type="text" .value=${args.value} aria-label="텍스트 편집" />
    </biz-inline-edit-wrapper>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-inline-edit-wrapper variant="standard" value="Standard Variant">
        <input type="text" value="Standard Variant" aria-label="Standard" />
      </biz-inline-edit-wrapper>
      <biz-inline-edit-wrapper variant="outlined" value="Outlined Variant">
        <input type="text" value="Outlined Variant" aria-label="Outlined" />
      </biz-inline-edit-wrapper>
      <biz-inline-edit-wrapper variant="ghost" value="Ghost Variant">
        <input type="text" value="Ghost Variant" aria-label="Ghost" />
      </biz-inline-edit-wrapper>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-inline-edit-wrapper size="small" value="Small Size">
        <input type="text" value="Small Size" aria-label="Small" />
      </biz-inline-edit-wrapper>
      <biz-inline-edit-wrapper size="medium" value="Medium Size">
        <input type="text" value="Medium Size" aria-label="Medium" />
      </biz-inline-edit-wrapper>
      <biz-inline-edit-wrapper size="large" value="Large Size">
        <input type="text" value="Large Size" aria-label="Large" />
      </biz-inline-edit-wrapper>
    </div>
  `,
};

export const WithActions: Story = {
  args: {
    showActions: true,
    mode: 'edit',
  },
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-inline-edit-wrapper disabled value="Disabled State">
        <input type="text" value="Disabled State" disabled aria-label="Disabled" />
      </biz-inline-edit-wrapper>
      <biz-inline-edit-wrapper error value="Error State">
        <input type="text" value="Error State" aria-label="Error" />
      </biz-inline-edit-wrapper>
      <biz-inline-edit-wrapper loading value="Loading State">
        <input type="text" value="Loading State" aria-label="Loading" />
      </biz-inline-edit-wrapper>
    </div>
  `,
};