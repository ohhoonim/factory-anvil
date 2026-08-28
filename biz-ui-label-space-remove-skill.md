# [Skill] Form Component Label Slot 여백 자동 제어 패턴

라벨 슬롯(`label-slot` 또는 기본 `label`)을 사용하는 모든 범용 Form 컴포넌트(Input, Select, Checkbox, Textarea 등)에서 라벨 주입 여부에 따라 상단/좌측 여백이 불필요하게 차지하지 않도록 제어하는 범용 처리 패턴입니다.

---

## 1. 핵심 원리

1. **CSS `:has()` Selector**: 별도 JS 로직 실행 전 CSS 단계에서 슬롯이 비어있으면 컨테이너를 숨겨 깜빡임(FOUC) 방지
2. **Dynamic Slot Validation**: 공백 텍스트 노드(`" "`)나 주석 노드를 제외한 **유효 엘리먼트/텍스트 존재 여부**를 `@slotchange`로 정확히 판별
3. **Host Attribute Reflection**: CSS 선택자 결합도를 낮추기 위해 Host 요소를 통해 상태 반영 (`[has-label]`)

---

## 2. 범용 Lit Controller 모듈 (`LabelSlotController.ts`)

모든 Lit 기반 Form 컴포넌트에 재사용 가능한 Controller 패턴 모듈입니다.

```typescript
import { ReactiveController, ReactiveControllerHost } from 'lit';

export interface LabelSlotHost extends ReactiveControllerHost, HTMLElement {
  hasLabel: boolean;
}

export class LabelSlotController implements ReactiveController {
  private host: LabelSlotHost;
  private slotName: string;

  constructor(host: LabelSlotHost, slotName = 'label-slot') {
    this.host = host;
    this.slotName = slotName;
    this.host.addController(this);
  }

  hostConnected(): void {
    // 초기화 로직
  }

  handleSlotChange = (e: Event): void => {
    const slot = e.target as HTMLSlotElement;
    if (slot.name !== this.slotName) return;

    const assignedNodes = slot.assignedNodes({ flatten: true });
    
    // 유효한 엘리먼트 노드 또는 공백이 아닌 텍스트 노드가 존재하는지 검증
    const hasContent = assignedNodes.some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      if (node.nodeType === Node.TEXT_NODE) {
        return (node.textContent ?? '').trim().length > 0;
      }
      return false;
    });

    this.host.hasLabel = hasContent;

    // Host Attribute 및 내부 Container style 동기화
    if (hasContent) {
      this.host.setAttribute('has-label', '');
    } else {
      this.host.removeAttribute('has-label');
    }
  };
}

```

---

## 3. 범용 CSS 스타일 패턴 (`form-label.css.ts`)

모든 Form 컴포넌트 스타일시트에 공통으로 적용할 수 있는 CSS 가이드입니다.

```css
/* 1. 기본 라벨 컨테이너 구조 */
.label-container {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--form-label-text-color, #111827);
}

/* 2. CSS-First: 슬롯 내부 요소가 없으면 즉시 hidden */
.label-container:has(slot[name="label-slot"]:empty),
.label-container:has(slot:not([name]):empty) {
  display: none !important;
}

/* 3. Host Attribute 기반 제어 (Controller 연동 시) */
:host(:not([has-label])) .label-container {
  display: none !important;
}

/* 4. Form 루트의 Layout Gap 정리 */
:host(:not([has-label])) .form-control-root {
  gap: 0;
}

```

---

## 4. 컴포넌트 적용 예시

### 4.1. Core Template (`FormTemplate.ts`)

```typescript
import { html, TemplateResult } from 'lit';

export interface GenericFormHost {
  hasLabel: boolean;
  handleLabelSlotChange: (e: Event) => void;
}

export const FormLabelTemplate = (host: GenericFormHost, slotName = 'label-slot'): TemplateResult => {
  return html`
    <div class="label-container">
      <slot name="${slotName}" @slotchange="${host.handleLabelSlotChange}"></slot>
    </div>
  `;
};

```

### 4.2. Web Component Class (`BizSelect.wc.ts` 예시)

```typescript
import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LabelSlotController } from './LabelSlotController.ts';

@customElement('biz-select')
export class BizSelect extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: 'has-label' })
  hasLabel = false;

  private labelController = new LabelSlotController(this, 'label-slot');

  handleLabelSlotChange(e: Event): void {
    this.labelController.handleSlotChange(e);
  }

  override render(): TemplateResult {
    return html`
      <div class="form-control-root">
        <div class="label-container">
          <slot name="label-slot" @slotchange="${(e: Event) => this.handleLabelSlotChange(e)}"></slot>
        </div>
        <div class="control-body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

```

---

## 5. 검증 체크리스트

* [x] `<biz-input>`, `<biz-select>`, `<biz-checkbox>` 등 모든 Form 컴포넌트에서 라벨 슬롯 미주입 시 상단 여백(`margin`/`padding`/`gap`)이 0px로 고정되는가?
* [x] 라벨에 단순히 빈 문자열/공백(`"   "`)만 들어오는 경우 여백이 제거되는가?
* [x] JS 로직 실행 전 CSS 단계에서 `:has()`로 여백 튐(FOUC) 현상이 차단되는가?