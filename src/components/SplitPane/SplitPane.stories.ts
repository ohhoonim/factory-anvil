import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SplitPane.wc.js';
import type { SplitPaneHost } from './SplitPane.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

type SplitPaneArgs = Required<SplitPaneHost> & {
    "pane-1-slot": string;
    "resizer-slot": string;
    "pane-2-slot": string;
    pane1Slot: string;
    pane2Slot: string;
    handleMouseDown: object;
    handleMouseMove: object;
    handleMouseUp: object;
    handleKeyDown: object;
    handleDoubleClick: object;
};

const meta: Meta<SplitPaneArgs> = {
    title: 'Components/Layout/SplitPane',
    component: 'biz-split-pane',
    tags: ["autodocs"],
    argTypes: {
        direction: {
            control: { type: 'select' },
            options: ['horizontal', 'vertical'],
            description: '분할 방향을 제어합니다.',
        },
        variant: {
            control: { type: 'select' },
            options: ['line', 'grip', 'invisible'],
            description: '리사이저의 visual variant 스타일을 설정합니다.',
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
            description: '리사이저 두께 및 터치 영역 크기를 제어합니다.',
        },
        sizes: {
            control: { type: 'object' },
            description: '각 패널의 초기 비율 (%) 배열입니다.',
        },
        minSizes: {
            control: { type: 'object' },
            description: '각 패널의 최소 크기 (px) 배열입니다.',
        },
        maxSizes: {
            control: { type: 'object' },
            description: '각 패널의 최대 크기 (px) 배열입니다.',
        },
        disabled: {
            control: { type: 'boolean' },
            description: '리사이징 기능 비활성화 여부입니다.',
        },
        collapsible: {
            control: { type: 'boolean' },
            description: '더블 클릭 / Enter 키로 패널을 접을 수 있는지 여부입니다.',
        },
        collapsed: {
            control: { type: 'boolean' },
            description: '패널 접힘 상태 여부입니다.',
        },
        isDragging: {
            table: { disable: true },
        },
        pane1Slot: {
            name: 'pane-1-slot',
            description: '첫번째 pane',
            control: { type: 'text' },
            table: { category: 'slots', type: { summary: 'string | HTMLElement' } }
        },
        "pane-1-slot": { table: { disable: true } },
        "pane-2-slot": { table: { disable: true } },
        pane2Slot: {
            name: 'pane-2-slot',
            description: '두번째 pane',
            control: { type: 'text' },
            table: { category: 'slots', type: { summary: 'string | HTMLElement' } }
        },
        handleMouseDown: { table: { disable: true } },
        handleMouseMove: { table: { disable: true } },
        handleMouseUp: { table: { disable: true } },
        handleKeyDown: { table: { disable: true } },
        handleDoubleClick: { table: { disable: true } },

    },
    args: {
        direction: 'horizontal',
        variant: 'line',
        size: 'medium',
        sizes: [50, 50],
        minSizes: [100, 100],
        maxSizes: [],
        disabled: false,
        collapsible: false,
        collapsed: false,
        isDragging: false,
        pane1Slot: `<h3>Left / Top Panel</h3>
          <p>첫 번째 패널 슬롯에 삽입할 컨텐츠입니다.</p>`,
        pane2Slot: `<h3>Right / Bottom Panel</h3>
          <p>두 번째 패널 슬롯에 삽입할 컨텐츠입니다.</p>`,
    },
    render: (args: SplitPaneArgs) => html`
    <div style="width: 100%; height: 400px; border: 1px solid #e5e7eb;">
      <biz-split-pane
        .direction=${args.direction}
        .variant=${args.variant}
        .size=${args.size}
        .sizes=${args.sizes}
        .minSizes=${args.minSizes}
        .maxSizes=${args.maxSizes}
        ?disabled=${args.disabled}
        ?collapsible=${args.collapsible}
      >
        <div slot="pane-1-slot" style="padding: 16px; background-color: #f9fafb; height: 100%; box-sizing: border-box;">
            ${unsafeHTML(args.pane1Slot)} 
        </div>
        <div slot="pane-2-slot" style="padding: 16px; background-color: #f3f4f6; height: 100%; box-sizing: border-box;">
            ${unsafeHTML(args.pane2Slot)} 
        </div>
      </biz-split-pane>
    </div>
  `,
};

export default meta;
type Story = StoryObj<SplitPaneArgs>;

export const Default: Story = {};

export const LineVariant: Story = {
    args: {
        variant: 'line',
    },
};

export const GripVariant: Story = {
    args: {
        variant: 'grip',
    },
};

export const InvisibleVariant: Story = {
    args: {
        variant: 'invisible',
    },
};

export const SmallSize: Story = {
    args: {
        size: 'small',
    },
};

export const MediumSize: Story = {
    args: {
        size: 'medium',
    },
};

export const LargeSize: Story = {
    args: {
        size: 'large',
    },
};

export const VerticalDirection: Story = {
    args: {
        direction: 'vertical',
        pane1Slot: 'Top Panel Content',
        pane2Slot: 'Bottom Panel Content',
    },
};

export const DisabledState: Story = {
    args: {
        disabled: true,
    },
};

export const Collapsible: Story = {
    args: {
        collapsible: true,
        variant: 'grip',
        pane1Slot: '리사이저를 더블클릭하거나 Focus 상태에서 Enter 키를 누르면 접힙니다.',
    },
};