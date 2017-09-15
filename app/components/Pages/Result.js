var React = require('react');
var QueryString = require('query-string');
var api = require('../../utils/api');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');

var PlayerPreview = require('../PlayerPreview');

function Profile(props){

    var info = props.info;

    return (
        <div>
            <PlayerPreview avatar={info.avatar_url} username={info.login}>
                  <ul className='space-list-items'>
                    {info.name && <li>{info.name}</li>}
                    {info.location && <li>{info.location}</li>}
                    {info.company && <li>{info.company}</li>}
                    <li>Followers: {info.followers}</li>
                    <li>Following: {info.following}</li>
                    <li>Public Repos: {info.public_repos}</li>
                    {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
                  </ul>
            </PlayerPreview>
        </div>
    );
}

function Player (props){

    return (
        <div>
            <h1 className="header">{props.label}</h1>
            <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
            <Profile info={props.profile}/>
        </div>
    );

}
class Result extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            loading: true,
            loser: null,
            winner: null
        }
    }

    componentDidMount(){
        var players = QueryString.parse(this.props.location.search);

        api.battle([
            players.playerOneName, players.playerTwoName
        ]).then((result) => {
            if(result === null){
                this.setState({
                    error: 'Looks like there was an error. Check that both users exist on Github.',
                    loading: false
                })
            }

            this.setState({
                winner: result[0],
                loser: result[1],
                loading: false
            });
        })
    }

    render (){
        var error = this.state.error;
        var loading = this.state.loading;
        var loser = this.state.loser;
        var winner = this.state.winner;

        if(error){
            return (
                <div>
                    <p>{error}</p>
                    <Link className="button" to='/battle'>Reset</Link>
                </div>
            );
        }

        if(loading){
            return (
                <p>Loading</p>
            );
        }

        return (
            <div className="row">
                <Player
                    label="Winner"
                    profile={winner.profile}
                    score={winner.score}
                />

                <Player
                    label="Loser"
                    profile={loser.profile}
                    score={loser.score}
                />
            </div>
        )
    }
}

Profile.propTypes = {
    info: PropTypes.object.isRequired
}

module.exports = Result;

