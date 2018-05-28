import * as React from 'react'
import { Canvas } from '../canvas_things'

const Controller = ({ setNumSquares }) => (
  <input type="number" onChange={setNumSquares} defaultValue='4' />
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
        <Controller setNumSquares={this.setNumSquares} />
        <br/>
        <Canvas numSquares={this.state.numSquares} width={300} height={300}>
          <span />
        </Canvas>
      </div>
    )
  }
}

export default App
