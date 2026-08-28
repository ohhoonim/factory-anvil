import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import type { TextInputHost } from './TextInput.ts';
import './TextInput.wc.ts';

type Args = Required<TextInputHost> & {
  labelSlot?: string;
  startSlot?: string;
  endSlot?: string;
  helperTextSlot?: string;
};

const meta: Meta<Args> = {
  title: 'Components/Forms/TextInput',
  component: 'biz-text-input',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
      description: '입력 필드 스타일 형태'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '입력 필드 크기'
    },
    value: { control: 'text', description: '입력 값' },
    type: { control: 'text', description: 'HTML 입력 타입' },
    placeholder: { control: 'text', description: '플레이스홀더 텍스트' },
    required: { control: 'boolean', description: '필수 입력 여부' },
    readonly: { control: 'boolean', description: '읽기 전용 여부' },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    error: { control: 'boolean', description: '유효성 에러 상태 여부' },
    clearable: { control: 'boolean', description: '초기화 버튼 노출 여부' },
    fullWidth: { control: 'boolean', description: '부모 너비 100% 여부' },
    loading: { control: 'boolean', description: '로딩 스피너 표시 여부' },
    labelSlot: { control: 'text', description: 'label-slot 영역 컨텐츠' },
    startSlot: { control: 'text', description: 'start-slot 영역 컨텐츠' },
    endSlot: { control: 'text', description: 'end-slot 영역 컨텐츠' },
    helperTextSlot: { control: 'text', description: 'helper-text-slot 영역 컨텐츠' },
    direction: {
        control: { type: 'inline-radio' },
        options: ['vertical', 'horizontal'],
        description: '레이아웃 방향 (세로 / 가로)'
    }
  },
  args: {
    value: '',
    type: 'text',
    placeholder: '텍스트를 입력하세요',
    required: false,
    readonly: false,
    disabled: false,
    error: false,
    clearable: false,
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    loading: false,
    labelSlot: '레이블',
    startSlot: '',
    endSlot: '',
    helperTextSlot: '도움말 문구입니다.',
    handleInput: fn(),
    handleChange: fn(),
    handleFocus: fn(),
    handleBlur: fn(),
    handleClear: fn(),
    handleKeyDown: fn(),
    direction: 'vertical',
  },
  render: (args) => html`
    <biz-text-input
      .value="${args.value}"
      .type="${args.type}"
      .placeholder="${args.placeholder}"
      ?required="${args.required}"
      ?readonly="${args.readonly}"
      ?disabled="${args.disabled}"
      ?error="${args.error}"
      ?clearable="${args.clearable}"
      .variant="${args.variant}"
      .size="${args.size}"
      ?full-width="${args.fullWidth}"
      ?loading="${args.loading}"
      .direction="${args.direction}"
      @input="${args.handleInput}"
      @change="${args.handleChange}"
      @focus="${args.handleFocus}"
      @blur="${args.handleBlur}"
      @clear="${args.handleClear}"
      @keydown="${args.handleKeyDown}"
    >
      ${args.labelSlot ? html`<label slot="label-slot">${args.labelSlot}</label>` : ''}
      ${args.startSlot ? html`<span slot="start-slot">${args.startSlot}</span>` : ''}
      ${args.endSlot ? html`<span slot="end-slot">${args.endSlot}</span>` : ''}
      ${args.helperTextSlot ? html`<span slot="helper-text-slot">${args.helperTextSlot}</span>` : ''}
    </biz-text-input>
  `
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Directions: Story = {
    args:  {
        "fullWidth": false,
    },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 24px;" >
      <biz-text-input ...${args} direction="vertical">
        <label slot="label-slot">Vertical Direction</label>
      </biz-text-input>
      <biz-text-input ...${args} direction="horizontal">
        <label slot="label-slot">Horizontal Direction</label>
      </biz-text-input>
    </div>
  `
};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-text-input ...${args} variant="outlined">
        <label slot="label-slot">Outlined Variant</label>
      </biz-text-input>
      <biz-text-input ...${args} variant="filled">
        <label slot="label-slot">Filled Variant</label>
      </biz-text-input>
      <biz-text-input ...${args} variant="standard">
        <label slot="label-slot">Standard Variant</label>
      </biz-text-input>
    </div>
  `
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-text-input ...${args} size="small">
        <label slot="label-slot">Small Size</label>
      </biz-text-input>
      <biz-text-input ...${args} size="medium">
        <label slot="label-slot">Medium Size</label>
      </biz-text-input>
      <biz-text-input ...${args} size="large">
        <label slot="label-slot">Large Size</label>
      </biz-text-input>
    </div>
  `
};

export const States: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-text-input ...${args} disabled value="비활성화된 값">
        <label slot="label-slot">Disabled State</label>
      </biz-text-input>
      <biz-text-input ...${args} readonly value="읽기 전용 값">
        <label slot="label-slot">Readonly State</label>
      </biz-text-input>
      <biz-text-input ...${args} error value="잘못된 입력값">
        <label slot="label-slot">Error State</label>
        <span slot="helper-text-slot">유효하지 않은 입력입니다.</span>
      </biz-text-input>
      <biz-text-input ...${args} loading value="처리 중...">
        <label slot="label-slot">Loading State</label>
      </biz-text-input>
    </div>
  `
};

export const InteractiveEvents: Story = {
  args: {
    clearable: true,
    value: '초기화 가능한 텍스트',
    labelSlot: '이벤트 검증 입력 필드',
    helperTextSlot: '입력, 포커스, 초기화 이벤트를 테스트하세요.'
  }
};
