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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var StaticKeyboards = __importStar(require("./UI/StaticKeyboards"));
var DynamicKeyboards = __importStar(require("./UI/DynamicKeyboards"));
var Client_1 = __importDefault(require("./Client"));
var StaticStrings = require('./static-strings.json');
var BotManager = (function () {
    function BotManager(bot) {
        this._bot = bot;
        this._client = new Client_1.default();
        this._users = new Map();
    }
    BotManager.prototype.StartingMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._bot.sendMessage(message.chat.id, StaticStrings["message-starting"], {
                        reply_markup: StaticKeyboards.Starting
                    })];
            });
        });
    };
    BotManager.prototype.InfoMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._bot.sendMessage(message.chat.id, StaticStrings["message-info"], {
                        parse_mode: "Markdown",
                        reply_markup: StaticKeyboards.Starting
                    })];
            });
        });
    };
    BotManager.prototype.InvalidMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._bot.sendMessage(message.chat.id, StaticStrings["message-invalid"])];
                    case 1:
                        _a.sent();
                        return [2, this.StartingMessage(message)];
                }
            });
        });
    };
    BotManager.prototype.BusesMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._bot.sendMessage(message.chat.id, StaticStrings.message)];
                    case 1:
                        _a.sent();
                        return [2, this.StartingMessage(message)];
                }
            });
        });
    };
    BotManager.prototype.SelectGroup = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var keyboard;
            return __generator(this, function (_a) {
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
                    default:
                        return [2, this.StartingMessage(message)];
                }
                return [2, this._bot.sendMessage(message.chat.id, StaticStrings["message-groupSelection"], {
                        reply_markup: keyboard
                    })];
            });
        });
    };
    BotManager.prototype.SelectLatestWeeks = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._bot.sendMessage(message.chat.id, StaticStrings["message-weekSelection"], {
                        reply_markup: DynamicKeyboards.LatestWeeks()
                    })];
            });
        });
    };
    BotManager.prototype.SelectAllWeeks = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        user = this._users.get(message.chat.id);
                        if (user === undefined) {
                            return [2, this.StartingMessage(message)];
                        }
                        _b = (_a = this._bot).sendMessage;
                        _c = [message.chat.id, StaticStrings["message-weekSelection"]];
                        _d = {};
                        return [4, DynamicKeyboards.AllWeeks(user.getGroup(), this._client)];
                    case 1: return [2, _b.apply(_a, _c.concat([(_d.reply_markup = _e.sent(),
                                _d)]))];
                }
            });
        });
    };
    return BotManager;
}());
exports.default = BotManager;
module.exports = BotManager;
//# sourceMappingURL=BotManager.js.map