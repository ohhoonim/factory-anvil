import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { PageHeader } from './PageHeader.wc';

const meta: Meta<PageHeader> = {
  title: 'Components/Layout/PageHeader',
  component: 'biz-page-header',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: { control: 'boolean' },
    compact: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
  args: {
    title: '페이지 제목',
    subtitle: '페이지 부제목 설명입니다.',
    variant: 'standard',
    size: 'medium',
    fullWidth: false,
    compact: false,
    disabled: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<PageHeader>;

export const Default: Story = {
  args: {
    title: '대시보드 Overview',
    subtitle: '시스템 현황 및 주요 메트릭 모니터링',
  },
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-page-header title="Standard Variant" subtitle="기본 투명 배경" variant="standard"></biz-page-header>
      <biz-page-header title="Filled Variant" subtitle="배경색 지정 카드 형태" variant="filled"></biz-page-header>
      <biz-page-header title="Ghost Variant" subtitle="테두리 및 배경 최소화" variant="ghost"></biz-page-header>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-page-header title="Small Size Header" subtitle="Small 규격" size="small"></biz-page-header>
      <biz-page-header title="Medium Size Header" subtitle="Medium 규격" size="medium"></biz-page-header>
      <biz-page-header title="Large Size Header" subtitle="Large 규격" size="large"></biz-page-header>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-page-header title="Disabled State" subtitle="비활성화 상태" disabled></biz-page-header>
      <biz-page-header title="Error State" subtitle="오류 발생 상태" error></biz-page-header>
    </div>
  `,
};

export const WithSlots: Story = {
  render: () => html`
    <biz-page-header variant="filled">
      <span slot="breadcrumb-slot">Home > Settings > Profile</span>
      <span slot="title-slot"><h1 style="margin: 0; color: #2563eb;">커스텀 타이틀 슬롯</h1></span>
      <span slot="subtitle-slot">슬롯을 통한 서브 타이틀 렌더링</span>
      <span slot="meta-status-slot" style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 4px; font-size: 12px;">Active</span>
      <div slot="extra-actions-slot">
        <button data-action-id="edit">수정</button>
        <button data-action-id="delete">삭제</button>
      </div>
    </biz-page-header>
  `,
};
