const Database = require('./database.js');
const {Users, Groups} = Database.models;

const {ADMIN_TOKEN} = process.env;
const {badMessage, adminGreeting} = require('./result-strings.json');


const GET_STATS = "stats";
const BROADCAST = "broadcast";

async function handle(bot, chatId, msg) {
    const splitted = msg.split(" ");

    if(splitted[0] !== "/admin") {
        return false;
    }

    const token = splitted[1];

    if(token !== ADMIN_TOKEN) {
        await Database.models.Infos.create({info: `ChatId: ${chatId} tried to gain access to admin features`});
        return false;
    }

    bot.sendMessage(chatId, adminGreeting);

    const command = splitted[2];
    const arg = splitted.slice(3).join(" ");

    if(command === GET_STATS) {
        const stats = await Database.stats.get(arg);
        bot.sendMessage(chatId, stats, {
            parse_mode: "Markdown"
        });
        return true;
    }

    if(command === BROADCAST) {
        const users = await Users.find({});
        users.forEach(doc => bot.sendMessage(doc.chatId, arg, {
            parse_mode: "Markdown"
        }));
        return true;
    }

    return false;
}

module.exports = {handle};