"use strict";
const Reaptor = require('reaptor');
const React = require('react');
class IndexPage extends Reaptor.View.AView {
    constructor(props) {
        super(props);
        //this.onClick();
    }
    getInitialState() {
        return {};
    }
    onClick() {
        /*(this as any).on('test', function(toto:any) {
            console.log(`Coucou ${toto}`);
        });

        (this as any).trigger('test');*/
    }
    render() {
        return (React.createElement("html", null, 
            React.createElement("head", null, 
                React.createElement("title", null, "Index page")
            ), 
            React.createElement("body", null, 
                React.createElement("h1", null, "Home page")
            )));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IndexPage;
//# sourceMappingURL=Index.js.map