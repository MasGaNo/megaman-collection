"use strict";
function buildPathWithParams(path, require = [], optional = [], params = {}) {
    let requireStr = require.map((requireParam) => {
        return params[requireParam];
    }).join('/');
    if (requireStr.length) {
        requireStr = `/${requireStr}`;
    }
    let stopOptional = true;
    let optionalStr = optional.map((optionalParam) => {
        return params[optionalParam];
    }).filter((value) => {
        return stopOptional = stopOptional && !!value;
    }).join('/');
    if (optionalStr.length) {
        optionalStr = `/${optionalStr}`;
    }
    return `/${path}/${requireStr}/${optionalStr}`;
}
class RouterAAdapter {
    constructor() {
        this.routeReference = {};
        this.loader = {};
    }
    addLoader(loaderId, loader) {
        this.loader[loaderId] = loader;
        return this;
    }
    getUrl(routeName, params) {
        const route = this.routeReference[routeName];
        return buildPathWithParams(route.path, route.requiredParameters, route.optionalParamters, params);
    }
    buildPath(path, require = [], optional = []) {
        let requireStr = require.join('/:');
        if (requireStr.length) {
            requireStr = `:${requireStr}`;
        }
        let optionalStr = optional.join(')?/(:');
        if (optionalStr.length) {
            let prefix = requireStr.length ? '/' : '';
            optionalStr = `(:${optionalStr})?`;
        }
        return path + requireStr + optionalStr;
    }
}
exports.RouterAAdapter = RouterAAdapter;
//# sourceMappingURL=aadapter.js.map