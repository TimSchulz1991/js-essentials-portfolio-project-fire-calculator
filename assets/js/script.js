/**
 * Declare constants for DOM manupulation and to grab input values
 */

const retirementAgeEl = document.getElementById("retirement-age");
const incomeEl = document.getElementById("income-el");
const costEl = document.getElementById("cost-el");
const netWorthEl = document.getElementById("net-worth-el");
const interestEl = document.getElementById("interest-el");
const ageEl = document.getElementById("age-el");
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

/**
 * Calculate the relevant output values, based on the given input values
 */

const calculateOutputValues = () => {
    const incomeElValue = parseInt(incomeEl.value);
    const costElValue = parseInt(costEl.value);
    const netWorthElValue = parseInt(netWorthEl.value);
    const interestElValue = parseInt(interestEl.value);
    const ageElValue = parseInt(ageEl.value);
    const valid = validateInput(incomeElValue, costElValue, netWorthElValue, interestElValue, ageElValue);

    const income = incomeElValue;
    const cost = costElValue;
    const netWorth = netWorthElValue;
    const interest = interestElValue / 100;
    const age = ageElValue;

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
    const savingsValue = yearCounter * annualSavings;
    const roiValue = currentWorth - savingsValue;

    return {
        retirementAge,
        yearCounter,
        currentWorth,
        savingsValue,
        roiValue
    };
}

/**
 * This function renders the output to the HTML
 */

const renderOutput = () => {
    const {
        retirementAge,
        yearCounter,
        currentWorth,
        savingsValue,
        roiValue
    } = calculateOutputValues();
    if (yearCounter < 10) {
        retirementAgeEl.textContent = `Awesome, you can already retire in about ${yearCounter} years, when you are ${retirementAge} years old!`;
    } else if (yearCounter >= 10 && yearCounter < 20) {
        retirementAgeEl.textContent = `Not bad, you can retire in about ${yearCounter} years, when you are ${retirementAge} years old!`;
    } else if (yearCounter >= 20 && retirementAge < 75) {
        retirementAgeEl.textContent = `Hang in there, you can retire in about ${yearCounter} years, when you are still just ${retirementAge} years old!`;
    } else {
        retirementAgeEl.textContent = `You can retire in about ${yearCounter} years, when you are ${retirementAge} years old. Let's hope you're still alive to enjoy it then!`;
    }

    portfolioValueEl.textContent = `${Math.round(currentWorth)}€`;
    savingsValueEl.textContent = `${savingsValue}€`;
    roiValueEl.textContent = `${Math.round(roiValue)}€`;
}

/**
 * This function validates all the input values
 */

const validateInput = (income, cost, netWorth, interest, age) => {
    let warningMessage = "";
    const warnings = {
        incomeWarning: "Your income must be a positive, whole number! ",
        costWarning: "Your income must be a positive, whole number! ",
        netWorthWarning: "Your current net worth must be a whole number! ",
        interestWarning: "The interest rate must be a positive number! ",
        ageWarning: "Your age must be a positive, whole number! "
        }

    if (income <= 0 || income % 1 !== 0) {
        warningMessage += warnings.incomeWarning;
    } else if (cost <= 0 || cost % 1 !== 0) {
        warningMessage += warnings.costWarning;
    } else if (netWorth % 1 !== 0) {
        warningMessage += warnings.netWorthWarning;
    } else if (interest <= 0) {
        warningMessage += warnings.interestWarning;
    } else if (age <= 0 || age % 1 !== 0) {
        warningMessage += warnings.ageWarning;
    }
}
