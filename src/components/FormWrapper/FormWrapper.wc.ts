import { LitElement, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { FormWrapperHost } from './FormWrapper';
import { FormWrapperTemplate } from './FormWrapper';
import { formWrapperStyles } from './FormWrapper.css';

@customElement('biz-form-wrapper')
export class FormWrapper extends LitElement implements FormWrapperHost {
  static styles = formWrapperStyles;

  @property({ type: String })
  label = '';

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String, attribute: 'helper-text' })
  helperText = '';

  @property({ type: String, attribute: 'error-message' })
  errorMessage = '';

  @property({ type: String, attribute: 'success-message' })
  successMessage = '';

  @property({ type: String, reflect: true })
  layout: 'vertical' | 'horizontal' | 'inline' = 'vertical';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  @property({ type: String, attribute: 'label-width' })
  labelWidth = '120px';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @state()
  private _generatedId = `biz-form-wrapper-msg-${Math.random().toString(36).substring(2, 9)}`;

  get helperTextId(): string {
    return this._generatedId;
  }

  protected updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (
      changedProperties.has('errorMessage') ||
      changedProperties.has('required') ||
      changedProperties.has('disabled') ||
      changedProperties.has('helperText') ||
      changedProperties.has('successMessage')
    ) {
      this._updateSubComponentAria();
    }
  }

  handleSlotChange(): void {
    this._updateSubComponentAria();
  }

  handleLabelClick(event: MouseEvent): void {
    event.preventDefault();

    if (this.disabled) {
      return;
    }

    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
    if (!slot) return;

    const assignedElements = slot.assignedElements({ flatten: true }) as HTMLElement[];
    if (assignedElements.length === 0) return;

    const targetElement = assignedElements[0];
    if (typeof targetElement.focus === 'function') {
      targetElement.focus();
    }
  }

  private _updateSubComponentAria(): void {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
    if (!slot) return;

    const assignedElements = slot.assignedElements({ flatten: true }) as HTMLElement[];
    if (assignedElements.length === 0) return;

    const targetElement = assignedElements[0];

    if (this.errorMessage) {
      targetElement.setAttribute('aria-invalid', 'true');
    } else {
      targetElement.removeAttribute('aria-invalid');
    }

    if (this.required) {
      targetElement.setAttribute('aria-required', 'true');
    } else {
      targetElement.removeAttribute('aria-required');
    }

    if (this.disabled) {
      targetElement.setAttribute('aria-disabled', 'true');
      targetElement.setAttribute('disabled', '');
    } else {
      targetElement.removeAttribute('aria-disabled');
      targetElement.removeAttribute('disabled');
    }

    const hasMessage = Boolean(this.errorMessage || this.successMessage || this.helperText);
    if (hasMessage) {
      targetElement.setAttribute('aria-describedby', this.helperTextId);
    } else {
      targetElement.removeAttribute('aria-describedby');
    }
  }

  render(): TemplateResult {
    return FormWrapperTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-form-wrapper': FormWrapper;
  }
}