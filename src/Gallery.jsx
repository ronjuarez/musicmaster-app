import React, { useState } from 'react';
import './App.css'


export default function Gallery ({
  tracks
}) {
 
  const [is_playing, set_is_playing] = useState(false);
  const [stateAudio, set_audio] = useState(null);
  const [playingUrl, set_playing_url] = useState('')

  function playAudio(previewUrl){
    
    let audio = new Audio(previewUrl);
  
    if (!playingUrl) {
      audio.play()
      set_playing_url(previewUrl);
      set_is_playing(true);
      set_audio(audio);
    } else {
        if(playingUrl === previewUrl) {
        stateAudio.pause();
        set_is_playing(false);
        set_playing_url('')
        set_audio(null)
        } else {
          stateAudio.pause();
          audio.play();
          set_audio(audio);
          set_playing_url(previewUrl)
          set_is_playing(true)
        }
    }
  }

    return (
      <div>
        {tracks.map((track, k) => {
          return(
            <div
              key={k}
              className='track'
              onClick={() => playAudio(track.preview_url)} 
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
