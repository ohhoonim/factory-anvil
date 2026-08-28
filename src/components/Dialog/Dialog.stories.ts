import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import type { DialogHost } from './Dialog.js';
import './Dialog.wc.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

type SlotArgs = {
  headerSlot?: string;
  defaultSlot?: string;
  footerSlot?: string;
  closeIconSlot?: string;
};

type EventArgs = {
  onDialogOpen?: (e: CustomEvent) => void;
  onDialogClose?: (e: CustomEvent) => void;
  onBackdropClick?: (e: CustomEvent) => void;
};

type Args = Required<DialogHost> & SlotArgs & EventArgs;

const meta: Meta<Args> = {
  title: 'Components/Forms/Dialog',
  component: 'biz-dialog',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    heading: { control: 'text' },
    modal: { control: 'boolean' },
    hideCloseButton: { control: 'boolean' },
    preventBackdropClose: { control: 'boolean' },
    preventEscapeClose: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full-screen'],
    },
    centered: { control: 'boolean' },
    scrollable: { control: 'boolean' },
    variant: {
      control: 'inline-radio',
      options: ['modal', 'non-modal', 'alert'],
    },
    headerSlot: { control: 'text', table: { category: 'Slots' } },
    defaultSlot: { control: 'text', table: { category: 'Slots' } },
    footerSlot: { control: 'text', table: { category: 'Slots' } },
    closeIconSlot: { control: 'text', table: { category: 'Slots' } },
    onDialogOpen: { action: 'dialog-open', table: { category: 'Events' } },
    onDialogClose: { action: 'dialog-close', table: { category: 'Events' } },
    onBackdropClick: { action: 'backdrop-click', table: { category: 'Events' } },
  },
  args: {
    open: true,
    heading: '다이얼로그 제목',
    modal: true,
    hideCloseButton: false,
    preventBackdropClose: false,
    preventEscapeClose: false,
    size: 'medium',
    centered: true,
    scrollable: false,
    variant: 'modal',
    headerSlot: '',
    defaultSlot: '다이얼로그의 본문 내용 영역입니다. 사용자의 입력을 요구하거나 핵심 안내 메시지를 전달합니다.',
    footerSlot: '<button type="button" class="btn-secondary">취소</button><button type="button" class="btn-primary">확인</button>',
    closeIconSlot: '',
    onDialogOpen: fn(),
    onDialogClose: fn(),
    onBackdropClick: fn(),
  },
  render: (args) => html`
    <biz-dialog
      .open=${args.open}
      .heading=${args.heading}
      .modal=${args.modal}
      ?hide-close-button=${args.hideCloseButton}
      ?prevent-backdrop-close=${args.preventBackdropClose}
      ?prevent-escape-close=${args.preventEscapeClose}
      .size=${args.size}
      ?centered=${args.centered}
      ?scrollable=${args.scrollable}
      .variant=${args.variant}
      @dialog-open=${args.onDialogOpen}
      @dialog-close=${args.onDialogClose}
      @backdrop-click=${args.onBackdropClick}
    >
      ${args.headerSlot ? html`<div slot="header-slot">${args.headerSlot}</div>` : ''}
      <div dangerouslySetInnerHTML=${ifDefined(args.defaultSlot)}>${unsafeHTML(args.defaultSlot)}</div>
      ${args.footerSlot ? html`<div slot="footer-slot">${unsafeHTML(args.footerSlot)}</div>` : ''}
      ${args.closeIconSlot ? html`<div slot="close-icon-slot">${unsafeHTML(args.closeIconSlot)}</div>` : ''}
    </biz-dialog>
  `,
};

export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};

export const ModalVariant: Story = {
  args: {
    variant: 'modal',
    heading: '표준 모달 다이얼로그',
    modal: true,
  },
};

export const NonModalVariant: Story = {
  args: {
    variant: 'non-modal',
    heading: '논모달 보조 창',
    modal: false,
  },
};

export const AlertVariant: Story = {
  args: {
    variant: 'alert',
    heading: '경고 및 확인',
    defaultSlot: '정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    footerSlot: '<button type="button">취소</button><button type="button" style="background:#ef4444;color:#fff;">삭제</button>',
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'small',
    heading: 'Small Size Dialog (400px)',
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'medium',
    heading: 'Medium Size Dialog (560px)',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'large',
    heading: 'Large Size Dialog (800px)',
  },
};

export const SizeFullScreen: Story = {
  args: {
    size: 'full-screen',
    heading: 'Full Screen Dialog',
  },
};

export const ScrollableContent: Story = {
  args: {
    scrollable: true,
    heading: '스크롤 가능한 긴 본문 내용',
    defaultSlot: Array(15)
      .fill('다이얼로그의 본문 영역 내용이 길어질 경우 내부 스크롤이 적용됩니다.')
      .join('<br/><br/>'),
  },
};

export const PreventCloseOptions: Story = {
  args: {
    preventBackdropClose: true,
    preventEscapeClose: true,
    heading: '닫힘 방지 옵션 적용',
    defaultSlot: '백드롭 영역 클릭 및 Escape 키 입력을 통한 닫힘을 차단한 상태입니다. 하단 액션 버튼이나 X 버튼으로만 닫을 수 있습니다.',
  },
};