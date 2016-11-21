import * as Reaptor from 'reaptor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RouterAAdapter} from './aadapter';
import * as Page from 'page';
import {TRouteDefinition} from '../../configuration/default';

export class RouterAdapterPage extends RouterAAdapter {

    private router: PageJS.Static;

    private routerId: number;

    constructor(router: PageJS.Static) {
        super();

        this.router = router;
        this.routerId = 0;
    }

    add(route: Reaptor.Router.IRoute): Promise<void> {
        if (route.method.toLowerCase() !== 'get') {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            
            const path = this.buildPath(route.path, route.requiredParameters, route.optionalParamters);
            this.router(path, this.getRouteLauncher(route.callback));

        });
    }
    
    redirectUrl(url: string, ...args: any[]): void {
        this.router(url);
    }

    getRouteLauncher(routeDefinition: (params?: any) => TRouteDefinition) {
        return (requestContext: PageJS.Context, next: () => void) => {

            let currentRequestId = this.routerId++;

            let routeDef: TRouteDefinition = routeDefinition.apply(this, requestContext);

            let pagePath = `../../page/${routeDef.page}`;

            let Page = require(pagePath).default;

            ReactDOM.render((
                <Page {...routeDef.params} />
            ), document.getElementsByTagName('html')[0]);
        };
    }
}