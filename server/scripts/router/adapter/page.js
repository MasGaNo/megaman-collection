"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require('react');
const ReactDOM = require('react-dom');
const aadapter_1 = require('./aadapter');
class RouterAdapterPage extends aadapter_1.RouterAAdapter {
    constructor(router) {
        super();
        this.router = router;
        this.routerId = 0;
    }
    add(route) {
        if (route.method.toLowerCase() !== 'get') {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            const path = this.buildPath(route.path, route.requiredParameters, route.optionalParamters);
            this.router(path, this.getRouteLauncher(route.callback));
        });
    }
    redirectUrl(url, ...args) {
        this.router(url);
    }
    getRouteLauncher(routeDefinition) {
        return (requestContext, next) => {
            let currentRequestId = this.routerId++;
            let routeDef = routeDefinition.apply(this, requestContext);
            let pagePath = `../../page/${routeDef.page}`;
            let Page = require(pagePath).default;
            ReactDOM.render((React.createElement(Page, __assign({}, routeDef.params))), document.getElementsByTagName('html')[0]);
        };
    }
}
exports.RouterAdapterPage = RouterAdapterPage;
//# sourceMappingURL=page.js.map