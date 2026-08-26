import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './FormWrapper.wc';
import type { FormWrapperHost } from './FormWrapper';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

type FormWrapperStoryArgs = Required<FormWrapperHost> & {
  defaultSlot: string;
  labelSlot: string;
  helperTextSlot: string;
  extraSlot: string;
  "helper-text": string;
  "error-message": string;
  "success-message": string;
  "label-width": string;
  "full-width": boolean;
  _generatedId: object;
  helperTextId: string;
};

const meta: Meta<FormWrapperStoryArgs> = {
  title: 'Components/Layout/FormWrapper',
  component: 'biz-form-wrapper',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    required: { control: 'boolean' },
    helperText: { control: 'text' },
    "helper-text": { table: {disable: true} },
    errorMessage: { 
      description: '빨간 글자로 표시됨',
      control: 'text' 
    },
    "error-message": { table: {disable: true} },
    successMessage: { 
      description: '`errorMessage`가 비어있어야 합니다.',
      control: 'text' 
    },
    "success-message": { table: {disable: true} },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'inline'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: { control: 'boolean' },
    "full-width": { table: { disable: true}},
    labelWidth: { control: 'text' },
    "label-width": { table: { disable: true} },
    disabled: { control: 'boolean' },
    defaultSlot: { 
      name: '(default)',
      description: '단일 입력 컴포넌트 주입 영역',
      control: {type: 'text'},
      table: {category: 'slots', type: {summary: 'string | HTMLElement'}}
    },
    labelSlot: { 
      name: 'label-slot',
      description: '상단/좌측 레이블 영역',
      control: {type: 'text'},
      table: {category: 'slots', type: {summary: 'string | HTMLElement'}}
    },
    helperTextSlot: {
      name: 'helper-text-slot',
      description: '하단 안내/에러/성공 메시지 영역',
      control: {type: 'text'},
      table: {category: 'slots', type: {summary: 'string | HTMLElement'}}
    },
    extraSlot: {
      name: 'extra-slot',
      description: '레이블 우측 부가 영역 (툴팁, 링크 등',
      control: {type: 'text'},
      table: {category: 'slots', type: {summary: 'string | HTMLElement'}}
    },
    handleLabelClick: {table: {disable: true}},
    handleSlotChange: {table: {disable: true}},
    _generatedId: {table: {disable: true}},
    helperTextId: {table: {disable: true}},
  },
  args: {
    label: '이메일 주소',
    required: false,
    helperText: '로그인에 사용할 이메일을 입력하세요.',
    errorMessage: '',
    successMessage: '',
    layout: 'vertical',
    size: 'medium',
    fullWidth: false,
    labelWidth: '420px',
    disabled: false,
    helperTextId: '',
    handleLabelClick: () => {},
    handleSlotChange: () => {},
    defaultSlot: '<input type="email" placeholder="example@biz.com" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" />',
    labelSlot: '',
    helperTextSlot: '',
    extraSlot: '',
  },
  render: (args) => html`
    <biz-form-wrapper
      .label="${args.label}"
      ?required="${args.required}"
      .helperText="${args.helperText}"
      .errorMessage="${args.errorMessage}"
      .successMessage="${args.successMessage}"
      .layout="${args.layout}"
      .size="${args.size}"
      ?full-width="${args.fullWidth}"
      .labelWidth="${args.labelWidth}"
      ?disabled="${args.disabled}"
    >
      ${args.labelSlot ? html`<span slot="label-slot">${unsafeHTML(args.labelSlot)}</span>` : ''}
      ${args.extraSlot ? html`<span slot="extra-slot">${unsafeHTML(args.extraSlot)}</span>` : ''}
      ${unsafeHTML(args.defaultSlot)}
      ${args.helperTextSlot ? html`<span slot="helper-text-slot">${unsafeHTML(args.helperTextSlot)}</span>` : ''}
    </biz-form-wrapper>
  `,
};

export default meta;

type Story = StoryObj<FormWrapperStoryArgs>;

export const Default: Story = {};

export const RequiredField: Story = {
  args: {
    required: true,
  },
};

export const VerticalLayout: Story = {
  args: {
    layout: 'vertical',
  },
};

export const HorizontalLayout: Story = {
  args: {
    layout: 'horizontal',
    labelWidth: '140px',
  },
};

export const InlineLayout: Story = {
  args: {
    layout: 'inline',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'small',
  },
};

export const MediumSize: Story = {
  args: {
    size: 'medium',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'large',
  },
};

export const ErrorState: Story = {
  args: {
    errorMessage: '유효한 이메일 형식이 아닙니다.',
  },
};

export const SuccessState: Story = {
  args: {
    successMessage: '사용 가능한 이메일입니다.',
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
  },
};

export const WithExtraSlot: Story = {
  args: {
    extraSlot: '<a href="#" style="font-size: 12px; color: #2563eb; text-decoration: none;">도움말</a>',
  },
};