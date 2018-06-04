import * as React from 'react'
import { PixelCanvas } from '../canvas'
import './controller.scss'
import './app.scss'

const Controller = ({ setNumSquares }) => (
  <div className="controller-panel">
    <input type="number" onChange={setNumSquares} defaultValue='4' />
  </div>
)

class App extends React.Component {
  state = { numSquares: 4 }

  setNumSquares = (event) => {
    event.preventDefault()
    this.setState({ numSquares: event.target.value })
  }

  render() {
    return(
      <div id="app">
        <PixelCanvas numSquares={this.state.numSquares} width={300} height={300}>
          <span />
        </PixelCanvas>
        <Controller setNumSquares={this.setNumSquares} />
      </div>
    )
  }
}

export default App
