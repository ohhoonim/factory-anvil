import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { fn } from "storybook/test";
import type { RadioButtonGroupHost } from "./RadioButtonGroup";
import './RadioButtonGroup.wc';

type RadioButtonGroupArgs = Required<RadioButtonGroupHost> & {
  labelSlot?: string;
  defaultSlot?: string;
  helperTextSlot?: string;
  onChange: (e: any) => void;
};

const meta: Meta<RadioButtonGroupArgs> = {
  title: 'Components/Forms/RadioButtonGroup',
  component: 'biz-radio-button-group',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'card', 'button'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    value: { control: 'text' },
    name: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    labelSlot: { control: 'text' },
    defaultSlot: { control: 'text' },
    helperTextSlot: { control: 'text' },
  },
  args: {
    value: 'option1',
    name: 'demo-radio-group',
    orientation: 'vertical',
    variant: 'standard',
    size: 'medium',
    required: false,
    disabled: false,
    readonly: false,
    error: false,
    fullWidth: false,
    labelId: 'label-id',
    helperTextId: 'helper-id',
    hasLabel: true,
    hasHelperText: true,
    labelSlot: '옵션 선택',
    defaultSlot: `
      <label><input type="radio" name="demo-radio-group" value="option1" /> 옵션 1</label>
      <label><input type="radio" name="demo-radio-group" value="option2" /> 옵션 2</label>
      <label><input type="radio" name="demo-radio-group" value="option3" /> 옵션 3</label>
    `,
    helperTextSlot: '원하시는 옵션을 하나 선택해 주세요.',
    handleSlotChange: fn(),
    handleLabelSlotChange: fn(),
    handleHelperSlotChange: fn(),
  },
  render: (args) => html`
    <biz-radio-button-group
      .value=${args.value}
      .name=${args.name}
      .orientation=${args.orientation}
      .variant=${args.variant}
      .size=${args.size}
      ?required=${args.required}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      ?full-width=${args.fullWidth}
    >
      ${args.labelSlot ? html`<span slot="label-slot">${args.labelSlot}</span>` : ''}
      ${unsafeHTML(args.defaultSlot)}
      ${args.helperTextSlot ? html`<span slot="helper-text-slot">${args.helperTextSlot}</span>` : ''}
    </biz-radio-button-group>
  `,
};

export default meta;
type Story = StoryObj<RadioButtonGroupArgs>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <p><strong>Standard Variant</strong></p>
        <biz-radio-button-group variant="standard" value="opt1">
          <span slot="label-slot">스탠다드 스타일</span>
          <label><input type="radio" name="v1" value="opt1" /> 옵션 A</label>
          <label><input type="radio" name="v1" value="opt2" /> 옵션 B</label>
        </biz-radio-button-group>
      </div>

      <div>
        <p><strong>Card Variant</strong></p>
        <biz-radio-button-group variant="card" value="opt1">
          <span slot="label-slot">카드 스타일</span>
          <label style="border: 1px solid #ccc; padding: 12px; border-radius: 8px;">
            <input type="radio" name="v2" value="opt1" /> 카드 옵션 A
          </label>
          <label style="border: 1px solid #ccc; padding: 12px; border-radius: 8px;">
            <input type="radio" name="v2" value="opt2" /> 카드 옵션 B
          </label>
        </biz-radio-button-group>
      </div>

      <div>
        <p><strong>Button Variant (Segmented Control)</strong></p>
        <biz-radio-button-group variant="button" orientation="horizontal" value="opt1">
          <span slot="label-slot">버튼 스타일</span>
          <label style="padding: 6px 12px;"><input type="radio" name="v3" value="opt1" /> 버튼 A</label>
          <label style="padding: 6px 12px;"><input type="radio" name="v3" value="opt2" /> 버튼 B</label>
        </biz-radio-button-group>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <biz-radio-button-group size="small" value="opt1">
        <span slot="label-slot">Small Size</span>
        <label><input type="radio" name="s1" value="opt1" /> 소형 옵션 1</label>
        <label><input type="radio" name="s1" value="opt2" /> 소형 옵션 2</label>
      </biz-radio-button-group>

      <biz-radio-button-group size="medium" value="opt1">
        <span slot="label-slot">Medium Size</span>
        <label><input type="radio" name="s2" value="opt1" /> 중형 옵션 1</label>
        <label><input type="radio" name="s2" value="opt2" /> 중형 옵션 2</label>
      </biz-radio-button-group>

      <biz-radio-button-group size="large" value="opt1">
        <span slot="label-slot">Large Size</span>
        <label><input type="radio" name="s3" value="opt1" /> 대형 옵션 1</label>
        <label><input type="radio" name="s3" value="opt2" /> 대형 옵션 2</label>
      </biz-radio-button-group>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <biz-radio-button-group disabled value="opt1">
        <span slot="label-slot">Disabled State</span>
        <label><input type="radio" name="st1" value="opt1" /> 비활성화 옵션 1</label>
        <label><input type="radio" name="st1" value="opt2" /> 비활성화 옵션 2</label>
        <span slot="helper-text-slot">이 비활성화된 그룹은 선택을 변경할 수 없습니다.</span>
      </biz-radio-button-group>

      <biz-radio-button-group readonly value="opt1">
        <span slot="label-slot">Readonly State</span>
        <label><input type="radio" name="st2" value="opt1" /> 읽기전용 옵션 1</label>
        <label><input type="radio" name="st2" value="opt2" /> 읽기전용 옵션 2</label>
      </biz-radio-button-group>

      <biz-radio-button-group error required value="">
        <span slot="label-slot">Error State (Required)</span>
        <label><input type="radio" name="st3" value="opt1" /> 에러 상태 옵션 1</label>
        <label><input type="radio" name="st3" value="opt2" /> 에러 상태 옵션 2</label>
        <span slot="helper-text-slot">필수 선택 항목입니다. 하나를 선택해 주세요.</span>
      </biz-radio-button-group>
    </div>
  `,
};

export const ChangeEventStory: Story = {
  args: {
    onChange: fn(),
  },
  render: (args) => html`
    <biz-radio-button-group
      .value=${args.value}
      .name=${args.name}
      @change=${(e: CustomEvent) => args.onChange(e)}
    >
      <span slot="label-slot">이벤트 테스트 그룹</span>
      <label><input type="radio" name="evt-group" value="opt1" /> 옵션 1</label>
      <label><input type="radio" name="evt-group" value="opt2" /> 옵션 2</label>
      <label><input type="radio" name="evt-group" value="opt3" /> 옵션 3</label>
      <span slot="helper-text-slot">라디오 버튼 선택 변경 시 change 이벤트가 발생합니다.</span>
    </biz-radio-button-group>
  `,
};