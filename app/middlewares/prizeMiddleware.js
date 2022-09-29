const printPrizeURLMiddleware = (request, response, next) => {
  console.log("Prize URL: ", request.url);
  next();
}

module.exports = {
  printPrizeURLMiddleware: printPrizeURLMiddleware
}