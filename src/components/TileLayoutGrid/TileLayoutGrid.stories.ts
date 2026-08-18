import type { Meta , StoryObj} from "@storybook/web-components-vite";
import { html } from "lit";
import './TileLayoutGrid.wc';

const meta: Meta = {
  title: 'Components/Layout/TileLayoutGrid',
  component: 'biz-tile-layout-grid',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['fixed', 'masonry'],
    },
    columns: {
      control: { type: 'text' },
    },
    minTileWidth: {
      control: { type: 'text' },
    },
    gap: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    aspectRatio: {
      control: { type: 'text' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj;

const renderTiles = (count: number) =>
  Array.from(
    { length: count },
    (_, i) => html`
      <div
        tabindex="0"
        style="padding: 16px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);"
      >
        <h4 style="margin: 0 0 8px 0;">타일 카드 #${i + 1}</h4>
        <p style="margin: 0; color: #4b5563; font-size: 14px;">콘텐츠 영역입니다.</p>
      </div>
    `
  );

export const Default: Story = {
  args: {
    mode: 'fixed',
    columns: 'auto-fit',
    minTileWidth: '240px',
    gap: 'medium',
    aspectRatio: '1/1',
    loading: false,
  },
  render: (args) => html`
    <biz-tile-layout-grid
      mode="${args.mode}"
      columns="${args.columns}"
      min-tile-width="${args.minTileWidth}"
      gap="${args.gap}"
      aspect-ratio="${args.aspectRatio}"
      ?loading="${args.loading}"
    >
      ${renderTiles(6)}
    </biz-tile-layout-grid>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3>Fixed Mode (1/1 Ratio)</h3>
        <biz-tile-layout-grid mode="fixed" columns="auto-fit" min-tile-width="200px" aspect-ratio="1/1">
          ${renderTiles(4)}
        </biz-tile-layout-grid>
      </div>
      <div>
        <h3>Masonry Mode ( 가변 높이 )</h3>
        <biz-tile-layout-grid mode="masonry" columns="auto-fit" min-tile-width="200px">
          <div style="padding: 16px; background: #f3f4f6; height: 100px;">가변 높이 100px</div>
          <div style="padding: 16px; background: #f3f4f6; height: 180px;">가변 높이 180px</div>
          <div style="padding: 16px; background: #f3f4f6; height: 120px;">가변 높이 120px</div>
          <div style="padding: 16px; background: #f3f4f6; height: 220px;">가변 높이 220px</div>
        </biz-tile-layout-grid>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3>Small Gap</h3>
        <biz-tile-layout-grid gap="small" min-tile-width="180px">
          ${renderTiles(3)}
        </biz-tile-layout-grid>
      </div>
      <div>
        <h3>Medium Gap</h3>
        <biz-tile-layout-grid gap="medium" min-tile-width="180px">
          ${renderTiles(3)}
        </biz-tile-layout-grid>
      </div>
      <div>
        <h3>Large Gap</h3>
        <biz-tile-layout-grid gap="large" min-tile-width="180px">
          ${renderTiles(3)}
        </biz-tile-layout-grid>
      </div>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3>Loading State (Skeleton)</h3>
        <biz-tile-layout-grid loading min-tile-width="200px">
          ${renderTiles(4)}
        </biz-tile-layout-grid>
      </div>
      <div>
        <h3>Empty State</h3>
        <biz-tile-layout-grid min-tile-width="200px"></biz-tile-layout-grid>
      </div>
    </div>
  `,
};