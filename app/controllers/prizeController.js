const prizeModel = require("../models/prizeModel");
const mongoose = require("mongoose");

const createPrize = (request, response) => {
  //B1: Get data
  let bodyRequest = request.body;

  //B2: Validate data
  if (!bodyRequest.name) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Name is required"
    })
  }

  //B3: Work with data
  let newPrizeInput = {
    _id: mongoose.Types.ObjectId(),
    name: bodyRequest.name,
    description: bodyRequest.description
  }

  prizeModel.create(newPrizeInput, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(201).json({
        status: "Create prize Success",
        data: data
      })
    }
  })
}

const getAllPrizes = (request, response) => {
  prizeModel.find((error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Get all prizes success",
        data: data
      })
    }
  })
}

const getPrizeById = (request, response) => {
  //B1: Get data
  let prizeId = request.params.prizeId;

  //B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(prizeId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Prize ID is not valid"
    })
  }

  //B3: Work with data
  prizeModel.findById(prizeId, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Get Prize success",
        data: data
      })
    }
  })
}

const updatePrizeById = (request, response) => {
  //B1: Get data
  let prizeId = request.params.prizeId;
  let bodyRequest = request.body;

  //B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(prizeId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "prize ID is not valid"
    })
  }

  //B3: Work with data
  let prizeNewUpdate = {
    name: bodyRequest.name,
    description: bodyRequest.description
  }

  prizeModel.findByIdAndUpdate(prizeId, prizeNewUpdate, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Update prize success",
        data: data
      })
    }
  })
}

const deletePrizeById = (request, response) => {
  //B1: Get data
  let prizeId = request.params.prizeId;

  //B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(prizeId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "prizeId ID is not valid"
    })
  }

  //B3: Work with data
  prizeModel.findByIdAndDelete(prizeId, (error) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(204).json({
        status: "Success: Delete prize success"
      })
    }
  })
}

module.exports = {
  createPrize: createPrize,
  getAllPrizes: getAllPrizes,
  getPrizeById: getPrizeById,
  updatePrizeById: updatePrizeById,
  deletePrizeById: deletePrizeById
}