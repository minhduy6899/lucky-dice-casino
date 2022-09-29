const printVoucherURLMiddleware = (request, response, next) => {
  console.log("Dice History URL: ", request.url);
  next();
}

module.exports = {
  printVoucherURLMiddleware: printVoucherURLMiddleware
}