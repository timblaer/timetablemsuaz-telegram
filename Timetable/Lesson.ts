export default class Lesson {
    public room:string;
    public subject:string;
    public teacherList:string;
    public note:string;

    constructor() {
        this.room = '';
        this.subject = '';
        this.teacherList = '';
        this.note = '';
    }

    public SaveRoom(cleanStringArray: string[]) {
        this.room = cleanStringArray.join(', ');
    }

    public SaveSubject(cleanStringArray: string[]) {
        this.subject = cleanStringArray.join(' ');
    }

    public SaveTeacherList(cleanStringArray: string[]) {
        this.teacherList = cleanStringArray.join(', ');
    }

    public SaveNote(cleanStringArray: string[]) {
        this.note = cleanStringArray.join(' ');
    }

    public toString() {
        this.note = this.note.trim().length === 0 ? "" : '`🚨 ' + this.note + '`\n';

        if (this.room + this.note + this.subject === '') {
            return '';
        }

        return `_${this.room}_ \n 📚 ${this.subject} \n _💫 ${this.teacherList}_ \n ${this.note}`;
    }

}