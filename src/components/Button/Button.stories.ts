import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './Button.wc.js';
import type { ButtonHost } from './Button.js';

type Args = Required<ButtonHost> & {
  label: string;
  startIcon?: string;
  endIcon?: string;
}

const meta: Meta<Args> = {
  title: 'Components/Forms/Button',
  component: 'biz-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'text'],
      description: '버튼 시각적 형태 옵션',
      table: { category: 'props' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '버튼 크기 옵션',
      table: { category: 'props' },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: '버튼의 기능적 동작 타입',
      table: { category: 'props' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 여부',
      table: { category: 'props' },
    },
    loading: {
      control: { type: 'boolean' },
      description: '로딩 상태 여부',
      table: { category: 'props' },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '너비 100% 확장 여부',
      table: { category: 'props' },
    },
    label: {
      name: 'default (slot)',
      control: { type: 'text' },
      description: '버튼 내 기본 슬롯 텍스트 콘텐츠',
      table: { category: 'slots', type: { summary: 'string | HTMLElement' } },
    },
    startIcon: {
      name: 'start-slot',
      control: { type: 'text' },
      description: '버튼 앞쪽에 위치하는 아이콘/요소 슬롯',
      table: { category: 'slots', type: { summary: 'HTMLElement' } },
    },
    endIcon: {
      name: 'end-slot',
      control: { type: 'text' },
      description: '버튼 뒤쪽에 위치하는 아이콘/요소 슬롯',
      table: { category: 'slots', type: { summary: 'HTMLElement' } },
    },
  },
  args: {
    variant: 'filled',
    size: 'medium',
    type: 'button',
    disabled: false,
    loading: false,
    fullWidth: false,
    label: 'Button',
    startIcon: '',
    endIcon: '',
  },
  render: (args) => html`
    <biz-button
      .variant=${args.variant}
      .size=${args.size}
      .type=${args.type}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      ?full-width=${args.fullWidth}
    >
      ${args.startIcon ? html`<span slot="start-slot">${args.startIcon}</span>` : ''}
      ${args.label}
      ${args.endIcon ? html`<span slot="end-slot">${args.endIcon}</span>` : ''}
    </biz-button>
  `,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    label: '기본 버튼',
  },
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <biz-button variant="filled">Filled (Primary)</biz-button>
      <biz-button variant="outlined">Outlined</biz-button>
      <biz-button variant="text">Text</biz-button>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <biz-button size="small">Small</biz-button>
      <biz-button size="medium">Medium</biz-button>
      <biz-button size="large">Large</biz-button>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 12px; align-items: center;">
        <biz-button disabled>Disabled (Filled)</biz-button>
        <biz-button variant="outlined" disabled>Disabled (Outlined)</biz-button>
        <biz-button variant="text" disabled>Disabled (Text)</biz-button>
      </div>
      <div style="display: flex; gap: 12px; align-items: center;">
        <biz-button loading>Loading (Filled)</biz-button>
        <biz-button variant="outlined" loading>Loading (Outlined)</biz-button>
        <biz-button variant="text" loading>Loading (Text)</biz-button>
      </div>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <biz-button>
        <span slot="start-slot">🚀</span>
        Start Icon
      </biz-button>
      <biz-button variant="outlined">
        End Icon
        <span slot="end-slot">➡️</span>
      </biz-button>
    </div>
  `,
};

export const FullWidth: Story = {
  render: () => html`
    <div style="width: 320px; padding: 16px; border: 1px dashed #ccc;">
      <biz-button full-width>Full Width Button</biz-button>
    </div>
  `,
};

export const Accessibility: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <biz-button aria-label="닫기">
        <span slot="start-slot">✕</span>
      </biz-button>
      <biz-button loading aria-label="데이터 처리 중입니다">
        저장하기
      </biz-button>
    </div>
  `,
};