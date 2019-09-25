export default class WeekInfo {
    public weekId:string;
    public weekTitle:string|null;

    constructor(weekId:string, weekTitle:string|null) {
        this.weekId = weekId;
        this.weekTitle = weekTitle;
    }
}