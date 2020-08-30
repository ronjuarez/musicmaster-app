import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
  render() {
    let artist = {
      name: '',
      followers: {
        total: ''
      },
      images: [{
        url: ''
      }],
      genres : []
    }

    artist = this.props.artist !== null ? artist = this.props.artist : artist

    return (
      <div className="profile">
        <img
          alt="Profile"
          className="profile-img"
          src={artist.images[0].url}
         /> 
        <div className="profile-info">
          <div className="profile-name">{artist.name} </div>
          <div className="profile-followers">{artist.followers.total}</div>
          <div className="profile-grenres">
          { 
            artist.genres.map((genre, k) =>{
              return(
                <span key={k}>{genre}</span>
              )
            })
          }
        </div>
      </div>
    </div>
    )
  }
}

export default Profile;