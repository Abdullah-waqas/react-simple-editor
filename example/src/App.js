import React, { Component } from 'react'

import SimpleEditor from 'react-simple-editor'

export default class App extends Component {
  render() {
    return (
      <div>
        <SimpleEditor
          getTextObject={(obj) => console.log(obj)}
          getTextOnType={(obj) => console.log(obj)}
          showHTML={true}
          getTextButton={(obj) => console.log(obj)}
        />
      </div>
    )
  }
}
