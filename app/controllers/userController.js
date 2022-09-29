const userModel = require("../models/userModel");
const diceHistoryModel = require("../models/diceHistoryModel");
const mongoose = require("mongoose");

const createUserOfDiceHistory = (request, response) => {
    //B1: Get data
    let requestBody = request.body;

    //B2: Validate data

    if (!requestBody.username || !requestBody.firstname || !requestBody.lastname) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "Some info is missing"
        })
    }

    //B3: Work with data
    let newUserInput = {
        _id: mongoose.Types.ObjectId(),
        username: requestBody.username,
        firstname: requestBody.firstname,
        lastname: requestBody.lastname
    }

    userModel.create(newUserInput, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(201).json({
                status: "Success: userModel success",
                data: data
            })
        }
    })
}

const getAllUsersOfDiceHistory = (request, response) => {
    userModel.find((error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get User success",
                data: data
            })
        }
    })
}

const getUserById = (request, response) => {
    //B1: Get data
    let userId = request.params.userId;

    //B2: Validate data
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "User ID is not valid"
        })
    }

    //B3: Work with data
    userModel.findById(userId, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Get user success",
                data: data
            })
        }
    })
}

const updateUserById = (request, response) => {
    //B1: Get data
    let userId = request.params.userId;
    let bodyRequest = request.body;

    //B2: Validate data
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "User ID is not valid"
        })
    }

    //B3: Work with data
    let userNewUpdate = {
        username: bodyRequest.username,
        firstname: bodyRequest.firstname,
        lastname: bodyRequest.lastname
    }

    userModel.findByIdAndUpdate(userId, userNewUpdate, (error, data) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            return response.status(200).json({
                status: "Success: Update user success",
                data: data
            })
        }
    })
}

const deleteUserById = (request, response) => {
    //B1: Get data
    let userId = request.params.userId;
    let diceHistoryId = request.params.diceHistoryId;

    //B2: Validate data
    if (!mongoose.Types.ObjectId.isValid(diceHistoryId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "DiceHistory ID is not valid"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return response.status(400).json({
            status: "Error 400: Bad Request",
            message: "UserId ID is not valid"
        })
    }

    //B3: Work with data
    userModel.findByIdAndDelete(userId, (error) => {
        if (error) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: error.message
            })
        } else {
            diceHistoryModel.findByIdAndUpdate(diceHistoryId,
                {
                    $pull: { users: userId }
                },
                (err, updatedCourse) => {
                    if (err) {
                        return response.status(500).json({
                            status: "Error 500: Internal server error",
                            message: err.message
                        })
                    } else {
                        return response.status(200).json({
                            status: "Success: Delete user success"
                        })
                    }
                })
        }
    })
}

module.exports = {
    createUserOfDiceHistory: createUserOfDiceHistory,
    getAllUsersOfDiceHistory: getAllUsersOfDiceHistory,
    getUserById: getUserById,
    updateUserById: updateUserById,
    deleteUserById: deleteUserById
}