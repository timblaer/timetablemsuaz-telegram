"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Button_1 = __importDefault(require("./Button"));
var StaticStrings = require('../static-strings.json');
exports.Ok = new Button_1.default(StaticStrings["button-ok"]);
exports.Cancel = new Button_1.default(StaticStrings["button-cancel"]);
exports.FacultyPhilology = new Button_1.default(StaticStrings["faculty-philology"]);
exports.FacultyMaths = new Button_1.default(StaticStrings["faculty-maths"]);
exports.FacultyEconomics = new Button_1.default(StaticStrings["faculty-economics"]);
exports.FacultyManagement = new Button_1.default(StaticStrings["faculty-management"]);
exports.FacultyPsychology = new Button_1.default(StaticStrings["faculty-psychology"]);
exports.FacultyPhysics = new Button_1.default(StaticStrings["faculty-physics"]);
exports.FacultyChemistry = new Button_1.default(StaticStrings["faculty-chemistry"]);
function CreateButtonArray(array) {
    return array.map(function (x) { return new Button_1.default(x); });
}
exports.GroupsPhilology = CreateButtonArray(StaticStrings["groups-philology"]);
exports.GroupsMaths = CreateButtonArray(StaticStrings["groups-maths"]);
exports.GroupsEconomics = CreateButtonArray(StaticStrings["groups-economics"]);
exports.GroupsManagement = CreateButtonArray(StaticStrings["groups-management"]);
exports.GroupsPsychology = CreateButtonArray(StaticStrings["groups-psychology"]);
exports.GroupsPhysics = CreateButtonArray(StaticStrings["groups-physics"]);
exports.GroupsChemistry = CreateButtonArray(StaticStrings["groups-chemistry"]);
exports.Bus = new Button_1.default(StaticStrings["button-bus"]);
exports.Events = new Button_1.default(StaticStrings["button-events"]);
exports.Info = new Button_1.default(StaticStrings["button-info"]);
exports.AllWeeks = new Button_1.default(StaticStrings["button-allWeeks"]);
//# sourceMappingURL=StaticButtons.js.map