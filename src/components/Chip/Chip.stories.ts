import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import type { ChipHost } from './Chip.js';
import './Chip.wc.js';

type Args = Required<ChipHost> & {
  'label-slot'?: string;
  'start-slot'?: string;
  'end-slot'?: string;
  'helper-text-slot'?: string;
  onChange?: (e: Event) => void;
  onChipAdd?: (e: Event) => void;
  onChipRemove?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onClear?: (e: Event) => void;
};

const meta: Meta<Args> = {
  title: 'Components/Forms/Chip',
  component: 'biz-chip',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
      description: 'Chip 컨테이너 형태 옵션',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Chip 및 컨테이너 크기',
    },
    value: {
      control: { type: 'object' },
      description: '입력된 키워드 칩들의 문자열 배열',
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
    maxChips: {
      control: { type: 'number' },
      description: '최대 허용 칩 개수',
    },
    allowDuplicates: {
      control: { type: 'boolean' },
      description: '중복 키워드 입력 허용 여부',
    },
    required: {
      control: { type: 'boolean' },
      description: '필수 입력 여부',
    },
    readonly: {
      control: { type: 'boolean' },
      description: '읽기 전용 여부',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 여부',
    },
    error: {
      control: { type: 'boolean' },
      description: '유효성 에러 상태 여부',
    },
    deletable: {
      control: { type: 'boolean' },
      description: '개별 칩 삭제 버튼 노출 여부',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '부모 요소 너비 100% 확장 여부',
    },
    'label-slot': {
      control: { type: 'text' },
      description: '상단/좌측 레이블 영역 슬롯',
    },
    'start-slot': {
      control: { type: 'text' },
      description: '최좌측 내부 주입 영역 슬롯',
    },
    'end-slot': {
      control: { type: 'text' },
      description: '최우측 내부 주입 영역 슬롯',
    },
    'helper-text-slot': {
      control: { type: 'text' },
      description: '하단 안내/에러 메시지 영역 슬롯',
    },
  },
  args: {
    value: ['React', 'Vue', 'Angular'],
    placeholder: '태그를 입력 후 Enter를 누르세요',
    delimiter: ['Enter', ','],
    maxChips: Infinity,
    allowDuplicates: false,
    required: false,
    readonly: false,
    disabled: false,
    error: false,
    deletable: true,
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    inputValue: '',
    focusedChipIndex: -1,
    liveMessage: '',
    helperTextId: 'biz-chip-helper-text',
    'label-slot': '기술 스택',
    'start-slot': '',
    'end-slot': '',
    'helper-text-slot': '쉼표(,) 또는 Enter 키로 태그를 추가할 수 있습니다.',
    onChange: fn(),
    onChipAdd: fn(),
    onChipRemove: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClear: fn(),
  },
  render: (args) => html`
    <biz-chip
      .value=${args.value}
      .placeholder=${args.placeholder}
      .delimiter=${args.delimiter}
      .maxChips=${args.maxChips}
      .allowDuplicates=${args.allowDuplicates}
      ?required=${args.required}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?error=${args.error}
      ?deletable=${args.deletable}
      .variant=${args.variant}
      .size=${args.size}
      ?full-width=${args.fullWidth}
      @change=${args.onChange}
      @chip-add=${args.onChipAdd}
      @chip-remove=${args.onChipRemove}
      @focus=${args.onFocus}
      @blur=${args.onBlur}
      @clear=${args.onClear}
    >
      ${args['label-slot'] ? html`<label slot="label-slot">${args['label-slot']}</label>` : ''}
      ${args['start-slot'] ? html`<span slot="start-slot">${args['start-slot']}</span>` : ''}
      ${args['end-slot'] ? html`<span slot="end-slot">${args['end-slot']}</span>` : ''}
      ${args['helper-text-slot'] ? html`<span slot="helper-text-slot">${args['helper-text-slot']}</span>` : ''}
    </biz-chip>
  `,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
      <biz-chip .value=${['Outlined']} variant="outlined">
        <label slot="label-slot">Outlined (기본)</label>
      </biz-chip>
      <biz-chip .value=${['Filled']} variant="filled">
        <label slot="label-slot">Filled</label>
      </biz-chip>
      <biz-chip .value=${['Standard']} variant="standard">
        <label slot="label-slot">Standard</label>
      </biz-chip>
    </div>
  `,
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
      <biz-chip .value=${['Small', 'Chip']} size="small">
        <label slot="label-slot">Small Size</label>
      </biz-chip>
      <biz-chip .value=${['Medium', 'Chip']} size="medium">
        <label slot="label-slot">Medium Size</label>
      </biz-chip>
      <biz-chip .value=${['Large', 'Chip']} size="large">
        <label slot="label-slot">Large Size</label>
      </biz-chip>
    </div>
  `,
};

export const States: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
      <biz-chip .value=${['Disabled', 'Tag']} disabled>
        <label slot="label-slot">Disabled 상태</label>
        <span slot="helper-text-slot">수정할 수 없는 상태입니다.</span>
      </biz-chip>
      <biz-chip .value=${['Readonly', 'Tag']} readonly>
        <label slot="label-slot">Readonly 상태</label>
        <span slot="helper-text-slot">읽기 전용 상태입니다.</span>
      </biz-chip>
      <biz-chip .value=${['Error', 'Tag']} error>
        <label slot="label-slot">Error 상태</label>
        <span slot="helper-text-slot" style="color: #dc2626;">올바르지 않은 값입니다.</span>
      </biz-chip>
    </div>
  `,
};

const alerting = (e: any) => alert(JSON.stringify(e.detail));

export const EventHandlers: Story = {
  args: {
    value: [],
    placeholder: '엔터를 누르거나 칩을 삭제하여 이벤트를 발생시키세요, ',
    onChange: fn(),
    onChipAdd: fn(alerting),
    onChipRemove: fn(alerting),
    onFocus: fn(),
    onBlur: fn(),
    onClear: fn(),
  },
};

export const Accessibility: Story = {
  args: {
    required: true,
    error: false,
    value: ['Accessibility', 'WAI-ARIA'],
    'label-slot': '접근성 준수 필드',
    'helper-text-slot': '스크린 리더에서 aria-describedby로 인지되는 안내 문구입니다.',
  },
};