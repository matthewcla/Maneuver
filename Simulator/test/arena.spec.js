class FakeInput {
  constructor(attrs) {
    this.value = attrs.value || '';
    this.inputMode = attrs.inputmode || '';
  }
  focus() { document.activeElement = this; }
  select() {}
  addEventListener() {}
  blur() {}
}
class FakeElement {
  constructor(id) {
    this.id = id;
    this.textContent = '';
    this._html = '';
    this.input = null;
  }
  set innerHTML(html) {
    this._html = html;
    const m = html.match(/<input[^>]*>/);
    if (m) {
      const attrs = {};
      for (const [, k, v] of m[0].matchAll(/(\w+)="([^"]*)"/g)) {
        attrs[k] = v;
      }
      this.input = new FakeInput(attrs);
    }
  }
  get innerHTML() { return this._html; }
  querySelector(sel) { return sel === 'input' ? this.input : null; }
}

global.document = {
  elements: {},
  activeElement: null,
  getElementById(id) { return this.elements[id]; }
};

class FakeSim {
  constructor() {
    this.activeEditField = null;
    this.suppressEditRender = false;
  }
  commitEdit() {}
  _scheduleUIUpdate() {}
  _formatDisplayValue(id, num) { return String(num); }
  _renderEditableField(id, displayValue, numericValue) {
    const el = document.getElementById(id);
    if (!el) return;

    if (this.activeEditField === id) {
      if (this.suppressEditRender) return;
      if (!el.querySelector('input')) {
        el.innerHTML = `
        <input
             type="text"
             inputmode="decimal"
             pattern="\\d+(\\.\\d)?"
             value="${parseFloat(numericValue).toFixed(1)}"
             aria-label="Edit numeric value to one decimal place">`;
        const input = el.querySelector('input');
        input.focus();
        input.select();
        const commit = () => {
          const newVal = parseFloat(input.value);
          this.activeEditField = null;
          this.suppressEditRender = true;
          el.textContent = this._formatDisplayValue(id, newVal);
          this.commitEdit(id, newVal);
          this._scheduleUIUpdate();
        };
        input.addEventListener('blur', commit, { once: true });
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            input.blur();
          } else if (e.key === 'Escape') {
            this.activeEditField = null;
            this._scheduleUIUpdate();
          }
        });
      }
    } else {
      if (el.textContent !== displayValue) {
        el.textContent = displayValue;
      }
    }
  }
}

function testInputModeDecimal() {
  document.elements['f'] = new FakeElement('f');
  const sim = new FakeSim();
  sim.activeEditField = 'f';
  sim._renderEditableField('f', '1.0', 1.0);
  if (document.activeElement.inputMode !== 'decimal') {
    throw new Error('inputMode should be decimal');
  }
}

testInputModeDecimal();
console.log('arena.spec.js passed');
