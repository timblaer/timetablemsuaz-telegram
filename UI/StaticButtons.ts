import Button from "./Button";

const StaticStrings = require('../static-strings.json');

export var Ok = new Button(StaticStrings["button-ok"]);
export var Cancel = new Button(StaticStrings["button-cancel"]);

export var FacultyPhilology = new Button(StaticStrings["faculty-philology"]);
export var FacultyMaths = new Button(StaticStrings["faculty-maths"]);
export var FacultyEconomics = new Button(StaticStrings["faculty-economics"]);
export var FacultyManagement = new Button(StaticStrings["faculty-management"]);
export var FacultyPsychology = new Button(StaticStrings["faculty-psychology"]);
export var FacultyPhysics = new Button(StaticStrings["faculty-physics"]);
export var FacultyChemistry = new Button(StaticStrings["faculty-chemistry"]);

function CreateButtonArray(array:Array<string>):Array<Button> {
    return array.map((x:string) => new Button(x));
}

export var GroupsPhilology = CreateButtonArray(StaticStrings["groups-philology"]);
export var GroupsMaths = CreateButtonArray(StaticStrings["groups-maths"]);
export var GroupsEconomics = CreateButtonArray(StaticStrings["groups-economics"]);
export var GroupsManagement = CreateButtonArray(StaticStrings["groups-management"]);
export var GroupsPsychology = CreateButtonArray(StaticStrings["groups-psychology"]);
export var GroupsPhysics = CreateButtonArray(StaticStrings["groups-physics"]);
export var GroupsChemistry = CreateButtonArray(StaticStrings["groups-chemistry"]);

export var Bus = new Button(StaticStrings["button-bus"]);
export var Events = new Button(StaticStrings["button-events"]);
export var Info = new Button(StaticStrings["button-info"]);

export var AllWeeks = new Button(StaticStrings["button-allWeeks"]);