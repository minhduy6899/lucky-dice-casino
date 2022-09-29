const printUserURLMiddleware = (request, response, next) => {
  console.log("User URL: ", request.url);
  next();
}

module.exports = {
  printUserURLMiddleware: printUserURLMiddleware
}