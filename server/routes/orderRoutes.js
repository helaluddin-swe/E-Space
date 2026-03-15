const express = require('express');
const router = express.Router();
const { createOrder, updateOrderToPaid } = require('../controllers/orderController');

router.post('/', createOrder);
router.put('/:id/pay', updateOrderToPaid);

module.exports = router;