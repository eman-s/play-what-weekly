import React, {Component} from 'react'
import PlayList from './Playlist'
import PlayListItem from './PlayListItem'

export default class PlayListForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      userName:'',
      songTitle:'',
      songArtist:'',
      songNotes:'',
      songs:[]
    }
    this.fetchData = this.fetchData.bind(this)
    this.addToList = this.addToList.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handleSongTitleChange = this.handleSongTitleChange.bind(this)
    this.handleSongArtistChange = this.handleSongArtistChange.bind(this)
    this.handleSongNotesChange = this.handleSongNotesChange.bind(this)
  }

  componentDidMount(){
    fetch('https://tiny-lasagna-server.herokuapp.com/collections/playlisting')
      .then(results => {
          return results.json();
        })
        .then((data) => {
          this.setState({
            songs: data
          });
          console.log("state", this.state.songs);
        });
  }

  handleUsernameChange(e){
    this.setState({
      userName:e.target.value
    })
  }
  handleSongTitleChange(e){
    this.setState({
      songTitle:e.target.value
    })
  }
  handleSongArtistChange(e){
    this.setState({
      songArtist:e.target.value
    })
  }
  handleSongNotesChange(e){
    this.setState({
      songNotes:e.target.value
    })
  }

  fetchData = (e) => {
      e.preventDefault();
      fetch('https://tiny-lasagna-server.herokuapp.com/collections/playlisting')
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({
          songs: data
        });
      })
    }

  addToList = (e) => {
      e.preventDefault();
      this.setState({
        userName: e.target.value,
        songTitle: e.target.value,
        songArtist: e.target.value,
        songNotes: e.target.value
      });
      let listItem = JSON.stringify(this.state);

      fetch("https://tiny-lasagna-server.herokuapp.com/collections/playlisting", {
        method: "POST",
        body: listItem,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response, "yay");
      })
      .catch(err => {
        console.log(err, "boo!");
      });
      this.setState({
        userName: '',
        songNotes: '',
        songArtist: '',
        songTitle:''
      });
  }

  render(){
    return(
    <div>
    <form>
    <div className="form-group">
      <label>User Name:</label>
      <input type="text" onChange={this.handleUsernameChange} value={this.state.userName} className="form-control" aria-describedby="emailHelp" placeholder="Name or Username"></input>
    </div>
    <div className="form-group">
      <label>Artist/Band:</label>
      <input type="text" onChange={this.handleSongArtistChange} value={this.state.songArtist}className="form-control" placeholder="Artist Name"></input>
    </div>
    <div className="form-group">
      <label>Song Title:</label>
      <input type="text" onChange={this.handleSongTitleChange} value={this.state.songTitle} className="form-control" placeholder="Song Title"></input>
    </div>
    <div className="form-group">
      <label>Notes about song:</label>
      <textarea onChange={this.handleSongNotesChange} value={this.state.songNotes} className="form-control" rows="3"></textarea>
    </div>
    <button onClick={this.addToList} type="submit" className="btn btn-primary">Submit</button>
  </form>
  <section>
    <PlayList refreshButton={this.fetchData}>
      <PlayListItem songs={this.state.songs} />
    </PlayList>
  </section>
  </div>
    )
  }
}
