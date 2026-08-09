import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DateRangePickerTemplate } from './DateRangePicker';
import { dateRangePickerStyles } from './DateRangePicker.css';

@customElement('biz-date-range-picker')
export class DateRangePickerWC extends LitElement {
  static styles = dateRangePickerStyles;

  @property({ type: String }) startDate = '';
  @property({ type: String }) endDate = '';
  @property({ type: String }) minDate = '';
  @property({ type: String }) maxDate = '';

  private _handleRangeChange = (range: { start: string, end: string }) => {
    this.dispatchEvent(new CustomEvent('range-change', { detail: range }));
  };

  render() {
    return DateRangePickerTemplate({
      startDate: this.startDate,
      endDate: this.endDate,
      minDate: this.minDate,
      maxDate: this.maxDate,
      onRangeChange: this._handleRangeChange
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-date-range-picker': DateRangePickerWC;
  }
}
