import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './Rating.wc.js';

const meta: Meta = {
  title: 'Components/Forms/Rating',
  component: 'biz-rating',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 10, step: 0.5 } },
    max: { control: { type: 'number', min: 1, max: 10 } },
    precision: { control: { type: 'select' }, options: [1, 0.5] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    allowClear: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showTooltip: { control: 'boolean' },
    name: { control: 'text' },
  },
  args: {
    value: 3,
    max: 5,
    precision: 1,
    size: 'md',
    allowClear: false,
    readonly: false,
    disabled: false,
    showTooltip: false,
    name: 'rating',
  },
  render: (args) => html`
    <biz-rating
      .value=${args.value}
      .max=${args.max}
      .precision=${args.precision}
      .size=${args.size}
      ?allow-clear=${args.allowClear}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?show-tooltip=${args.showTooltip}
      .name=${args.name}
      aria-label="상품 평점 선택"
    ></biz-rating>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const HalfStarPrecision: Story = {
  args: {
    value: 3.5,
    precision: 0.5,
    showTooltip: true,
  },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">Small (sm)</p>
        <biz-rating size="sm" value="3" aria-label="Small 평점"></biz-rating>
      </div>
      <div>
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">Medium (md)</p>
        <biz-rating size="md" value="3" aria-label="Medium 평점"></biz-rating>
      </div>
      <div>
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">Large (lg)</p>
        <biz-rating size="lg" value="3" aria-label="Large 평점"></biz-rating>
      </div>
    </div>
  `,
};

export const AllowClear: Story = {
  args: {
    value: 4,
    allowClear: true,
  },
};

export const Readonly: Story = {
  args: {
    value: 3.7,
    precision: 0.1,
    readonly: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 2,
    disabled: true,
  },
};

export const CustomSlots: Story = {
  render: () => html`
    <biz-rating value="3" aria-label="커스텀 아이콘 평점">
      <span slot="icon-filled-slot" style="color: #ef4444; font-size: 20px;">❤️</span>
      <span slot="icon-empty-slot" style="color: #d1d5db; font-size: 20px;">🤍</span>
      <span slot="value-label-slot" style="font-weight: bold; color: #ef4444;">3.0 / 5.0 (매우 만족)</span>
      <span slot="helper-text-slot">평점을 선택해 주세요.</span>
    </biz-rating>
  `,
};