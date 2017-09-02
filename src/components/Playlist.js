import React, {Component} from 'react'



export default class PlayList extends Component{
  render(){
    return(
      <div>
        <h1>Play List</h1>
        <button onClick={this.props.refreshButton} type="submit" className="btn btn-primary">refesh list</button>
          {this.props.children}
      </div>
    )

  }
}
