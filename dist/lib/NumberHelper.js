"use strict";
var NumberHelper = (function () {
    function NumberHelper() {
    }
    NumberHelper.Random = function (maxVal) {
        return Math.floor(Math.random() * maxVal);
    };
    return NumberHelper;
}());
exports.NumberHelper = NumberHelper;
//# sourceMappingURL=NumberHelper.js.map