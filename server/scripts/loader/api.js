"use strict";
const index_1 = require('./index');
class LoaderApi extends index_1.ALoader {
    constructor() {
        super();
    }
    load(path) {
        let apiPath = `../api/${path}`;
        let Api = require(apiPath).default;
        return {
            execute: (args = {}) => {
                return new Promise((resolve, reject) => {
                    const apiInstance = new Api();
                    apiInstance.execute(args).then(resolve).catch(reject);
                });
            }
        };
    }
}
exports.LoaderApi = LoaderApi;
//# sourceMappingURL=api.js.map