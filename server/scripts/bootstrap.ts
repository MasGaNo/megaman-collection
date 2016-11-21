import {Bootstrap as ReaptorBootstrap} from 'reaptor/dist/src/bootstrap';
import {Router} from 'reaptor/dist/src/router';
import {RouterAAdapter} from './router/adapter/aadapter';

export class Bootstrap extends ReaptorBootstrap.ABootstrap {
    constructor() {
        super();
    }
}