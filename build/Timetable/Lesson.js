"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lesson = (function () {
    function Lesson() {
        this.room = '';
        this.subject = '';
        this.teacherList = '';
        this.note = '';
    }
    Lesson.prototype.SaveRoom = function (cleanStringArray) {
        this.room = cleanStringArray.join(', ');
    };
    Lesson.prototype.SaveSubject = function (cleanStringArray) {
        this.subject = cleanStringArray.join(' ');
    };
    Lesson.prototype.SaveTeacherList = function (cleanStringArray) {
        this.teacherList = cleanStringArray.join(', ');
    };
    Lesson.prototype.SaveNote = function (cleanStringArray) {
        this.note = cleanStringArray.join(' ');
    };
    Lesson.prototype.toString = function () {
        this.note = this.note.trim().length === 0 ? "" : '`🚨 ' + this.note + '`\n';
        if (this.room + this.note + this.subject === '') {
            return '';
        }
        return "_" + this.room + "_ \n \uD83D\uDCDA " + this.subject + " \n _\uD83D\uDCAB " + this.teacherList + "_ \n " + this.note;
    };
    return Lesson;
}());
exports.default = Lesson;
//# sourceMappingURL=Lesson.js.map