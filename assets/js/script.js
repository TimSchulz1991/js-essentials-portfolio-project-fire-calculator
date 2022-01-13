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
    if (event.key === "Enter") {
        renderOutput();
    }
})


/**
 * Calculate the relevant output values, based on the given input values
 */

const calculateOutputValues = () => {
    const income = parseInt(incomeEl.value);
    const cost = parseInt(costEl.value);
    const netWorth = parseInt(netWorthEl.value);
    const interest = parseInt(interestEl.value) / 100;
    const age = parseInt(ageEl.value);

    const errors = validateInput(income, cost, interest, age);
    if (errors === null) {
        const netWorthNeeded = cost * 25;
        const annualSavings = income - cost;
        let currentWorth = netWorth;
        let yearCounter = 0;

        while (currentWorth < netWorthNeeded) {
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
            retirementAge,
            yearCounter,
            currentWorth,
            savingsValue,
            roiValue
        };
    } else {
        renderWarnings(errors);
        return null;
    }
}

/**
 * This function renders the output to the page
 */

const renderOutput = () => {
    const result = calculateOutputValues()
    if (result !== null) {
        const {
            retirementAge,
            yearCounter,
            currentWorth,
            savingsValue,
            roiValue
        } = result;
        if (yearCounter < 10) {
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
    return errors.length !== 0 ? errors : null;
}

/** 
 * This function renders out the warnings to the page 
 */

const renderWarnings = (errors) => {
    warningEl.textContent = "";
    for (let error of errors) {
        warningEl.innerHTML += error;
    }
}