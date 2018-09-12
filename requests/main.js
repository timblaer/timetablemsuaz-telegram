const isEmpty = require('lodash/isEmpty');
const qs = require('querystring');

const $_ = require('../consts.js');
const go = require('./go.js');

const weeklist = require('./weeklist.js');
const weekview = require('./weekview.js');

const switchOptions = (option) => {
    switch(option) {
        case $_.OPTION_WEEKLIST:
            return weeklist;
        case $_.OPTION_WEEKVIEW:
            return weekview;
        default:
            throw 'NO_OPTION'
    }
}

//main request part
const main = async (creds, option, reqData, ready_cookie = '') => {

    if(!isEmpty(ready_cookie)) {
        return await switchOptions(option)(ready_cookie, reqData)
    }

    const { username, password } = creds;
    const form_str = qs.stringify({username, password});

    const step_1 = await go('post', `${$_.HOST_NAME}/index.php`, '', form_str, {redirect: 'manual'});
    const setCookie = step_1.headers.get('set-cookie');
    const cookie = setCookie.slice(
        0, 
        setCookie.indexOf(";") + 1
    );

    const location = step_1.headers.get("location");
    if(isEmpty(location)) {
        throw $_.ERR_INVALID_CREDS
    }

    if(option === $_.OPTION_CHECK_CREDS) {
        return true;
    }

    const step_2 = await go('get', location, cookie);

    return await switchOptions(option)(cookie, reqData);
}

module.exports = main;