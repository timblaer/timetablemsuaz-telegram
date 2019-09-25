import TelegramBot from 'node-telegram-bot-api';
import BotManager from "./BotManager";

export default class CommandManager {
    private bot:TelegramBot;

    constructor(bot:TelegramBot) {
        this.bot = bot;
    }

    private RandomMusicUrl():string {
        return "";
    }

    private RandomMemeUrl():string {
        return "";
    }

    private Admin(message: TelegramBot.Message):Promise<TelegramBot.Message>{
        const split = message.text.split(" ");
        const token = split[1];
        const command = split[2];
        if(token == undefined) {
            return this.bot.sendMessage(message.chat.id, "NO PERMISSION");
        }

        switch(command) {
            case "broadcast":
                //broadcasting with await;
                return this.bot.sendMessage(message.chat.id, "Ok");

            case "stats":
                return this.bot.sendMessage(message.chat.id, "Stats");

            default:
                return this.bot.sendMessage(message.chat.id, "Unknown command");
        }
    }

    async Execute(message:TelegramBot.Message):Promise<TelegramBot.Message> {
        let responseString = "";
        return this.bot.sendMessage(message.chat.id, responseString);
    }
}