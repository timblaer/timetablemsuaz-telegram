"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Day_1 = __importDefault(require("./Day"));
var WeekView = (function () {
    function WeekView() {
        this.curDay = new Day_1.default();
        this.days = [this.curDay];
        this.Empty = false;
    }
    WeekView.prototype.newDay = function () {
        if (!this.Empty) {
            this.days.push(new Day_1.default());
            this.curDay = this.days[this.days.length - 1];
        }
    };
    WeekView.prototype.SaveLesson = function (lesson) {
        if (!this.Empty) {
            if (!this.curDay.TrySaveLesson(lesson)) {
                this.newDay();
                this.SaveLesson(lesson);
            }
        }
    };
    WeekView.prototype.toString = function () {
        if (this.Empty) {
            return 'TableEmptyMessage';
        }
        var dayStrings = [];
        var freeDaysCount = 0;
        for (var idx in this.days) {
            var day = this.days[idx];
            var str = day.toString();
            if (str.length !== 0) {
                dayStrings.push("DayInfo " + str);
            }
            else {
                dayStrings.push("DayInfo FREEDAY");
                freeDaysCount++;
            }
        }
        if (freeDaysCount == 6) {
            return 'TableEmptyMessage';
        }
        return dayStrings.join('\n\n');
    };
    return WeekView;
}());
exports.default = WeekView;
//# sourceMappingURL=WeekView.js.map