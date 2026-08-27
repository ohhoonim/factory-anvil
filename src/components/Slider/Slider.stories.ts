import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { fn } from 'storybook/test';
import './Slider.wc.js';
import type { SliderHost } from './Slider.js';

type SliderArgs = Required<SliderHost> & {
  labelSlot?: string;
  prefixIconSlot?: string;
  suffixIconSlot?: string;
  tooltipSlot?: string;
  tickLabelSlot?: string;
  helperTextSlot?: string;
  onInput?: (e: CustomEvent) => void;
  onChange?: (e: CustomEvent) => void;
  onClear?: (e: CustomEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
};

const meta: Meta<SliderArgs> = {
  title: 'Components/Forms/Slider',
  component: 'biz-slider',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: '선택된 수치 값 (Single: 단일 숫자, Range: [start, end])',
    },
    min: {
      control: 'number',
      description: '최소 수치',
    },
    max: {
      control: 'number',
      description: '최대 수치',
    },
    step: {
      control: 'number',
      description: '이동 수치 간격',
    },
    mode: {
      control: 'radio',
      options: ['single', 'range'],
      description: '동작 모드',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: '배치 방향',
    },
    showTicks: {
      control: 'boolean',
      description: '눈금 표시 여부',
    },
    showTooltip: {
      control: 'select',
      options: ['always', 'hover', 'drag', 'never'],
      description: '툴팁 노출 조건',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: '컴포넌트 크기',
    },
    variant: {
      control: 'radio',
      options: ['standard', 'outlined', 'filled'],
      description: '컴포넌트 형태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    readonly: {
      control: 'boolean',
      description: '읽기 전용 여부',
    },
    error: {
      control: 'boolean',
      description: '에러 상태 여부',
    },
    labelSlot: {
      control: 'text',
      description: '상단 타이틀 레이블 슬롯',
    },
    prefixIconSlot: {
      control: 'text',
      description: '좌측/최소값 위치 아이콘 슬롯',
    },
    suffixIconSlot: {
      control: 'text',
      description: '우측/최대값 위치 아이콘 슬롯',
    },
    helperTextSlot: {
      control: 'text',
      description: '하단 안내 메시지 슬롯',
    },
  },
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    mode: 'single',
    orientation: 'horizontal',
    showTicks: false,
    showTooltip: 'hover',
    formatTooltip: null,
    readonly: false,
    disabled: false,
    error: false,
    size: 'medium',
    variant: 'standard',
    draggingIndex: null,
    activeThumbIndex: null,
    handleTrackClick: () => {},
    handleThumbMouseDown: () => {},
    handleThumbKeyDown: () => {},
    handleThumbFocus: () => {},
    handleThumbBlur: () => {},
    handleThumbMouseEnter: () => {},
    handleThumbMouseLeave: () => {},
    labelSlot: '볼륨 조절',
    prefixIconSlot: '🔈',
    suffixIconSlot: '🔊',
    tooltipSlot: '',
    tickLabelSlot: '',
    helperTextSlot: '적절한 음량을 선택하세요.',
    onInput: fn(),
    onChange: fn(),
    onClear: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  render: (args) => html`
    <biz-slider
      .value=${args.value}
      .min=${args.min}
      .max=${args.max}
      .step=${args.step}
      .mode=${args.mode}
      .orientation=${args.orientation}
      ?show-ticks=${args.showTicks}
      .show-tooltip=${args.showTooltip}
      .formatTooltip=${args.formatTooltip}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?error=${args.error}
      .size=${args.size}
      .variant=${args.variant}
      @input=${args.onInput}
      @change=${args.onChange}
      @clear=${args.onClear}
      @focus=${args.onFocus}
      @blur=${args.onBlur}
    >
      ${args.labelSlot ? html`<span slot="label-slot">${args.labelSlot}</span>` : ''}
      ${args.prefixIconSlot ? html`<span slot="prefix-icon-slot">${args.prefixIconSlot}</span>` : ''}
      ${args.suffixIconSlot ? html`<span slot="suffix-icon-slot">${args.suffixIconSlot}</span>` : ''}
      ${args.tooltipSlot ? html`<span slot="tooltip-slot">${args.tooltipSlot}</span>` : ''}
      ${args.tickLabelSlot ? html`<span slot="tick-label-slot">${args.tickLabelSlot}</span>` : ''}
      ${args.helperTextSlot ? html`<span slot="helper-text-slot">${args.helperTextSlot}</span>` : ''}
    </biz-slider>
  `,
};

export default meta;
type Story = StoryObj<SliderArgs>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
      <div>
        <p style="margin-bottom: 8px; font-weight: bold;">Standard</p>
        <biz-slider .value=${30} variant="standard">
          <span slot="label-slot">Standard Variant</span>
        </biz-slider>
      </div>
      <div>
        <p style="margin-bottom: 8px; font-weight: bold;">Outlined</p>
        <biz-slider .value=${50} variant="outlined">
          <span slot="label-slot">Outlined Variant</span>
        </biz-slider>
      </div>
      <div>
        <p style="margin-bottom: 8px; font-weight: bold;">Filled</p>
        <biz-slider .value=${70} variant="filled">
          <span slot="label-slot">Filled Variant</span>
        </biz-slider>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
      <biz-slider .value=${30} size="small">
        <span slot="label-slot">Small Size</span>
      </biz-slider>
      <biz-slider .value=${50} size="medium">
        <span slot="label-slot">Medium Size</span>
      </biz-slider>
      <biz-slider .value=${70} size="large">
        <span slot="label-slot">Large Size</span>
      </biz-slider>
    </div>
  `,
};

export const RangeMode: Story = {
  args: {
    mode: 'range',
    value: [20, 80],
    labelSlot: '가격 범위 선택',
    prefixIconSlot: '₩',
    suffixIconSlot: '₩',
    helperTextSlot: '최소 및 최대 가격 범위를 설정하세요.',
  },
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
      <biz-slider .value=${40} disabled>
        <span slot="label-slot">Disabled State</span>
        <span slot="helper-text-slot">비활성화 상태입니다.</span>
      </biz-slider>
      <biz-slider .value=${60} readonly>
        <span slot="label-slot">Readonly State</span>
        <span slot="helper-text-slot">읽기 전용 상태입니다.</span>
      </biz-slider>
      <biz-slider .value=${90} error>
        <span slot="label-slot">Error State</span>
        <span slot="helper-text-slot">허용 범위를 초과했습니다.</span>
      </biz-slider>
    </div>
  `,
};

export const EventHandlers: Story = {
  args: {
    labelSlot: '이벤트 핸들러 테스트',
    onInput: fn(),
    onChange: fn(),
    onClear: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};