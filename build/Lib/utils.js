"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = (function () {
    function Utils() {
    }
    Utils.Pad2start = function (num) {
        return (num < 10) ? "0" + num : "" + num;
    };
    Utils.CalculateWeek = function (level) {
        if (level === void 0) { level = 0; }
        var date = new Date();
        if (level !== 0) {
            var thisDate_1 = date.getDate();
            date.setDate(thisDate_1 + level * 7);
        }
        var thisDay = date.getDay();
        var thisDate = date.getDate();
        var monday = new Date(date.setDate(thisDate - thisDay + 1));
        var saturday = new Date(date.setDate(monday.getDate() + 5));
        var monDate = Utils.Pad2start(monday.getDate());
        var monMonth = Utils.Pad2start(monday.getMonth() + 1);
        var monYear = monday.getFullYear();
        var satDate = Utils.Pad2start(saturday.getDate());
        var satMonth = Utils.Pad2start(saturday.getMonth() + 1);
        var satYear = saturday.getFullYear();
        return monDate + "." + monMonth + "." + monYear + " - " + satDate + "." + satMonth + "." + satYear;
    };
    Utils.WeekRegex = /^[0-9][0-9].[0-9][0-9].[0-9][0-9][0-9][0-9] - [0-9][0-9].[0-9][0-9].[0-9][0-9][0-9][0-9]$/gi;
    return Utils;
}());
exports.default = Utils;
//# sourceMappingURL=utils.js.map