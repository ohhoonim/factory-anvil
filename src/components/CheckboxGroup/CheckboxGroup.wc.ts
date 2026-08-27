import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { type CheckboxGroupHost, CheckboxGroupTemplate } from "./CheckboxGroup";
import { checkboxGroupStyles } from "./CheckboxGroup.css";

@customElement('biz-checkbox-group')
export class BizCheckboxGroup extends LitElement implements CheckboxGroupHost {
  static formAssociated = true;
  static styles = checkboxGroupStyles;

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  @property({ type: Array }) value: string[] = [];
  @property({ type: String }) name: string = '';
  @property({ type: String }) orientation: 'vertical' | 'horizontal' = 'vertical';
  @property({ type: Boolean }) required: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ type: Boolean }) error: boolean = false;
  @property({ type: Number }) min: number = 0;
  @property({ type: Number }) max: number = Infinity;
  @property({ type: String }) variant: 'standard' | 'card' | 'button' = 'standard';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth: boolean = false;

  private get checkboxes(): HTMLInputElement[] {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (!slot) return [];
    
    const assigned = slot.assignedElements({ flatten: true });
    const results: HTMLInputElement[] = [];

    assigned.forEach((el) => {
      if (el instanceof HTMLInputElement && el.type === 'checkbox') {
        results.push(el);
      } else if (el instanceof HTMLElement) {
        const nested = el.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
        nested.forEach((input) => results.push(input));
      }
    });

    return results;
  }

  protected updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);
    if (
      changedProperties.has('value') ||
      changedProperties.has('disabled') ||
      changedProperties.has('readonly') ||
      changedProperties.has('required')
    ) {
      this.syncCheckboxes();
      this.validateForm();
    }
  }

  public handleSlotChange(): void {
    this.syncCheckboxes();
    this.validateForm();
  }

  private syncCheckboxes(): void {
    const currentValues = Array.isArray(this.value) ? this.value : [];
    
    this.checkboxes.forEach((cb) => {
      cb.checked = currentValues.includes(cb.value);
      cb.disabled = this.disabled;
      if (this.readonly) {
        cb.setAttribute('readonly', 'true');
      } else {
        cb.removeAttribute('readonly');
      }
    });
  }

  private validateForm(): void {
    if (this.required && this.value.length === 0) {
      this.internals.setValidity(
        { valueMissing: true },
        '하나 이상의 항목을 선택해 주세요.',
        this.checkboxes[0]
      );
    } else if (this.value.length < this.min) {
      this.internals.setValidity(
        { rangeUnderflow: true },
        `최소 ${this.min}개 이상 선택해야 합니다.`,
        this.checkboxes[0]
      );
    } else {
      this.internals.setValidity({});
    }
  }

  public handleCheckboxChange(e: Event): void {
    if (this.readonly || this.disabled) {
      e.preventDefault();
      return;
    }

    const target = e.target as HTMLInputElement;
    if (!target || target.type !== 'checkbox') return;

    let newValue = [...this.value];
    if (target.checked) {
      if (newValue.length < this.max) {
        if (!newValue.includes(target.value)) {
          newValue.push(target.value);
        }
      } else {
        target.checked = false;
        return;
      }
    } else {
      newValue = newValue.filter((val) => val !== target.value);
    }

    this.value = newValue;
    this.validateForm();

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  public clear(): void {
    if (this.disabled || this.readonly) return;
    this.value = [];
    this.syncCheckboxes();
    this.validateForm();

    this.dispatchEvent(
      new CustomEvent('clear', {
        detail: { value: [] },
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: [] },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return CheckboxGroupTemplate(this);
  }
}