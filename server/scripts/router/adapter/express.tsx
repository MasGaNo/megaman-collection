import {RouterAAdapter} from './aadapter';
import * as Reaptor from 'reaptor';
import * as express from 'express';
import ConfigurationDefault from '../../configuration/default';
import {TRouteDefinition} from '../../configuration/default';

import * as React from 'react';

import ReactiveDOM from 'reaptor-react-async/lib/ReactiveDOM';

type HttpMethod = 'get'|'post'|'head'|'put'|'patch'|'delete'|'options';

export class RouterAdapterExpress extends RouterAAdapter {
    private router: express.Application;

    constructor(router: express.Application) {
        super();
        this.router = router;
    }

    add(route: Reaptor.Router.IRoute): Promise<void> {
        return new Promise((resolve) => {

            const method: HttpMethod = route.method.toLowerCase() as HttpMethod;
            const fullPath: string = this.buildPath(route.path, route.requiredParameters, route.optionalParamters);
            ((this.router as any)[method] as express.IRouterMatcher<this>)(fullPath, this.getRouteLauncher(route.callback));

            this.routeReference[route.name] = route;

            resolve();
        });
    }
    redirectUrl(url: string, response: express.Response): void {
        response.redirect(url);
    }


    private getRouteLauncher(routeDefinition: (params?: any) => TRouteDefinition, statusCode: number = 200) {
        return (request: express.Request, response: express.Response) => {

            let routeDef: TRouteDefinition = routeDefinition.apply(this, request.params);

            let isTimeout: boolean = false;

            let timeoutId = setTimeout(() => {
                isTimeout = true;
                this.getRouteLauncher(() => {
                    return {
                        page: 'Error'
                    } as TRouteDefinition;
                }, 504);
            }, ConfigurationDefault.routers.timeout);

            // Replace by loader
            let pagePath = `../../page/${routeDef.page}`;

            let Page = require(pagePath).default;

            let proceedHtml = (html: string, code: number = statusCode) => {
                if (isTimeout) {
                    return;
                }

                clearTimeout(timeoutId);

                response.setHeader('Content-Type', routeDef.contentType || 'text/html');
                response.status(code).send(html);
            }

            let promise = ReactiveDOM.renderToStaticMarkup(<Page {...routeDef.params} />);
            if (promise instanceof Promise) {
                promise.then(proceedHtml).catch(() => {
                    if (isTimeout) {
                        return;
                    }

                    pagePath = `../../page/Error`;
                    Page = require(pagePath);
                    promise = ReactiveDOM.renderToStaticMarkup(<Page />);

                    if (promise instanceof Promise) {
                        promise.then((html) => {
                            proceedHtml(html, 500);
                        });
                    } else {
                        proceedHtml(promise as string, 500);
                    }              

                }).catch((e) => {
                    console.error(e);
                });
            } else {
                proceedHtml(promise as string); 
            }
        }
    }
    
    readonly Router: any;
}