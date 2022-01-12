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

button.addEventListener('click',function(){
    calculateRetirementAge();
})

/**
 * Calculate the retirement age with all the input values
 */

const calculateRetirementAge = () => {
    validateInput();

    const income = parseInt(incomeEL.value);
    const cost = parseInt(costEL.value);
    const netWorth = parseInt(netWorthEl.value);
    const interest = parseInt(interestEl.value) / 100;
    const age = parseInt(ageEl.value);

    const netWorthNeeded = cost*25;
    const annualSavings = income-cost;
    let currentWorth = netWorth;
    let yearCounter = 0;
}

const validateInput = () => {

}