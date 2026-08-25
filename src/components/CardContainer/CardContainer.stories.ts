import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './CardContainer.wc';
import { html } from 'lit';
import type { CardContainerHost } from './CardContainer';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { fn } from 'storybook/test';

type Args = Required<CardContainerHost> & {
  contents: string;
  headerSlot?: string;
  footerSlot?: string;
  "full-width": boolean;
  "bordered-divider": boolean;
  "aria-labelledby"?: string;
};
const meta: Meta<Args> = {
  title: 'Components/Layout/CardContainer',
  component: 'biz-card-container',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'elevated'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    fullWidth: { table: { disable: true } },
    "full-width": { 
      control: 'boolean' ,
      description: '너비 100% 확장 여부' 
    },
    borderedDivider: { table: { disable: true } },
    "bordered-divider": { 
      control: 'boolean' ,
      description: 'Header, Body, Footer 사이 구분선 적용 여부',
    },
    hoverable: { control: 'boolean' ,
      description: '마우스 오버 시 인터랙션 스타일 적용 여부',
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    ariaLabelledby: { table: { disable: true } },
    "aria-labelledby": { control: 'boolean' },
    contents: {
      name: 'default (slot)',
      control: { type: 'text' },
      description: '카드 본문 ',
      table: { category: 'slots', type: { summary: 'string | HTMLElement' } },
    },
    headerSlot: {
      name: "header-slot",
      control: { type: 'text' },
      description: '카드 상단 ',
      table: { category: 'slots', type: { summary: 'string | HTMLElement' } },
    },
    footerSlot: {
      name: "footer-slot",
      control: { type: 'text' },
      description: '카드 하단 ',
      table: { category: 'slots', type: { summary: 'string | HTMLElement' } },
    },
  },
  args: {
    variant: 'outlined',
    size: 'medium',
    fullWidth: true,
    borderedDivider: true,
    hoverable: false,
    disabled: false,
    loading: false,
    contents: '카드 메인 <p> paragraph </p> ',
    headerSlot: '<b>카드 타이틀</b>',
    footerSlot: '<button>확인</button>',

  },
  render: (args) => html`
    <biz-card-container
      .variant=${args.variant}
      .size=${args.size}
      ?full-width=${args.fullWidth}
      ?bordered-divider=${args.borderedDivider}
      ?hoverable=${args.hoverable}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      aria-labelledby="card-title"
    >
      ${args.headerSlot ? html`<div slot="header-slot">${unsafeHTML(args.headerSlot)} </div>` : ''}
      ${unsafeHTML(args.contents)}
      ${args.footerSlot ? html`<div slot="footer-slot">${unsafeHTML(args.footerSlot)}</div>` : ''}
      
    </biz-card-container>
  `,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <biz-card-container variant="outlined">
        <div slot="header-slot"><strong>Outlined</strong></div>
        <p>테두리 중심 스타일입니다.</p>
      </biz-card-container>
      <biz-card-container variant="filled">
        <div slot="header-slot"><strong>Filled</strong></div>
        <p>배경색 중심 스타일입니다.</p>
      </biz-card-container>
      <biz-card-container variant="elevated">
        <div slot="header-slot"><strong>Elevated</strong></div>
        <p>그림자 효과 중심 스타일입니다.</p>
      </biz-card-container>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-card-container size="small">
        <div slot="header-slot"><strong>Small Size</strong></div>
        <p>패딩 12px 규격</p>
      </biz-card-container>
      <biz-card-container size="medium">
        <div slot="header-slot"><strong>Medium Size</strong></div>
        <p>패딩 16px 규격</p>
      </biz-card-container>
      <biz-card-container size="large">
        <div slot="header-slot"><strong>Large Size</strong></div>
        <p>패딩 24px 규격</p>
      </biz-card-container>
    </div>
  `,
};

export const States: Story = {

  render: (args) => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <biz-card-container hoverable>
        <div slot="header-slot"><strong>Hoverable State</strong></div>
        <p>마우스 오버 및 포커스 시 인터랙션 피드백을 제공합니다.</p>
      </biz-card-container>
      <biz-card-container hoverable @card-click=${
        (e: MouseEvent) => {
          alert(JSON.stringify(e.detail));
        }
      }>
        <div slot="header-slot"><strong>Click 이벤트</strong></div>
        <p>카드 클릭시 card-click 이벤트를 발행합니다.</p>
      </biz-card-container>
      <biz-card-container disabled>
        <div slot="header-slot"><strong>Disabled State</strong></div>
        <p>비활성화 상태로 인터랙션이 불가합니다.</p>
      </biz-card-container>
      <biz-card-container loading>
        <div slot="header-slot"><strong>Loading State</strong></div>
        <p>로딩 스피너 오버레이가 상단에 표시됩니다.</p>
      </biz-card-container>
    </div>
  `,
};

export const BorderedDivider: Story = {
  args: {
    borderedDivider: true,
  },
};