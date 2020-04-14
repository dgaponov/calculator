import { Component } from 'vue-property-decorator'
import { VueComponent } from '@/shims-vue'
import { Keypad, Display } from './components'
import { Digit, Operator } from "@/components/Calculator/types"

import styles from './Calculator.css?module'
import { sleep } from "@/utils"

@Component
export default class Calculator extends VueComponent {

    pendingOperator?: Operator;
    waitingForOperand: Boolean = true;
    result: Number = 0;
    display: String = '0';
    history?: String = '';
    disabled: Boolean = false;
    equalShow: Boolean = false;

    calculate(rightOperand: number, pendingOperator: Operator) {
        let newResult = Number(this.result)

        switch (pendingOperator) {
            case '+':
                newResult += rightOperand
                break
            case '-':
                newResult -= rightOperand
                break
        }

        this.history = this.history + pendingOperator + rightOperand
        this.result = newResult
        this.display = newResult.toString()
        this.equalShow = true
    }

    handleOperatorClick(operator: Operator) {
        const operand = Number(this.display)

        if (typeof this.pendingOperator !== 'undefined' && !this.waitingForOperand) {
            this.calculate(operand, this.pendingOperator)
        } else {
            this.result = operand
            if (typeof this.history === "undefined" || !this.history.length)
                this.history = operand.toString()
        }

        this.pendingOperator = operator
        this.waitingForOperand = true
    }

    handleDigitClick(digit: Digit) {

        let newDisplay = this.display

        if (this.display === '0' && digit === 0) {
            return
        }

        if (typeof this.history === "undefined") {
            this.history = this.display
        }

        if (this.waitingForOperand) {
            newDisplay = ''
            this.waitingForOperand = false
        }

        if (this.display !== '0') {
            newDisplay = newDisplay + digit.toString()
        } else {
            newDisplay = digit.toString()
        }

        this.display = newDisplay
        this.equalShow = false
    }

    handleResetClick() {
        this.history = ''
        this.result = 0
        this.pendingOperator = undefined
        this.display = '0'
        this.waitingForOperand = true
        this.equalShow = false
    }

    async handleEqualClick() {
        this.disabled = true
        await sleep(2000)

        const operand = Number(this.display)

        if (typeof this.pendingOperator !== 'undefined' && !this.waitingForOperand) {
            this.calculate(operand, this.pendingOperator)
            this.pendingOperator = undefined
            this.history = this.display
        } else {
            this.display = operand.toString()
        }

        this.result = operand
        this.waitingForOperand = true

        this.disabled = false
    }

    render() {
        const history = [
            this.history,
            this.pendingOperator ? this.pendingOperator : '',
            this.waitingForOperand || this.equalShow ? '' : this.display
        ]

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
        )
    }
}
