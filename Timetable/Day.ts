import Lesson from "./Lesson";

const MAX_LESSON_COUNT = 5;

export default class Day {
    private lessons:Lesson[];
    public Empty:boolean;

    constructor() {
        this.lessons = [];
        this.Empty = true;
    }

    public TrySaveLesson(lesson:Lesson):boolean {
        if(this.lessons.length === MAX_LESSON_COUNT) {
            return false;
        }
        this.lessons.push(lesson);
        this.Empty = false;
        return true;
    }

    public toString() {
        let lessonsStrings:string[] = [];
        for(let idx in this.lessons) {
            let lesson = this.lessons[idx];
            let str = lesson.toString();
            if(str.length !== 0) {
                lessonsStrings.push(`${idx} ${str}`); //TODO fancy style
            }
        }
        if(lessonsStrings.length == 0) {
            return "";
        }
        return lessonsStrings.join('\n');
    }
}