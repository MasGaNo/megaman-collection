"use strict";
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
                            page: 'Index'
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