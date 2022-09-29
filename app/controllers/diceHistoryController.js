// Import diceHistoryModel model
const diceHistoryModel = require("../models/diceHistoryModel");

// Define mongoose 
const mongoose = require("mongoose");

const createDiceHistory = (request, response) => {
    // B1: Get Data
    let bodyRequest = request.body;

    // B2: Validate data
    if (!bodyRequest.dice) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Dice is required"
        })
    }

    // B3: Work with db
    let createNewDiceHistory = {
        _id: mongoose.Types.ObjectId(),
        dice: bodyRequest.dice,
    }

    diceHistoryModel.create(createNewDiceHistory, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(201).json({
                status: "Success: diceHistory success",
                data: data
            })
        }
    })
}

const getAlldiceHistories = (request, response) => {
    let { user } = request.body


    let condition = {}

    if (user) {
        condition.title = user
    }

    diceHistoryModel.find(condition, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get dice history success",
                data: data
            })
        }
    })
}

const getDiceHistoryById = (request, response) => {
    // B1: Get data
    let diceHistoryId = request.params.diceHistoryId;

    // B2: Validate data
    if (!mongoose.Types.ObjectId.isValid(diceHistoryId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "DiceHistory ID is not valid"
        })
    }

    //B3: Work with data
    diceHistoryModel.findById(diceHistoryId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get course success",
                data: data
            })
        }
    })
}

const updateDiceHistoryById = (request, response) => {
    //B1: Get data
    let diceHistoryId = request.params.diceHistoryId;
    let bodyRequest = request.body;

    //B2: Validate data
    if (!mongoose.Types.ObjectId.isValid(diceHistoryId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Course ID is not valid"
        })
    }

    //B3: Work with data
    let diceHistoryUpdate = {
        dice: bodyRequest.dice,
    }

    diceHistoryModel.findByIdAndUpdate(diceHistoryId, diceHistoryUpdate, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Update course success",
                data: data
            })
        }
    })
}

const deleteDiceHistoryById = (request, response) => {
    //B1: Get Data
    let diceHistoryId = request.params.diceHistoryId;

    //B2: Validate data
    if (!mongoose.Types.ObjectId.isValid(diceHistoryId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Course ID is not valid"
        })
    }

    //B3: Work with data
    diceHistoryModel.findByIdAndDelete(diceHistoryId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(204).json({
                status: "Success: Delete course success"
            })
        }
    })
}

// Export controller 
module.exports = {
    createDiceHistory: createDiceHistory,
    getAlldiceHistories: getAlldiceHistories,
    getDiceHistoryById: getDiceHistoryById,
    updateDiceHistoryById: updateDiceHistoryById,
    deleteDiceHistoryById: deleteDiceHistoryById
}