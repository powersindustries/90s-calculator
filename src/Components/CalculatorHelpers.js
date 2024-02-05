// --------------------------------------
// --------------------------------------
export function formatDisplay(inValue) {
    const inValueString = String(inValue);
    if (inValueString.length > 10) {
        return Number(inValueString.substring(0, 10));
    }

    return inValue;
}


// --------------------------------------
// --------------------------------------
export function performCalculation(value1, value2, modifier) {
    switch (modifier) {
        case "+":
            return value1 + value2;
        case "/":
            return value1 / value2;
        case "x":
            return value1 * value2;
        case "-":
            return value1 - value2;
        default:
            console.error("Modifier (" + modifier + ") not found.");
            return 0
    }
}


// --------------------------------------
// --------------------------------------
export function getAnswerAfterModifier(inCalculation, inModifier) {
    if (!inCalculation.value) {
        return inCalculation.answer;
    }
    else if (!inCalculation.answer) {
        return inCalculation.value;
    }
    else {
        return performCalculation(inCalculation.answer, inCalculation.value, inModifier);
    }
}


// --------------------------------------
// --------------------------------------
export function getAnswerAfterSpecialModifier(inCalculation, inModifier) {

    switch (inModifier) {
        case "plusminus":
            if (inCalculation.value) {
                return inCalculation.value * -1;
            }
            else {
                return inCalculation.answer * -1;
            }
        case "sqrt":
            if (inCalculation.value) {
                return Math.sqrt(inCalculation.value);
            }
            else {
                return Math.sqrt(inCalculation.answer);
            }
        case "percent":
            if (inCalculation.value) {
                const percentage = inCalculation.answer * (inCalculation.value * 0.01);
                return performCalculation(inCalculation.answer, percentage, inCalculation.modifier);
            }
            else {
                return 0;
            }
        default:
            console.error("No special modifier case for: " + inModifier);
            return inCalculation.value;
    }
}