const previousOperandEl = document.getElementById('previous-operand');
const currentOperandEl = document.getElementById('current-operand');

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

function updateDisplay() {
  currentOperandEl.textContent = currentOperand;
  previousOperandEl.textContent = operation
    ? `${previousOperand} ${operation}`
    : previousOperand;
}

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number;
  } else {
    currentOperand += number;
  }
}

function chooseOperation(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
}

function compute() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '−':
      result = prev - current;
      break;
    case '×':
      result = prev * current;
      break;
    case '÷':
      result = current === 0 ? 'Error' : prev / current;
      break;
    default:
      return;
  }

  currentOperand = result.toString();
  operation = undefined;
  previousOperand = '';
}

function deleteLast() {
  currentOperand = currentOperand.toString().slice(0, -1);
  if (currentOperand === '') currentOperand = '0';
}

function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
}

function percent() {
  currentOperand = (parseFloat(currentOperand) / 100).toString();
}

function square() {
  currentOperand = (parseFloat(currentOperand) ** 2).toString();
}

function squareRoot() {
  const value = parseFloat(currentOperand);
  if (value < 0) {
    currentOperand = 'Error';
  } else {
    currentOperand = Math.sqrt(value).toString();
  }
}

function negate() {
  if (currentOperand === '0' || currentOperand === '') return;
  currentOperand = (parseFloat(currentOperand) * -1).toString();
}

document.querySelectorAll('[data-number]').forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.textContent);
    updateDisplay();
  });
});

document.querySelectorAll('[data-action]').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'add') chooseOperation('+');
    if (action === 'subtract') chooseOperation('−');
    if (action === 'multiply') chooseOperation('×');
    if (action === 'divide') chooseOperation('÷');
    if (action === 'equals') compute();
    if (action === 'clear') clearAll();
    if (action === 'delete') deleteLast();
    if (action === 'percent') percent();
    if (action === 'square') square();
    if (action === 'sqrt') squareRoot();
    if (action === 'negate') negate();
    updateDisplay();
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
  if (e.key === '.') appendNumber('.');
  if (e.key === '+') chooseOperation('+');
  if (e.key === '-') chooseOperation('−');
  if (e.key === '*') chooseOperation('×');
  if (e.key === '/') { e.preventDefault(); chooseOperation('÷'); }
  if (e.key === 'Enter' || e.key === '=') compute();
  if (e.key === 'Backspace') deleteLast();
  if (e.key === 'Escape') clearAll();
  updateDisplay();
});

updateDisplay();