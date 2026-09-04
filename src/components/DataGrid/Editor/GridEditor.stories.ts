import { fn } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './GridEditor.wc';
import type { GridEditorHost, ValidationRule, SelectOption } from './GridEditor';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

type Args = Required<GridEditorHost> & {
  'custom-input'?: string;
  'validation-error': ReturnType<typeof fn>;
  'cell-commit': ReturnType<typeof fn>;
  'cell-cancel': ReturnType<typeof fn>;
};

const meta: Meta<Args> = {
  title: 'DataGrid/GridEditor',
  tags: ['autodocs'],
  argTypes: {
    columnKey: { control: 'text' },
    rowIndex: { control: 'number' },
    value: { control: 'object' },
    type: {
      control: 'select',
      options: ['text', 'number', 'select', 'date'],
    },
    options: { control: 'object', 
      description: 'type이 select일때, {label: "", value: ""} 형식입니다. ' },
    validationRules: { control: 'object',
      description: '{ required, min, max, pattern, custom }',
    },
    editValue: { control: 'object' },
    isValid: { control: 'boolean' },
    errorMessage: { control: 'text' },
    'custom-input': { control: 'text', table: {category: 'slots'} },
    'validation-error': {
      description: `입력된 값의 형식이 올바르지 않을때. isValid == false
      validationRules를 참고하세요. 
      `,
      table: {category: 'events'}},
    'cell-commit': {
      description: 'Enter key를 누르면 동작합니다.', 
      table: {category: 'events'}},
    'cell-cancel': {
      description: 'Esc 키를 누르면 동작합니다.', 
      table: {category: 'events'}}
  },
  args: {
    columnKey: 'userName',
    rowIndex: 0,
    value: '홍길동',
    type: 'text',
    options: [],
    validationRules: null,
    editValue: '홍길동',
    isValid: true,
    errorMessage: '',
    'validation-error': fn(),
    'cell-commit': fn(),
    'cell-cancel': fn(),
  },
  render: (args) => html`
    <grid-editor
      .columnKey=${args.columnKey}
      .rowIndex=${args.rowIndex}
      .value=${args.value}
      .type=${args.type}
      .options=${args.options}
      .validationRules=${args.validationRules}
      @cell-commit=${(e: CustomEvent) => args['cell-commit'](e.detail) }
      @cell-cancel=${(e: CustomEvent) => args['cell-cancel'](e.detail)}
      @validation-error=${(e: CustomEvent) => args['validation-error'](e.detail)} 
    >
      ${args['custom-input']
        ? html`<div slot="custom-input">${unsafeHTML(args['custom-input'])}</div>`
        : ''}
    </grid-editor>
  `,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    value: '홍길동',
    type: 'text',
  },
};

export const NumberInput: Story = {
  args: {
    columnKey: 'age',
    value: 25,
    type: 'number',
  },
};

export const SelectInput: Story = {
  args: {
    columnKey: 'role',
    value: 'admin',
    type: 'select',
    options: [
      { label: '관리자', value: 'admin' },
      { label: '일반 사용자', value: 'user' },
      { label: '게스트', value: 'guest' },
    ],
  },
};

export const DateInput: Story = {
  args: {
    columnKey: 'createdAt',
    value: '2026-09-01',
    type: 'date',
  },
};

export const InvalidState: Story = {
  args: {
    columnKey: 'email',
    value: 'invalid-email',
    type: 'text',
    isValid: false,
    errorMessage: '유효하지 않은 이메일 형식입니다.',
    validationRules: {
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    },
  },
};

export const CustomSlotInput: Story = {
  args: {
    'custom-input': '커스텀 슬롯 컴포넌트 영역입니다.',
  },
};

export const CellCommitEvent: Story = {
  args: {
    columnKey: 'userName',
    rowIndex: 1,
    value: '이순신',
    type: 'text',
  },
};

export const CellCancelEvent: Story = {
  args: {
    columnKey: 'userName',
    rowIndex: 1,
    value: '강감찬',
    type: 'text',
  },
};

export const ValidationErrorEvent: Story = {
  args: {
    columnKey: 'age',
    rowIndex: 2,
    value: -5,
    type: 'number',
    validationRules: {
      min: 0,
    },
  },
};