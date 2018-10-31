const Database = require('./database.js');

const $_ = require("./consts.js");
const subsMap = require('./subscriptions.json');
const resStrs = require('./result-strings.json');

const isArray = require('lodash/isArray');
const isEmpty = require('lodash/isEmpty');

async function handle (bot, chatId, msg, defaultKeyboardSettings) {
    const user = await Database.models.Users.findOne({chatId});
    const types = $_[subsMap[msg]];

    let action;
  
    if(user === null) return false;

    if(isArray(types)) {
        action = !isEmpty(types.filter(t => user.subscriptions.indexOf(t) > -1));
    } else {
        action = user.subscriptions.indexOf(types) > -1;
    }
    //true for unsub, false for sub

    const query = {};

    if(subsMap[msg] === undefined) {
        return false;
    }

    if(action) {
        query["$pullAll"] = {subscriptions: isArray(types) ? $_[subsMap[msg]] : [$_[subsMap[msg]]]};
    } else {
        query["$push"] = {subscriptions: $_[subsMap[msg]]};
    }

    try {
        await Database.models.Users.updateOne({chatId}, query);
        bot.sendMessage(chatId, action ? resStrs.unsub : resStrs.sub, defaultKeyboardSettings);
    } catch (e) {
        console.log(e);
        bot.sendMessage(chatId, resStrs.error, defaultKeyboardSettings);
    }

    return true;
}

module.exports = { handle };