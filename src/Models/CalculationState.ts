import ModifierTypes from "./ModifierTypes";

class CalculationState {
    public modifier: ModifierTypes;
    public value: number;
    public answer: number;

    constructor(modifier: ModifierTypes, value: number, answer: number) {
        this.modifier = modifier;
        this.value = value;
        this.answer = answer;
    }
}

export default CalculationState;
