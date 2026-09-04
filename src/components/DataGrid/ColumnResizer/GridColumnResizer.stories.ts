import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { fn } from "storybook/test";
import type { GridColumnResizerHost } from "./GridColumnResizer";
import './GridColumnResizer.wc'
import { html } from "lit";

type GridColumnResizerArgs = Required<GridColumnResizerHost> & {
  'resize-start': ReturnType<typeof fn>;
  'resize-move': ReturnType<typeof fn>;
  'column-resize': ReturnType<typeof fn>;
};

const meta: Meta<GridColumnResizerArgs> = {
  title: 'DataGrid/GridColumnResizer',
  tags: ['autodocs'],
  argTypes: {
    columnKey: {
      control: 'text',
      description: '너비를 변경할 대상 컬럼의 고유 식별자',
    },
    currentWidth: {
      control: { type: 'number', min: 0, max: 2000, step: 10 },
      description: '리사이징 동작 시작 시점의 컬럼 너비(px)',
    },
    minWidth: {
      control: { type: 'number', min: 0, max: 500, step: 10 },
      description: '컬럼 축소 시 허용되는 최소 너비(px)',
    },
    maxWidth: {
      control: { type: 'number', min: 100, max: 2000, step: 10 },
      description: '컬럼 확대 시 허용되는 최대 너비(px)',
    },
    isResizing: {
      control: 'boolean',
      description: '드래그 인터랙션 진행 여부 상태',
    },
    deltaX: {
      control: 'number',
      description: `드래그 이동 거리에 따른 X축 상대 위치 상태
      좁히면 '-' 이다. 
      `,
    },
    'resize-start': {
      description: '드래그 핸들 다운 이벤트로 리사이징 동작이 시작된 시점 발생',
    },
    'resize-move': {
      description: '드래그 이동 중 실시간으로 변경 너비 및 가이드 라인 위치를 계산하는 시점 발생',
    },
    'column-resize': {
      description: `드래그 종료 시 최종 결정된 너비를 전달하는 시점 발생하는 이벤트이다.
        {"columnKey":"col-id","width":58.671875} 와 같이 리턴해준다. 
        리턴값을 이용하여 해당 컬럼의 width 를 변경해준다.  
      `,
    },
  },
  args: {
    columnKey: 'col-id',
    currentWidth: 100,
    minWidth: 50,
    maxWidth: 1000,
    isResizing: false,
    deltaX: 0,
    handlePointerDown: () => {},
    'resize-start': fn(),
    'resize-move': fn(),
    'column-resize': fn(),
  },
  render: (args) => html`
    <div style="position: relative; width: 300px; height: 200px; border: 1px solid #ccc; padding: 10px;">
      <div style="position: relative; width: ${args.currentWidth}px; height: 40px; background-color: #f0f0f0; border: 1px solid #aaa; display: flex; align-items: center; justify-content: center;">
        Header (${args.columnKey})
        <grid-column-resizer
          .columnKey="${args.columnKey}"
          .currentWidth="${args.currentWidth}"
          .minWidth="${args.minWidth}"
          .maxWidth="${args.maxWidth}"
          .isResizing="${args.isResizing}"
          .deltaX="${args.deltaX}"
          @resize-start="${(e: CustomEvent) => args['resize-start'](e.detail)}"
          @resize-move="${(e: CustomEvent) => args['resize-move'](e.detail)}"
          @column-resize="${(e: CustomEvent) => args['column-resize'](e.detail)}"
        ></grid-column-resizer>
      </div>
    </div>
  `,
};

export default meta;
type Story = StoryObj<GridColumnResizerArgs>;

export const Default: Story = {};

export const HoverState: Story = {
  parameters: {
    docs: {
      description: {
        story: '리사이저 핸들 영역 위에 마우스 포인터가 진입하여 커서 스타일이 활성화되는 기본 hover 상태입니다.',
      },
    },
  },
};

export const ResizingState: Story = {
  args: {
    isResizing: true,
    deltaX: 50,
  },
  parameters: {
    docs: {
      description: {
        story: '드래그 인터랙션이 진행 중인 상태로 시각적 가이드 라인(Visual Overlay Line)이 표시된 상태입니다.',
      },
    },
  },
};

export const ResizeStartEvent: Story = {
  args: {
    'resize-start': fn(),
  },
  parameters: {
    docs: {
      description: {
        story: '드래그 핸들 클릭 및 다운 동작으로 resize-start 이벤트가 트리거되는 시연 스토리입니다.',
      },
    },
  },
};

export const ResizeMoveEvent: Story = {
  args: {
    isResizing: true,
    deltaX: 30,
    'resize-move': fn(),
  },
  parameters: {
    docs: {
      description: {
        story: '드래그 이동 과정에서 resize-move 이벤트가 지속적으로 발생하는 시연 스토리입니다.',
      },
    },
  },
};

export const ColumnResizeEvent: Story = {
  args: {
    'column-resize': fn(details => alert(JSON.stringify(details))),
  },
  parameters: {
    docs: {
      description: {
        story: '드래그 해제 시 최종 컬럼 너비가 확정되며 column-resize 이벤트가 방출되는 시연 스토리입니다.',
      },
    },
  },
};