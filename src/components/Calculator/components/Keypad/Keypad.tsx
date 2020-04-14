import {Component, Emit, Prop} from 'vue-property-decorator';
import {VueComponent} from '@/shims-vue';
import {Operator, Digit} from '@/components/Calculator/types';
import CalculatorKey from '../CalculatorKey';

import styles from './Keypad.css?module';

interface Props {
  onOperatorClick?: Function;
  onDigitClick?: Function;
  onResetClick?: Function;
  onEqualClick?: Function;
  disabled?: boolean;
}

@Component
export default class Keypad extends VueComponent<Props> {

  @Prop({default: false})
  private disabled!: boolean;

  @Emit('operatorClick')
  handleOperatorClick(operator: Operator) {
    return operator;
  }

  @Emit('digitClick')
  handleDigitClick(digit: Digit) {
    return digit;
  }

  @Emit('resetClick')
  handleResetClick() {
    return
  }

  @Emit('equalClick')
  handleEqualClick() {
    return
  }

  render() {
    const classes = [
      styles.keypad,
      this.disabled ? styles.keypadDisabled : ''
    ];

    return (
      <div class={classes.join(' ')}>
        <CalculatorKey
          value="7"
          onClick={() => this.handleDigitClick(7)}
        />
        <CalculatorKey
          value="8"
          onClick={() => this.handleDigitClick(8)}
        />
        <CalculatorKey
          value="9"
          onClick={() => this.handleDigitClick(9)}
        />
        <CalculatorKey
          value="C"
          operation={true}
          onClick={() => this.handleResetClick()}
        />
        <CalculatorKey
          value="4"
          onClick={() => this.handleDigitClick(4)}
        />
        <CalculatorKey
          value="5"
          onClick={() => this.handleDigitClick(5)}
        />
        <CalculatorKey
          value="6"
          onClick={() => this.handleDigitClick(6)}
        />
        <CalculatorKey
          value="—"
          operation={true}
          onClick={() => this.handleOperatorClick('-')}
        />
        <CalculatorKey
          value="1"
          onClick={() => this.handleDigitClick(1)}
        />
        <CalculatorKey
          value="2"
          onClick={() => this.handleDigitClick(2)}
        />
        <CalculatorKey
          value="3"
          onClick={() => this.handleDigitClick(3)}
        />
        <CalculatorKey
          value="+"
          operation={true}
          onClick={() => this.handleOperatorClick('+')}
        />
        <CalculatorKey
          value="0"
          zero={true}
          onClick={() => this.handleDigitClick(0)}
        />
        <CalculatorKey
          value="="
          operation={true}
          onClick={() => this.handleEqualClick()}
        />
      </div>
    );
  }
}
