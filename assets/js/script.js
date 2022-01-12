/**
 * Declare constants for DOM manupulation and to grab input values
 */

const retirementAgeEL = document.getElementById("retirement-age");
const incomeEL = document.getElementById("income-el");
const costEL = document.getElementById("cost-el");
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
    calculateRetirementAge();
})

/**
 * Calculate the retirement age with all the input values
 */

const calculateRetirementAge = () => {
    validateInput();
    console.log("SHIT");
    const income = parseInt(incomeEL.value);
    const cost = parseInt(costEL.value);
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
            yearCounter++
        } else {
            currentWorth = (currentWorth + annualSavings) * (1 + interest);
            yearCounter++;
        }
        console.log(yearCounter);
        console.log(currentWorth);
    }

    const retirementAge = age + yearCounter;
}

const validateInput = () => {

}
