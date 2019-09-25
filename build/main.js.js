"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandManager_1 = __importDefault(require("./Managers/CommandManager"));
var dotenv = require('dotenv');
dotenv.config();
var BotManager_1 = __importDefault(require("./Managers/BotManager"));
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var MessageTypeEnum_1 = require("./Models/MessageTypeEnum");
var MessageRecognizer_1 = __importDefault(require("./Lib/MessageRecognizer"));
var TG_TOKEN = process.env.TG_TOKEN;
var TgBot = new node_telegram_bot_api_1.default(TG_TOKEN, { polling: true });
var Manager = new BotManager_1.default(TgBot);
var Command = new CommandManager_1.default(TgBot);
TgBot.on("message", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var messageType, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                messageType = MessageRecognizer_1.default.GetType(message.text);
                _a = messageType;
                switch (_a) {
                    case MessageTypeEnum_1.MessageTypeEnum.Restart: return [3, 1];
                    case MessageTypeEnum_1.MessageTypeEnum.Invalid: return [3, 3];
                    case MessageTypeEnum_1.MessageTypeEnum.InfoRequested: return [3, 5];
                    case MessageTypeEnum_1.MessageTypeEnum.BusesRequested: return [3, 7];
                    case MessageTypeEnum_1.MessageTypeEnum.FacultySelected: return [3, 9];
                    case MessageTypeEnum_1.MessageTypeEnum.GroupSelected: return [3, 11];
                    case MessageTypeEnum_1.MessageTypeEnum.AllWeeksRequested: return [3, 13];
                    case MessageTypeEnum_1.MessageTypeEnum.WeekSelected: return [3, 15];
                    case MessageTypeEnum_1.MessageTypeEnum.Command: return [3, 17];
                }
                return [3, 20];
            case 1: return [4, Manager.StartingMessage(message)];
            case 2: return [2, _b.sent()];
            case 3: return [4, Manager.InvalidMessage(message)];
            case 4: return [2, _b.sent()];
            case 5: return [4, Manager.InfoMessage(message)];
            case 6: return [2, _b.sent()];
            case 7: return [4, Manager.BusesMessage(message)];
            case 8: return [2, _b.sent()];
            case 9:
                Manager.SyncUserData(MessageTypeEnum_1.MessageTypeEnum.FacultySelected, message);
                return [4, Manager.SelectGroup(message)];
            case 10: return [2, _b.sent()];
            case 11:
                Manager.SyncUserData(MessageTypeEnum_1.MessageTypeEnum.GroupSelected, message);
                return [4, Manager.SelectLatestWeeks(message)];
            case 12: return [2, _b.sent()];
            case 13: return [4, Manager.SelectAllWeeks(message)];
            case 14: return [2, _b.sent()];
            case 15:
                Manager.SyncUserData(MessageTypeEnum_1.MessageTypeEnum.GroupSelected, message);
                return [4, Manager.SendWeekView(message)];
            case 16: return [2, _b.sent()];
            case 17: return [4, Command.Execute(message)];
            case 18:
                _b.sent();
                return [4, Manager.StartingMessage(message)];
            case 19: return [2, _b.sent()];
            case 20: return [2];
        }
    });
}); });
TgBot.on("error", function (error) {
    console.log(error);
});
//# sourceMappingURL=main.js.js.map