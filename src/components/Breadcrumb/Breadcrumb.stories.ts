import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb';
import './Breadcrumb.wc';

const meta: Meta<BreadcrumbProps> = {
  title: 'Components/Forms/Breadcrumb',
  render: (args) => html`
    <biz-breadcrumb 
      .items=${args.items} 
      .separator=${args.separator}
      @path-click=${(e: CustomEvent) => args.onPathClick?.(e.detail.item)}
    ></biz-breadcrumb>
  `,
  // tags: ['autodocs'],
  argTypes: {
    separator: {
      control: { type: 'text' }, // 입력 타입을 텍스트로 지정
      description: '경로 구분자 문자열',
    },
    items: {
      control: { type: 'object' }, // 객체 형태로 입력
    },
    onPathClick: { action: 'path-clicked' },
  },
};

export default meta;
type Story = StoryObj<BreadcrumbProps>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Library', href: '/library' },
      { label: 'Data' }
    ],
    onPathClick: (item: BreadcrumbItem) => { alert(JSON.stringify(item)) },
  },
};

export const Separator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Library', href: '/library' },
      { label: 'Data' }
    ],
    separator: ">",
    onPathClick: (item: BreadcrumbItem) => { alert(JSON.stringify(item)) },
  },
}