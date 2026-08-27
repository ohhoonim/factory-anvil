import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { fn, within, userEvent, expect } from "storybook/test";
import type { CheckboxGroupHost } from "./CheckboxGroup";
import './CheckboxGroup.wc';

type CheckboxGroupArgs = Required<CheckboxGroupHost> & {
  labelSlot?: string;
  defaultSlot?: string;
  helperTextSlot?: string;
  onChange?: (e: Event) => void;
  onClear?: (e: Event) => void;
};

const meta: Meta<CheckboxGroupArgs> = {
  title: 'Components/Forms/CheckboxGroup',
  component: 'biz-checkbox-group',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'card', 'button'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    value: { control: 'object' },
    name: { control: 'text' },
    required: { control: 'boolean', description: '체크 해제를 못하게 막는 인터랙션 잠금이 아니라, "제출 시점에 최소 1개는 선택되어 있어야 한다"'},
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    min: { control: 'number', description: '최소 선택 개수' },
    max: { control: 'number' , descript: '최대 선택 개수'},
    fullWidth: { control: 'boolean' },
    labelSlot: { control: 'text' },
    defaultSlot: { control: 'text' },
    helperTextSlot: { control: 'text' },
  },
  args: {
    value: ['opt1'],
    name: 'frameworks',
    orientation: 'vertical',
    required: false,
    disabled: false,
    readonly: false,
    error: false,
    min: 0,
    max: Infinity,
    variant: 'standard',
    size: 'medium',
    fullWidth: false,
    labelSlot: '좋아하는 프레임워크 선택',
    defaultSlot: `
      <label><input type="checkbox" value="opt1"> Lit</label>
      <label><input type="checkbox" value="opt2"> React</label>
      <label><input type="checkbox" value="opt3"> Vue</label>
    `,
    helperTextSlot: '하나 이상 선택할 수 있습니다.',
    onChange: fn(),
    onClear: fn(),
  },
  render: (args) => html`
    <biz-checkbox-group
      .value=${args.value}
      .name=${args.name}
      .orientation=${args.orientation}
      ?required=${args.required}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      .min=${args.min}
      .max=${args.max}
      .variant=${args.variant}
      .size=${args.size}
      ?full-width=${args.fullWidth}
      @change=${args.onChange}
      @clear=${args.onClear}
    >
      <span slot="label-slot">${args.labelSlot}</span>
      ${unsafeHTML(args.defaultSlot)}
      <span slot="helper-text-slot">${unsafeHTML(args.helperTextSlot)}</span>
    </biz-checkbox-group>
  `,
};

export default meta;
type Story = StoryObj<CheckboxGroupArgs>;

export const Default: Story = {};

export const VariantStandard: Story = {
  args: {
    variant: 'standard',
  },
};

export const VariantCard: Story = {
  args: {
    variant: 'card',
  },
};

export const VariantButton: Story = {
  args: {
    variant: 'button',
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'small',
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'medium',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'large',
  },
};

export const HorizontalLayout: Story = {
  args: {
    orientation: 'horizontal',
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
    helperTextSlot: '최소 1개 이상의 항목을 선택해야 합니다.',
  },
};

export const EventChange: Story = {
  args: {
    onChange: fn( e => {
        alert(JSON.stringify(e.detail));
    }),
    labelSlot: '체크사항이 변경되면 그룹내 체크 목록을 리턴합니다. ',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvasElement.querySelectorAll('input[type="checkbox"]');
    if (checkboxes.length > 1) {
      await userEvent.click(checkboxes[1]);
      await expect(args.onChange).toHaveBeenCalled();
    }
  },
};

export const EventClear: Story = {
  args: {
    onClear: fn(),
    labelSlot: `
        biz-checkbox-group의 clear() 함수를 호출하면 전부 체크 해제되면서 change 이벤트가 발생합니다.
    `,
    helperTextSlot: `
         <pre>
            const group = document.querySelector('biz-checkbox-group')
            group.clear()
         </pre>
    `,
  },
  play: async ({ canvasElement, args }) => {
    const group = canvasElement.querySelector('biz-checkbox-group') as any;
    if (group && typeof group.clear === 'function') {
      group.clear();
      await expect(args.onClear).toHaveBeenCalled();
    }
  },
};