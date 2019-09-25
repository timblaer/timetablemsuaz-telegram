"use strict";
String.prototype.cleanStringArray = function (separator) {
    return this
        .replace('\n', '')
        .split(separator)
        .map(function (x) { return x.replace(/<[^>]*>/g, "").trim(); })
        .filter(function (str) { return str.length != 0; });
};
//# sourceMappingURL=ParserStringExtension.js.map