var React = require('react');
var BrowserRouter = require('react-router-dom').BrowserRouter;
var Route = require('react-router-dom').Route;
var Switch = require('react-router-dom').Switch;

var Nav = require('./Nav');
var Popular = require('./Popular');
var Home = require('./Home');
var Battle = require('./Battle');
var NotFoundPage = require('./NotFoundPage');

console.log(require('react-router-dom'));

const App = function () {
    return (
        <BrowserRouter>
            <div className="container">
                <Nav />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/battle' component={Battle} />
                    <Route path='/popular' component={Popular} />
                    <Route render={NotFoundPage} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

module.exports = App;
