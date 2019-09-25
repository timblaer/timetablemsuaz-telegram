import CommandManager from "./Managers/CommandManager";

const dotenv = require('dotenv');
dotenv.config();

import BotManager from "./Managers/BotManager";
import Bot from 'node-telegram-bot-api';
import {MessageTypeEnum} from "./Models/MessageTypeEnum";
import MessageRecognizer from "./Lib/MessageRecognizer";

const TG_TOKEN = process.env.TG_TOKEN;
const TgBot:Bot = new Bot(TG_TOKEN, {polling: true});

const Manager = new BotManager(TgBot);
const Command = new CommandManager(TgBot);

TgBot.on("message", async (message) => {
    const messageType:MessageTypeEnum = MessageRecognizer.GetType(message.text);
    switch(messageType) {
        case MessageTypeEnum.Restart:
            return await Manager.StartingMessage(message);

        case MessageTypeEnum.Invalid:
            return await Manager.InvalidMessage(message);

        case MessageTypeEnum.InfoRequested:
            return await Manager.InfoMessage(message);

        case MessageTypeEnum.BusesRequested:
            return await Manager.BusesMessage(message);

        case MessageTypeEnum.FacultySelected:
            Manager.SyncUserData(MessageTypeEnum.FacultySelected, message);
            return await Manager.SelectGroup(message);

        case MessageTypeEnum.GroupSelected:
            Manager.SyncUserData(MessageTypeEnum.GroupSelected, message);
            return await Manager.SelectLatestWeeks(message);

        case MessageTypeEnum.AllWeeksRequested:
            return await Manager.SelectAllWeeks(message);

        case MessageTypeEnum.WeekSelected:
            Manager.SyncUserData(MessageTypeEnum.GroupSelected, message);
            return await Manager.SendWeekView(message);

        case MessageTypeEnum.Command:
            await Command.Execute(message);
            return await Manager.StartingMessage(message);
    }
});

TgBot.on("error", (error) => {
    console.log(error);
})