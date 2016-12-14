"use strict";
const Reaptor = require('reaptor');
const ReaptorAsync = require('reaptor-react-async');
const express = require('express');
const BodyParser = require('body-parser');
ReaptorAsync.inject();
const default_1 = require('./scripts/configuration/default');
const bootstrap_1 = require('./scripts/bootstrap');
const express_1 = require('./scripts/router/adapter/express');
const page_1 = require('./scripts/loader/page');
const api_1 = require('./scripts/loader/api');
var app = express();
app.use(BodyParser.json());
let expressAdapter = new express_1.RouterAdapterExpress(app);
expressAdapter.addLoader('page', new page_1.LoaderPage());
const routerAdapter = new Reaptor.Router.Router(expressAdapter);
let expressAdapterApi = new express_1.RouterAdapterExpress(app);
expressAdapterApi.addLoader('api', new api_1.LoaderApi());
const routerAdapterApi = new Reaptor.Router.Router(expressAdapterApi);
const bootstrap = new bootstrap_1.Bootstrap();
bootstrap.addRouter('http', routerAdapter);
bootstrap.addRouter('api', routerAdapterApi);
bootstrap.start(default_1.default).then(() => {
    let port = process.env.NODE_PORT || 3000;
    app.listen(port, () => {
        console.info(`Server start on port ${port}`);
    });
}).catch((e) => {
    console.error(e);
});
//# sourceMappingURL=server.js.map