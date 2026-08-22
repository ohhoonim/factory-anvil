import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ToggleButton.wc.js';

const meta: Meta = {
  title: 'Components/Forms/ToggleButton',
  component: 'biz-toggle-button',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'filled', 'outlined'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
  },
  args: {
    checked: false,
    disabled: false,
    readonly: false,
    variant: 'standard',
    size: 'medium',
    labelPosition: 'right',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <biz-toggle-button
      .checked="${args.checked}"
      .disabled="${args.disabled}"
      .readonly="${args.readonly}"
      variant="${args.variant}"
      size="${args.size}"
      label-position="${args.labelPosition}"
    >
      <span slot="label-slot">Notifications</span>
    </biz-toggle-button>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-toggle-button variant="standard" checked>
        <span slot="label-slot">Standard Variant (On)</span>
      </biz-toggle-button>
      <biz-toggle-button variant="filled" checked>
        <span slot="label-slot">Filled Variant (On)</span>
      </biz-toggle-button>
      <biz-toggle-button variant="outlined" checked>
        <span slot="label-slot">Outlined Variant (On)</span>
      </biz-toggle-button>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <biz-toggle-button size="small" checked>
        <span slot="label-slot">Small Size</span>
      </biz-toggle-button>
      <biz-toggle-button size="medium" checked>
        <span slot="label-slot">Medium Size</span>
      </biz-toggle-button>
      <biz-toggle-button size="large" checked>
        <span slot="label-slot">Large Size</span>
      </biz-toggle-button>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <biz-toggle-button disabled>
        <span slot="label-slot">Disabled State</span>
      </biz-toggle-button>
      <biz-toggle-button readonly checked>
        <span slot="label-slot">Readonly State</span>
      </biz-toggle-button>
    </div>
  `,
};