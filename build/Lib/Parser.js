"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./ParserStringExtension");
var cheerio_1 = __importDefault(require("cheerio"));
var Lesson_1 = __importDefault(require("../Timetable/Lesson"));
var WeekView_1 = __importDefault(require("../Timetable/WeekView"));
var WeekInfo_1 = __importDefault(require("../Models/WeekInfo"));
var Parser = (function () {
    function Parser() {
    }
    Parser.LoadString = function (body) {
        var $ = cheerio_1.default.load(body, { decodeEntities: false });
        return $;
    };
    Parser.WeekList = function (body) {
        var $ = Parser.LoadString(body);
        var result = [];
        $('select option').each(function (i, element) {
            result.push(new WeekInfo_1.default($(element).val(), $(element).html()));
        });
        return result;
    };
    Parser.WeekView = function (body) {
        var $ = Parser.LoadString(body.replace("&nbsp;", ""));
        var table = $("td[class=c_top]");
        var table_notes = $('td[class="c_top c_right"]');
        var result = new WeekView_1.default();
        var cur_lesson = new Lesson_1.default();
        table.each(function (i, element) {
            if (result.Empty) {
                return;
            }
            switch (i % 5) {
                case 2:
                    {
                        cur_lesson.SaveRoom(($(element).html() || '').cleanStringArray(' '));
                        if (!cur_lesson.room.length) {
                            result.Empty = true;
                        }
                    }
                    break;
                case 3:
                    {
                        cur_lesson.SaveSubject(($(element).html() || '').cleanStringArray(' '));
                        if (!cur_lesson.subject.length) {
                            result.Empty = true;
                        }
                    }
                    break;
                case 4:
                    {
                        cur_lesson.SaveTeacherList(($(element).html() || '').cleanStringArray(' '));
                        if (!cur_lesson.teacherList.length) {
                            result.Empty = true;
                        }
                        cur_lesson.SaveNote(($(table_notes[Math.floor(i / 5)]).html() || '').cleanStringArray(' '));
                        if (!cur_lesson.note.length) {
                            result.Empty = true;
                        }
                        result.SaveLesson(cur_lesson);
                        cur_lesson = new Lesson_1.default();
                    }
                    break;
            }
        });
        return result;
    };
    return Parser;
}());
exports.default = Parser;
//# sourceMappingURL=Parser.js.map