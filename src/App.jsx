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