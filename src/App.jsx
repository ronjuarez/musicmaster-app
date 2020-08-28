import React from 'react';
import './App.css'
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap'
import { FaSearch } from "react-icons/fa"
import axios from 'axios';
import qs from 'qs';
import Profile from './Profile'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      token: '',
      artist: null
    }
  }

  
  componentDidMount() {
    const CLIENTID = process.env.REACT_APP_CLIENTID;  
    const SECRETID = process.env.REACT_APP_SECRETID;
    
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: CLIENTID,
        password: SECRETID
      }
    }
  
    const data = {
      grant_type: 'client_credentials'
    }
  
    axios.post("https://accounts.spotify.com/api/token",
      qs.stringify(data),
      headers
      )
      .then(res => {
        const { access_token } = res.data;
        this.setState({
          token: access_token
        })
      })
      .catch(error => console.log(error)) 
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?'
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    console.log(FETCH_URL)
    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.token}`
      },
    })
    .then(res => res.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({ artist})
    })
    .catch(error => console.log('error', error))
    this.setState({query: ''})
  }

  render() {
    return(
      <div className="App">
        <div className="App-title">
          Music Master
        </div>
          <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={e =>{this.setState({ query: e.target.value})}}
              onKeyPress={e => e.key === 'Enter' ? this.search() : e.key}
            />
            <InputGroup.Append
              onClick={() => this.search()}>
            <div className="App-srchbtn">
              <FaSearch/>
            </div>            
            </InputGroup.Append>
          </InputGroup>
         </FormGroup>
          <Profile
            artist={this.state.artist}/>
      </div>
    )
  }
}

export default App;