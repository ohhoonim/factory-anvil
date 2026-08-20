import { LitElement, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { InlineEditWrapperTemplate } from "./InlineEditWrapper";
import { inlineEditWrapperStyles } from "./InlineEditWrapper.css";

/**
 * @element biz-inline-edit-wrapper
 * 
 * @slot view-slot
 * @slot actions-slot
 * @slot (default)
 */
@customElement('biz-inline-edit-wrapper')
export class InlineEditWrapper extends LitElement {
  static styles = inlineEditWrapperStyles;

  @property({ type: String }) value = '';
  @property({ type: String }) mode: 'view' | 'edit' = 'view';
  @property({ type: String }) trigger: 'click' | 'dblclick' | 'focus' = 'click';
  @property({ type: String }) variant: 'standard' | 'outlined' | 'ghost' = 'standard';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, attribute: 'show-actions' }) showActions = false;
  @property({ type: Boolean, attribute: 'auto-save' }) autoSave = true;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) error = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false;

  @state() private _oldValue = '';

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('mode')) {
      if (this.mode === 'edit') {
        this._oldValue = this.value;
        this.updateComplete.then(() => {
          this._focusEditControl();
        });
      }
      this.dispatchEvent(
        new CustomEvent('mode-change', {
          detail: { mode: this.mode },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private _focusEditControl(): void {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (slot) {
      const assignedNodes = slot.assignedElements({ flatten: true });
      if (assignedNodes.length > 0) {
        const target = assignedNodes[0] as HTMLElement;
        if (typeof target.focus === 'function') {
          target.focus();
          return;
        }
      }
    }
    const internalControl = this.shadowRoot?.querySelector('.biz-inline-edit-wrapper__control') as HTMLElement;
    internalControl?.focus();
  }

  private _handleViewTrigger = (): void => {
    if (this.disabled || this.loading) return;
    this.mode = 'edit';
  };

  private _handleViewKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled || this.loading) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.mode = 'edit';
    }
  };

  private _handleEditKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._triggerSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this._triggerCancel();
    }
  };

  private _handleBlur = (e: FocusEvent): void => {
    if (!this.autoSave || this.mode !== 'edit') return;
    const relatedTarget = e.relatedTarget as Node | null;
    if (relatedTarget && this.contains(relatedTarget)) {
      return;
    }
    this._triggerSave();
  };

  private _triggerSave = (): void => {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (slot) {
      const assignedNodes = slot.assignedElements({ flatten: true });
      if (assignedNodes.length > 0) {
        const inputEl = assignedNodes[0] as HTMLInputElement;
        if (inputEl && 'value' in inputEl) {
          this.value = inputEl.value;
        }
      }
    }

    this.dispatchEvent(
      new CustomEvent('save', {
        detail: { value: this.value, oldValue: this._oldValue },
        bubbles: true,
        composed: true,
      })
    );
    this.mode = 'view';
  };

  private _triggerCancel = (): void => {
    this.value = this._oldValue;
    this.dispatchEvent(
      new CustomEvent('cancel', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
    this.mode = 'view';
  };

  render() {
    return InlineEditWrapperTemplate({
      value: this.value,
      mode: this.mode,
      trigger: this.trigger,
      variant: this.variant,
      size: this.size,
      showActions: this.showActions,
      autoSave: this.autoSave,
      disabled: this.disabled,
      error: this.error,
      loading: this.loading,
      onViewTrigger: this._handleViewTrigger,
      onViewKeyDown: this._handleViewKeyDown,
      onEditKeyDown: this._handleEditKeyDown,
      onBlur: this._handleBlur,
      onSave: this._triggerSave,
      onCancel: this._triggerCancel,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-inline-edit-wrapper': InlineEditWrapper;
  }
}