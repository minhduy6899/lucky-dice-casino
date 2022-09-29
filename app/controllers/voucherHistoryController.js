const voucherHistoryModel = require("../models/voucherHistoryModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

const getVoucherHistoryByUser = (request, response) => {
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
        voucherHistoryModel
          .find({
            users: { $eq: userId }
          })
          .populate({
            path: 'users',
            match: { username: { $eq: username } },
          })
          .populate("vouchers")

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

const createVoucherHistory = (request, response) => {
  //B1: Get data
  let bodyRequest = request.body;

  //B2: Validate data

  //B3: Work with data
  let newVocherInput = {
    _id: mongoose.Types.ObjectId(),
  }

  voucherHistoryModel.create(newVocherInput, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(201).json({
        status: "Create voucher history Success",
        data: data
      })
    }
  })
}

const getAllVouchersHistory = (request, response) => {
  let { voucherHistoryId } = request.body


  let condition = {}

  if (user) {
    condition.title = voucherHistoryId
  }
  voucherHistoryModel.find(condition, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Get all voucher history success",
        data: data
      })
    }
  })
}

const getVoucherHistoryById = (request, response) => {
  //B1: Get data
  let voucherHistoryId = request.params.voucherHistoryId;

  //B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(voucherHistoryId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Prize ID is not valid"
    })
  }

  //B3: Work with data
  voucherHistoryModel.findById(voucherHistoryId, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Get Voucher history success",
        data: data
      })
    }
  })
}

const updateVoucherHistoryById = (request, response) => {
  //B1: Get data
  let voucherHistoryId = request.params.voucherHistoryId;
  let bodyRequest = request.body;

  //B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(voucherHistoryId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Voucher history ID is not valid"
    })
  }

  //B3: Work with data
  let voucherNewUpdate = {
  }

  voucherHistoryModel.findByIdAndUpdate(voucherHistoryId, voucherNewUpdate, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Update voucher history success",
        data: data
      })
    }
  })
}

const deleteVoucherHistoryById = (request, response) => {
  //B1: Get data
  let voucherHistoryId = request.params.voucherHistoryId;

  //B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(voucherHistoryId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "voucher history ID is not valid"
    })
  }

  //B3: Work with data
  voucherHistoryModel.findByIdAndDelete(voucherHistoryId, (error) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        message: "Success: Delete voucher history success"
      })
    }
  })
}

module.exports = {
  createVoucherHistory: createVoucherHistory,
  getAllVouchersHistory: getAllVouchersHistory,
  getVoucherHistoryById: getVoucherHistoryById,
  updateVoucherHistoryById: updateVoucherHistoryById,
  deleteVoucherHistoryById: deleteVoucherHistoryById,
  getVoucherHistoryByUser: getVoucherHistoryByUser,
}