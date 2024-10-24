const accountRepository = require('../repositories/accountsRepository');
const getNearestBranchDistance = require('../utils/nearest-branch-calculation');
const { toBenefitCardDTO, toDiscountCardDTO } = require('../mappers/cardsMapper');

const getAccountsData = async () => {
    const accountsData = await accountRepository.getAccounts();

    if (!accountsData?.accounts) {
        throw new Error('There was an error while fetching accounts');
    }
    return accountsData.accounts;
}

const hasTurismoTag = (tags, expectedTag) => tags.some(tag => tag?.name === expectedTag);

const benefitCardsProcessing = (accounts, tag, quantity) => 
    accounts
    .filter((account) => hasTurismoTag(account.tags, tag))
    .sort((a,b) => getNearestBranchDistance(a.branches) - getNearestBranchDistance(b.branches))
    .slice(0, quantity)
    .map((account) => toBenefitCardDTO(account));

const getBenefitCards = async ({
    quantity = 4,
    tag = "Turismo en Buenos Aires",
}) => {
  const accounts = await getAccountsData();
  
  return benefitCardsProcessing(accounts, tag, quantity);
};

const discountsSortCriteria = async (a,b,descendant) => descendant ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);

const discountProcessing = (accounts, quantity, descendant) => 
    accounts
        .filter(account => account.haveVoucher)
        .sort((a, b) => discountsSortCriteria(a, b, descendant))
        .slice(0, quantity)
        .map((account) => toDiscountCardDTO(account));

const getDiscountCards = async({
    descendant = true,
    quantity = 4,
}) => {
    const accounts = await getAccountsData();
    
    return discountProcessing(accounts, quantity, descendant);
}

module.exports = {
    getBenefitCards,
    getDiscountCards
};
