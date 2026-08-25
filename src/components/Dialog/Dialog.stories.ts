import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { DialogProps } from './Dialog';
import './Dialog.wc';

const meta: Meta<DialogProps> = {
  title: 'Components/Forms/Dialog',
  render: (args) => html`
    <biz-dialog 
      ?open=${args.open} 
      ?modal=${args.modal} 
      @close=${args.onClose} 
      @backdrop-click=${(e: CustomEvent) => args.onBackdropClick?.(e.detail.originalEvent)}
    >
      ${args.children ?? html`
        <h3>Dialog Content</h3>
        <p>This is a modal dialog content.</p>
        <button>Focusable Item</button>
      `}
    </biz-dialog>
  `,
};

export default meta;
type Story = StoryObj<DialogProps>;

export const Open: Story = {
  args: {
    open: true,
    modal: true,
  },
};
