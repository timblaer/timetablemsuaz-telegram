const Database = require('./database.js');

const $_ = require("./consts.js");
const subsMap = require('./subscriptions.json');
const resStrs = require('./result-strings.json');

async function handle (bot, chatId, msg, defaultKeyboardSettings) {
    const user = await Database.models.Users.findOne({chatId});
    const action = user.subscriptions.indexOf(msg) > -1; //true for unsub, false for sub
    const query = {};

    if(subsMap[msg] === undefined) {
        return false;
    }

    if(action) {
        query["$pullAll"] = {subscriptions: $_[subsMap[msg]]};
    } else {
        query["$push"] = {subscriptions: $_[subsMap[msg]]};
    }

    console.log(query);

    try {
        await Database.models.Users.update({chatId}, query);
        bot.sendMessage(chatId, action ? resStrs.unsub : resStrs.sub, defaultKeyboardSettings);
    } catch (e) {
        bot.sendMessage(chatId, resStrs.error, defaultKeyboardSettings);
    }

    return true;
}

module.exports = { handle };