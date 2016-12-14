import ReactiveDOM from 'reaptor-react-async/lib/ReactiveDOM';
import * as React from 'react';
import {ALoader, ILoaderItem} from './index';
import { IApi } from '../api';

export class LoaderApi extends ALoader {
    constructor() {
        super();
    }

    load(path: string): ILoaderItem {

        let apiPath = `../api/${path}`;

        let Api = require(apiPath).default;

        return {
            execute: (args:any = {}) => {
                return new Promise ((resolve, reject) => {

                    const apiInstance = new Api();

                    apiInstance.execute(args).then(resolve).catch(reject);

                });
            }
        }
    }
}