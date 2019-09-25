"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Button = (function () {
    function Button(text) {
        if (text == null) {
            this.text = "ERROR";
            return;
        }
        else {
            this.text = String(text);
        }
    }
    return Button;
}());
exports.default = Button;
//# sourceMappingURL=Button.js.map