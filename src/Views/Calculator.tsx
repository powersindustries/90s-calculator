import { useState } from "react";
import { formatDisplay, getAnswerAfterSpecialModifier, getAnswerAfterModifier, performCalculation, getDisplayableAnswer } from "../Controllers/CalculatorHelpers";
import CalculationState from "../Models/CalculationState";
import ModifierTypes from "../Models/ModifierTypes";
import MrcState from "../Models/MrcState";


function Calculator() {

    let [calculation, setCalculation] = useState<CalculationState>(new CalculationState(ModifierTypes.NONE, 0, 0)  );
    let [mrcValues, setMrcValues] = useState<MrcState>(new MrcState(0,0));

    function onNumberClicked(event: any) {
        const number: number = event.target.textContent;

        setCalculation(
            {
                ...calculation,
                modifier: calculation.modifier,
                value: Number(formatDisplay(calculation.value + number)),
                answer: Number(!calculation.modifier ? 0 : formatDisplay(calculation.answer))
            }
        );
    }

    function onModifierClicked(inModifier: ModifierTypes) {
        const newAnswer: number = formatDisplay(getAnswerAfterModifier(calculation, inModifier));

        setCalculation(
            {
                ...calculation,
                modifier: inModifier,
                value: 0,
                answer: newAnswer
            }
        );
    }

    function onSpecialModifierClicked(inModifier: ModifierTypes) {
        const newAnswer: number = getAnswerAfterSpecialModifier(calculation, inModifier);

        setCalculation(
            {
                ...calculation,
                modifier: calculation.modifier,
                value: 0,
                answer: formatDisplay(newAnswer)
            }
        );
    }

    function onMMinusClicked() {
        if (calculation.value !== 0 || calculation.answer !== 0) {
            setMrcValues(
                {
                    mPlus: mrcValues.mPlus,
                    mMinus: calculation.value !== 0 ? calculation.value : calculation.answer
                }
            );
        }
    }

    function onMPlusClicked() {
        if (calculation.value !== 0 || calculation.answer !== 0) {
            setMrcValues(
                {
                    mPlus: calculation.value !== 0 ? calculation.value : calculation.answer,
                    mMinus: mrcValues.mMinus
                }
            );
        }
    }

    function onMRCClicked() {
        // Both M values exist. Cycle between two.
        const bBothMValuesExist: boolean = (mrcValues.mMinus !== 0 && mrcValues.mPlus !== 0);
        if (bBothMValuesExist) {
            if (mrcValues.mMinus !== calculation.value) {
                setCalculation(
                    {
                        ...calculation,
                        modifier: calculation.modifier,
                        value: mrcValues.mMinus,
                        answer: calculation.answer
                    }
                );
            }
            else {
                setCalculation(
                    {
                        ...calculation,
                        modifier: calculation.modifier,
                        value: mrcValues.mPlus,
                        answer: calculation.answer
                    }
                );
            }
        }
        // Set calculation value to saved M value.
        else {
            if (mrcValues.mMinus !== 0 && mrcValues.mMinus !== calculation.value) {
                setCalculation(
                    {
                        ...calculation,
                        modifier: calculation.modifier,
                        value: mrcValues.mMinus,
                        answer: calculation.answer
                    }
                );
            }
            else if (mrcValues.mPlus !== 0 && mrcValues.mPlus !== calculation.value) {
                setCalculation(
                    {
                        ...calculation,
                        modifier: calculation.modifier,
                        value: mrcValues.mPlus,
                        answer: calculation.answer
                    }
                );
            }
        }
    }

    function onSubmitClicked() {
        if (calculation.modifier && calculation.value) {

            // Maybe come back and add exception for divide by zero error
            setCalculation(
                {
                    ...calculation,
                    modifier: ModifierTypes.NONE,
                    value: 0,
                    answer: performCalculation(calculation.answer, calculation.value, calculation.modifier)
                }
            );
        }
    }

    function onClearClicked() {

        // Clear MRC if clear was clicked multiple times.
        if (calculation.value === 0 && calculation.answer === 0) {
            setMrcValues(
                {
                    mMinus: 0,
                    mPlus: 0
                }
            );
        }

        setCalculation(
            {
                ...calculation,
                modifier: ModifierTypes.NONE,
                value: 0,
                answer: 0
            }
        );
    }


    return (

        <div className="calculator">


            {/* Textbox Area */}
            <div className="display-box">
                <h4 className="display-text-mrc">
                    {mrcValues.mMinus > 0 || mrcValues.mPlus > 0 ? "M" : ""}
                </h4>
                <h3 className="display-text">
                    { calculation.value ? calculation.value : getDisplayableAnswer(calculation.answer) }
                </h3>
            </div>


            {/* Label and fake solar panel */}
            <div className="solar-label">
                <div className="solar-text">
                    <p>90s Calculator</p>
                    <h2 className="solar-name">CA-90</h2>
                </div>
                <div className="solar-box" >
                    <div className="solar-box-line" />
                    <div className="solar-box-line" />
                    <div className="solar-box-line" />
                </div>
            </div>

            <div className="divider-line" />


            {/* Buttons Area */}
            <div className="button-area">

                <div className="buttons-grid-left">

                    <button
                        className="button-modifier"
                        onClick={() => onSpecialModifierClicked(ModifierTypes.plusminus)}>
                        +/-
                    </button>
                    <button
                        className="button-modifier"
                        onClick={() => onSpecialModifierClicked(ModifierTypes.sqrt)}>
                        &#8730;
                    </button>
                    <button
                        className="button-modifier"
                        onClick={() => onSpecialModifierClicked(ModifierTypes.percent)}>
                        %
                    </button>


                    <button
                        className="button-modifier"
                        onClick={onMRCClicked}>
                        MRC
                    </button>
                    <button
                        className="button-modifier"
                        onClick={onMMinusClicked}>
                        M-
                    </button>
                    <button
                        className="button-modifier"
                        onClick={onMPlusClicked}>
                        M+
                    </button>


                    <button
                        className="button-number"
                        onClick={onNumberClicked}>
                        7
                    </button>
                    <button
                        className="button-number"
                        onClick={onNumberClicked}>
                        8
                    </button>
                    <button
                        className="button-number"
                        onClick={onNumberClicked}>
                        9
                    </button>


                    <button
                        className="button-number"
                        onClick={onNumberClicked}>
                        4
                    </button>
                    <button
                        className="button-number"
                        onClick={onNumberClicked}>
                        5
                    </button>
                    <button
                        className="button-number"
                        onClick={onNumberClicked}>
                        6
                    </button>


                    <button
                        className="button-number"
                        onClick={onNumberClicked}>
                        1
                    </button>
                    <button
                        className="button-number"
                        onClick={onNumberClicked}>
                        2
                    </button>
                    <button
                        className="button-number"
                        onClick={onNumberClicked}>
                        3
                    </button>


                    <button
                        className="button-modifier"
                        onClick={onClearClicked}>
                        ON/C
                    </button>
                    <button
                        className="button-number"
                        onClick={onNumberClicked}>
                        0
                    </button>
                    <button
                        className="button-number"
                        onClick={onNumberClicked}>
                        .
                    </button>

                </div>

                <div className="buttons-grid-right">
                    <button
                        className="button-modifier"
                        onClick={() => onModifierClicked(ModifierTypes.divide)}>
                        &#247;
                    </button>
                    <button
                        className="button-modifier"
                        onClick={() => onModifierClicked(ModifierTypes.multiply)}>
                        x
                    </button>
                    <button
                        className="button-modifier"
                        onClick={() => onModifierClicked(ModifierTypes.minus)}>
                        -
                    </button>
                    <button
                        className="button-modifier"
                        onClick={() => onModifierClicked(ModifierTypes.plus)}>
                        +
                    </button>
                    <button
                        className="button-submit"
                        onClick={onSubmitClicked}>
                        =
                    </button>

                </div>

            </div>

        </div>

    );
}

export default Calculator;
