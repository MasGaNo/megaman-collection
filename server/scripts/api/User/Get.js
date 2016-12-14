"use strict";
const index_1 = require('../index');
class UserGetApi extends index_1.AApi {
    execute(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(JSON.stringify({
                    id: id,
                    name: 'toto'
                }));
            }, 1000);
        });
    }
}
exports.UserGetApi = UserGetApi;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserGetApi;
//# sourceMappingURL=Get.js.map