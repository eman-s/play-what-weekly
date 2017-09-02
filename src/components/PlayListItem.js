import React, {Component} from 'react'

export default class PlayListItem extends Component{
  render(){
    let songs = this.props.songs
    let songList = songs.map((song)=>{
      return(
        <div>
          <ul key={song._id}>
            <li>User:{song.userName}</li>
            <li>Artist/Band:{song.songArtist}</li>
            <li>Title:{song.songTitle}</li>
            <li>Notes:{song.songNotes}</li>
          </ul>
        </div>
      )
    })
    return(
      <div>
      {songList}
      </div>
    )
  }
}
