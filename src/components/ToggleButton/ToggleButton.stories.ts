import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import { fn } from 'storybook/test';
import './ToggleButton.wc.js';
import type { ToggleButtonHost } from './ToggleButton.js';

type Args = Required<ToggleButtonHost> & {
  defaultSlot?: string;
  startSlot?: string;
  endSlot?: string;
  onChange?: (detail: { pressed: boolean; value: string }) => void;
};

const meta: Meta<Args> = {
  title: 'Components/Forms/ToggleButton',
  component: 'biz-toggle-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['standard', 'outlined', 'contained'],
      description: '토글 버튼의 형태 옵션'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '토글 버튼의 크기 옵션'
    },
    pressed: {
      control: { type: 'boolean' },
      description: '단일 옵션의 ON/OFF(Pressed) 상태'
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 여부'
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '부모 요소 너비 100% 확장 여부'
    },
    value: {
      control: { type: 'text' },
      description: '상호 배타적 그룹 내 선택 식별 값'
    },
    defaultSlot: {
      control: { type: 'text' },
      description: '버튼 내부 라벨/콘텐츠'
    },
    startSlot: {
      control: { type: 'text' },
      description: 'Prefix 아이콘 영역'
    },
    endSlot: {
      control: { type: 'text' },
      description: 'Suffix 아이콘 영역'
    },
    onChange: {
      action: 'change',
      description: '토글 상태 변경 시 방출되는 커스텀 이벤트',
      table: {
        category: 'events',
      },
    },
  },
  args: {
    value: 'bold',
    pressed: false,
    disabled: false,
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    defaultSlot: 'Bold',
    startSlot: '',
    endSlot: '',
    onChange: fn(),
    handleClick: () => {},
    handleKeyDown: () => {}
  },
  render: (args) => html`
    <biz-toggle-button
      .value="${args.value}"
      ?pressed="${args.pressed}"
      ?disabled="${args.disabled}"
      .variant="${args.variant}"
      .size="${args.size}"
      ?full-width="${args.fullWidth}"
      @change="${args.onChange}"
    >
      ${args.startSlot ? html`<span slot="start-slot">${args.startSlot}</span>` : ''}
      ${args.defaultSlot}
      ${args.endSlot ? html`<span slot="end-slot">${args.endSlot}</span>` : ''}
    </biz-toggle-button>
  `
};

export default meta;
type Story = StoryObj<Args>;

export const SingleOptionSwitch: Story = {
  name: 'Single Option (Checkbox Characteristic)',
  args: {
    pressed: false,
    variant: 'outlined',
    startSlot: '★',
    defaultSlot: 'Bookmark',
    value: 'bookmark'
  }
};

export const ExclusiveGroupItem: Story = {
  name: 'Exclusive Option Group Item (Radio Characteristic)',
  render: (args) => {
    const handleGroupChange = (e: CustomEvent<{ pressed: boolean; value: string }>) => {
      args.onChange?.(e.detail);

      const target = e.target as HTMLElement;
      const parent = target.parentElement;
      if (!parent) return;

      const buttons = parent.querySelectorAll('biz-toggle-button');
      buttons.forEach((btn) => {
        if (btn !== target) {
          btn.removeAttribute('pressed');
        } else {
          btn.setAttribute('pressed', '');
        }
      });
    };

    return html`
      <div style="display: flex; gap: 4px;">
        <biz-toggle-button
          value="left"
          variant="${args.variant}"
          size="${args.size}"
          @change="${handleGroupChange}"
        >
          Left
        </biz-toggle-button>
        <biz-toggle-button
          value="center"
          pressed
          variant="${args.variant}"
          size="${args.size}"
          @change="${handleGroupChange}"
        >
          Center
        </biz-toggle-button>
        <biz-toggle-button
          value="right"
          variant="${args.variant}"
          size="${args.size}"
          @change="${handleGroupChange}"
        >
          Right
        </biz-toggle-button>
      </div>
    `;
  }
};

export const VisualPressedFeedback: Story = {
  name: 'Visual Pressed Feedback Comparison',
  args: {
    onChange: fn(), 
  },
  render: (args) => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <biz-toggle-button
        .variant="${args.variant}"
        .size="${args.size}"
        @change="${args.onChange}"
      >
        OFF (Unpressed)
      </biz-toggle-button>
      <biz-toggle-button
        pressed
        .variant="${args.variant}"
        .size="${args.size}"
        @change="${(e: CustomEvent) => args.onChange?.(e.detail)}"
      >
        ON (Pressed)
      </biz-toggle-button>
    </div>
  `
};