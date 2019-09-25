import {ReplyKeyboard} from "./ReplyKeyboard";
import * as Buttons from "./StaticButtons"
import Button from "./Button";

export var Starting:ReplyKeyboard = new ReplyKeyboard([
    [Buttons.FacultyPhilology, Buttons.FacultyMaths, Buttons.FacultyEconomics],
    [Buttons.FacultyManagement, Buttons.FacultyChemistry, Buttons.FacultyPhysics],
    [Buttons.FacultyPsychology],
    [Buttons.Bus, Buttons.Info]
]);

const G1:Array<Button> = Buttons.GroupsPhilology;

export var Philology:ReplyKeyboard = new ReplyKeyboard([
    [G1[0], G1[1], G1[2], G1[3]],
    [G1[4], G1[5], G1[6], G1[7]],
    [G1[8], G1[9], G1[10], G1[11]],
    [G1[12], G1[13], G1[14], G1[15]],
    [G1[16], G1[17]],
    [Buttons.Cancel]
], true);

const G2 = Buttons.GroupsMaths;
export var Maths:ReplyKeyboard = new ReplyKeyboard([
    [G2[0], G2[1], G2[2], G2[3]],
    [G2[4], G2[5]],
    [Buttons.Cancel]
], true);

const G3 = Buttons.GroupsEconomics;
export var Economics:ReplyKeyboard = new ReplyKeyboard([
    [G3[0], G3[1]],
    [G3[2], G3[3]],
    [Buttons.Cancel]
], true);

const G4 = Buttons.GroupsManagement;
export var Management:ReplyKeyboard = new ReplyKeyboard([
    [G4[0], G4[1], G4[2], G4[3]],
    [G4[4], G4[5]],
    [Buttons.Cancel]
], true);

const G5 = Buttons.GroupsChemistry;
export var Chemistry:ReplyKeyboard = new ReplyKeyboard([
    [G5[0], G5[1], G5[2], G5[3]],
    [G5[4], G5[5], G5[6], G5[7]],
    [G5[8], G5[9], G5[10], G5[11]],
    [Buttons.Cancel]
], true);

const G6 = Buttons.GroupsPhysics;
export var Physics:ReplyKeyboard = new ReplyKeyboard([
    [G6[0], G6[1]],
    [G6[2], G6[3]],
    [Buttons.Cancel]
], true);

const G7 = Buttons.GroupsPsychology;
export var Psychology:ReplyKeyboard = new ReplyKeyboard([
    [G7[0], G7[1], G7[2], G7[3]],
    [G7[4], G7[5]],
    [Buttons.Cancel]
], true);