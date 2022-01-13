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

    buttonEl.addEventListener('click',() => {
        renderOutput();
    })

/**
 * Calculate the retirement age with all the input values
 */

const calculateRetirementAge = () => {
    // validateInput();
    
    const income = parseInt(incomeEl.value);
    const cost = parseInt(costEl.value);
    const netWorth = parseInt(netWorthEl.value);
    const interest = parseInt(interestEl.value) / 100;
    const age = parseInt(ageEl.value);

    const netWorthNeeded = cost*25;
    const annualSavings = income-cost;
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
    
    return [retirementAge, yearCounter, currentWorth, savingsValue, roiValue];
}

const renderOutput = () => {
    const outputArray = calculateRetirementAge();
    if (outputArray[1] < 10) {
        retirementAgeEl.textContent = `Awesome, you can already retire in about ${outputArray[1]} years, when you are ${outputArray[0]} years old!`;
    } else if (outputArray[1] >= 10 && outputArray[1] < 20) {
        retirementAgeEl.textContent = `Not bad, you can retire in about ${outputArray[1]} years, when you are ${outputArray[0]} years old!`;
    } else if (outputArray[1] >= 20 && outputArray[0] < 75) {
        retirementAgeEl.textContent = `Hang in there, you can retire in about ${outputArray[1]} years, when you are still just ${outputArray[0]} years old!`;
    } else {
        retirementAgeEl.textContent = `You can retire in about ${outputArray[1]} years, when you are ${outputArray[0]} years old. Let's hope you're still alive to enjoy it then!`;
    }

    portfolioValueEl.textContent = `${Math.round(outputArray[2])}€`;
    savingsValueEl.textContent = `${outputArray[3]}€`;
    roiValueEl.textContent = `${Math.round(outputArray[4])}€`;
}



// const validateInput = () => {

// }
