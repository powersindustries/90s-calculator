import React from "react";
import { useState } from "react";
import { formatDisplay, performCalculation, getAnswerAfterModifier, getAnswerAfterSpecialModifier } from "./CalculatorHelpers"


// --------------------------------------
// Main class.
// --------------------------------------
function Calculator() {

    let [calculation, setCalculation] = useState(
        {
            modifier: "",
            value: 0,
            answer: 0
        }
    );

    let [mrcValues, setMrcValues] = useState(
        {
            mPlus: 0,
            mMinus: 0
        }
    );

    function OnNumberClicked(inEvent) {
        const number = inEvent.target.textContent;

        setCalculation(
            {
                ...calculation,
                modifier: calculation.modifier,
                value: Number(formatDisplay(calculation.value + number)),
                answer: Number(!calculation.modifier ? 0 : formatDisplay(calculation.answer))
            }
        );
    }

    function handleModifierClicked(inModifier) {
        const newAnswer = formatDisplay(getAnswerAfterModifier(calculation, inModifier));

        setCalculation(
            {
                ...calculation,
                modifier: inModifier,
                value: 0,
                answer: newAnswer
            }
        );
    }

    function handleSpecialModifierClicked(inModifier) {
        const newAnswer = getAnswerAfterSpecialModifier(calculation, inModifier);

        setCalculation(
            {
                ...calculation,
                modifier: calculation.modifier,
                value: 0,
                answer: formatDisplay(newAnswer)
            }
        );
    }

    function handleMMinusClicked(event) {
        if (calculation.value !== 0 || calculation.answer !== 0) {
            setMrcValues(
                {
                    mPlus: mrcValues.mPlus,
                    mMinus: calculation.value !== 0 ? calculation.value : calculation.answer
                }
            );
        }
    }

    function handleMPlusClicked(event) {
        if (calculation.value !== 0 || calculation.answer !== 0) {
            setMrcValues(
                {
                    mPlus: calculation.value !== 0 ? calculation.value : calculation.answer,
                    mMinus: mrcValues.mMinus
                }
            );
        }
    }

    function handleMRCClicked(event) {
        // Both M values exist. Cycle between two.
        const bBothMValuesExist = (mrcValues.mMinus !== 0 && mrcValues.mPlus !== 0);
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

    function handleSubmitClicked(event) {
        if (calculation.modifier && calculation.value) {

            // Maybe come back and add exception for divide by zero error
            setCalculation(
                {
                    ...calculation,
                    modifier: "",
                    value: 0,
                    answer: performCalculation(calculation.answer, calculation.value, calculation.modifier)
                }
            );
        }
    }

    function handleClearClicked(event) {

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
                modifier: "",
                value: 0,
                answer: 0
            }
        );
    }



    // --------------------------------------
    // --------------------------------------
    return (

        <div className="calculator">


            {/* Textbox Area */}
            <div className="display-box">
                <h4 className="display-text-mrc">
                    {mrcValues.mMinus > 0 || mrcValues.mPlus > 0 ? "M" : ""}
                </h4>
                <h3 className="display-text">
                    {calculation.value ? calculation.value : calculation.answer}
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
                        onClick={() => handleSpecialModifierClicked("plusminus")}>
                        +/-
                    </button>
                    <button
                        className="button-modifier"
                        onClick={() => handleSpecialModifierClicked("sqrt")}>
                        &#8730;
                    </button>
                    <button
                        className="button-modifier"
                        onClick={() => handleSpecialModifierClicked("percent")}>
                        %
                    </button>


                    <button
                        className="button-modifier"
                        onClick={handleMRCClicked}>
                        MRC
                    </button>
                    <button
                        className="button-modifier"
                        onClick={handleMMinusClicked}>
                        M-
                    </button>
                    <button
                        className="button-modifier"
                        onClick={handleMPlusClicked}>
                        M+
                    </button>


                    <button
                        className="button-number"
                        onClick={OnNumberClicked}>
                        7
                    </button>
                    <button
                        className="button-number"
                        onClick={OnNumberClicked}>
                        8
                    </button>
                    <button
                        className="button-number"
                        onClick={OnNumberClicked}>
                        9
                    </button>


                    <button
                        className="button-number"
                        onClick={OnNumberClicked}>
                        4
                    </button>
                    <button
                        className="button-number"
                        onClick={OnNumberClicked}>
                        5
                    </button>
                    <button
                        className="button-number"
                        onClick={OnNumberClicked}>
                        6
                    </button>


                    <button
                        className="button-number"
                        onClick={OnNumberClicked}>
                        1
                    </button>
                    <button
                        className="button-number"
                        onClick={OnNumberClicked}>
                        2
                    </button>
                    <button
                        className="button-number"
                        onClick={OnNumberClicked}>
                        3
                    </button>


                    <button
                        className="button-modifier"
                        onClick={handleClearClicked}>
                        ON/C
                    </button>
                    <button
                        className="button-number"
                        onClick={OnNumberClicked}>
                        0
                    </button>
                    <button
                        className="button-number"
                        onClick={OnNumberClicked}>
                        .
                    </button>

                </div>

                <div className="buttons-grid-right">
                    <button
                        className="button-modifier"
                        onClick={() => handleModifierClicked("/")}>
                        &#247;
                    </button>
                    <button
                        className="button-modifier"
                        onClick={() => handleModifierClicked("x")}>
                        x
                    </button>
                    <button
                        className="button-modifier"
                        onClick={() => handleModifierClicked("-")}>
                        -
                    </button>
                    <button
                        className="button-modifier"
                        onClick={() => handleModifierClicked("+")}>
                        +
                    </button>
                    <button
                        className="button-submit"
                        onClick={handleSubmitClicked}>
                        =
                    </button>

                </div>

            </div>

        </div>

    );
}

export default Calculator;