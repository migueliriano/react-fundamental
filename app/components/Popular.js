var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

const LanguageItem = function (props){
    let {lang, selectedLang, updateLang} = props;

    return (
        <li
            style = {lang === selectedLang ? {color: '#d0021b'}: null}
            onClick = {updateLang.bind(null, lang)}
        >
            {lang}
        </li>
    );
}

const SelectLanguage = function (props) {
    let {selectedLanguage, updateLanguage} = props;
    let languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python', 'PHP'];

    return (
        <ul className='languages'>
            {languages.map( lang => {
                return (
                    <LanguageItem
                        key = {lang}
                        lang = {lang}
                        selectedLang = {selectedLanguage}
                        updateLang = {updateLanguage}
                    />
                )
            })}
        </ul>
    )
};

function RepoGrid (props) {
    return (
    <ul className='popular-list'>
      {props.repos.map( (repo, index) => {
        return (
          <li key={repo.id} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
    )
}

class Popular extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            selectedLanguage: 'All',
            repos: null,
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount () {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage (lang) {

        this.setState(() => {
            return {
                selectedLanguage: lang
            }
        });

        api.fechPopularRepos(lang)
            .then( (resp) => {
                this.setState({repos: resp.data.items});
            });
    }

    render() {

        return (
            <div>
                <SelectLanguage
                    selectedLanguage = {this.state.selectedLanguage}
                    updateLanguage = {this.updateLanguage}
                />
                {!this.state.repos ?
                    "loading..." :
                    <RepoGrid
                        repos = {this.state.repos}
                    />
                }
            </div>
        )
    }
};


RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    updateLanguage: PropTypes.func.isRequired
};

LanguageItem.propTypes = {
    lang: PropTypes.string.isRequired,
    selectedLang: PropTypes.string.isRequired,
    updateLang: PropTypes.func.isRequired
};

module.exports = Popular;
