import TelegramBot = require("node-telegram-bot-api");
import {KeyboardButton, ReplyKeyboardMarkup} from "node-telegram-bot-api";

export class ReplyKeyboard implements ReplyKeyboardMarkup {
    keyboard: KeyboardButton[][];
    one_time_keyboard: boolean;

    constructor(keyboard: Array<Array<KeyboardButton>>, oneTime:boolean = false) {
        this.keyboard = keyboard;
        this.one_time_keyboard = oneTime;
    }
}