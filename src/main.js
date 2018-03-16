import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './main.scss'
import {add} from 'ramda'
import axios from 'axios'

console.log(add(2, 3))

class Post extends Component {
  postData () {
    console.log('hehehe')
    axios.post('http://localhost:3000/page/hello/123/users', {
      name: 'eason'
    }).then((res) => {
      console.log(res)
    })
  }
  componentWillUnmount () {

  }
  render () {
    return (
      <div onClick={this.postData}>post</div>
    )
  }
}
ReactDOM.render(
  <div>
    <Post />
    <h3>hello webpack</h3>
  </div>,
  document.getElementById('app')
)

console.log('hel222221awww333ck')
