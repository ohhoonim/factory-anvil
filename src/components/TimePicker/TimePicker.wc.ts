import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { timePickerStyles } from './TimePicker.css';
import { TimePickerTemplate, type TimeOption } from './TimePicker';
import type { TimePickerHost } from './TimePicker';

import { LabelSlotController, type LabelSlotHost } from '../../controllers/LabelSlot';

@customElement('biz-time-picker')
export class BizTimePicker extends LitElement implements TimePickerHost {
    static styles = timePickerStyles;

    @property({ type: String }) value: string | Date | null = null;
    @property({ type: String }) format = 'HH:mm';
    @property({ type: Boolean, attribute: 'use12-hours' }) use12Hours = false;
    @property({ type: Number, attribute: 'hour-step' }) hourStep = 1;
    @property({ type: Number, attribute: 'minute-step' }) minuteStep = 1;
    @property({ type: Number, attribute: 'second-step' }) secondStep = 1;
    @property({ type: Boolean, attribute: 'show-seconds' }) showSeconds = false;
    @property({ attribute: false }) disabledHours: ((hour: number) => boolean) | null = null;
    @property({ attribute: false }) disabledMinutes: ((hour: number, minute: number) => boolean) | null = null;
    @property({ attribute: false }) disabledSeconds: ((hour: number, minute: number, second: number) => boolean) | null = null;
    @property({ type: String }) placeholder = 'HH:mm';
    @property({ type: Boolean }) clearable = false;
    @property({ type: Boolean }) readonly = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) error = false;
    @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
    @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
    @property({ type: Boolean, attribute: 'full-width' }) fullWidth = false;

    @state() open = false;
    @state() focusedColumn: 'hour' | 'minute' | 'second' | 'ampm' = 'hour';
    @state() selectedHour: number | null = null;
    @state() selectedMinute: number | null = null;
    @state() selectedSecond: number | null = null;
    @state() selectedAmPm: 'AM' | 'PM' | null = null;
    @state() inputValue = '';

    // 3. has-label 속성 선언 (reflect: true 필수)
    @property({ type: Boolean, reflect: true, attribute: 'has-label' })
    hasLabel = false;

    // 4. Controller 인스턴스 생성
    private labelController = new LabelSlotController(this, 'label-slot');

    // 5. 슬롯 체인지 이벤트 핸들러 추가
    handleLabelSlotChange(e: Event): void {
        this.labelController.handleSlotChange(e);
    }

    private _outsideClickListener: ((e: MouseEvent) => void) | null = null;

    connectedCallback() {
        super.connectedCallback();
        this._parseValue(this.value);
        this._outsideClickListener = (e: MouseEvent) => {
            if (this.open && !e.composedPath().includes(this)) {
                this._closePanel();
            }
        };
        window.addEventListener('click', this._outsideClickListener);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._outsideClickListener) {
            window.removeEventListener('click', this._outsideClickListener);
        }
    }

    willUpdate(changedProperties: Map<string, unknown>) {
        if (changedProperties.has('value')) {
            this._parseValue(this.value);
        }
    }

    private _parseValue(val: string | Date | null) {
        if (!val) {
            this.selectedHour = null;
            this.selectedMinute = null;
            this.selectedSecond = null;
            this.selectedAmPm = null;
            this.inputValue = '';
            return;
        }

        let h = 0, m = 0, s = 0;
        if (val instanceof Date) {
            h = val.getHours();
            m = val.getMinutes();
            s = val.getSeconds();
        } else if (typeof val === 'string') {
            const parts = val.split(':').map((p) => parseInt(p, 10));
            h = parts[0] || 0;
            m = parts[1] || 0;
            s = parts[2] || 0;
        }

        this.selectedHour = h;
        this.selectedMinute = m;
        this.selectedSecond = s;
        if (this.use12Hours) {
            this.selectedAmPm = h >= 12 ? 'PM' : 'AM';
        }
        this.inputValue = this._formatTimeString(h, m, s, this.selectedAmPm);
    }

    private _formatTimeString(h: number, m: number, s: number, ampm: 'AM' | 'PM' | null): string {
        let displayHour = h;
        if (this.use12Hours) {
            displayHour = h % 12;
            if (displayHour === 0) displayHour = 12;
        }

        const pad = (num: number) => String(num).padStart(2, '0');
        let str = `${pad(displayHour)}:${pad(m)}`;
        if (this.showSeconds) {
            str += `:${pad(s)}`;
        }
        if (this.use12Hours && ampm) {
            str += ` ${ampm}`;
        }
        return str;
    }

    getHourOptions(): TimeOption[] {
        const options: TimeOption[] = [];
        const max = this.use12Hours ? 12 : 23;
        const min = this.use12Hours ? 1 : 0;

        for (let i = min; i <= max; i += this.hourStep) {
            let actualHour = i;
            if (this.use12Hours) {
                if (this.selectedAmPm === 'PM' && i < 12) actualHour = i + 12;
                if (this.selectedAmPm === 'AM' && i === 12) actualHour = 0;
            }
            const isDisabled = this.disabledHours ? this.disabledHours(actualHour) : false;
            options.push({
                value: i,
                label: String(i).padStart(2, '0'),
                disabled: isDisabled,
            });
        }
        return options;
    }

    getMinuteOptions(): TimeOption[] {
        const options: TimeOption[] = [];
        const h = this.selectedHour ?? 0;
        for (let i = 0; i < 60; i += this.minuteStep) {
            const isDisabled = this.disabledMinutes ? this.disabledMinutes(h, i) : false;
            options.push({
                value: i,
                label: String(i).padStart(2, '0'),
                disabled: isDisabled,
            });
        }
        return options;
    }

    getSecondOptions(): TimeOption[] {
        const options: TimeOption[] = [];
        const h = this.selectedHour ?? 0;
        const m = this.selectedMinute ?? 0;
        for (let i = 0; i < 60; i += this.secondStep) {
            const isDisabled = this.disabledSeconds ? this.disabledSeconds(h, m, i) : false;
            options.push({
                value: i,
                label: String(i).padStart(2, '0'),
                disabled: isDisabled,
            });
        }
        return options;
    }

    getAmPmOptions(): Array<{ value: 'AM' | 'PM'; label: string; disabled: boolean }> {
        return [
            { value: 'AM', label: 'AM', disabled: false },
            { value: 'PM', label: 'PM', disabled: false },
        ];
    }

    handleInput(e: Event) {
        const inputEl = e.target as HTMLInputElement;
        this.inputValue = inputEl.value;
        this.dispatchEvent(
            new CustomEvent('input', {
                bubbles: true,
                composed: true,
                detail: { rawValue: this.inputValue },
            })
        );
    }

    handleInputKeydown(e: KeyboardEvent) {
        if (this.disabled || this.readonly) return;

        if (e.key === 'ArrowDown' || e.key === 'Enter') {
            if (!this.open) {
                this._openPanel();
                e.preventDefault();
            }
        } else if (e.key === 'Escape') {
            if (this.open) {
                this._closePanel();
                e.preventDefault();
            }
        }
    }

    handleInputFocus(_e: FocusEvent) { }

    handleInputBlur(_e: FocusEvent) { }

    togglePanel(e: MouseEvent) {
        e.stopPropagation();
        if (this.disabled || this.readonly) return;
        if (this.open) {
            this._closePanel();
        } else {
            this._openPanel();
        }
    }

    private _openPanel() {
        this.open = true;
        this.focusedColumn = 'hour';
        this.dispatchEvent(
            new CustomEvent('open', {
                bubbles: true,
                composed: true,
            })
        );
    }

    private _closePanel() {
        this.open = false;
        this.dispatchEvent(
            new CustomEvent('close', {
                bubbles: true,
                composed: true,
            })
        );
    }

    handleClear(e: MouseEvent) {
        e.stopPropagation();
        if (this.disabled || this.readonly) return;

        this.value = null;
        this.selectedHour = null;
        this.selectedMinute = null;
        this.selectedSecond = null;
        this.selectedAmPm = null;
        this.inputValue = '';

        this.dispatchEvent(
            new CustomEvent('clear', {
                bubbles: true,
                composed: true,
            })
        );

        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { value: '', time: null },
            })
        );
    }

    handleOptionSelect(type: 'hour' | 'minute' | 'second' | 'ampm', val: number | string) {
        if (type === 'hour') this.selectedHour = val as number;
        if (type === 'minute') this.selectedMinute = val as number;
        if (type === 'second') this.selectedSecond = val as number;
        if (type === 'ampm') this.selectedAmPm = val as 'AM' | 'PM';

        this._commitSelection();
    }

    handleColumnKeydown(e: KeyboardEvent, type: 'hour' | 'minute' | 'second' | 'ampm') {
        if (e.key === 'Escape') {
            this._closePanel();
            const input = this.shadowRoot?.querySelector('input');
            input?.focus();
            return;
        }

        const columns: Array<'hour' | 'minute' | 'second' | 'ampm'> = ['hour', 'minute'];
        if (this.showSeconds) columns.push('second');
        if (this.use12Hours) columns.push('ampm');

        const currentIndex = columns.indexOf(type);

        if (e.key === 'ArrowRight') {
            const nextIndex = (currentIndex + 1) % columns.length;
            this.focusedColumn = columns[nextIndex];
            this._focusColumn(this.focusedColumn);
            e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
            const prevIndex = (currentIndex - 1 + columns.length) % columns.length;
            this.focusedColumn = columns[prevIndex];
            this._focusColumn(this.focusedColumn);
            e.preventDefault();
        } else if (e.key === 'Enter' || e.key === ' ') {
            this._commitSelection();
            this._closePanel();
            e.preventDefault();
        }
    }

    private _focusColumn(col: 'hour' | 'minute' | 'second' | 'ampm') {
        const colEls = this.shadowRoot?.querySelectorAll('.biz-time-picker__column');
        if (!colEls) return;
        const columns: Array<'hour' | 'minute' | 'second' | 'ampm'> = ['hour', 'minute'];
        if (this.showSeconds) columns.push('second');
        if (this.use12Hours) columns.push('ampm');

        const idx = columns.indexOf(col);
        if (idx !== -1 && colEls[idx]) {
            (colEls[idx] as HTMLElement).focus();
        }
    }

    handleNowClick() {
        const now = new Date();
        this.selectedHour = now.getHours();
        this.selectedMinute = now.getMinutes();
        this.selectedSecond = now.getSeconds();
        if (this.use12Hours) {
            this.selectedAmPm = this.selectedHour >= 12 ? 'PM' : 'AM';
        }
        this._commitSelection();
        this._closePanel();
    }

    handleConfirmClick() {
        this._commitSelection();
        this._closePanel();
    }

    private _commitSelection() {
        const h = this.selectedHour ?? 0;
        const m = this.selectedMinute ?? 0;
        const s = this.selectedSecond ?? 0;

        const formatted = this._formatTimeString(h, m, s, this.selectedAmPm);
        this.inputValue = formatted;
        this.value = formatted;

        const d = new Date();
        d.setHours(h, m, s, 0);

        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { value: formatted, time: d },
            })
        );
    }

    render() {
        return html`${TimePickerTemplate(this)}`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'biz-time-picker': BizTimePicker;
    }
}