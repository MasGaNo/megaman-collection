import * as Reaptor from 'reaptor';
import * as React from 'react';

export interface IIndexPageProps extends Reaptor.View.IProps {

}

export interface IIndexPageState extends Reaptor.View.IState {

}

export default class IndexPage<P extends IIndexPageProps, S extends IIndexPageState> extends Reaptor.View.AView<P, S> {
    constructor(props: P) {
        super(props);

        //this.onClick();
    }

    getInitialState() {
        return {

        } as S;
    }

    private onClick() {
        /*(this as any).on('test', function(toto:any) {
            console.log(`Coucou ${toto}`);
        });

        (this as any).trigger('test');*/
    }

    render() {
        return (
            <html>
                <head>
                    <title>Index page</title>
                </head>
                <body>
                    <h1>Home page</h1>
                </body>
            </html>
        );            
    }
}