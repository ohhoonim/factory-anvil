import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import type { NumberInputHost } from './NumberInput.js';
import './NumberInput.wc.js';

type NumberInputArgs = Required<NumberInputHost> & {
  labelText: string;
  prefixText: string;
  suffixText: string;
  helperText: string;
  decrementIcon: string;
  incrementIcon: string;
  onInput: (e: CustomEvent) => void;
  onChange: (e: CustomEvent) => void;
  onStepUp: (e: CustomEvent) => void;
  onStepDown: (e: CustomEvent) => void;
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
  onClear: (e: CustomEvent) => void;
};

const meta: Meta<NumberInputArgs> = {
  title: 'Components/Forms/NumberInput',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    precision: { control: 'number' },
    controls: { control: 'boolean' },
    controlsPosition: {
      control: { type: 'select' },
      options: ['end', 'stacked', 'split'],
    },
    useGrouping: { control: 'boolean' },
    required: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    fullWidth: { control: 'boolean' },
    placeholder: { control: 'text' },
    labelText: { control: 'text' },
    prefixText: { control: 'text' },
    suffixText: { control: 'text' },
    helperText: { control: 'text' },
    decrementIcon: { control: 'text' },
    incrementIcon: { control: 'text' },
  },
  args: {
    value: 1000,
    min: 0,
    max: 10000,
    step: 100,
    precision: 0,
    controls: true,
    controlsPosition: 'end',
    useGrouping: true,
    required: false,
    readonly: false,
    disabled: false,
    error: false,
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    placeholder: '수량을 입력하세요',
    formattedValue: '',
    isMinReached: false,
    isMaxReached: false,
    labelText: '수량 선택',
    prefixText: '₩',
    suffixText: '원',
    helperText: '최소 0원 이상 입력 가능합니다.',
    decrementIcon: '-',
    incrementIcon: '+',
    onInput: fn(),
    onChange: fn(),
    onStepUp: fn(),
    onStepDown: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClear: fn(),
  },
  render: (args) => html`
    <biz-number-input
      .value="${args.value}"
      .min="${args.min}"
      .max="${args.max}"
      .step="${args.step}"
      .precision="${args.precision}"
      ?controls="${args.controls}"
      controls-position="${args.controlsPosition}"
      ?use-grouping="${args.useGrouping}"
      ?required="${args.required}"
      ?readonly="${args.readonly}"
      ?disabled="${args.disabled}"
      ?error="${args.error}"
      variant="${args.variant}"
      size="${args.size}"
      ?full-width="${args.fullWidth}"
      placeholder="${args.placeholder}"
      @input="${args.onInput}"
      @change="${args.onChange}"
      @step-up="${args.onStepUp}"
      @step-down="${args.onStepDown}"
      @focus="${args.onFocus}"
      @blur="${args.onBlur}"
      @clear="${args.onClear}"
    >
      ${args.labelText ? html`<label slot="label-slot">${args.labelText}</label>` : ''}
      ${args.prefixText ? html`<span slot="prefix-slot">${args.prefixText}</span>` : ''}
      ${args.suffixText ? html`<span slot="suffix-slot">${args.suffixText}</span>` : ''}
      ${args.decrementIcon ? html`<span slot="decrement-icon-slot">${args.decrementIcon}</span>` : ''}
      ${args.incrementIcon ? html`<span slot="increment-icon-slot">${args.incrementIcon}</span>` : ''}
      ${args.helperText ? html`<span slot="helper-text-slot">${args.helperText}</span>` : ''}
    </biz-number-input>
  `,
};

export default meta;
type Story = StoryObj<NumberInputArgs>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-number-input .value="${100}" variant="outlined">
        <label slot="label-slot">Outlined (Default)</label>
      </biz-number-input>

      <biz-number-input .value="${200}" variant="filled">
        <label slot="label-slot">Filled</label>
      </biz-number-input>

      <biz-number-input .value="${300}" variant="standard">
        <label slot="label-slot">Standard</label>
      </biz-number-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-number-input .value="${10}" size="small">
        <label slot="label-slot">Small Size</label>
      </biz-number-input>

      <biz-number-input .value="${20}" size="medium">
        <label slot="label-slot">Medium Size (Default)</label>
      </biz-number-input>

      <biz-number-input .value="${30}" size="large">
        <label slot="label-slot">Large Size</label>
      </biz-number-input>
    </div>
  `,
};

export const ControlsPosition: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-number-input .value="${50}" controls-position="end">
        <label slot="label-slot">End Controls (Default)</label>
      </biz-number-input>

      <biz-number-input .value="${50}" controls-position="stacked">
        <label slot="label-slot">Stacked Controls</label>
      </biz-number-input>

      <biz-number-input .value="${50}" controls-position="split">
        <label slot="label-slot">Split Controls</label>
      </biz-number-input>
    </div>
  `,
};

export const States: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      <biz-number-input .value="${1000}" disabled>
        <label slot="label-slot">Disabled</label>
        <span slot="helper-text-slot">수정할 수 없는 비활성화 상태입니다.</span>
      </biz-number-input>

      <biz-number-input .value="${2000}" readonly>
        <label slot="label-slot">Readonly</label>
        <span slot="helper-text-slot">읽기 전용 상태입니다.</span>
      </biz-number-input>

      <biz-number-input .value="${-50}" .min="${0}" error>
        <label slot="label-slot">Error</label>
        <span slot="helper-text-slot">유효하지 않은 수치 데이터입니다.</span>
      </biz-number-input>
    </div>
  `,
};

export const InteractiveEvents: Story = {
  args: {
    value: 5,
    min: 0,
    max: 10,
    step: 1,
    labelText: '이벤트 캡처 시연',
    helperText: '버튼 클릭, 방향키 조작 시 이벤트가 방출됩니다.',
    onInput: fn(),
    onChange: fn(),
    onStepUp: fn(),
    onStepDown: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClear: fn(),
  },
};