var React = require('react');
var BrowserRouter = require('react-router-dom').BrowserRouter;
var Route = require('react-router-dom').Route;
var Switch = require('react-router-dom').Switch;

var Nav = require('./Nav');
var Pages = require('./Pages');

const App = function () {
    return (
        <BrowserRouter>
            <div className="container">
                <Nav />
                <Switch>
                    <Route exact path='/' component={Pages.Home} />
                    <Route exact path='/battle' component={Pages.Battle} />
                    <Route exact path='/battle/results' component={Pages.Result} />
                    <Route path='/popular' component={Pages.Popular} />
                    <Route render={Pages.NotFoundPage} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

module.exports = App;
