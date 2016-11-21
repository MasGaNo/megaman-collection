import * as ReaptorAsync from 'reaptor-react-async';

ReaptorAsync.inject();

import ConfigurationDefault from '../server/scripts/configuration/default';
import {Bootstrap} from '../server/scripts/bootstrap';

import {RouterAdapterPage} from '../server/scripts/router/adapter/page';

import { Router } from 'reaptor';
import * as Page from 'page';

let bootstrap = new Bootstrap();

bootstrap
    .addRouter('http', new Router.Router(new RouterAdapterPage(Page)))
    .start(ConfigurationDefault.routers)
    .then(() => {
        console.log('Start');
    }).catch((e) => {
        console.error(e);
    });