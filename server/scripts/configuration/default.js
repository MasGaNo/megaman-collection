"use strict";
exports.LoaderType = {
    Page: 'page',
    Api: 'api'
};
const _ConfigurationDefault = {
    routers: {
        http: {
            routes: {
                index: {
                    name: 'index',
                    path: '/',
                    method: 'GET',
                    callback: () => {
                        return {
                            type: exports.LoaderType.Page,
                            value: 'Index'
                        };
                    }
                },
                details: {
                    name: 'details',
                    path: '/details/',
                    method: 'GET',
                    requiredParameters: ['id'],
                    optionalParamters: ['offerName'],
                    callback: (id, offerName) => {
                        return {
                            type: exports.LoaderType.Page,
                            value: 'Details',
                            id: id,
                            offerName: offerName
                        };
                    }
                }
            }
        },
        api: {
            routes: {
                userGet: {
                    name: 'userGet',
                    method: 'GET',
                    path: '/api/user/',
                    requiredParameters: ['id'],
                    callback: (data) => {
                        return {
                            type: exports.LoaderType.Api,
                            value: 'User/Get',
                            id: data.id,
                            contentType: 'text/json'
                        };
                    }
                }
            }
        },
        timeout: 10000
    }
};
const ConfigurationDefault = Object.create(_ConfigurationDefault);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConfigurationDefault;
//# sourceMappingURL=default.js.map