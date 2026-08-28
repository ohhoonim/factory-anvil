import type { ReactiveController, ReactiveControllerHost } from 'lit';

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

