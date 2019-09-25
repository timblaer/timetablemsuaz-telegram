"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MessageTypeEnum_1 = require("../Models/MessageTypeEnum");
var utils_1 = __importDefault(require("./utils"));
var StaticStrings = require('../static-strings.json');
var Faculties = new Set();
var Groups = new Set();
Object.keys(StaticStrings).forEach(function (key) {
    if (key.indexOf('faculty') == 0) {
        Faculties.add(StaticStrings[key]);
        return;
    }
    if (key.indexOf('group') == 0) {
        StaticStrings[key].forEach(function (x) { return Groups.add(x); });
    }
});
var MessageRecognizer = (function () {
    function MessageRecognizer() {
    }
    MessageRecognizer.GetType = function (text) {
        if (text.match(utils_1.default.WeekRegex)) {
            return MessageTypeEnum_1.MessageTypeEnum.WeekSelected;
        }
        if (Faculties.has(text)) {
            return MessageTypeEnum_1.MessageTypeEnum.FacultySelected;
        }
        if (Groups.has(text)) {
            return MessageTypeEnum_1.MessageTypeEnum.GroupSelected;
        }
        if (text.indexOf("/") == 0) {
            return text !== '/start' ? MessageTypeEnum_1.MessageTypeEnum.Command : MessageTypeEnum_1.MessageTypeEnum.Restart;
        }
        switch (text) {
            case StaticStrings["button-allWeeks"]:
                return MessageTypeEnum_1.MessageTypeEnum.AllWeeksRequested;
            case StaticStrings["button-bus"]:
                return MessageTypeEnum_1.MessageTypeEnum.BusesRequested;
            case StaticStrings["button-events"]:
                return MessageTypeEnum_1.MessageTypeEnum.EventsRequested;
            case StaticStrings["button-cancel"]:
                return MessageTypeEnum_1.MessageTypeEnum.Restart;
            case StaticStrings["button-ok"]:
                return MessageTypeEnum_1.MessageTypeEnum.Ok;
            case StaticStrings["button-info"]:
                return MessageTypeEnum_1.MessageTypeEnum.InfoRequested;
            default:
                return MessageTypeEnum_1.MessageTypeEnum.Invalid;
        }
    };
    return MessageRecognizer;
}());
exports.default = MessageRecognizer;
//# sourceMappingURL=MessageRecognizer.js.map