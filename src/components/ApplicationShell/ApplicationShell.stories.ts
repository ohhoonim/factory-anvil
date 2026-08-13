import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from "lit";
import type { ApplicationShellContext } from './ApplicationShell';
import './ApplicationShell.wc';

type variantType = 'default' | 'full-width' | 'minimal';

const meta: Meta<ApplicationShellContext> = {
  title: 'Components/Layout/ApplicationShell',
  component: 'biz-application-shell',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'full-width', 'minimal'],
      description: '레이아웃 형태 옵션'
    },
    sidebarCollapsed: {
      control: 'boolean',
      description: '사이드바 축소 상태 여부'
    },
    stickyHeader: {
      control: 'boolean',
      description: '헤더 상단 고정 여부'
    },
    fixedSidebar: {
      control: 'boolean',
      description: '사이드바 좌측 고정 및 내부 스크롤 적용 여부'
    }
  },
  args: {
    variant: 'default',
    sidebarCollapsed: false,
    stickyHeader: true,
    fixedSidebar: true
  },
  render: (args) => html`
    <biz-application-shell
      .variant=${args.variant as variantType }
      ?sidebar-collapsed=${args.sidebarCollapsed}
      ?sticky-header=${args.stickyHeader}
      ?fixed-sidebar=${args.fixedSidebar}
    >
      <div slot="header-slot" style="padding: 1rem; font-weight: bold;">Header Content</div>
      <div slot="sidebar-slot" style="padding: 1rem; color: #fff;">
        <nav aria-label="Main Navigation">
          <ul>
            <li><a href="#link1" style="color: #fff;">Menu Item 1</a></li>
            <li><a href="#link2" style="color: #fff;">Menu Item 2</a></li>
          </ul>
        </nav>
      </div>
      <div slot="content-slot" style="padding: 2rem;">
        <h1>Main Content Area</h1>
        <p>This is the main content of the application shell.</p>
      </div>
      <div slot="footer-slot" style="padding: 1rem; text-align: center;">Footer Content</div>
    </biz-application-shell>
  `
};

export default meta;
type Story = StoryObj<ApplicationShellContext>;

export const Default: Story = {
  args: {
    stickyHeader: true,
    sidebarCollapsed: false
  }
};

export const FullWidth: Story = {
  args: {
    variant: 'full-width'
  }
};

export const Minimal: Story = {
  args: {
    variant: 'minimal'
  }
};

export const SidebarCollapsed: Story = {
  args: {
    sidebarCollapsed: true
  }
};
