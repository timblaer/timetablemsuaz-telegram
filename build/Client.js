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
var Parser_1 = __importDefault(require("./Lib/Parser"));
var WeekListRequest_1 = __importDefault(require("./Models/WeekListRequest"));
var isEmpty = require('lodash/isEmpty');
var qs = require('querystring');
var go = require('./requests/go.js');
var USERNAME = process.env.USERNAME;
var PASSWORD = process.env.PASSWORD;
var URI = process.env.URI;
var Client = (function () {
    function Client() {
        this.uri = URI;
        this.cookie = "";
    }
    Client.prototype.ensureCreds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var form_str, step_1, setCookie, cookie, location, step_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        form_str = qs.stringify({ USERNAME: USERNAME, PASSWORD: PASSWORD, Submit: "Войти" });
                        return [4, go('post', this.uri + "/index.php", '', form_str, { redirect: 'manual' })];
                    case 1:
                        step_1 = _a.sent();
                        setCookie = step_1.headers.get('set-cookie');
                        cookie = setCookie.slice(0, setCookie.indexOf(";") + 1);
                        console.log("Status", step_1.status);
                        location = step_1.headers.get("location");
                        console.log("Headers", step_1.headers);
                        if (isEmpty(location)) {
                            throw "InvalidCreds";
                        }
                        return [4, go('get', this.uri + "/" + location, cookie)];
                    case 2:
                        step_2 = _a.sent();
                        this.cookie = cookie;
                        return [2];
                }
            });
        });
    };
    Client.prototype.weekListLastStep = function (reqData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, go('post', this.uri + "/process.php", this.cookie, qs.stringify(reqData))];
            });
        });
    };
    Client.prototype.WeekList = function (groupData) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, step_1_1, body_1, step_1, step_2_url, step_6, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.ensureCreds()];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("ERROR", e_1);
                        return [3, 3];
                    case 3:
                        if (!this.cookie) return [3, 6];
                        return [4, this.weekListLastStep(groupData)];
                    case 4:
                        step_1_1 = _a.sent();
                        return [4, step_1_1.text()];
                    case 5:
                        body_1 = _a.sent();
                        return [2, Parser_1.default.WeekList(body_1)];
                    case 6: return [4, go('post', this.uri + "/pages.php", this.cookie, qs.stringify({ pagenum: 'tdeduGraph_common' }))];
                    case 7:
                        step_1 = _a.sent();
                        return [4, step_1.text()];
                    case 8:
                        step_2_url = _a.sent();
                        return [4, go('get', this.uri + "/" + step_2_url, this.cookie)];
                    case 9:
                        _a.sent();
                        return [4, go('post', this.uri + "/process.php", this.cookie, qs.stringify(new WeekListRequest_1.default("0", "0")))];
                    case 10:
                        _a.sent();
                        return [4, go('post', this + "/process.php", this.cookie, qs.stringify(new WeekListRequest_1.default(groupData.prof_id, "0")))];
                    case 11:
                        _a.sent();
                        return [4, go('post', this.uri + "/process.php", this.cookie, qs.stringify(new WeekListRequest_1.default(groupData.prof_id, "0")))];
                    case 12:
                        _a.sent();
                        return [4, go('post', this.uri + "/process.php", this.cookie, qs.stringify(new WeekListRequest_1.default(groupData.prof_id, "0")))];
                    case 13:
                        _a.sent();
                        return [4, this.weekListLastStep(groupData)];
                    case 14:
                        step_6 = _a.sent();
                        return [4, step_6.text()];
                    case 15:
                        body = _a.sent();
                        return [2, Parser_1.default.WeekList(body)];
                }
            });
        });
    };
    Client.prototype.WeekView = function (groupData) {
        return __awaiter(this, void 0, void 0, function () {
            var step_1, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.WeekList(new WeekListRequest_1.default(groupData.profid, groupData.courseid))];
                    case 1:
                        _a.sent();
                        return [4, go('post', this.uri + "/process.php", this.cookie, qs.stringify(groupData))];
                    case 2:
                        step_1 = _a.sent();
                        return [4, step_1.text()];
                    case 3:
                        body = _a.sent();
                        return [2, Parser_1.default.WeekView(body).toString()];
                }
            });
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=Client.js.map