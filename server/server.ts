import * as Reaptor from 'reaptor';
import * as ReaptorAsync from 'reaptor-react-async';
import * as express from 'express';
import * as BodyParser from 'body-parser';

ReaptorAsync.inject();

import Configuration from './scripts/configuration/default';
import {Bootstrap} from './scripts/bootstrap';

import {RouterAdapterExpress} from './scripts/router/adapter/express';

import { LoaderPage } from './scripts/loader/page';
import { LoaderApi } from './scripts/loader/api';

var app = express();
app.use(BodyParser.json());

let expressAdapter = new RouterAdapterExpress(app);
expressAdapter.addLoader('page', new LoaderPage());
const routerAdapter = new Reaptor.Router.Router(expressAdapter);

let expressAdapterApi = new RouterAdapterExpress(app);
expressAdapterApi.addLoader('api', new LoaderApi());
const routerAdapterApi = new Reaptor.Router.Router(expressAdapterApi);

const bootstrap = new Bootstrap();
bootstrap.addRouter('http', routerAdapter);
bootstrap.addRouter('api', routerAdapterApi);

bootstrap.start(Configuration).then(() => {
    let port = process.env.NODE_PORT || 3000;
    app.listen(port, () => {
        console.info(`Server start on port ${port}`);
    });
}).catch((e: Error) => {
    console.error(e);
})
