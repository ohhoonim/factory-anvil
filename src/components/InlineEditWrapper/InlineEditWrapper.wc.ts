import { LitElement, html } from 'lit';
import { customElement, property, state, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { inlineEditWrapperStyles } from './InlineEditWrapper.css.js';
import { InlineEditWrapperTemplate } from './InlineEditWrapper.js';
import type { InlineEditWrapperHost } from './InlineEditWrapper.js';

@customElement('biz-inline-edit-wrapper')
export class BizInlineEditWrapper extends LitElement implements InlineEditWrapperHost {
  static styles = inlineEditWrapperStyles;

  @property({ type: String }) value = '';
  @property({ type: String }) mode: 'view' | 'edit' = 'view';
  @property({ type: String }) variant: 'standard' | 'outlined' | 'ghost' = 'standard';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: String }) trigger: 'click' | 'dblclick' | 'focus' = 'click';
  @property({ type: Boolean, attribute: 'show-actions' }) showActions = false;
  @property({ type: Boolean, attribute: 'auto-save' }) autoSave = true;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) error = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = true;

  @state() private _oldValue = '';

  @queryAssignedElements({ flatten: true })
  private _defaultSlotElements!: HTMLElement[];

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('mode')) {
      if (this.mode === 'edit') {
        this.updateComplete.then(() => {
          this._focusEditControl();
        });
      }
      this.dispatchEvent(
        new CustomEvent('mode-change', {
          bubbles: true,
          composed: true,
          detail: { mode: this.mode },
        })
      );
    }
  }

  private _focusEditControl(): void {
    if (!this._defaultSlotElements || this._defaultSlotElements.length === 0) return;

    const firstElement = this._defaultSlotElements[0];
    if (firstElement instanceof HTMLInputElement || firstElement instanceof HTMLTextAreaElement || firstElement instanceof HTMLSelectElement) {
      firstElement.focus();
    } else {
      const input = firstElement.querySelector<HTMLElement>('input, textarea, select, [tabindex="0"]');
      if (input) {
        input.focus();
      } else if (typeof firstElement.focus === 'function') {
        firstElement.focus();
      }
    }
  }

  private _getInputValue(): string {
    if (!this._defaultSlotElements || this._defaultSlotElements.length === 0) {
      return this.value;
    }

    const firstElement = this._defaultSlotElements[0];
    if ('value' in firstElement && typeof (firstElement as HTMLInputElement).value === 'string') {
      return (firstElement as HTMLInputElement).value;
    }

    const input = firstElement.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select');
    if (input && 'value' in input) {
      return input.value;
    }

    return this.value;
  }

  handleTrigger(e: Event): void {
    if (this.disabled || this.mode === 'edit') return;
    this._oldValue = this.value;
    this.mode = 'edit';
  }

  handleSave(e?: Event): void {
    if (e) e.stopPropagation();
    const newValue = this._getInputValue();
    const previousValue = this._oldValue;
    this.value = newValue;
    this.mode = 'view';

    this.dispatchEvent(
      new CustomEvent('save', {
        bubbles: true,
        composed: true,
        detail: { value: newValue, oldValue: previousValue },
      })
    );
  }

  handleCancel(e?: Event): void {
    if (e) e.stopPropagation();
    this.mode = 'view';

    this.dispatchEvent(
      new CustomEvent('cancel', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  handleBlur(e: FocusEvent): void {
    const relatedTarget = e.relatedTarget as Node | null;
    if (relatedTarget && this.shadowRoot?.contains(relatedTarget)) {
      return;
    }

    if (this.mode === 'edit' && this.autoSave) {
      this.handleSave();
    }
  }

  handleKeyDown(e: KeyboardEvent): void {
    if (this.disabled) return;

    if (this.mode === 'view') {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.handleTrigger(e);
      }
    } else if (this.mode === 'edit') {
      if (e.key === 'Enter') {
        if (e.target instanceof HTMLTextAreaElement && e.shiftKey) {
          return;
        }
        e.preventDefault();
        this.handleSave(e);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.handleCancel(e);
      }
    }
  }

  render() {
    return InlineEditWrapperTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-inline-edit-wrapper': BizInlineEditWrapper;
  }
}