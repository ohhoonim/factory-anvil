import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './Slider.wc';

interface SliderStoryArgs {
  value: number | number[];
  min: number;
  max: number;
  step: number;
  mode: 'single' | 'range';
  orientation: 'horizontal' | 'vertical';
  showTicks: boolean;
  showTooltip: 'always' | 'hover' | 'drag' | 'never';
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  variant: 'standard' | 'outlined' | 'filled';
  size: 'small' | 'medium' | 'large';
  name: string;
}

const meta: Meta<SliderStoryArgs> = {
  title: 'Components/Forms/Slider',
  component: 'biz-slider',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'object' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    mode: { control: { type: 'select' }, options: ['single', 'range'] },
    orientation: { control: { type: 'select' }, options: ['horizontal', 'vertical'] },
    showTicks: { control: 'boolean' },
    showTooltip: { control: { type: 'select' }, options: ['always', 'hover', 'drag', 'never'] },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    variant: { control: { type: 'select' }, options: ['standard', 'outlined', 'filled'] },
    size: { control: { type: 'select' }, options: ['small', 'medium', 'large'] },
  },
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    mode: 'single',
    orientation: 'horizontal',
    showTicks: false,
    showTooltip: 'hover',
    readonly: false,
    disabled: false,
    error: false,
    variant: 'standard',
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<SliderStoryArgs>;

export const Default: Story = {
  render: (args) => html`
    <biz-slider
      .value=${args.value}
      .min=${args.min}
      .max=${args.max}
      .step=${args.step}
      .mode=${args.mode}
      .orientation=${args.orientation}
      ?show-ticks=${args.showTicks}
      show-tooltip=${args.showTooltip}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?error=${args.error}
      variant=${args.variant}
      size=${args.size}
    >
      <span slot="label-slot">Volume Control</span>
    </biz-slider>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
      <div>
        <h4>Standard</h4>
        <biz-slider variant="standard" .value=${30}>
          <span slot="label-slot">Standard Variant</span>
        </biz-slider>
      </div>
      <div>
        <h4>Outlined</h4>
        <biz-slider variant="outlined" .value=${50}>
          <span slot="label-slot">Outlined Variant</span>
        </biz-slider>
      </div>
      <div>
        <h4>Filled</h4>
        <biz-slider variant="filled" .value=${70}>
          <span slot="label-slot">Filled Variant</span>
        </biz-slider>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
      <biz-slider size="small" .value=${20}>
        <span slot="label-slot">Small Size</span>
      </biz-slider>
      <biz-slider size="medium" .value=${50}>
        <span slot="label-slot">Medium Size</span>
      </biz-slider>
      <biz-slider size="large" .value=${80}>
        <span slot="label-slot">Large Size</span>
      </biz-slider>
    </div>
  `,
};

export const RangeMode: Story = {
  render: () => html`
    <div style="width: 400px;">
      <biz-slider mode="range" .value=${[20, 80]} .step=${5} show-ticks>
        <span slot="label-slot">Price Range Select ($)</span>
      </biz-slider>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
      <biz-slider disabled .value=${40}>
        <span slot="label-slot">Disabled State</span>
      </biz-slider>
      <biz-slider readonly .value=${60}>
        <span slot="label-slot">Readonly State</span>
      </biz-slider>
      <biz-slider error .value=${90}>
        <span slot="label-slot">Error State</span>
        <span slot="helper-text-slot" style="color: var(--biz-slider-error-color);">Value exceeds allowed range</span>
      </biz-slider>
    </div>
  `,
};