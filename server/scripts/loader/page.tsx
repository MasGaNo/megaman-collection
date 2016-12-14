import ReactiveDOM from 'reaptor-react-async/lib/ReactiveDOM';
import * as React from 'react';
import {ALoader, ILoaderItem} from './index';

export class LoaderPage extends ALoader {
    constructor() {
        super();
    }

    load(path: string): ILoaderItem {

        let pagePath = `../page/${path}`;

        let Page = require(pagePath).default;

        return {
            execute: (args:any = {}) => {
                return new Promise ((resolve) => {

                    let promise = ReactiveDOM.renderToStaticMarkup(<Page {...args} />);

                    promise.then(resolve);


                });
            }
        }
    }
}