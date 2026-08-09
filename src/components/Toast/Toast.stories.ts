import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { ToastProps } from './Toast';
import './Toast.wc';

const meta: Meta<ToastProps> = {
  title: 'Components/Forms/Toast',
  render: (args) => html`
    <biz-toast-manager .toasts=${args.toasts}></biz-toast-manager>
  `,
};

export default meta;
type Story = StoryObj<ToastProps>;

export const Multiple: Story = {
  args: {
    toasts: [
      { id: 1, message: 'Success Message', type: 'success' },
      { id: 2, message: 'Error Message', type: 'error' },
      { id: 3, message: 'Info Message', type: 'info' }
    ],
  },
};
