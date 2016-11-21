import * as Reaptor from 'reaptor';
import * as ReaptorAsync from 'reaptor-react-async';
import * as express from 'express';
import * as BodyParser from 'body-parser';

ReaptorAsync.inject();

import Configuration from './scripts/configuration/default';
import {Bootstrap} from './scripts/bootstrap';

import {RouterAdapterExpress} from './scripts/router/adapter/express';

var app = express();
app.use(BodyParser.json());

const routerAdapter = new Reaptor.Router.Router(new RouterAdapterExpress(app));

console.error('Bou');

const bootstrap = new Bootstrap();
bootstrap.addRouter('http', routerAdapter);
bootstrap.start(Configuration).then(() => {
    let port = process.env.NODE_PORT || 3000;
    app.listen(port, () => {
        console.info(`Server start on port ${port}`);
    });
}).catch((e: Error) => {
    console.error(e);
})

