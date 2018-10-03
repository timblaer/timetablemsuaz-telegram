const moment = require('moment');
const resStrs = require('./result-strings.json');

moment.locale('ru');

const formatStr = 'DD MMMM YYYY в hh:mm';

const events = {
    prettyPrint: (events) => events.map(e => `🌟 *${e.title}*\n📅 ${moment(e.date).format(formatStr)}\n📍 ${e.place}\n`).join('\n') || '[Пусто]'
}

const games = {
    prettyPrint: (events) => events.map(e => {
        const gameIcon = resStrs.gamesTypes[e.type];
        return `${gameIcon} *${e.title}*\n📅 ${moment(e.date).format(formatStr)}\n📍 ${e.place}\n`
    }).join('\n')  || '[Пусто]'
}

module.exports = {
    events,
    games
}