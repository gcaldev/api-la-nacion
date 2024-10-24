const accountRepository = require('../repositories/accountsRepository');
const getNearestBranchDistance = require('../utils/nearest-branch-calculation');
const { toBenefitCardDTO, toDiscountCardDTO } = require('../mappers/cardsMapper');
const ClnErrorCodes = require('../exceptions/errorCodes');
const ClnException = require('../exceptions/clnException');

const getAccountsData = async () => {
    const accountsData = await accountRepository.getAccounts();

    if (!accountsData?.accounts) {
        throw new ClnException(
            ClnErrorCodes.ACCOUNTS_NOT_FOUND.code, ClnErrorCodes.ACCOUNTS_NOT_FOUND.message, ClnErrorCodes.ACCOUNTS_NOT_FOUND.status
        );
    }
    return accountsData.accounts;
}

const hasExpectedTag = (tags, expectedTag) => tags.some(tag => tag.name === expectedTag);

const benefitCardsProcessing = (accounts, tag, quantity) => 
    accounts
    .filter((account) => hasExpectedTag(account.tags, tag))
    .sort((a,b) => getNearestBranchDistance(a.branches) - getNearestBranchDistance(b.branches))
    .slice(0, quantity)
    .map((account) => toBenefitCardDTO(account));

const getBenefitCards = async ({
    quantity,
    tag,
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
    descendant,
    quantity,
}) => {
    const accounts = await getAccountsData();
    
    return discountProcessing(accounts, quantity, descendant);
}

module.exports = {
    getBenefitCards,
    getDiscountCards
};
