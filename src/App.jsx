import React, { useState, useEffect } from 'react';
import './App.css'
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap'
import { FaSearch } from "react-icons/fa"
import axios from 'axios';
import qs from 'qs';
import Profile from './Profile'
import Gallery from './Gallery'

export default function App() {

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

  const [token, setToken] = useState('')
  const [query, setQuery] = useState('')
  const [artist, setArtist] = useState(null)
  const [tracks, setTracks] = useState([])
  
  useEffect(() => {
    axios.post("https://accounts.spotify.com/api/token",
      qs.stringify(data),
      headers
      )
      .then(res => {
        const {access_token} = res.data;
        setToken(access_token)
      })
      .catch(error => console.log(error)) 
  }, [])

  const search = () => {
    const BASE_URL = 'https://api.spotify.com/v1/search?'
    let FETCH_URL = `${BASE_URL}q=${query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/'
    console.log(FETCH_URL)

    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(res => res.json())
    .then(json => {
      const artist = json.artists.items[0];
      setArtist(artist)

    FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`

    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(json => {
        const { tracks } = json;
        console.log('top tracks', tracks)
        setTracks(tracks)
      })
    })
    .catch(error => console.log('error', error))
      setQuery('')

  }

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
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyPress={e => e.key === 'Enter' ? search() : e.key}
            />
            <InputGroup.Append
              onClick={() => search()}>
            <div className="App-srchbtn">
              <FaSearch/>
            </div>            
            </InputGroup.Append>
          </InputGroup>
         </FormGroup>
         {
          artist !== null ?
            <div>
                <Profile
                  stateArtist={artist}/>
                <Gallery
                  tracks={tracks}/> 
            </div> :
            <div/>
         }
        </div>
    )
  }
