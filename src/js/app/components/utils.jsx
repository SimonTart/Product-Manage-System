export let arrayHas = function (array, content) {
    return content.some(function (element) {
        return array.indexOf(element) !== -1;
    });
};