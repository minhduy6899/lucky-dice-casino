// Import express
const express = require('express');

// Import Dice History Middleware
const { printDiceHistoryURLMiddleware } = require("../middlewares/diceHistoryMiddleware");

// Import Course Controller
const { createDiceHistory,
  getAlldiceHistories,
  getDiceHistoryById,
  updateDiceHistoryById,
  deleteDiceHistoryById
} = require("../controllers/diceHistoryController");

const {
  diceHandler,
  getDiceHistoryByUser,
} = require("../controllers/diceController")

const router = express.Router();

router.post("/dice-history", printDiceHistoryURLMiddleware, createDiceHistory);
router.get("/dice-history", printDiceHistoryURLMiddleware, getAlldiceHistories);
router.get("/dice-history/:diceHistoryId", printDiceHistoryURLMiddleware, getDiceHistoryById);
router.put("/dice-history/:diceHistoryId", printDiceHistoryURLMiddleware, updateDiceHistoryById);
router.delete("/dice-history/:diceHistoryId", printDiceHistoryURLMiddleware, deleteDiceHistoryById);

router.post("/devcamp-lucky-dice/dice", printDiceHistoryURLMiddleware, diceHandler);
router.get("/devcamp-lucky-dice/dice-history", printDiceHistoryURLMiddleware, getDiceHistoryByUser);

// Export router
module.exports = router;