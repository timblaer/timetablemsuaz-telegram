"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAX_LESSON_COUNT = 5;
var Day = (function () {
    function Day() {
        this.lessons = [];
        this.Empty = true;
    }
    Day.prototype.TrySaveLesson = function (lesson) {
        if (this.lessons.length === MAX_LESSON_COUNT) {
            return false;
        }
        this.lessons.push(lesson);
        this.Empty = false;
        return true;
    };
    Day.prototype.toString = function () {
        var lessonsStrings = [];
        for (var idx in this.lessons) {
            var lesson = this.lessons[idx];
            var str = lesson.toString();
            if (str.length !== 0) {
                lessonsStrings.push(idx + " " + str);
            }
        }
        if (lessonsStrings.length == 0) {
            return "";
        }
        return lessonsStrings.join('\n');
    };
    return Day;
}());
exports.default = Day;
//# sourceMappingURL=Day.js.map