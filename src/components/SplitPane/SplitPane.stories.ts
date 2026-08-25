import { html } from 'lit';
import './SplitPane.wc';

const meta = {
  title: 'Components/Layout/SplitPane',
  component: 'biz-split-pane',
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'radio', options: ['horizontal', 'vertical'] },
    variant: { control: 'radio', options: ['Line', 'Grip', 'Invisible'] },
    size: { control: 'radio', options: ['Small', 'Medium', 'Large'] },
    disabled: { control: 'boolean' },
    collapsible: { control: 'boolean' },
    onResize: { action: 'resize' },
    onCollapse: { action: 'collapse' }
  }
};

export default meta;

export const Default = {
  args: {
    direction: 'horizontal',
    variant: 'Line',
    size: 'Medium',
    disabled: false,
    collapsible: false
  },
  render: (args: any) => html`
    <biz-split-pane
      direction="${args.direction}"
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?collapsible="${args.collapsible}"
      @resize="${args.onResize}"
      @collapse="${args.onCollapse}"
      style="height: 300px; border: 1px solid #ccc;"
    >
      <div slot="pane-1-slot" style="padding: 20px; background: #f0fdf4; height: 100%;">Pane 1</div>
      <div slot="pane-2-slot" style="padding: 20px; background: #fff7ed; height: 100%;">Pane 2</div>
    </biz-split-pane>
  `
};

export const Variants = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <biz-split-pane variant="Line" style="height: 100px; border: 1px solid #ccc;">
        <div slot="pane-1-slot">Line</div><div slot="pane-2-slot">Pane 2</div>
      </biz-split-pane>
      <biz-split-pane variant="Grip" style="height: 100px; border: 1px solid #ccc;">
        <div slot="pane-1-slot">Grip</div><div slot="pane-2-slot">Pane 2</div>
      </biz-split-pane>
      <biz-split-pane variant="Invisible" style="height: 100px; border: 1px solid #ccc;">
        <div slot="pane-1-slot">Invisible</div><div slot="pane-2-slot">Pane 2</div>
      </biz-split-pane>
    </div>
  `
};

export const Sizes = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <biz-split-pane size="Small" style="height: 100px; border: 1px solid #ccc;">
        <div slot="pane-1-slot">Small</div><div slot="pane-2-slot">Pane 2</div>
      </biz-split-pane>
      <biz-split-pane size="Medium" style="height: 100px; border: 1px solid #ccc;">
        <div slot="pane-1-slot">Medium</div><div slot="pane-2-slot">Pane 2</div>
      </biz-split-pane>
      <biz-split-pane size="Large" style="height: 100px; border: 1px solid #ccc;">
        <div slot="pane-1-slot">Large</div><div slot="pane-2-slot">Pane 2</div>
      </biz-split-pane>
    </div>
  `
};

export const States = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <biz-split-pane disabled style="height: 100px; border: 1px solid #ccc;">
        <div slot="pane-1-slot">Disabled</div><div slot="pane-2-slot">Pane 2</div>
      </biz-split-pane>
      <biz-split-pane collapsible style="height: 100px; border: 1px solid #ccc;">
        <div slot="pane-1-slot">Collapsible</div><div slot="pane-2-slot">Pane 2</div>
      </biz-split-pane>
    </div>
  `
};