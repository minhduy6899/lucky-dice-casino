// Import expresss
const express = require('express');

// Import Prize Middleware
const { printPrizeURLMiddleware } = require("../middlewares/prizeMiddleware");

const {
  createPrizeHistory,
  getAllPrizesHistory,
  getPrizeHistoryById,
  updatePrizeHistoryById,
  deletePrizeHistoryById,
  getPrizeHistoryByUser
} = require("../controllers/prizeHistoryController");

const router = express.Router();

router.post("/prize-histories", printPrizeURLMiddleware, createPrizeHistory);
router.get("/prize-histories", printPrizeURLMiddleware, getAllPrizesHistory);
router.get("/prize-histories/:prizeHistorieId", printPrizeURLMiddleware, getPrizeHistoryById);
router.put("/prize-histories/:prizeHistorieId", printPrizeURLMiddleware, updatePrizeHistoryById);
router.delete("/prize-histories/:prizeHistorieId", printPrizeURLMiddleware, deletePrizeHistoryById);

router.get("/devcamp-lucky-dice/prize-history", printPrizeURLMiddleware, getPrizeHistoryByUser);

// Export router
module.exports = router;