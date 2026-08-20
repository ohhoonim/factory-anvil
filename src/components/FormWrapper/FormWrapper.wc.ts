import { LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { FormWrapperTemplate } from "./FormWrapper";
import { formWrapperStyles } from "./FormWrapper.css";
/**
 * @element 
 * 
 * @slot label-slot
 * @slot extra-slot
 * @slot helper-text-slot
 * @slot helper-text-slot
 * @slot (default)
 */
@customElement('biz-form-wrapper')
export class BizFormWrapper extends LitElement {
  static styles = formWrapperStyles;

  @property({ type: String })
  label = '';

  @property({ type: Boolean })
  required = false;

  @property({ type: String, attribute: 'helper-text' })
  helperText = '';

  @property({ type: String, attribute: 'error-message' })
  errorMessage = '';

  @property({ type: String, attribute: 'success-message' })
  successMessage = '';

  @property({ type: String })
  layout: 'vertical' | 'horizontal' | 'inline' = 'vertical';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, attribute: 'label-width' })
  labelWidth = '';

  @property({ type: Boolean, attribute: 'full-width' })
  fullWidth = false;

  @state()
  private isFocused = false;

  private helperTextId = `biz-form-wrapper-helper-${Math.random().toString(36).substring(2, 9)}`;

  firstUpdated() {
    this.updateTargetAttributes();
  }

  updated(changedProperties: Map<string, any>) {
    if (
      changedProperties.has('errorMessage') ||
      changedProperties.has('required') ||
      changedProperties.has('disabled') ||
      changedProperties.has('helperText') ||
      changedProperties.has('successMessage')
    ) {
      this.updateTargetAttributes();
    }
  }

  private getTargetElement(): HTMLElement | null {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (!slot) return null;
    const assignedElements = slot.assignedElements({ flatten: true });
    return (assignedElements[0] as HTMLElement) || null;
  }

  private updateTargetAttributes() {
    const target = this.getTargetElement();
    if (!target) return;

    if (this.errorMessage) {
      target.setAttribute('aria-invalid', 'true');
    } else {
      target.removeAttribute('aria-invalid');
    }

    if (this.required) {
      target.setAttribute('aria-required', 'true');
    } else {
      target.removeAttribute('aria-required');
    }

    if (this.disabled) {
      target.setAttribute('aria-disabled', 'true');
      target.setAttribute('disabled', '');
    } else {
      target.removeAttribute('aria-disabled');
      target.removeAttribute('disabled');
    }

    const describedBy: string[] = [];
    if (this.helperText || this.errorMessage || this.successMessage) {
      describedBy.push(this.helperTextId);
    }

    if (describedBy.length > 0) {
      target.setAttribute('aria-describedby', describedBy.join(' '));
    } else {
      target.removeAttribute('aria-describedby');
    }
  }

  private handleSlotChange() {
    this.updateTargetAttributes();
  }

  private handleLabelClick() {
    if (this.disabled) return;
    const target = this.getTargetElement();
    if (target) {
      target.focus();
    }
  }

  private handleFocusIn() {
    this.isFocused = true;
  }

  private handleFocusOut() {
    this.isFocused = false;
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

    if (event.key === 'Escape') {
      const target = this.getTargetElement();
      if (target && 'value' in target) {
        (target as HTMLInputElement).value = '';
        target.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        target.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        
        this.dispatchEvent(
          new CustomEvent('clear', {
            bubbles: true,
            composed: true,
            detail: { source: 'keyboard', key: event.key }
          })
        );
      }
    }
  }

  render() {
    return FormWrapperTemplate(this);
  }
}