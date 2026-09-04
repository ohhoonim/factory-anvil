// src/components/DataGrid/DataGrid.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import type { DataGridHost, ColumnDef } from './DataGrid.js';
import './DataGrid.wc.js';

type Args = Required<DataGridHost> & {
  slotContent?: string;
  clear?: () => void;
};

const mockColumns: ColumnDef[] = [
  { key: 'id', path: '_id', width: 100 },
  { key: 'name', path: 'name', width: 150 },
  { key: 'email', path: 'email', width: 220 },
  { key: 'role', path: 'role', width: 130 },
  { key: 'status', path: 'status', width: 110 },
];

const mockRawData: Array<Record<string, unknown>> = Array.from({ length: 1000 }, (_, i) => ({
  _id: `507f1f77bcf86cd79943901${i.toString().padStart(3, '0')}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 2 === 0 ? 'Admin' : 'Member',
  status: i % 3 === 0 ? 'Active' : 'Pending',
}));

const meta: Meta<Args> = {
  title: 'Components/DataGrid',
  component: 'biz-data-grid',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
      description: '그리드 시각적 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '그리드 크기 옵션',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '부모 컨테이너너비 전체 채움 여부',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태 여부',
    },
    readonly: {
      control: { type: 'boolean' },
      description: '읽기 전용 상태 여부',
    },
    error: {
      control: { type: 'boolean' },
      description: '에러 표시 상태 여부',
    },
    loading: {
      control: { type: 'boolean' },
      description: '로딩 상태 표시 여부',
    },
    rawData: {
      control: { type: 'object' },
      description: '그리드에 바인딩할 원시 데이터 레코드 배열',
    },
    columns: {
      control: { type: 'object' },
      description: '컬럼 정의 메타데이터 배열',
    },
    rowHeight: {
      control: { type: 'number' },
      description: '행 높이 (px)',
    },
    vBuffer: {
      control: { type: 'number' },
      description: '수직 가상화 버퍼 행 수',
    },
    hBuffer: {
      control: { type: 'number' },
      description: '수평 가상화 버퍼 픽셀 수',
    },
    handleScroll: { action: 'scroll' },
    handleMouseOver: { action: 'mouseover' },
  },
  args: {
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    disabled: false,
    readonly: false,
    error: false,
    loading: false,
    rawData: mockRawData,
    columns: mockColumns,
    rowHeight: 40,
    vBuffer: 5,
    hBuffer: 200,
    handleScroll: fn(),
    handleMouseOver: fn(),
    clear: fn(),
  },
  render: (args) => html`
    <biz-data-grid
      .variant=${args.variant}
      .size=${args.size}
      ?full-width=${args.fullWidth}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      ?loading=${args.loading}
      .rawData=${args.rawData}
      .columns=${args.columns}
      .rowHeight=${args.rowHeight}
      .vBuffer=${args.vBuffer}
      .hBuffer=${args.hBuffer}
      @scroll=${args.handleScroll}
      @mouseover=${args.handleMouseOver}
      @clear=${args.clear}
    ></biz-data-grid>
  `,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
};

export const Standard: Story = {
  args: {
    variant: 'standard',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    rowHeight: 32,
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    rowHeight: 40,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    rowHeight: 48,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
  },
};

export const InteractiveEvents: Story = {
  args: {
    handleScroll: fn(),
    handleMouseOver: fn(),
  },
  render: (args) => html`
    <div style="padding: 1rem;">
      <p style="margin-bottom: 0.5rem; font-size: 14px; color: #666;">
        Tab 키를 이용해 Focus 접근이 가능하며, 키보드 인터랙션(Escape, Enter) 및 스크롤/마우스 오버 이벤트를 액션 탭에서 확인할 수 있습니다.
      </p>
      <biz-data-grid
        role="grid"
        aria-label="Interactive Data Grid Example"
        aria-disabled=${args.disabled ? 'true' : 'false'}
        aria-readonly=${args.readonly ? 'true' : 'false'}
        aria-invalid=${args.error ? 'true' : 'false'}
        aria-busy=${args.loading ? 'true' : 'false'}
        .variant=${args.variant}
        .size=${args.size}
        ?full-width=${args.fullWidth}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?error=${args.error}
        ?loading=${args.loading}
        .rawData=${args.rawData}
        .columns=${args.columns}
        .rowHeight=${args.rowHeight}
        .vBuffer=${args.vBuffer}
        .hBuffer=${args.hBuffer}
        @scroll=${args.handleScroll}
        @mouseover=${args.handleMouseOver}
        @clear=${args.clear}
      ></biz-data-grid>
    </div>
  `,
};