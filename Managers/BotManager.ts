import TelegramBot from 'node-telegram-bot-api';
import TempUser from '../TempUser';
import {ReplyKeyboard} from "../UI/ReplyKeyboard";
import * as StaticKeyboards from "../UI/StaticKeyboards";
import * as DynamicKeyboards from "../UI/DynamicKeyboards";
import Client from "../Client";
import {MessageTypeEnum} from "../Models/MessageTypeEnum";
import {TimetableStages} from "../TimetableStages";
import WeekListRequest from "../Models/WeekListRequest";
import WeekInfo from "../Models/WeekInfo";

const StaticStrings = require('../static-strings.json');
const GroupData = require('../group-data.json');

export default class BotManager {
    private _bot: TelegramBot;
    private _users: Map<number, TempUser>;
    private _client: Client;
    private _weeklistCache:Array<WeekInfo>;

    constructor(bot: TelegramBot) {
        this._bot = bot;
        this._client = new Client();

        this._users = new Map<number, TempUser>();

        this._weeklistCache = [];
    }

    async StartingMessage(message: TelegramBot.Message):Promise<TelegramBot.Message> {
        return this._bot.sendMessage(
            message.chat.id,
            StaticStrings["message-starting"],
            {
            reply_markup: StaticKeyboards.Starting
            });
    }

    async InfoMessage(message: TelegramBot.Message):Promise<TelegramBot.Message> {
        return this._bot.sendMessage(
            message.chat.id,
            StaticStrings["message-info"],
            {
                parse_mode: "Markdown",
                reply_markup: StaticKeyboards.Starting
            }
        )
    }

    async InvalidMessage(message: TelegramBot.Message):Promise<TelegramBot.Message> {
        await this._bot.sendMessage(message.chat.id, StaticStrings["message-invalid"]);
        return this.StartingMessage(message);
    }

    async BusesMessage(message: TelegramBot.Message):Promise<TelegramBot.Message> {
        await this._bot.sendMessage(message.chat.id, StaticStrings["message-buses"]);
        return this.StartingMessage(message);
    }

    async SelectGroup(message: TelegramBot.Message):Promise<TelegramBot.Message> {
        var keyboard:ReplyKeyboard;
        switch (message.text) {
            case StaticStrings["faculty-philology"]:
                keyboard = StaticKeyboards.Philology;
                break;
            case StaticStrings["faculty-maths"]:
                keyboard = StaticKeyboards.Maths;
                break;
            case StaticStrings["faculty-economics"]:
                keyboard = StaticKeyboards.Economics;
                break;
            case StaticStrings["faculty-management"]:
                keyboard = StaticKeyboards.Management;
                break;
            case StaticStrings["faculty-chemistry"]:
                keyboard = StaticKeyboards.Chemistry;
                break;
            case StaticStrings["faculty-physics"]:
                keyboard = StaticKeyboards.Physics;
                break;
            case StaticStrings["faculty-psychology"]:
                keyboard = StaticKeyboards.Psychology;
                break;
            default:
                return this.StartingMessage(message);
        }

        return this._bot.sendMessage(
            message.chat.id,
            StaticStrings["message-groupSelection"],
            {
                reply_markup: keyboard
            }
        )
    }

    async SelectLatestWeeks(message: TelegramBot.Message):Promise<TelegramBot.Message> {
        return this._bot.sendMessage(message.chat.id, StaticStrings["message-weekSelection"], {
            reply_markup: DynamicKeyboards.LatestWeeks()
        });
    }

    async SelectAllWeeks(message: TelegramBot.Message):Promise<TelegramBot.Message> {
        let user:TempUser = this._users.get(message.chat.id); //TODO to middleware? aka safe select
        if(user === undefined) {
            return this.StartingMessage(message);
        }

        this._weeklistCache = await this._client.WeekList(user.getGroup());

        return this._bot.sendMessage(message.chat.id, StaticStrings["message-weekSelection"], {
            reply_markup: await DynamicKeyboards.AllWeeks(this._weeklistCache)
        });
    }

    async SendWeekView(message: TelegramBot.Message):Promise<TelegramBot.Message> {
        await this._bot.sendMessage(
            message.chat.id,
            await this._client.WeekView(this._users.get(message.chat.id).getWeekViewRequest()),
        );

        return this.StartingMessage(message);
    }

    async SyncUserData(messageType:MessageTypeEnum, message:TelegramBot.Message) {
        const user = this._users.get(message.chat.id);
        if(user !== undefined) {
            switch(messageType) {
                case MessageTypeEnum.FacultySelected:
                    user.setStage(TimetableStages.FacultySelected);
                    break;

                case MessageTypeEnum.GroupSelected:
                    user.setGroup(GroupData[message.text]);
                    user.setStage(TimetableStages.GroupSelected);
                    break;

                case MessageTypeEnum.WeekSelected:
                    const [week] = this._weeklistCache.filter((x:WeekInfo) => x.weekTitle == message.text);
                    user.setWeek(week.weekId);
                    break;
                default:
                    throw "INVALID MESSAGE TYPE";
            }
            return;
        }

        this._users.set(message.chat.id, new TempUser());
    }

}

module.exports = BotManager;