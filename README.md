# react-simple-editor

> Simple editor

[![NPM](https://img.shields.io/npm/v/react-simple-editor.svg)](https://www.npmjs.com/package/react-simple-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-simple-editor
```

## Usage

```jsx
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

```

## License

MIT © [Abdullah-waqas](https://github.com/Abdullah-waqas)
