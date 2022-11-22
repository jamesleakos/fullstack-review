import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    // get the data from our mongoDB
    axios.get('/repos')
      .then((res) => {
        this.setState({ repos: res.data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  search (term) {
    axios.post('/repos', {
      owner_name: term
    })
      .then((res) => {
        this.setState({ repos: res.data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

// const App = () => {
//   [repos, setRepos] = useState([]);

//   const search = (term) => {
//     console.log(`${term} was searched`);

//     // post request here
//   }

//   return (<div>
//     <h1>Github Fetcher</h1>
//     <RepoList repos={repos}/>
//     <Search onSearch={search}/>
//   </div>);
// }

ReactDOM.render(<App />, document.getElementById('app'));