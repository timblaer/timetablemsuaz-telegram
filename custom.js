const moment = require('moment');
const resStrs = require('./result-strings.json');

moment.locale('ru');

const formatStr = 'DD MMMM YYYY в hh:mm';

const prettyPrint = (events) => events
                                .map(e => `${resStrs.eventTypes[e.type]} *${e.title}*\n📅 ${moment(e.date).format(formatStr)}\n📍 ${e.place}\n`)
                                .join('\n') || '[Пусто]';

module.exports = {
    prettyPrint
}