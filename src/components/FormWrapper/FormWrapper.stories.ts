import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './FormWrapper.wc';

const meta: Meta = {
  title: 'Components/Layout/FormWrapper',
  component: 'biz-form-wrapper',
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'inline']
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    labelWidth: { control: 'text' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    successMessage: { control: 'text' }
  },
  args: {
    label: '사용자 이름',
    layout: 'vertical',
    required: false,
    disabled: false,
    fullWidth: false,
    helperText: '올바른 성명을 입력하세요.'
  },
  render: (args) => html`
    <biz-form-wrapper
      .label=${args.label}
      .layout=${args.layout}
      ?required=${args.required}
      ?disabled=${args.disabled}
      ?full-width=${args.fullWidth}
      .labelWidth=${args.labelWidth}
      .helperText=${args.helperText}
      .errorMessage=${args.errorMessage}
      .successMessage=${args.successMessage}
    >
      <input type="text" placeholder="입력하세요1" style="width: 100%; padding: 8px; box-sizing: border-box;" />
    </biz-form-wrapper>
  `
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Vertical: Story = {
  args: {
    layout: 'vertical',
    label: '수직 레이아웃 (Vertical)',
    helperText: '기본 수직 정렬 레이아웃입니다.'
  }
};

export const Horizontal: Story = {
  args: {
    layout: 'horizontal',
    label: '수평 레이아웃',
    labelWidth: '140px',
    helperText: '좌측 레이블 고정 너비가 적용된 레이아웃입니다.'
  }
};

export const Inline: Story = {
  args: {
    layout: 'inline',
    label: '인라인',
    helperText: '한 줄로 배치되는 축소형 레이아웃입니다.'
  }
};

export const Required: Story = {
  args: {
    label: '필수 입력 항목',
    required: true
  }
};

export const ErrorState: Story = {
  args: {
    label: '이메일 주소',
    errorMessage: '유효하지 않은 이메일 형식입니다.'
  }
};

export const SuccessState: Story = {
  args: {
    label: '아이디',
    successMessage: '사용 가능한 아이디입니다.'
  }
};

export const Disabled: Story = {
  args: {
    label: '비활성화 필드',
    disabled: true,
    helperText: '수정할 수 없는 항목입니다.'
  }
};
