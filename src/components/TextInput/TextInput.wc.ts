import { LitElement, type TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { TextInputTemplate, type TextInputHost } from './TextInput.ts';
import { textInputStyles } from './TextInput.css.ts';

@customElement('biz-text-input')
export class BizTextInput extends LitElement implements TextInputHost {
    static styles = textInputStyles;

    @property({ type: String })
    value = '';

    @property({ type: String })
    type = 'text';

    @property({ type: String })
    placeholder = '';

    @property({ type: Boolean, reflect: true })
    required = false;

    @property({ type: Boolean, reflect: true })
    readonly = false;

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Boolean, reflect: true })
    error = false;

    @property({ type: Boolean, reflect: true })
    clearable = false;

    @property({ type: String })
    variant: 'outlined' | 'filled' | 'standard' = 'outlined';

    @property({ type: String })
    size: 'small' | 'medium' | 'large' = 'medium';

    @property({ type: Boolean, attribute: 'full-width', reflect: true })
    fullWidth = false;

    @property({ type: Boolean, reflect: true })
    loading = false;

    @query('#native-input')
    private inputElement?: HTMLInputElement;

    @property({ type: String, reflect: true })
    direction: 'vertical' | 'horizontal' = 'vertical';

    handleInput(e: InputEvent): void {
        const target = e.target as HTMLInputElement;
        this.value = target.value;
        this.dispatchEvent(
            new CustomEvent('input', {
                detail: { value: this.value },
                bubbles: true,
                composed: true
            })
        );
    }

    handleChange(e: Event): void {
        const target = e.target as HTMLInputElement;
        this.value = target.value;
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: { value: this.value },
                bubbles: true,
                composed: true
            })
        );
    }

    handleFocus(e: FocusEvent): void {
        this.dispatchEvent(
            new CustomEvent('focus', {
                detail: e,
                bubbles: true,
                composed: true
            })
        );
    }

    handleBlur(e: FocusEvent): void {
        this.dispatchEvent(
            new CustomEvent('blur', {
                detail: e,
                bubbles: true,
                composed: true
            })
        );
    }

    handleClear(e: MouseEvent): void {
        e.stopPropagation();
        this.value = '';
        this.dispatchEvent(
            new CustomEvent('clear', {
                bubbles: true,
                composed: true
            })
        );
        this.dispatchEvent(
            new CustomEvent('input', {
                detail: { value: '' },
                bubbles: true,
                composed: true
            })
        );
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: { value: '' },
                bubbles: true,
                composed: true
            })
        );
        this.inputElement?.focus();
    }

    handleKeyDown(e: KeyboardEvent): void {
        if (e.key === 'Escape' && this.clearable && this.value.length > 0) {
            this.handleClear(e as unknown as MouseEvent);
        }
    }

    /* TextInput.wc.ts 클래스 내부에 추가할 프로퍼티 및 메서드 */
    @property({ type: Boolean, state: true })
    hasLabelSlot = false;

    handleLabelSlotChange(e: Event): void {
        const slot = e.target as HTMLSlotElement;
        const assignedNodes = slot.assignedNodes({ flatten: true });
        this.hasLabelSlot = assignedNodes.length > 0;

        const labelContainer = this.shadowRoot?.querySelector('.label-container') as HTMLElement;
        if (labelContainer) {
            labelContainer.style.display = this.hasLabelSlot ? 'flex' : 'none';
        }
    }

    override render(): TemplateResult {
        return TextInputTemplate(this);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'biz-text-input': BizTextInput;
    }
}