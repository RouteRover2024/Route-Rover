// HistoryController.js

const History = require("../model/history");

const HistoryController = {
    createHistory: async (req, res) => {
        try {
            const newHistory = await History.create(req.body);
            res.status(201).json(newHistory);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getHistoryById: async (req, res) => { 
        const historyId = req.params.historyId;
        try {
            const history = await History.findById(historyId);
            if (!history) {
                res.status(404).json({ message: "History not found" });
            } else {
                res.status(200).json(history);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // Add more controller methods as needed
};

module.exports = HistoryController;
