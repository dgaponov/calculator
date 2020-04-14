import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import styles from './Display.css?module'

interface Props {
    history?: String,
    display?: String,
    equalShow: Boolean
}

@Component
export default class Display extends VueComponent<Props> {

    @Prop()
    private history?: string;

    @Prop()
    private display?: string;

    @Prop({ default: false })
    private equalShow?: boolean;

    render() {
        return (
            <div class={styles.display}>
                <div class={styles.displayOperations}>
                    { this.history }
                </div>
                <div class={styles.displayResult}>
                    <span class={styles.equalOperator} v-show={this.equalShow}>=</span>
                    <span>{ this.display }</span>
                </div>
            </div>
        )
    }

}
