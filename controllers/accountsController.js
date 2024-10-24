const accountService = require('../services/accountsService');
const INTERNAL_SERVER_ERROR = 500;


const getBenefitCards = async (req, res) => {
    try {
        const searchCriteria = req.query;
        const account = await accountService.getBenefitCards(searchCriteria);
        res.status(200).json(account);
    } catch (error) {
        const statusCode = error.status || INTERNAL_SERVER_ERROR;
        res.status(statusCode).json({ message: error.message });
    }
};

const getDiscountCards = async (req, res) => {
    try {
        const searchCriteria = req.query;
        const account = await accountService.getDiscountCards(searchCriteria);
        res.status(200).json(account);
    }
    catch (error) {
        const statusCode = error.status || INTERNAL_SERVER_ERROR;
        res.status(statusCode).json({ message: error.message });
    }
};


module.exports = {
    getBenefitCards,
    getDiscountCards
};
