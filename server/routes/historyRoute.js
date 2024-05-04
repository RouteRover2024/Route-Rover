const express = require('express');
const HistoryController = require("../controllers/HistoryController");

const router = express.Router()

router.post("/history", HistoryController.createHistory);
router.get("/history/:historyId", HistoryController.getHistoryById);

// router.post('/', createRoute)

module.exports = router