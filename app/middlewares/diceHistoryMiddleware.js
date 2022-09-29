const printDiceHistoryURLMiddleware = (request, response, next) => {
    console.log("Dice History URL: ", request.url);
    next();
}

module.exports = {
    printDiceHistoryURLMiddleware: printDiceHistoryURLMiddleware
}