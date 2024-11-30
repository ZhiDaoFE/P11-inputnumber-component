document.addEventListener('DOMContentLoaded', () => {
  const input1 = new InputNumber({
    id: 'input1',
    defaultValue: 10,
    max: 20,
    min: 5,
    step: 2,
    onChange: (value) => {
      input2.setValue(value);
    }
  });

  const input2 = new InputNumber({
    id: 'input2',
    defaultValue: 20,
    disabled: true
  });
});