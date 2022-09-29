const prizeHistoryModel = require("../models/prizeHistoryModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

const getPrizeHistoryByUser = (request, response) => {
  console.log('hello');
  // B1: Chuẩn bị dữ liệu
  let username = request.query.username;

  // Random 1 giá trị xúc xắc bất kỳ
  let dice = Math.floor(Math.random() * 6 + 1);

  // B2: Validate dữ liệu từ request body
  if (!username) {
    return response.status(400).json({
      status: "Error 400: Bad request",
      message: "Username is required"
    })
  }

  // Sử dụng userModel tìm kiếm bằng username
  userModel.findOne({
    username: username
  }, (errorFindUser, userExist) => {
    if (errorFindUser) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: errorFindUser.message
      })
    } else {
      if (!userExist) {
        // Nếu user không tồn tại trong hệ thống
        return response.status(200).json({
          message: "User is not exist",
          data: []
        })
      } else {
        console.log(userExist);
        const userId = userExist._id
        // Nếu user đã tồn tại trong hệ thốngS
        prizeHistoryModel
          .find({
            users: { $eq: userId }
          })
          .populate({
            path: 'users',
            match: { username: { $eq: username } },
            // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
          })
          .populate("prizes")
          .exec((error, dataDiceHistory) => {
            if (error) {
              return response.status(500).json({
                status: "Error 500: Internal server error",
                message: errorFindUser.message
              })
            } else {
              console.log(dataDiceHistory);
              return response.status(201).json({
                message: "Get diceHisotry of user success",
                data: dataDiceHistory
              })
            }

          })
      }
    }
  })
}

const createPrizeHistory = (request, response) => {
  //B1: Get data
  let bodyRequest = request.body;

  //B2: Validate data

  //B3: Work with data
  let newPrizeHistoryInput = {
    _id: mongoose.Types.ObjectId(),
  }

  prizeHistoryModel.create(newPrizeHistoryInput, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(201).json({
        status: "Create prizeHistory Success",
        data: data
      })
    }
  })
}

const getAllPrizesHistory = (request, response) => {
  let { priceHistoryId } = request.body


  let condition = {}

  if (user) {
    condition.title = priceHistoryId
  }

  prizeHistoryModel.find(condition, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Get all prizes history success",
        data: data
      })
    }
  })
}

const getPrizeHistoryById = (request, response) => {
  //B1: Get data
  let prizeHistorieId = request.params.prizeHistorieId;

  //B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(prizeHistorieId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Prize history ID is not valid"
    })
  }

  //B3: Work with data
  prizeHistoryModel.findById(prizeHistorieId, (error, data) => {
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

const updatePrizeHistoryById = (request, response) => {
  //B1: Get data
  let prizeHistorieId = request.params.prizeHistorieId;
  let bodyRequest = request.body;

  //B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(prizeHistorieId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "prize ID is not valid"
    })
  }

  //B3: Work with data
  let prizeHistoryNewUpdate = {
  }

  prizeHistoryModel.findByIdAndUpdate(prizeHistorieId, prizeHistoryNewUpdate, (error, data) => {
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

const deletePrizeHistoryById = (request, response) => {
  //B1: Get data
  let prizeHistorieId = request.params.prizeHistorieId;

  //B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(prizeHistorieId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "prizeHistorie ID is not valid"
    })
  }

  //B3: Work with data
  prizeHistoryModel.findByIdAndDelete(prizeHistorieId, (error) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(204).json({
        status: "Success: Delete prize history success"
      })
    }
  })
}

module.exports = {
  createPrizeHistory: createPrizeHistory,
  getAllPrizesHistory: getAllPrizesHistory,
  getPrizeHistoryById: getPrizeHistoryById,
  updatePrizeHistoryById: updatePrizeHistoryById,
  deletePrizeHistoryById: deletePrizeHistoryById,
  getPrizeHistoryByUser: getPrizeHistoryByUser,
}