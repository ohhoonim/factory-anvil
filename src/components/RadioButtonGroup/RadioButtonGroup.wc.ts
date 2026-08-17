import { LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { RadioButtonGroupTemplate } from "./RadioButtonGroup";
import { radioButtonGroupStyles } from "./RadioButtonGroup.css";

@customElement('biz-radio-button-group')
export class BizRadioButtonGroup extends LitElement {
  static styles = radioButtonGroupStyles;

  @property({ type: String }) value = '';
  @property({ type: String }) name = '';
  @property({ type: String }) orientation: 'vertical' | 'horizontal' = 'vertical';
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: String }) variant: 'standard' | 'card' | 'button' | 'outlined' | 'filled' = 'standard';
  @property({ type: String }) label = '';
  @property({ type: String, attribute: 'helper-text' }) helperText = '';
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false;

  @state() private labelId = `biz-radio-group-label-${Math.random().toString(36).substring(2, 9)}`;
  @state() private helperTextId = `biz-radio-group-helper-${Math.random().toString(36).substring(2, 9)}`;

  firstUpdated() {
    this.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('name') || changedProperties.has('disabled') || changedProperties.has('readonly') || changedProperties.has('value')) {
      this.syncSubRadioButtons();
    }
  }

  private getRadios(): HTMLElement[] {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (!slot) return [];
    return slot
      .assignedElements({ flatten: true })
      .filter((el): el is HTMLElement => el.tagName.toLowerCase().includes('radio') || el.getAttribute('role') === 'radio');
  }

  private syncSubRadioButtons() {
    const radios = this.getRadios();
    radios.forEach((radio) => {
      if (this.name) radio.setAttribute('name', this.name);
      if (this.disabled) radio.setAttribute('disabled', '');
      else radio.removeAttribute('disabled');

      if (this.readonly) radio.setAttribute('readonly', '');
      else radio.removeAttribute('readonly');

      const radioValue = radio.getAttribute('value') || (radio as HTMLInputElement).value;
      if (radioValue === this.value) {
        radio.setAttribute('checked', '');
        (radio as HTMLInputElement).checked = true;
      } else {
        radio.removeAttribute('checked');
        (radio as HTMLInputElement).checked = false;
      }
    });
  }

  private handleSlotChange() {
    this.syncSubRadioButtons();
  }

  private handleValueChange(e: Event) {
    if (this.disabled || this.readonly) return;
    const target = e.target as HTMLElement | HTMLInputElement;
    const newValue = (target as HTMLInputElement).value || target.getAttribute('value') || '';
    
    if (this.value !== newValue) {
      this.value = newValue;
      this.dispatchChangeEvent();
    }
  }

  private dispatchChangeEvent() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  public clear() {
    if (this.disabled || this.readonly) return;
    this.value = '';
    this.syncSubRadioButtons();
    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.disabled || this.readonly) return;

    const radios = this.getRadios();
    if (radios.length === 0) return;

    const currentIndex = radios.findIndex((radio) => radio === document.activeElement || radio.contains(document.activeElement as Node) || (radio as HTMLInputElement).checked);

    let nextIndex = -1;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = currentIndex < radios.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : radios.length - 1;
        break;
      case ' ':
      case 'Enter':
        if (currentIndex >= 0) {
          const radio = radios[currentIndex];
          const radioValue = radio.getAttribute('value') || (radio as HTMLInputElement).value;
          if (radioValue && this.value !== radioValue) {
            this.value = radioValue;
            this.dispatchChangeEvent();
          }
        }
        break;
      case 'Escape':
        this.clear();
        break;
      default:
        break;
    }

    if (nextIndex !== -1) {
      const targetRadio = radios[nextIndex];
      targetRadio.focus();
      const radioValue = targetRadio.getAttribute('value') || (targetRadio as HTMLInputElement).value;
      if (radioValue) {
        this.value = radioValue;
        this.dispatchChangeEvent();
      }
    }
  }

  render() {
    return RadioButtonGroupTemplate({
      value: this.value,
      name: this.name,
      orientation: this.orientation,
      required: this.required,
      disabled: this.disabled,
      readonly: this.readonly,
      error: this.error,
      size: this.size,
      variant: this.variant,
      label: this.label,
      helperText: this.helperText,
      labelId: this.labelId,
      helperTextId: this.helperTextId,
      handleSlotChange: this.handleSlotChange.bind(this),
      handleValueChange: this.handleValueChange.bind(this),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-radio-button-group': BizRadioButtonGroup;
  }
}