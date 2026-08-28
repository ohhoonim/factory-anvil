import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import type { ToastHost, ToastType, ToastVariant, ToastSize, ToastState } from './Toast.js';
import './Toast.wc.js';

type ToastArgs = Required<ToastHost> & {
  defaultSlot?: string;
  startSlot?: string;
  actionSlot?: string;
  closeButtonSlot?: string;
};

const meta: Meta<ToastArgs> = {
  title: 'Components/Forms/Toast',
  component: 'biz-toast',
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: '토스트 표기 메시지',
    },
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'] as ToastType[],
      description: '피드백 심버리티 타입',
    },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'outlined', 'filled'] as ToastVariant[],
      description: '형태 옵션',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'] as ToastSize[],
      description: '크기 옵션',
    },
    duration: {
      control: { type: 'number', min: 0, step: 500 },
      description: '자동 종료 대기 시간 (ms, 0 지정 시 자동 중지 안 함)',
    },
    autoDismiss: {
      control: 'boolean',
      description: '지정 시간 후 자동 사라짐 여부',
    },
    dismissible: {
      control: 'boolean',
      description: '수동 닫기 버튼 노출 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    readonly: {
      control: 'boolean',
      description: '읽기 전용 상태',
    },
    state: {
      control: { type: 'select' },
      options: ['entering', 'showing', 'paused', 'exiting'] as ToastState[],
      description: '라이프사이클 상태',
    },
    defaultSlot: {
      control: 'text',
      description: '메인 슬롯 본문 영역',
    },
    startSlot: {
      control: 'text',
      description: '최좌측 내부 주입 영역 (커스텀 아이콘 등)',
    },
    actionSlot: {
      control: 'text',
      description: '우측 액션 영역',
    },
    closeButtonSlot: {
      control: 'text',
      description: '수동 닫기 버튼 영역',
    },
  },
  args: {
    message: '작업이 성공적으로 완료되었습니다.',
    type: 'info',
    variant: 'standard',
    size: 'medium',
    duration: 0,
    autoDismiss: false,
    dismissible: true,
    disabled: false,
    loading: false,
    readonly: false,
    state: 'showing',
    defaultSlot: '',
    startSlot: '',
    actionSlot: '',
    closeButtonSlot: '',
    onActionClick: fn(),
    onCloseClick: fn(),
    onMouseEnter: fn(),
    onMouseLeave: fn(),
    onKeyDown: fn(),
  },
  render: (args) => html`
    <biz-toast
      .message="${args.message}"
      .type="${args.type}"
      .variant="${args.variant}"
      .size="${args.size}"
      .duration="${args.duration}"
      ?auto-dismiss="${args.autoDismiss}"
      ?dismissible="${args.dismissible}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      ?readonly="${args.readonly}"
      .state="${args.state}"
      @action-click="${args.onActionClick}"
    >
      ${args.startSlot ? html`<div slot="start-slot">${args.startSlot}</div>` : ''}
      ${args.defaultSlot ? args.defaultSlot : ''}
      ${args.actionSlot ? html`<button slot="action-slot">${args.actionSlot}</button>` : ''}
      ${args.closeButtonSlot ? html`<button slot="close-button-slot">${args.closeButtonSlot}</button>` : ''}
    </biz-toast>
  `,
};

export default meta;
type Story = StoryObj<ToastArgs>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <biz-toast .message="${'Standard Variant'}" .variant="${'standard'}" .type="${args.type}" .duration="${0}"></biz-toast>
      <biz-toast .message="${'Outlined Variant'}" .variant="${'outlined'}" .type="${args.type}" .duration="${0}"></biz-toast>
      <biz-toast .message="${'Filled Variant'}" .variant="${'filled'}" .type="${args.type}" .duration="${0}"></biz-toast>
    </div>
  `,
};

export const Types: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <biz-toast .message="${'성공 안내 메시지입니다.'}" .type="${'success'}" .variant="${args.variant}" .duration="${0}"></biz-toast>
      <biz-toast .message="${'일반 정보 안내 메시지입니다.'}" .type="${'info'}" .variant="${args.variant}" .duration="${0}"></biz-toast>
      <biz-toast .message="${'주의가 필요한 메시지입니다.'}" .type="${'warning'}" .variant="${args.variant}" .duration="${0}"></biz-toast>
      <biz-toast .message="${'오류가 발생하여 실행할 수 없습니다.'}" .type="${'error'}" .variant="${args.variant}" .duration="${0}"></biz-toast>
    </div>
  `,
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
      <biz-toast .message="${'Small Size Toast'}" .size="${'small'}" .duration="${0}"></biz-toast>
      <biz-toast .message="${'Medium Size Toast'}" .size="${'medium'}" .duration="${0}"></biz-toast>
      <biz-toast .message="${'Large Size Toast'}" .size="${'large'}" .duration="${0}"></biz-toast>
    </div>
  `,
};

export const States: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <biz-toast .message="${'Disabled Toast'}" ?disabled="${true}" .duration="${0}"></biz-toast>
      <biz-toast .message="${'Loading Toast'}" ?loading="${true}" .duration="${0}"></biz-toast>
      <biz-toast .message="${'Readonly Toast'}" ?readonly="${true}" .duration="${0}"></biz-toast>
      <biz-toast .message="${'Error State Toast'}" .type="${'error'}" .duration="${0}"></biz-toast>
    </div>
  `,
};

export const StackedToasts: Story = {
  render: () => html`
    <div style="position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px; align-items: flex-end;">
      <biz-toast style="position: static;" .message="${'새로운 알림이 도착했습니다.'}" .type="${'info'}" .duration="${0}"></biz-toast>
      <biz-toast style="position: static;" .message="${'데이터가 성공적으로 저장되었습니다.'}" .type="${'success'}" .duration="${0}"></biz-toast>
      <biz-toast style="position: static;" .message="${'네트워크 연결 상태를 확인해 주세요.'}" .type="${'warning'}" .duration="${0}"></biz-toast>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: '복수 토스트 발생 시 우측 상단 스택 컨테이너 내부에서 위에서 아래로 쌓여 노출되는 스택 레이아웃 시연입니다.',
      },
    },
  },
};

export const WithActionAndSlots: Story = {
  args: {
    message: '파일이 성공적으로 삭제되었습니다.',
    type: 'info',
    variant: 'standard',
    actionSlot: '실행 취소',
    duration: 0,
    onActionClick: (e: Event) => alert(JSON.stringify('실행 취소 버튼을 클릭하였습니다.')),
  },
};

export const AccessibilityToastShowEvent: Story = {
  args: {
    message: '스크린 리더 접근성 및 toast-show 이벤트 검증용 토스트',
    type: 'error',
    duration: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'type이 error/warning일 때 role="alert" 및 aria-live="assertive"가 설정되며, toast-show 이벤트 방출을 검증합니다.',
      },
    },
  },
};

export const AccessibilityToastCloseEvent: Story = {
  args: {
    message: 'toast-close 및 action-click 이벤트 검증용 토스트',
    type: 'info',
    actionSlot: '확인',
    dismissible: true,
    duration: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '수동 닫기 버튼 또는 액션 버튼 클릭 시 각각 toast-close와 action-click 이벤트 방출을 검증합니다.',
      },
    },
  },
};