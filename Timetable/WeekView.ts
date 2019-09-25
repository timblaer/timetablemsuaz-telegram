import Day from "./Day";
import Lesson from "./Lesson";

export default class WeekView {
    private days:Day[];
    private curDay: Day;

    public Empty: boolean;

    constructor() {
        this.curDay = new Day();
        this.days = [this.curDay];
        this.Empty = false;
    }

    public newDay() {
        if(!this.Empty) {
            this.days.push(new Day());
            this.curDay = this.days[this.days.length-1];
        }
    }

    public SaveLesson(lesson:Lesson) {
        if(!this.Empty) {
            if(!this.curDay.TrySaveLesson(lesson)) {
                this.newDay();
                this.SaveLesson(lesson);
            }
        }
    }

    public toString() {
        if(this.Empty) {
            return 'TableEmptyMessage';
        }

        let dayStrings:string[] = [];
        let freeDaysCount = 0;
        for(let idx in this.days) {
            let day = this.days[idx];
            let str = day.toString();
            if(str.length !== 0) {
                dayStrings.push(`DayInfo ${str}`); //TODO fancy style
            } else {
                dayStrings.push(`DayInfo FREEDAY`);
                freeDaysCount++;
            }
        }

        if(freeDaysCount == 6) {
            return 'TableEmptyMessage';
        }

        return dayStrings.join('\n\n');
    }
}