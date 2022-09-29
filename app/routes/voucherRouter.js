// Import  expresss
const express = require('express');

// Import Prize Middleware
const { printVoucherURLMiddleware } = require("../middlewares/voucherMiddleware");


const {
  createVoucher,
  getAllVouchers,
  getVoucherById,
  updateVoucherById,
  deleteVoucherById
} = require("../controllers/voucherController");

const router = express.Router();

router.post("/vouchers", printVoucherURLMiddleware, createVoucher);
router.get("/vouchers", printVoucherURLMiddleware, getAllVouchers);
router.get("/vouchers/:voucherId", printVoucherURLMiddleware, getVoucherById);
router.put("/vouchers/:voucherId", printVoucherURLMiddleware, updateVoucherById);
router.delete("/vouchers/:voucherId", printVoucherURLMiddleware, deleteVoucherById);

// Export router
module.exports = router;