import {TimetableStages} from "./TimetableStages";
import WeekListRequest from "./Models/WeekListRequest";
import WeekViewRequest from "./Models/WeekViewRequest";

export default class TempUser {
    private _stage: TimetableStages;

    public ProfId:string;
    public CourseId:string;
    public WeekId:string;

    constructor() {
        this._stage = TimetableStages.Start;
        this.ProfId = "";
        this.CourseId = "";
        this.WeekId = "";
    }

    setGroup(req:WeekListRequest) {
        this.ProfId = req.prof_id;
        this.CourseId = req.course_id;
    }

    setWeek(weekId:string) {
        this.WeekId = weekId;
    }

    getGroup():WeekListRequest {
        return new WeekListRequest(this.ProfId, this.CourseId);
    }

    getWeekViewRequest():WeekViewRequest {
        return new WeekViewRequest(this.ProfId, this.CourseId, this.WeekId);
    }

    setStage(newStage: TimetableStages): void {
        this._stage = newStage;
    }

    isStage(stage: TimetableStages): boolean {
        return this._stage === stage;
    }

    atStage(): TimetableStages {
        return this._stage;
    }
}