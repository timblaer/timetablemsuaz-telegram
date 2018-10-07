const Database = require('./database.js');

const moment = require('moment');
const resStrs = require('./result-strings.json');

moment.locale('ru');

const formatStr = 'DD MMMM YYYY в hh:mm';
const fdate = (date) => moment(date).format(formatStr);

const prettyPrint = (events) => events
                                .map(e => `${resStrs.eventTypes[e.type]} *${e.title}*\n📅 ${fdate(e.date)}\n📍 ${e.place}\n`)
                                .join('\n') || '[Пусто]';

const getComplex = (types) => Database.models.Events.find({types: {$in: types}}).limit(10).sort({date: 1});
const getSimple = () => Database.models.Events.find({type}).limit(10).sort({date: 1})
module.exports = {
    prettyPrint, getComplex, getSimple
}