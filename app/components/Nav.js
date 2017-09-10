var React = require('react');
var NavLink = require('react-router-dom').NavLink;

const Nav = function () {
    return (
        <ul className='nav'>
            <li>
                <NavLink exact to="/"> Home </NavLink>
            </li>

            <li>
                <NavLink to="/battle"> Battle </NavLink>
            </li>

            <li>
                <NavLink to="/popular"> Popular </NavLink>
            </li>
        </ul>
    );
};

module.exports = Nav;