import React from 'react';
import './App.css'
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap'
import { FaSearch } from "react-icons/fa"
import axios from 'axios';
import qs from 'qs';
import Profile from './Profile'
import Gallery from './Gallery'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      token: '',
      artist: null,
      tracks: [],
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
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/'
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
      this.setState({ artist })

    FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`

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
        const { tracks } = json;
        console.log('top tracks', tracks)
        this.setState({ tracks })
      })
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
         {
          this.state.artist !== null ?
            <div>
                <Profile
                  artist={this.state.artist}/>
                <Gallery
                  tracks={this.state.tracks}
                  playindUrl={this.state.playingUrl}
                  audio={this.state.audio}
                  playing={this.state.playing}
                  setState={this.setState()}/> 
            </div> :
            <div/>
         }
        </div>
    )
  }
}

export default App;