import { LitElement, type PropertyValues } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { type RadioButtonGroupHost, RadioButtonGroupTemplate } from "./RadioButtonGroup";
import { radioButtonGroupStyles } from "./RadioButtonGroup.css";

@customElement('biz-radio-button-group')
export class BizRadioButtonGroup extends LitElement implements RadioButtonGroupHost {
  static styles = radioButtonGroupStyles;

  @property({ type: String })
  value = '';

  @property({ type: String })
  name = '';

  @property({ type: String })
  orientation: 'vertical' | 'horizontal' = 'vertical';

  @property({ type: String })
  variant: 'standard' | 'card' | 'button' = 'standard';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  @state()
  hasLabel = false;

  @state()
  hasHelperText = false;

  labelId = `biz-radio-group-label-${Math.random().toString(36).substring(2, 9)}`;
  helperTextId = `biz-radio-group-helper-${Math.random().toString(36).substring(2, 9)}`;

  @query('slot:not([name])')
  private defaultSlot?: HTMLSlotElement;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (
      changedProperties.has('value') ||
      changedProperties.has('name') ||
      changedProperties.has('disabled') ||
      changedProperties.has('readonly') ||
      changedProperties.has('required')
    ) {
      this.syncChildRadioButtons();
    }
  }

  private getRadioItems(): HTMLInputElement[] {
    if (!this.defaultSlot) return [];
    const assigned = this.defaultSlot.assignedElements({ flatten: true });
    const items: HTMLInputElement[] = [];

    assigned.forEach((el) => {
      if (el instanceof HTMLInputElement && el.type === 'radio') {
        items.push(el);
      } else {
        const radios = el.querySelectorAll<HTMLInputElement>('input[type="radio"]');
        radios.forEach((r) => items.push(r));
      }
    });

    return items;
  }

  private syncChildRadioButtons() {
    const radios = this.getRadioItems();
    radios.forEach((radio) => {
      if (this.name) {
        radio.name = this.name;
      }
      radio.checked = radio.value === this.value;
      radio.disabled = this.disabled;
      radio.readOnly = this.readonly;
      radio.required = this.required;
    });
  }

  handleSlotChange = () => {
    this.syncChildRadioButtons();
  };

  handleLabelSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    this.hasLabel = slot.assignedNodes({ flatten: true }).length > 0;
  };

  handleHelperSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    this.hasHelperText = slot.assignedNodes({ flatten: true }).length > 0;
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled || this.readonly) return;

    const radios = this.getRadioItems().filter((r) => !r.disabled);
    if (radios.length === 0) return;

    const currentIndex = radios.findIndex((r) => r.checked || r === shadowRootActiveElement(this.shadowRoot) || r === document.activeElement);

    let nextIndex = -1;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % radios.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = currentIndex < 0 ? radios.length - 1 : (currentIndex - 1 + radios.length) % radios.length;
        break;
      case 'Space':
      case ' ':
        if (currentIndex >= 0 && !radios[currentIndex].checked) {
          e.preventDefault();
          this.selectRadio(radios[currentIndex]);
        }
        return;
      default:
        return;
    }

    if (nextIndex >= 0) {
      const targetRadio = radios[nextIndex];
      targetRadio.focus();
      this.selectRadio(targetRadio);
    }
  };

  private selectRadio(radio: HTMLInputElement) {
    if (this.value !== radio.value) {
      this.value = radio.value;
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    return RadioButtonGroupTemplate(this);
  }
}

function shadowRootActiveElement(root: ShadowRoot | null): Element | null {
  if (!root) return null;
  return root.activeElement;
}