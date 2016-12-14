import * as Reaptor from 'reaptor';
import {ALoader} from '../../loader';

function buildPathWithParams(path: string, require: string[] = [], optional: string[] = [], params: {[key:string]: any} = {}) {
    let requireStr: string = require.map((requireParam: string) => {
        return params[requireParam];
    }).join('/');
    if (requireStr.length) {
        requireStr = `/${requireStr}`;
    }

    let stopOptional: boolean = true;
    let optionalStr: string = optional.map((optionalParam) => {
        return params[optionalParam];
    }).filter((value) => {
        return stopOptional = stopOptional && !!value;
    }).join('/');
    if (optionalStr.length) {
        optionalStr = `/${optionalStr}`;
    }

    return `/${path}/${requireStr}/${optionalStr}`;
}

export abstract class RouterAAdapter implements Reaptor.Router.IAdapterRouter {
    protected routeReference: {[routeName:string]: Reaptor.Router.IRoute};
    protected loader: {[loaderId: string]: ALoader};

    constructor() {
        this.routeReference = {};
        this.loader = {};
    }

    addLoader(loaderId: string, loader: ALoader) {
        this.loader[loaderId] = loader;
        return this;
    }

    abstract add(route: Reaptor.Router.IRoute): Promise<void>;
    abstract redirectUrl(url: string, ...args: any[]): void;

    getUrl(routeName: string, params: {}): string {
        const route = this.routeReference[routeName];
        return buildPathWithParams(route.path, route.requiredParameters, route.optionalParamters, params);
    }

    protected buildPath(path: string, require: string[] = [], optional: string[] = []): string {
        let requireStr: string = require.join('/:');
        if (requireStr.length) {
            requireStr = `:${requireStr}`;
        }
        let optionalStr: string = optional.join(')?/(:');
        if (optionalStr.length) {
            let prefix = requireStr.length ? '/' : '';
            optionalStr = `(:${optionalStr})?`;
        }

        return path + requireStr + optionalStr;
    }
}