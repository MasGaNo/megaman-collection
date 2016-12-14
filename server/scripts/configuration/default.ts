import * as Reaptor from 'reaptor';

export type TRouteDefinition = {
    type: string;
    value: string;
    params?: {
        [key: string]: any;
    };
    contentType?: string;
};

type TConfigurationDefault = Reaptor.Bootstrap.IBootstrapConfiguration & {
    routers: {
        /**
         * Delay before timeout connexion.
         * 
         * @type {number}
         */
        timeout: number;
    }
}

export const LoaderType = {
    Page: 'page',
    Api: 'api'
};

const _ConfigurationDefault = {
    routers: {
        http: {
            routes: {
                index: {
                    name: 'index',
                    path: '/',
                    method: 'GET',
                    callback: () => {
                        return {
                            type: LoaderType.Page,
                            value: 'Index'
                        } as TRouteDefinition;
                    }
                },
                details: {
                    name: 'details',
                    path: '/details/',
                    method: 'GET',
                    requiredParameters: ['id'],
                    optionalParamters: ['offerName'],
                    callback: (id, offerName) => {
                        return {
                            type: LoaderType.Page,
                            value: 'Details',
                            id: id,
                            offerName: offerName
                        } as TRouteDefinition;
                    }
                }
            }
        },
        api: {
            routes: {
                userGet: {
                    name: 'userGet',
                    method: 'GET',
                    path: '/api/user/',
                    requiredParameters: ['id'],
                    callback: (data) => {
                        return {
                            type: LoaderType.Api,
                            value: 'User/Get',
                            id: data.id,
                            contentType: 'text/json'
                        };
                    }
                }
            }
        },
        timeout: 10000
    }
} as TConfigurationDefault;

const ConfigurationDefault = Object.create(_ConfigurationDefault);

export default ConfigurationDefault; 