import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { fn } from 'storybook/test';
import './Rating.wc.js';
import type { RatingHost } from './Rating.js';

type RatingStoryArgs = Required<RatingHost> & {
  iconFilledSlot?: string;
  iconEmptySlot?: string;
  valueLabelSlot?: string;
  helperTextSlot?: string;
};

const meta: Meta<RatingStoryArgs> = {
  title: 'Components/Forms/Rating',
  component: 'biz-rating',
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 10, step: 0.1 },
      description: '현재 설정된 평점 값',
    },
    max: {
      control: { type: 'number', min: 1, max: 10 },
      description: '표시할 최대 아이콘 개수 및 점수',
    },
    precision: {
      control: { type: 'select' },
      options: [1, 0.5, 0.1],
      description: '선택 및 표출 단위 (1: Full, 0.5: Half, 소수점)',
    },
    allowClear: {
      control: { type: 'boolean' },
      description: '선택된 점수 재클릭 시 0점 초기화 허용 여부',
    },
    readonly: {
      control: { type: 'boolean' },
      description: '읽기 전용 상태 여부',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태 여부',
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: '아이콘 호버 시 점수 툴팁 노출 여부',
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
      description: '아이콘 크기 규격',
    },
    name: {
      control: { type: 'text' },
      description: '폼 제출 시 사용할 input name',
    },
    hoverValue: {
      table: { disable: true },
    },
    iconFilledSlot: {
      control: { type: 'text' },
      description: 'icon-filled-slot 슬롯 콘텐츠',
    },
    iconEmptySlot: {
      control: { type: 'text' },
      description: 'icon-empty-slot 슬롯 콘텐츠',
    },
    valueLabelSlot: {
      control: { type: 'text' },
      description: 'value-label-slot 슬롯 콘텐츠',
    },
    helperTextSlot: {
      control: { type: 'text' },
      description: 'helper-text-slot 슬롯 콘텐츠',
    },
  },
  args: {
    value: 3,
    max: 5,
    precision: 1,
    allowClear: false,
    readonly: false,
    disabled: false,
    showTooltip: false,
    size: 'md',
    name: 'rating',
    hoverValue: null,
    handleMouseMove: fn(),
    handleMouseLeave: fn(),
    handleClick: fn(),
    handleKeyDown: fn(),
  },
  render: (args) => html`
    <biz-rating
      .value=${args.value}
      .max=${args.max}
      .precision=${args.precision}
      ?allow-clear=${args.allowClear}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?show-tooltip=${args.showTooltip}
      .size=${args.size}
      .name=${args.name}
     
    >
      ${args.iconFilledSlot
        ? html`<span slot="icon-filled-slot">${args.iconFilledSlot}</span>`
        : ''}
      ${args.iconEmptySlot
        ? html`<span slot="icon-empty-slot">${args.iconEmptySlot}</span>`
        : ''}
      ${args.valueLabelSlot
        ? html`<span slot="value-label-slot">${args.valueLabelSlot}</span>`
        : ''}
      ${args.helperTextSlot
        ? html`<span slot="helper-text-slot">${args.helperTextSlot}</span>`
        : ''}
    </biz-rating>
  `,
};

export default meta;
type Story = StoryObj<RatingStoryArgs>;

export const Default: Story = {
  args: {
    value: 3,
    max: 5,
    valueLabelSlot: '3.0 / 5.0',
    helperTextSlot: '평점을 선택해주세요.',
  },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h4 style="margin: 0 0 8px 0;">Small (sm)</h4>
        <biz-rating size="sm" value="3"></biz-rating>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0;">Medium (md)</h4>
        <biz-rating size="md" value="3"></biz-rating>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0;">Large (lg)</h4>
        <biz-rating size="lg" value="3"></biz-rating>
      </div>
    </div>
  `,
};

export const PrecisionModes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h4 style="margin: 0 0 8px 0;">Full Star (precision: 1)</h4>
        <biz-rating precision="1" value="3"></biz-rating>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0;">Half Star (precision: 0.5)</h4>
        <biz-rating precision="0.5" value="3.5"></biz-rating>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0;">Fractional Readonly (precision: 0.1)</h4>
        <biz-rating precision="0.1" value="3.7" readonly></biz-rating>
      </div>
    </div>
  `,
};

export const AllowClear: Story = {
  args: {
    value: 4,
    allowClear: true,
    helperTextSlot: '선택된 점수를 다시 클릭하면 0점으로 초기화됩니다 (clear 이벤트 방출).',
  },
};

export const Disabled: Story = {
  args: {
    value: 2.5,
    disabled: true,
    helperTextSlot: '비활성화된 상태입니다.',
  },
};

export const Readonly: Story = {
  args: {
    value: 4.2,
    precision: 0.1,
    readonly: true,
    valueLabelSlot: '4.2점 / 5.0점',
    helperTextSlot: '읽기 전용 상태입니다.',
  },
};

export const CustomSlots: Story = {
  args: {
    value: 4,
    iconFilledSlot: '❤️',
    iconEmptySlot: '🤍',
    valueLabelSlot: '4.0 / 5.0 (하트 평점)',
    helperTextSlot: '커스텀 아이콘 슬롯이 적용되었습니다.',
  },
};

export const InteractiveA11y: Story = {
  args: {
    value: 3,
    max: 5,
    precision: 0.5,
    showTooltip: true,
    valueLabelSlot: '키보드 방향키(←, →, ↑, ↓, Home, End)로 조작해보세요.',
  },
};