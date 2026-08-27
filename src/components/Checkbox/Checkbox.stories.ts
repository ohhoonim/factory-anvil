import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './Checkbox.wc.js';
import type { CheckboxHost } from './Checkbox.js';
import { fn } from 'storybook/test';

type CheckboxArgs = Required<CheckboxHost> & {
    defaultSlot: string;
    descriptionSlot: string;
    iconSlot: string;
    onChange: (e: CustomEvent) => void;
    onFocus: (e: FocusEvent) => void;
    onBlur: (e: FocusEvent) => void;
};

const meta: Meta<CheckboxArgs> = {
    title: 'Components/Forms/Checkbox',
    component: 'biz-checkbox',
    tags: ["autodocs"],
    argTypes: {
        checked: { control: 'boolean' },
        value: { control: 'text' },
        indeterminate: { control: 'boolean' },
        labelPosition: {
            control: { type: 'select' },
            options: ['right', 'left'],
        },
        required: { control: 'boolean' },
        readonly: { control: 'boolean' },
        disabled: { control: 'boolean' },
        error: { control: 'boolean' },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
        },
        variant: {
            control: { type: 'select' },
            options: ['standard', 'button', 'card'],
        },
        defaultSlot: { control: 'text', name: "(default)", 
            description: "체크박스 우측/좌측 레이블 영역", 
            table: { category: "slot", type: { summary: "string | HTMLElement" } } },
        descriptionSlot: { control: 'text', name: "description-slot", 
            description: "체크박스 하단 보조 설명 텍스트 영역", table: { category: "slot", type: { summary: "string | HTMLElement" } } },
        iconSlot: { control: 'text', name: "icon-slot", 
            description: "선택(checked) 및 부분 선택(indeterminate) 아이콘 커스텀 영역", table: { category: "slot", type: { summary: "string | HTMLElement" } } },
        handleInputChange: {table: {disable: true}},
        handleFocus: {table: {disable: true}},
        handleBlur: {table: {disable: true}},
    },
    args: {
        checked: false,
        value: 'checkbox-1',
        indeterminate: false,
        labelPosition: 'right',
        required: false,
        readonly: false,
        disabled: false,
        error: false,
        size: 'medium',
        variant: 'standard',
        descriptionId: 'checkbox-desc',
        defaultSlot: '동의합니다',
        descriptionSlot: '약관 내용을 확인 후 동의해 주세요.',
        iconSlot: '',
        handleInputChange: () => { },
        handleFocus: () => { },
        handleBlur: () => { },
    },
    render: (args) => html`
    <biz-checkbox
      .checked=${args.checked}
      .value=${args.value}
      .indeterminate=${args.indeterminate}
      label-position=${args.labelPosition}
      ?required=${args.required}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?error=${args.error}
      size=${args.size}
      variant=${args.variant}
      @change=${args.onChange}
      @focus=${args.onFocus}
      @blur=${args.onBlur}
    >
      ${args.defaultSlot}
      ${args.descriptionSlot
            ? html`<span slot="description-slot">${args.descriptionSlot}</span>`
            : ''}
    </biz-checkbox>
  `,
};

export default meta;
type Story = StoryObj<CheckboxArgs>;

export const Default: Story = {};

export const Sizes: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <biz-checkbox size="small">Small Checkbox</biz-checkbox>
      <biz-checkbox size="medium">Medium Checkbox</biz-checkbox>
      <biz-checkbox size="large">Large Checkbox</biz-checkbox>
    </div>
  `,
};

export const Variants: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <biz-checkbox variant="standard">Standard Variant</biz-checkbox>
      <biz-checkbox variant="button">Button Variant</biz-checkbox>
      <biz-checkbox variant="card">Card Variant</biz-checkbox>
    </div>
  `,
};

export const LabelPositions: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <biz-checkbox label-position="right">Label Right (Default)</biz-checkbox>
      <biz-checkbox label-position="left">Label Left</biz-checkbox>
    </div>
  `,
};

export const States: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <biz-checkbox .checked=${true}>Checked</biz-checkbox>
      <biz-checkbox .indeterminate=${true}>Indeterminate</biz-checkbox>

      <biz-checkbox ?disabled=${true}>Disabled Unchecked</biz-checkbox>
      <biz-checkbox ?disabled=${true} .checked=${true}>Disabled Checked</biz-checkbox>
      <biz-checkbox ?readonly=${true} .checked=${true}>Readonly Checked</biz-checkbox>
      <biz-checkbox ?error=${true}>Error State</biz-checkbox>
    </div>
  `,
};

export const InteractiveA11y: Story = {
    args: {
        required: true,
        error: false,
        defaultSlot: '필수 약관 동의',
        descriptionSlot: '스크린 리더 사용자를 위한 aria-describedby 연결 설명',
    },
};

export const ChangeEvent: Story = {
  args: {
    value: 'terms-agree',
    defaultSlot: '상태 변경 시 change 이벤트 발생 (체크여부와 value값 리턴)',
    onChange: fn(e => alert(JSON.stringify(e.detail))),
  },
  render: (args) => html`
    <biz-checkbox
      value=${args.value}
      @change=${args.onChange}
    >
      ${args.defaultSlot}
    </biz-checkbox>
  `,
};

export const FocusEvent: Story = {
  args: {
    defaultSlot: '포커스 진입 시 focus 이벤트 발생 (Actions 탭 확인), 이벤트만 전파합니다.',
  },
  render: (args) => html`
    <biz-checkbox
      @focus=${args.onFocus}
    >
      ${args.defaultSlot}
    </biz-checkbox>
  `,
};

export const BlurEvent: Story = {
  args: {
    defaultSlot: '포커스 해제 시 blur 이벤트 발생 (Actions 탭 확인), 이벤트만 전파합니다.',
  },
  render: (args) => html`
    <biz-checkbox
      @blur=${args.onBlur}
    >
      ${args.defaultSlot}
    </biz-checkbox>
  `,
};