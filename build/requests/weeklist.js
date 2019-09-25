const ch = require("cheerio");
const qs = require('querystring');

const $_ = require('../consts.js');
const go = require('./go.js');

const parseWeeklist = ($, select) => {
    const result = [];
    select.each(function() {
        result.push({
            weekId: $(this).val(),
            weekTitle: $(this).html()
        });
    });

    return result;
}

const lastStep = async (cookie, reqData) => go('post', 
    `${$_.HOST_NAME}/process.php`,
    cookie,
    qs.stringify({
        prof_id: reqData.prof_id,
        course_id: reqData.course_id,
        inf: "0"
    })
);

const parseData = (body) => {
    const $ = ch.load(body, {decodeEntities: false});
    const select = $('select option');
    const parsed = parseWeeklist($, select);

    return parsed;
}

//reqData = {prof_id, course_id}
//returns parsed data and used cookie
const weeklist = async (cookie, reqData, cookie_ready = false) => {
    const { prof_id, course_id } = reqData;

    if(cookie_ready) {
        const step_1 = await lastStep(cookie, reqData);
        const body = await step_1.text();
        const parsed = parseData(body);

        return {parsed, cookie}
    }

    const step_1 = await go('post', 
        `${$_.HOST_NAME}/pages.php`, 
        cookie,
        qs.stringify({pagenum: 'tdeduGraph_common'})
    );

    const step_2_url = await step_1.text();
    const step_2 = await go('get', `${$_.HOST_NAME}/${step_2_url}`, cookie);
    const step_3 = await go('post', 
        `${$_.HOST_NAME}/process.php`,
        cookie,
        qs.stringify({
            prof_id: "0",
            course_id: "0",
            inf: "0"
        })
    );

    const step_4 = await go('post', 
        `${$_.HOST_NAME}/process.php`,
        cookie,
        qs.stringify({
            prof_id: prof_id,
            course_id: "0",
            inf: "0"
        })
    );

    const step_5 = await go('post', 
        `${$_.HOST_NAME}/process.php`,
        cookie,
        qs.stringify({
            prof_id: prof_id,
            course_id: "0",
            inf: "0"
        })
    );

    const step_5_1 = await go('post', 
        `${$_.HOST_NAME}/process.php`,
        cookie,
        qs.stringify({
            prof_id: prof_id,
            course_id: "0",
            inf: "0"
        })
    );

    const step_6 = await lastStep(cookie, reqData);
    const body = await step_6.text();
    const parsed = parseData(body);

    return {
        parsed, cookie
    };
}

module.exports = weeklist;