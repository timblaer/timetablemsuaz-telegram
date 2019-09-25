"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReplyKeyboard_1 = require("./ReplyKeyboard");
var Buttons = __importStar(require("./StaticButtons"));
exports.Starting = new ReplyKeyboard_1.ReplyKeyboard([
    [Buttons.FacultyPhilology, Buttons.FacultyMaths, Buttons.FacultyEconomics],
    [Buttons.FacultyManagement, Buttons.FacultyChemistry, Buttons.FacultyPhysics],
    [Buttons.FacultyPsychology],
    [Buttons.Bus, Buttons.Info]
]);
var G1 = Buttons.GroupsPhilology;
exports.Philology = new ReplyKeyboard_1.ReplyKeyboard([
    [G1[0], G1[1], G1[2], G1[3]],
    [G1[4], G1[5], G1[6], G1[7]],
    [G1[8], G1[9], G1[10], G1[11]],
    [G1[12], G1[13], G1[14], G1[15]],
    [G1[16], G1[17]],
    [Buttons.Cancel]
], true);
var G2 = Buttons.GroupsMaths;
exports.Maths = new ReplyKeyboard_1.ReplyKeyboard([
    [G2[0], G2[1], G2[2], G2[3]],
    [G2[4], G2[5]],
    [Buttons.Cancel]
], true);
var G3 = Buttons.GroupsEconomics;
exports.Economics = new ReplyKeyboard_1.ReplyKeyboard([
    [G3[0], G3[1]],
    [G3[2], G3[3]],
    [Buttons.Cancel]
], true);
var G4 = Buttons.GroupsManagement;
exports.Management = new ReplyKeyboard_1.ReplyKeyboard([
    [G4[0], G4[1], G4[2], G4[3]],
    [G4[4], G4[5]],
    [Buttons.Cancel]
], true);
var G5 = Buttons.GroupsChemistry;
exports.Chemistry = new ReplyKeyboard_1.ReplyKeyboard([
    [G5[0], G5[1], G5[2], G5[3]],
    [G5[4], G5[5], G5[6], G5[7]],
    [G5[8], G5[9], G5[10], G5[11]],
    [Buttons.Cancel]
], true);
var G6 = Buttons.GroupsPhysics;
exports.Physics = new ReplyKeyboard_1.ReplyKeyboard([
    [G6[0], G6[1]],
    [G6[2], G6[3]],
    [Buttons.Cancel]
], true);
var G7 = Buttons.GroupsPsychology;
exports.Psychology = new ReplyKeyboard_1.ReplyKeyboard([
    [G7[0], G7[1], G7[2], G7[3]],
    [G7[4], G7[5]],
    [Buttons.Cancel]
], true);
//# sourceMappingURL=StaticKeyboards.js.map