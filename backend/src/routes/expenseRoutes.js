const express = require('express');
const router = express.Router();
const { createExpense, getAllExpenses, getExpenseSummary, getExpensesByCrop, getExpenseById, updateExpense, deleteExpense} = require('../controllers/expenseController');
const { tokenValidator } = require('../middleware/authMiddleware');


router.post('/', tokenValidator, createExpense);


router.get('/', tokenValidator, getAllExpenses);

router.get('/summary', tokenValidator, getExpenseSummary);

router.get('/crop/:cropId', tokenValidator, getExpensesByCrop);

router.get('/:id', tokenValidator, getExpenseById);

router.put('/:id', tokenValidator, updateExpense);

router.delete('/:id', tokenValidator, deleteExpense);

module.exports = router;