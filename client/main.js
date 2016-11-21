"use strict";
const ReaptorAsync = require('reaptor-react-async');
ReaptorAsync.inject();
const default_1 = require('../server/scripts/configuration/default');
const bootstrap_1 = require('../server/scripts/bootstrap');
const page_1 = require('../server/scripts/router/adapter/page');
const reaptor_1 = require('reaptor');
const Page = require('page');
let bootstrap = new bootstrap_1.Bootstrap();
bootstrap
    .addRouter('http', new reaptor_1.Router.Router(new page_1.RouterAdapterPage(Page)))
    .start(default_1.default.routers)
    .then(() => {
    console.log('Start');
}).catch((e) => {
    console.error(e);
});
//# sourceMappingURL=main.js.map