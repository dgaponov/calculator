import { Component } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
import { Digit, Operator } from '@/components/Calculator/types';
import sleep from '@/utils/sleep';
import Display from './components/Display';
import Keypad from './components/Keypad';

import styles from './Calculator.css?module';

@Component
export default class Calculator extends VueComponent {

  private pendingOperator?: Operator;

  private waitingForOperand = true;

  private result = 0;

  private display = '0';

  private history?: string = '';

  private disabled = false;

  private equalShow = false;

  private prevEqualClicked = false;

  calculate(rightOperand: number, pendingOperator: Operator) {
    let newResult = Number(this.result);

    switch (pendingOperator) {
      case '+':
        newResult += rightOperand;
        break;
      case '-':
        newResult -= rightOperand;
        break;
    }

    this.history = this.history + pendingOperator + rightOperand;
    this.result = newResult;
    this.display = newResult.toString();
    this.equalShow = true;
  }

  handleOperatorClick(operator: Operator) {
    const operand = Number(this.display);

    if (typeof this.pendingOperator !== 'undefined' && !this.waitingForOperand) {
      this.calculate(operand, this.pendingOperator);
    } else {
      this.result = operand;
      if (typeof this.history === 'undefined' || !this.history.length)
        this.history = operand.toString();
    }

    this.pendingOperator = operator;
    this.waitingForOperand = true;
  }

  handleDigitClick(digit: Digit) {
    let newDisplay = this.display;

    if (this.display === '0' && digit === 0) {
      return;
    }

    if (this.waitingForOperand) {
      newDisplay = '';
      this.waitingForOperand = false;
    }

    if (this.prevEqualClicked && typeof this.pendingOperator === "undefined") {
      this.history = '';
    }

    if (this.display !== '0') {
      newDisplay += digit.toString();
    } else {
      newDisplay = digit.toString();
    }

    this.display = newDisplay;
    this.equalShow = false;
    this.prevEqualClicked = false;
  }

  handleResetClick() {
    this.history = '';
    this.result = 0;
    this.pendingOperator = undefined;
    this.display = '0';
    this.waitingForOperand = true;
    this.equalShow = false;
    this.prevEqualClicked = false;
  }

  async handleEqualClick() {
    this.disabled = true;
    await sleep(2000);

    const operand = Number(this.display);

    if (typeof this.pendingOperator !== 'undefined' && !this.waitingForOperand) {
      this.calculate(operand, this.pendingOperator);
      this.pendingOperator = undefined;
      this.history = this.display;
      this.prevEqualClicked = true;
    } else {
      this.display = operand.toString();
    }

    this.result = operand;
    this.waitingForOperand = true;
    this.disabled = false;
  }

  render() {
    const history = [
      this.history,
      this.pendingOperator ? this.pendingOperator : '',
      this.waitingForOperand || this.equalShow ? '' : this.display,
    ];

    return (
      <div class={styles.calculator}>
        <Display
          history={history.join('')}
          display={this.display}
          equalShow={this.equalShow}
        />
        <Keypad
          disabled={this.disabled}
          onOperatorClick={this.handleOperatorClick}
          onDigitClick={this.handleDigitClick}
          onResetClick={this.handleResetClick}
          onEqualClick={this.handleEqualClick}
        />
      </div>
    );
  }
}
