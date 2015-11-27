function Calculator(config) {
  config = config || {};

  var self = this;

  this.sum = 0;
  this.operand = 0;
  // Operator = add, subtract, multiply, divide
  this.operator = null;
  this.numberString = "";
  // State 0 - Init state
  // State 1 - Setting sum state
  // State 2 - Setting operator state
  // State 3 - Setting operand state
  this.state = 0;
  this.stateHandler = [
    {
      number: state0NumberHandler,
      operator: state0OperatorHandler,
      eq: state0EqHandler,
      C: state0CHandler,
      CE: state0CEHandler
    },
    {
      number: state1NumberHandler,
      operator: state1OperatorHandler,
      eq: state1EqHandler,
      C: state1CHandler,
      CE: state1CEHandler
    },
    {
      number: state2NumberHandler,
      operator: state2OperatorHandler,
      eq: state2EqHandler,
      C: state2CHandler,
      CE: state2CEHandler
    },
    {
      number: state3NumberHandler,
      operator: state3OperatorHandler,
      eq: state3EqHandler,
      C: state3CHandler,
      CE: state3CEHandler
    },
  ];

  this.display = config.display || (function() {});

  function state0NumberHandler(numberStr) {
    self.setNumberString(numberStr);
    self.state = 1;
    self.display(self.numberString);
  }

  function state0OperatorHandler(operator) {
    self.operator = operator;
    self.state = 2;
  }

  function state0EqHandler() {}

  function state0CHandler() {
    self.clear();
  }

  function state0CEHandler() {
    self.clear();
  }

  function state1NumberHandler(numberStr) {
    self.setNumberString(numberStr);
    self.display(self.numberString);
  }

  function state1OperatorHandler(operator) {
    self.numberStringToSum();
    self.operator = operator;
    self.state = 2;
  }

  function state1EqHandler() {}

  function state1CHandler() {
    self.clear();
  }

  function state1CEHandler() {
    self.clear();
  }

  function state2NumberHandler(numberStr) {
    self.setNumberString(numberStr);
    self.display(self.numberString);
    self.state = 3;
  }

  function state2OperatorHandler(operator) {
    self.operator = operator;
  }

  function state2EqHandler() {}

  function state2CHandler() {
    self.clear();
  }

  function state2CEHandler() {}

  function state3NumberHandler(numberStr) {
    self.setNumberString(numberStr);
    self.display(self.numberString);
  }

  function state3OperatorHandler(operator) {
    self.numberStringToOperand();
    self.calculate();
    self.display(self.sum);
    self.operator = operator;
    self.state = 2
  }

  function state3EqHandler() {
    self.numberStringToOperand();
    self.calculate();
    self.display(self.sum);
    self.state = 0;
  }

  function state3CHandler() {
    self.clear();
  }

  function state3CEHandler() {
    self.numberString = "";
    self.display(self.numberString);
  }
}

// Type = number, operator, eq, C, CE
Calculator.prototype.eventHandler = function(type, value) {
  this.stateHandler[this.state][type](value);
};

Calculator.prototype.clear = function() {
  this.sum = 0;
  this.operator = null;
  this.operand = 0;
  this.numberString = "";
  this.display(this.sum);
  this.state = 0;
};

Calculator.prototype.setNumberString = function(numberStr) {
  if ((numberString.indexOf(".") !== -1) && (numberStr === "."))
    return;
  this.numberString += numberStr;
};

Calculator.prototype.numberStringToSum = function() {
  var number = parseFloat(this.numberString);
  this.sum = isNaN(number) ? 0 : number;
  this.numberString = "";
}

Calculator.prototype.numberStringToOperand = function() {
  var number = parseFloat(this.numberString);
  this.operand = isNaN(number) ? 0 : number;
  this.numberString = "";
};

Calculator.prototype.calculate = function() {
  var calc = {
    add: function(a, b) { return a + b; },
    subtract: function(a, b) { return a - b; },
    multiply: function(a, b) { return a * b; },
    divide: function(a, b) { return a / b; }
  };

  this.sum = calc[this.operator](this.sum, this.operand);
  this.operand = 0;
  this.operator = null;
};
