"use strict";
const aadapter_1 = require('./aadapter');
const default_1 = require('../../configuration/default');
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
            let routeDef = routeDefinition(request.params);
            let isTimeout = false;
            let timeoutId = setTimeout(() => {
                isTimeout = true;
                this.getRouteLauncher(() => {
                    return {
                        type: 'page',
                        value: 'Error'
                    };
                }, 408);
            }, default_1.default.routers.timeout);
            let proceedResponse = (responseValue, code = statusCode) => {
                if (isTimeout) {
                    return;
                }
                clearTimeout(timeoutId);
                response.setHeader('Content-Type', routeDef.contentType || 'text/html');
                response.status(code).send(responseValue);
            };
            this.loader[routeDef.type].load(routeDef.value).execute(routeDef.params).then(proceedResponse).catch((e) => {
                console.error(e);
                if (isTimeout) {
                    return;
                }
                /*pagePath = `../../page/Error`;
                Page = require(pagePath);
                promise = ReactiveDOM.renderToStaticMarkup(<Page />);

                if (promise instanceof Promise) {
                    promise.then((html) => {
                        proceedHtml(html, 500);
                    });
                } else {
                    proceedHtml(promise as string, 500);
                }*/
            }).catch((e) => {
                console.error(e);
            });
        };
    }
}
exports.RouterAdapterExpress = RouterAdapterExpress;
//# sourceMappingURL=express.js.map