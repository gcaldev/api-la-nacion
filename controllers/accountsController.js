const ClnException = require('../exceptions/clnException');
const ClnErrorCodes = require('../exceptions/errorCodes');
const accountService = require('../services/accountsService');


const getBenefitCards = async (req, res) => {
    try {
        const {
            quantity = "4",
            tag = "Turismo en Buenos Aires",
        } = req.query;
        const parsedQuantity = getValidQuantity(quantity);
        const account = await accountService.getBenefitCards({ quantity: parsedQuantity,
        tag 
        });
        res.status(200).json(account);
    } catch (error) {
        const { status, message, code } = errorHandler(error);
        res.status(status).json({ message, code, status });
    }
};

const getDiscountCards = async (req, res) => {
    try {
        const {
            quantity = "4",
            descendant = "true",
        } = req.query;
        const descendantBool = descendant === "true";
        const parsedQuantity = getValidQuantity(quantity);

        const account = await accountService.getDiscountCards({     quantity: parsedQuantity,
        descendant: descendantBool
        });
        
        res.status(200).json(account);
    } catch (error) {
        const { status, message, code } = errorHandler(error);
        res.status(status).json({ message, code, status });
    }
};

const getValidQuantity = (quantity) => {
    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
        throw new ClnException(
            ClnErrorCodes.INVALID_QUANTITY.code,
            ClnErrorCodes.INVALID_QUANTITY.message,
            ClnErrorCodes.INVALID_QUANTITY.status
        );
    }
    return parsedQuantity;
}

const errorHandler = (error) => {
    return {
        status: error.status || ClnErrorCodes.GENERIC_ERROR.status,
        message: error.message || ClnErrorCodes.GENERIC_ERROR.message,
        code: error.code || ClnErrorCodes.GENERIC_ERROR.code
    }
}

module.exports = {
    getBenefitCards,
    getDiscountCards
};
