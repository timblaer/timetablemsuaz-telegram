import {KeyboardButton} from "node-telegram-bot-api";

export default class Button implements KeyboardButton {
    text: string;

    constructor(text:string|null) {
        if(text == null) {
            this.text = "ERROR";
            return;
        } else {
            this.text = String(text);
        }
    }
}