export default class WeekListRequest {
    public prof_id:string;
    public course_id:string;
    public inf:string;

    constructor(prof_id:string, course_id:string) {
        this.prof_id = "";
        this.course_id = "";
        this.inf = "0";
    }
}