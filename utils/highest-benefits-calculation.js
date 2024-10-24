const getAllBenefitsAndProgramsCombinations = (benefits) => {
    return benefits.flatMap(benefit => benefit.program_name.map(category => ({ ...benefit, category })))
}

const shouldUpdateBenefit = (benefitsAcc, benefit, value) => !benefitsAcc[benefit.category] || value > benefitsAcc[benefit.category].value;

const getHighestBenefits = (benefits) => {
    const allCombinations = getAllBenefitsAndProgramsCombinations(benefits);
    const highestBenefits = allCombinations.reduce((benefitsAcc, benefit) => {
        const value = parseFloat(benefit.value);
        if (shouldUpdateBenefit(benefitsAcc, benefit, value)) {
          benefitsAcc[benefit.category] = value;
        }
        return benefitsAcc;
      }, {});

    return highestBenefits;
}

module.exports = getHighestBenefits;
