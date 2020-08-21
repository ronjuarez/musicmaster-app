import React from 'react';

class App extends React.Component {
  render() {
    return(
      <div>
        <div className="App-title">
          Music Master
        </div>
        <div>
          <input placeholder="search an artist..."/>
          <button>button</button>
        </div> 
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