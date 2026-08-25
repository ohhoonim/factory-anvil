import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect, vi } from 'vitest';
import { html } from 'lit';
import type { ContentContainer } from './ContentContainer.wc';
import './ContentContainer.wc';
import { BizApplicationShell } from '../ApplicationShell/ApplicationShell.wc';

const meta: Meta<ContentContainer> = {
  title: 'Components/Layout/ContentContainer',
  component: 'biz-content-container',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'fluid', 'card'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full'],
    },
    centered: { control: 'boolean' },
    scrollable: { control: 'boolean' },
    padding: { control: 'boolean' },
    loading: { control: 'boolean' },
    empty: { control: 'boolean' },
  },
  args: {
    variant: 'standard',
    size: 'medium',
    centered: false,
    scrollable: false,
    padding: true,
    loading: false,
    empty: false,
  },
};

export default meta;
type Story = StoryObj<ContentContainer>;

export const Default: Story = {
  render: (args) => html`
    <biz-content-container
      .variant="${args.variant}"
      .size="${args.size}"
      ?centered="${args.centered}"
      ?scrollable="${args.scrollable}"
      ?padding="${args.padding}"
      ?loading="${args.loading}"
      ?empty="${args.empty}"
    >
      <div slot="header-slot" style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
        <h2 style="margin: 0; font-size: 1.25rem;">페이지 타이틀</h2>
      </div>
      <div style="padding: 16px;">
        <p>기본 콘텐츠 영역입니다. 업무 화면에 필요한 컴포넌트들을 이 위치에 배치합니다.</p>
      </div>
      <div slot="footer-slot" style="padding: 16px; border-top: 1px solid #e5e7eb; text-align: right;">
        <button type="button">확인</button>
      </div>
    </biz-content-container>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h3>Standard Variant</h3>
        <biz-content-container variant="standard">
          <p>Standard 형태의 컨테이너입니다.</p>
        </biz-content-container>
      </div>
      <div>
        <h3>Fluid Variant</h3>
        <biz-content-container variant="fluid">
          <p>Fluid 형태의 컨테이너입니다. 최대 너비 제한 없이 가득 차게 설정됩니다.</p>
        </biz-content-container>
      </div>
      <div>
        <h3>Card Variant</h3>
        <biz-content-container variant="card">
          <p>Card 형태의 컨테이너입니다. 배경색, 테두리, 그림자 효과가 적용됩니다.</p>
        </biz-content-container>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h3>Small Size (800px)</h3>
        <biz-content-container variant="card" size="small">
          <p>Small 크기의 컨테이너입니다.</p>
        </biz-content-container>
      </div>
      <div>
        <h3>Medium Size (1200px)</h3>
        <biz-content-container variant="card" size="medium">
          <p>Medium 크기의 컨테이너입니다.</p>
        </biz-content-container>
      </div>
      <div>
        <h3>Large Size (1600px)</h3>
        <biz-content-container variant="card" size="large">
          <p>Large 크기의 컨테이너입니다.</p>
        </biz-content-container>
      </div>
      <div>
        <h3>Full Size (100%)</h3>
        <biz-content-container variant="card" size="full">
          <p>Full 크기의 컨테이너입니다.</p>
        </biz-content-container>
      </div>
    </div>
  `,
};

export const LoadingState: Story = {
  args: {
    loading: true,
  },
  render: (args) => html`
    <biz-content-container ?loading="${args.loading}" variant="card">
      <p>로딩 중 상태에서는 본문 대신 로딩 스피너와 스크린 리더용 안내 텍스트가 표시됩니다.</p>
    </biz-content-container>
  `,
};

export const EmptyState: Story = {
  args: {
    empty: true,
  },
  render: (args) => html`
    <biz-content-container ?empty="${args.empty}" variant="card">
      <p>콘텐츠가 없는 상태 시 기본 안내 문구가 표시됩니다.</p>
    </biz-content-container>
  `,
};

export const AccessibilityAndInteractive: Story = {
  args: {
    scrollable: true,
    variant: 'card',
  },
  render: (args) => html`
    <biz-content-container
      .variant="${args.variant}"
      ?scrollable="${args.scrollable}"
      style="height: 200px;"
    >
      <div slot="header-slot" style="padding: 12px; background: #f3f4f6;">
        <h3 style="margin: 0;">스크롤 및 접근성 테스트</h3>
      </div>
      <div style="height: 400px; padding: 16px;">
        <p>Tab 키를 눌러 컨테이너에 포커스한 후 PageUp/PageDown 및 방향키로 스크롤을 제어할 수 있습니다.</p>
        <p>자체 스크롤 활성화 시 tabindex="0"이 부여되며 role="main" 레이아웃을 준수합니다.</p>
      </div>
    </biz-content-container>
  `,

};
