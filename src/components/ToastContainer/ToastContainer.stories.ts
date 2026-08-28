// src/components/ToastContainer/ToastContainer.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import './ToastContainer.wc.ts';
import type { ToastContainerHost } from './ToastContainer.ts';
import { ifDefined } from 'lit/directives/if-defined.js';
import  '../Toast/Toast.wc';

type ToastContainerArgs = Required<ToastContainerHost> & {
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  loading?: boolean;
  focused?: boolean;
  ariaInvalid?: string | null;
  ariaRequired?: string | null;
  ariaDescribedby?: string;
  ariaDisabled?: string | null;
  labelSlot?: string;
  startSlot?: string;
  defaultSlot?: string;
  endSlot?: string;
  helperTextSlot?: string;
  onInput?: (e: CustomEvent) => void;
  onChange?: (e: CustomEvent) => void;
  onClear?: (e: CustomEvent) => void;
  onContainerChange?: (e: CustomEvent) => void;
  onOverflowChange?: (e: CustomEvent) => void;
};

const meta: Meta<ToastContainerArgs> = {
  title: 'Components/Forms/ToastContainer',
  component: 'biz-toast-container',
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-right',
        'top-left',
        'bottom-right',
        'bottom-left',
        'top-center',
        'bottom-center',
      ],
      description: '컨테이너의 화면 고정 위치',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: '컨테이너 스택 간격 규격',
    },
    variant: {
      control: 'select',
      options: ['standard', 'outlined', 'filled'],
      description: '시각적 스타일 테마',
    },
    maxVisibleCount: {
      control: { type: 'number', min: 1, max: 10 },
      description: '동시 노출 가능한 최대 토스트 개수',
    },
    gap: {
      control: { type: 'number', min: 0, max: 40 },
      description: '토스트 요소 간의 수직 간격 (px)',
    },
    newestOnTop: {
      control: 'boolean',
      description: '최신 토스트의 스택 최상단 배치 여부',
    },
    pauseOnHover: {
      control: 'boolean',
      description: '호버 시 내부 토스트 타이머 일시정지 전파 여부',
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    loading: { control: 'boolean' },
    focused: { control: 'boolean' },
  },
  args: {
    maxVisibleCount: 3,
    position: 'top-right',
    gap: 10,
    newestOnTop: true,
    pauseOnHover: true,
    size: 'medium',
    isHovered: false,
    isOverflowing: false,
    variant: 'standard',
    disabled: false,
    readonly: false,
    error: false,
    loading: false,
    focused: false,
    ariaInvalid: 'false',
    ariaRequired: 'false',
    ariaDescribedby: '',
    ariaDisabled: 'false',
    labelSlot: '',
    startSlot: '',
    defaultSlot: '',
    endSlot: '',
    helperTextSlot: '',
    handleSlotChange: fn(),
    handleMouseEnter: fn(),
    handleMouseLeave: fn(),
    onInput: fn(),
    onChange: fn(),
    onClear: fn(),
    onContainerChange: fn(),
    onOverflowChange: fn(),
  },
  render: (args) => html`
    <biz-toast-container
      max-visible-count="${args.maxVisibleCount}"
      position="${args.position}"
      gap="${args.gap}"
      ?newest-on-top="${args.newestOnTop}"
      ?pause-on-hover="${args.pauseOnHover}"
      size="${args.size}"
      variant="${args.variant || 'standard'}"
      ?disabled="${args.disabled}"
      ?readonly="${args.readonly}"
      ?error="${args.error}"
      ?loading="${args.loading}"
      ?focused="${args.focused}"
      aria-invalid="${args.ariaInvalid || 'false'}"
      aria-required="${args.ariaRequired || 'false'}"
      aria-describedby="${ifDefined(args.ariaDescribedby)}"
      aria-disabled="${args.ariaDisabled || 'false'}"
      @input="${args.onInput}"
      @change="${args.onChange}"
      @clear="${args.onClear}"
      @container-change="${args.onContainerChange}"
      @overflow-change="${args.onOverflowChange}"
    >

      <div slot="label-slot">${args.labelSlot}</div>
      <div slot="start-slot">${args.startSlot}</div>
      <div slot="end-slot">${args.endSlot}</div>
      <div slot="helper-text-slot">${args.helperTextSlot}</div>
      ${args.defaultSlot
        ? html`${args.defaultSlot}`
        : html`
            <div
              class="biz-toast-item"
              style="padding: 12px 16px; background: #323232; color: #fff; border-radius: 4px; box-shadow: 0 3px 6px rgba(0,0,0,0.16); min-width: 280px;"
            >
              알림 메시지 1
            </div>
            <div
              class="biz-toast-item"
              style="padding: 12px 16px; background: #323232; color: #fff; border-radius: 4px; box-shadow: 0 3px 6px rgba(0,0,0,0.16); min-width: 280px;"
            >
              알림 메시지 2
            </div>
            <div>
                <biz-toast .message="${'1메시지입니다.'}"></biz-toast>
            </div>
            <div>
                <biz-toast .message="${'2메시지입니다.'}"></biz-toast>
            </div>

          `}
    </biz-toast-container>
  `,
};

export default meta;
type Story = StoryObj<ToastContainerArgs>;

export const Default: Story = {
  args: {
    position: 'top-right',
    maxVisibleCount: 3,
  },
};

export const OutlinedVariant: Story = {
  args: {
    variant: 'outlined',
    position: 'top-right',
  },
};

export const FilledVariant: Story = {
  args: {
    variant: 'filled',
    position: 'top-right',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'small',
    gap: 6,
  },
};

export const LargeSize: Story = {
  args: {
    size: 'large',
    gap: 16,
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
  },
};

export const ReadonlyState: Story = {
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

export const AccessibilityAndEvents: Story = {
  args: {
    position: 'top-right',
    maxVisibleCount: 2,
    ariaInvalid: 'false',
    ariaRequired: 'true',
    ariaDescribedby: 'toast-container-desc',
    labelSlot: '시스템 접근성 알림 라이브 영역',
  },
  render: (args) => html`
    <div id="toast-container-desc" style="display:none;">
      실시간 시스템 알림 메시지를 표시하는 스택 영역입니다.
    </div>
    <biz-toast-container
      max-visible-count="${args.maxVisibleCount}"
      position="${args.position}"
      gap="${args.gap}"
      ?newest-on-top="${args.newestOnTop}"
      ?pause-on-hover="${args.pauseOnHover}"
      size="${args.size}"
      variant="${args.variant || 'standard'}"
      ?disabled="${args.disabled}"
      ?readonly="${args.readonly}"
      ?error="${args.error}"
      ?loading="${args.loading}"
      ?focused="${args.focused}"
      aria-invalid="${args.ariaInvalid || 'false'}"
      aria-required="${args.ariaRequired || 'false'}"
      aria-describedby="${ifDefined(args.ariaDescribedby)}"
      aria-disabled="${args.ariaDisabled || 'false'}"
      @input="${args.onInput}"
      @change="${args.onChange}"
      @clear="${args.onClear}"
      @container-change="${args.onContainerChange}"
      @overflow-change="${args.onOverflowChange}"
    >
      <div
        class="biz-toast-item"
        tabindex="0"
        style="padding: 12px 16px; background: #1976d2; color: #fff; border-radius: 4px;"
      >
        키보드 포커스 가능 토스트 1
      </div>
      <div
        class="biz-toast-item"
        tabindex="0"
        style="padding: 12px 16px; background: #388e3c; color: #fff; border-radius: 4px;"
      >
        키보드 포커스 가능 토스트 2
      </div>
      <div
        class="biz-toast-item"
        tabindex="0"
        style="padding: 12px 16px; background: #d32f2f; color: #fff; border-radius: 4px;"
      >
        초과 노출 토스트 (오버플로우)
      </div>
    </biz-toast-container>
  `,
};