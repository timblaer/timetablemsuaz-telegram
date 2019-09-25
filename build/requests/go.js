const isEmpty = require('lodash/isEmpty');
const fetch = require('node-fetch');

const go = (method, url, cookie, body, options = {}) => {
    if(isEmpty(method)) throw "NO_METHOD";

    const headers = {};
    const fetchParams = {
        method,
        headers,
        ...options
    };

    if(!isEmpty(cookie)) {
        headers['Cookie'] = cookie;
    }

    if(method == 'post') {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        fetchParams.body = body;
    }
    return fetch(url, fetchParams);
}

module.exports = go;