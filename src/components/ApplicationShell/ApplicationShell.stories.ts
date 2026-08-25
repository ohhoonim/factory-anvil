import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { ApplicationShellHost } from './ApplicationShell';
import './ApplicationShell.wc';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { BizApplicationShell } from './ApplicationShell.wc';
import  {expect, userEvent, within}  from 'storybook/test';

type Args = Required<ApplicationShellHost> & {
  headerSlot: string;
  sidebarSlot: string;
  contentSlot: string;
  footerSlot: string;
  "sidebar-collapsed": object;
  "sticky-header": object;
  "fixed-sidebar": object;
  toggleSidebar: object;
};

const meta: Meta<Args> = {
  title: 'Components/Layout/ApplicationShell',
  component: 'biz-application-shell',
  tags: ['autodocs'],
  argTypes: {
    toggleSidebar: {
      name: 'toggleSidebar()',
      description: 'sidebar 상태를 토글해준다',
      control: false, 
      table: {category: 'method', type: { summary: '() => void'}}
    },
    variant: {
      control: 'select',
      options: ['default', 'full-width', 'minimal'],
      description: '레이아웃 형태 옵션'
    },
    sidebarCollapsed: {
      control: 'boolean',
      description: '사이드바 축소 상태 여부',
    },
    stickyHeader: {
      table: {disable: true},
    },
    fixedSidebar: {
      table: {disable: true},
    },
    'sidebar-collapsed': { table: { disable: true } },
    'sticky-header': {
      control: 'boolean',
      description: '헤더 상단 고정 여부',
    },
    'fixed-sidebar': {
      control: 'boolean',
      description: '사이드바 좌측 고정 및 내부 스크롤 적용 여부',
    },
    headerSlot: {
      name: "header-slot",
      control: { type: 'text' },
      description: '레이아웃 상단 헤더',
      table: { category: 'slots', type: { summary: 'string | HTMLElement' } },
    },
    sidebarSlot: {
      name: "sidebar-slot",
      control: { type: 'text' },
      description: '왼쪽 메뉴',
      table: { category: 'slots', type: { summary: 'string | HTMLElement' } },
    },
    contentSlot: {
      name: "content-slot",
      control: { type: 'text' },
      description: '컨텐츠 영역',
      table: { category: 'slots', type: { summary: 'string | HTMLElement' } },
    },
    footerSlot: {
      name: "footer-slot",
      control: { type: 'text' },
      description: '하단 footer 영역',
      table: { category: 'slots', type: { summary: 'string | HTMLElement' } },
    },
  },
  args: {
    variant: 'default',
    sidebarCollapsed: false,
    stickyHeader: true,
    fixedSidebar: true,
    headerSlot: '<div style="padding: 1rem; font-weight: bold;">Header Content</div>',
    sidebarSlot: `<div slot="sidebar-slot">
        <div style="width:100%; height: 100vh;padding: 1rem; color: #fff;">
          <nav aria-label="Main Navigation">
            <ul>
              <li><a href="#link1" style="color: #fff;">Menu Item 1</a></li>
              <li><a href="#link2" style="color: #fff;">Menu Item 2</a></li>
            </ul>
          </nav>
        </div>` ,
    contentSlot: ` 
      <div slot="content-slot" style="padding: 2rem;">
        <h1>Main Content Area</h1>
        <p>This is the main content of the application shell.</p>
      </div>`,
    footerSlot: `<div style="padding: 1rem; text-align: center;">Footer Content</div>`,
  },
  render: (args) => html`
    <biz-application-shell
      .variant=${args.variant}
      ?sidebar-collapsed=${args.sidebarCollapsed}
      ?sticky-header=${args.stickyHeader}
      ?fixed-sidebar=${args.fixedSidebar}
    >
     ${args.headerSlot ? html`<div slot="header-slot">${unsafeHTML(args.headerSlot)}</div>` : ''} 
     ${args.sidebarSlot ? html`<div slot="sidebar-slot">${unsafeHTML(args.sidebarSlot)}</div>` : ''} 
     ${args.contentSlot ? html`<div slot="content-slot">${unsafeHTML(args.contentSlot)}</div>` : ''} 
     ${args.footerSlot ? html`<div slot="footer-slot">${unsafeHTML(args.footerSlot)}</div>` : ''} 
    </biz-application-shell>
  `
};

export default meta;
type Story = StoryObj<Args>;

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

export const MethodExample: StoryObj = {
  render: () => {
    const handleToggle = () => {
      const shell = document.querySelector<BizApplicationShell>('biz-application-shell');
      shell?.toggleSidebar();
    };

    return html`
      <button @click=${handleToggle} style="margin-bottom: 1rem;">
        외부에서 toggleSidebar() 호출
      </button>
      <biz-application-shell></biz-application-shell>
    `;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: '외부에서 toggleSidebar() 호출' });
    const shell = canvasElement.querySelector<BizApplicationShell>('biz-application-shell')!;

    // 초기 상태 검증
    expect(shell.sidebarCollapsed).toBe(false);

    // 버튼 클릭 및 Lit 비동기 업데이트 대기
    await userEvent.click(button);
    await shell.updateComplete;

    // toggleSidebar() 실행 후 상태 검증
    expect(shell.sidebarCollapsed).toBe(true);
    expect(shell.hasAttribute('sidebar-collapsed')).toBe(true);

    // 재클릭 테스트
    await userEvent.click(button);
    await shell.updateComplete;

    expect(shell.sidebarCollapsed).toBe(false);
    expect(shell.hasAttribute('sidebar-collapsed')).toBe(false);
  },
};