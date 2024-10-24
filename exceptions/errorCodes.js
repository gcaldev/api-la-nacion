const ClnErrorCodes = {
    GENERIC_ERROR: {
        code: "CLN000",
        message: "An unexpected error occurred",
        status: 500
    },
    ACCOUNTS_NOT_FOUND: {
        code: "ACC001",
        message: "There was an error while fetching accounts",
        status: 404
    },
    INVALID_QUANTITY: {
        code: "ACC002",
        message: "Invalid quantity",
        status: 400
    }
}

module.exports = ClnErrorCodes;