import React from 'react';
import './App.css'
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap'
import { FaSearch } from "react-icons/fa"

class App extends React.Component {
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
            />
            <InputGroup.Append>
              <FaSearch/>
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