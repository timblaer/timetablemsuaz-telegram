const pad2start = (num) => num < 10 ? `0${num}` : num;

const calculateWeek = (level = 0) => {
    //level = 0 for current

    const date = new Date();

    if(level !== 0) {
        const thisDate = date.getDate();
        date.setDate(thisDate + level * 7);
    }

    const thisDay  = date.getDay();
    const thisDate = date.getDate();

    const monday   = new Date(date.setDate(thisDate - thisDay + 1));
    const saturday = new Date(date.setDate(monday.getDate() + 5));

    const monDate  = pad2start(monday.getDate());
    const monMonth = pad2start(monday.getMonth() + 1);
    const monYear  = monday.getFullYear();

    const satDate  = pad2start(saturday.getDate());
    const satMonth = pad2start(saturday.getMonth() + 1);
    const satYear  = saturday.getFullYear();


    return `${monDate}.${monMonth}.${monYear} - ${satDate}.${satMonth}.${satYear}`;
}

const weekRegex = /^[0-9][0-9].[0-9][0-9].[0-9][0-9][0-9][0-9] - [0-9][0-9].[0-9][0-9].[0-9][0-9][0-9][0-9]$/gi;

module.exports = {
    calculateWeek,
    weekRegex
}

console.log(calculateWeek(1));