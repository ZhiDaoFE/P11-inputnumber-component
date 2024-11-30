const InputNumber = ((document) => {
  const defaultCls = 'zd-inputnumber';
  const inputCls = 'zd-inputnumber-input';
  const disabledCls = 'z-dis';
  
  return class extends BaseComWithDom {
    // _defaultValue;
    // _disabled;
    // _input;
    // _onChange;
    // _max;
    // _min;
    // _step;

    constructor(props = {}) {
      super({...props, cls: props.cls ? `${props.cls} ${defaultCls}` : defaultCls});

      this.onBlur = this.onBlur.bind(this);
      this.onKeydown = this.onKeydown.bind(this);

      this._build();
    }

    init(props = {}) {
      const { defaultValue, disabled, onChange, max, min, step } = props;

      this._defaultValue = Number(defaultValue) || '';
      this._onChange = onChange;
      this.setDisabled(disabled).setMax(max).setMin(min).setStep(step);
    }

    _build() {
      this.getRoot().innerHTML = `<input 
        class="${inputCls}"
        value="${this._defaultValue}"
        ${this._disabled ? 'disabled' : ''}
      />`;

      this._input = this.getRoot().children[0];

      this._input.addEventListener('blur', this.onBlur);
      this._input.addEventListener('keydown', this.onKeydown);
    }

    setDisabled(disabled) {
      this[`${!!disabled ? 'add' : 'remove'}ClassName`](disabledCls);
      this._disabled = !!disabled;
      if (this._input) {
        this._input.disabled = this._disabled;
      }

      return this;
    }

    getDisabled() {
      return this._disabled;
    }

    setMax(max) {
      this._max = max === undefined ? Number.MAX_VALUE : Number(max);
      return this;
    }

    getMax() {
      return this._max;
    }

    setMin(min) {
      this._min = min === undefined ? Number.MIN_VALUE : Number(min);
      return this;
    }

    getMin() {
      return this._min;
    }

    setStep(step) {
      this._step = Number(step) || 1;

      return this;
    }

    getStep() {
      return this._step;
    }

    setValue(value) {
      const val = value > this._max ? this._max : value < this._min ? this._min : value;

      this._input.value = val;
      this._onChange && this._onChange(val);

      return this;
    }

    add(num) {
      return this.setValue(Number(this._input.value) + (Number(num) || this._step));
    }

    minus(num) {
      return this.setValue(Number(this._input.value) - (Number(num) || this._step));
    }

    onBlur() {
      this.setValue(this._input.value);
    }

    onKeydown(event) {
      const keyCode = event.keyCode || event.which;
      switch (keyCode) {
        case 38: // 上箭头键
          this.add();
          break;
        case 40: // 下箭头键
          this.minus();
          break;
        default:
          return; // 忽略其他按键
      }

      event.preventDefault();
    }

    destory() {
      this.getRoot().removeChild(this._input);
      this._input = null;

      return this;
    }
  }
})(document);