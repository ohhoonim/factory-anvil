import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './InlineEditWrapper.wc.js';
import type { InlineEditWrapperHost } from './InlineEditWrapper.js';

type InlineEditWrapperArgs = Required<InlineEditWrapperHost> & {
    defaultSlot?: string;
    viewSlot?: string;
    actionsSlot?: string;
    "view-slot": string;
    "actions-slot": string;
    "(default)": string;
    "show-actions": boolean;
    "auto-save": boolean;
    "_oldValue": string;
    "_defaultSlotElements": string;
    "full-width": boolean;
};

const meta: Meta<InlineEditWrapperArgs> = {
    title: 'Components/Layout/InlineEditWrapper',
    component: 'biz-inline-edit-wrapper',
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'text' },
        mode: { control: 'radio', options: ['view', 'edit'] },
        variant: { control: 'select', options: ['standard', 'outlined', 'ghost'] },
        size: { control: 'select', options: ['small', 'medium', 'large'] },
        trigger: { control: 'select', options: ['click', 'dblclick', 'focus'] },
        showActions: { control: 'boolean' },
        autoSave: { control: 'boolean' },
        disabled: { control: 'boolean' },
        error: { control: 'boolean' },
        loading: { control: 'boolean' },
        fullWidth: {control: 'boolean'},
        "(default)": { table: { disable: true } },
        "view-slot": { table: { disable: true } },
        "actions-slot": { table: { disable: true } },
        "show-actions": { table: { disable: true } },
        "auto-save": { table: { disable: true } },
        "_oldValue": { table: { disable: true } },
        "_defaultSlotElements": { table: { disable: true } },
        "full-width": { table: { disable: true } },
        defaultSlot: {
            name: '(default)',
            description: 'Edit Mode 시 노출될 편집 컨트롤 주입 영역',
            control: { type: 'text' },
            table: { category: 'slots', type: { summary: 'string | HTMLElement' } }
        },
        viewSlot: {
            name: 'view-slot',
            description: 'View Mode 시 노출될 텍스트/표시 영역',
            control: { type: 'text' },
            table: { category: 'slots', type: { summary: 'string | HTMLElement' } }
        },
        actionsSlot: {
            name: 'actions-slot',
            description: '편집 모드 우측/하단 저장/취소 커스텀 버튼 영역',
            control: { type: 'text' },
            table: { category: 'slots', type: { summary: 'string | HTMLElement' } }
        },
    },
    args: {
        value: '편집 가능한 텍스트',
        mode: 'view',
        variant: 'standard',
        size: 'medium',
        trigger: 'click',
        showActions: false,
        autoSave: true,
        disabled: false,
        error: false,
        loading: false,
        fullWidth: true,
        defaultSlot: '<input type="text" value="편집 가능한 텍스트" style="width: 100%; padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;" />',
        viewSlot: '',
        actionsSlot: '',
    },
    render: (args) => html`
    <biz-inline-edit-wrapper
      .value=${args.value}
      .mode=${args.mode}
      .variant=${args.variant}
      .size=${args.size}
      .trigger=${args.trigger}
      ?show-actions=${args.showActions}
      ?auto-save=${args.autoSave}
      ?disabled=${args.disabled}
      ?error=${args.error}
      ?loading=${args.loading}
      ?full-width=${args.fullWidth}
    >
      ${args.viewSlot ? html`<div slot="view-slot">${args.viewSlot}</div>` : ''}
      <input
        type="text"
        .value=${args.value}
        style="width: 100%; padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;"
      />
      ${args.actionsSlot ? html`<div slot="actions-slot">${args.actionsSlot}</div>` : ''}
    </biz-inline-edit-wrapper>
  `,
};

export default meta;
type Story = StoryObj<InlineEditWrapperArgs>;

export const Default: Story = {};

export const Standard: Story = {
    args: {
        variant: 'standard',
        value: 'Standard Variant (호버 시 하이라이트)',
    },
};

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        value: 'Outlined Variant (경계선 노출)',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        value: 'Ghost Variant (최소 피드백)',
    },
};

export const Small: Story = {
    args: {
        size: 'small',
        value: 'Small Size (32px)',
    },
};

export const Medium: Story = {
    args: {
        size: 'medium',
        value: 'Medium Size (40px)',
    },
};

export const Large: Story = {
    args: {
        size: 'large',
        value: 'Large Size (48px)',
    },
};

export const WithActions: Story = {
    args: {
        showActions: true,
        value: '버튼 액션 포함 모드',
    },
};

export const EditMode: Story = {
    args: {
        mode: 'edit',
        value: '편집 모드 활성화',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        value: '비활성화 상태',
    },
};

export const ErrorState: Story = {
    args: {
        error: true,
        value: '유효성 에러 상태',
    },
};

export const LoadingState: Story = {
    args: {
        mode: 'edit',
        loading: true,
        showActions: true,
        value: '저장 중 상태',
    },
};

export const CustomViewSlot: Story = {
    render: () => html`
    <biz-inline-edit-wrapper value="커스텀 뷰">
      <span slot="view-slot" style="color: #2563eb; font-weight: bold; text-decoration: underline;">
        🎨 커스텀 뷰 스롯 렌더링
      </span>
      <input type="text" value="커스텀 뷰" style="width: 100%; padding: 4px 8px;" />
    </biz-inline-edit-wrapper>
  `,
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    value: 'Full Width 모드 (부모 너비 100%)',
  },
};

export const OnModeChange: Story = {
  args: {
    value: '클릭하여 모드 전환 (mode-change 이벤트)',
  },
};

export const OnSave: Story = {
  args: {
    mode: 'edit',
    showActions: true,
    value: '저장 테스트 텍스트',
  },
  render: (args) => html`
    <p> 저장 버튼을 클릭하면 이전값과 변경값을 가져올 수 있습니다. </p>
    <p> 값이 미리 세팅되어있는 경우 최초 클릭시에는 이전값은 없는 것으로 나옵니다.  </p>
    <biz-inline-edit-wrapper
      .value=${args.value}
      .mode=${args.mode}
      .variant=${args.variant}
      .size=${args.size}
      .trigger=${args.trigger}
      ?show-actions=${args.showActions}
      ?auto-save=${args.autoSave}
      ?disabled=${args.disabled}
      ?error=${args.error}
      ?loading=${args.loading}
      ?full-width=${args.fullWidth}
      @save=${(e: CustomEvent<{ value: string; oldValue: string }>) => {
        // action('save')(e.detail);
        alert(`저장 완료!\n이전 값: ${e.detail.oldValue}\n변경된 값: ${e.detail.value}`);
      }}
    >
      <input
        type="text"
        .value=${args.value}
        style="width: 100%; padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px;"
      />
    </biz-inline-edit-wrapper>
  `,
};

export const OnCancel: Story = {
  args: {
    mode: 'edit',
    showActions: true,
    value: '취소 버튼 클릭 또는 ESC 입력 (cancel 이벤트)',
  },
};