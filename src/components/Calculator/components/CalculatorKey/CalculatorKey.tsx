import {Component, Emit, Prop} from 'vue-property-decorator';
import {VueComponent} from '@/shims-vue';

import styles from './CalculatorKey.css?module';

interface Props {
  value: string;
  operation?: boolean;
  zero?: boolean;
  onClick?: Function;
}

@Component
export default class CalculatorKey extends VueComponent<Props> {

  @Prop()
  private value!: string;

  @Prop({default: false})
  private operation!: boolean;

  @Prop({default: false})
  private zero!: boolean;

  @Emit()
  click() {
    return this.value;
  }

  render() {
    const classes = [
      styles.calculatorKey,
      this.operation ? styles.operationKey : '',
      this.zero ? styles.zeroKey : '',
    ];

    return (
      <div class={classes.join(' ')} onClick={this.click}>
        {this.value}
      </div>
    );
  }
}
