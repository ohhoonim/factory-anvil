import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './CheckboxGroup.wc.js';

const meta: Meta = {
  title: 'Components/Forms/CheckboxGroup',
  component: 'biz-checkbox-group',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal']
    },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'card', 'button']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' }
  },
  args: {
    orientation: 'vertical',
    variant: 'standard',
    size: 'medium',
    required: false,
    disabled: false,
    readonly: false,
    error: false,
    fullWidth: false,
    min: 0,
    max: Number.POSITIVE_INFINITY
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <biz-checkbox-group
      .orientation="${args.orientation}"
      .variant="${args.variant}"
      .size="${args.size}"
      ?required="${args.required}"
      ?disabled="${args.disabled}"
      ?readonly="${args.readonly}"
      ?error="${args.error}"
      ?full-width="${args.fullWidth}"
      .min="${args.min}"
      .max="${args.max}"
    >
      <span slot="label-slot">알림 설정</span>
      <label><input type="checkbox" value="email" /> 이메일 알림</label>
      <label><input type="checkbox" value="sms" /> SMS 알림</label>
      <label><input type="checkbox" value="push" /> 앱 푸시 알림</label>
      <span slot="helper-text-slot">수신하고자 하는 알림 채널을 선택하세요.</span>
    </biz-checkbox-group>
  `
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <biz-checkbox-group variant="standard">
        <span slot="label-slot">Standard Variant</span>
        <label><input type="checkbox" value="1" /> 옵션 1</label>
        <label><input type="checkbox" value="2" /> 옵션 2</label>
      </biz-checkbox-group>

      <biz-checkbox-group variant="card">
        <span slot="label-slot">Card Variant</span>
        <label><input type="checkbox" value="1" /> 카드 옵션 1</label>
        <label><input type="checkbox" value="2" /> 카드 옵션 2</label>
      </biz-checkbox-group>

      <biz-checkbox-group variant="button" orientation="horizontal">
        <span slot="label-slot">Button Variant</span>
        <label><input type="checkbox" value="1" /> 버튼 1</label>
        <label><input type="checkbox" value="2" /> 버튼 2</label>
      </biz-checkbox-group>
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <biz-checkbox-group size="small">
        <span slot="label-slot">Small Size</span>
        <label><input type="checkbox" value="1" /> 소형 옵션 1</label>
        <label><input type="checkbox" value="2" /> 소형 옵션 2</label>
      </biz-checkbox-group>

      <biz-checkbox-group size="medium">
        <span slot="label-slot">Medium Size</span>
        <label><input type="checkbox" value="1" /> 중형 옵션 1</label>
        <label><input type="checkbox" value="2" /> 중형 옵션 2</label>
      </biz-checkbox-group>

      <biz-checkbox-group size="large">
        <span slot="label-slot">Large Size</span>
        <label><input type="checkbox" value="1" /> 대형 옵션 1</label>
        <label><input type="checkbox" value="2" /> 대형 옵션 2</label>
      </biz-checkbox-group>
    </div>
  `
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <biz-checkbox-group disabled>
        <span slot="label-slot">Disabled State</span>
        <label><input type="checkbox" value="1" /> 비활성화 1</label>
        <label><input type="checkbox" value="2" /> 비활성화 2</label>
      </biz-checkbox-group>

      <biz-checkbox-group readonly .value="${['1']}">
        <span slot="label-slot">Readonly State</span>
        <label><input type="checkbox" value="1" /> 읽기 전용 1</label>
        <label><input type="checkbox" value="2" /> 읽기 전용 2</label>
      </biz-checkbox-group>

      <biz-checkbox-group error>
        <span slot="label-slot">Error State</span>
        <label><input type="checkbox" value="1" /> 에러 옵션 1</label>
        <label><input type="checkbox" value="2" /> 에러 옵션 2</label>
        <span slot="helper-text-slot">필수 항목을 선택해 주세요.</span>
      </biz-checkbox-group>
    </div>
  `
};