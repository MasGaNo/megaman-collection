"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const ReactiveDOM_1 = require('reaptor-react-async/lib/ReactiveDOM');
const React = require('react');
const index_1 = require('./index');
class LoaderPage extends index_1.ALoader {
    constructor() {
        super();
    }
    load(path) {
        let pagePath = `../page/${path}`;
        let Page = require(pagePath).default;
        return {
            execute: (args = {}) => {
                return new Promise((resolve) => {
                    let promise = ReactiveDOM_1.default.renderToStaticMarkup(React.createElement(Page, __assign({}, args)));
                    promise.then(resolve);
                });
            }
        };
    }
}
exports.LoaderPage = LoaderPage;
//# sourceMappingURL=page.js.map