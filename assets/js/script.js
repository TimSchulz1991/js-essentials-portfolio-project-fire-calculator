/**
 * Declare constants for DOM manupulation and to grab input values
 */

const retirementAgeEl = document.getElementById("retirement-age");
const incomeEl = document.getElementById("income-el");
const costEl = document.getElementById("cost-el");
const netWorthEl = document.getElementById("net-worth-el");
const interestEl = document.getElementById("interest-el");
const ageEl = document.getElementById("age-el");
const warningEl = document.getElementById("warning");
const buttonEl = document.getElementById("calculate");
const portfolioValueEl = document.getElementById("portfolio-val");
const savingsValueEl = document.getElementById("savings-val");
const roiValueEl = document.getElementById("roi-val");

/**
 * Add event listeners
 */

buttonEl.addEventListener('click', () => {
    renderOutput();
})

ageEl.addEventListener('keydown', (event) => {
    /* This event listener adds the option to render the results by pressing the Enter key in the last input field (age) */
    if (event.key === "Enter") {
        renderOutput();
    }
})


/**
 * Calculate the relevant output values, based on the given input values
 */

const calculateOutputValues = () => {
    const income = parseInt(incomeEl.value); /* Grab all the values the user inputted */
    const cost = parseInt(costEl.value);
    const netWorth = parseInt(netWorthEl.value);
    const interest = parseFloat(interestEl.value) / 100;
    const age = parseInt(ageEl.value);

    const errors = validateInput(income, cost, interest, age); /* Validate the input fields with a function */
    if (errors === null) {
        /* Do all these calculations if there are no errors */
        const netWorthNeeded = cost * 25;
        const annualSavings = income - cost;
        let currentWorth = netWorth;
        let yearCounter = 0;

        while (currentWorth < netWorthNeeded) {
            /* Using a while loop to increase the net worth until the year that the necessary amount is surpassed. */
            if (yearCounter === 0) {
                currentWorth *= (1 + interest);
                yearCounter++;
            } else {
                currentWorth = (currentWorth + annualSavings) * (1 + interest);
                yearCounter++;
            }
        }

        const retirementAge = age + yearCounter;
        const savingsValue = yearCounter * annualSavings + netWorth;
        const roiValue = currentWorth - savingsValue;

        return {
            /* Return the relevant values to render out  */
            retirementAge,
            yearCounter,
            currentWorth,
            savingsValue,
            roiValue
        };
    } else {
        renderWarnings(errors); /* If the validation failed, return warning messages and return null */
        return null;
    }
}

/**
 * This function renders the output to the page
 */

const renderOutput = () => {
    const result = calculateOutputValues() /* Get all the relevant values from the previous function (or null if there was an error) */
    if (result !== null) {
        /* Do all of the following if there were no errors */
        const {
            retirementAge,
            yearCounter,
            currentWorth,
            savingsValue,
            roiValue
        } = result; /* Destructure the results variable */

        if (yearCounter < 10) {
            /* Render out all the calculated values to the page. The main message is dependent on the amount of years it takes to retire and on the user's age */
            retirementAgeEl.textContent = `Awesome, you can already retire in about ${yearCounter} years, when you are ${retirementAge} years old!`;
        } else if (yearCounter >= 10 && yearCounter < 20) {
            retirementAgeEl.textContent = `Not bad, you can retire in about ${yearCounter} years, when you are ${retirementAge} years old!`;
        } else if (yearCounter >= 20 && retirementAge < 75) {
            retirementAgeEl.textContent = `Hang in there, you can retire in about ${yearCounter} years, when you are still just ${retirementAge} years old!`;
        } else {
            retirementAgeEl.textContent = `You can retire in about ${yearCounter} years, when you are ${retirementAge} years old. Let's hope you're still alive to enjoy it then!`;
        }

        portfolioValueEl.textContent = `${Math.round(currentWorth).toLocaleString()} €`;
        savingsValueEl.textContent = `${savingsValue.toLocaleString()} €`;
        roiValueEl.textContent = `${Math.round(roiValue).toLocaleString()} €`;
        warningEl.textContent = "";
    } else {
        /* If there are errors, give the appropriate message to the user and make sure the previous rendered out values disappear */
        retirementAgeEl.textContent = "Make sure you insert valid values";
        portfolioValueEl.textContent = "";
        savingsValueEl.textContent = "";
        roiValueEl.textContent = "";
    }
}

/**
 * This function validates all the input values
 */

const validateInput = (income, cost, interest, age) => {
    const errors = []
    /* Keep pushing errors to the errors array (if there are any)*/
    if (income <= 0) {
        errors.push("Your income must be a number larger than 0!<br>");
    }
    if (cost <= 0) {
        errors.push("Your cost must be a number larger than 0!<br>");
    }
    if (interest <= 0) {
        errors.push("The interest rate must be a number larger than 0!<br>");
    }
    if (age <= 0) {
        errors.push("Your age must be a number larger than 0!");
    }
    return errors.length !== 0 ? errors : null; /* Return the errors array if there is more than 0 errors, otherwise return null, so that the calculations above are triggered */
}

/** 
 * This function renders out the warnings to the page 
 */

const renderWarnings = (errors) => {
    warningEl.textContent = ""; /* By setting the warning text content to an empty string first, you make sure that new warnings are not just appended when the calculations are done repeatedly */
    for (let error of errors) {
        warningEl.innerHTML += error;
    }
}