// Import expresss
const express = require('express');

// Import Prize Middleware
const { printPrizeURLMiddleware } = require("../middlewares/prizeMiddleware");

const {
  createPrize,
  getAllPrizes,
  getPrizeById,
  updatePrizeById,
  deletePrizeById
} = require("../controllers/prizeController");

const router = express.Router();

router.post("/prizes", printPrizeURLMiddleware, createPrize);
router.get("/prizes", printPrizeURLMiddleware, getAllPrizes);
router.get("/prizes/:prizeId", printPrizeURLMiddleware, getPrizeById);
router.put("/prizes/:prizeId", printPrizeURLMiddleware, updatePrizeById);
router.delete("/prizes/:prizeId", printPrizeURLMiddleware, deletePrizeById);

// Export router
module.exports = router;