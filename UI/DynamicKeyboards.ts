import {ReplyKeyboard} from "./ReplyKeyboard";
import Button from "./Button";
import Utils from "../Lib/utils";
import * as StaticButtons from "./StaticButtons";
import Client from "../Client";
import WeekListRequest from "../Models/WeekListRequest";
import WeekInfo from "../Models/WeekInfo";

export function LatestWeeks(): ReplyKeyboard {
    return new ReplyKeyboard([
        [new Button(Utils.CalculateWeek(0))],
        [new Button(Utils.CalculateWeek(1))],
        [StaticButtons.AllWeeks, StaticButtons.Cancel]
    ]);
}

export async function AllWeeks(weekList:Array<WeekInfo>): Promise<ReplyKeyboard> {
    const weekListButtons:Array<Button> = weekList.map(x => new Button(x.weekTitle));

    return new ReplyKeyboard([
        ...weekListButtons.map(w => [w]),
        [StaticButtons.Cancel]
    ]);
}