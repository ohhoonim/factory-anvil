import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './DatePicker.wc.js';

const meta: Meta = {
  title: 'Components/Forms/DatePicker',
  component: 'biz-date-picker',
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
    mode: {
      control: { type: 'select' },
      options: ['single', 'range'],
    },
    format: { control: 'text' },
    placeholder: { control: 'text' },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    variant: 'outlined',
    size: 'medium',
    mode: 'single',
    format: 'YYYY-MM-DD',
    placeholder: 'YYYY-MM-DD',
    clearable: true,
    disabled: false,
    readonly: false,
    error: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <biz-date-picker
      .variant="${args.variant}"
      .size="${args.size}"
      .mode="${args.mode}"
      .format="${args.format}"
      .placeholder="${args.placeholder}"
      ?clearable="${args.clearable}"
      ?disabled="${args.disabled}"
      ?readonly="${args.readonly}"
      ?error="${args.error}"
      ?full-width="${args.fullWidth}"
    >
      <span slot="label-slot">날짜 선택</span>
      <span slot="helper-text-slot">원하는 날짜를 선택하거나 직접 입력하세요.</span>
    </biz-date-picker>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
      <biz-date-picker variant="outlined" placeholder="Outlined">
        <span slot="label-slot">Outlined</span>
      </biz-date-picker>
      <biz-date-picker variant="filled" placeholder="Filled">
        <span slot="label-slot">Filled</span>
      </biz-date-picker>
      <biz-date-picker variant="standard" placeholder="Standard">
        <span slot="label-slot">Standard</span>
      </biz-date-picker>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
      <biz-date-picker size="small" placeholder="Small">
        <span slot="label-slot">Small</span>
      </biz-date-picker>
      <biz-date-picker size="medium" placeholder="Medium">
        <span slot="label-slot">Medium</span>
      </biz-date-picker>
      <biz-date-picker size="large" placeholder="Large">
        <span slot="label-slot">Large</span>
      </biz-date-picker>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
      <biz-date-picker disabled value="2026-08-17">
        <span slot="label-slot">Disabled</span>
      </biz-date-picker>
      <biz-date-picker readonly value="2026-08-17">
        <span slot="label-slot">Readonly</span>
      </biz-date-picker>
      <biz-date-picker error value="invalid-date">
        <span slot="label-slot">Error</span>
        <span slot="helper-text-slot" style="color: #dc2626;">올바른 날짜 형식이 아닙니다.</span>
      </biz-date-picker>
    </div>
  `,
};

export const RangeMode: Story = {
  render: () => html`
    <biz-date-picker mode="range" clearable placeholder="YYYY-MM-DD ~ YYYY-MM-DD">
      <span slot="label-slot">기간 선택 (Range Mode)</span>
      <span slot="helper-text-slot">시작일과 종료일을 순서대로 선택하세요.</span>
    </biz-date-picker>
  `,
};

export const AccessibilityValidation: Story = {
  render: () => html`
    <biz-date-picker clearable>
      <label slot="label-slot" id="datepicker-label">웹 접근성 검증 레이블</label>
      <span slot="helper-text-slot" id="datepicker-helper">키보드로 달력을 조작할 수 있습니다 (Esc, 방향키, Enter).</span>
    </biz-date-picker>
  `,
};