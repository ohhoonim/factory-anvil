import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ToggleButton.wc.js';
import { BizToggleButton } from './ToggleButton.wc.js';

describe('BizToggleButton Component', () => {
  let element: BizToggleButton;

  beforeEach(async () => {
    element = document.createElement('biz-toggle-button') as BizToggleButton;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe('1. Properties & DOM Rendering', () => {
    it('should initialize with default properties', () => {
      expect(element.checked).toBe(false);
      expect(element.disabled).toBe(false);
      expect(element.readonly).toBe(false);
      expect(element.variant).toBe('standard');
      expect(element.size).toBe('medium');
    });

    it('should reflect properties to attributes', async () => {
      element.checked = true;
      element.disabled = true;
      await element.updateComplete;

      expect(element.hasAttribute('checked')).toBe(true);
      expect(element.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('2. Custom Events & Interaction', () => {
    it('should toggle state and emit toggle/change events on click', async () => {
      let toggleEventFired = false;
      let changeEventFired = false;
      let eventDetail: any = null;

      element.addEventListener('toggle', (e: any) => {
        toggleEventFired = true;
        eventDetail = e.detail;
      });

      element.addEventListener('change', (e: any) => {
        changeEventFired = true;
      });

      const shadowRoot = element.shadowRoot;
      const rootDiv = shadowRoot?.querySelector('.biz-toggle-button');
      
      (rootDiv as HTMLElement)?.click();
      await element.updateComplete;

      expect(element.checked).toBe(true);
      expect(toggleEventFired).toBe(true);
      expect(changeEventFired).toBe(true);
      expect(eventDetail).toEqual({ checked: true });
    });

    it('should not emit events or change state when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      let eventFired = false;
      element.addEventListener('toggle', () => {
        eventFired = true;
      });

      const shadowRoot = element.shadowRoot;
      const rootDiv = shadowRoot?.querySelector('.biz-toggle-button');
      
      (rootDiv as HTMLElement)?.click();
      await element.updateComplete;

      expect(element.checked).toBe(false);
      expect(eventFired).toBe(false);
    });
  });

  describe('3. Accessibility & Keyboard Navigation', () => {
    it('should have correct ARIA attributes in shadow root', async () => {
      const shadowRoot = element.shadowRoot;
      const rootDiv = shadowRoot?.querySelector('.biz-toggle-button');

      expect(rootDiv?.getAttribute('role')).toBe('switch');
      expect(rootDiv?.getAttribute('aria-checked')).toBe('false');

      element.checked = true;
      await element.updateComplete;
      expect(rootDiv?.getAttribute('aria-checked')).toBe('true');
    });

    it('should toggle via Space or Enter keydown', async () => {
      const shadowRoot = element.shadowRoot;
      const rootDiv = shadowRoot?.querySelector('.biz-toggle-button');

      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      rootDiv?.dispatchEvent(enterEvent);
      await element.updateComplete;

      expect(element.checked).toBe(true);

      const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      rootDiv?.dispatchEvent(spaceEvent);
      await element.updateComplete;

      expect(element.checked).toBe(false);
    });
  });
});