import {MessageTypeEnum} from "../Models/MessageTypeEnum";
import Utils from "./utils";

const StaticStrings = require('../static-strings.json');

const Faculties:Set<string> = new Set<string>();
const Groups:Set<string> = new Set<string>();

Object.keys(StaticStrings).forEach(key => {
    if(key.indexOf('faculty') == 0) {
        Faculties.add(StaticStrings[key]);
        return;
    }

    if(key.indexOf('group') == 0) {
        StaticStrings[key].forEach((x:string) => Groups.add(x));
    }
});

export default class MessageRecognizer {
    public static GetType(text:string) {
        if(text.match(Utils.WeekRegex)) {
            return MessageTypeEnum.WeekSelected;
        }

        if(Faculties.has(text)) {
            return MessageTypeEnum.FacultySelected;
        }

        if(Groups.has(text)) {
            return MessageTypeEnum.GroupSelected;
        }

        if(text.indexOf("/") == 0) {
            return  text !== '/start' ? MessageTypeEnum.Command : MessageTypeEnum.Restart;
        }

        switch(text) {
            case StaticStrings["button-allWeeks"]:
                return MessageTypeEnum.AllWeeksRequested;

            case StaticStrings["button-bus"]:
                return MessageTypeEnum.BusesRequested;

            case StaticStrings["button-events"]:
                return MessageTypeEnum.EventsRequested;

            case StaticStrings["button-cancel"]:
                return MessageTypeEnum.Restart;

            case StaticStrings["button-ok"]:
                return MessageTypeEnum.Ok;

            case StaticStrings["button-info"]:
                return MessageTypeEnum.InfoRequested;

            default:
                return MessageTypeEnum.Invalid;
        }

    }
}