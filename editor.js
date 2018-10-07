const Database = require('./database.js');
const Custom = require('./custom.js');

const isEmpty = require('lodash/isEmpty');

const EDITOR_TOKENS = process.env.EDITOR_TOKENS.split(",");
const resStrs = require('./result-strings.json');

const clean = (str) => str.replace("[", "").replace("]", "");

async function handle(bot, chatId, msg, defaultKeyboardSettings) {
    if(isEmpty(EDITOR_TOKENS)) {
        return false;
    }

    const splitted = msg.split(" ");

    if(splitted[0] !== "/editor") {
        return false;
    }

    const token = splitted[1];

    if(EDITOR_TOKENS.indexOf(token) === -1) {
        await Database.models.Infos.create({info: `ChatId: ${chatId} tried to gain access to editor features`, type: "editor"});
        return false;
    }

    const command = splitted.slice(2).join(" ");
    const data = command.match(/\[(.*?)\]/gi);

    if(data === null) {
        bot.sendMessage(chatId, resStrs.invalidEvent);
        return false;
    }

    const type = clean(data[0]);
    const title = clean(data[1]);

    const dateTimeRaw = clean(data[2]).split(" ");
    const dateRaw = dateTimeRaw[0].split(".");
    const date = new Date(`${dateRaw[2]}.${dateRaw[1]}.${dateRaw[0]} ${dateTimeRaw[1]}`);

    const place = clean(data[3]);

    if(isNaN(+date)) {
        bot.sendMessage(chatId, resStrs.invalidEvent + " (Дата)");
        return false;
    }
    
    if([type, title, dateTimeRaw, place].some(isEmpty)) {
        bot.sendMessage(chatId, resStrs.invalidEvent);
        return false;
    }

    const event = {
        title,
        date,
        addedBy: token,
        place, 
        type
    };

    try {
        await Database.models.Events.create(event);
    } catch(e) {
        bot.sendMessage(chatId, resStrs.invalidEvent);
        return false;
    }

    const subscribers = await Database.models.Users.find({subscriptions: type});
    subscribers.forEach(s => bot.sendMessage(s.chatId, Custom.prettyPrint([event]), defaultKeyboardSettings));

    return true;
}

module.exports = { handle };