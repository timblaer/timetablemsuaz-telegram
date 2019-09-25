export default class Utils {
    static Pad2start(num: number): string {
        return (num < 10) ? `0${num}` : `${num}`;
    }

    static CalculateWeek (level:number = 0): string {
        const date = new Date();

        if(level !== 0) {
            const thisDate = date.getDate();
            date.setDate(thisDate + level * 7);
        }

        const thisDay  = date.getDay();
        const thisDate = date.getDate();

        const monday   = new Date(date.setDate(thisDate - thisDay + 1));
        const saturday = new Date(date.setDate(monday.getDate() + 5));

        const monDate  = Utils.Pad2start(monday.getDate());
        const monMonth = Utils.Pad2start(monday.getMonth() + 1);
        const monYear  = monday.getFullYear();

        const satDate  = Utils.Pad2start(saturday.getDate());
        const satMonth = Utils.Pad2start(saturday.getMonth() + 1);
        const satYear  = saturday.getFullYear();

        return `${monDate}.${monMonth}.${monYear} - ${satDate}.${satMonth}.${satYear}`;
    }

    static WeekRegex: RegExp = /^[0-9][0-9].[0-9][0-9].[0-9][0-9][0-9][0-9] - [0-9][0-9].[0-9][0-9].[0-9][0-9][0-9][0-9]$/gi;
}
