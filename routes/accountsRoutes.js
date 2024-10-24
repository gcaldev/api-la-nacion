const express = require('express');
const accountController = require('../controllers/accountsController');
const router = express.Router();

router.get('/benefits', accountController.getBenefitCards);
router.get('/discount-cards', accountController.getDiscountCards);

module.exports = router;
