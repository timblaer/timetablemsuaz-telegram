export default class WeekViewRequest {
    public profid:string;
    public courseid:string;
    public weekid:string;
    public inf:string;

    constructor(prof_id:string, course_id:string, week_id:string) {
        this.profid = "";
        this.courseid = "";
        this.weekid = "";
        this.inf = "0";
    }
}