import React, { Component } from 'react';
import './App.css'

class Gallery extends Component {
  render() {
    const { tracks } = this.props;

    return (
      <div>
        {tracks.map((track, k) => {
          return(
            <div
              key={k}
              className='track'
            >
              <img
                src={track.album.images[0].url}
                className='track-img'
                alt='track'
              />
              <p className="track-text">
                {track.name}
              </p>
            </div> 
          )                   
        })}
      </div>
    )
  }
}

export default Gallery;