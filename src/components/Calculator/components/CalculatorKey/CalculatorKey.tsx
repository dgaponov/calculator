import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import styles from './CalculatorKey.css?module'

interface Props {
    value: String,
    operation?: Boolean,
    zero?: Boolean,
    onClick?: Function
}

@Component
export default class CalculatorKey extends VueComponent<Props> {

    @Prop()
    private value!: string;

    @Prop({ default: false })
    private operation!: boolean;

    @Prop({ default: false })
    private zero!: boolean;

    @Emit()
    click() {
        return this.value;
    }

    render() {
        const classes = [
            styles.calculatorKey,
            this.operation ? styles.operationKey : null,
            this.zero ? styles.zeroKey : null,
        ];

        return (
            <div class={classes} onClick={this.click}>
                { this.value }
            </div>
        )
    }

}
