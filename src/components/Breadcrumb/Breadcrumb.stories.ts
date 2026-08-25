import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { BreadcrumbHost, BreadcrumbItem } from './Breadcrumb';
import './Breadcrumb.wc';

type Args = Required<BreadcrumbHost>;

const meta: Meta<Args> = {
  title: 'Components/Forms/Breadcrumb',
  tags: ["autodocs"],
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
type Story = StoryObj<Args>;

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