const express = require('express');
const router = express.Router();
const { createRevenue, getAllRevenues, getRevenueByBuyer, getRevenuesByCrop, getProfitAnalysis, getRevenueById, updateRevenue, deleteRevenue} = require('../controllers/revenueController');
const { tokenValidator } = require('../middleware/authMiddleware');


router.post('/', tokenValidator, createRevenue);

router.get('/', tokenValidator, getAllRevenues);


router.get('/by-buyer', tokenValidator, getRevenueByBuyer);


router.get('/crop/:cropId', tokenValidator, getRevenuesByCrop);

router.get('/profit/:cropId', tokenValidator, getProfitAnalysis);

router.get('/:id', tokenValidator, getRevenueById);

router.put('/:id', tokenValidator, updateRevenue);

router.delete('/:id', tokenValidator, deleteRevenue);

module.exports = router;