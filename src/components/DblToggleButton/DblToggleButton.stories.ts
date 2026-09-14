import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { fn } from 'storybook/test';
import type { DblToggleButtonHost } from './DblToggleButton';
import './DblToggleButton.wc'

type StoryArgs = Required<DblToggleButtonHost> & {
  leftIconSlot?: string;
  leftLabelSlot?: string;
  rightIconSlot?: string;
  rightLabelSlot?: string;
};

const meta: Meta<StoryArgs> = {
  title: 'Components/Forms/DblToggleButton',
  component: 'biz-dbl-toggle-button',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: '현재 선택된 듀얼 토글 값' },
    leftValue: { control: 'text', description: '좌측 세그먼트 고유 값' },
    rightValue: { control: 'text', description: '우측 세그먼트 고유 값' },
    variant: {
      control: { type: 'select' },
      options: ['contained', 'outlined', 'standard'],
      description: '시각적 형태 옵션',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '크기 옵션',
    },
    fullWidth: { control: 'boolean', description: '너비 100% 확장 여부' },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    readonly: { control: 'boolean', description: '읽기 전용 여부' },
    leftIconSlot: { control: 'text', description: '좌측 슬롯 아이콘 HTML' },
    leftLabelSlot: { control: 'text', description: '좌측 슬롯 텍스트 레이블' },
    rightIconSlot: { control: 'text', description: '우측 슬롯 아이콘 HTML' },
    rightLabelSlot: { control: 'text', description: '우측 슬롯 텍스트 레이블' },
  },
  args: {
    value: 'left',
    leftValue: 'left',
    rightValue: 'right',
    variant: 'contained',
    size: 'medium',
    fullWidth: false,
    disabled: false,
    readonly: false,
    onSelect: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  render: (args) => html`
    <biz-dbl-toggle-button
      .value="${args.value}"
      left-value="${args.leftValue}"
      right-value="${args.rightValue}"
      variant="${args.variant}"
      size="${args.size}"
      ?full-width="${args.fullWidth}"
      ?disabled="${args.disabled}"
      ?readonly="${args.readonly}"
      @change="${(e: CustomEvent) => args.onSelect(e.detail.side, e.detail.value)}"
      @focus="${args.onFocus}"
      @blur="${args.onBlur}"
    >
      <span slot="left-label-slot">${args.leftLabelSlot || 'Left'}</span>
      <span slot="right-label-slot">${args.rightLabelSlot || 'Right'}</span>
    </biz-dbl-toggle-button>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
      <div>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Contained (Default)</p>
        <biz-dbl-toggle-button value="left" left-value="left" right-value="right" variant="contained">
          <span slot="left-label-slot">List</span>
          <span slot="right-label-slot">Grid</span>
        </biz-dbl-toggle-button>
      </div>
      <div>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Outlined</p>
        <biz-dbl-toggle-button value="right" left-value="left" right-value="right" variant="outlined">
          <span slot="left-label-slot">List</span>
          <span slot="right-label-slot">Grid</span>
        </biz-dbl-toggle-button>
      </div>
      <div>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Standard</p>
        <biz-dbl-toggle-button value="left" left-value="left" right-value="right" variant="standard">
          <span slot="left-label-slot">List</span>
          <span slot="right-label-slot">Grid</span>
        </biz-dbl-toggle-button>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
      <biz-dbl-toggle-button size="small" value="left">
        <span slot="left-label-slot">Small</span>
        <span slot="right-label-slot">Small</span>
      </biz-dbl-toggle-button>
      <biz-dbl-toggle-button size="medium" value="left">
        <span slot="left-label-slot">Medium</span>
        <span slot="right-label-slot">Medium</span>
      </biz-dbl-toggle-button>
      <biz-dbl-toggle-button size="large" value="left">
        <span slot="left-label-slot">Large</span>
        <span slot="right-label-slot">Large</span>
      </biz-dbl-toggle-button>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
      <div>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Disabled</p>
        <biz-dbl-toggle-button disabled value="left">
          <span slot="left-label-slot">Disabled Left</span>
          <span slot="right-label-slot">Disabled Right</span>
        </biz-dbl-toggle-button>
      </div>
      <div>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Readonly</p>
        <biz-dbl-toggle-button readonly value="right">
          <span slot="left-label-slot">Readonly Left</span>
          <span slot="right-label-slot">Readonly Right</span>
        </biz-dbl-toggle-button>
      </div>
    </div>
  `,
};