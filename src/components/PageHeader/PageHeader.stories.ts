import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { PageHeaderHost } from './PageHeader.js';
import './PageHeader.wc.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { expect, fn, userEvent, within } from 'storybook/test';

type PageHeaderArgs = Required<PageHeaderHost> & {
  breadcrumbSlot: string;
  titleSlot: string;
  subtitleSlot: string;
  metaStatusSlot: string;
  extraActionsSlot: string;
  "breadcrumb-slot": string;
  "title-slot": string;
  "subtitle-slot": string;
  "meta-status-slot": string;
  "extra-actions-slot": string;
  onActionClick: (e: Event) => void;
  activeFocusIndex: object;
  handleKeyDown: object;
};

const meta: Meta<PageHeaderArgs> = {
  title: 'Components/Layout/PageHeader',
  component: 'biz-page-header',
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'ghost', 'outlined'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    compact: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    "breadcrumb-slot": { table: { disable: true } },
    "title-slot": { table: { disable: true } },
    "subtitle-slot": { table: { disable: true } },
    "meta-status-slot": { table: { disable: true } },
    "extra-actions-slot": { table: { disable: true } },
    handleActionClick: { table: { disable: true } },
    activeFocusIndex: { table: { disable: true } },
    handleKeyDown: { table: { disable: true } },
    breadcrumbSlot: {
      name: 'breadcrumb-slot',
      description: '상단 브레드크럼 위치',
      control: { type: 'text' },
      table: { category: 'slots', type: { summary: 'string | HTMLElement' } }
    },
    titleSlot: {
      name: 'title-slot',
      description: '메인 타이틀 영역, title property 우선',
      control: { type: 'text' },
      table: { category: 'slots', type: { summary: 'string | HTMLElement' } }
    },
    subtitleSlot: {
      name: 'subtitle-slot',
      description: '서브 타이틀 영역, subtitle property 우선',
      control: { type: 'text' },
      table: { category: 'slots', type: { summary: 'string | HTMLElement' } }
    },
    metaStatusSlot: {
      name: 'meta-status-slot',
      description: '타이틀 우측 메타 상태 표시 영역',
      control: { type: 'text' },
      table: { category: 'slots', type: { summary: 'string | HTMLElement' } }
    },
    extraActionsSlot: {
      name: 'extra-actions-slot',
      description: '우측 상단 액션 버튼 영역',
      control: { type: 'text' },
      table: { category: 'slots', type: { summary: 'string | HTMLElement' } }
    },
    onActionClick: {
      name: 'action-click',
      description: 'Extra Actions 클릭 시 방출',
      control: { disable: true},
      table: { category: 'events', type: { summary: '(event) => { actionId, event }'} }
    }
  },
  args: {
    title: '대시보드 페이지',
    subtitle: '전체 시스템 개요 및 주요 모니터링 지표를 확인합니다.',
    variant: 'standard',
    size: 'medium',
    compact: false,
    loading: false,
    disabled: false,
    error: false,
    breadcrumbSlot: '홈 > 대시보드',
    titleSlot: '',
    subtitleSlot: '',
    metaStatusSlot: '<span style="background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 12px; font-size: 12px;">운영중</span>',
    extraActionsSlot: '<button style="padding: 6px 12px; border-radius: 4px; border: 1px solid #ccc; background: #fff;" data-action-id="edit">편집</button> <button style="padding: 6px 12px; border-radius: 4px; border: none; background: #2563eb; color: #fff;" data-action-id="save">저장</button>',
  },
  render: (args) => html`
    <biz-page-header
      .title="${args.title}"
      .subtitle="${args.subtitle}"
      .variant="${args.variant}"
      .size="${args.size}"
      ?compact="${args.compact}"
      ?loading="${args.loading}"
      ?disabled="${args.disabled}"
      ?error="${args.error}"
      @action-click=${args.onActionClick}
    >
      ${args.breadcrumbSlot ? html`<div slot="breadcrumb-slot">${args.breadcrumbSlot}</div>` : ''}
      ${args.titleSlot ? html`<div slot="title-slot">${args.titleSlot}</div>` : ''}
      ${args.subtitleSlot ? html`<div slot="subtitle-slot">${args.subtitleSlot}</div>` : ''}
      ${args.metaStatusSlot ? html`<div slot="meta-status-slot">${unsafeHTML(args.metaStatusSlot)}</div>` : ''}
      ${args.extraActionsSlot ? html`<div slot="extra-actions-slot">${unsafeHTML(args.extraActionsSlot)}</div>` : ''}
    </biz-page-header>
  `,
};

export default meta;
type Story = StoryObj<PageHeaderArgs>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <biz-page-header title="Standard Variant" subtitle="기본 형태 스타일" variant="standard"></biz-page-header>
      <biz-page-header title="Filled Variant" subtitle="배경색 지정 카드 형태 스타일" variant="filled"></biz-page-header>
      <biz-page-header title="Ghost Variant" subtitle="테두리 및 배경 최소화 스타일" variant="ghost"></biz-page-header>
      <biz-page-header title="Outlined Variant" subtitle="외곽선 테두리 스타일" variant="outlined"></biz-page-header>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <biz-page-header title="Small Header" subtitle="Small 사이즈 헤더 규격" size="small"></biz-page-header>
      <biz-page-header title="Medium Header" subtitle="Medium 사이즈 헤더 규격" size="medium"></biz-page-header>
      <biz-page-header title="Large Header" subtitle="Large 사이즈 헤더 규격" size="large"></biz-page-header>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <biz-page-header title="Loading State" subtitle="스켈레톤 로딩 상태" loading></biz-page-header>
      <biz-page-header title="Disabled State" subtitle="비활성화 상태" disabled></biz-page-header>
      <biz-page-header title="Error State" subtitle="에러 강조 상태" error></biz-page-header>
    </div>
  `,
};

export const InteractiveAccessibility: Story = {
  args: {
    title: '접근성 검증 대시보드',
    subtitle: 'WAI-ARIA 규격 및 키보드 네비게이션 검증을 위한 헤더입니다.',
    variant: 'filled',
    size: 'medium',
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
};

export const ActionClickEvent: Story = {
  args: {
    title: '액션 클릭 이벤트 테스트',
    subtitle: '우측 상단 액션 버튼 클릭 시 action-click 이벤트가 방출되는지 확인합니다.',
    extraActionsSlot: `
      <button data-action-id="btn-edit" style="padding: 6px 12px; cursor: pointer;">수정</button>
      <button data-action-id="btn-delete" style="padding: 6px 12px; cursor: pointer;">삭제</button>
    `,
    onActionClick: fn(e => alert(JSON.stringify(e.detail))),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const editButton = canvas.getByText('수정');

    await userEvent.click(editButton);

    await expect(args.onActionClick).toHaveBeenCalled();
  },
};