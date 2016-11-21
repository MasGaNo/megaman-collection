import * as Reaptor from 'reaptor';

export type TRouteDefinition = {
    page: string;
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
                            page: 'Index'
                        } as TRouteDefinition;
                    }
                }
            }
        },
        timeout: 10000
    }
} as TConfigurationDefault;

const ConfigurationDefault = Object.create(_ConfigurationDefault);

export default ConfigurationDefault; 