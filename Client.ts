import Parser from "./Lib/Parser";
import WeekInfo from "./Models/WeekInfo";
import WeekListRequest from "./Models/WeekListRequest";
import WeekViewRequest from "./Models/WeekViewRequest";

const isEmpty = require('lodash/isEmpty');
const qs = require('querystring');
const go = require('./requests/go.js');

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const URI = process.env.URI;

export default class Client {

    private readonly uri:string;
    private cookie:string;

    constructor() {
        this.uri = URI;
        this.cookie = "";
    }

    private async ensureCreds() {
        const form_str = qs.stringify({USERNAME, PASSWORD, Submit:"Войти"});
        const step_1 = await go('post', `${this.uri}/index.php`, '', form_str, {redirect: 'manual'});
        const setCookie = step_1.headers.get('set-cookie');
        const cookie = setCookie.slice(
            0,
            setCookie.indexOf(";") + 1
        );

        console.log("Status", step_1.status);

        const location = step_1.headers.get("location");
        console.log("Headers", step_1.headers);
        if(isEmpty(location)) {
            throw "InvalidCreds";
        }

        const step_2 = await go('get', `${this.uri}/${location}`, cookie);

        this.cookie = cookie;
    }

    private async weekListLastStep(reqData:WeekListRequest) {
        return go('post',
            `${this.uri}/process.php`,
            this.cookie,
            qs.stringify(reqData))
    }

    public async WeekList(groupData:WeekListRequest):Promise<Array<WeekInfo>> {
        try {
            await this.ensureCreds();
        } catch (e) {
            console.log("ERROR", e);
        }

        if(this.cookie) {
            const step_1 = await this.weekListLastStep(groupData);
            const body = await step_1.text();

            return Parser.WeekList(body);
        }

        const step_1 = await go('post',
            `${this.uri}/pages.php`,
            this.cookie,
            qs.stringify({pagenum: 'tdeduGraph_common'})
        );

        const step_2_url = await step_1.text();
        await go('get', `${this.uri}/${step_2_url}`, this.cookie);
        await go('post',
            `${this.uri}/process.php`,
            this.cookie,
            qs.stringify(new WeekListRequest("0", "0"))
        );

        await go('post',
            `${this}/process.php`,
            this.cookie,
            qs.stringify(new WeekListRequest(groupData.prof_id, "0"))
        );

        await go('post',
            `${this.uri}/process.php`,
            this.cookie,
            qs.stringify(new WeekListRequest(groupData.prof_id, "0"))
        );

        await go('post',
            `${this.uri}/process.php`,
            this.cookie,
            qs.stringify(new WeekListRequest(groupData.prof_id, "0"))
        );
        const step_6 = await this.weekListLastStep(groupData);
        const body = await step_6.text();
        return Parser.WeekList(body);
    }

    public async WeekView(groupData:WeekViewRequest): Promise<string> {
        await this.WeekList(new WeekListRequest(groupData.profid, groupData.courseid)); //need this to make cookie valid

        const step_1 = await go('post',
            `${this.uri}/process.php`,
            this.cookie,
            qs.stringify(groupData)
        );

        const body = await step_1.text();
        return Parser.WeekView(body).toString();
    }

}