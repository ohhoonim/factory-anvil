import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import type { RadioButtonHost } from './RadioButton.js';
import './RadioButton.wc.js';

type Args = Required<RadioButtonHost> & {
  defaultSlot?: string;
  iconSlot?: string;
  descriptionSlot?: string;
};

const meta: Meta<Args> = {
  title: 'Components/Forms/RadioButton',
  component: 'biz-radio-button',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    value: { control: 'text' },
    name: { control: 'text' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['standard', 'button', 'card', 'outlined', 'filled'],
    },
    labelPosition: {
      control: 'select',
      options: ['right', 'left'],
    },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    defaultSlot: { control: 'text' },
    iconSlot: { control: 'text' },
    descriptionSlot: { control: 'text' },
  },
  args: {
    checked: false,
    value: 'option1',
    name: 'radio-group',
    size: 'medium',
    variant: 'standard',
    labelPosition: 'right',
    readonly: false,
    disabled: false,
    error: false,
    helperTextId: 'radio-helper-text',
    defaultSlot: '라디오 버튼 옵션',
    iconSlot: '',
    descriptionSlot: '',
    handleInputChange: fn(),
    handleFocus: fn(),
    handleBlur: fn(),
  },
  render: (args) => html`
    <biz-radio-button
      .checked=${args.checked}
      .value=${args.value}
      .name=${args.name}
      .size=${args.size}
      .variant=${args.variant}
      label-position=${args.labelPosition}
      .readonly=${args.readonly}
      .disabled=${args.disabled}
      .error=${args.error}
      @change=${args.handleInputChange}
      @focus=${args.handleFocus}
      @blur=${args.handleBlur}
    >
      ${args.defaultSlot}
      ${args.iconSlot ? html`<span slot="icon-slot">${args.iconSlot}</span>` : ''}
      ${args.descriptionSlot
        ? html`<span slot="description-slot">${args.descriptionSlot}</span>`
        : ''}
    </biz-radio-button>
  `,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-radio-button .variant=${'standard'} .name=${args.name} value="standard">
        Standard Variant
      </biz-radio-button>
      <biz-radio-button .variant=${'outlined'} .name=${args.name} value="outlined">
        Outlined Variant
      </biz-radio-button>
      <biz-radio-button .variant=${'filled'} .name=${args.name} value="filled">
        Filled Variant
      </biz-radio-button>
      <biz-radio-button .variant=${'button'} .name=${args.name} value="button">
        Button Variant
      </biz-radio-button>
      <biz-radio-button .variant=${'card'} .name=${args.name} value="card">
        Card Variant
      </biz-radio-button>
    </div>
  `,
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-radio-button .size=${'small'} .name=${args.name} value="sm"> Small Size </biz-radio-button>
      <biz-radio-button .size=${'medium'} .name=${args.name} value="md"> Medium Size </biz-radio-button>
      <biz-radio-button .size=${'large'} .name=${args.name} value="lg"> Large Size </biz-radio-button>
    </div>
  `,
};

export const States: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-radio-button .checked=${true} .name=${args.name} value="checked">
        Checked State
      </biz-radio-button>
      <biz-radio-button .disabled=${true} .name=${args.name} value="disabled">
        Disabled State
      </biz-radio-button>

      <biz-radio-button .disabled=${true} .checked=${true} .name=${args.name} value="disabled-checked">
        Disabled Checked State
      </biz-radio-button>
      <biz-radio-button .readonly=${true} .checked=${true} .name=${args.name} value="readonly">
        Readonly State
      </biz-radio-button>
      <biz-radio-button .error=${true} .name=${args.name} value="error">
        Error State
        <span slot="description-slot">필수 선택 항목입니다.</span>
      </biz-radio-button>
    </div>
  `,
};

export const LabelPositions: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-radio-button label-position="right" .name=${args.name} value="right">
        Right Label Position
      </biz-radio-button>
      <biz-radio-button label-position="left" .name=${args.name} value="left">
        Left Label Position
      </biz-radio-button>
    </div>
  `,
};

export const Events: Story = {
  args: {
    handleInputChange: fn(),
    handleFocus: fn(),
    handleBlur: fn(),
  },
  render: (args) => html`
    <biz-radio-button
      .name=${args.name}
      value="event-test"
      @change=${args.handleInputChange}
      @focus=${args.handleFocus}
      @blur=${args.handleBlur}
    >
      이벤트 테스트 (Change, Focus, Blur)
    </biz-radio-button>
  `,
};