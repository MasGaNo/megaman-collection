"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const aadapter_1 = require('./aadapter');
const default_1 = require('../../configuration/default');
const React = require('react');
const ReactiveDOM_1 = require('reaptor-react-async/lib/ReactiveDOM');
class RouterAdapterExpress extends aadapter_1.RouterAAdapter {
    constructor(router) {
        super();
        this.router = router;
    }
    add(route) {
        return new Promise((resolve) => {
            const method = route.method.toLowerCase();
            const fullPath = this.buildPath(route.path, route.requiredParameters, route.optionalParamters);
            this.router[method](fullPath, this.getRouteLauncher(route.callback));
            this.routeReference[route.name] = route;
            resolve();
        });
    }
    redirectUrl(url, response) {
        response.redirect(url);
    }
    getRouteLauncher(routeDefinition, statusCode = 200) {
        return (request, response) => {
            let routeDef = routeDefinition.apply(this, request.params);
            let isTimeout = false;
            let timeoutId = setTimeout(() => {
                isTimeout = true;
                this.getRouteLauncher(() => {
                    return {
                        page: 'Error'
                    };
                }, 504);
            }, default_1.default.routers.timeout);
            let pagePath = `../../page/${routeDef.page}`;
            let Page = require(pagePath).default;
            let proceedHtml = (html, code = statusCode) => {
                if (isTimeout) {
                    return;
                }
                clearTimeout(timeoutId);
                response.setHeader('Content-Type', routeDef.contentType || 'text/html');
                response.status(code).send(html);
            };
            let promise = ReactiveDOM_1.default.renderToStaticMarkup(React.createElement(Page, __assign({}, routeDef.params)));
            if (promise instanceof Promise) {
                promise.then(proceedHtml).catch(() => {
                    if (isTimeout) {
                        return;
                    }
                    pagePath = `../../page/Error`;
                    Page = require(pagePath);
                    promise = ReactiveDOM_1.default.renderToStaticMarkup(React.createElement(Page, null));
                    if (promise instanceof Promise) {
                        promise.then((html) => {
                            proceedHtml(html, 500);
                        });
                    }
                    else {
                        proceedHtml(promise, 500);
                    }
                }).catch((e) => {
                    console.error(e);
                });
            }
            else {
                proceedHtml(promise);
            }
        };
    }
}
exports.RouterAdapterExpress = RouterAdapterExpress;
//# sourceMappingURL=express.js.map