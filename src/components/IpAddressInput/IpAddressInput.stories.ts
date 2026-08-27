import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';
import type { IpAddressInputHost } from './IpAddressInput.js';
import './IpAddressInput.wc.js';

type IpAddressInputArgs = Required<IpAddressInputHost> & {
  labelSlot?: string;
  prefixSlot?: string;
  suffixSlot?: string;
  separatorSlot?: string;
  helperTextSlot?: string;
  onInput?: (event: CustomEvent) => void;
  onChange?: (event: CustomEvent) => void;
  onPaste?: (event: CustomEvent) => void;
  onFocus?: (event: CustomEvent) => void;
  onBlur?: (event: CustomEvent) => void;
};

const meta: Meta<IpAddressInputArgs> = {
  title: 'Components/Forms/IpAddressInput',
  component: 'biz-ip-address-input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['ipv4', 'ipv6'],
      description: 'IP 프로토콜 버전',
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: '형태 옵션',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '크기 옵션',
    },
    value: {
      control: 'text',
      description: '전체 IP 주소 문자열',
    },
    autoFocusNext: {
      control: 'boolean',
      description: '입력 완료 시 다음 세그먼트 자동 이동 여부',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
    readonly: {
      control: 'boolean',
      description: '읽기 전용 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    error: {
      control: 'boolean',
      description: '유효성 에러 상태 여부',
    },
    fullWidth: {
      control: 'boolean',
      description: '부모 요소 너비 100% 확장 여부',
    },
    labelSlot: {
      control: 'text',
      description: 'label-slot 영역 커스텀 컨텐츠',
    },
    prefixSlot: {
      control: 'text',
      description: 'prefix-slot 영역 커스텀 컨텐츠',
    },
    suffixSlot: {
      control: 'text',
      description: 'suffix-slot 영역 커스텀 컨텐츠',
    },
    separatorSlot: {
      control: 'text',
      description: 'separator-slot 영역 커스텀 컨텐츠',
    },
    helperTextSlot: {
      control: 'text',
      description: 'helper-text-slot 영역 커스텀 컨텐츠',
    },
  },
  args: {
    type: 'ipv4',
    variant: 'outlined',
    size: 'medium',
    value: '',
    segments: [],
    autoFocusNext: true,
    required: false,
    readonly: false,
    disabled: false,
    error: false,
    fullWidth: false,
    activeSegmentIndex: -1,
    labelSlot: 'IP 주소',
    prefixSlot: '',
    suffixSlot: '',
    separatorSlot: '',
    helperTextSlot: '올바른 IP 주소 형식으로 입력하세요.',
    onInput: fn(),
    onChange: fn(),
    onPaste: fn(),
    onFocus: fn(),
    onBlur: fn(),
    handleSegmentInput: () => {},
    handleSegmentKeyDown: () => {},
    handleSegmentPaste: () => {},
    handleSegmentFocus: () => {},
    handleContainerBlur: () => {},
  },
  render: (args) => html`
    <biz-ip-address-input
      .type=${args.type}
      .variant=${args.variant}
      .size=${args.size}
      .value=${args.value}
      ?auto-focus-next=${args.autoFocusNext}
      ?required=${args.required}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      ?error=${args.error}
      ?full-width=${args.fullWidth}
      @input=${args.onInput}
      @change=${args.onChange}
      @paste=${args.onPaste}
      @focus=${args.onFocus}
      @blur=${args.onBlur}
    >
      ${args.labelSlot
        ? html`<label slot="label-slot" for="ip-input">${args.labelSlot}</label>`
        : ''}
      ${args.prefixSlot
        ? html`<span slot="prefix-slot">${args.prefixSlot}</span>`
        : ''}
      ${args.suffixSlot
        ? html`<span slot="suffix-slot">${args.suffixSlot}</span>`
        : ''}
      ${args.separatorSlot
        ? html`<span slot="separator-slot">${args.separatorSlot}</span>`
        : ''}
      ${args.helperTextSlot
        ? html`<span slot="helper-text-slot">${args.helperTextSlot}</span>`
        : ''}
    </biz-ip-address-input>
  `,
};

export default meta;
type Story = StoryObj<IpAddressInputArgs>;

export const Default: Story = {
  args: {
    value: '192.168.0.1',
  },
};

export const IPv6Mode: Story = {
  args: {
    type: 'ipv6',
    value: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
    labelSlot: 'IPv6 주소',
    helperTextSlot: '16진수 8개 세그먼트를 입력하세요.',
  },
};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-ip-address-input .variant=${'outlined'} .value=${'10.0.0.1'}>
        <label slot="label-slot">Outlined Variant</label>
      </biz-ip-address-input>
      <biz-ip-address-input .variant=${'filled'} .value=${'10.0.0.1'}>
        <label slot="label-slot">Filled Variant</label>
      </biz-ip-address-input>
      <biz-ip-address-input .variant=${'standard'} .value=${'10.0.0.1'}>
        <label slot="label-slot">Standard Variant</label>
      </biz-ip-address-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <biz-ip-address-input .size=${'small'} .value=${'172.16.0.1'}>
        <label slot="label-slot">Small Size</label>
      </biz-ip-address-input>
      <biz-ip-address-input .size=${'medium'} .value=${'172.16.0.1'}>
        <label slot="label-slot">Medium Size</label>
      </biz-ip-address-input>
      <biz-ip-address-input .size=${'large'} .value=${'172.16.0.1'}>
        <label slot="label-slot">Large Size</label>
      </biz-ip-address-input>
    </div>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '192.168.1.100',
    helperTextSlot: '비활성화된 상태입니다.',
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
    value: '10.0.0.254',
    helperTextSlot: '읽기 전용 상태입니다. 복사가 가능합니다.',
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
    value: '256.100.0.1',
    helperTextSlot: '유효하지 않은 IP 주소입니다.',
  },
};

export const EventHandlers: Story = {
  args: {
    value: '127.0.0.1',
    helperTextSlot: '세그먼트 입력, 포커스, 붙여넣기 시 이벤트를 확인하세요.',
  },
};