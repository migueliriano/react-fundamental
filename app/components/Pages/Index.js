var React = require('react');

var Home = require('./Home');
var Battle = require('./Battle');
var Popular = require('./Popular');
var NotFoundPage = require('./NotFoundPage');

var Pages = {};

Pages.Home = Home;
Pages.Battle = Battle;
Pages.Popular = Popular;
Pages.NotFoundPage = NotFoundPage;

module.exports = Pages;