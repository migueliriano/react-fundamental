var React = require('react');
var PropTypes = require('prop-types');

class PlayerInput extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            username: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.props.id, this.state.username);
    }

    handleChange(event){
        this.setState({username: event.target.value});
    }

    render() {

        return (
            <form className="column" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor="username">{this.props.label}</label>
                <input id="username" placeholder="github username" type="text" onChange={this.handleChange}></input>
                <button className="button" type="submit" disabled={!this.state.username}>Submit</button>
            </form>
        );
    }
};

class Battle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playerOneImage: null,
            playerOneName: "",
            playerTwoName: "",
            playerTwoImage: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(id, username){
        console.log(id);

        this.setState( () => {
            return {
                [id + 'Name' ]: username,
                [id + 'Image' ]: 'https://github.com/' + username + '.png?size=200'
            };
        });
    }

    render() {
        return (
            <div>
                <div className='row'>
                    {!this.state.playerOneName &&
                        <PlayerInput
                            id='playerOne'
                            label='Player One'
                            onSubmit={this.handleSubmit}
                    />}

                    {!this.state.playerTwoName &&
                        <PlayerInput
                            id='playerTwo'
                            label='Player Two'
                            onSubmit={this.handleSubmit}
                    />}
                </div>
            </div>
        );
    };
};

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

module.exports = Battle;