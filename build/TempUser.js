"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TimetableStages_1 = require("./TimetableStages");
var WeekListRequest_1 = __importDefault(require("./Models/WeekListRequest"));
var WeekViewRequest_1 = __importDefault(require("./Models/WeekViewRequest"));
var TempUser = (function () {
    function TempUser() {
        this._stage = TimetableStages_1.TimetableStages.Start;
        this.ProfId = "";
        this.CourseId = "";
        this.WeekId = "";
    }
    TempUser.prototype.setGroup = function (req) {
        this.ProfId = req.prof_id;
        this.CourseId = req.course_id;
    };
    TempUser.prototype.setWeek = function (weekId) {
        this.WeekId = weekId;
    };
    TempUser.prototype.getGroup = function () {
        return new WeekListRequest_1.default(this.ProfId, this.CourseId);
    };
    TempUser.prototype.getWeekViewRequest = function () {
        return new WeekViewRequest_1.default(this.ProfId, this.CourseId, this.WeekId);
    };
    TempUser.prototype.setStage = function (newStage) {
        this._stage = newStage;
    };
    TempUser.prototype.isStage = function (stage) {
        return this._stage === stage;
    };
    TempUser.prototype.atStage = function () {
        return this._stage;
    };
    return TempUser;
}());
exports.default = TempUser;
//# sourceMappingURL=TempUser.js.map