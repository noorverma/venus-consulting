//code referenced from https://www.youtube.com/watch?v=fgbEwVWlpsI
function convertToSubcurrency(amount, factor = 100) {
    return Math.round(amount * factor);
}

export default convertToSubcurrency;