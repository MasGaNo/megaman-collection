"use strict";
const Reaptor = require('reaptor');
const React = require('react');
class IndexPage extends Reaptor.View.AView {
    constructor(props) {
        super(props);
    }
    getInitialState() {
        return {};
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