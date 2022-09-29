// Import  expresss
const express = require('express');

// Import Prize Middleware
const { printVoucherURLMiddleware } = require("../middlewares/voucherMiddleware");


const {
  createVoucherHistory,
  getAllVouchersHistory,
  getVoucherHistoryById,
  updateVoucherHistoryById,
  deleteVoucherHistoryById,
  getVoucherHistoryByUser
} = require("../controllers/voucherHistoryController");

const router = express.Router();

router.post("/voucher-histories", printVoucherURLMiddleware, createVoucherHistory);
router.get("/voucher-histories", printVoucherURLMiddleware, getAllVouchersHistory);
router.get("/voucher-histories/:voucherHistoryId", printVoucherURLMiddleware, getVoucherHistoryById);
router.put("/voucher-histories/:voucherHistoryId", printVoucherURLMiddleware, updateVoucherHistoryById);
router.delete("/voucher-histories/:voucherHistoryId", printVoucherURLMiddleware, deleteVoucherHistoryById);

router.get("/devcamp-lucky-dice/voucher-history", printVoucherURLMiddleware, getVoucherHistoryByUser);

// Export router
module.exports = router;