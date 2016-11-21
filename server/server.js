"use strict";
const Reaptor = require('reaptor');
const ReaptorAsync = require('reaptor-react-async');
const express = require('express');
const BodyParser = require('body-parser');
ReaptorAsync.inject();
const default_1 = require('./scripts/configuration/default');
const bootstrap_1 = require('./scripts/bootstrap');
const express_1 = require('./scripts/router/adapter/express');
var app = express();
app.use(BodyParser.json());
const routerAdapter = new Reaptor.Router.Router(new express_1.RouterAdapterExpress(app));
console.error('Bou');
const bootstrap = new bootstrap_1.Bootstrap();
bootstrap.addRouter('http', routerAdapter);
bootstrap.start(default_1.default).then(() => {
    let port = process.env.NODE_PORT || 3000;
    app.listen(port, () => {
        console.info(`Server start on port ${port}`);
    });
}).catch((e) => {
    console.error(e);
});
//# sourceMappingURL=server.js.map