import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { checkboxGroupStyles } from './CheckboxGroup.css.js';
import { CheckboxGroupTemplate } from './CheckboxGroup.js';

let instanceCounter = 0;

@customElement('biz-checkbox-group')
export class CheckboxGroup extends LitElement {
  static styles = checkboxGroupStyles;

  @property({ type: Array }) value: string[] = [];
  @property({ type: String }) name = '';
  @property({ type: String }) orientation: 'vertical' | 'horizontal' = 'vertical';
  @property({ type: String }) variant: 'standard' | 'card' | 'button' = 'standard';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean }) error = false;
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth = false;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = Number.POSITIVE_INFINITY;

  @state() private labelId = `biz-checkbox-group-label-${++instanceCounter}`;
  @state() private helperId = `biz-checkbox-group-helper-${instanceCounter}`;

  private handleSlotChange(): void {
    this.syncChildCheckboxes();
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    if (
      changedProperties.has('value') ||
      changedProperties.has('disabled') ||
      changedProperties.has('readonly') ||
      changedProperties.has('name')
    ) {
      this.syncChildCheckboxes();
    }
  }

  private getSlottedCheckboxes(): HTMLInputElement[] {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
    if (!slot) return [];
    
    const assigned = slot.assignedElements({ flatten: true });
    const checkboxes: HTMLInputElement[] = [];

    assigned.forEach((el) => {
      if (el instanceof HTMLInputElement && el.type === 'checkbox') {
        checkboxes.push(el);
      }
      const nested = el.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
      nested.forEach((input) => checkboxes.push(input));
    });

    return checkboxes;
  }

  private syncChildCheckboxes(): void {
    const checkboxes = this.getSlottedCheckboxes();
    checkboxes.forEach((cb) => {
      if (this.name) cb.name = this.name;
      cb.checked = this.value.includes(cb.value);
      cb.disabled = this.disabled;
      cb.readOnly = this.readonly;
      
      cb.removeEventListener('change', this.handleChildChange);
      cb.addEventListener('change', this.handleChildChange);
    });
  }

  private handleChildChange = (e: Event): void => {
    if (this.disabled || this.readonly) return;
    
    const target = e.target as HTMLInputElement;
    let newValue = [...this.value];

    if (target.checked) {
      if (newValue.length < this.max && !newValue.includes(target.value)) {
        newValue.push(target.value);
      } else if (newValue.length >= this.max) {
        target.checked = false;
        return;
      }
    } else {
      newValue = newValue.filter((v) => v !== target.value);
    }

    this.value = newValue;
    this.dispatchChangeEvent();
  };

  private dispatchChangeEvent(): void {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    );
  }

  public clear(): void {
    if (this.disabled || this.readonly) return;
    this.value = [];
    this.syncChildCheckboxes();
    this.dispatchChangeEvent();
    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true
      })
    );
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.clear();
    }
  }

  render(): TemplateResult {
    return CheckboxGroupTemplate({
      labelId: this.labelId,
      helperId: this.helperId,
      orientation: this.orientation,
      size: this.size,
      variant: this.variant,
      fullWidth: this.fullWidth,
      required: this.required,
      disabled: this.disabled,
      readonly: this.readonly,
      error: this.error,
      onSlotChange: () => this.handleSlotChange()
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-checkbox-group': CheckboxGroup;
  }
}