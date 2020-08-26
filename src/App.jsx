import React from 'react';
import './App.css'
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap'
import { FaSearch } from "react-icons/fa"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  search() {
    console.log('Current Search', this.state);
    const TOKEN = 'BQBEK0U-uZEkI5yzOmLJe6NlVsrpLn7MNpw5bDOMaDfDrfGnz6KnRrSvJ5YVYGfYlZGfzeXPd-0j6qU3ArJmBLPAtbII2HpgBIOOiF78vYozBogdJuiMvuJpTLt9jdlGC-0Ux-B8O6yDgxdpmKKNv83XTLArkSV_6qA'
    const BASE_URL = 'https://api.spotify.com/v1/search?'
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    console.log('Fetch', FETCH_URL)

    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
    })
    .then(res => res.json())
    .then(json => console.log('json', json))
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
        <div className="Profile">
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>
        <div className="Gallery">
          Gallery
        </div>
      </div>
    )
  }
}

export default App;