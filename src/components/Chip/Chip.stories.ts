import type { Meta, StoryObj } from "@storybook/web-components";
import "./Chip.wc";
import { html } from "lit";

const meta: Meta = {
  title: 'Components/Forms/Chip',
  component: 'biz-chip',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    value: { control: 'object' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    deletable: { control: 'boolean' },
    allowDuplicates: { control: 'boolean' },
    maxChips: { control: 'number' },
  },
  args: {
    variant: 'outlined',
    size: 'medium',
    value: ['React', 'Vue', 'Lit'],
    placeholder: '태그 입력...',
    disabled: false,
    readonly: false,
    error: false,
    deletable: true,
    allowDuplicates: false,
    maxChips: Infinity,
  },
  render: (args) => html`
    <biz-chip
      .variant=${args.variant}
      .size=${args.size}
      .value=${args.value}
      .placeholder=${args.placeholder}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      ?deletable=${args.deletable}
      ?allow-duplicates=${args.allowDuplicates}
      .maxChips=${args.maxChips}
    >
      <span slot="label-slot">기술 스택</span>
      <span slot="helper-text-slot">엔터 또는 쉼표를 눌러 태그를 추가하세요.</span>
    </biz-chip>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-chip .value=${['Outlined', 'Variant']} variant="outlined">
        <span slot="label-slot">Outlined</span>
      </biz-chip>
      <biz-chip .value=${['Filled', 'Variant']} variant="filled">
        <span slot="label-slot">Filled</span>
      </biz-chip>
      <biz-chip .value=${['Standard', 'Variant']} variant="standard">
        <span slot="label-slot">Standard</span>
      </biz-chip>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-chip .value=${['Small', 'Size']} size="small">
        <span slot="label-slot">Small</span>
      </biz-chip>
      <biz-chip .value=${['Medium', 'Size']} size="medium">
        <span slot="label-slot">Medium</span>
      </biz-chip>
      <biz-chip .value=${['Large', 'Size']} size="large">
        <span slot="label-slot">Large</span>
      </biz-chip>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-chip .value=${['Disabled', 'State']} disabled>
        <span slot="label-slot">Disabled</span>
      </biz-chip>
      <biz-chip .value=${['Readonly', 'State']} readonly>
        <span slot="label-slot">Readonly</span>
      </biz-chip>
      <biz-chip .value=${['Error', 'State']} error>
        <span slot="label-slot">Error</span>
        <span slot="helper-text-slot">잘못된 입력입니다.</span>
      </biz-chip>
    </div>
  `,
};