var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

const PlayerPreview = function (props) {
    return (
        <div>
            <div className="column">
                <img className="avatar" src={props.avatar} alt={"Avatar for" + props.username} />
                <h2 className="username">
                    @{props.username}
                </h2>
                <button
                    className="reset"
                    onClick={props.reset.bind(null, props.id)}
                >
                    Reset
                </button>
            </div>
        </div>
    )
};

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
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, username){

        this.setState( () => {
            return {
                [id + 'Name' ]: username,
                [id + 'Image' ]: 'https://github.com/' + username + '.png?size=200'
            };
        });
    }

    handleReset(id){
        this.setState( () => {
            return {
                [id + 'Name' ]: "",
                [id + 'Image' ]: null
            };
        });
    }

    render() {
        var playerOneName = this.state.playerOneName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoName = this.state.playerTwoName;
        var playerTwoImage = this.state.playerTwoImage;
        var routeMatch = this.props.match;

        return (
            <div>
                <div className='row'>
                    {!playerOneName &&
                        <PlayerInput
                            id='playerOne'
                            label='Player One'
                            onSubmit={this.handleSubmit}
                    />}

                    {playerOneImage &&
                        <PlayerPreview
                            avatar={playerOneImage}
                            username={playerOneName}
                            reset={this.handleReset}
                            id="playerOne"
                    />}

                    {!playerTwoName &&
                        <PlayerInput
                            id='playerTwo'
                            label='Player Two'
                            onSubmit={this.handleSubmit}
                    />}

                    {playerTwoImage &&
                        <PlayerPreview
                            avatar={playerTwoImage}
                            username={playerTwoName}
                            reset={this.handleReset}
                            id="playerTwo"
                    />}
                </div>
                { playerOneImage && playerTwoImage &&
                    <Link
                        to={{
                            pathname: routeMatch.url + '/results',
                            search: 'playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                        }}
                        className='button'
                    >
                        Battle
                    </Link>}
            </div>
        );
    };
};

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    reset: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

module.exports = Battle;