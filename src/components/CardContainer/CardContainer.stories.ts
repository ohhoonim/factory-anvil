import type { Meta, StoryObj } from "@storybook/web-components"; 

import './CardContainer.wc';
import { html } from "lit";
import { expect } from "@storybook/test";

const meta: Meta = {
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
    fullWidth: { control: 'boolean' },
    borderedDivider: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    borderedDivider: false,
    hoverable: false,
    disabled: false,
    loading: false,
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
      <div slot="header-slot">
        <h3 id="card-title" style="margin: 0;">카드 타이틀</h3>
      </div>
      <div>
        <p style="margin: 0;">카드 메인 본문 콘텐츠 영역입니다. 다양한 정보를 배치할 수 있습니다.</p>
      </div>
      <div slot="footer-slot">
        <button type="button">확인</button>
      </div>
    </biz-card-container>
  `,
};

export default meta;
type Story = StoryObj;

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
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <biz-card-container hoverable>
        <div slot="header-slot"><strong>Hoverable State</strong></div>
        <p>마우스 오버 및 포커스 시 인터랙션 피드백을 제공합니다.</p>
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

export const AccessibilityTest: Story = {
  args: {
    hoverable: true,
  },
  play: async ({ canvasElement }) => {
    const card = canvasElement.querySelector('biz-card-container');
    if (card) {
      const innerCard = card.shadowRoot?.querySelector('.biz-card-container');
      expect(innerCard).toBeDefined();
      expect(innerCard?.getAttribute('role')).toBe('button');
      expect(innerCard?.getAttribute('tabindex')).toBe('0');
    }
  },
};