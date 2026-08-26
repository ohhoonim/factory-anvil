import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './TileLayoutGrid.wc';
import type { TileLayoutGridHost } from './TileLayoutGrid';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { fn } from 'storybook/test';

type TileLayoutGridArgs = Required<TileLayoutGridHost> & {
    headerSlot: string;
    defaultSlot: string;
    emptySlot: string;
    "header-slot": string;
    "(default)": string;
    "empty-slot": string;
    resizeObserver: object;
    onLayoutChange?: (e: CustomEvent) => void;
    onTileClick?: (e: CustomEvent) => void;
};

const meta: Meta<TileLayoutGridArgs> = {
    title: 'Components/Layout/TileLayoutGrid',
    component: 'biz-tile-layout-grid',
    tags: ['autodocs'],
    argTypes: {
        mode: {
            control: { type: 'select' },
            options: ['fixed', 'masonry'],
            description: '그리드 모드 (fixed: 정격 높이, masonry: 가변 높이)',
        },
        columns: {
            control: { type: 'text' },
            description: '컬럼 수 설정 (auto-fit, auto-fill 또는 지정 숫자)',
        },
        minTileWidth: {
            control: { type: 'text' },
            description: '타일의 최소 너비 규격',
        },
        gap: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
            description: '타일 간 간격 규격',
        },
        aspectRatio: {
            control: { type: 'text' },
            description: 'fixed 모드 시 적용할 타일의 가로세로 비율',
        },
        loading: {
            control: { type: 'boolean' },
            description: '스켈레톤 로딩 상태 여부',
        },
        isEmpty: {
            control: { type: 'boolean' },
            description: '내부 요소 비어있음 여부',
        },
        "header-slot": { table: { disable: true } },
        "(default)": { table: { disable: true } },
        "empty-slot": { table: { disable: true } },
        headerSlot: {
            name: 'header-slot',
            description: '그리드 상단 툴바/필터링 영역',
            control: { type: 'text' },
            table: { category: 'slots', type: { summary: 'string | HTMLElement' } }
        },
        defaultSlot: {
            name: '(default)',
            description: 'Grid 내부에 배치될 자식 Tile 요소 주입 영역',
            control: { type: 'text' },
            table: { category: 'slots', type: { summary: 'string | HTMLElement' } }
        },
        emptySlot: {
            name: 'empty-slot',
            description: '내부 Tile 요소가 없을 때 표시할 대체 UI 영역',
            control: { type: 'text' },
            table: { category: 'slots', type: { summary: 'string | HTMLElement' } }
        },
        resizeObserver: { table: { disable: true } },
    },
    args: {
        mode: 'fixed',
        columns: 'auto-fit',
        minTileWidth: '280px',
        gap: 'medium',
        aspectRatio: '1/1',
        loading: false,
        isEmpty: false,
        defaultSlot: `
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">Tile 1</div>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">Tile 2</div>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">Tile 3</div>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">Tile 4</div>
        `,
        onLayoutChange: fn(),
        onTileClick: fn(),
    },
    render: (args) => html`
  <biz-tile-layout-grid
    .mode="${args.mode}"
    .columns="${args.columns}"
    .minTileWidth="${args.minTileWidth}"
    .gap="${args.gap}"
    .aspectRatio="${args.aspectRatio}"
    ?loading="${args.loading}"
  >
    ${args.headerSlot
            ? html`<div slot="header-slot">${unsafeHTML(args.headerSlot)}</div>`
            : ''}
    ${!args.isEmpty
            ? unsafeHTML(args.defaultSlot) : ''}
    ${args.emptySlot
            ? html`<div slot="empty-slot">${unsafeHTML(args.emptySlot)}</div>`
            : ''}
  </biz-tile-layout-grid>
`
};

export default meta;
type Story = StoryObj<TileLayoutGridArgs>;

export const Default: Story = {
    args: {},
};

export const FixedMode: Story = {
    args: {
        mode: 'fixed',
        aspectRatio: '16/9',
    },
};

export const MasonryMode: Story = {
    args: {
        mode: 'masonry',
    },
    render: (args) => html`
    <biz-tile-layout-grid
      .mode="${args.mode}"
      .columns="${args.columns}"
      min-tile-width="${args.minTileWidth}"
      .gap="${args.gap}"
      ?loading="${args.loading}"
    >
      <div style="background: #e0f2fe; padding: 40px; border-radius: 8px;">Tall Tile 1</div>
      <div style="background: #fef3c7; padding: 20px; border-radius: 8px;">Short Tile 2</div>
      <div style="background: #dcfce7; padding: 60px; border-radius: 8px;">Very Tall Tile 3</div>
      <div style="background: #fce7f3; padding: 30px; border-radius: 8px;">Medium Tile 4</div>
    </biz-tile-layout-grid>
  `,
};

export const LoadingState: Story = {
    args: {
        loading: true,
    },
};

export const EmptyState: Story = {
    args: {
        isEmpty: true,
        emptySlot: '표시할 타일 데이터가 존재하지 않습니다.',
    },
};

export const WithHeader: Story = {
    args: {
        headerSlot: '### 타일 레이아웃 그리드 목록',
    },
};

export const OnLayoutChange: Story = {
    render: (args) => {
        const handleLayoutChange = (e: CustomEvent) => {
            args.onLayoutChange?.(e);
            const logArea = document.getElementById('layout-change-log');
            if (logArea) {
                logArea.textContent = `Columns: ${e.detail.columns}, Mode: ${e.detail.mode}`;
            }
        };

        return html`
      <div>
        <div style="margin-bottom: 12px; padding: 8px; background: #e0f2fe; border-radius: 4px; font-size: 14px;">
          <strong>Layout Change Event Log:</strong> <span id="layout-change-log">반응형 크기 변경 시 이벤트가 갱신됩니다.</span>
        </div>
        <biz-tile-layout-grid
          .mode="${args.mode}"
          .columns="${args.columns}"
          .minTileWidth="${args.minTileWidth}"
          .gap="${args.gap}"
          .aspectRatio="${args.aspectRatio}"
          ?loading="${args.loading}"
          @layout-change="${handleLayoutChange}"
        >
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">Tile 1</div>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">Tile 2</div>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">Tile 3</div>
        </biz-tile-layout-grid>
      </div>
    `;
    },
};

export const OnTileClick: Story = {
    parameters: {
        docs: {
            source: {
                code: `
<biz-tile-layout-grid @tile-click="handleTileClick">
  <div>Clickable Tile 0</div>
  <div>Clickable Tile 1</div>
  <div>Clickable Tile 2</div>
</biz-tile-layout-grid>
        `.trim(),
            },
        },
    },
    render: (args) => {
        const handleTileClick = (e: CustomEvent) => {
            args.onTileClick?.(e);
            const logArea = document.getElementById('tile-click-log');
            if (logArea) {
                logArea.textContent = `Clicked Tile Index: ${e.detail.index}`;
            }
        };

        return html`
      <div>
        <div style="margin-bottom: 12px; padding: 8px; background: #fef3c7; border-radius: 4px; font-size: 14px;">
          <strong>Tile Click Event Log:</strong> <span id="tile-click-log">타일을 클릭하면 인덱스가 표시됩니다.</span>
        </div>
        <biz-tile-layout-grid
          .mode="${args.mode}"
          .columns="${args.columns}"
          .minTileWidth="${args.minTileWidth}"
          .gap="${args.gap}"
          .aspectRatio="${args.aspectRatio}"
          ?loading="${args.loading}"
          @tile-click="${handleTileClick}"
        >
          <div style="background: #e0e7ff; padding: 20px; border-radius: 8px; cursor: pointer;">Clickable Tile 0</div>
          <div style="background: #e0e7ff; padding: 20px; border-radius: 8px; cursor: pointer;">Clickable Tile 1</div>
          <div style="background: #e0e7ff; padding: 20px; border-radius: 8px; cursor: pointer;">Clickable Tile 2</div>
        </biz-tile-layout-grid>
      </div>
    `;
    },
};